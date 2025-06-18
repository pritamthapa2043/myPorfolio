import WebSocket, { WebSocketServer } from "ws";
import { Pool } from "pg";
import dotenv from "dotenv";
import express from "express";
import http from "http";
dotenv.config();

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : undefined,
      }
    : {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || "your_local_db_name",
        user: process.env.DB_USER || "your_local_user",
        password: process.env.DB_PASSWORD || "your_local_password",
      }
);

// ✅ Test DB Connection
pool
  .connect()
  .then((client) => {
    console.log("✅ PostgreSQL Connected");
    client.release();
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

// ✅ Start WebSocket Server
const app = express();
const server = http.createServer(app);

// Attach WebSocket server to the HTTP server
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 8080;

type PlayerSymbol = "X" | "O";
type Player = {
  ws: WebSocket;
  id: number;
  symbol: PlayerSymbol;
  username: string;
};
type Room = {
  roomId: string;
  players: Player[];
  board: (PlayerSymbol | null)[][];
  currentTurn: PlayerSymbol;
  gameId: number | null;
  rematchRequestedBy?: number;
  gameCreationInProgress?: boolean;
  isRematchAccepted?: boolean;
};

const rooms = new Map<string, Room>();

function createEmptyBoard(): (PlayerSymbol | null)[][] {
  return Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));
}

function checkWinner(
  board: (PlayerSymbol | null)[][]
): PlayerSymbol | "draw" | null {
  const lines = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];
  for (const [[a1, a2], [b1, b2], [c1, c2]] of lines) {
    const cell = board[a1][a2];
    if (cell && cell === board[b1][b2] && cell === board[c1][c2]) return cell;
  }
  return board.flat().every((cell) => cell !== null) ? "draw" : null;
}

const createWaitingGame = async (
  roomId: string,
  playerXId: number
): Promise<number> => {
  const res = await pool.query(
    `INSERT INTO tic_tac_toe.games (room_id, status, player_x_id, player_o_id)
     VALUES ($1, 'waiting', $2, NULL) RETURNING id`,
    [roomId, playerXId]
  );
  return res.rows[0].id;
};

const updateGameStart = async (
  gameId: number,
  playerOId: number,
  roomId: string
) => {
  await pool.query(
    `UPDATE tic_tac_toe.games
     SET status = 'in_progress', player_o_id = $2
     WHERE id = $1`,
    [gameId, playerOId]
  );
  await pool.query(
    `delete from tic_tac_toe.games where room_id = $1 AND status ='waiting'`,
    [roomId]
  );
};

const updateGamestats = async (roomId: string) => {
  await pool.query(
    `DELETE FROM tic_tac_toe.games 
     WHERE room_id = $1 
     AND status = 'in_progress' 
     AND player_x_id = player_o_id`,
    [roomId]
  );
  const res = await pool.query(
    `select * from tic_tac_toe.games where room_id = $1 and status ='in_progress'`,
    [roomId]
  );
  console.log("res", res.rows);
  return res.rows[0]?.id;
};

async function insertMove(
  gameId: number,
  playerId: number,
  row: number,
  col: number,
  moveNumber: number
) {
  await pool.query(
    `INSERT INTO tic_tac_toe.moves (game_id, player_id, row, col, move_number)
     VALUES ($1, $2, $3, $4, $5)`,
    [gameId, playerId, row, col, moveNumber]
  );
}

async function updateGameWinner(
  gameId: number,
  winnerId: number | null,
  roomId: string
) {
  await pool.query(
    `DELETE FROM tic_tac_toe.games 
     WHERE room_id = $1 
     AND status = 'in_progress' 
     AND player_x_id = player_o_id`,
    [roomId]
  );

  const res = await pool.query(
    `select * from tic_tac_toe.games where room_id = $1 and status ='in_progress'`,
    [roomId]
  );
  console.log("res.rows[0].id", res.rows[0].id);
  await pool.query(
    `UPDATE tic_tac_toe.games SET status='completed', winner_id=$2 WHERE id=$1`,
    [res.rows[0].id ? res.rows[0].id : roomId, winnerId]
  );
}

function broadcastToRoom(room: Room, data: any) {
  const msg = JSON.stringify(data);
  room.players.forEach((p) => p.ws.send(msg));
}

wss.on("listening", () => {
  console.log(`✅ WebSocket server running on ws:${PORT}`);
});

wss.on("connection", (ws) => {
  let currentRoom: Room | null = null;
  let currentPlayer: Player | null = null;

  ws.on("message", async (msg) => {
    let data;
    try {
      data = JSON.parse(msg.toString());
    } catch {
      return ws.send(
        JSON.stringify({ action: "error", error: "Invalid JSON" })
      );
    }

    const { action } = data;

    if (action === "join") {
      const { roomId, playerId, username } = data;

      if (!roomId || !playerId || !username) {
        return ws.send(
          JSON.stringify({
            action: "error",
            error: "Missing roomId or playerId",
          })
        );
      }

      let room = rooms.get(roomId);

      if (!room) {
        room = {
          roomId,
          players: [],
          board: createEmptyBoard(),
          currentTurn: "X",
          gameId: null,
        };
        rooms.set(roomId, room);
      }

      if (room.players.length >= 2) {
        return ws.send(JSON.stringify({ action: "error", error: "Room full" }));
      }

      const symbol: PlayerSymbol = room.players.length === 0 ? "X" : "O";
      currentRoom = room;
      currentPlayer = { ws, id: playerId, symbol, username };
      room.players.push(currentPlayer);

      ws.send(JSON.stringify({ action: "joined", role: symbol }));

      if (
        room.players.length === 1 &&
        !room.gameId &&
        !room.gameCreationInProgress
      ) {
        if (room?.isRematchAccepted) return;

        // First player joined -> create waiting game
        room.gameCreationInProgress = true;
        try {
          room.gameId = await createWaitingGame(room.roomId, currentPlayer.id);
        } catch (e) {
          room.gameCreationInProgress = false;
          ws.send(
            JSON.stringify({
              action: "error",
              error: "Failed to create waiting game",
            })
          );
          console.error("Error creating waiting game:", e);
          return;
        }
        room.gameCreationInProgress = false;
      }

      if (
        room.players.length === 2 &&
        room.gameId &&
        !room.gameCreationInProgress
      ) {
        if (room?.isRematchAccepted) return;

        // Second player joined -> update game to in_progress
        room.gameCreationInProgress = true;
        try {
          const secondPlayer = room.players.find(
            (p) => p.id !== currentPlayer?.id
          );
          if (!secondPlayer) throw new Error("Second player not found");
          await updateGameStart(room.gameId, currentPlayer.id, roomId);

          room.board = createEmptyBoard();
          room.currentTurn = "X";

          // Notify players about game start
          broadcastToRoom(room, {
            action: "players_info",
            players: room.players.map((info) => ({
              id: info.id,
              name: info.username,
              symbol: info.symbol,
            })),
          });

          broadcastToRoom(room, {
            action: "start",
            currentTurn: room.currentTurn,
            board: room.board,
          });
        } catch (e) {
          ws.send(
            JSON.stringify({ action: "error", error: "Failed to start game" })
          );
          console.error("Error starting game:", e);
        }
        room.gameCreationInProgress = false;
      }
    } else if (action === "move") {
      const { row, col } = data;

      if (!currentRoom || !currentPlayer || row == null || col == null) {
        return ws.send(
          JSON.stringify({ action: "error", error: "Invalid move data" })
        );
      }

      if (currentRoom.currentTurn !== currentPlayer.symbol) {
        return ws.send(
          JSON.stringify({ action: "error", error: "Not your turn" })
        );
      }

      if (currentRoom.board[row][col] !== null) {
        return ws.send(
          JSON.stringify({ action: "error", error: "Cell already occupied" })
        );
      }

      currentRoom.board[row][col] = currentPlayer.symbol;

      try {
        const { rows } = await pool.query(
          "SELECT COUNT(*) FROM tic_tac_toe.moves WHERE game_id=$1",
          [currentRoom.gameId]
        );
        const moveNumber = parseInt(rows[0].count) + 1;

        await insertMove(
          currentRoom.gameId!,
          currentPlayer.id,
          row,
          col,
          moveNumber
        );
      } catch {
        return ws.send(
          JSON.stringify({ action: "error", error: "DB insert failed" })
        );
      }

      const winner = checkWinner(currentRoom.board);
      if (winner) {
        try {
          await updateGameWinner(
            currentRoom.gameId!,
            winner === "draw" ? null : currentPlayer.id,
            currentRoom.roomId
          );
        } catch {
          return ws.send(
            JSON.stringify({
              action: "error",
              error: "Failed to update winner",
            })
          );
        }

        broadcastToRoom(currentRoom, {
          action: "game_over",
          board: currentRoom.board,
          winner,
        });

        return;
      }

      currentRoom.currentTurn = currentRoom.currentTurn === "X" ? "O" : "X";
      broadcastToRoom(currentRoom, {
        action: "move_made",
        board: currentRoom.board,
        currentTurn: currentRoom.currentTurn,
      });
    } else if (action === "rematch_request") {
      if (!currentRoom && !currentPlayer) return;
      if (currentRoom && currentPlayer) {
        currentRoom.rematchRequestedBy = currentPlayer.id;

        const otherPlayer = currentRoom.players.find(
          (p) => p.id !== currentPlayer?.id
        );
        if (otherPlayer) {
          otherPlayer.ws.send(
            JSON.stringify({
              action: "rematch_request",
              from: currentPlayer.id,
            })
          );
        }
      }
    } else if (action === "rematch_response") {
      const { response } = data;
      if (!currentRoom || !currentPlayer) return;

      const requester = currentRoom.players.find(
        (p) => p.id === currentRoom?.rematchRequestedBy
      );
      if (!requester) return;

      if (response === "reject") {
        requester.ws.send(
          JSON.stringify({
            action: "rematch_result",
            result: "rejected",
          })
        );
        currentRoom.rematchRequestedBy = undefined;
        return;
      } else {
        requester.ws.send(
          JSON.stringify({
            action: "rematch_result",
            result: "accepted",
          })
        );
      }

      // Swap symbols for fairness
      for (const player of currentRoom.players) {
        player.symbol = player.symbol === "X" ? "O" : "X";
      }

      const [pX, pO] = currentRoom.players.sort((a, b) =>
        a.symbol === "X" ? -1 : 1
      );

      currentRoom.board = createEmptyBoard();
      currentRoom.currentTurn = "X";
      currentRoom.rematchRequestedBy = undefined;

      try {
        // ✅ Create a waiting game instead of full new game
        currentRoom.gameId = await createWaitingGame(currentRoom.roomId, pX.id);
        await updateGameStart(
          currentRoom.gameId,
          currentPlayer.id,
          currentRoom.roomId
        );
        broadcastToRoom(currentRoom, {
          action: "new_game",
          result: "Starting a new game...",
        });
      } catch (e) {
        return broadcastToRoom(currentRoom, {
          action: "error",
          error: "Failed to start new game",
        });
      }

      // Inform players of new game state
      for (const player of currentRoom.players) {
        player.ws.send(
          JSON.stringify({
            action: "rematch_started",
            board: currentRoom.board,
            currentTurn: currentRoom.currentTurn,
            role: player.symbol,
          })
        );
      }
    } else if (action === "quit") {
      if (!currentRoom || !currentPlayer) return;

      const otherPlayer = currentRoom.players.find(
        (p) => p.id !== currentPlayer?.id
      );

      if (otherPlayer) {
        otherPlayer.ws.send(
          JSON.stringify({
            action: "player_quit",
            from: currentPlayer.id,
            username: currentPlayer.username,
          })
        );
      }

      // Optionally: remove the quitting player from the room
      currentRoom.players = currentRoom.players.filter(
        (p) => p.id !== currentPlayer?.id
      );

      // Optionally: if the room is empty, delete it
      if (currentRoom.players.length === 0) {
        rooms.delete(currentRoom?.roomId); // Assuming you're using a `Map` called `rooms`
      }
    }
  });

  ws.on("close", () => {
    if (currentRoom && currentPlayer) {
      currentRoom.players = currentRoom.players.filter(
        (p) => p !== currentPlayer
      );
      if (currentRoom.players.length === 0) rooms.delete(currentRoom.roomId);
      console.log(`Player ${currentPlayer.id} left room ${currentRoom.roomId}`);
    }
  });
});

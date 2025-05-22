import WebSocket, { WebSocketServer } from "ws";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// ✅ Test DB Connection
pool
  .connect()
  .then((client) => {
    console.log("Database connected!");
    client.release();
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const PORT = 2020;
const wss = new WebSocketServer({ port: PORT });

type PlayerSymbol = "X" | "O";
type Player = { ws: WebSocket; id: number; symbol: PlayerSymbol };
type Room = {
  roomId: string;
  players: Player[];
  board: (PlayerSymbol | null)[][];
  currentTurn: PlayerSymbol;
  gameId: number | null;
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

const createGame = async (
  roomId: string,
  playerXId: number,
  playerOId: number
): Promise<number> => {
  const res = await pool.query(
    `INSERT INTO tic_tac_toe.games (room_id, status, player_x_id, player_o_id)
     VALUES ($1, 'in_progress', $2, $3) RETURNING id`,
    [roomId, playerXId, playerOId]
  );

  return res.rows[0].id;
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

async function updateGameWinner(gameId: number, winnerId: number | null) {
  await pool.query(
    `UPDATE tic_tac_toe.games SET status='completed', winner_id=$2 WHERE id=$1`,
    [gameId, winnerId]
  );
}

function broadcastToRoom(room: Room, data: any) {
  const msg = JSON.stringify(data);
  room.players.forEach((p) => p.ws.send(msg));
}

wss.on("listening", () => {
  console.log(`✅ WebSocket server running on ws://localhost:${PORT}`);
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
    console.log("action", action);

    if (action === "join") {
      const { roomId, playerId } = data;
      if (!roomId || !playerId) {
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
      currentPlayer = { ws, id: playerId, symbol };
      room.players.push(currentPlayer);

      ws.send(JSON.stringify({ action: "joined", role: symbol }));
      console.log(`Player ID ${playerId} joined room ${roomId} as ${symbol}`);

      if (room.players.length === 2) {
        const [pX, pO] = room.players;
        room.board = createEmptyBoard();
        room.currentTurn = "X";

        try {
          room.gameId = await createGame(roomId, pX.id, pO.id);
        } catch (e) {
          return ws.send(
            JSON.stringify({
              action: "error",
              error: "DB game creation failed",
            })
          );
        }

        broadcastToRoom(room, {
          action: "start",
          currentTurn: room.currentTurn,
          board: room.board,
        });
        console.log(`Game started in room ${roomId}`);
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
            winner === "draw" ? null : currentPlayer.id
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
        rooms.delete(currentRoom.roomId);
        return;
      }

      currentRoom.currentTurn = currentRoom.currentTurn === "X" ? "O" : "X";
      broadcastToRoom(currentRoom, {
        action: "move_made",
        board: currentRoom.board,
        currentTurn: currentRoom.currentTurn,
      });
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

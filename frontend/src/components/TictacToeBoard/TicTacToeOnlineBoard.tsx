import React, { useEffect, useRef, useState } from "react";
import "./TicTacBoard.scss";
import { drawBoard } from "./TicTacToeBoard.helper";

type Player = "X" | "O" | null;
type PlayerInfo = { id: number; symbol: string; name: string };

type TicTacToeBoardProps = {
  roomId: string;
  playerId: number | null;
  username: string | null;
  handleQuit: () => void;
};

const CELL_SIZE = 100;
const BOARD_SIZE = 3;
const WS_URL = "ws://localhost:2020";

const TicTacToeOnlineBoard: React.FC<TicTacToeBoardProps> = ({
  roomId,
  playerId,
  username,
  handleQuit,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [playerInfo, setPlayerInfo] = useState("");

  const [board, setBoard] = useState<Player[][]>(
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null))
  );

  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [role, setRole] = useState<Player>(null);
  const [currentTurn, setCurrentTurn] = useState<Player>(null);
  const [statusMessage, setStatusMessage] = useState("Connecting...");
  const [isRematchRequsted, setIsRematchRequsted] = useState(false);
  const [isRematchRejected, setisRematchRejected] = useState(false);

  useEffect(() => {
    drawBoard(canvasRef, BOARD_SIZE, CELL_SIZE, board);
  }, [board]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatusMessage("Connected. Joining room...");
      ws.send(JSON.stringify({ action: "join", roomId, playerId, username }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data", data);

      switch (data.action) {
        case "joined":
          setRole(data.role);
          setStatusMessage(`Waiting for opponent... You are ${data.role}`);
          break;

        case "start":
          setCurrentTurn(data.currentTurn);
          setStatusMessage(`Game started. ${data.currentTurn}'s turn.`);
          setBoard(
            data.board ||
              Array(BOARD_SIZE)
                .fill(null)
                .map(() => Array(BOARD_SIZE).fill(null))
          );
          setWinner(null);
          setIsDraw(false);
          break;

        case "move_made":
          setBoard(data.board);
          setCurrentTurn(data.currentTurn);
          setStatusMessage(`${data.currentTurn}'s turn.`);
          break;

        case "players_info":
          data.players.map((info: PlayerInfo) => {
            if (info.symbol !== role) {
              setPlayerInfo(info.name);
            }
          });
          break;

        case "game_over":
          setBoard(data.board);
          if (data.winner === "draw") {
            setIsDraw(true);
            setWinner(null);
            setStatusMessage("Game ended in a draw.");
          } else {
            setWinner(data.winner);
            setStatusMessage(`Game over! Winner: ${data.winner}`);
          }
          break;

        case "player_quit":
          setisRematchRejected(true);
          setStatusMessage(`Player ${data.username} left the lobby`);
          break;

        case "rematch_request":
          setIsRematchRequsted(true);
          break;

        case "rematch_started":
          setStatusMessage(`Game started. ${data.currentTurn}'s turn.`);
          setBoard(data.board);
          setCurrentTurn(data.currentTurn);
          setRole(data.role);
          break;

        case "rematch_result":
          if (data.result === "rejected") {
            setStatusMessage("Rematch Rejected.");
            setisRematchRejected(true);
          } else {
            setStatusMessage("Rematch Acepted.");
            setisRematchRejected(false);
          }
          break;

        case "new_game":
          setStatusMessage(data.result);
          break;

        case "error":
          setStatusMessage(`Error: ${data.error}`);
          break;

        default:
          break;
      }
    };

    ws.onclose = () => {
      setStatusMessage("Disconnected from server.");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setStatusMessage("WebSocket error.");
    };

    return () => {
      ws.close();
    };
  }, [roomId, playerId, role, username]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (winner || isDraw) return;
    if (role !== currentTurn) {
      setStatusMessage("Not your turn");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

    if (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE && !board[y][x]) {
      wsRef.current?.send(
        JSON.stringify({
          action: "move",
          roomId,
          playerId,
          row: y,
          col: x,
        })
      );
    }
  };

  const handleRematch = (type: string) => {
    if (wsRef.current) {
      if (type === "request") {
        wsRef.current.send(JSON.stringify({ action: "rematch_request" }));
      }
      if (type === "accept") {
        wsRef.current.send(
          JSON.stringify({ action: "rematch_response", response: "accept" })
        );
        setIsRematchRequsted(false);
      }
      if (type === "reject") {
        wsRef.current.send(
          JSON.stringify({ action: "rematch_response", response: "reject" })
        );
        setIsRematchRequsted(false);
      }
    }
  };

  const handelQuit = () => {
    if (!wsRef.current) return;

    wsRef.current.send(JSON.stringify({ action: "quit" }));
    wsRef.current.close();
    handleQuit();
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen gap-6 p-4 bg-gray-700 text-white">
      {/* Player 1 */}
      <div className="flex flex-col items-center gap-1 md:w-1/5 text-center">
        <h1 className="text-4xl font-bold text-blue-400">{role}</h1>
        <span className="text-gray-300 text-sm">{username || "Player 1"}</span>
      </div>

      {/* Canvas & Controls */}
      <div className="flex flex-col items-center gap-4">
        <canvas
          ref={canvasRef}
          width={CELL_SIZE * BOARD_SIZE}
          height={CELL_SIZE * BOARD_SIZE}
          onClick={handleClick}
          className="bg-gray-100 border-4 border-gray-900 rounded-lg shadow-lg cursor-pointer"
        />

        {/* Game Status */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-lg text-gray-300">{statusMessage}</div>

          {(winner || isDraw) && (
            <div className="flex flex-col items-center gap-2">
              {winner && (
                <div className="text-xl font-semibold text-green-400">
                  🎉 Winner: <strong>{winner}</strong>
                </div>
              )}

              {isDraw && !winner && (
                <div className="text-lg font-semibold text-yellow-400">
                  It's a draw! 🤝
                </div>
              )}

              {/* Rematch Button */}
              <button
                disabled={isRematchRejected}
                onClick={() => handleRematch("request")}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  isRematchRejected
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Rematch
              </button>

              {/* Accept / Reject Buttons */}
              {isRematchRequsted && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRematch("accept")}
                    className="px-3 py-1 rounded-md bg-green-500 hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRematch("reject")}
                    className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quit Button */}
          <button
            onClick={() => handelQuit()}
            className="mt-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition"
          >
            Quit
          </button>
        </div>
      </div>

      {/* Player 2 */}
      <div className="flex flex-col items-center gap-1 md:w-1/5 text-center">
        <h1 className="text-4xl font-bold text-red-400">
          {role === "O" ? "X" : "O"}
        </h1>
        <span className="text-gray-300 text-sm">
          {playerInfo || "Player 2"}
        </span>
      </div>
    </div>
  );
};

export default TicTacToeOnlineBoard;

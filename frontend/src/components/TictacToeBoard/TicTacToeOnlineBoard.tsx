import React, { useEffect, useRef, useState } from "react";
import "./TicTacBoard.scss";
import { drawBoard } from "./TicTacToeBoard.helper";

type Player = "X" | "O" | null;

type TicTacToeBoardProps = {
  roomId: string;
  playerId: number | null;
  username: string | null;
};

const CELL_SIZE = 100;
const BOARD_SIZE = 3;
const WS_URL = "ws://localhost:2020";

const TicTacToeOnlineBoard: React.FC<TicTacToeBoardProps> = ({
  roomId,
  playerId,
  username,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

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

  useEffect(() => {
    drawBoard(canvasRef, BOARD_SIZE, CELL_SIZE, board);
  }, [board]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatusMessage("Connected. Joining room...");
      ws.send(JSON.stringify({ action: "join", roomId, playerId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

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
  }, [roomId, playerId]);

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

  return (
    <div className="ticTictoe-board-container">
      <div className="player X">
        <h1>X</h1>
        <span>{username}</span>
      </div>

      <div className="canvas-container">
        <div className="canvas-tictactoe">
          <canvas
            ref={canvasRef}
            width={CELL_SIZE * BOARD_SIZE}
            height={CELL_SIZE * BOARD_SIZE}
            onClick={handleClick}
            style={{ border: "2px solid #000", cursor: "pointer" }}
          />
        </div>
        <div className="winner-container">
          <div>{statusMessage}</div>
          {winner && (
            <div className="winner-message">
              🎉 Winner: <strong>{winner}</strong>
            </div>
          )}
          {isDraw && !winner && (
            <div className="draw-message">It's a draw! 🤝</div>
          )}
        </div>
      </div>

      <div className="player O">
        <h1>O</h1>
        <span>{"Player 2"}</span>
      </div>
    </div>
  );
};

export default TicTacToeOnlineBoard;

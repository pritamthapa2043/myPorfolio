import React, { useEffect, useRef, useState } from "react";
import "./TicTacBoard.scss";
import { drawBoard } from "./TicTacToeBoard.helper";

type Player = "X" | "O" | null;
type TicTacToeBoardProps = {
  gameMode: string;
  player1: string;
  player2: string;
};

const CELL_SIZE = 100;
const BOARD_SIZE = 3;

const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({
  gameMode,
  player2,
  player1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [board, setBoard] = useState<Player[][]>(
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);
  console.log("gameMode", gameMode);
  useEffect(() => {
    drawBoard(canvasRef, BOARD_SIZE, CELL_SIZE, board);
  }, [board]);

  const checkWinner = (board: Player[][]): Player | "draw" | null => {
    // Rows & columns
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (board[i][0] && board[i].every((cell) => cell === board[i][0])) {
        return board[i][0];
      }

      if (board[0][i] && board.every((row) => row[i] === board[0][i])) {
        return board[0][i];
      }
    }

    // Diagonals
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }

    // Draw
    const allFilled = board.flat().every((cell) => cell !== null);
    if (allFilled) return "draw";

    return null;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (winner || isDraw) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

    if (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE && !board[y][x]) {
      const newBoard = board.map((row) => [...row]);
      newBoard[y][x] = currentPlayer;
      setBoard(newBoard);

      const result = checkWinner(newBoard);
      if (result === "X" || result === "O") {
        setWinner(result);
      } else if (result === "draw") {
        setIsDraw(true);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const resetGame = () => {
    setBoard(
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null))
    );
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="ticTictoe-board-container">
      <div className="player X">
        <h1>X</h1>
        <span>{player1}</span>
      </div>

      <div className="canvas-container">
        <div className="canvas-tictactoe">
          <canvas
            ref={canvasRef}
            width={CELL_SIZE * BOARD_SIZE}
            height={CELL_SIZE * BOARD_SIZE}
            onClick={handleClick}
            style={{ border: "2px solid #000" }}
          />
        </div>
        <div className="winner-container">
          {winner && (
            <div className="winner-message">
              🎉 Winner: <strong>{winner}</strong>
            </div>
          )}
          {isDraw && !winner && (
            <div className="draw-message">It's a draw! 🤝</div>
          )}
          {(winner || isDraw) && (
            <button onClick={resetGame} className="restart-button">
              {gameMode === "OFFLINE" ? "Restart" : "Rematch"}
            </button>
          )}
        </div>
      </div>

      <div className="player O">
        <h1>O</h1>
        <span>{player2}</span>
      </div>
    </div>
  );
};

export default TicTacToeBoard;

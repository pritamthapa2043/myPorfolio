import React, { useEffect, useRef, useState } from "react";
import { drawBoard } from "./TicTacToeBoard.helper";

type Player = "X" | "O" | null;
type TicTacToeBoardProps = {
  player1: string;
  player2: string;
};

const CELL_SIZE = 100;
const BOARD_SIZE = 3;

const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({
  player1,
  player2,
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

  useEffect(() => {
    drawBoard(canvasRef, BOARD_SIZE, CELL_SIZE, board);
  }, [board]);

  const checkWinner = (board: Player[][]): Player | "draw" | null => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (board[i][0] && board[i].every((cell) => cell === board[i][0])) {
        return board[i][0];
      }
      if (board[0][i] && board.every((row) => row[i] === board[0][i])) {
        return board[0][i];
      }
    }

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

    const allFilled = board.flat().every((cell) => cell !== null);
    return allFilled ? "draw" : null;
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
    <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen bg-gray-700 text-white gap-6 p-4">
      {/* Player 1 */}
      <div className="flex flex-col items-center gap-1 md:w-1/5">
        <h2 className="text-3xl font-bold text-blue-400">X</h2>
        <span className="text-gray-300 text-sm">{player1 || "Player 1"}</span>
      </div>

      {/* Canvas */}
      <div className="flex flex-col items-center gap-4">
        <canvas
          ref={canvasRef}
          width={CELL_SIZE * BOARD_SIZE}
          height={CELL_SIZE * BOARD_SIZE}
          onClick={handleClick}
          className="border-4 border-gray-900  bg-white rounded-md cursor-pointer"
        />

        {/* Status */}
        <div className="flex flex-col items-center gap-2 text-center">
          {winner && (
            <div className="text-2xl font-semibold text-green-400">
              🎉 Winner: {winner}
            </div>
          )}
          {isDraw && !winner && (
            <div className="text-2xl font-semibold text-yellow-400">
              It's a draw! 🤝
            </div>
          )}
          {(winner || isDraw) && (
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
            >
              Restart
            </button>
          )}
          {!winner && !isDraw && (
            <div className="text-lg text-gray-400">
              Current Turn:{" "}
              <span
                className={`font-semibold ${
                  currentPlayer === "X" ? "text-blue-400" : "text-red-400"
                }`}
              >
                {currentPlayer}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Player 2 */}
      <div className="flex flex-col items-center gap-1 md:w-1/5">
        <h2 className="text-3xl font-bold text-red-400">O</h2>
        <span className="text-gray-300 text-sm">{player2 || "Player 2"}</span>
      </div>
    </div>
  );
};

export default TicTacToeBoard;

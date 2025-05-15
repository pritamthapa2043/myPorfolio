import { RefObject } from "react";

type Player = "X" | "O" | null;
export const drawBoard = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  BOARD_SIZE: number,
  CELL_SIZE: number,
  board: Player[][]
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  for (let i = 1; i < BOARD_SIZE; i++) {
    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, BOARD_SIZE * CELL_SIZE);
    ctx.stroke();

    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(BOARD_SIZE * CELL_SIZE, i * CELL_SIZE);
    ctx.stroke();
  }

  // Draw symbols
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const symbol = board[y][x];
      const centerX = x * CELL_SIZE + CELL_SIZE / 2;
      const centerY = y * CELL_SIZE + CELL_SIZE / 2;

      if (symbol === "O") {
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        ctx.stroke();
      } else if (symbol === "X") {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(centerX - 30, centerY - 30);
        ctx.lineTo(centerX + 30, centerY + 30);
        ctx.moveTo(centerX + 30, centerY - 30);
        ctx.lineTo(centerX - 30, centerY + 30);
        ctx.stroke();
      }
    }
  }
};

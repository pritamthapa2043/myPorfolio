import React, { useEffect, useRef, useState } from "react";
import "./DotsAndBoxesBoard.scss";

const DotsAndBoxesBoard = ({
  size = 4,
  numPlayers,
  setIsGameStarted,
}: {
  size: number;
  numPlayers: number;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lines, setLines] = useState<
    {
      start: { row: number; col: number };
      end: { row: number; col: number };
      player: number;
    }[]
  >([]);
  const [tempLine, setTempLine] = useState<{
    start: { row: number; col: number };
    end: { x: number; y: number };
  } | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [linesSet, setLinesSet] = useState(new Set<string>());
  const [gridSize] = useState(size);
  const [spacing] = useState(100);
  const [dragStart, setDragStart] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const getDotPosition = (row: number, col: number) => ({
    x: col * spacing + spacing / 2,
    y: row * spacing + spacing / 2,
  });

  const formatLine = (
    dot1: { row: number; col: number },
    dot2: { row: number; col: number }
  ) => {
    return dot1.row < dot2.row || (dot1.row === dot2.row && dot1.col < dot2.col)
      ? `${dot1.row},${dot1.col}-${dot2.row},${dot2.col}`
      : `${dot2.row},${dot2.col}-${dot1.row},${dot1.col}`;
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const { x, y } = getDotPosition(row, col);
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
      }
    }

    ctx.lineWidth = 4;
    lines.forEach(({ start, end, player }) => {
      const { x: startX, y: startY } = getDotPosition(start.row, start.col);
      const { x: endX, y: endY } = getDotPosition(end.row, end.col);
      ctx.strokeStyle = ["blue", "red", "green", "purple"][player % 4]; // Different colors for players
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    });

    if (tempLine) {
      const { x: startX, y: startY } = getDotPosition(
        tempLine.start.row,
        tempLine.start.col
      );
      const { x: endX, y: endY } = tempLine.end;
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent;
    let selectedDot: { row: number; col: number } | null = null;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const { x, y } = getDotPosition(row, col);
        if (Math.sqrt((x - offsetX) ** 2 + (y - offsetY) ** 2) < 10) {
          selectedDot = { row, col };
          break;
        }
      }
    }

    if (selectedDot) {
      setDragStart(selectedDot);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragStart) return;
    setTempLine({
      start: dragStart,
      end: { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY },
    });
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (!dragStart) return;
    let selectedDot: { row: number; col: number } | null = null;
    const { offsetX, offsetY } = event.nativeEvent;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const { x, y } = getDotPosition(row, col);
        if (Math.sqrt((x - offsetX) ** 2 + (y - offsetY) ** 2) < 10) {
          selectedDot = { row, col };
          break;
        }
      }
    }

    setTempLine(null);
    if (
      !selectedDot ||
      Math.abs(selectedDot.row - dragStart.row) +
        Math.abs(selectedDot.col - dragStart.col) !==
        1
    ) {
      setDragStart(null);
      return;
    }

    const lineKey = formatLine(dragStart, selectedDot);
    if (!linesSet.has(lineKey)) {
      setLinesSet((prev) => {
        const newSet = new Set(prev);
        newSet.add(lineKey);
        return newSet;
      });

      setLines((prevLines) => [
        ...prevLines,
        { start: dragStart, end: selectedDot, player: currentPlayer },
      ]);

      // Check if a box was completed
      const completedBox = checkForBoxCompletion(dragStart, selectedDot);
      if (!completedBox) {
        setCurrentPlayer((prev) => (prev + 1) % numPlayers);
      }
    }
    setDragStart(null);
  };

  const checkForBoxCompletion = (
    dot1: { row: number; col: number },
    dot2: { row: number; col: number }
  ) => {
    const boxChecks = [
      [
        { row: dot1.row, col: dot1.col },
        { row: dot1.row, col: dot1.col + 1 },
        { row: dot1.row + 1, col: dot1.col },
        { row: dot1.row + 1, col: dot1.col + 1 },
      ],
      [
        { row: dot2.row, col: dot2.col },
        { row: dot2.row, col: dot2.col + 1 },
        { row: dot2.row + 1, col: dot2.col },
        { row: dot2.row + 1, col: dot2.col + 1 },
      ],
    ];

    return boxChecks.some((box) =>
      box.every((dot, i, arr) =>
        i < arr.length - 1
          ? linesSet.has(formatLine(dot, arr[i + 1]))
          : linesSet.has(formatLine(dot, arr[0]))
      )
    );
  };

  useEffect(() => {
    drawCanvas();
  }, [lines, tempLine]);

  return (
    <div className="board-container">
      <button onClick={() => setIsGameStarted(false)}>Back</button>
      <h2>Player {currentPlayer + 1}'s Turn</h2>
      <div>
        <canvas
          ref={canvasRef}
          width={gridSize * spacing}
          height={gridSize * spacing}
          style={{ border: "2px solid black", backgroundColor: "white" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
      <div className="players-container">
        {[...Array(numPlayers)].map((_, index) => (
          <div key={index} className={`player-card-${index}`}>
            Player {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DotsAndBoxesBoard;

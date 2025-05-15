import React from "react";
import "./BoardSize.scss";

interface IBoardSize {
  setSize: React.Dispatch<React.SetStateAction<number>>;
  size: number;
}

const BoardSize: React.FC<IBoardSize> = ({ setSize, size }) => {
  const handleDecrease = () => {
    if (size === 4) {
      setSize(8);
      return;
    }
    setSize((prev) => prev - prev);
  };

  const handleIncrease = () => {
    if (size === 8) {
      setSize(4);
      return;
    }
    setSize((prev) => prev + prev);
  };
  return (
    <div className="board-size-container">
      <button onClick={handleDecrease}>{`<`}</button>
      <div>
        {size}X{size}
      </div>
      <button onClick={handleIncrease}>{`>`}</button>
    </div>
  );
};

export default BoardSize;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicTacToeBoard from "../../../components/TictacToeBoard/TicTacToeBoard";

const TicTacToe = () => {
  const navigate = useNavigate();
  const [isGameMenu, setIsGameMenu] = useState(false);
  const [gameMode, setGameMode] = useState("OFFLINE");
  const [Player1, setPlayer1] = useState("");
  const [Player2, setPlayer2] = useState("");

  const handleDecrease = () => {
    setGameMode("OFFLINE");
  };
  const handleIncrease = () => {
    setGameMode("ONLINE");
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!isGameMenu && (
        <div>
          <h1>Tic Tac Toe Dashboard</h1>

          <div className="board-size-container">
            <button onClick={handleDecrease}>{`<`}</button>
            <div>{gameMode}</div>
            <button onClick={handleIncrease}>{`>`}</button>
            {gameMode === "OFFLINE" && (
              <>
                <span>Player 1 Name:</span>
                <input
                  type="text"
                  placeholder="Player 1"
                  value={Player1}
                  onChange={(e) => setPlayer1(e.target.value || "Player 1")}
                />
                <span>Player 1 Name:</span>
                <input
                  type="text"
                  placeholder="Player 2"
                  value={Player2}
                  onChange={(e) => setPlayer2(e.target.value || "Player 2")}
                />
              </>
            )}
          </div>
          <button>LeaderBoard</button>

          <button onClick={() => setIsGameMenu(true)}>Play Game</button>

          <button onClick={() => navigate("/game")}>Exit</button>
        </div>
      )}
      {isGameMenu && (
        <TicTacToeBoard
          gameMode={gameMode}
          player1={Player1}
          player2={Player2}
        />
      )}
    </div>
  );
};

export default TicTacToe;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicTacToeBoard from "../../../components/TictacToeBoard/TicTacToeBoard";
import TicTacToeOnlineBoard from "../../../components/TictacToeBoard/TicTacToeOnlineBoard";
import { handleRoomExist } from "../../../api/api";

const TicTacToe = () => {
  const userId = parseInt(localStorage.getItem("userId") || "0");
  const username = localStorage.getItem("username");

  const navigate = useNavigate();
  const [isGameMenu, setIsGameMenu] = useState(true);
  const [gameMode, setGameMode] = useState("LOCAL");
  const [Player1, setPlayer1] = useState("");
  const [Player2, setPlayer2] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDecrease = () => {
    setGameMode("LOCAL");
  };
  const handleIncrease = () => {
    setGameMode("ONLINE");
  };

  function generateRoomId(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const handleQuit = () => {
    setIsGameMenu(true);
    setRoomId("");
    setErrorMessage("");
  };

  const handlePlayGame = async () => {
    if (!isJoining) {
      const result = await handleRoomExist(roomId);
      if (result.message === "Room does not exist") {
        setIsGameMenu(false);
        setErrorMessage("");
      } else {
        setErrorMessage("Room ID alredy exist. Create new one");
      }
    } else {
      const result = await handleRoomExist(roomId);
      if (result.message === "Room does not exist") {
        setErrorMessage(result.message);
      } else {
        setIsGameMenu(false);
        setErrorMessage("");
      }
    }
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {isGameMenu && (
        <div>
          <h1>Tic Tac Toe Dashboard</h1>

          <div className="board-size-container">
            <button onClick={handleDecrease}>{`<`}</button>
            <div>{gameMode}</div>
            <button onClick={handleIncrease}>{`>`}</button>
            {gameMode === "LOCAL" && (
              <>
                <span>Player 1 Name:</span>
                <input
                  type="text"
                  placeholder="Player 1"
                  value={Player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                />
                <span>Player 1 Name:</span>
                <input
                  type="text"
                  placeholder="Player 2"
                  value={Player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                />
              </>
            )}
            {gameMode === "ONLINE" && (
              <>
                <div>
                  <button
                    onClick={() => {
                      const newRoomId = generateRoomId();
                      setRoomId(newRoomId);
                      setIsJoining(false);
                    }}
                  >
                    Create Room
                  </button>

                  <button
                    onClick={() => {
                      setRoomId("");
                      setIsJoining(true);
                    }}
                  >
                    Join Room
                  </button>
                </div>

                {isJoining ? (
                  <div>
                    <span>Enter Room ID:</span>
                    <input
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                      placeholder="Enter Room ID"
                    />
                    {errorMessage && <span>{errorMessage}</span>}
                  </div>
                ) : (
                  <div>
                    <span>
                      Room ID: <strong>{roomId}</strong>
                    </span>
                    <p>Share this ID with a friend to join!</p>
                    {errorMessage && <span>{errorMessage}</span>}
                  </div>
                )}
              </>
            )}
          </div>
          <button onClick={() => navigate("leaderboard")}>LeaderBoard</button>

          <button onClick={() => handlePlayGame()}>Play Game</button>

          <button onClick={() => navigate("/game")}>Exit</button>
        </div>
      )}
      {!isGameMenu && gameMode === "LOCAL" && (
        <TicTacToeBoard player1={Player1} player2={Player2} />
      )}
      {!isGameMenu && gameMode === "ONLINE" && (
        <TicTacToeOnlineBoard
          roomId={roomId}
          playerId={userId}
          username={username}
          handleQuit={handleQuit}
        />
      )}
    </div>
  );
};

export default TicTacToe;

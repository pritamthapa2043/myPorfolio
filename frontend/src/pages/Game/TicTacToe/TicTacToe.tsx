import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicTacToeBoard from "../../../components/TictacToeBoard/TicTacToeBoard";
import TicTacToeOnlineBoard from "../../../components/TictacToeBoard/TicTacToeOnlineBoard";
// import { handleRoomExist } from "../../../api/api";
import UserProfileMenu from "../../../components/Profile/UserProfileMenu";

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

  const toggleGameMode = () => {
    setGameMode((prevMode) => (prevMode === "LOCAL" ? "ONLINE" : "LOCAL"));
  };

  const generateRoomId = (length = 6) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleQuit = () => {
    setIsGameMenu(true);
    setRoomId("");
    setErrorMessage("");
  };

  const handlePlayGameOnline = async () => {
    // const result = await handleRoomExist(roomId);
    // if (!isJoining) {
    //   if (result.message === "Room does not exist") {
    //     setIsGameMenu(false);
    //     setErrorMessage("");
    //   } else {
    //     setErrorMessage("Room ID already exists. Create a new one.");
    //   }
    // } else {
    //   if (result.message === "Room does not exist") {
    //     setErrorMessage(result.message);
    //   } else {
    //     setIsGameMenu(false);
    //     setErrorMessage("");
    //   }
    // }

    setErrorMessage(
      "⚠ Online mode is not available yet. WebSocket server deployment in progress."
    );
  };
  const handlePlayGameOffline = () => {
    setIsGameMenu(false);
    setErrorMessage("");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-700 text-white">
      <UserProfileMenu />
      {/* Background Grid */}
      {isGameMenu && (
        <div className="absolute inset-0 grid grid-cols-14 grid-rows-8 ">
          {[...Array(112)].map((_, i) => (
            <div
              key={i}
              className="border border-white/15 transition transform hover:scale-125 hover:-translate-y-1 hover:bg-white/10 duration-300 ease-out"
            />
          ))}
        </div>
      )}

      {isGameMenu ? (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 space-y-6">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
            Tic Tac Toe
          </h1>
          <h2 className="text-xl font-medium text-gray-300">
            Choose Your Mode
          </h2>

          {/* Mode Selector */}
          <div className="flex items-center space-x-4 text-lg">
            <button
              onClick={toggleGameMode}
              className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-900"
            >
              {"<"}
            </button>
            <div className="px-4 py-2 rounded-md bg-gray-800 text-white  ">
              {gameMode}
            </div>
            <button
              onClick={toggleGameMode}
              className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-900"
            >
              {">"}
            </button>
          </div>

          {/* LOCAL Mode Inputs */}
          {gameMode === "LOCAL" && (
            <div className="space-y-2 text-center w-full max-w-xs">
              <input
                type="text"
                placeholder="Player 1 Name"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white outline-none focus:ring focus:ring-blue-500"
                value={Player1}
                onChange={(e) => setPlayer1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Player 2 Name"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white outline-none focus:ring focus:ring-blue-500"
                value={Player2}
                onChange={(e) => setPlayer2(e.target.value)}
              />
            </div>
          )}

          {/* ONLINE Mode Inputs */}
          {gameMode === "ONLINE" && (
            <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    const newRoomId = generateRoomId();
                    setRoomId(newRoomId);
                    setIsJoining(false);
                  }}
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-500"
                >
                  Create Room
                </button>
                <button
                  onClick={() => {
                    setRoomId("");
                    setIsJoining(true);
                  }}
                  className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-black"
                >
                  Join Room
                </button>
              </div>

              {isJoining ? (
                <div className="w-full space-y-2">
                  <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    placeholder="Enter Room ID"
                    className="w-full px-4 py-2 rounded bg-gray-800 text-white outline-none focus:ring focus:ring-blue-500"
                  />
                  {errorMessage && (
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  )}
                </div>
              ) : (
                <div className="w-full space-y-2 text-center">
                  <p>
                    Room ID: <strong className="font-mono">{roomId}</strong>
                  </p>
                  <p className="text-sm text-gray-400">
                    Share this ID with a friend to join!
                  </p>
                  {errorMessage && (
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Menu Buttons */}
          <div className="flex flex-col space-y-3 w-full max-w-xs">
            <button
              onClick={() =>
                gameMode === "ONLINE"
                  ? handlePlayGameOnline()
                  : handlePlayGameOffline()
              }
              className="w-full px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
            >
              Play Game
            </button>
            <button
              // onClick={() => navigate("leaderboard")}
              onClick={() =>
                setErrorMessage(
                  "⚠ Online mode is not available yet. WebSocket server deployment in progress."
                )
              }
              className="w-full px-4 py-2 rounded bg-purple-600 hover:bg-purple-500"
            >
              View Leaderboard
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full px-4 py-2 rounded bg-gray-800 hover:bg-gray-900"
            >
              Exit
            </button>
          </div>
        </div>
      ) : (
        <>
          {gameMode === "LOCAL" && (
            <TicTacToeBoard
              player1={Player1}
              player2={Player2}
              handleQuit={handleQuit}
            />
          )}
          {gameMode === "ONLINE" && (
            <TicTacToeOnlineBoard
              roomId={roomId}
              playerId={userId}
              username={username}
              handleQuit={handleQuit}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TicTacToe;

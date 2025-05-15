import React, { useState } from "react";
import PlayerSelector from "../PlayerSelector/PlayerSelector";
import BoardSize from "../BoardSize/BoardSize";
import DotsAndBoxesBoard from "../DotsAndBoxesBoard/DotsAndBoxesBoard";

interface IGameMenu {
  setIsGameMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameMenu: React.FC<IGameMenu> = ({ setIsGameMenu }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [size, setSize] = useState(4);
  const [numPlayers, setNumPlayers] = useState(2);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!isGameStarted && (
        <>
          <h1>GameMenu</h1>
          <button onClick={() => setIsGameMenu(false)}>
            Back To Main Menu
          </button>
          <div>
            <h1>Options</h1>
            <h3>Choose Players</h3>
            <PlayerSelector
              numPlayers={numPlayers}
              setNumPlayers={setNumPlayers}
              minPlayers={2}
              maxPlayers={4}
            />
            <h3>Board Size</h3>

            <BoardSize setSize={setSize} size={size} />

            <button onClick={() => setIsGameStarted(true)}>START</button>
          </div>
        </>
      )}
      {isGameStarted && (
        <DotsAndBoxesBoard
          size={size}
          numPlayers={numPlayers}
          setIsGameStarted={setIsGameStarted}
        />
      )}
    </div>
  );
};

export default GameMenu;

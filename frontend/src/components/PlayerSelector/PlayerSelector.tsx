import React from "react";
import "./PlayerSelector.scss"; // Import styles for animation

interface IPlayerSelector {
  numPlayers: number;
  setNumPlayers: React.Dispatch<React.SetStateAction<number>>;
  minPlayers: number;
  maxPlayers: number;
}

const PlayerSelector: React.FC<IPlayerSelector> = ({
  numPlayers,
  setNumPlayers,
  minPlayers = 2,
  maxPlayers = 4,
}) => {
  const handleIncrease = () => {
    if (numPlayers === maxPlayers) {
      setNumPlayers(minPlayers);
      return;
    }
    if (numPlayers < maxPlayers) {
      setNumPlayers((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (numPlayers === minPlayers) {
      setNumPlayers(maxPlayers);
      return;
    }
    if (numPlayers > minPlayers) {
      setNumPlayers((prev) => prev - 1);
    }
  };

  return (
    <div className="player-selector">
      <button onClick={handleDecrease}>{`<`}</button>
      <div>{numPlayers} Players</div>
      <button onClick={handleIncrease}>{`>`}</button>
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

export default PlayerSelector;

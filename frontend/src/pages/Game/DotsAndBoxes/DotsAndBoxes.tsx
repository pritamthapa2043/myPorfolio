import { useState } from "react";
import GameMenu from "../../../components/GameMenu/GameMenu";
import { useNavigate } from "react-router-dom";

const DotsAndBoxesCanvas = () => {
  const navigate = useNavigate();
  const [isGameMenu, setIsGameMenu] = useState(false);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!isGameMenu && (
        <div>
          <h1>DOTS AND BOXES Dashboard</h1>
          <button onClick={() => setIsGameMenu(true)}>Play Game</button>
          <button onClick={() => navigate("/game")}>Exit</button>
        </div>
      )}
      {isGameMenu && <GameMenu setIsGameMenu={setIsGameMenu} />}
    </div>
  );
};

export default DotsAndBoxesCanvas;

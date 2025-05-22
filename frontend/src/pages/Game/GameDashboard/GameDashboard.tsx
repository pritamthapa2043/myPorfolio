import { useNavigate } from "react-router-dom";

const GameDashboard = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h1>GameDashboard</h1>
      <button onClick={() => navigate("dotsAndBoxes")}>Dots And Boxes</button>
      <button onClick={() => navigate("ticTacToe")}>Tic Tac Toe</button>
      <button onClick={navigateToHome}>Home</button>
    </div>
  );
};

export default GameDashboard;

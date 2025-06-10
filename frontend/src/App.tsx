import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
// import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import GameDashboard from "./pages/Game/GameDashboard/GameDashboard";
import DotsAndBoxes from "./pages/Game/DotsAndBoxes/DotsAndBoxes";
import TicTacToe from "./pages/Game/TicTacToe/TicTacToe";
import TicTacToeLeaderboard from "./pages/Game/Leaderboard/TicTacToeLeaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/game">
          <Route index element={<GameDashboard />} />
          <Route path="dotsAndBoxes" element={<DotsAndBoxes />} />
          <Route path="ticTacToe">
            <Route index element={<TicTacToe />} />
            <Route path="leaderboard" element={<TicTacToeLeaderboard />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

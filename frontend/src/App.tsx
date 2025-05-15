import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import GameDashboard from "./pages/Game/GameDashboard/GameDashboard";
import DotsAndBoxes from "./pages/Game/DotsAndBoxes/DotsAndBoxes";
import TicTacToe from "./pages/Game/TicTacToe/TicTacToe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="game">
            <Route index element={<GameDashboard />} />
            <Route path="dotsAndBoxes" element={<DotsAndBoxes />} />
            <Route path="ticTacToe" element={<TicTacToe />} />
          </Route>
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

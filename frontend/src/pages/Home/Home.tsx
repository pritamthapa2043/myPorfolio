import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const navigateToGame = () => {
    navigate("/game");
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={navigateToGame}>Games</button>
    </div>
  );
};

export default Home;

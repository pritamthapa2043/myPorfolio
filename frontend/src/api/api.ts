import axios from "axios";

export const handleLogin = async (email: string, password: string) => {
  try {
    const credentials = { email, password };
    const result = await axios.post("/api/auth/login", credentials);
    return result;
  } catch (error: unknown) {
    return error;
  }
};

export const handleRegister = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const newUserInfo = { username, email, password };
    const result = await axios.post("/api/users/register", newUserInfo);
    return result;
  } catch (error: unknown) {
    return error;
  }
};

export const handleRoomExist = async (roomId: string) => {
  try {
    const result = await axios.get("/api/ticTacToe/games", {
      params: { roomId },
    });
    return result.data;
  } catch (error: unknown) {
    return error;
  }
};
export const getLeaderboard = async () => {
  try {
    const result = await axios.get("/api/ticTacToe/leaderboard");
    return result.data.rows;
  } catch (error: unknown) {
    return error;
  }
};

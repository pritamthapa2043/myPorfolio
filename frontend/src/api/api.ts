import axios from "axios";

const baseUrl = import.meta.env.PROD
  ? "myportfolio-production-1633.up.railway.app/api" // Use your production server URL here later
  : "/api";

export const handleLogin = async (email: string, password: string) => {
  try {
    const credentials = { email, password };
    const result = await axios.post(`${baseUrl}/auth/login`, credentials);
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
    const result = await axios.post(`${baseUrl}/users/register`, newUserInfo);
    return result;
  } catch (error: unknown) {
    return error;
  }
};

export const handleRoomExist = async (roomId: string) => {
  try {
    const result = await axios.get(`${baseUrl}/ticTacToe/games`, {
      params: { roomId },
    });
    return result.data;
  } catch (error: unknown) {
    return error;
  }
};
export const getLeaderboard = async () => {
  try {
    const result = await axios.get(`${baseUrl}/ticTacToe/leaderboard`);
    return result.data.rows;
  } catch (error: unknown) {
    return error;
  }
};

import axios from "axios";

export const handleLogin = async (email: string, password: string) => {
  try {
    const credentials = { email, password };
    const result = await axios.post("/api/auth/login", credentials);
    return result;
  } catch (error: any) {
    return error;
  }
};

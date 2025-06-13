import { useState } from "react";
import { handleLogin, handleRegister } from "../../api/api";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      username: string;
      email: string;
      roles: string[];
    };
  };
  status: number;
  response: { data: { message: string } };
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async () => {
    const data = (await handleLogin(email, password)) as LoginResponse;

    if (data?.status === 200) {
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("userId", data.data.user.id.toString());
      localStorage.setItem("username", data.data.user.username);
      navigate("/game/tictactoe", { replace: true });
    } else {
      setLoginError(data?.response?.data?.message);
    }
  };

  const handleUserRegister = async () => {
    const data = (await handleRegister(
      username,
      email,
      password
    )) as LoginResponse;
    if (data?.status === 201) {
      setLoginError("User Registered. Please Login.");
    } else {
      setLoginError(data?.response?.data?.message);
    }
  };

  const toggleMode = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setLoginError("");
    setIsRegister(!isRegister);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700 p-4 text-white">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {isRegister ? "Register" : "Login"}
        </h1>

        {isRegister && (
          <div className="mb-4">
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>
        {loginError && (
          <div
            className={`mb-4 rounded p-2 text-sm text-center
      ${
        loginError === "User Registered. Please Login."
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }`}
          >
            {loginError}
          </div>
        )}

        <button
          onClick={isRegister ? handleUserRegister : handleSubmit}
          className="w-full rounded bg-blue-600 py-2 font-semibold hover:bg-blue-700 transition"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <button
          onClick={toggleMode}
          className="mt-3 w-full rounded py-2 text-sm text-gray-300 hover:underline"
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;

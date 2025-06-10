import { useState } from "react";
import "./Login.scss";
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
    const data: LoginResponse = await handleLogin(email, password);

    if (data?.status === 200) {
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("userId", data.data.user.id.toString());
      localStorage.setItem("username", data.data.user.username);
      navigate("/home", { replace: true });
    } else {
      setLoginError(data?.response?.data?.message);
    }
  };

  const handleUserRegister = async () => {
    const data = await handleRegister(username, email, password);
    console.log("data", data);
    if (data?.status === 201) {
      setLoginError("User Register.");
    } else {
      setLoginError(data?.response?.data?.message);
    }
  };

  const handleIsUser = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setIsRegister(!isRegister);
  };

  return (
    <>
      {isRegister ? (
        <div className="login-container">
          <h1>Register</h1>
          <div>
            <div>Username</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div>Email</div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div>Password</div>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleUserRegister}>Register</button>
          </div>
          <div>
            <button onClick={() => handleIsUser()}>A User? Login.</button>
          </div>
          <div>{loginError}</div>
        </div>
      ) : (
        <div className="login-container">
          <h1>Login</h1>
          <div>
            <div>Email</div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div>Password</div>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleSubmit}>Sumbit</button>
          </div>
          <div>
            <button onClick={() => handleIsUser()}>
              Not a User? Register.
            </button>
          </div>
          <div>{loginError}</div>
        </div>
      )}
    </>
  );
};

export default Login;

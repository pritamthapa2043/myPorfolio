import { useState } from "react";
import "./Login.scss";
import { handleLogin } from "../../api/api";
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
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async () => {
    const data: LoginResponse = await handleLogin(email, password);

    if (data?.status === 200) {
      localStorage.setItem("token", data.data.accessToken);
      navigate("/home", { replace: true });
    } else {
      setLoginError(data?.response?.data?.message);
    }
  };

  return (
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
      <div>{loginError}</div>
    </div>
  );
};

export default Login;

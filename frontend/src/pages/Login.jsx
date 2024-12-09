import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const login = async () => {
    const data = { username, password };

    try {
      const response = await axios.post("http://localhost:3001/auth/login", data);

      if (response.data.error) {
        setError(response.data.error);
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          status: true,
          username: response.data.username, 
        });

        navigate("/");

      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("This Username or Password does not exist!");
    }
  };

  return (
    <div className="loginContainer"> Loghează-te,<br/> chiorăie mațele!

      <label><br/>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={login}>Log in</button>
      <div className="forgot_password">Forgot password</div>

      {error && <p style={{ color: "red" }}>{error}</p>} {}
    </div>
  );
}

export default Login;

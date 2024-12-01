import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const data = { username, password };

    try {
      const response = await axios.post("http://localhost:3001/auth/login", data);

      if (response.data.error) {
        setError(response.data.error);
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("This Username or Password does not exist!");
    }
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => setUsername(event.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />

      <button onClick={login}>Login</button>
      
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message below form */}
    </div>
  );
}

export default Login;

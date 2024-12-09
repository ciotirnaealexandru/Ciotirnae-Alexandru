import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./images/Logo.png";

function App() {
  const [authState, setAuthState] = useState<{ status: boolean; username: string }>({
    status: false,
    username: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ status: false, username: "" });
        } else {
          setAuthState({ status: true, username: response.data.username });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ status: false, username: "" });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <img className="logo" src={logo} alt="Logo" />
            <Link className="recipes" to=""> Recipes</Link>
            <Link className="add_recipe" to="/createpost"> Add Recipe</Link>
            {!authState.status ? (
              <>
                <div className="authLinks">
                  <Link className="login" to="/login"> Login</Link>
                  <Link to="/registration"> Register</Link>
                </div>                 
              </>
            ) : (
              <>
                <span>Welcome, {authState.username}!</span>
                <button onClick={logout}> Logout</button>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
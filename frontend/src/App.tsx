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
  const rows = "7";

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
              <div className="authLinks">
                <span>{authState.username}</span>
                <button className="logout" onClick={logout}>Logout</button>
              </div>
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
        <div className="contactUs">
          <h2>Contact Us</h2>
          <form>
            <div className="formRow">
              <div className="formColumn">
                <div className="formField">
                  <label htmlFor="firstName"></label>
                  <input type="text" id="firstName" name="firstName" placeholder="First name" />
                </div>
                <div className="formField">
                  <label htmlFor="lastName"></label>
                  <input type="text" id="lastName" name="lastName" placeholder="Last name" />
                </div>
                <div className="formField">
                  <label htmlFor="email"></label>
                  <input type="email" id="email" name="email" placeholder="Email" />
                </div>
              </div>
              <div className="formColumn">
                <div className="formField">
                  <label htmlFor="message"></label>
                  <textarea id="message" name="message" rows={Number(rows)} placeholder="Message"></textarea>
                </div>
              </div>
            </div>
            <div className="formSubmit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
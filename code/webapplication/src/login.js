import React, { useState } from "react";
import logoImage from "./images/logo.png";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login logic here
    console.log("Logging in:", username, password);
  };

  return (
    <div className="login-container">
      {/* Left Side - Logo */}
      <div className="login-logo">
        <img src={logoImage} alt="Logo" />
      </div>

      {/* Right Side - Login Form */}
      <div className="login-form-container">
        <h1 className="login-heading">Login</h1>
        <hr />
        <form className="login-form">
          <label className="login-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />

          <label className="login-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button type="button" onClick={handleLogin} className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

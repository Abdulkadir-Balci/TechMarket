import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ onLogin }) {
  const [password, setPasswordValue] = useState("");
  const [userEmail, setUserEmailValue] = useState("");
  const navigate = useNavigate();

  const setPassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const setUserEmail = (e) => {
    setUserEmailValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userEmail: userEmail,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8080/loginUser", data);
      console.log("this is the response ", response.data);

      if (!response.data) {
        alert("Invalid User Id or Password");
      } else {
        alert("Login Successful");
        onLogin(response.data); 
        navigate("/"); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your user id"
            value={userEmail}
            onChange={setUserEmail}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />
          <a onClick={redirectToRegister}>Don't have an account? Register here</a>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
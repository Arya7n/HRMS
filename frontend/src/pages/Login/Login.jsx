import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./../../api/axios";
import "./Login.css";
import dashboardPreview from "../../../public/Images/dashboardPreview.png";
import HiddenPass from "../../../public/Images/HiddenPass.png";
import ShowPass from "../../../public/Images/ShowPass.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard/candidates");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <header className="login-logo-header">
        <div className="login-logo-box"></div>
        <span className="login-logo-text">LOGO</span>
      </header>

      <div className="login-card">
        <div className="login-left">
          <img
            src={dashboardPreview}
            alt="Dashboard Preview"
            className="dashboard-img"
          />
          <h2>Welcome Back! We’re happy to see you again.</h2>
          <p>Log in to your account and manage your dashboard with ease.</p>
          <div className="dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        <div className="login-right">
          <h2>Welcome to Dashboard</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                <img
                  src={showPassword ? HiddenPass : ShowPass}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="toggle-password-icon"
                />
              </span>
            </div>

            <p className="forgot-link">
              <a href="/forgot-password">Forgot password?</a>
            </p>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="register-link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/")}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

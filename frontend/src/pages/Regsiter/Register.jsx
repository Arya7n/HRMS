import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import dashboardPreview from "../../../public/Images/dashboardPreview.png";
import HiddenPass from "../../../public/Images/HiddenPass.png";
import ShowPass from "../../../public/Images/ShowPass.png";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        fullName,
        email,
        password,
        confirmPassword,
      });

      alert("Registered successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <header className="register-logo-header">
        <div className="register-logo-box"></div>
        <span className="register-logo-text">LOGO</span>
      </header>

      <div className="register-card">
        <div className="register-left">
          <img
            src={dashboardPreview}
            alt="Dashboard Preview"
            className="dashboard-img"
          />
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </h2>
          <p>tempor incididunt ut labore et dolore magna aliqua...</p>
          <div className="dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        <div className="register-right">
          <h2>Welcome to Dashboard</h2>
          <form className="register-form" onSubmit={handleRegister}>
            <label>Full name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

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

            <label>Confirm Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <img
                  src={showConfirmPassword ? HiddenPass : ShowPass}
                  alt={showConfirmPassword ? "Hide password" : "Show password"}
                  className="toggle-password-icon"
                />
              </span>
            </div>

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

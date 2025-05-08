import React from "react";
import "./Logout.css";

const Logout = () => {
  const handleLogout = () => {
    // Clear all local storage/session auth data
    localStorage.removeItem("token"); // or localStorage.clear();
    sessionStorage.clear();
    // Redirect to login
    window.location.href = "/login";
  };

  const handleCancel = () => {
    window.history.back(); // or use useNavigate("/dashboard");
  };

  return (
    <div className="logout-container">
      <div className="logout-header">Log Out</div>
      <div className="logout-body">
        <p>Are you sure you want to log out?</p>
        <div className="logout-actions">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;

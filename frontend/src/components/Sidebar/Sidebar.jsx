import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import Candidates from "./../../../public/Images/Candidates.png";
import Employees from "./../../../public/Images/Employees.png";
import Attendance from "./../../../public/Images/Attendance.png";
import Leaves from "./../../../public/Images/Leaves.png";
import Logout from "./../../../public/Images/Logout.png";

const SidebarLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getActive = (path) =>
    location.pathname === `/dashboard/${path}` ? "active" : "";

  return (
    <>
      <button
        className="sidebar-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ☰
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <header className="logo-header">
          <div className="logo-box"></div>
          <span className="logo-text">LOGO</span>
        </header>

        <input type="text" className="search-bar" placeholder="Search" />

        <div className="sidebar-group">
          <p className="group-title">Recruitment</p>
          <div
            className={`sidebar-item ${getActive("candidates")}`}
            onClick={() => navigate("/dashboard/candidates")}
          >
            <img src={Candidates} alt="Candidates" className="sidebar-icon" />
            Candidates
          </div>
        </div>

        <div className="sidebar-group">
          <p className="group-title">Organization</p>
          <div
            className={`sidebar-item ${getActive("employees")}`}
            onClick={() => navigate("/dashboard/employees")}
          >
            <img src={Employees} alt="Employees" className="sidebar-icon" />
            Employees
          </div>
          <div
            className={`sidebar-item ${getActive("attendance")}`}
            onClick={() => navigate("/dashboard/attendance")}
          >
            <img src={Attendance} alt="Attendance" className="sidebar-icon" />
            Attendance
          </div>
          <div
            className={`sidebar-item ${getActive("leaves")}`}
            onClick={() => navigate("/dashboard/leaves")}
          >
            <img src={Leaves} alt="Leaves" className="sidebar-icon" />
            Leaves
          </div>
        </div>

        <div className="sidebar-group">
          <p className="group-title">Others</p>
          <div
            className={`sidebar-item ${getActive("logout")}`}
            onClick={() => navigate("/dashboard/logout")}
          >
            <img src={Logout} alt="Logout" className="sidebar-icon" />
            Logout
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarLayout;

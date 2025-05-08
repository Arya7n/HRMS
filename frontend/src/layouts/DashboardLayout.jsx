
import React from "react";
import { Outlet } from "react-router-dom";
//import SidebarLayout from "../components/SidebarLayout";
import Sidebar from "../components/Sidebar/Sidebar";
import "./DashboardLayout.css"; // optional for layout styling

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

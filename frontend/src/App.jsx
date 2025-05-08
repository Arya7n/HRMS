import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Regsiter/Register";
import Login from "./pages/Login/Login";
import Candidates from "./pages/DashboardSections/Candidates/Candidates";
import Employees from "./pages/DashboardSections/Employees/Employees";
import Attendance from "./pages/DashboardSections/Attendance/Attendance";
import Leaves from "./pages/DashboardSections/Leaves/Leaves";
import Logout from "./pages/DashboardSections/Logout/Logout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "candidates", element: <Candidates /> },
      { path: "employees", element: <Employees /> },
      { path: "attendance", element: <Attendance /> },
      { path: "leaves", element: <Leaves /> },
      { path: "logout", element: <Logout /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

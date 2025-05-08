// Leave.js
import React, { useEffect, useState } from "react";
import LeaveForm from "./LeaveForm";
import LeaveTable from "./LeaveTable";
import LeaveCalendar from "./LeaveCalendar";
import axios from "axios";
import "./Leaves.css";
import Mail from "./../../../../public/Images/Mail.png";
import Notifications from "./../../../../public/Images/Notifications.png";
import Profile from "./../../../../public/Images/Profile.png";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [calendarData, setCalendarData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const fetchLeaves = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/leave/list`);
    setLeaves(res.data);
  };

  const fetchCalendar = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/leave/calendar`);
    setCalendarData(res.data);
  };

  useEffect(() => {
    fetchLeaves();
    fetchCalendar();
  }, []);

  return (
    <div className="leave-container">
      {/* Header Section */}
      <div className="leaves-header-section">
        <div className="leaves-header-top">
          <h2 className="leaves-title">Leaves</h2>
          <div className="leaves-header-icons">
            <img src={Mail} alt="Mail" className="leaves-header-icon" />
            <img
              src={Notifications}
              alt="Notifications"
              className="leaves-header-icon"
            />
            <div
              className="leaves-profile-wrapper"
              onClick={toggleProfileDropdown}
            >
              <img src={Profile} alt="Profile" className="leaves-profile-img" />
              <span className="arrow-down">▾</span>
              {showProfileDropdown && (
                <div className="leaves-profile-dropdown">
                  <div className="leaves-dropdown-item">Edit Profile</div>
                  <div className="leaves-dropdown-item">Change Password</div>
                  <div className="leaves-dropdown-item">
                    Manage Notifications
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="leaves-filters-row">
          <div className="leaves-filters-left">
            <select
              className="leaves-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="leaves-filters-right">
            <input
              type="text"
              className="leaves-search-input"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="leaves-add-btn"
              onClick={() => setShowForm(true)}
            >
              Add Leave
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="leave-content">
        <div className="leave-left">
          <LeaveTable
            data={leaves}
            refresh={fetchLeaves}
            statusFilter={statusFilter}
            searchText={searchText}
          />
        </div>
        <div className="leave-right">
          <div className="leave-calendar-header">Leave Calendar</div>
          <div className="leave-calendar-wrapper">
            <LeaveCalendar
              data={calendarData}
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <LeaveForm
          onClose={() => setShowForm(false)}
          onSubmit={() => {
            fetchLeaves();
            fetchCalendar();
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default Leaves;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Attendance.css";
import Mail from "./../../../../public/Images/Mail.png";
import Notifications from "./../../../../public/Images/Notifications.png";
import Profile from "./../../../../public/Images/Profile.png";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskData, setTaskData] = useState({});
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const fetchAttendance = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/candidate/attendance/list`);
    setAttendanceData(res.data);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/candidate/attendance/update/${id}`, {
      status: newStatus,
    });
    fetchAttendance();
  };

  const toggleAction = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const openTaskModal = (record) => {
    setTaskData({ ...record });
    setShowTaskModal(true);
    setSelectedId(null);
  };

  const handleTaskChange = (e) => {
    setTaskData({ ...taskData, task: e.target.value });
  };

  const handleTaskSave = async () => {
    await api.patch(`/candidate/attendance/update/${taskData._id}`, {
      task: taskData.task,
    });
    setShowTaskModal(false);
    fetchAttendance();
  };

  const filteredAttendance = attendanceData
    .filter((item) =>
      statusFilter
        ? item.status.toLowerCase() === statusFilter.toLowerCase()
        : true
    )
    .filter((item) =>
      search
        ? item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.position.toLowerCase().includes(search.toLowerCase()) ||
          item.department.toLowerCase().includes(search.toLowerCase())
        : true
    );

  return (
    <div className="attendance-wrapper">
      <div className="attendance-header">
        <div className="attendance-header-top">
          <h2>Attendance</h2>
          <div className="attendance-header-icons">
            <img src={Mail} alt="Mail" className="attendance-header-icon" />
            <img
              src={Notifications}
              alt="Notifications"
              className="attendance-header-icon"
            />
            <div
              className="attendance-profile-wrapper"
              onClick={toggleProfileDropdown}
            >
              <img
                src={Profile}
                alt="Profile"
                className="attendance-profile-img"
              />
              <span className="arrow-down">▾</span>
              {showProfileDropdown && (
                <div className="attendance-profile-dropdown">
                  <div className="attendance-dropdown-item">Edit Profile</div>
                  <div className="attendance-dropdown-item">
                    Change Password
                  </div>
                  <div className="attendance-dropdown-item">
                    Manage Notifications
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="attendance-filters-row">
          <div className="attendance-filters-left">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div className="attendance-filters-right">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="attendance-table-container">
        <div className="attendance-table-wrapper">
          <table className="attendance-table">
            <thead className="attendance-table-header">
              <tr className="attendance-table-row">
                <th>Sr No.</th>
                <th>Employee Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Task</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((att, idx) => (
                <tr key={att._id} className="attendance-table-data-row">
                  <td>{String(idx + 1).padStart(2, "0")}</td>
                  <td>{att.name}</td>
                  <td>{att.position}</td>
                  <td>{att.department}</td>
                  <td>{att.task}</td>
                  <td>
                    <select
                      value={att.status}
                      onChange={(e) =>
                        handleStatusChange(att._id, e.target.value)
                      }
                      className={`attendance-status-dropdown ${att.status.toLowerCase()}`}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="attendance-action-btn"
                      onClick={() => toggleAction(att._id)}
                    >
                      ⋮
                    </button>
                    {selectedId === att._id && (
                      <div className="attendance-action-options">
                        <button onClick={() => openTaskModal(att)}>
                          Edit Task
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showTaskModal && (
        <div className="attendance-modal">
          <div className="attendance-modal-content">
            <div className="attendance-modal-title-bar">
              <h4 className="attendance-modal-title">Update Task</h4>
              <button
                className="attendance-close-btn"
                onClick={() => setShowTaskModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="attendance-input-group">
              <input
                type="text"
                className="attendance-input-field"
                value={taskData.task}
                onChange={handleTaskChange}
                placeholder="Enter task description"
              />
            </div>
            <div className="attendance-form-actions">
              <button onClick={handleTaskSave} className="attendance-save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;

import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./Employees.css";
import Mail from "./../../../../public/Images/Mail.png";
import Notifications from "./../../../../public/Images/Notifications.png";
import Profile from "./../../../../public/Images/Profile.png";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [filterPosition, setFilterPosition] = useState("");
  const [search, setSearch] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const fetchEmployees = async () => {
    const res = await api.get(`${import.meta.env.VITE_API_BASE_URL}/candidate/employee/list`);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await api.delete(`${import.meta.env.VITE_API_BASE_URL}/candidate/employee/delete/${id}`);
      fetchEmployees();
    }
  };

  const openEditModal = (emp) => {
    setEditData({
      ...emp,
      doj: new Date(emp.doj).toISOString().split("T")[0],
    });
    setShowEditModal(true);
    setSelectedId(null);
  };

  const handleSave = async () => {
    await api.patch(
      `${import.meta.env.VITE_API_BASE_URL}/candidate/employee/update/${editData.candidateId}`,
      editData
    );
    setShowEditModal(false);
    fetchEmployees();
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const toggleAction = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const filteredEmployees = employees
    .filter((e) =>
      filterPosition
        ? e.position.toLowerCase().includes(filterPosition.toLowerCase())
        : true
    )
    .filter((e) =>
      search
        ? e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.email.toLowerCase().includes(search.toLowerCase()) ||
          e.phone.toLowerCase().includes(search.toLowerCase())
        : true
    );

  return (
    <div className="employee-wrapper">
      <div className="employee-header">
        {/* Top row: title + icons */}
        <div className="employee-header-top">
          <h2>Employees</h2>
          <div className="employee-header-icons">
            <img src={Mail} alt="Mail" className="employee-header-icon" />
            <img
              src={Notifications}
              alt="Notifications"
              className="employee-header-icon"
            />
            <div
              className="employee-profile-wrapper"
              onClick={toggleProfileDropdown}
            >
              <img
                src={Profile}
                alt="Profile"
                className="employee-profile-img"
              />
              <span className="arrow-down">▾</span>
              {showProfileDropdown && (
                <div className="employee-profile-dropdown">
                  <div className="dropdown-item">Edit Profile</div>
                  <div className="dropdown-item">Change Password</div>
                  <div className="dropdown-item">Manage Notifications</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom row: filters */}
        <div className="employee-filters-row">
          {/* Left Side - Position Filter */}
          <div className="employee-filters-left">
            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
            >
              <option value="">Position</option>
              <option value="Intern">Intern</option>
              <option value="Full time">Full time</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Team Lead">Team Lead</option>
            </select>
          </div>

          {/* Right Side - Search Only */}
          <div className="employee-filters-right">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="employee-table-container">
        <table className="employee-table">
          <thead className="employee-table-header">
            <tr className="employee-table-row">
              <th>Sr No.</th>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((e, idx) => (
              <tr key={e._id} className="employee-table-data-row">
                <td>{String(idx + 1).padStart(2, "0")}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.position}</td>
                <td>{e.department}</td>
                <td>{new Date(e.doj).toLocaleDateString()}</td>
                <td style={{ position: "relative" }}>
                  <button
                    className="employee-action-btn"
                    onClick={() => toggleAction(e._id)}
                  >
                    ⋮
                  </button>
                  {selectedId === e._id && (
                    <div className="employee-action-options">
                      <button onClick={() => openEditModal(e)}>Edit</button>
                      <button onClick={() => handleDelete(e._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="employee-modal-wrapper">
          <div className="employee-modal-content">
            <div className="employee-modal-title">
              Edit Employee Details
              <button
                className="employee-close-btn"
                onClick={() => setShowEditModal(false)}
              >
                &times;
              </button>
            </div>

            <form className="employee-edit-form">
              <div className="employee-form-grid">
                <div className="employee-input-group">
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    required
                    className="employee-input-field"
                    placeholder=" "
                  />
                  <label className="employee-floating-label">
                    Full Name<span className="employee-required">*</span>
                  </label>
                </div>

                <div className="employee-input-group">
                  <input
                    type="text"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    required
                    className="employee-input-field"
                    placeholder=" "
                  />
                  <label className="employee-floating-label">
                    Email Address<span className="employee-required">*</span>
                  </label>
                </div>

                <div className="employee-input-group">
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    required
                    className="employee-input-field"
                    placeholder=" "
                  />
                  <label className="employee-floating-label">
                    Phone Number<span className="employee-required">*</span>
                  </label>
                </div>

                <div className="employee-input-group">
                  <select
                    name="position"
                    value={editData.position}
                    onChange={handleChange}
                    required
                    className="employee-input-field"
                  >
                    <option value="" disabled hidden></option>
                    <option value="Intern">Intern</option>
                    <option value="Full time">Full time</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Team Lead">Team Lead</option>
                  </select>
                  <label className="employee-floating-label">
                    Position<span className="employee-required">*</span>
                  </label>
                </div>

                <div className="employee-input-group">
                  <input
                    type="text"
                    name="department"
                    value={editData.department}
                    onChange={handleChange}
                    required
                    className="employee-input-field"
                    placeholder=" "
                  />
                  <label className="employee-floating-label">
                    Department<span className="employee-required">*</span>
                  </label>
                </div>

                <div className="employee-input-group">
                  <input
                    type="date"
                    name="doj"
                    value={editData.doj}
                    onChange={handleChange}
                    required
                    className="employee-input-field"
                    placeholder=" "
                  />
                  <label className="employee-floating-label">
                    Date of Joining<span className="employee-required">*</span>
                  </label>
                </div>
              </div>

              <div className="employee-form-actions">
                <button type="button" onClick={handleSave}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;

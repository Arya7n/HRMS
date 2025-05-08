
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeaveForm.css";

const LeaveForm = ({ onClose, onSubmit }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    leaveDate: "",
    reason: "",
    document: null,
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/candidate/attendance/list`).then((res) => {
      const presentEmployees = res.data.filter((e) => e.status === "Present");
      setEmployees(presentEmployees);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "name") {
      const selected = employees.find((emp) => emp.name === value);
      setFormData({
        ...formData,
        name: value,
        department: selected
          ? `${selected.position} ${selected.department}`
          : "",
        candidateId: selected?._id || "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    }
  };

  const clearFile = () => {
    setFormData((prev) => ({ ...prev, document: null }));
    document.getElementById("leave-file-input").value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/leave/add`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    onSubmit();
  };

  return (
    <div className="leave-form-modal">
      <div className="leave-form-modal-content">
        <div className="leave-form-title-bar">
          <h3 className="leave-form-title">Add Leave Request</h3>
          <button className="leave-form-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="leave-form-grid">
            <div className="leave-input-group">
              <input
                list="employee-list"
                name="name"
                required
                placeholder="Search employee name..."
                value={formData.name}
                onChange={handleChange}
                className="leave-input-field"
              />
              <datalist id="employee-list">
                {employees.map((e) => (
                  <option key={e._id} value={e.name} />
                ))}
              </datalist>
            </div>

            <div className="leave-input-group">
              <input
                name="department"
                value={formData.department}
                placeholder=" "
                readOnly
                className="leave-input-field"
              />
              <label
                className={`leave-floating-label ${
                  formData.department ? "active" : ""
                }`}
              >
                Designation<span className="leave-required">*</span>
              </label>
            </div>

            <div className="leave-input-group">
              <input
                type="date"
                name="leaveDate"
                value={formData.leaveDate}
                onChange={handleChange}
                placeholder=" "
                required
                className="leave-input-field"
              />
              <label
                className="leave-floating-label active"
              >
                Leave Date<span className="leave-required">*</span>
              </label>
            </div>

            <div className="leave-input-group">
              <div className="leave-file-wrapper">
                <label className="leave-floating-label active">
                  Document<span className="leave-required">*</span>
                </label>
                <input
                  type="file"
                  name="document"
                  id="leave-file-input"
                  onChange={handleChange}
                  className="leave-file-input"
                />
                <span className="leave-upload-icon">📁</span>
              </div>
              {formData.document && (
                <div className="leave-file-name-wrapper">
                  <span className="leave-file-name">
                    {formData.document.name}
                  </span>
                  <span className="leave-file-remove" onClick={clearFile}>
                    &times;
                  </span>
                </div>
              )}
            </div>

            <div className="leave-input-group full-width">
              <textarea
                name="reason"
                placeholder=" "
                value={formData.reason}
                onChange={handleChange}
                required
                className="leave-textarea-field"
              ></textarea>
              <label
                className={`leave-floating-label ${
                  formData.reason ? "active" : ""
                }`}
              >
                Reason<span className="leave-required">*</span>
              </label>
            </div>
          </div>

          <div className="leave-form-actions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;

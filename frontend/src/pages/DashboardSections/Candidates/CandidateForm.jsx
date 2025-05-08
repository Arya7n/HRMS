
import React, { useState } from "react";
import "./CandidateForm.css";

const CandidateForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    file: null,
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="popup-wrapper">
      <div className="candidate-container">
        <div className="candidate-header">
          Add New Candidate
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="candidate-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Full Name"
              />
              <label className="floating-label">
                Full Name<span className="required">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Email Address"
              />
              <label className="floating-label">
                Email Address<span className="required">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="Phone Number"
              />
              <label className="floating-label">
                Phone Number<span className="required">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="position"
                required
                value={formData.position}
                onChange={handleChange}
                className="input-field"
                placeholder="Position"
              />
              <label className="floating-label">
                Position<span className="required">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                className="input-field"
                placeholder="Experience"
              />
              <label className="floating-label">
                Experience<span className="required">*</span>
              </label>
            </div>

            <div className="input-group file-input-group">
              <input
                type="file"
                id="resumeInput"
                name="file"
                required={!formData.file}
                onChange={handleChange}
                className="file-field"
              />
              <label
                className={`floating-label ${formData.file ? "active" : ""}`}
                htmlFor="resumeInput"
              >
                Resume <span className="required">*</span>
              </label>
              <div className="file-fake-display">
                <span className="file-name">
                  {formData.file ? formData.file.name : ""}
                </span>
                <div className="file-actions">
                  {!formData.file && (
                    <i className="fas fa-upload upload-icon"></i>
                  )}
                  {formData.file && (
                    <span
                      className="remove-file"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData((prev) => ({ ...prev, file: null }));
                        document.getElementById("resumeInput").value = null;
                      }}
                    >
                      &times;
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="declaration"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label htmlFor="declaration">
              I hereby declare that the above information is true to the best of
              my knowledge and belief
            </label>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!formData.agree}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;

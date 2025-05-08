import React, { useState, useEffect } from "react";
import "./Candidates.css";
import CandidateTable from "./CandidateTable";
import CandidateForm from "./CandidateForm";
import axios from "axios";
import Mail from "./../../../../public/Images/Mail.png";
import Notifications from "./../../../../public/Images/Notifications.png";
import Profile from "./../../../../public/Images/Profile.png";

const Candidates = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [candidates, setCandidates] = useState([]);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/candidate/list`);
      const data = res.data.map((c) => ({
        id: c._id,
        name: c.fullName,
        email: c.email,
        phone: c.phoneNumber,
        position: c.position,
        experience: c.experience,
        status: c.status || "New",
        resumePath: c.file,
      }));
      setCandidates(data);
    } catch (err) {
      console.error("Error fetching candidates", err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleAddCandidate = async (newCandidate) => {
    console.log("New candidate data:", newCandidate);
    const formData = new FormData();
    formData.append("fullName", newCandidate.name);
    formData.append("email", newCandidate.email);
    formData.append("phoneNumber", newCandidate.phone);
    formData.append("position", newCandidate.position);
    formData.append("experience", newCandidate.experience);
    formData.append("declaration", true);
    formData.append("file", newCandidate.file);

    console.log("Form data to be sent:", formData);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/candidate/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      fetchCandidates();
      setShowForm(false);
    } catch (err) {
      console.error("Error adding candidate", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/candidate/status/${id}`, { status: newStatus });
      fetchCandidates();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const handleDownload = (id) => {
    const candidate = candidates.find((c) => c.id === id);
    if (candidate?.resumePath) {
 window.open(
   `${import.meta.env.VITE_API_BASE_URL}/${candidate.resumePath}`,
   "_blank"
 );

    } else {
      alert("No resume found");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/candidate/delete/${id}`);
      fetchCandidates();
    } catch (err) {
      console.error("Error deleting candidate", err);
    }
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      (filterStatus ? candidate.status === filterStatus : true) &&
      (filterPosition
        ? candidate.position
            .toLowerCase()
            .includes(filterPosition.toLowerCase())
        : true) &&
      (search
        ? candidate.name.toLowerCase().includes(search.toLowerCase())
        : true)
  );

  return (
    <div className="candidates-container">
      <div className="header">
        {/* Top row: title + icons */}
        <div className="header-top">
          <h2>Candidates</h2>
          <div className="header-icons">
            <img src={Mail} alt="Mail" className="header-icon" />
            <img
              src={Notifications}
              alt="Notifications"
              className="header-icon"
            />
            <div className="profile-wrapper" onClick={toggleProfileDropdown}>
              <img src={Profile} alt="Profile" className="profile-img" />
              <span className="arrow-down">▾</span>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-item">Edit Profile</div>
                  <div className="dropdown-item">Change Password</div>
                  <div className="dropdown-item">Manage Notifications</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom row: filters */}
        <div className="filters-row">
          {/* Left Side - Filters */}
          <div className="filters-left">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="New">New</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
            >
              <option value="">Position</option>
              <option value="Designer">Designer</option>
              <option value="Developer">Developer</option>
              <option value="Human Resource">Human Resource</option>
            </select>
          </div>

          {/* Right Side - Search & Add */}
          <div className="filters-right">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="add-btn" onClick={() => setShowForm(true)}>
              Add Candidate
            </button>
          </div>
        </div>
      </div>

      <CandidateTable
        candidates={filteredCandidates}
        onStatusChange={handleStatusChange}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />

      {showForm && (
        <CandidateForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddCandidate}
        />
      )}
    </div>
  );
};

export default Candidates;

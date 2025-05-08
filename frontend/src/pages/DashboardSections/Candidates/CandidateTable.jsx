
import React, { useState } from "react";
import "./CandidateTable.css"; // Make sure this matches the updated class names

const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];

const CandidateTable = ({
  candidates,
  onStatusChange,
  onDelete,
  onDownload,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleThreeDotsClick = (candidateId) => {
    setSelectedCandidate((prev) => (prev === candidateId ? null : candidateId));
  };

  const handleDownload = () => {
    if (selectedCandidate) {
      onDownload(selectedCandidate);
      setSelectedCandidate(null);
    }
  };

  const handleDelete = () => {
    if (selectedCandidate) {
      onDelete(selectedCandidate);
      setSelectedCandidate(null);
    }
  };

  return (
    <div className="candidate-table-container">
      <table className="candidate-table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Candidates Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Status</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, idx) => (
            <tr key={c.id}>
              <td>{String(idx + 1).padStart(2, "0")}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.position}</td>
              <td>
                <select
                  className={`candidate-status-dropdown ${c.status.toLowerCase()}`}
                  value={c.status}
                  onChange={(e) => onStatusChange(c.id, e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>{c.experience}</td>
              <td>
                <button
                  className="candidate-action-btn"
                  onClick={() => handleThreeDotsClick(c.id)}
                >
                  ⋮
                </button>
                {selectedCandidate === c.id && (
                  <div className="candidate-action-options">
                    <button onClick={handleDownload}>Download Resume</button>
                    <button onClick={handleDelete}>Delete Candidate</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;

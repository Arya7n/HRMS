import React from "react";
import axios from "axios";
import "./LeaveTable.css";

const LeaveTable = ({ data, refresh, statusFilter, searchText }) => {
  const handleStatusChange = async (id, status) => {
    await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/leave/status/${id}`, { status });
     window.location.reload();
  };

  const handleDownload = (file) => {
    if (file) window.open(`${import.meta.env.VITE_API_BASE_URL}/${file}`, "_blank");
  };

  // Apply filters before rendering
  const filteredData = data
    .filter((l) =>
      statusFilter
        ? l.status.toLowerCase() === statusFilter.toLowerCase()
        : true
    )
    .filter((l) =>
      searchText
        ? l.name.toLowerCase().includes(searchText.toLowerCase()) ||
          l.reason.toLowerCase().includes(searchText.toLowerCase())
        : true
    );

  return (
    <div className="leave-table-container">
      <table className="leave-table">
        <thead>
          <tr className="leave-table-title-row">
            <th colSpan="6" className="leave-table-title-cell">
              Applied Leaves
            </th>
          </tr>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Leave Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Document</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((l, idx) => (
            <tr key={l._id}>
              <td>{String(idx + 1).padStart(2, "0")}</td>
              <td>
                <div className="leave-table-name-cell">
                  <div className="leave-name">{l.name}</div>
                  <div className="leave-department">{l.department}</div>
                </div>
              </td>
              <td>{new Date(l.leaveDate).toLocaleDateString()}</td>
              <td>{l.reason}</td>
              <td>
                <select
                  className={`leave-status-dropdown ${l.status.toLowerCase()}`}
                  value={l.status}
                  onChange={(e) => handleStatusChange(l._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>
                {l.document && (
                  <button
                    className="leave-table-doc-btn"
                    onClick={() => handleDownload(l.document)}
                  >
                    📄
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
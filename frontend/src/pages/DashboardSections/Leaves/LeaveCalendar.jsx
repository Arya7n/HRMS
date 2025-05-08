
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Leaves.css";

const LeaveCalendar = ({ data, onDateSelect, selectedDate }) => {
  const formatDate = (date) => date.toLocaleDateString("en-CA");

  const tileContent = ({ date, view }) => {
    const key = formatDate(date);
    if (view === "month" && data[key]) {
      return <div className="leave-calendar-dot">{data[key].length}</div>;
    }
    return null;
  };

  const handleClickDay = (value) => {
    const key = formatDate(value);
    onDateSelect(key);
  };

  const formatLeaveDate = (dateStr) => {
    console.log("formatLeaveDate", dateStr);
    if (!dateStr) return "Date not available";
    const parsed = new Date(dateStr);
    if (!isNaN(parsed)) {
      return parsed.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    // Fallback if stored in dd/mm/yyyy
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const fallback = new Date(`${year}-${month}-${day}`);
      return !isNaN(fallback)
        ? fallback.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Invalid Date";
    }
    return "Invalid Date";
  };

  return (
    <div className="leave-calendar-wrapper">
      <Calendar
        key={Object.keys(data).length}
        onClickDay={handleClickDay}
        tileContent={tileContent}
        value={selectedDate ? new Date(selectedDate) : new Date()}
      />

      {selectedDate && data[selectedDate] && (
        <div className="leave-approved-section">
          <div className="leave-approved-title">Approved Leaves</div>
          <ul className="leave-approved-list">
            {data[selectedDate].map((item, idx) => (
              <li key={idx} className="leave-approved-item">
                <div className="leave-approved-info">
                  <div className="leave-approved-name">
                    {item.name}
                    <span className="leave-approved-date">
                      {" "}
                      - {formatLeaveDate(selectedDate)}
                    </span>
                  </div>
                  <div className="leave-approved-role">{item.department}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeaveCalendar;

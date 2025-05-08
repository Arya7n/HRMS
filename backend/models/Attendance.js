const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
  task: { type: String, default: "" },
  status: { type: String, default: "Present" }, 
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);

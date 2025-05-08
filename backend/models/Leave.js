const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  name: String,
  department: String,
  leaveDate: Date,
  reason: String,
  document: String,
  status: { type: String, default: "Pending" }, 
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
});

module.exports = mongoose.model("Leave", LeaveSchema);

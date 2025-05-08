const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  position: String,
  department: String,
  doj: { type: Date, default: Date.now },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
});

module.exports = mongoose.model("Employee", EmployeeSchema);

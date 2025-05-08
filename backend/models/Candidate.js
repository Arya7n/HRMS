
const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    position: { type: String, required: true },
    experience: { type: String, required: true },
    file: { type: String }, 
    declaration: { type: Boolean, default: false },
    status: { type: String, default: "New" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", CandidateSchema);

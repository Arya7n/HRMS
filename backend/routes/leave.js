const express = require("express");
const router = express.Router();
const multer = require("multer");
const Leave = require("../models/Leave");



const upload = multer({ dest: "uploads/" });

// Add leave request
router.post("/add", upload.single("document"), async (req, res) => {
  try {
    const { name, department, leaveDate, reason } = req.body;
    const leave = new Leave({
      name,
      department,
      leaveDate,
      reason,
      document: req.file ? `uploads/${req.file.filename}` : null,
    });
    await leave.save();
    res.json({ message: "Leave added" });
  } catch (err) {
    res.status(500).json({ error: "Add leave failed" });
  }
});

// List leaves
router.get("/list", async (req, res) => {
  const leaves = await Leave.find().sort({ leaveDate: -1 });
  res.json(leaves);
});

// Update leave status
router.patch("/status/:id", async (req, res) => {
  await Leave.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.json({ message: "Status updated" });
});

// Get leave summary by date
router.get("/calendar", async (req, res) => {
  const approvedLeaves = await Leave.find({ status: "Approved" });
  const summary = {};

  approvedLeaves.forEach((leave) => {
    const dateKey = leave.leaveDate.toISOString().split("T")[0];
    if (!summary[dateKey]) summary[dateKey] = [];
    summary[dateKey].push({
      name: leave.name,
      department: leave.department,
      position: leave.position,
    });
  });

  res.json(summary);
});

module.exports = router;

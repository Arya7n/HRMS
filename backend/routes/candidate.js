// routes/candidate.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Candidate = require("../models/Candidate");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const { console } = require("inspector");

// Set up file storage
const upload = multer({ dest: "uploads/" });

// Add new candidate
router.post("/add", upload.single("file"), async (req, res) => {
  try {
    const { fullName, email, phoneNumber, position, experience, declaration } =
      req.body;

    const newCandidate = new Candidate({
      fullName,
      email,
      phoneNumber,
      position,
      experience,
      declaration: declaration === "true",
      file: req.file ? `uploads/${req.file.filename}` : null,
    });

    await newCandidate.save();
    res.status(200).json({ message: "Candidate added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Delete candidate
router.delete("/delete/:id", async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: "Candidate deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// PATCH: Update status
router.patch("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (status === "Selected" && candidate) {
      const [department, position] = candidate.position.split(" ");

      await new Employee({
        candidateId: candidate._id,
        name: candidate.fullName,
        email: candidate.email,
        phone: candidate.phoneNumber,
        position: position || "",
        department: department || "",
      }).save();

      await new Attendance({
        candidateId: candidate._id,
        name: candidate.fullName,
        position: position || "",
        department: department || "",
        status: "Present",
      }).save();
    }

    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

router.get("/employee/list", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Error fetching employees" });
  }
});

router.get("/attendance/list", async (req, res) => {
  try {
    const records = await Attendance.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Error fetching attendance" });
  }
});

router.post("/attendance/add", async (req, res) => {
  try {
    const { name, position, department, task, status } = req.body;
    const newRecord = new Attendance({
      name,
      position,
      department,
      task,
      status,
    });
    await newRecord.save();
    res.status(200).json({ message: "Attendance added" });
  } catch (err) {
    res.status(500).json({ error: "Error saving attendance" });
  }
});

// routes/candidate.js
router.patch("/employee/update/:candidateId", async (req, res) => {
  try {
    console.log(req.params.candidateId);
    await Employee.findOneAndUpdate(
      { candidateId: req.params.candidateId },
      req.body,
      {
        new: true,
      }
    );
    await Attendance.findOneAndUpdate(
      { candidateId: req.params.candidateId },
      { position: req.body.position },
      { new: true }
    );

    res.json({ message: "Employee updated" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/employee/delete/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// PATCH: Update attendance task or status
router.patch("/attendance/update/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Attendance updated" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;

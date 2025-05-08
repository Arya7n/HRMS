const mongoose = require("mongoose");
require('dotenv').config();

let dbConnected = false; // Store connection status

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    dbConnected = true; // Update status on success
  } catch (err) {
    console.error("DB Connection Error:", err);
    dbConnected = false; // Update status on failure
  }
}

function getDBStatus() {
  return dbConnected ? "DB Is Connected" : "DB Is Not Connected";
}

module.exports = { connectToDB, getDBStatus };

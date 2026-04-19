const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database
const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "attractions_db",
  port: 3306,
});

// --------------------
// HEALTH CHECK
// --------------------
app.get("/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 as ok");
    res.json({
      status: "ok",
      message: "API is running 🚀",
      db: rows[0].ok === 1,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

// --------------------
// GET ALL ATTRACTIONS
// --------------------
app.get("/attractions", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM attractions");

    res.json({
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      error: "Database error",
      message: err.message,
    });
  }
});

// --------------------
// GET ONE ATTRACTION (DETAIL)
// --------------------
app.get("/attractions/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM attractions WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Database error",
      message: err.message,
    });
  }
});

// --------------------
// SERVER START
// --------------------
const port = process.env.PORT || 3001;

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 API running on http://0.0.0.0:${port}`);
});
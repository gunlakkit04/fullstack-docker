const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// DB
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
    res.json({ status: "ok", db: rows[0].ok === 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------
// GET ALL CHICKENS
// --------------------
app.get("/chickens", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM chickens");

    res.json({
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// --------------------
// GET ONE CHICKEN
// --------------------
app.get("/chickens/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM chickens WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// START
const port = process.env.PORT || 3001;

app.listen(port, "0.0.0.0", () => {
  console.log(`API running on ${port}`);
});
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connection (Docker ใช้ service name = mysql)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "chicken_db",
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
      message: "API running",
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
// GET ALL CHICKENS
// --------------------
app.get("/chickens", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM chickens");

    res.json({
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// --------------------
// GET CHICKEN BY ID
// --------------------
app.get("/chickens/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM chickens WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.json({
      data: rows[0],
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// --------------------
// START SERVER
// --------------------
const port = process.env.PORT || 3001;

app.listen(port, "0.0.0.0", () => {
  console.log(`API running on port ${port}`);
});
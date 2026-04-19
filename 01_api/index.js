const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DB
const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "",
  database: "attractions_db",
  port: 3306,
});

// HEALTH
app.get("/health", async (req, res) => {
  const [rows] = await pool.query("SELECT 1 as ok");
  res.json({ status: "ok", db: rows[0].ok === 1 });
});

// GET ALL
app.get("/chickens", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM chickens");
  res.json({ data: rows });
});

// GET BY ID
app.get("/chickens/:id", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM chickens WHERE id = ?",
    [req.params.id]
  );

  res.json({ data: rows[0] || null });
});

app.listen(3001, "0.0.0.0", () => {
  console.log("API running on 3001");
});
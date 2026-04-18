const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql',   // 👈 สำคัญ (Docker ต้องใช้ชื่อ service)
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// --------------------
// HEALTH CHECK
// --------------------
app.get('/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({
      status: 'ok',
      database: rows[0].ok === 1
    });
  } catch (err) {
    console.error('Health error:', err);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

// --------------------
// GET ALL ATTRACTIONS
// --------------------
app.get('/attractions', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM attractions'); // 👈 แก้ให้ plural (มาตรฐาน)
    res.json(rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({
      error: 'Database query failed',
      detail: err.message
    });
  }
});

// --------------------
// SERVER START
// --------------------
const port = Number(process.env.PORT || 3001);

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 API running on http://0.0.0.0:${port}`);
});
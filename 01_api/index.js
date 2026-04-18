// --------------------
// GET SINGLE ATTRACTION (IMPORTANT)
// --------------------
app.get("/attractions/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const [rows] = await pool.query(
      "SELECT * FROM attractions WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        data: null,
        message: "Not found",
      });
    }

    res.json({
      data: rows[0],
    });

  } catch (err) {
    res.status(500).json({
      error: "Database error",
      message: err.message,
    });
  }
});
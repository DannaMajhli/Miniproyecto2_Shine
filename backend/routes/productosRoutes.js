router.get('/categoria/:categoria', async (req, res) => {
  const categoria = req.params.categoria;
  const [rows] = await pool.query(
    'SELECT * FROM productos WHERE categoria = ?',
    [categoria]
  );
  res.json(rows);
});
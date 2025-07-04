const express = require('express');
const router = express.Router();
const pool = require('../db');

// Submit production data
router.post('/', async (req, res) => {
  const { entry_date, person_in_charge, batch_number, stage, quantity } = req.body;
  if (!entry_date || !person_in_charge || !batch_number || !stage || !quantity) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    await pool.query(
      'INSERT INTO production_logs (entry_date, batch_number, stage, quantity, notes) VALUES ($1, $2, $3, $4, $5)',
      [entry_date, batch_number, stage, quantity, person_in_charge]
    );
    res.status(201).json({ message: 'Production data submitted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all production data (for staff view)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM production_logs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update a production entry (for staff edit)
router.put('/:id', async (req, res) => {
  const { entry_date, person_in_charge, batch_number, stage, quantity } = req.body;
  const { id } = req.params;
  if (!entry_date || !person_in_charge || !batch_number || !stage || !quantity) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    await pool.query(
      'UPDATE production_logs SET entry_date=$1, batch_number=$2, stage=$3, quantity=$4, notes=$5 WHERE id=$6',
      [entry_date, batch_number, stage, quantity, person_in_charge, id]
    );
    res.json({ message: 'Production data updated.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;

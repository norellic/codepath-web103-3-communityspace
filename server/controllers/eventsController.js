import { pool } from '../config/database.js';

export const getEvents = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM events');
    res.json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

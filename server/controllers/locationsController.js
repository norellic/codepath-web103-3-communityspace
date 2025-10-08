import { pool } from '../config/database.js';

const getLocations = async (req, res) => {
  try {
    const selectQuery = `
      SELECT id, name, address
      FROM locations
      ORDER BY id ASC
    `;
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getLocations
};
import { pool } from '../config/database.js';

export const getLocations = async (req, res) => {
  try {
    const selectQuery = `
      SELECT id, name, address, image
      FROM locations
      ORDER BY id ASC
    `;
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const getEventByLocationId = async (req, res) => {
    const { location_id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM events WHERE location_id = $1', [location_id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No events found for this location' });
      }
  
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
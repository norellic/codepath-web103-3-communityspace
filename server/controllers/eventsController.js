import { pool } from '../config/database.js';

const getEvents = async (req, res) => {
  try {
    const locationId = req.query.locationId ? parseInt(req.query.locationId) : null;
    let selectQuery = `
      SELECT e.*, l.name AS location_name, l.address AS location_address
      FROM events e
      JOIN locations l ON e.location_id = l.id
    `;
    const values = [];
    if (locationId) {
      selectQuery += ` WHERE e.location_id = $1`;
      values.push(locationId);
    }
    selectQuery += ` ORDER BY e.date ASC`;
    const results = await pool.query(selectQuery, values);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getEvents
};
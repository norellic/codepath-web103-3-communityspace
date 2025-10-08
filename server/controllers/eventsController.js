import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM events ORDER BY id ASC'
        const results = await pool.query(selectQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const { locationId } = req.params
        const selectQuery = 'SELECT * FROM events WHERE location_id = $1 ORDER BY id ASC'
        const results = await pool.query(selectQuery, [locationId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getEvents,
    getEventsByLocation
}

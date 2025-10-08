import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import EventsController from '../controllers/events.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Get all events
router.get('/', EventsController.getEvents)

// Get events for a specific location
router.get('/location/:locationId', EventsController.getEventsByLocation)

// Serve event page (optional)
router.get('/:eventId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/event.html'))
})

export default router

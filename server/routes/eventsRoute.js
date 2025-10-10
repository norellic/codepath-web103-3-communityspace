import express from 'express'
import { getEvents, getEventById } from '../controllers/eventsController.js'

const router = express.Router()

//route is getting your URL endpoint, and sending back a data package that that page will need(sometimes through the controller), otherwise just an html file

//must import the route to the server, saying app use(for this endpoint, this router)

// Get all events
router.get('/events', getEvents)
router.get('/events/:id', getEventById);

// // Get events for a specific location
//router.get('/location/:locationId', EventsController.getEventsByLocation)

export default router

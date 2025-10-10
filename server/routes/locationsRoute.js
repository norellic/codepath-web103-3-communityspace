import express from 'express'
import LocationsController from '../controllers/locationsController.js'

const router = express.Router()

// Get all locations
router.get('/locations', LocationsController.getLocations)

export default router

import express from 'express'
import { getLocations, getEventByLocationId } from '../controllers/locationsController.js'

const router = express.Router()

router.get('/locations', getLocations)
router.get('/locations/:location_id', getEventByLocationId)

export default router

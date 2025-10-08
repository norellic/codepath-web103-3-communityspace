import { pool } from './database.js'
import './dotenv.js'
import eventData from '../data/data.js'

// Create both tables
const createTables = async () => {
  const createTablesQuery = `
  DROP TABLE IF EXISTS events;
  DROP TABLE IF EXISTS locations;

  CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      description TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location_id INTEGER REFERENCES locations(id),
      date TIMESTAMP NOT NULL,
      description TEXT NOT NULL,
      attendees INTEGER NOT NULL
  );`

  try {
    await pool.query(createTablesQuery)
    console.log('🎉 locations and events tables created successfully')
  } catch (err) {
    console.error('⚠️ error creating tables', err)
  }
}

// Seed both tables
const seedTables = async () => {
  await createTables()

  // Step 1: Define 3 locations
  const locations = [
    {
      name: 'Maple Park',
      address: '120 Oak Ave',
      description: 'A family-friendly green space with concerts and markets.'
    },
    {
      name: 'Downtown Arts District',
      address: '45 Main St',
      description: 'Creative hub full of galleries, murals, and coffee shops.'
    },
    {
      name: 'Riverside Greenhouse',
      address: '8 River Rd',
      description: 'Community garden and sustainability center by the river.'
    }
  ]

  // Step 2: Insert locations and capture their IDs
  const locationMap = {}

  for (const loc of locations) {
    try {
      const result = await pool.query(
        'INSERT INTO locations (name, address, description) VALUES ($1, $2, $3) RETURNING id',
        [loc.name, loc.address, loc.description]
      )
      const id = result.rows[0].id
      locationMap[loc.name] = id
      console.log(`📍 ${loc.name} added (id: ${id})`)
    } catch (err) {
      console.error('⚠️ error inserting location', err)
    }
  }

  // Step 3: Insert events with location_id instead of location name
  for (const event of eventData) {
    const locId = locationMap[event.location]
    if (!locId) {
      console.error(`⚠️ location not found for event: ${event.name}`)
      continue
    }

    try {
      await pool.query(
        'INSERT INTO events (name, location_id, date, description, attendees) VALUES ($1, $2, $3, $4, $5)',
        [event.name, locId, event.date, event.description, event.attendees]
      )
      console.log(`✅ ${event.name} added successfully`)
    } catch (err) {
      console.error('⚠️ error inserting event', err)
    }
  }
}

seedTables()

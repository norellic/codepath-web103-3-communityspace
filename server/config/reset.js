import { pool } from './database.js';  
import './dotenv.js';     
import eventData from '../data/data.js';'../data/data.js'

const createEventsTable = async () => {
  const createTableQuery = `
  DROP TABLE IF EXISTS events;

  CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      date TIMESTAMP NOT NULL,
      description TEXT NOT NULL,
      attendees INTEGER NOT NULL
  )`

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 events table created successfully')
  } catch (err) {
    console.error('⚠️ error creating events table', err)
  }
}

const seedEventsTable = async () => {
  await createEventsTable()

  eventData.forEach((event) => {
    const insertQuery = {
      text: 'INSERT INTO events (name, location, date, description, attendees) VALUES ($1, $2, $3, $4, $5)',
    }

    const values = [
      event.name,
      event.location,
      event.date,
      event.description,
      event.attendees
    ]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting event', err)
        return
      }

      console.log(`✅ ${event.name} added successfully`)
    })
  })
}

seedEventsTable()

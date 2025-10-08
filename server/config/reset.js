import { pool } from './database.js';
import dotenv from 'dotenv';
import eventData from '../data/data.js';

dotenv.config({ path: '../.env' });

const createLocationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS locations CASCADE;
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL
    )`;
  try {
    await pool.query(createTableQuery);
    console.log('🎉 locations table created successfully');
  } catch (err) {
    console.error('⚠️ error creating locations table', err);
  }
};

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location_id INTEGER REFERENCES locations(id),
      date TIMESTAMP NOT NULL,
      description TEXT NOT NULL,
      attendees INTEGER NOT NULL
    )`;
  try {
    await pool.query(createTableQuery);
    console.log('🎉 events table created successfully');
  } catch (err) {
    console.error('⚠️ error creating events table', err);
  }
};

const seedLocationsTable = async () => {
  await createLocationsTable();
  // Extract unique locations
  const uniqueLocations = [];
  const locationMap = new Map();
  eventData.forEach((event, index) => {
    if (!locationMap.has(event.location)) {
      locationMap.set(event.location, {
        id: index + 1,
        name: event.location,
        address: event.address
      });
      uniqueLocations.push({
        id: index + 1,
        name: event.location,
        address: event.address
      });
    }
  });

  for (const location of uniqueLocations) {
    const insertQuery = {
      text: 'INSERT INTO locations (id, name, address) VALUES ($1, $2, $3)',
      values: [location.id, location.name, location.address],
    };
    try {
      await pool.query(insertQuery);
      console.log(`✅ ${location.name} added successfully`);
    } catch (err) {
      console.error(`⚠️ error inserting location ${location.name}`, err);
    }
  }
  return locationMap;
};

const seedEventsTable = async (locationMap) => {
  await createEventsTable();
  for (const event of eventData) {
    const locationId = locationMap.get(event.location).id;
    const insertQuery = {
      text: 'INSERT INTO events (id, name, location_id, date, description, attendees) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [
        event.id,
        event.name,
        locationId,
        event.date,
        event.description,
        event.attendees,
      ],
    };
    try {
      await pool.query(insertQuery);
      console.log(`✅ ${event.name} added successfully`);
    } catch (err) {
      console.error(`⚠️ error inserting event ${event.name}`, err);
    }
  }
};

const seedAllTables = async () => {
  const locationMap = await seedLocationsTable();
  await seedEventsTable(locationMap);
};

seedAllTables();
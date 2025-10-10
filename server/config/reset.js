import { pool } from './database.js';
import dotenv from 'dotenv';
import eventData from '../data/data.js';

dotenv.config({ path: '../.env' });

// Create locations table
const createLocationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS locations CASCADE;
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('🎉 locations table created successfully');
  } catch (err) {
    console.error('⚠️ error creating locations table', err);
  }
};

// Create events table
const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      location_id INTEGER REFERENCES locations(id),
      date TIMESTAMP NOT NULL,
      description TEXT NOT NULL,
      attendees INTEGER NOT NULL,
      image TEXT NOT NULL
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('🎉 events table created successfully');
  } catch (err) {
    console.error('⚠️ error creating events table', err);
  }
};

// Seed locations
const seedLocationsTable = async () => {
  await createLocationsTable();

  const locations = [
    { id: 1, name: 'Maple Park', address: '123 Park Ave, Cleveland, OH 44101' },
    { id: 2, name: 'Downtown Arts District', address: '456 Art St, Cleveland, OH 44102' },
    { id: 3, name: 'Riverside Greenhouse', address: '789 River Rd, Cleveland, OH 44103' }
  ];

  for (const location of locations) {
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
};

// Seed events
const seedEventsTable = async () => {
  await createEventsTable();

  for (const event of eventData) {
    const insertQuery = {
      text: `
        INSERT INTO events (id, title, location_id, date, description, attendees, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      values: [
        event.id,
        event.title,
        event.location_id,
        event.date,
        event.description,
        event.attendees,
        event.image
      ],
    };
    try {
      await pool.query(insertQuery);
      console.log(`✅ ${event.title} added successfully`);
    } catch (err) {
      console.error(`⚠️ error inserting event ${event.title}`, err);
    }
  }
};

// Seed all
const seedAllTables = async () => {
  await seedLocationsTable();
  await seedEventsTable();
};

seedAllTables();

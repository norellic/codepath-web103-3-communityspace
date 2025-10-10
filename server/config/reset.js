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
      address VARCHAR(255) NOT NULL,
      image TEXT NOT NULL
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('🎉 locations table created successfully');
  } catch (err) {
    console.error('⚠️ error creating locations table', err);
  }
};

// 🏗️ Create events table
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

// 🌱 Seed locations
const seedLocationsTable = async () => {
  await createLocationsTable();

  const locations = [
    {
      id: 1,
      name: 'Maple Park',
      address: '123 Park Ave, Cleveland, OH 44101',
      image: 'https://pdop.org/wp-content/uploads/2022/04/125-scaled.jpg'
    },
    {
      id: 2,
      name: 'Downtown Arts District',
      address: '456 Art St, Cleveland, OH 44102',
      image: 'https://media.timeout.com/images/105806495/image.jpg'
    },
    {
      id: 3,
      name: 'Riverside Greenhouse',
      address: '789 River Rd, Cleveland, OH 44103',
      image: 'https://res.cloudinary.com/micronetonline/image/upload/c_crop,h_720,w_959,x_0,y_0/f_auto/q_auto:best/v1738862422/tenants/7865ae27-f846-4716-89f4-473a170867fc/b7406bbc4cd6437abe35d2b46dcf83cd/472230816-1161114629348509-156622741988631335-n.jpg'
    }
  ];

  for (const location of locations) {
    const insertQuery = {
      text: 'INSERT INTO locations (id, name, address, image) VALUES ($1, $2, $3, $4)',
      values: [location.id, location.name, location.address, location.image],
    };
    try {
      await pool.query(insertQuery);
      console.log(`✅ ${location.name} added successfully`);
    } catch (err) {
      console.error(`⚠️ error inserting location ${location.name}`, err);
    }
  }
};

// 🌱 Seed events
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

// 🚀 Run seeding
const seedAllTables = async () => {
  await seedLocationsTable();
  await seedEventsTable();
  console.log('🌱 Database seeding complete!');
  pool.end();
};

seedAllTables();

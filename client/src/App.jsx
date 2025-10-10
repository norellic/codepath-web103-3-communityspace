import React, { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import Locations from './pages/Locations';
import LocationEvents from './pages/LocationEvents';
import Events from './pages/Events';
import LocationsAPI from './services/LocationsAPI';
import './App.css';

const App = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await LocationsAPI.getAllLocations();
        setLocations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load locations:', err);
      }
    })();
  }, []);

  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/:locationId',
      element: <LocationEvents />
    },
    {
      path: '/events',
      element: <Events />
    }
  ]);

  return (
    <div className='app'>
      <header className='main-header'>
        <h1>Really Cool Events</h1>
        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>
      <main>
        {element}
      </main>
    </div>
  );
};

export default App;
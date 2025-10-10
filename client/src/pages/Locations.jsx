import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocationsAPI from '../services/LocationsAPI';
import '../css/Locations.css';

const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const locationsData = await LocationsAPI.getAllLocations();
        setLocations(Array.isArray(locationsData) ? locationsData : []);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    })();
  }, []);

  return (
    <div className='available-locations container'>
      <h1>Locations</h1>
      {locations.length > 0 ? (
        <div className='grid'>
          {locations.map((location) => (
            <Link
              key={location.id}
              to={`/locations/${location.id}`}
              role='button'
              className='btn btn-primary'
            >
              {location.name}
            </Link>
          ))}
        </div>
      ) : (
        <p>No locations available.</p>
      )}
    </div>
  );
};

export default Locations;
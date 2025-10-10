import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Event from '../components/Event';
import LocationsAPI from '../services/LocationsAPI';
import '../css/LocationEvents.css';
import EventsAPI from "../services/EventsAPI";

const LocationEvents = () => {
    const [events, setEvents] = useState([]);
    const { locationId } = useParams(); // e.g. /locations/2 → locationId = "2"
    //console.log(locationId)
  
    useEffect(() => {
      (async () => {
        try {
          const data = await EventsAPI.getEvents(); // fetch all events
          console.log(data);
  
          // Filter by locationId (convert both sides to numbers for safety)
          const filteredEvents = Array.isArray(data)
            ? data.filter(event => Number(event.location_id) === Number(locationId))
            : [];
  
          setEvents(filteredEvents);
          console.log(events)
        } catch (err) {
          console.error("Failed to load events:", err);
        }
      })();
    }, [locationId]); // re-run if locationId changes
  
    return (
      <div>
        <h2>Events for Location {locationId}</h2>
        {events.length > 0 ? (
          <div className="card-grid">
          {events.map((ev) => (
            <Event id={ev.id} event={ev} />
          ))}
        </div>
        ) : (
          <p>No events found for this location.</p>
        )}
      </div>
    );
  };
  
  export default LocationEvents;
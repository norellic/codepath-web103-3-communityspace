import React, { useEffect, useState } from "react";
import Event from "../components/Event";
import EventsAPI from "../services/EventsAPI";

//get the api all events data
const Events = () => {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      (async () => {
        try {
          const data = await EventsAPI.getEvents();
          console.log(data);
          setEvents(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Failed to load events:", err);
        }
      })();
    }, []);

return (
//for each, map each data chunk to and event
<div className="card-grid">
        {events.map((ev) => (
          <Event id={ev.id} event={ev} />
        ))}
      </div>
)

}

export default Events;

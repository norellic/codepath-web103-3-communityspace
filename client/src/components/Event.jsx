import React, { useState, useEffect } from 'react'
import '../css/Event.css'
import EventsAPI from "../services/EventsAPI";

const Event = ({ event }) => {
    return (
      <article className='event-information'>
        <img src={event.image} alt={event.title} />
  
        <div className='event-information-overlay'>
          <div className='text'>
            <h3>{event.title}</h3>
            <p><i className="fa-regular fa-calendar fa-bounce"></i> {event.date}</p>
            <p>{event.attendees} attendees</p>
          </div>
        </div>
      </article>
    );
  };

export default Event
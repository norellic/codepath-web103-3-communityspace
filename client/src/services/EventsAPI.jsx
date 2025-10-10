const EventsAPI = {
    getEvents: async () => {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    },
  
    getEventsById: async (id) => {
      const res = await fetch(`'/api/events'/${id}`);
      if (!res.ok) throw new Error('Failed to fetch event');
      return res.json();
    }
  };
  
  export default EventsAPI;
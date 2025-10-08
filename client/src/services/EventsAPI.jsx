const getEvents = async (locationId) => {
    try {
      const response = await fetch(`/events?locationId=${locationId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };
  
  export default {
    getEvents
  };
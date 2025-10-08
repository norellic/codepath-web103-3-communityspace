const getAllLocations = async () => {
    try {
      const response = await fetch('/locations');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  };
  
  export default {
    getAllLocations
  };
// Fetch all events
export const getAllEvents = async () => {
    try {
        const response = await fetch('/api/events')
        if (!response.ok) throw new Error('Failed to fetch events')
        return await response.json()
    } catch (error) {
        console.error('Error fetching events:', error)
        return []
    }
}

// Fetch events for a specific location
export const getEventsByLocation = async (locationId) => {
    try {
        const response = await fetch(`/api/events/location/${locationId}`)
        if (!response.ok) throw new Error('Failed to fetch events for location')
        return await response.json()
    } catch (error) {
        console.error(`Error fetching events for location ${locationId}:`, error)
        return []
    }
}

// Fetch a single event by its ID
export const getEventById = async (eventId) => {
    try {
        const response = await fetch(`/api/events/${eventId}`)
        if (!response.ok) throw new Error('Failed to fetch event')
        return await response.json()
    } catch (error) {
        console.error(`Error fetching event ${eventId}:`, error)
        return null
    }
}

// Fetch all locations
export const getAllLocations = async () => {
    try {
        const response = await fetch('/api/locations')
        if (!response.ok) throw new Error('Failed to fetch locations')
        return await response.json()
    } catch (error) {
        console.error('Error fetching locations:', error)
        return []
    }
}

// Fetch a single location by its ID (optional)
export const getLocationById = async (locationId) => {
    try {
        const response = await fetch(`/api/locations/${locationId}`)
        if (!response.ok) throw new Error('Failed to fetch location')
        return await response.json()
    } catch (error) {
        console.error(`Error fetching location ${locationId}:`, error)
        return null
    }
}

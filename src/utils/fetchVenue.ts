// this is return value: Promise<{ latitude: number; longitude: number } | null>
const fetchVenue = async (venueSlug: string | undefined) : Promise<{ latitude: number; longitude: number } | null> => {
    try {
        const response = await fetch(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`);
        if (!response.ok) {
            throw new Error(`Failed to fetch venue data: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`data.latitude is ${data.venue_raw.location.coordinates[0]}`);
        console.log(`data.longitude is ${data.venue_raw.location.coordinates[1]}`);
        console.log(data);
        return {
            latitude: data.venue_raw.location.coordinates[0],
            longitude: data.venue_raw.location.coordinates[1]
        };

    } catch (error) {
        console.error('Error fetching venue data:', error);
        return null;
    }
};

export default fetchVenue;


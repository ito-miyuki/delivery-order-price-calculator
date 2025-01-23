import { DistanceRange } from "../utils/calculateFee";

type VenueData = {
    latitude: number;
    longitude: number;
    orderMinimum: number;
    basePrice: number,
    distanceRanges: DistanceRange[];
};

const fetchVenue = async (venueSlug: string | null): Promise<VenueData | null> => {
    if (!venueSlug) {
        console.error("Venue slug is undefined.");
        return null;
    }

    const endpoints = {
        static: `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`,
        dynamic: `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`,
    };

    const fetchData = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.warn(`Failed to fetch from ${url}: ${response.statusText}`);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching from ${url}:`, error);
            return null;
        }
    };

    const staticData = await fetchData(endpoints.static);
    const coordinates = staticData?.venue_raw?.location?.coordinates;
    const latitude = coordinates ? coordinates[1] : null;
    const longitude = coordinates ? coordinates[0] : null;

    // 最低注文額を取得
    const dynamicData = await fetchData(endpoints.dynamic);
    const orderMinimum = dynamicData?.venue_raw?.delivery_specs?.order_minimum_no_surcharge ?? 0;
    
    const basePrice = dynamicData?.venue_raw?.delivery_specs?.delivery_pricing?.base_price ?? 0;
    const distanceRanges = dynamicData?.venue_raw?.delivery_specs?.delivery_pricing?.distance_ranges || [];

    if (latitude !== null && longitude !== null) { // should I check ordermin, baseprice, are also not null
        // console.log(`Venue data successfully fetched:`, {
        //     latitude,
        //     longitude,
        //     orderMinimum,
        //     basePrice,
        //     distanceRanges,
        // });
        return { latitude, longitude, orderMinimum, basePrice, distanceRanges };
    }

    console.error("Failed to fetch venue data from both endpoints.");
    return null;
};

export default fetchVenue;

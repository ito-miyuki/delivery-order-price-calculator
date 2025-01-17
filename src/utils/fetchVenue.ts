
type VenueData = {
    latitude: number;
    longitude: number;
    orderMinimum: number;
};

const fetchVenue = async (venueSlug: string | undefined): Promise<VenueData | null> => {
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

    // 緯度と経度を取得
    const staticData = await fetchData(endpoints.static);
    const coordinates = staticData?.venue_raw?.location?.coordinates;
    const latitude = coordinates ? coordinates[1] : null;
    const longitude = coordinates ? coordinates[0] : null;

    // 最低注文額を取得
    const dynamicData = await fetchData(endpoints.dynamic);
    const orderMinimum = dynamicData?.venue_raw?.delivery_specs?.order_minimum_no_surcharge ?? 0;

    if (latitude !== null && longitude !== null) {
        console.log(`Venue data successfully fetched:`, {
            latitude,
            longitude,
            orderMinimum,
        });
        return { latitude, longitude, orderMinimum };
    }

    console.error("Failed to fetch venue data from both endpoints.");
    return null;
};

// type VenueData = {
//     latitude: number;
//     longitude: number;
//     orderMinimum: number;
// };

// // this is return value: Promise<VenueData | null>
// const fetchVenue = async (venueSlug: string | undefined): Promise<VenueData | null> => {
//     if (!venueSlug) {
//         console.error("Venue slug is undefined.");
//         return null;
//     }

//     const endpoints = {
//         static: `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`,
//         dynamic: `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`,
//     };

//     // 共通の fetch ロジック
//     const fetchData = async (url: string) => {
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 console.warn(`Failed to fetch from ${url}: ${response.statusText}`);
//                 return null;
//             }
//             return await response.json();
//         } catch (error) {
//             console.error(`Error fetching from ${url}:`, error);
//             return null;
//         }
//     };

//     // 緯度と経度を取得
//     const staticData = await fetchData(endpoints.static);
//     const coordinates = staticData?.venue_raw?.location?.coordinates;
//     const latitude = coordinates ? coordinates[1] : null;
//     const longitude = coordinates ? coordinates[0] : null;

//     // 最低注文額を取得
//     const dynamicData = await fetchData(endpoints.dynamic);
//     const orderMinimum = dynamicData?.venue_raw?.delivery_specs?.order_minimum_no_surcharge ?? 0;

//     if (latitude !== null && longitude !== null) {
//         return { latitude, longitude, orderMinimum };
//     }

//     console.error("Failed to fetch venue data from both endpoints.");
//     return null;
// };

export default fetchVenue;


const calculateDistance = (
    venueLatitude: number,
    venueLongitude: number,
    userLatitude: number,
    userLongitude: number
): number => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180; // 度をラジアンに変換

    const R = 6371; // 地球の半径 (km)
    const dLat = toRadians(userLatitude - venueLatitude);
    const dLon = toRadians(userLongitude - venueLongitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(venueLatitude)) *
        Math.cos(toRadians(userLatitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c); // 距離 (km)
};

export default calculateDistance;
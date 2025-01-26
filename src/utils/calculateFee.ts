import { CENT_FORMAT, RADIUS } from "../constants";

const calculateDistance = (
    venueLatitude: number,
    venueLongitude: number,
    userLatitude: number,
    userLongitude: number
): number => {
    const toRadians = (degree: number) => (degree * Math.PI) / 180; // Converts degrees to radians

    // Calculate differences in latitude and longitude, and convert to radians
    const deltaLat = toRadians(userLatitude - venueLatitude);
    const deltaLon = toRadians(userLongitude - venueLongitude);

    // Calculate an intermediate value using the Haversine formula
    const intermediateValue =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(toRadians(venueLatitude)) *
        Math.cos(toRadians(userLatitude)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    
    // Calculate the arc angle in radians
    const arcAngle = 2 * Math.atan2(Math.sqrt(intermediateValue), Math.sqrt(1 - intermediateValue));
    return Math.round(RADIUS * arcAngle * 1000);  // RADIUS = Earth's radius in km
};

const calculateDeliveryFee = (
    distance: number,
    basePrice: number,
    distanceRanges: DistanceRange[]
): number | null => {
    for (const range of distanceRanges) {
        if (range.max === 0) {
            if (distance >= range.min) {
                return null;
            }
        }
        if (distance >= range.min && distance < range.max) {
            const variableFee = range.b * (distance / 10);
            const totalFee = basePrice + range.a + variableFee;
            return Math.round(totalFee);
        }
    }
    return null;
};

export type FeeCalculationResult = {
    smallOrderFee: number;
    deliveryFee: number;
    deliveryDistance: number;
    totalPrice: number;
};

export type DistanceRange = {
    min: number;
    max: number;
    a: number;
    b: number;
};

export const calculateFee = ({
      cartValue,
      userLatitude,
      userLongitude,
      venueLatitude,
      venueLongitude,
      orderMinimum,
      basePrice,
      distanceRanges
    }: {
      cartValue: number | null,
      userLatitude: number | null,
      userLongitude: number | null,
      venueLatitude: number | null,
      venueLongitude: number | null,
      orderMinimum: number | null,
      basePrice: number | null,
      distanceRanges: DistanceRange[]
}): FeeCalculationResult & { errorMessage?: string } => {
    if (
        !cartValue ||
        !userLatitude ||
        !userLongitude ||
        !venueLatitude ||
        !venueLongitude ||
        !orderMinimum ||
        !basePrice ||
        distanceRanges.length === 0
    ) {
        return {
            smallOrderFee: 0,
            deliveryFee: 0,
            deliveryDistance: 0,
            totalPrice: 0,
            errorMessage: "Invalid input data."
        };
    }

    const smallOrderFee = (cartValue * CENT_FORMAT) < orderMinimum ? orderMinimum - (cartValue * CENT_FORMAT) : 0;
    const deliveryDistance = calculateDistance(venueLatitude, venueLongitude, userLatitude, userLongitude);
            
    const deliveryFee = calculateDeliveryFee(deliveryDistance, basePrice, distanceRanges);
    if (deliveryFee === null) {
        return {
            smallOrderFee,
            deliveryFee: 0,
            deliveryDistance,
            totalPrice: 0,
            errorMessage: `Delivery is not available for this distance.\nDelivery distance: ${deliveryDistance} m.`,
        };
    }

    const totalPrice = (cartValue * CENT_FORMAT) + smallOrderFee + deliveryFee;

    return {
        smallOrderFee,
        deliveryFee,
        deliveryDistance,
        totalPrice,
    };
};
import { CENT_FORMAT, RADIUS } from "../constants";

// what formula is it using?
const calculateDistance = (
    venueLatitude: number,
    venueLongitude: number,
    userLatitude: number,
    userLongitude: number
): number => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRadians(userLatitude - venueLatitude);
    const dLon = toRadians(userLongitude - venueLongitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(venueLatitude)) *
        Math.cos(toRadians(userLatitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(RADIUS * c * 1000); // in meter(m)
};


const calculateDeliveryFee = (
    distance: number,
    basePrice: number,
    distanceRanges: DistanceRange[]
): number | null => {
    for (const range of distanceRanges) {
        if (distance >= range.min && (range.max === 0 || distance < range.max)) {
            const variableFee = Math.round(range.b * (distance / 10));
            return basePrice + range.a + variableFee;
        }
    }
    return null;
};

export type FeeCalculationResult = {
    smallOrderFee: number;
    deliveryFee: number;
    deliveryDis: number;
    totalPrice: number;
};

export type DistanceRange = {
    min: number; // 距離範囲の下限 (メートル)
    max: number; // 距離範囲の上限 (メートル)
    a: number;   // 固定料金
    b: number;   // 距離ベースの追加料金係数
};

const calculateFee = ({
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
}): FeeCalculationResult => {

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
            deliveryDis: 0,
            totalPrice: 0,
        };
    }

    const smallOrderFee = (cartValue * CENT_FORMAT) < orderMinimum ? orderMinimum - (cartValue * CENT_FORMAT) : 0;
    const deliveryDis = calculateDistance(venueLatitude, venueLongitude, userLatitude, userLongitude);
            
    const deliveryFee = calculateDeliveryFee(deliveryDis, basePrice, distanceRanges);
    if (deliveryFee === null) {
        console.error("Delivery is not available for this distance.");
        return {
            smallOrderFee,
            deliveryFee: 0,
            deliveryDis,
            totalPrice: 0,
        };
    }

    const totalPrice = (cartValue * CENT_FORMAT) + smallOrderFee + deliveryFee;

    return {
        smallOrderFee,
        deliveryFee,
        deliveryDis,
        totalPrice,
    };
};

export default calculateFee;

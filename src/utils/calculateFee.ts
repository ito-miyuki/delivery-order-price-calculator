import calculateDistance from "./calculateDistance";
import calculateDeliveryFee from "./calculateDeliveryFee";

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

const calculateFee = (
    cartValue: number | null,
    userLatitude: number | null,
    userLongitude: number | null,
    venueLatitude: number | null,
    venueLongitude: number | null,
    orderMinimum: number | null,
    basePrice: number | null,
    distanceRanges: DistanceRange[]
): FeeCalculationResult => {

    // for testing, delete those
    // console.log("check values");
    // console.log(`${cartValue}`);
    // console.log(`${userLatitude}`);
    // console.log(`${userLongitude}`);
    // console.log(`${venueLatitude}`);
    // console.log(`${venueLongitude}`);
    // console.log(`${orderMinimum}`);
    // console.log(`${basePrice}`);

    if (
        !cartValue ||
        !userLatitude ||
        !userLongitude ||
        !venueLatitude ||
        !venueLongitude ||
        !orderMinimum ||
        !basePrice ||
        !distanceRanges ||
        distanceRanges.length === 0 // do we need it?
    ) {
        console.error("Invalid input for delivery fee calculation.");
        return {
            smallOrderFee: 0,
            deliveryFee: 0,
            deliveryDis: 0,
            totalPrice: 0,
        };
    }

    const smallOrderFee = cartValue < orderMinimum ? orderMinimum - cartValue : 0;
    const deliveryDis = calculateDistance(venueLatitude, venueLongitude, userLatitude, userLongitude);
            
    const deliveryFee = calculateDeliveryFee(deliveryDis * 1000, basePrice, distanceRanges);
    if (deliveryFee === null) {
        console.error("Delivery is not available for this distance.");
        return {
            smallOrderFee,
            deliveryFee: 0,
            deliveryDis,
            totalPrice: 0,
        };
    }

    const totalPrice = cartValue + smallOrderFee + deliveryFee;

    return {
        smallOrderFee,
        deliveryFee,
        deliveryDis,
        totalPrice,
    };
};

export default calculateFee;
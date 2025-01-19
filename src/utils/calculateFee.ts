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
    return Math.round(R * c * 1000); // 距離 (km)
};


const calculateDeliveryFee = (
    distance: number,
    basePrice: number,
    distanceRanges: DistanceRange[]
): number | null => {
    // 距離範囲に基づく料金計算
    for (const range of distanceRanges) {
        if (distance >= range.min && (range.max === 0 || distance < range.max)) {
            const variableFee = Math.round(range.b * (distance / 10)); // 距離ベース料金
            return basePrice + range.a + variableFee;
        }
    }
    // 配送不可の場合
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

    const smallOrderFee = (cartValue * 100) < orderMinimum ? orderMinimum - (cartValue * 100) : 0;
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

    const totalPrice = (cartValue * 100) + smallOrderFee + deliveryFee;

    return {
        smallOrderFee,
        deliveryFee,
        deliveryDis,
        totalPrice,
    };
};

export default calculateFee;

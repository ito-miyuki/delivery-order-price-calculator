import { DistanceRange } from "./calculateFee"

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

export default calculateDeliveryFee;
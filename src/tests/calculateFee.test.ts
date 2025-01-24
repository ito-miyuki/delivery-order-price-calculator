import { expect, test } from 'vitest'
import calculateFee from '../utils/calculateFee'

test('calculates delivery fee and total price for a short distance', () => {
    const cartValue = 10;
    const userLatitude = 60.17094;
    const userLongitude = 24.93087;
    const venueLatitude = 60.17012143;
    const venueLongitude = 24.92813512;
    const orderMinimum = 1000; // 10€
    const basePrice = 190; // 1.90€
    const distanceRanges = [
        { min: 0, max: 500, a: 0, b: 0, flag: null },
        { min: 500, max: 1000, a: 100, b: 0, flag: null },
        { min: 1000, max: 1500, a: 200, b: 0, flag: null },
        { min: 1500, max: 2000, a: 200, b: 1, flag: null },
        { min: 2000, max: 0, a: 0, b: 0, flag: null },
    ];

    const result = calculateFee({
        cartValue,
        userLatitude,
        userLongitude,
        venueLatitude,
        venueLongitude,
        orderMinimum,
        basePrice,
        distanceRanges,
    });
    expect(result.deliveryFee).toBe(190);
    expect(result.deliveryDis).toBe(177);
    expect(result.totalPrice).toBe(1190);
});

test('calculates delivery fee for a long distance with correct range-based pricing', () => {
    const cartValue = 10;
    const userLatitude = 60.170751;
    const userLongitude = 24.918719;
    const venueLatitude = 60.17012143;
    const venueLongitude = 24.92813512;
    const orderMinimum = 1000; // 10€
    const basePrice = 190; // 1.90€
    const distanceRanges = [
        { min: 0, max: 500, a: 0, b: 0, flag: null },
        { min: 500, max: 1000, a: 100, b: 0, flag: null },
        { min: 1000, max: 1500, a: 200, b: 0, flag: null },
        { min: 1500, max: 2000, a: 200, b: 1, flag: null },
        { min: 2000, max: 0, a: 0, b: 0, flag: null },
    ];

    const result = calculateFee({
        cartValue,
        userLatitude,
        userLongitude,
        venueLatitude,
        venueLongitude,
        orderMinimum,
        basePrice,
        distanceRanges,
    });

    expect(result.deliveryFee).toBe(290);
    expect(result.deliveryDis).toBe(525);
    expect(result.totalPrice).toBe(1290);
});

test("returns 0 delivery fee and total price if distance is not covered", () => {
    const cartValue = 10;
    const userLatitude = 60.1754347;
    const userLongitude = 24.8248982;
    const venueLatitude = 60.17012143;
    const venueLongitude = 24.92813512;
    const orderMinimum = 1000; // 10€
    const basePrice = 190; // 1.90€
    const distanceRanges = [
        { min: 0, max: 500, a: 0, b: 0, flag: null },
        { min: 500, max: 1000, a: 100, b: 0, flag: null },
        { min: 1000, max: 1500, a: 200, b: 0, flag: null },
        { min: 1500, max: 2000, a: 200, b: 1, flag: null },
        { min: 2000, max: 0, a: 0, b: 0, flag: null },
    ];

    const result = calculateFee({
        cartValue,
        userLatitude,
        userLongitude,
        venueLatitude,
        venueLongitude,
        orderMinimum,
        basePrice,
        distanceRanges,
    });

    expect(result.deliveryFee).toBe(0);
    expect(result.deliveryDis).toBe(5740); // 距離 (メートル)
    expect(result.totalPrice).toBe(0);
});

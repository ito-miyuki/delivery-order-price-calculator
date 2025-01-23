import { expect, test } from 'vitest'
import calculateFee from '../utils/calculateFee'

// test 1
test('test1(modify the title)', () => {
    const cartValue = 10;
    const userLatitude = 60.17094;
    const userLongitude = 24.93087;
    const venueLatitude = 60.17012143;
    const venueLongitude = 24.92813512;
    const orderMinimum = 1000; // 10€
    const basePrice = 190; // 1.90€
    const distanceRanges = [
        { min: 0, max: 500, a: 0, b: 0, flag: null },
        { min: 500, max: 1000, a: 100, b: 1, flag: null },
        { min: 1000, max: 0, a: 0, b: 0, flag: null }
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

// test 2
test('test2(modify the title)', () => {
    const cartValue = 10;
    const userLatitude = 60.1754347;
    const userLongitude = 24.8248982;
    const venueLatitude = 60.17012143;
    const venueLongitude = 24.92813512;
    const orderMinimum = 1000; // 10€
    const basePrice = 190; // 1.90€
    const distanceRanges = [
        { min: 0, max: 500, a: 0, b: 0, flag: null },
        { min: 500, max: 1000, a: 100, b: 1, flag: null },
        { min: 1000, max: 0, a: 0, b: 0, flag: null }
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
    expect(result.deliveryDis).toBe(5740);
    expect(result.totalPrice).toBe(1190);
});

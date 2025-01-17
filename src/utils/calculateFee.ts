export type FeeCalculationResult = {
    smallOrderFee: number;
    deliveryFee: number;
    totalPrice: number;
};

const calculateFee = (
    cartValue: number | null,
    userLatitude: number | null,
    userLongitude: number | null,
    venueLatitude: number | null,
    venueLongitude: number | null,
    orderMinimum: number | null
): FeeCalculationResult => {
    if (!cartValue || !userLatitude || !userLongitude || !venueLatitude || !venueLongitude || !orderMinimum) {
        console.error("Invalid input for delivery fee calculation.");
        return {
            smallOrderFee: 0,
            deliveryFee: 0,
            totalPrice: 0,
        };
    }

    const smallOrderFee = cartValue < orderMinimum ? orderMinimum - cartValue : 0;
    const deliveryFee = 5; // 仮の配送料
    const totalPrice = cartValue + smallOrderFee + deliveryFee;

    console.log(`smallOrderFee is ${smallOrderFee}`);
    return {
        smallOrderFee,
        deliveryFee,
        totalPrice,
    };
};


// const calculateFee = (
//     cartValue: number | null,
//     userLatitude: number | null ,
//     userLongitude: number | null,
//     venueLatitude: number | null,
//     venueLongitude: number | null,
//     orderMinimum: number | null): number => {
//     // logic here
//     if (!cartValue || !userLatitude || !userLongitude || !venueLatitude || !venueLongitude || !orderMinimum) {
//         console.error('Invalid input for delivery fee calculation.');
//         return 0;
//     }
//     const smallOrderFee = cartValue < orderMinimum ? orderMinimum - cartValue : 0;

//     const deliveryFee = 0;
    
//     // for testing
//     console.log(`cart value is ${cartValue}`);
//     console.log(`user latitude is ${userLatitude}`);
//     console.log(`use longitude is ${userLongitude}`);
//     console.log(`venue latitude is ${venueLatitude}`);
//     console.log(`venue longitude is ${venueLongitude}`);
//     console.log(`order Minimum is ${orderMinimum}`);
//     console.log(`deliveryFee is ${deliveryFee}`);

//     return deliveryFee + smallOrderFee;
// }

export default calculateFee;
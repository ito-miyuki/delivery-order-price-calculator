

const calculateFee = (
    cartValue: number | undefined,
    userLatitude: number | undefined ,
    userlongitude: number | undefined,
    venueLatitude: number | null,
    venueLongitude: number | null): number => {
    // logic here
    const delivertFee = 728;
    
    console.log(`cart value is ${cartValue}`);
    console.log(`user latitude is ${userLatitude}`);
    console.log(`use longitude is ${userlongitude}`);
    console.log(`venue latitude is ${venueLatitude}`);
    console.log(`venue longitude is ${venueLongitude}`);
    console.log(`deliveryFee is ${delivertFee}`);
    return delivertFee; // change it
}

export default calculateFee;
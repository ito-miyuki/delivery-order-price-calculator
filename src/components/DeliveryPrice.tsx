type FormProps = {
    venue: string | undefined;
    setVenue: React.Dispatch<React.SetStateAction<string | undefined>>;
    cartValue: number | undefined;
    setCartValue: React.Dispatch<React.SetStateAction<number | undefined>>;
    latitude: number | undefined;
    setLatitude: React.Dispatch<React.SetStateAction<number | undefined>>;
    longitude: number | undefined;
    setLongitude: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function DeliveryPrice({
    cartValue,
    latitude,
    longitude,
    venueLatitude,
    venueLongitude,}: DeliveryPriceProps) {

    const totalPrice = cartValue;

    
 return (
    <>
    <p>Price Breakdown</p>
    <p>Cart Value: {cartValue}€</p>
    <p>Delivery fee: </p>
    <p>Delivery distance: </p>
    <p>Small order surcharge: </p>
    <p>Total price: {totalPrice}€</p>
    </>
 )   
}

export default DeliveryPrice;
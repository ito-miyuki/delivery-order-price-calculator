type DeliveryPriceProps = {
    cartValue: number | undefined;
}

function DeliveryPrice({cartValue}: DeliveryPriceProps) {

 return (
    <>
    <p>Price Breakdown</p>
    <p>Cart Value: {cartValue}€</p>
    <p>Delivery fee: </p>
    <p>Delivery distance: </p>
    <p>Small order surcharge: </p>
    <p>Total price: </p>
    </>
 )   
}

export default DeliveryPrice;
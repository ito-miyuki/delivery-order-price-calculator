type DeliveryPriceProps = {
    cartValue: number | null;
    deliveryFee: number;
    deliveryDis: number;
    surcharge: number;
    total: number;
};

function DeliveryPrice({
    cartValue,
    deliveryFee,
    deliveryDis,
    surcharge,
    total,
}: DeliveryPriceProps) {
    return (
        <div>
            <h2>Price Breakdown</h2>
            <p>Cart Value: {cartValue ?? 0}€</p>
            <p>Delivery Fee: {deliveryFee}€</p>
            <p>Delivery Distance: {deliveryDis} km</p>
            <p>Small Order Surcharge: {surcharge}€</p>
            <p>Total Price: {total}€</p>
        </div>
    );
}

export default DeliveryPrice;
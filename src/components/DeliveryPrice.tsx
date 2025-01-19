import "./DeliveryPrice.css"

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
        <div className="delivery-price-container">
            <div className="total-value">
                <span className="topic">Total Price</span><span className="value">{total}€</span>
            </div>
            <hr className="divider" />
            <p className="breakdown">Price Breakdown</p>
            <div className="breakdown-value">
                <span className="topic">Cart Value</span><span className="value">{cartValue ?? 0}€</span>
            </div>
            <div className="breakdown-value">
                <span className="topic">Delivery Fee</span><span className="value">{deliveryFee}€</span>
            </div>
            <div className="breakdown-value">
                <span className="topic">Delivery Distance</span><span className="value">{deliveryDis}€</span>
            </div>
            <div className="breakdown-value">
                <span className="topic">Small Order Surcharge</span><span className="value">{surcharge}€</span>
            </div>
        </div>
    );
}

export default DeliveryPrice;
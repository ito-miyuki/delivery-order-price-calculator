import "./PriceBreakdown.css"

type PriceBreakdownProps = {
    cartValue: number | null;
    deliveryFee: number;
    deliveryDistance: number;
    surcharge: number;
    total: number;
};

export function PriceBreakdown({
    cartValue,
    deliveryFee,
    deliveryDistance,
    surcharge,
    total,
}: PriceBreakdownProps) {

    return (
        <div className="delivery-price-container">
            <div className="total-value">
                <span className="topic">Total Price</span>
                <span className="value" data-test-id="totalPrice" data-raw-value={total}>{(total / 100).toFixed(2)} €</span>
            </div>
            <hr className="divider" />
            <p className="breakdown">Price Breakdown</p>
            <div className="breakdown-value">
                <span className="topic">Cart Value</span>
                <span className="value" data-test-id="pricebreakdown-cartValue" data-raw-value={cartValue ? cartValue * 100 : 0}>{cartValue ? cartValue : 0} €</span>
            </div>
            <div className="breakdown-value">
                <span className="topic">Delivery Fee</span>
                <span className="value" data-test-id="deliveryFee" data-raw-value={deliveryFee}>{(deliveryFee / 100).toFixed(2)} €</span>
            </div>
            <div className="breakdown-value">
                <span className="topic">Delivery Distance</span>
                <span className="value" data-test-id="deliveryDistance" data-raw-value={deliveryDistance}>{deliveryDistance} m</span>
            </div>
            <div className="breakdown-value">
                <span className="topic">Small Order Surcharge</span>
                <span className="value" data-test-id="smallOrderSurcharge" data-raw-value={surcharge}>{(surcharge / 100).toFixed(2)} €</span>
            </div>
        </div>
    );
}
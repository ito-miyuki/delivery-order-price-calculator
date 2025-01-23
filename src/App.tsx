import './App.css'
import Form from './components/Form'
import DeliveryPrice from './components/DeliveryPrice'
import { useState } from 'react';
import type { FeeCalculationResult } from './utils/calculateFee';

function App() {
    const [venueSlug, setVenueSlug] = useState<string>("");
    const [cartValue, setCartValue] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const [surcharge, setSurcharge] = useState<number>(0);
    const [deliveryFee, setDeliveryFee] = useState<number>(0);
    const [deliveryDis, setDeliveryDis] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    // result is a parameter and FeeCalculationResult is a type of parameter
    const updateFeesState = (result: FeeCalculationResult) => {
        setSurcharge(result.smallOrderFee);
        setDeliveryFee(result.deliveryFee);
        setDeliveryDis(result.deliveryDis);
        setTotal(result.totalPrice);
    };

    return (
        <div className='container'>
            <header>
                <h1>Delivery Order Price Calculator</h1>
            </header>
            <div className='app-container'>
                <Form
                    venueSlug={venueSlug}
                    setVenueSlug={setVenueSlug}
                    cartValue={cartValue}
                    setCartValue={setCartValue}
                    latitude={latitude}
                    setLatitude={setLatitude}
                    longitude={longitude}
                    setLongitude={setLongitude}
                    updateFeesState={updateFeesState}
                />
                <DeliveryPrice
                    cartValue={cartValue}
                    deliveryFee={deliveryFee}
                    deliveryDis={deliveryDis}
                    surcharge={surcharge}
                    total={total}
                />
            </div>
        </div>
    );
}

export default App

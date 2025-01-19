import './App.css'
import Form from './components/Form'
import DeliveryPrice from './components/DeliveryPrice'
import { useState } from 'react';
import type { FeeCalculationResult } from './utils/calculateFee';

function App() {
    const [venue, setVenue] = useState<string | undefined>('');
    const [cartValue, setCartValue] = useState<number | null>(0);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    // const [orderMinimum, setOrderMinimum] = useState<number>(10); // this might not be needed!
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
                    venue={venue}
                    setVenue={setVenue}
                    cartValue={cartValue}
                    setCartValue={setCartValue}
                    latitude={latitude}
                    setLatitude={setLatitude}
                    longitude={longitude}
                    setLongitude={setLongitude}
                    // setOrderMinimum={setOrderMinimum}
                    updateFeesState={updateFeesState}
                    total={total}
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

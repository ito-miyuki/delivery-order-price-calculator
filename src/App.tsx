import { useState } from 'react';

import './App.css'
import { PriceCalculatorForm } from './components/PriceCalculatorForm/PriceCalculatorForm'
import { PriceBreakdown } from './components/PriceBreakdown/PriceBreakdown'
import type { FeeCalculationResult } from './utils/calculateFee';

function App() {
    const [cartValue, setCartValue] = useState<number | null>(null);
    const [surcharge, setSurcharge] = useState<number>(0);
    const [deliveryFee, setDeliveryFee] = useState<number>(0);
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const updateFeesState = (result: FeeCalculationResult) => {
        setSurcharge(result.smallOrderFee);
        setDeliveryFee(result.deliveryFee);
        setDeliveryDistance(result.deliveryDistance);
        setTotal(result.totalPrice);
    };

    return (
        <div className='container'>
            <header>
                <h1>Delivery Order Price Calculator</h1>
            </header>
            <div className='app-container'>
                <PriceCalculatorForm
                    cartValue={cartValue}
                    setCartValue={setCartValue}
                    updateFeesState={updateFeesState}
                />
                <PriceBreakdown
                    cartValue={cartValue}
                    deliveryFee={deliveryFee}
                    deliveryDistance={deliveryDistance}
                    surcharge={surcharge}
                    total={total}
                />
            </div>
        </div>
    );
}

export default App

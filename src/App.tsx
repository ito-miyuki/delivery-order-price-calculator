import './App.css'
import Form from './components/Form'
import DeliveryPrice from './components/deliveryPrice'
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
        setTotal(result.totalPrice);

        // add logic for distance here
        const distance = 5; // 仮の距離
        setDeliveryDis(distance);
    };

    return (
        <div>
            <header>
                <h1>Delivery Order Price Calculator</h1>
            </header>
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
            />
            <DeliveryPrice
                cartValue={cartValue}
                deliveryFee={deliveryFee}
                deliveryDis={deliveryDis}
                surcharge={surcharge}
                total={total}
            />
        </div>
    );
}

// function App() {

//   const [venue, setVenue] = useState<string | undefined>('');
//     const [cartValue, setCartValue] = useState<number>(0);
//     const [latitude, setLatitude] = useState<number>(0);
//     const [longitude, setLongitude] = useState<number>(0);

//     const [orderMinimum, setOrderMinimum] = useState<number>(10); // change it,
//     const [deliveryFee, setDeliveryFee] = useState<number>(0);
//     const [deliveryDis, setDeliveryDis] = useState<number>(0);
//     const [surcharge, setSurcharge] = useState<number>(0);
//     const [total, setTotal] = useState<number>(0);

//     const calculateFee = () => {
//       // Small Order Surcharge の計算
//       const smallOrderSurcharge = cartValue < orderMinimum ? orderMinimum - cartValue : 0;

//       // 配送料の仮設定
//       const fee = 5; // change it

//       // 合計金額の計算
//       const totalPrice = cartValue + smallOrderSurcharge + fee;

//       // 状態を更新
//       setSurcharge(smallOrderSurcharge);
//       setDeliveryDis(distance);
//       setDeliveryFee(fee);
//       setTotal(totalPrice);
//     };
  
//   return (
//       <>
//         <header>
//           <h1>Delivery Order Price Calculator </h1>
//         </header>
//         <Form 
//           venue={venue}
//           setVenue={setVenue}
//           cartValue={cartValue}
//           setCartValue={setCartValue}
//           latitude={latitude}
//           setLatitude={setLatitude}
//           longitude={longitude}
//           calculateFee={calculateFee}
//         />
//         <DeliveryPrice
//           cartValue={cartValue}
//           surcharge={surcharge}
//           deliveryFee={deliveryFee}
//           deliveryDis={deliveryDis}
//           totalPrice={total}
//         />
//       </>
//     )
//   }

export default App

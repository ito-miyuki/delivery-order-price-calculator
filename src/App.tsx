import './App.css'
import Form from './components/Form'
import DeliveryPrice from './components/deliveryPrice'
import { useState } from 'react';

function App() {

  const [venue, setVenue] = useState<string | undefined>('');
  const [cartValue, setCartValue] = useState<number | undefined>(0); // what could be the init value?
  const [latitude, setLatitude] = useState<number | undefined>(0); // text or number
  const [longitude, setLongitude] = useState<number | undefined>(0); // text or number

  // for DeliveryPrice
  // const [deliveryFee, setDeliveryFee] = useState<number | undefined>(0);
  // const [deliveryDis, setDeliveryDis] = useState<number | undefined>(0);
  // const [surcharge, setSurcharge] = useState<number | undefined>(0);
  // const [total, setTotal] = useState<number | undefined>(0);
  
  return (
      <>
        <header>
          <h1>Delivery Order Price Calculator </h1>
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
        />
        <DeliveryPrice cartValue={cartValue} />
      </>
    )
  }

export default App

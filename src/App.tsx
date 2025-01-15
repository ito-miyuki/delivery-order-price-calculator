import './App.css'
import Form from './components/Form'
import DeliveryPrice from './components/deliveryPrice'
import { useState } from 'react';

function App() {

  const [venue, setVenue] = useState<string | undefined>('');
  const [cartValue, setCartValue] = useState<number | undefined>(); // what could be the init value?
  const [latitude, setLatitude] = useState<number | undefined>(); // text or number
  const [longitude, setLongitude] = useState<number | undefined>(); // text or number
  
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

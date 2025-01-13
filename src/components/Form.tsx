import { useState } from "react";

function Form() {
    const [venue, setVenue] = useState<string | undefined>('');
    const [cartValue, setCartValue] = useState<number | undefined>(); // what could be the init value?
    const [latitude, setLatitude] = useState<number | undefined>(); // text or number
    const [longitude, setLongitude] = useState<number | undefined>(); // text or number
    const [location, setLocation] = useState<number>(); //// what could be the init value?
    
    return (
        <div className="form-container">
            <form id="form">
                <div className="form-group">
                    <label htmlFor="venueSlug" data-testid="venueSlug">Venue Slug</label>
                    <input
                        type="text"
                        id="venueSlug"
                        name="venueSlug"
                        placeholder="Put venue here"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cartValue" data-testid="cartValue">Cart value(EUR)</label>
                    <input
                        type="number"
                        id="cartValue"
                        name="cartValue"
                        placeholder="0.0"
                        min="0.1"
                        step="0.1"
                        value={cartValue}
                        onChange={(e) => setCartValue(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userLatitude" data-testid="userLatitude">User latitude</label>
                    {/* fix here? could be something else */}
                    <input
                        type="number" // text or number
                        id="userLatitude"
                        name="userLatitude"
                        placeholder="0.0"
                        min="0.1"
                        step="0.1"
                        value={latitude}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userLongitude" data-testid="userLongitude">User longitude</label>
                    <input
                        type="number" // text or number
                        id="userLongitude"
                        name="userLongitude"
                        placeholder="0.0"
                        min="0.1"
                        step="0.1"
                        value={longitude}
                    />
                </div>
                <button id="getLocation" onClick={}>Get location</button>
                <p id="locationOutput">Location will be display here</p>

                <button type="submit">Calculate delivery price</button>
            </form>
        </div>
    )
}

export default Form;

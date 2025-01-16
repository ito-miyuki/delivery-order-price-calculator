import React from "react";
import calculateFee from "../utils/calculateFee";
import fetchVenue from "../utils/fetchVenue";

type FormProps = {
    venue: string | undefined;
    setVenue: React.Dispatch<React.SetStateAction<string | undefined>>;
    cartValue: number | undefined;
    setCartValue: React.Dispatch<React.SetStateAction<number | undefined>>;
    latitude: number | undefined;
    setLatitude: React.Dispatch<React.SetStateAction<number | undefined>>;
    longitude: number | undefined;
    setLongitude: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function Form({
        venue,
        setVenue,
        cartValue,
        setCartValue,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
    }: FormProps){
    
    const handleGetLocation = (e: React.MouseEvent) => {
        e.preventDefault(); // to prevent from page reload
        
        // check if the browser support Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.log('Error fetcing location: ', error);
                }
            )
        }
        else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    /*
    getCurrentPosition() はコールバック関数を引数として渡す。
    ひとつは成功した時に何をしたいかの関数
    もうひとつは失敗した時に何をしたいかを明示する関数
    みっつめはオプショナル。位置情報取得時の設定を指定するオプションオブジェクト
    */

    const handleSubmit = async (e: React.FormEvent) => { 
        e.preventDefault(); // to prevent from page reload
        const venueData = await fetchVenue(venue);

        if (venueData === null) {
            console.error("Venue data is null. Cannot calculate delivery fee.");
            return; // 必要に応じて早期リターン
        }
        
        const deliveryFee = calculateFee(cartValue, latitude, longitude, venueData.latitude, venueData.longitude);
        console.log('Hello? I am at handleSubmit()');

        return deliveryFee;
    }

    return (
        <div className="form-container">
            <form id="form" onSubmit={handleSubmit}>
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
                        // min="0.1" // think about better min and step
                        // step="0.1"
                        value={latitude}
                        onChange={(e) => setLatitude(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userLongitude" data-testid="userLongitude">User longitude</label>
                    <input
                        type="number" // text or number
                        id="userLongitude"
                        name="userLongitude"
                        placeholder="0.0"
                        // min="0.1" // think about better min and step
                        // step="0.1"
                        value={longitude}
                        onChange={(e) => setLongitude(parseFloat(e.target.value))}
                    />
                </div>
                <button id="getLocation" onClick={handleGetLocation}>Get location</button>

                <button type="submit">Calculate delivery price</button>
            </form>
        </div>
    )
}

export default Form;

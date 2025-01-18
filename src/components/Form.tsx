import React from "react";
import calculateFee from "../utils/calculateFee";
import fetchVenue from "../utils/fetchVenue";
import { FeeCalculationResult } from "../utils/calculateFee";
import "./Form.css"

type FormProps = {
    venue: string | undefined;
    setVenue: React.Dispatch<React.SetStateAction<string | undefined>>;
    cartValue: number | null;
    setCartValue: React.Dispatch<React.SetStateAction<number | null>>;
    latitude: number | null;
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
    longitude: number | null;
    setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
    // setOrderMinimum: React.Dispatch<React.SetStateAction<number>>;
    updateFeesState: (result: FeeCalculationResult) => void;
    total: number | null
};

function Form({
    venue,
    setVenue,
    cartValue,
    setCartValue,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    // setOrderMinimum,
    updateFeesState,
    total
}: FormProps) {
    
    const handleGetLocation = (e: React.MouseEvent) => {
        e.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error("Error fetching location: ", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    /*
    //     getCurrentPosition() はコールバック関数を引数として渡す。
    //     ひとつは成功した時に何をしたいかの関数
    //     もうひとつは失敗した時に何をしたいかを明示する関数
    //     みっつめはオプショナル。位置情報取得時の設定を指定するオプションオブジェクト
    //     */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const venueData = await fetchVenue(venue);
        if (!venueData) {
            console.error("Venue data is null.");
            return;
        }

        // setOrderMinimum(venueData.orderMinimum); // 最小注文額を App に設定

        // 計算結果を取得
        const result = calculateFee(
            cartValue,
            latitude,
            longitude,
            venueData.latitude,
            venueData.longitude,
            venueData.orderMinimum
        );

        // 計算結果を App に渡す
        updateFeesState(result);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label>Venue Slug:</label>
                    <input
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                    />
                </div>
                <div>
                    <label>Cart Value:</label>
                    <input
                        type="number"
                        value={cartValue || ""}
                        onChange={(e) => setCartValue(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Latitude:</label>
                    <input
                        type="number"
                        value={latitude || ""}
                        onChange={(e) => setLatitude(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Longitude:</label>
                    <input
                        type="number"
                        value={longitude || ""}
                        onChange={(e) => setLongitude(Number(e.target.value))}
                    />
                </div>
                <button className="location-button" type="button" onClick={handleGetLocation}>
                    Get Location
                </button>
                <button className="submit-button"type="submit">Calculate Delivery Price</button>
                <div className="delivery-price">
                    <span>Total price:</span>
                    <span className="price">{total}€</span>
                </div>
            </form>
        </div>
    );
}

// type FormProps = {
//     venue: string | undefined;
//     setVenue: React.Dispatch<React.SetStateAction<string | undefined>>;
//     cartValue: number | null;
//     setCartValue: React.Dispatch<React.SetStateAction<number | null>>;
//     latitude: number | null;
//     setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
//     longitude: number | null;
//     setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
//     surcharge: number | null;
//     setSurcharge: number | null;
// }

// function Form({
//         venue,
//         setVenue,
//         cartValue,
//         setCartValue,
//         latitude,
//         setLatitude,
//         longitude,
//         setLongitude,
//         surcharge,
//         setSurcharge
//     }: FormProps){
    
//     const handleGetLocation = (e: React.MouseEvent) => {
//         e.preventDefault(); // to prevent from page reload
        
//         // check if the browser support Geolocation API
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     setLatitude(position.coords.latitude);
//                     setLongitude(position.coords.longitude);
//                 },
//                 (error) => {
//                     console.log('Error fetcing location: ', error);
//                 }
//             )
//         }
//         else {
//             console.error('Geolocation is not supported by this browser.');
//         }
//     };

//     /*
//     getCurrentPosition() はコールバック関数を引数として渡す。
//     ひとつは成功した時に何をしたいかの関数
//     もうひとつは失敗した時に何をしたいかを明示する関数
//     みっつめはオプショナル。位置情報取得時の設定を指定するオプションオブジェクト
//     */

//     const handleSubmit = async (e: React.FormEvent) => { 
//         e.preventDefault(); // to prevent from page reload
//         const venueData = await fetchVenue(venue);

//         if (venueData === null) {
//             console.error("Venue data is null. Cannot calculate delivery fee.");
//             return;
//         }
        
//         const deliveryFee = calculateFee(cartValue, latitude, longitude, venueData.latitude, venueData.longitude, venueData.orderMinimum, setSurcharge);
//         console.log('Hello? I am at handleSubmit()');

//         return deliveryFee;
//     }

//     return (
//         <div className="form-container">
//             <form id="form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="venueSlug" data-testid="venueSlug">Venue Slug</label>
//                     <input
//                         type="text"
//                         id="venueSlug"
//                         name="venueSlug"
//                         placeholder="Put venue here"
//                         value={venue}
//                         onChange={(e) => setVenue(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="cartValue" data-testid="cartValue">Cart value(EUR)</label>
//                     <input
//                         type="number"
//                         id="cartValue"
//                         name="cartValue"
//                         placeholder="0.0"
//                         min="0.1"
//                         step="0.1"
//                         value={cartValue ?? ""}
//                         onChange={(e) => setCartValue(parseFloat(e.target.value))}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="userLatitude" data-testid="userLatitude">User latitude</label>
//                     {/* fix here? could be something else */}
//                     <input
//                         type="number" // text or number
//                         id="userLatitude"
//                         name="userLatitude"
//                         placeholder="0.0"
//                         // min="0.1" // think about better min and step
//                         // step="0.1"
//                         value={latitude ?? ""}
//                         onChange={(e) => setLatitude(parseFloat(e.target.value))}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="userLongitude" data-testid="userLongitude">User longitude</label>
//                     <input
//                         type="number" // text or number
//                         id="userLongitude"
//                         name="userLongitude"
//                         placeholder="0.0"
//                         // min="0.1" // think about better min and step
//                         // step="0.1"
//                         value={longitude ?? ""}
//                         onChange={(e) => setLongitude(parseFloat(e.target.value))}
//                     />
//                 </div>
//                 <button id="getLocation" onClick={handleGetLocation}>Get location</button>

//                 <button type="submit">Calculate delivery price</button>
//             </form>
//         </div>
//     )
// }

export default Form;

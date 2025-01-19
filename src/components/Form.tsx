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
    // total
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
            venueData.orderMinimum,
            venueData.basePrice,
            venueData.distanceRanges
        );

        // 計算結果を App に渡す
        updateFeesState(result);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Venue Slug</label>
                    <input
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Cart Value</label>
                    <input
                        type="number"
                        value={cartValue || ""}
                        onChange={(e) => setCartValue(Number(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Latitude</label>
                    <input
                        type="number"
                        value={latitude || ""}
                        onChange={(e) => setLatitude(Number(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Longitude</label>
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
                {/* <div className="delivery-price">
                    <span>Total price:</span>
                    <span className="price">{total}€</span>
                </div> */}
            </form>
        </div>
    );
}

export default Form;

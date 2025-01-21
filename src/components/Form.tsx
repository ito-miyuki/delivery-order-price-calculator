import React from "react";
import calculateFee from "../utils/calculateFee";
import fetchVenue from "../utils/fetchVenue";
import { FeeCalculationResult } from "../utils/calculateFee";
import "./Form.css"
import { useState } from "react";

type FormProps = {
    venueSlug: string | undefined;
    setVenueSlug: React.Dispatch<React.SetStateAction<string | undefined>>;
    cartValue: number | null;
    setCartValue: React.Dispatch<React.SetStateAction<number | null>>;
    latitude: number | null;
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
    longitude: number | null;
    setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
    updateFeesState: (result: FeeCalculationResult) => void;
    total: number | null
};

function Form({
    venueSlug,
    setVenueSlug,
    cartValue,
    setCartValue,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    updateFeesState,
    }: FormProps) {

    const [cartValueError, setCartValueError] = useState<string | null>(null);
    const [inputCartValue, setInputCartValue] = useState<string>(""); // 入力中の値

    const [venueSlugError, setVenueSlugError] = useState<string | null>(null);

    const handleCartValueChange = (value: string) => {
            setInputCartValue(value); // 入力中の値をそのまま保存

        // 空の場合
        if (value === "") {
            setCartValue(null);
            return;
        }

        // 正規表現で数値形式を検証（小数点を許可）
        const validNumberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
        if (!validNumberRegex.test(value)) {
            setCartValueError("Cart value must be a valid number.");
            return;
        }

        // 数値に変換してバリデーション
        const numericValue = parseFloat(value);
        if (numericValue <= 0) {
            setCartValueError("Cart value must be greater than 0.");
        } else {
            setCartValueError(null); // エラーをクリア
        }

        // 正常な数値として保持
        setCartValue(numericValue);

        // const numericValue = parseFloat(value);
        // if (!isNaN(numericValue)) {
        //     setCartValue(numericValue);
        // }
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // venue slug
        if (!venueSlug) {
            setVenueSlugError("Venue slug is required.");
        }

        const venueData = await fetchVenue(venueSlug);
        if (!venueData) {
            setVenueSlugError("Please check the venue slug."); //venue data(latitude,longitude, orderMinimum, basePrice,DistanceRange[])をここにsaveする
            return;
        }
        setVenueSlugError(null);

        if (cartValue === null || cartValue < 0) {
            setCartValueError("Cart value cannot be negative.");
            return;
        }
        // 計算結果を取得
        const result = calculateFee({
            cartValue: cartValue,
            userLatitude: latitude,
            userLongitude: longitude,
            venueLatitude: venueData.latitude,
            venueLongitude: venueData.longitude,
            orderMinimum: venueData.orderMinimum,
            basePrice: venueData.basePrice,
            distanceRanges: venueData.distanceRanges
        });

        updateFeesState(result);
    };
    
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Venue Slug</label>
                    <input
                        type="text"
                        value={venueSlug}
                        onChange={(e) => setVenueSlug(e.target.value)}
                        data-test-id="venueSlug" 
                        data-raw-value={venueSlug}
                    />
                    {venueSlugError ? (
                        <p className="error-message" role="alert">{venueSlugError}</p>
                        ) : (
                        <p className="error-message" role="alert">{"\u00A0"}</p> // 空白を表示
                    )}
                </div>
                <div className="form-group">
                    <label>Cart Value</label>
                    <input
                        type="text"
                        value={inputCartValue}
                        onChange={(e) => handleCartValueChange(e.target.value)} // 入力変更時の処理
                        data-test-id="cartValue"
                        data-raw-value={cartValue !== null ? cartValue * 100 : ""}
                    />
                    {cartValueError ? (
                        <p className="error-message" role="alert">{cartValueError}</p>
                    ) : (
                        <p className="error-message" role="alert">{"\u00A0"}</p> // 空白を表示
                    )}
                </div>

                <div className="form-group">
                    <label>Latitude</label>
                    <input
                        type="number"
                        value={latitude || ""}
                        onChange={(e) => setLatitude(Number(e.target.value))}
                        data-test-id="userLatitude"
                        data-raw-value={latitude}
                    />
                    {!latitude ? (
                        <p className="error-message" role="alert">Please enter a latitude</p>
                    ) : (
                        <p className="error-message" role="alert">{"\u00A0"}</p> // 空白を表示
                    )}
                </div>
                <div className="form-group">
                    <label>Longitude</label>
                    <input
                        type="number"
                        value={longitude || ""}
                        onChange={(e) => setLongitude(Number(e.target.value))}
                        data-test-id="userLongitude"
                        data-raw-value={longitude}
                    />
                    {!longitude ? (
                        <p className="error-message" role="alert">Please enter a longitude</p>
                    ) : (
                        <p className="error-message" role="alert">{"\u00A0"}</p> // 空白を表示
                    )}
                </div>
                <button className="location-button" type="button" data-test-id="getLocation" onClick={handleGetLocation}>
                    Get Location
                </button>
                <button className="submit-button"type="submit">Calculate Delivery Price</button>
            </form>
        </div>
    );
}

export default Form;

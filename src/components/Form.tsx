import React from "react";
import calculateFee from "../utils/calculateFee";
import fetchVenue from "../utils/fetchVenue";
import { FormProps } from "./types";
import "./Form.css"
import { useState } from "react";

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
    const [getLocationError, setGetLocationError] = useState<string | null>(null);

    const handleCartValue = (value: string) => {
            setInputCartValue(value); // 入力中の値をそのまま保存

        if (value === "") {
            setCartValue(null);
            return;
        }
        // 正規表現で数値形式を検証（小数点を許可）
        const validNumberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
        if (!validNumberRegex.test(value)) {
            setCartValueError("Cart value must be a valid number.");
            setCartValue(null);
            return;
        }

        const numericValue = parseFloat(value);
        if (numericValue <= 0) {
            setCartValueError("Cart value must be greater than 0.");
            setCartValue(null);
        } else {
            setCartValueError(null);
            setCartValue(numericValue);
        }
    };

    const [latitudeError, setLatitudeError] = useState<string | null>(null);
    const [longitudeError, setLongitudeError] = useState<string | null>(null);

    const handleLatitude = (value: string) => {
        const numericValue = parseFloat(value);
        if (value === "" || isNaN(numericValue)) {
            setLatitudeError("Latitude must be a number.");
            setLatitude(null);
            return;
        }

        if (numericValue < -90 || numericValue > 90) {
            setLatitudeError("Latitude must be between -90 and 90.");
        } else {
            setLatitudeError(null);
        }

        setLatitude(numericValue);
    };

    const handleLongitude = (value: string) => {
    const numericValue = parseFloat(value);
    if (value === "" || isNaN(numericValue)) {
        setLongitudeError("Longitude must be a number.");
        setLongitude(null);
        return;
    }

    if (numericValue < -180 || numericValue > 180) {
        setLongitudeError("Longitude must be between -180 and 180.");
    } else {
        setLongitudeError(null);
    }

    setLongitude(numericValue);
};

    const handleGetLocation = (e: React.MouseEvent) => {
        e.preventDefault();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGetLocationError(null);
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setGetLocationError("Location access was denied.\nPlease allow location access in your browser settings.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setGetLocationError("Could not determine your location.\nPlease check your network or try again later.");
                            break;
                        case error.TIMEOUT:
                            setGetLocationError("Location request timed out.\nPlease try again.");
                            break;
                        default:
                            setGetLocationError("An unknown error occurred.");
                            break;
                    }
                    console.error("Error fetching location: ", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    const isSubmitDisabled = !venueSlug || 
                            !cartValue || 
                            latitude === null || 
                            longitude === null || 
                            cartValueError !== null || 
                            latitudeError !== null || 
                            longitudeError !== null || 
                            venueSlugError !== null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
                    <label htmlFor="venueSlug">Venue Slug</label>
                    <input
                        type="text"
                        value={venueSlug}
                        onChange={(e) => setVenueSlug(e.target.value)}
                        id="venueSlug"
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
                    <label htmlFor="CartValue">Cart Value</label>
                    <input
                        type="text"
                        value={inputCartValue}
                        onChange={(e) => handleCartValue(e.target.value)} // 入力変更時の処理
                        id="CartValue"
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
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        value={latitude || ""}
                        onChange={(e) => handleLatitude(e.target.value)}
                        id="latitude"
                        data-test-id="userLatitude"
                        data-raw-value={latitude}
                    />
                </div>
                {latitudeError ? (
                    <p className="error-message" role="alert">{latitudeError}</p>
                    ) : (
                    <p className="error-message" role="alert">{"\u00A0"}</p> // 空白を表示
                )}
                <div className="form-group">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        value={longitude || ""}
                        onChange={(e) => handleLongitude(e.target.value)}
                        id="longitude"
                        data-test-id="userLongitude"
                        data-raw-value={longitude}
                    />
                </div>
                {longitudeError ? (
                    <p className="error-message" role="alert">{longitudeError}</p>
                    ) : (
                    <p className="error-message" role="alert">{"\u00A0"}</p> // 空白を表示
                )}
                <button className="location-button" type="button" data-test-id="getLocation" onClick={handleGetLocation}>
                    Get Location
                </button>
                {getLocationError ? (
                    <p className="error-message" role="alert">{getLocationError}</p>
                ) : (
                    <p className="error-message" role="alert">{"\u00A0"}</p> // 空白を表示
                )}
                <button className="submit-button" type="submit" disabled={isSubmitDisabled}>Calculate Delivery Price</button>
            </form>
        </div>
    );
}

export default Form;

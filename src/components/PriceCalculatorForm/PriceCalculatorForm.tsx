import React from "react";
import { useState } from "react";
import { RotatingLines } from 'react-loader-spinner'

import { calculateFee, FeeCalculationResult} from "../../utils/calculateFee";
import fetchVenue from "../../api/fetchVenue";
import "./PriceCalculatorForm.css"

import building from "../../assets/building.svg"
import cart from "../../assets/cart.svg"
import pin from "../../assets/map-pin.svg"
import { validateCartValue, validateLatitude, validateLongitude } from "../../utils/validation";

type FormProps = {
    cartValue: number | null;
    setCartValue: React.Dispatch<React.SetStateAction<number | null>>;
    updateFeesState: (result: FeeCalculationResult) => void;
};

export function PriceCalculatorForm({
    cartValue,
    setCartValue,
    updateFeesState,
    }: FormProps) {

    const [venueSlug, setVenueSlug] = useState<string>("");
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const [venueSlugError, setVenueSlugError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    
    const handleVenueSlug = (value: string) => {
        if (value === "") {
            setVenueSlugError(null);
            setVenueSlug("");
            return;
        }
        setVenueSlug(value);
        setVenueSlugError("");
    }

    const [cartValueError, setCartValueError] = useState<string | null>(null);
    const [inputCartValue, setInputCartValue] = useState<string>("");

    const handleCartValue = (value: string) => {
        setInputCartValue(value);
        const error = validateCartValue(value);
        if (error) {
            setCartValueError(error);
            setCartValue(null);
        } else {
            setCartValueError(null);
            setCartValue(parseFloat(parseFloat(value).toFixed(2)));
        }
    };

    const [latitudeError, setLatitudeError] = useState<string | null>(null);
    const [longitudeError, setLongitudeError] = useState<string | null>(null);

    const handleLatitude = (value: string) => {
        const error = validateLatitude(value);
        if (error) {
            setLatitudeError(error);
            setLatitude(null);
        } else {
            setLatitudeError(null);
            setLatitude(parseFloat(value));
        }
    };

    const handleLongitude = (value: string) => {
        const error = validateLongitude(value);
        if (error) {
            setLongitudeError(error);
            setLongitude(null);
        } else {
            setLongitudeError(null);
            setLongitude(parseFloat(value));
        }
    };

    const [getLocationError, setGetLocationError] = useState<string | null>(null);

    const handleGetLocation = () => {
        setIsLocationLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGetLocationError(null);
                    setLatitudeError(null);
                    setLongitudeError(null);
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setIsLocationLoading(false);
                },
                (error) => {
                    setIsLocationLoading(false);
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
                }
            );
        } else {
            setIsLocationLoading(false);
            setGetLocationError("Geolocation is not supported by this browser.");
        }
    };

    const [deliveryDistanceError, setDeliveryDistanceError] = useState<string | null>(null);

    const resetErrors = () => {
        setVenueSlugError(null);
        setCartValueError(null);
        setLatitudeError(null);
        setLongitudeError(null);
        setDeliveryDistanceError(null);
        setGetLocationError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        resetErrors();

        let hasError = false;

        if (!venueSlug) {
            setVenueSlugError("Venue slug is required.");
            hasError = true;
        }

        if (parseFloat(inputCartValue) <= 0) {
            setCartValueError("Cart value must be greater than 0.");
            hasError = true;
        }
        else if (cartValue === null) {
            hasError = true;
            setCartValueError("Cart value is required.");
        }

        if (latitude === null) {
            setLatitudeError("Latitude is required.");
            hasError = true;
        }

        if (longitude === null) {
            setLongitudeError("Longitude is required.");
            hasError = true;
        }

        if (hasError){
            updateFeesState({
                smallOrderFee: 0,
                deliveryFee: 0,
                deliveryDis: 0,
                totalPrice: 0,
            });
            return ;
        }

        setIsLoading(true);

        try {
            const venueData = await fetchVenue(venueSlug);
            if (!venueData) {
                setVenueSlugError("Please check the venue slug.");
                updateFeesState({
                    smallOrderFee: 0,
                    deliveryFee: 0,
                    deliveryDis: 0,
                    totalPrice: 0,
                });
                return;
            }

            setVenueSlugError(null);

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

            if (result.errorMessage) {
                setDeliveryDistanceError(result.errorMessage);
                updateFeesState({
                    smallOrderFee: 0,
                    deliveryFee: 0,
                    deliveryDis: 0,
                    totalPrice: 0,
                });
                return ;
            }
            setDeliveryDistanceError(null);
            updateFeesState(result);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="label-container">
                        <label htmlFor="venueSlug">Venue Slug</label>
                        <img className="icon" src={building} alt="cart-icon" />
                    </div>
                    <input
                        type="text"
                        value={venueSlug}
                        onChange={(e) => handleVenueSlug(e.target.value)}
                        id="venueSlug"
                        data-test-id="venueSlug"
                        placeholder="home-assignment-venue-example"
                    />
                    {venueSlugError && <p className="error-message" role="alert">{venueSlugError}</p>}
                </div>
                <div className="form-group">
                    <div className="label-container">
                        <label htmlFor="CartValue">Cart Value (€)</label>
                        <img className="icon" src={cart} alt="cart-icon" />
                    </div>
                    <input
                        type="text"
                        value={inputCartValue}
                        onChange={(e) => handleCartValue(e.target.value)}
                        id="CartValue"
                        data-test-id="cartValue"
                        placeholder="0.00"
                    />
                    {cartValueError && <p className="error-message" role="alert">{cartValueError}</p>}
                </div>
                <div className="form-group">
                    <div className="label-container">
                        <label htmlFor="latitude">Latitude</label>
                        <img className="icon" src={pin} alt="cart-icon" />
                    </div>
                    <input
                        type="number"
                        value={latitude || ""}
                        onChange={(e) => handleLatitude(e.target.value)}
                        id="latitude"
                        data-test-id="userLatitude"
                        placeholder="60.1807791"
                    />
                    {latitudeError && <p className="error-message" role="alert">{latitudeError}</p>}
                </div>
                <div className="form-group">
                    <div className="label-container">
                        <label htmlFor="longitude">Longitude</label>
                        <img className="icon" src={pin} alt="cart-icon" />
                    </div>
                    <input
                        type="number"
                        value={longitude || ""}
                        onChange={(e) => handleLongitude(e.target.value)}
                        id="longitude"
                        data-test-id="userLongitude"
                        placeholder="24.9587424"
                    />
                    {longitudeError && <p className="error-message" role="alert">{longitudeError}</p>}
                </div>
                <button className="location-button" type="button" data-test-id="getLocation" disabled={isLocationLoading} onClick={handleGetLocation}>
                {isLocationLoading ? (
                    <>
                        Getting Location...
                        <RotatingLines
                            visible={true}
                            height={12}
                            width={12}
                            strokeColor="white"
                            strokeWidth={5}
                            animationDuration={0.75}
                            ariaLabel="loading-location"
                        />
                    </>
                ) : (
                "Get Location"
                )}
                </button>
                {getLocationError && (
                    <p className="error-message" role="alert">{getLocationError}</p>
                )}
                <button className="submit-button" type="submit" disabled={isLoading} >
                {isLoading ? (
                    <>
                        Calculating...
                        <RotatingLines
                            visible={true}
                            height={14}
                            width={14}
                            strokeColor="white"
                            strokeWidth={5}
                            animationDuration={0.75}
                            ariaLabel="loading"
                        />
                    </>
                ) : (
                    "Calculate Delivery Price"
                )}
                </button>
                {deliveryDistanceError && (
                    <p className="error-message" role="alert">{deliveryDistanceError}</p>
                )}
            </form>
        </div>
    );
}

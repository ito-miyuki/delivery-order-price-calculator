import { type FeeCalculationResult } from "../utils/calculateFee";

export type FormProps = {
    venueSlug: string;
    setVenueSlug: React.Dispatch<React.SetStateAction<string>>;
    cartValue: number | null;
    setCartValue: React.Dispatch<React.SetStateAction<number | null>>;
    latitude: number | null;
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
    longitude: number | null;
    setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
    updateFeesState: (result: FeeCalculationResult) => void;
};
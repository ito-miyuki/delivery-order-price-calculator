export function validateCartValue(value: string): string | null {
    if (value === "") {
        return "Cart value is required.";
    }
    const validNumberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
    if (!validNumberRegex.test(value)) {
        return "Cart value must be a valid number.";
    }

    const numericValue = parseFloat(value);
    if (numericValue <= 0) {
        return "Cart value must be greater than 0.";
    }
    return null;
}

export function validateLatitude(value: string): string | null {
    if (value === "") {
        return "Latitude is required.";
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
        return "Latitude must be a number.";
    }

    if (numericValue < -90 || numericValue > 90) {
        return "Latitude must be between -90 and 90.";
    }
    return null;
};


export function validateLongitude(value: string): string | null {
    if (value === "") {
        return "Longitude is required.";
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
        return "Longitude must be a number.";
    }

    if (numericValue < -180 || numericValue > 180) {
        return "Longitude must be between -180 and 180.";
    }
    return null;
};
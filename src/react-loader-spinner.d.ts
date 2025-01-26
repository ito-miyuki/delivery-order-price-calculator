declare module "react-loader-spinner" {
    import * as React from "react";

    export interface RotatingLinesProps {
        visible?: boolean;
        height?: number;
        width?: number;
        strokeColor?: string;
        strokeWidth?: number;
        animationDuration?: number;
        ariaLabel?: string;
        wrapperStyle?: React.CSSProperties;
        wrapperClass?: string;
    }

    export const RotatingLines: React.FC<RotatingLinesProps>;
}

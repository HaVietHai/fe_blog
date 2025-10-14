import React from "react";
import { Loader2 } from "lucide-react";

interface OverlayLoadingProps {
    show: boolean;
}

const OverlayLoading: React.FC<OverlayLoadingProps> = ({ show }) => {
    if (!show) return null;
    return (
        <div className="overlay-loading">
            <Loader2 className="animate-spin text-gray-500" />
        </div>
    );
};

export default OverlayLoading;
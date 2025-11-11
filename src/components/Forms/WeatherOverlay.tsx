// src/components/Forms/WeatherOverlay.tsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { usePortal } from "../../hook/usePortal";

type Mode = "clouds" | "clouds-thunder" | "fog" | "sunny" | "rain";

interface Props {
  open: boolean;
  onClose: () => void;
  mode: Mode;
  durationMs?: number;
  lottieCloud?: any;
  lottieThunder?: any;
  lottieSunny?: any;
  lottieRain?: any;
}

const WeatherOverlay: React.FC<Props> = ({
  open,
  onClose,
  mode,
  durationMs = 3500,
  lottieCloud,
  lottieThunder,
  lottieSunny,
  lottieRain,
}) => {
  const root = usePortal("weather-overlay-root");

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, durationMs);
    return () => clearTimeout(t);
  }, [open, onClose, durationMs]);

  if (!root) return null;

  const getLottie = () => {
    switch (mode) {
      case "sunny":
        return lottieSunny;
      case "rain":
        return lottieRain;
      case "clouds-thunder":
        return lottieThunder;
      default:
        return lottieCloud;
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto"
        >
          {/* Background dim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            style={{
              backdropFilter:
                mode === "fog" ? "blur(8px)" : "blur(4px) brightness(0.7)",
            }}
            onClick={onClose}
          />

          {/* Main animation */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-[70vw] h-[70vh] max-w-4xl max-h-[800px] pointer-events-none"
          >
            {getLottie() && (
              <Lottie
                animationData={getLottie()}
                loop
                style={{ width: "100%", height: "100%" }}
              />
            )}

            {/* Thunder flash effect */}
            {mode === "clouds-thunder" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0] }}
                transition={{
                  duration: Math.min(durationMs / 1000, 2),
                  times: [0, 0.2, 0.4, 0.8, 1],
                }}
                className="absolute inset-0 bg-white mix-blend-screen pointer-events-none"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    root
  );
};

export default WeatherOverlay;

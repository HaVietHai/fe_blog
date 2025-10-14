import { motion } from "framer-motion";
import Lottie from "lottie-react";

interface AnimatedLottieProps {
  animationData: any;
  direction: "left" | "right";
}

const AnimatedLottie = ({ animationData, direction }: AnimatedLottieProps) => {
  const variants: any = {
    initial: {
      x: direction === "left" ? "100%" : "-100%", // trượt từ bên phải hoặc trái
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
    exit: {
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="border-2 border-cyan-200 rounded-md flex justify-center items-center"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ overflow: "hidden" }}
    >
      <Lottie animationData={animationData} loop={true} style={{ width: 400, height: 400 }} />
    </motion.div>
  );
};

export default AnimatedLottie;

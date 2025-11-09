import React from "react";
import { motion } from "framer-motion";

const SidebarRight = () => {
  const trends = ["#CôngNghệAI", "#LậpTrình", "#ReactNative", "#Vite", "#fyp"];

  return (
    <aside className="w-96 border-l border-[var(--color-border-soft)] bg-black/70 p-4 backdrop-blur-xl">
      {/* Tiêu đề animation chỉ chạy 1 lần */}
      <motion.div
        initial={{ opacity: 0, boxShadow: "0 0 0px rgba(34,211,238,0)" }}
        animate={{
          opacity: 1,
          boxShadow: "0 0 15px rgba(34,211,238,0.5)",
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="rounded-[var(--radius-card)] border border-cyan-700 p-4 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.15)]"
      >
        <h2 className="font-semibold text-lg mb-3 text-cyan-300 tracking-wide flex items-center">
          ⚡ Xu hướng
        </h2>

        <ul className="space-y-3">
          {trends.map((trend, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                color: "#22d3ee",
                textShadow: "0 0 8px rgba(34,211,238,0.8)",
              }}
              className="text-[var(--color-text-secondary)] cursor-pointer transition-all duration-200 hover:translate-x-1"
            >
              {trend}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </aside>
  );
};

export default SidebarRight;

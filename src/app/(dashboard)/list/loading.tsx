"use client";

import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-3xl font-bold text-[#4470AD]"
      >
        Loading...
      </motion.div>
    </div>
  );
};

export default Loading;

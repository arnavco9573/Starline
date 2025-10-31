"use client";
import React from "react";
import { motion, Transition } from "framer-motion"; // 1. Import Transition

const dotVariants = {
  initial: { opacity: 0.3 },
  animate: { opacity: 1 },
};

// 2. Add the Transition type annotation here
const dotTransition: Transition = {
  duration: 0.6,
  repeat: Infinity,
  repeatType: "reverse", // 'as const' is often not needed when typed
  ease: "easeInOut", // This string literal is a valid Easing type
};

export default function ListeningIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex space-x-1 p-2 backdrop-blur-sm rounded-full shadow-md"
    >
      <motion.span
        className="w-1.5 h-1.5 bg-white/70 rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0 }} // Spread the typed object
      />
      <motion.span
        className="w-1.5 h-1.5 bg-white/70 rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.2 }} // Spread the typed object
      />
      <motion.span
        className="w-1.5 h-1.5 bg-white/70 rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.4 }} // Spread the typed object
      />
    </motion.div>
  );
}

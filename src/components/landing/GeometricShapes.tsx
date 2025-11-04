import React from "react";
import { motion } from "framer-motion";

export default function GeometricShapes() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute inset-0 z-0 opacity-40"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 300"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated Group 1: Slow rotation */}
        <g className="animate-rotate-slow">
          {/* Main Purple Shape */}
          <path
            d="M 150,50 L 250,50 L 300,100 L 200,100 Z"
            stroke="currentColor"
            className="text-purple-500/50"
            strokeWidth="1"
          />
          <path
            d="M 150,50 L 150,150 L 200,200 L 200,100"
            stroke="currentColor"
            className="text-purple-500/50"
            strokeWidth="1"
          />
          <path
            d="M 250,50 L 300,100 L 300,200 L 250,150 Z"
            stroke="currentColor"
            className="text-purple-500/50"
            strokeWidth="1"
          />
        </g>

        {/* Animated Group 2: Slower float */}
        <g className="animate-float-subtle [animation-duration:12s]">
          {/* Background Grey Shape */}
          <path
            d="M 300,120 L 450,120 L 450,220 L 300,220 Z"
            stroke="currentColor"
            className="text-gray-600/40"
            strokeWidth="0.5"
          />
          <path
            d="M 350,90 L 500,90 L 500,190 L 350,190 Z"
            stroke="currentColor"
            className="text-gray-600/40"
            strokeWidth="0.5"
          />
          <path
            d="M 300,120 L 350,90"
            stroke="currentColor"
            className="text-gray-600/40"
            strokeWidth="0.5"
          />
          <path
            d="M 450,120 L 500,90"
            stroke="currentColor"
            className="text-gray-600/40"
            strokeWidth="0.5"
          />
        </g>

        {/* Animated Group 3: Faster float */}
        <g className="animate-float-subtle [animation-duration:8s]">
          {/* Small foreground lines */}
          <path
            d="M 50,200 L 150,250 L 180,150"
            stroke="currentColor"
            className="text-gray-500/30"
            strokeWidth="0.75"
          />
        </g>
      </svg>
    </motion.div>
  );
}

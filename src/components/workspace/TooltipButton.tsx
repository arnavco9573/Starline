"use client";

import React from "react";
import { motion } from "framer-motion";

interface TooltipButtonProps {
  onClick?: () => void;
  href?: string;
  tooltipText: string;
  icon: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  onClick,
  href,
  tooltipText,
  icon,
  className,
  disabled,
}) => {
  const content = (
    <div className="relative flex items-center group">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        } ${className}`}
      >
        {icon}
      </button>
      {!disabled && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileHover={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-30"
        >
          {tooltipText}
        </motion.div>
      )}
    </div>
  );

  return href ? (
    <a href={href} download="Starline-Analysis-Report.pdf">
      {content}
    </a>
  ) : (
    content
  );
};

export default TooltipButton;

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modeImages } from "@/lib/constants";
import { Mode } from "@/types/workspace";

interface ModeInfoPanelProps {
  activeMode: Mode | null;
  displayedIdealForText: string;
}

const ModeInfoPanel: React.FC<ModeInfoPanelProps> = ({
  activeMode,
  displayedIdealForText,
}) => {
  return (
    <AnimatePresence mode="wait">
      {activeMode && (
        <motion.div
          key={activeMode} // Key is essential for AnimatePresence to detect changes
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
          className="space-y-3"
        >
          {/* Ideal For Text Block */}
          <div>
            <p className="text-sm bg-[#ebfbff] p-3 rounded-2xl text-black leading-relaxed min-h-[100px]">
              <span className="font-bold text-base mb-2 text-gray-900">
                Ideal For :
              </span>{" "}
              {displayedIdealForText}
            </p>
          </div>

          {/* Image Block */}
          <div className="bg-[#ebfbff] rounded-xl p-3 flex items-center justify-between gap-1 border-gray-200">
            <img
              src={modeImages[activeMode].image}
              alt={`${activeMode} mode view`}
              className="w-[40%] h-[250px] object-contain"
            />
            <img
              src={modeImages[activeMode].diagram}
              alt={`${activeMode} mode diagram`}
              className="w-[60%] h-[300px] object-cover bg-white rounded-lg border border-gray-100"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModeInfoPanel;

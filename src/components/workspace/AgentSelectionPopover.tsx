// src/components/workspace/AgentSelectionPopover.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Building } from "lucide-react";

interface AgentPopoverProps {
  agents: Record<string, { file: string; description: string }>;
  onSelect: (agentKey: string) => void;
  onClose: () => void;
}

const AgentSelectionPopover: React.FC<AgentPopoverProps> = ({
  agents,
  onSelect,
  onClose,
}) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Popover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
          <h3 className="font-bold text-gray-900">Select Analysis Agent</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Agent List */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[60vh]">
          {Object.entries(agents).map(([key, agent]) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className="w-full p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 hover:border-gray-400 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-full group-hover:bg-blue-100">
                  <Building className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 capitalize">
                    {key.replace("_", " ")}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {agent.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default AgentSelectionPopover;
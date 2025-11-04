"use client";
import React from "react";
import { X, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewProject: () => void;
}

export default function ProjectSelectionModal({ isOpen, onClose, onNewProject }: ProjectSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl"
      >
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Select Project</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">
          <button
            onClick={onNewProject}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
          >
            <Plus className="w-6 h-6" /> Create New Project
          </button>
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Or select an existing project</h3>
            <div className="space-y-2">
              {/* Mock existing projects */}
              <div className="p-3 border rounded-lg text-gray-500 text-center">No existing projects found.</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
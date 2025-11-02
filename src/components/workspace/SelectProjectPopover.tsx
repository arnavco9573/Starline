"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Plus, Building } from "lucide-react";

type Project = {
  id: string;
  name: string;
};

interface SelectProjectPopoverProps {
  projects: Project[];
  onClose: () => void;
  onNewProject: () => void;
  onSelectProject: (project: Project) => void;
}

const SelectProjectPopover: React.FC<SelectProjectPopoverProps> = ({
  projects,
  onClose,
  onNewProject,
  onSelectProject,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-full ml-4 top-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Select Project</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <button
          onClick={onNewProject}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Project
        </button>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Recent Projects
          </p>
          <div className="space-y-1 max-h-32 overflow-y-auto pr-1 scrollbar-thin">
            {projects.length > 0 ? (
              projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  className="w-full text-left p-2 rounded-md hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2 transition-colors"
                >
                  <Building
                    size={16}
                    className="text-gray-400 flex-shrink-0"
                  />
                  <span className="truncate flex-1">{proj.name}</span>
                </button>
              ))
            ) : (
              <div className="p-3 border border-dashed border-gray-300 rounded-lg text-gray-400 text-sm text-center">
                No projects yet
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectProjectPopover;

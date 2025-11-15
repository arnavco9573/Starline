"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectQuestion {
  key: string;
  question: string;
}

interface NewProjectPopoverProps {
  projectQuestions: ProjectQuestion[];
  step: number;
  projectName: string;
  answers: Record<string, string>;
  onClose: () => void;
  onCreate: () => void;
  setProjectName: (name: string) => void;
  onAnswerChange: (key: string, value: string) => void;
  onNextStep: () => void;
  onBackStep: () => void;
  isSaving?: boolean;
}

const NewProjectPopover: React.FC<NewProjectPopoverProps> = ({
  projectQuestions,
  step,
  projectName,
  answers,
  onClose,
  onCreate,
  setProjectName,
  onAnswerChange,
  onNextStep,
  onBackStep,
  isSaving = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: -20 }}
      transition={{ duration: 0.2 }}
      className="absolute left-full ml-4 top-0 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] flex flex-col"
    >
      <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
        <h3 className="font-bold text-gray-900">New Project</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1 flex-shrink-0">
        <motion.div
          className="bg-gray-900 h-1"
          initial={{ width: 0 }}
          animate={{
            width: `${(step / (projectQuestions.length + 1)) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <label className="text-sm font-semibold text-gray-900">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., 'Tower Phase 1'"
              className="w-full mt-2 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 focus:outline-none transition-colors"
            />
          </motion.div>
        )}
        {step > 0 && step <= projectQuestions.length && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {(() => {
              // Get the current question object
              const currentQuestion = projectQuestions[step - 1];
              if (!currentQuestion) return null;

              return (
                <>
                  <label className="text-sm font-semibold text-gray-900">
                    {/* Render the key as the main title */}
                    {currentQuestion.key}
                  </label>
                  <p className="text-sm text-gray-600 mt-1 mb-2">
                    {/* Render the question as the prompt */}
                    {currentQuestion.question}
                  </p>
                  <textarea
                    // Get the answer from the object using the key
                    value={answers[currentQuestion.key] || ""}
                    onChange={(e) =>
                      // Pass the key and new value to the handler
                      onAnswerChange(currentQuestion.key, e.target.value)
                    }
                    rows={3}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                  />
                </>
              );
            })()}
          </motion.div>
        )}
        {step === projectQuestions.length + 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <h4 className="text-lg font-bold text-gray-900">Ready!</h4>
            <p className="mt-2 text-sm text-gray-600">
              Project '{projectName}' is configured.
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex justify-between items-center flex-shrink-0">
        <button
          onClick={onBackStep}
          disabled={step === 0 || isSaving}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        {step < projectQuestions.length + 1 ? (
          <button
            onClick={onNextStep}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onCreate}
            disabled={isSaving}
            className="px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isSaving ? "Creating..." : "Create"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default NewProjectPopover;

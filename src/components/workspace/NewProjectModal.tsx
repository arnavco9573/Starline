"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const questions = [
  "What is the building’s occupancy type and use?",
  "Where is the project located and what local bylaws apply?",
  "How many floors and what is the total built-up area?",
  "What are the main access and exit routes shown on the plan?",
  "How many staircases and what are their widths?",
  "What are the front, side, and rear setbacks provided?",
  "What’s the building height and ground coverage?",
  "Is there fire-fighting and lift provision shown?",
  "Are toilets and ramps shown for accessibility?",
  "Which NBC edition and local DCR version did you follow?",
];

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreate: (projectData: { name: string; answers: string[] }) => void;
}

export default function NewProjectModal({ isOpen, onClose, onProjectCreate }: NewProjectModalProps) {
  const [step, setStep] = useState(0); // 0 for name, 1-10 for questions
  const [projectName, setProjectName] = useState("");
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));

  const handleNext = () => {
    if (step === 0 && !projectName.trim()) return;
    setStep((prev) => Math.min(prev + 1, questions.length + 1));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleCreateProject = () => {
    onProjectCreate({ name: projectName, answers });
    onClose();
    // Reset state for next time
    setStep(0);
    setProjectName("");
    setAnswers(Array(questions.length).fill(""));
  };

  if (!isOpen) return null;

  const totalSteps = questions.length + 1;
  const progress = (step / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Create New Compliance Project</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5">
          <motion.div
            className="bg-blue-600 h-1.5"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8 space-y-6 flex-1 overflow-y-auto">
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label className="text-lg font-semibold text-gray-700">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., 'Residential Tower - Phase 1'"
                className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          )}

          {step > 0 && step <= questions.length && (
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <label className="text-lg font-semibold text-gray-700">{questions[step - 1]}</label>
              <textarea
                value={answers[step - 1]}
                onChange={(e) => handleAnswerChange(step - 1, e.target.value)}
                rows={3}
                className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          )}

          {step === totalSteps && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">Ready to Go!</h3>
                <p className="mt-2 text-gray-600">Your project '{projectName}' is set up. Click below to create it and upload your drawing.</p>
             </motion.div>
          )}
        </div>

        <div className="p-6 border-t flex justify-between items-center">
          <button onClick={handleBack} disabled={step === 0} className="px-6 py-2 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50">Back</button>
          {step < totalSteps ? (
            <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next</button>
          ) : (
            <button onClick={handleCreateProject} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Create Project</button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
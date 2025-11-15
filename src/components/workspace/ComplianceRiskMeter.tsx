"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, CheckCircle, Loader2 } from "lucide-react";
import { Mode } from "@/types/workspace";

// Helper functions (Subtle Colors)
const getColor = (score: number) => {
  if (score <= 15) return "#3b82f6"; // Blue-500
  if (score <= 45) return "#14b8a6"; // Teal-500
  return "#6b7280"; // Gray-500
};

const getRiskText = (score: number) => {
  if (score <= 15) return "Low Risk: Proceed";
  if (score <= 45) return "Medium Risk: Revisions Likely";
  return "High Risk: Rejection Likely";
};

// Component Props
interface ComplianceRiskMeterProps {
  score: number;
  isProcessing: boolean;
  // `isPaused` is GONE
  processedCheckpoints: number;
  totalCheckpoints: number;
  reportUrl?: string | null;
  activeMode: Mode | null;
  isGeneratingReport?: boolean;
  onGenerateReport?: () => void;
}

// Internal stages for the animation sequence
type MeterStage = "idle" | "processing" | "dialing" | "finished";

export default function ComplianceRiskMeter({
  score,
  isProcessing,
  processedCheckpoints,
  totalCheckpoints,
  reportUrl = null,
  activeMode,
  isGeneratingReport,
  onGenerateReport,
}: ComplianceRiskMeterProps) {
  const [stage, setStage] = useState<MeterStage>("idle");

  // --- [THE FIX] ---
  // This useEffect is now clean of `isPaused`
  useEffect(() => {
    if (isProcessing) {
      if (processedCheckpoints === 0) {
        setStage("processing");
      } else {
        setStage("dialing");
      }
    } else if (!isProcessing && (processedCheckpoints > 0 || activeMode === "code")) {
      setStage("finished");
    }
  }, [isProcessing, processedCheckpoints, activeMode]);
  // --- [END OF FIX] ---

  const dialProgress =
    totalCheckpoints > 0 ? processedCheckpoints / totalCheckpoints : 0;
  const circumference = 2 * Math.PI * 15.9155; // SVG radius

  return (
    <div className="flex flex-col items-center gap-6 text-center w-full max-w-xs mx-auto p-6 bg-white rounded-xl shadow-lg">
      <AnimatePresence mode="wait">
        {/* Stage 1: Initial Processing */}
        {stage === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-lg font-semibold text-gray-700">Processing...</p>
            <p className="text-sm text-gray-500">Preparing analysis</p>
          </motion.div>
        )}

        {/* Stage 2: Dialing Checkpoints */}
        {stage === "dialing" && (
          <motion.div
            key="dialing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            {/* --- [ISSUE 1 FIX] --- */}
            {processedCheckpoints >= totalCheckpoints && isProcessing ? (
              <>
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-lg font-semibold text-gray-700">
                  Running AI Analysis...
                </p>
                <p className="text-sm text-gray-500">
                  This may take a moment.
                </p>
              </>
            ) : (
              <>
                {/* ORIGINAL dialing UI */}
                <div className="relative w-28 h-28">
                  <svg
                    viewBox="0 0 36 36"
                    className="w-full h-full transform -rotate-90"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2.5"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      animate={{
                        strokeDasharray: `${
                          dialProgress * circumference
                        } ${circumference}`,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900 tabular-nums">
                      {processedCheckpoints}
                    </span>
                    <span className="text-xs text-gray-500">
                      /{totalCheckpoints}
                    </span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                  Checking Compliance...
                </p>
                <p className="text-sm text-gray-500">
                  Running point {processedCheckpoints} of {totalCheckpoints}
                </p>
              </>
            )}
            {/* --- [END OF ISSUE 1 FIX] --- */}
          </motion.div>
        )}

        {/* Stage 3: Finished */}
        {stage === "finished" && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <CheckCircle
              className="w-12 h-12"
              style={{ color: getColor(score) }}
            />
            <h3
              className="text-4xl font-bold tabular-nums"
              style={{ color: getColor(score) }}
            >
              {score.toFixed(0)}%
            </h3>
            <p
              className="text-lg font-semibold"
              style={{ color: getColor(score) }}
            >
              {getRiskText(score)}
            </p>
            <p className="text-sm text-gray-600 max-w-xs">
              {score <= 15 && "Compliance standards met."}
              {score > 15 && score <= 45 && "Some issues detected."}
              {score > 45 && "Critical issues found."}
            </p>

            {/* --- [ISSUE 3 FIX] --- */}
            {activeMode === "code" ? (
              reportUrl ? (
                <a
                  href={reportUrl}
                  download="Compliance-Audit-Report.pdf"
                  className="mt-4 inline-flex items-center gap-2 bg-black text-white font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-gray-800 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Audit Report
                </a>
              ) : (
                <button
                  onClick={onGenerateReport}
                  disabled={isGeneratingReport}
                  className="mt-4 inline-flex items-center gap-2 bg-black text-white font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isGeneratingReport ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {isGeneratingReport
                    ? "Generating..."
                    : "Generate Audit Report"}
                </button>
              )
            ) : (
              reportUrl && (
                <a
                  href={reportUrl}
                  download="Compliance-Audit-Report.pdf"
                  className="mt-4 inline-flex items-center gap-2 bg-black text-white font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-gray-800 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Audit Report
                </a>
              )
            )}
            {/* --- [END OF ISSUE 3 FIX] --- */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
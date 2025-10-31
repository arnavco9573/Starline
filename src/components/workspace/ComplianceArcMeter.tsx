"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const getColor = (score: number) => {
  if (score <= 15) return "#22c55e"; // Green
  if (score <= 45) return "#f97316"; // Orange
  return "#ef4444"; // Red
};

const getRiskText = (score: number) => {
  if (score <= 15) return "Low Risk: Proceed";
  if (score <= 45) return "Medium Risk: Revisions Likely";
  return "High Risk: Rejection Likely";
};

interface ComplianceArcMeterProps {
  score: number;
  isProcessing?: boolean;
  processedCheckpoints?: number;
  totalCheckpoints?: number;
  reportUrl?: string | null; // ✅ added this
}

export default function ComplianceArcMeter({
  score,
  isProcessing = true,
  processedCheckpoints = 0,
  totalCheckpoints = 100,
  reportUrl = null, // ✅ added this
}: ComplianceArcMeterProps) {
  const [needleAngle, setNeedleAngle] = useState(0);

  useEffect(() => {
    if (isProcessing) {
      // Idle swing animation
      let swingStep = 0;
      const swingInterval = setInterval(() => {
        swingStep += 0.05;
        const swing = Math.sin(swingStep) * 30; // -30° to 30°
        setNeedleAngle(swing);
      }, 50);
      return () => clearInterval(swingInterval);
    } else {
      // Animate to final angle (0° to 180°)
      const targetAngle = (score / 100) * 180;
      const duration = 1500;
      const steps = 60;
      let currentStep = 0;
      const startAngle = needleAngle;
      const angleRange = targetAngle - startAngle;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const newAngle = startAngle + angleRange * easeOut;
        setNeedleAngle(newAngle);
        if (currentStep >= steps) clearInterval(interval);
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [isProcessing, score]);

  const color = getColor(score);
  const progressPercentage =
    totalCheckpoints > 0 ? (processedCheckpoints / totalCheckpoints) * 100 : 0;

  return (
    <div className="flex flex-col items-center justify-center py-8 rounded-xl w-full max-w-md mx-auto">
      {/* Arc Meter */}
      <div className="relative w-64 h-32 flex items-end justify-center">
        <svg
          viewBox="0 0 200 100"
          className="absolute top-0 left-0 w-full h-full z-0" // background layer
        >
          <path
            d="M10 100 A90 90 0 0 1 190 100"
            fill="none"
            stroke="url(#arcGradient)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="arcGradient"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>

        {/* Needle */}
        <motion.div
          className="absolute bottom-0 origin-bottom w-1 h-24 bg-gray-900 rounded-full z-10" // ⬅️ needle stays on top
          animate={{ rotate: needleAngle - 90 }}
          transition={{ duration: 0.3 }}
        />

        {/* Needle Center */}
        <div className="absolute bottom-0 w-6 h-6 bg-gray-900 rounded-full border-4 border-white shadow-md z-20" />
      </div>

      {/* Score Section */}
      <motion.div
        className="text-center mt-6 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h3
          className="text-5xl font-bold tabular-nums"
          style={{ color }}
          animate={{ scale: isProcessing ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.6, repeat: isProcessing ? Infinity : 0 }}
        >
          {isProcessing ? "..." : `${Math.round(score)}%`}
        </motion.h3>

        <motion.p
          className="text-lg font-semibold"
          style={{ color }}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isProcessing
            ? `Analyzing... (${processedCheckpoints}/${totalCheckpoints})`
            : getRiskText(score)}
        </motion.p>

        {/* ✅ Report Download */}
        {!isProcessing && reportUrl && (
          <motion.a
            href={reportUrl}
            download="Compliance-Audit-Report.pdf"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-black text-white font-semibold px-5 py-2 rounded-lg hover:bg-gray-800 mt-3"
          >
            <Download className="w-5 h-5" /> Download Report
          </motion.a>
        )}
      </motion.div>
    </div>
  );
}

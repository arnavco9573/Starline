import { motion } from "framer-motion";
import { Ruler, Layers, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

interface ArchitectureProcessingOverlayProps {
    message?: string;
    subMessage?: string;
    processedCount?: number;
    totalCount?: number;
}

export default function ArchitectureProcessingOverlay({
    message = "ANALYZING ARCHITECTURE",
    subMessage = "Scanning structural integrity & code compliance...",
    processedCount,
    totalCount,
}: ArchitectureProcessingOverlayProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 rounded-2xl"
            style={{
                background: `
          linear-gradient(135deg, rgba(0, 40, 80, 0.95) 0%, rgba(0, 60, 120, 0.95) 100%),
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
        `,
            }}
        >
            {/* Blueprint Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Corner Markers (Blueprint Style) */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400"></div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Animated Blueprint Icon */}
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative"
                >
                    <div className="relative w-24 h-24 bg-cyan-500/20 rounded-lg border-2 border-cyan-400 flex items-center justify-center backdrop-blur-sm">
                        <Layers className="w-12 h-12 text-cyan-300" />

                        {/* Scanning Line Effect */}
                        <motion.div
                            animate={{ y: [-48, 48] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                            style={{ boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)" }}
                        />
                    </div>

                    {/* Orbiting Tools */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <Ruler className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 text-yellow-300" />
                    </motion.div>
                </motion.div>

                {/* Status Text */}
                <div className="text-center space-y-2">
                    <motion.h3
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-2xl font-bold text-white tracking-wide"
                        style={{
                            textShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
                        }}
                    >
                        {message}
                    </motion.h3>
                    <p className="text-cyan-200 text-sm font-mono">
                        {subMessage}
                    </p>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-4 text-cyan-100 text-xs font-mono">
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        className="flex items-center gap-2"
                    >
                        <FileText className="w-4 h-4" />
                        <span>DIMENSIONS</span>
                    </motion.div>
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        className="flex items-center gap-2"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>STANDARDS</span>
                    </motion.div>
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                        className="flex items-center gap-2"
                    >
                        <AlertTriangle className="w-4 h-4" />
                        <span>VIOLATIONS</span>
                    </motion.div>
                </div>

                {/* Progress Bar */}
                <div className="w-80 h-2 bg-blue-950/50 rounded-full overflow-hidden border border-cyan-600/30">
                    {processedCount !== undefined && totalCount !== undefined ? (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(processedCount / totalCount) * 100}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                            style={{
                                boxShadow: "0 0 15px rgba(34, 211, 238, 0.8)",
                            }}
                        />
                    ) : (
                        <motion.div
                            animate={{
                                x: ["-100%", "100%"],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                            style={{
                                boxShadow: "0 0 15px rgba(34, 211, 238, 0.8)",
                            }}
                        />
                    )}
                </div>

                {/* Technical Details */}
                <div className="flex gap-6 text-cyan-300/70 text-xs font-mono">
                    <div className="flex flex-col items-center">
                        <span className="text-cyan-400 font-bold">
                            {processedCount !== undefined && totalCount !== undefined
                                ? `${processedCount}/${totalCount}`
                                : "247"}
                        </span>
                        <span>CHECKPOINTS</span>
                    </div>
                    <div className="w-px h-8 bg-cyan-600/30"></div>
                    <div className="flex flex-col items-center">
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-yellow-400 font-bold"
                        >
                            SCANNING
                        </motion.span>
                        <span>STATUS</span>
                    </div>
                    <div className="w-px h-8 bg-cyan-600/30"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-cyan-400 font-bold">AI</span>
                        <span>POWERED</span>
                    </div>
                </div>
            </div>

            {/* Bottom Technical Line */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-cyan-400/50 text-xs font-mono">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>STARLINE.AI ANALYSIS ENGINE v2.5</span>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
        </motion.div>
    );
}
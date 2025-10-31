"use client";
import { LoadingIcon } from "@/components/icons/icons";
import ComplianceRiskMeter from "@/components/workspace/ComplianceRiskMeter";
import {
  checkpoints,
  idealForText,
  mockApiResponse,
  modeImages,
  mockCodeReport,
  mockApiResponsePlus,
  checkpointQuestions,
} from "@/lib/constants";
import {
  AnalysisIssue,
  CheckpointCategory,
  Mode,
  ProcessingState,
} from "@/types/workspace";
import {
  ChevronDown,
  Download,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Hand,
  FileText,
  PlusIcon,
  CheckCircleIcon,
  Plus,
  ChevronRight,
  ChevronLeft,
  Building,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import ComplianceArcMeter from "@/components/workspace/ComplianceArcMeter";
import Image from "next/image";
import { usePathname } from "next/navigation";

const mockExistingProjects = [
  { id: "proj_123", name: "Residential Complex - Phase 2" },
  { id: "proj_456", name: "Office Building Renovation" },
  { id: "proj_789", name: "Retail Store Layout" },
];

// --- Tooltip Button Component ---
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

// --- Questionnaire Questions ---
const questions = [
  "What is your project type? (Residential / Commercial / Institutional / Industrial / Mixed-use, etc.)",
  "What is the occupancy type? (Single-family, apartment, office, school, hospital, etc.)",
  "How many floors does the building have, and what is the total height?",
  "What is the built-up area, plot area, and Floor Area Ratio (FAR)?",
  "Where is the site located? (City and State — for applicable building codes like NBC India, local bye-laws, fire norms, etc.)",
];

export default function ImageWorkspace() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<Mode | null>(null);
  const pathname = usePathname();
  const [processingState, setProcessingState] =
    useState<ProcessingState>("idle");
  const [processedCheckpoints, setProcessedCheckpoints] = useState(0);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(0);
  const [displayedIdealForText, setDisplayedIdealForText] = useState("");
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [showStickyNote, setShowStickyNote] = useState(false);
  const [analysisIssues, setAnalysisIssues] = useState<AnalysisIssue[]>([]);
  const [outputPdfUrl, setOutputPdfUrl] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<"L" | "M" | "H">("L"); // Default to 'L'
  // --- Code Mode States ---
  const [showProjectPopover, setShowProjectPopover] = useState(false);
  const [showNewProjectPopover, setShowNewProjectPopover] = useState(false);
  const [activeProject, setActiveProject] = useState<{ name: string } | null>(
    null
  );
  const [riskScore, setRiskScore] = useState(0);
  const [finalRiskScore, setFinalRiskScore] = useState(0);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  // States for New Project Popover form
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const isHomePage = pathname === "/";
  // --- Zoom states ---
  const [zoom, setZoom] = useState(75);
  const [isPanning, setIsPanning] = useState(false);

  const [isPaused, setIsPaused] = useState(false);
  const [pausedAtCheckpoint, setPausedAtCheckpoint] = useState<number | null>(
    null
  );
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [questionAnswer, setQuestionAnswer] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const checkpointRefs = useRef<(HTMLLIElement | null)[]>([]);
  const projectPopoverRef = useRef<HTMLDivElement>(null);
  const processNextCheckpointRef = useRef<((index: number) => void) | null>(
    null
  );
  const isResumingRef = useRef(false);
  const flatCheckpoints = activeMode
    ? checkpoints[activeMode].flatMap((c) => c.points)
    : [];
  const totalCheckpoints = flatCheckpoints.length;

  // --- Handlers for Code Mode Popovers ---
  const handleNewProjectClick = () => {
    setShowProjectPopover(false);
    setShowNewProjectPopover(true);
    setStep(0);
    setProjectName("");
    setAnswers(Array(questions.length).fill(""));
  };

  const handleProjectCreated = () => {
    setActiveProject({ name: projectName });
    setShowNewProjectPopover(false);
  };

  const handleCloseNewProjectPopover = () => {
    setShowNewProjectPopover(false);
  };

  const handleSelectExistingProject = (project: { name: string }) => {
    setActiveProject(project);
    setShowProjectPopover(false); // Close the selection popover
    // Immediately prompt for file upload for the selected project
    setTimeout(() => fileInputRef.current?.click(), 100);
  };

  // useEffect(() => {
  //   console.log("🔍 Debug Info:", {
  //     processingState,
  //     processedCheckpoints,
  //     totalCheckpoints,
  //     finalRiskScore,
  //     reportUrl,
  //     isProcessing:
  //       processingState === "processing" || processingState === "calculating",
  //   });
  // }, [processingState, processedCheckpoints, finalRiskScore]);
  // --- Text Streaming Effect ---
  useEffect(() => {
    if (!activeMode) {
      setDisplayedIdealForText("");
      return;
    }

    const text = idealForText[activeMode];
    setDisplayedIdealForText("");

    let index = 0;
    let currentText = "";

    const intervalId = setInterval(() => {
      currentText += text[index];
      setDisplayedIdealForText(currentText);
      index++;

      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, 15);

    return () => clearInterval(intervalId);
  }, [activeMode]);

  // --- Processing Effect ---
  useEffect(() => {
    // Don't restart if we're just resuming from a pause
    if (isResumingRef.current) {
      isResumingRef.current = false;
      return;
    }

    if (processingState === "processing" && activeMode && !isPaused) {
      let timeoutId: NodeJS.Timeout | undefined;

      // Only reset if we're starting fresh (not resuming)
      if (processedCheckpoints === 0) {
        setCurrentProcessingIndex(0);
        checkpointRefs.current = [];
      }

      const processNextCheckpoint = (index = 0) => {
        setCurrentProcessingIndex(index);

        const questionAtCheckpoint = checkpointQuestions[activeMode]?.find(
          (q) => q.checkpoint === index
        );

        if (questionAtCheckpoint && !isPaused) {
          // Pause processing
          setIsPaused(true);
          setPausedAtCheckpoint(index);
          setCurrentQuestion(questionAtCheckpoint.question);
          return; // Stop processing here
        }

        if (checkpointRefs.current[index]) {
          checkpointRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        if (index < totalCheckpoints) {
          timeoutId = setTimeout(() => {
            setProcessedCheckpoints((prev) => prev + 1);
            processNextCheckpoint(index + 1);
          }, 550);
        } else {
          if (activeMode === "code") {
            setProcessingState("calculating");
          } else {
            setTimeout(() => {
              if (activeMode === "plus") {
                setAnalysisIssues(mockApiResponsePlus.notes);
                setOutputImage(mockApiResponsePlus.markedUpImageUrl);
                setOutputPdfUrl(mockApiResponsePlus.outputPdfUrl);
              } else {
                setAnalysisIssues(mockApiResponse.notes);
                setOutputImage(mockApiResponse.markedUpImageUrl);
                setOutputPdfUrl(mockApiResponse.outputPdfUrl);
              }
              setProcessingState("complete");
            }, 500);
          }
        }
      };

      // Store function in ref so it can be accessed outside
      processNextCheckpointRef.current = processNextCheckpoint;

      // Only start from beginning if we haven't processed any checkpoints yet
      const startIndex = processedCheckpoints === 0 ? 0 : processedCheckpoints;
      const startDelay = setTimeout(
        () => processNextCheckpoint(startIndex),
        500
      );

      return () => {
        clearTimeout(startDelay);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [processingState, activeMode, totalCheckpoints]);

  const handleQuestionSubmit = () => {
    console.log("Answer:", questionAnswer);

    // Set resuming flag
    isResumingRef.current = true;

    // Clear pause state FIRST
    setIsPaused(false);
    setCurrentQuestion(null);
    setQuestionAnswer("");

    // Resume from the next checkpoint after the paused one
    if (pausedAtCheckpoint !== null && processNextCheckpointRef.current) {
      setTimeout(() => {
        if (processNextCheckpointRef.current) {
          // Increment the processed count
          setProcessedCheckpoints((prev) => prev + 1);
          // Continue from next checkpoint
          processNextCheckpointRef.current(pausedAtCheckpoint + 1);
        }
        setPausedAtCheckpoint(null);
      }, 100);
    } else {
      setPausedAtCheckpoint(null);
    }
  };

  // --- Risk Meter Animation Effect ---
  useEffect(() => {
    if (processingState === "calculating" && activeMode === "code") {
      const targetScore = mockCodeReport.riskScore;
      const duration = 2000;
      let startTime: number | null = null;
      let animationFrameId: number;

      const animateScore = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentScore = progress * targetScore;
        setRiskScore(currentScore);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateScore);
        } else {
          setFinalRiskScore(targetScore);
          setReportUrl(mockCodeReport.reportUrl);
          setProcessingState("complete");
        }
      };
      animationFrameId = requestAnimationFrame(animateScore);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [processingState, activeMode, totalCheckpoints]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
      if (activeMode === "code") {
        if (file.type === "application/pdf") {
          setUploadedImage("pdf_icon");
        } else {
          alert("Please upload a PDF file for Code Compliance mode.");
          return;
        }
      } else {
        const isPdf = file.type === "application/pdf";
        if (isPdf) {
          setUploadedImage(
            activeMode === "plus"
              ? "/inital_drawing2.png" // 'Plus' mode ke liye PDF placeholder
              : "/initial_drawing.jpeg" // 'Base' mode ke liye PDF placeholder
          );
        } else {
          // Agar image hai, toh usey hi dikhayein
          setUploadedImage(URL.createObjectURL(file));
        }
      }
      setProcessingState("idle");
      setOutputImage(null);
      setOutputPdfUrl(null);
      setShowStickyNote(false);
      setAnalysisIssues([]);
      setZoom(75);
      setRiskScore(0);
      setFinalRiskScore(0);
      setReportUrl(null);
    }
  };

  const handleUploadClick = () => {
    if (activeMode === "code") {
      setShowProjectPopover(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleProceed = () => {
    if (uploadedImage && activeMode) {
      setProcessingState("processing");
      setShowStickyNote(false);
      if (activeMode === "code") {
        setRiskScore(0);
        setFinalRiskScore(0);
        setReportUrl(null);
      }
    }
  };

  const handleModeChange = (mode: Mode) => {
    setActiveMode(mode);
    setShowModeDropdown(false);
    setProcessingState("idle");
    setUploadedImage(null);
    setOutputImage(null);
    setOutputPdfUrl(null);
    setShowStickyNote(false);
    setAnalysisIssues([]);
    setActiveProject(null);
    setRiskScore(0);
    setFinalRiskScore(0);
    setReportUrl(null);
    setProcessedCheckpoints(0);
    setCurrentProcessingIndex(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoom(75);

  const renderAnalysisNotes = () => {
    if (analysisIssues.length === 0) {
      return (
        <p className="text-gray-600">No issues were found in this drawing.</p>
      );
    }
    return (
      <div className="space-y-4">
        {analysisIssues.map((issue) => (
          <div
            key={issue.id}
            className="p-3 bg-yellow-100/50 rounded-lg border border-yellow-300/50"
          >
            <h4 className="font-bold text-sm text-yellow-900">
              Issue #{issue.id}
            </h4>
            <p className="mt-1 text-sm text-gray-800">
              <strong className="font-semibold">Description:</strong>{" "}
              {issue.description}
            </p>
            <p className="mt-1 text-sm text-green-700">
              <strong className="font-semibold text-gray-800">
                Recommendation:
              </strong>{" "}
              {issue.recommendation}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Confidence: {(issue.confidence * 100).toFixed(0)}%
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderCheckpointsList = () => {
    if (!activeMode || !flatCheckpoints.length) {
      return (
        <div className="text-center text-gray-400 py-8">
          <p>Select a mode to view checkpoints</p>
        </div>
      );
    }

    let cumulativePoints = 0;
    return (
      <div className="space-y-2 relative ml-4 scrollbar-hide">
        {checkpoints[activeMode].map((category: CheckpointCategory) => {
          const sectionStartIndex = cumulativePoints;
          cumulativePoints += category.points.length;

          return (
            <div key={category.title} className="relative scrollbar-hide">
              <h3 className="font-semibold text-base mb-2 text-gray-900 bg-gray-50/80 backdrop-blur-sm sticky top-0 z-20 py-2 px-1 border-b border-gray-200">
                {category.title}
              </h3>

              <ul className="space-y-1 relative">
                {category.points.map((point, index) => {
                  const pointIndex = sectionStartIndex + index;
                  const isProcessed = pointIndex < processedCheckpoints;
                  const isCurrentlyProcessing =
                    pointIndex === currentProcessingIndex;

                  return (
                    <li
                      key={point}
                      ref={(el) => {
                        checkpointRefs.current[pointIndex] = el;
                        if (isCurrentlyProcessing && el) {
                          setTimeout(() => {
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                              inline: "nearest",
                            });
                          }, 100);
                        }
                      }}
                      className={`relative transition-all duration-500 ease-in-out transform flex items-center p-1 rounded-md ${
                        isCurrentlyProcessing
                          ? "text-green-800 font-semibold scale-[1.02]"
                          : isProcessed
                          ? "text-gray-700 opacity-90"
                          : "text-gray-400 opacity-50 translate-y-1"
                      }`}
                    >
                      <span className="flex-1 leading-relaxed text-sm">
                        {point}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  const handleQualityClick = (quality: "L" | "M" | "H") => {
    setSelectedQuality(quality);
    // You could potentially add logic here later if quality affects processing
  };

  // --- Handlers for New Project Popover Form ---
  const handleNextStep = () => {
    if (step === 0 && !projectName.trim()) return;
    setStep((prev) => Math.min(prev + 1, questions.length + 1));
  };
  const handleBackStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="h-screen w-full bg-white overflow-hidden flex flex-col">
      <div className="flex-shrink-0 px-12 pt-4 pb-2">
        <a href="/" className="flex items-center">
          <Image
            src={isHomePage ? "/logofinal.png" : "/LogoBlack.png"}
            alt="logo"
            width={isHomePage ? 180 : 120}
            height={42}
          />
        </a>
      </div>

      {/* --- Main Canvas Area --- */}
      <div className="flex-1 flex gap-4 px-12 pb-12 min-h-0">
        <main className="flex-[0.70] bg-[#ebfbff] bg-dotted-pattern [background-size:1rem_1rem] rounded-3xl shadow-sm flex items-center justify-center relative p-6">
          {/* Left Toolbar */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
            <button
              onClick={() => handleQualityClick("L")}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition ${
                selectedQuality === "L"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              L
            </button>
            <button
              onClick={() => handleQualityClick("M")}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition ${
                selectedQuality === "M"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              M
            </button>
            <button
              onClick={() => handleQualityClick("H")}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition ${
                selectedQuality === "H"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              H
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept={activeMode === "code" ? ".pdf" : "image/*,.pdf"}
            />
            <div className="relative" ref={projectPopoverRef}>
              <TooltipButton
                onClick={handleUploadClick}
                tooltipText={
                  activeMode === "code"
                    ? "Create/Select Project & Upload"
                    : "Upload Image/PDF"
                }
                icon={<PlusIcon />}
                className={`bg-gray-100 text-black hover:bg-gray-200 ${
                  !activeMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!activeMode}
              />

              <AnimatePresence>
                {showProjectPopover && activeMode === "code" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full ml-4 top-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">
                        Select Project
                      </h3>
                      <button
                        onClick={() => setShowProjectPopover(false)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        {" "}
                        <X className="w-4 h-4 text-gray-500" />{" "}
                      </button>
                    </div>
                    <div className="p-4 space-y-3">
                      <button
                        onClick={handleNewProjectClick}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        {" "}
                        <Plus className="w-4 h-4" /> New Project{" "}
                      </button>
                      {/* --- MODIFIED: List Existing Projects --- */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          {" "}
                          Recent Projects{" "}
                        </p>
                        <div className="space-y-1 max-h-32 overflow-y-auto pr-1 scrollbar-thin">
                          {mockExistingProjects.length > 0 ? (
                            mockExistingProjects.map((proj) => (
                              <button
                                key={proj.id}
                                onClick={() =>
                                  handleSelectExistingProject(proj)
                                }
                                className="w-full text-left p-2 rounded-md hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2 transition-colors"
                              >
                                <Building
                                  size={16}
                                  className="text-gray-400 flex-shrink-0"
                                />
                                <span className="truncate flex-1">
                                  {proj.name}
                                </span>
                              </button>
                            ))
                          ) : (
                            <div className="p-3 border border-dashed border-gray-300 rounded-lg text-gray-400 text-sm text-center">
                              {" "}
                              No projects yet{" "}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* New Project Questionnaire Popover */}
              <AnimatePresence>
                {showNewProjectPopover && activeMode === "code" && (
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
                        onClick={handleCloseNewProjectPopover}
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
                          width: `${(step / (questions.length + 1)) * 100}%`,
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
                      {step > 0 && step <= questions.length && (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <label className="text-sm font-semibold text-gray-900">
                            {questions[step - 1]}
                          </label>
                          <textarea
                            value={answers[step - 1]}
                            onChange={(e) =>
                              handleAnswerChange(step - 1, e.target.value)
                            }
                            rows={3}
                            className="w-full mt-2 p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                          />
                        </motion.div>
                      )}
                      {step === questions.length + 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-4"
                        >
                          <h4 className="text-lg font-bold text-gray-900">
                            Ready!
                          </h4>
                          <p className="mt-2 text-sm text-gray-600">
                            Project '{projectName}' is configured.
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t flex justify-between items-center flex-shrink-0">
                      <button
                        onClick={handleBackStep}
                        disabled={step === 0}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                      {step < questions.length + 1 ? (
                        <button
                          onClick={handleNextStep}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleProjectCreated}
                          className="px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Create
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Zoom Controls (Only for Base/Plus) */}
          {uploadedImage && activeMode !== "code" && (
            <div className="absolute left-6 bottom-6 flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full shadow-lg p-1.5 z-20">
              <TooltipButton
                onClick={() => setIsPanning(!isPanning)}
                tooltipText="Pan"
                icon={<Hand className="w-4 h-4" />}
                className={
                  isPanning ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }
              />
              <div className="w-px h-5 bg-gray-200 mx-1"></div>
              <TooltipButton
                onClick={handleZoomOut}
                tooltipText="Zoom Out"
                icon={<ZoomOut className="w-5 h-5" />}
                className="hover:bg-gray-100"
              />
              <div
                className="w-16 text-center cursor-pointer"
                onClick={handleResetZoom}
              >
                <span className="text-sm font-semibold text-gray-700">
                  {zoom}%
                </span>
              </div>
              <TooltipButton
                onClick={handleZoomIn}
                tooltipText="Zoom In"
                icon={<ZoomIn className="w-5 h-5" />}
                className="hover:bg-gray-100"
              />
              <div className="w-px h-5 bg-gray-200 mx-1"></div>
              <TooltipButton
                onClick={handleResetZoom}
                tooltipText="Fit to Screen"
                icon={<Maximize2 className="w-4 h-4" />}
                className="hover:bg-gray-100"
              />
            </div>
          )}

          {/* --- Central Content Area --- */}
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center">
            {/* --- UI for Base/Plus Modes --- */}
            {activeMode && activeMode !== "code" && (
              <>
                {uploadedImage ? (
                  <>
                    <div className="w-full h-[80%] flex items-center justify-center">
                      <motion.div
                        className="relative inline-block"
                        animate={{ scale: zoom / 100 }}
                        transition={{ duration: 0.2 }}
                        style={{ cursor: isPanning ? "grab" : "default" }}
                      >
                        <img
                          src={
                            processingState === "complete" && outputImage
                              ? outputImage
                              : uploadedImage
                          }
                          alt={
                            processingState === "complete"
                              ? "Processed Drawing"
                              : "Uploaded Drawing"
                          }
                          className="object-contain rounded-lg shadow-md max-h-[calc(100vh*0.7*0.8)]"
                        />
                        {processingState === "processing" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-lg bg-blue-950/60 backdrop-blur-md"
                          >
                            <LoadingIcon />
                            <p className="text-white font-semibold text-lg">
                              Analyzing Drawing...
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                    {processingState === "idle" && (
                      <div className="text-center">
                        <p className="text-gray-500 text-sm mb-4">
                          Ready for analysis.
                        </p>
                        <button
                          onClick={handleProceed}
                          className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                          disabled={!activeMode}
                        >
                          Proceed to Analysis
                        </button>
                      </div>
                    )}
                    {processingState === "complete" && (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <CheckCircleIcon className="text-green-600" />
                          <p className="text-green-600 font-medium">
                            Analysis Complete!
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-lg text-gray-500">
                    Click the '+' icon to upload an image or PDF
                  </p>
                )}
              </>
            )}

            {/* --- UI for Code Mode --- */}
            {activeMode === "code" && (
              <>
                {!activeProject && !uploadedImage && (
                  <p className="text-lg text-gray-500">
                    Click '+' to start a new compliance project.
                  </p>
                )}
                {activeProject && !uploadedImage && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-2xl font-bold">{activeProject.name}</h2>
                    <p className="text-gray-600 mb-4">
                      Project setup complete. Please upload your drawing PDF.
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800"
                    >
                      Upload PDF
                    </button>
                  </motion.div>
                )}
                {uploadedImage === "pdf_icon" && processingState === "idle" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-2xl font-bold">
                      {activeProject?.name}
                    </h2>
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto my-4" />
                    <p className="text-gray-600 mb-4">
                      PDF uploaded. Ready for compliance audit.
                    </p>
                    <button
                      onClick={handleProceed}
                      className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800"
                    >
                      Start Compliance Audit
                    </button>
                  </motion.div>
                )}
                {(processingState === "processing" ||
                  processingState === "calculating" ||
                  processingState === "complete") && (
                  <>
                    <ComplianceRiskMeter
                      score={finalRiskScore}
                      isProcessing={
                        processingState === "processing" ||
                        processingState === "calculating"
                      }
                      isPaused={isPaused}
                      processedCheckpoints={processedCheckpoints}
                      totalCheckpoints={totalCheckpoints}
                      reportUrl={reportUrl}
                    />

                    {/* Question Popover */}
                    {isPaused && currentQuestion && activeMode === "code" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                        className="mt-6 w-full max-w-md mx-auto"
                      >
                        <div className="bg-white rounded-xl shadow-2xl p-6 border-2 border-blue-200">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                            <h3 className="text-lg font-bold text-gray-900">
                              Compliance Question
                            </h3>
                          </div>
                          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                            {currentQuestion}
                          </p>
                          <textarea
                            value={questionAnswer}
                            onChange={(e) => setQuestionAnswer(e.target.value)}
                            placeholder="Enter your answer..."
                            rows={3}
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none mb-4 resize-none"
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={handleQuestionSubmit}
                              disabled={!questionAnswer.trim()}
                              className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </>
            )}

            {!activeMode && (
              <p className="text-lg text-gray-500">
                Please select an analysis mode from the right panel.
              </p>
            )}
          </div>

          {/* --- Action buttons (Base/Plus Mode) --- */}
          {processingState === "complete" && activeMode !== "code" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 right-6 flex items-center gap-3 z-20"
            >
              <TooltipButton
                onClick={() => setShowStickyNote(true)}
                tooltipText="View Issues"
                icon={<FileText className="w-5 h-5 text-amber-900" />}
                className="bg-gradient-to-r from-amber-400 to-yellow-400 shadow-lg"
              />
              {outputPdfUrl && (
                <TooltipButton
                  href={outputPdfUrl}
                  tooltipText="Download PDF"
                  icon={<Download className="w-5 h-5 text-white" />}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                />
              )}
            </motion.div>
          )}

          {/* --- Sticky Note Popup (Base/Plus Mode) --- */}
          {showStickyNote && activeMode !== "code" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-8 sm:inset-16 bg-gradient-to-br from-yellow-50 to-amber-50 backdrop-blur-sm rounded-3xl shadow-2xl border border-yellow-200/50 p-6 flex flex-col z-30"
            >
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Analysis Report
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Issues found: {analysisIssues.length}
                  </p>
                </div>
                <button
                  onClick={() => setShowStickyNote(false)}
                  className="p-2 rounded-full hover:bg-gray-900/10 transition-colors group"
                >
                  <X className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                {renderAnalysisNotes()}
              </div>
            </motion.div>
          )}
        </main>

        <aside className="flex-[0.30] bg-white rounded-3xl shadow-sm p-4 ml-4 flex flex-col gap-3 overflow-hidden">
          {/* Mode Selection */}
          <div className="space-y-3 w-full">
            <div className="relative inline-block">
              <button
                onClick={() => setShowModeDropdown(!showModeDropdown)}
                className="bg-white text-black font-semibold py-2 px-4 pr-10 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-xl text-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full"></div>
                <span className="relative z-10">
                  {activeMode
                    ? activeMode.charAt(0).toUpperCase() + activeMode.slice(1)
                    : "Select Mode"}
                </span>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-black rounded-full p-1 shadow-md z-10">
                  <ChevronDown className="w-3 h-3 text-gray-100" />
                </div>
              </button>
              {showModeDropdown && (
                <div className="absolute top-full left-0 mt-2 backdrop-blur-md bg-white/70 border border-gray-200/50 rounded-xl shadow-lg z-50 overflow-hidden min-w-[140px]">
                  {(["base", "plus", "code"] as Mode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        handleModeChange(mode);
                        setShowModeDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm font-medium transition ${
                        activeMode === mode
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100/70 text-gray-800"
                      } ${
                        mode !== "base" ? "border-t border-gray-200/40" : ""
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeMode && (
              <motion.div
                key={activeMode} // Key zaroori hai taaki AnimatePresence change detect kar sake
                initial={{ opacity: 0, scale: 0.95 }} // Shuruaat mein chhota aur invisible
                animate={{ opacity: 1, scale: 1 }} // Animate hoke normal size mein
                exit={{ opacity: 0, scale: 0.95 }} // Hatne par shrink aur fade-out
                transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                className="space-y-3" // Taaki text aur image block ke beech spacing bani rahe
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

          {/* Analysis Log */}
          {activeMode &&
            (processingState === "processing" ||
              processingState === "complete") && (
              <div className="flex-1 overflow-hidden flex flex-col mt-4">
                <div className="flex-1 overflow-y-auto pr-3 scrollbar-hide">
                  {renderCheckpointsList()}
                </div>
              </div>
            )}

          {/* Placeholder if no mode is selected */}
          {!activeMode && (
            <div className="flex-1 flex items-center justify-center text-center text-gray-500">
              <p>Select a mode above to begin.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import {
  checkpoints,
  checkpointQuestions,
  idealForText,
} from "@/lib/constants";
import {
  AnalysisIssue,
  Mode,
  ProcessingState,
} from "@/types/workspace";
import {
  analyzeWorkspace,
  WorkspaceAnalysisResponse,
} from "@/services/workspace";

export const projectQuestions = [
  "What is your project type? (Residential / Commercial / Institutional / Industrial / Mixed-use, etc.)",
  "What is the occupancy type? (Single-family, apartment, office, school, hospital, etc.)",
  "How many floors does the building have, and what is the total height?",
  "What is the built-up area, plot area, and Floor Area Ratio (FAR)?",
  "Where is the site located? (City and State — for applicable building codes like NBC India, local bye-laws, fire norms, etc.)",
];

// 4 hours in milliseconds
const TOKEN_EXPIRATION_MS = 4 * 60 * 60 * 1000;

export function useWorkspaceState() {
  const [activeMode, setActiveMode] = useState<Mode | null>(null);
  const pathname = usePathname();
  const [processingState, setProcessingState] =
    useState<ProcessingState>("idle");
  const [processedCheckpoints, setProcessedCheckpoints] = useState(0);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(0);
  const [displayedIdealForText, setDisplayedIdealForText] = useState("");
  const [showStickyNote, setShowStickyNote] = useState(false);
  const [analysisIssues, setAnalysisIssues] = useState<AnalysisIssue[]>([]);
  const [outputPdfUrl, setOutputPdfUrl] = useState<string | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<number>(1); // Changed from quality
  const [showProjectPopover, setShowProjectPopover] = useState(false);
  const [showNewProjectPopover, setShowNewProjectPopover] = useState(false);
  const [activeProject, setActiveProject] =
    useState<{ name: string } | null>(null);
  const [riskScore, setRiskScore] = useState(0);
  const [finalRiskScore, setFinalRiskScore] = useState(0);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [answers, setAnswers] = useState<string[]>(
    Array(projectQuestions.length).fill("")
  );
  const [zoom, setZoom] = useState(75);
  const [isPanning, setIsPanning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedAtCheckpoint, setPausedAtCheckpoint] = useState<number | null>(
    null
  );
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [questionAnswer, setQuestionAnswer] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [inputPdfUrl, setInputPdfUrl] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<WorkspaceAnalysisResponse | null>(null);
  const [targetRiskScore, setTargetRiskScore] = useState<number | null>(null);

  // --- Dropbox Token State ---
  const [dropboxToken, setDropboxToken] = useState<string | null>(null);
  const [tokenSetTime, setTokenSetTime] = useState<number | null>(null);
  const [showTokenPopover, setShowTokenPopover] = useState(false);
  // ---

  const fileInputRef = useRef<HTMLInputElement>(null);
  const checkpointRefs = useRef<(HTMLLIElement | null)[]>([]);
  const projectPopoverRef = useRef<HTMLDivElement>(null);
  const processNextCheckpointRef = useRef<((index: number) => void) | null>(
    null
  );
  const isResumingRef = useRef(false);
  const hasFinalizedRef = useRef(false);
  const inputPdfObjectUrlRef = useRef<string | null>(null);
  const outputPdfObjectUrlRef = useRef<string | null>(null);

  const isHomePage = pathname === "/";

  const flatCheckpoints = useMemo(
    () => (activeMode ? checkpoints[activeMode].flatMap((c) => c.points) : []),
    [activeMode]
  );
  const totalCheckpoints = flatCheckpoints.length;

  // --- Dropbox Token Effects ---
  useEffect(() => {
    // Load token and its timestamp from localStorage on initial load
    const storedToken = localStorage.getItem("dropboxToken");
    const storedTime = localStorage.getItem("dropboxTokenSetTime");

    if (storedToken && storedTime) {
      const time = parseInt(storedTime, 10);
      const now = Date.now();

      // Check if the token is expired
      if (now - time < TOKEN_EXPIRATION_MS) {
        setDropboxToken(storedToken);
        setTokenSetTime(time);
      } else {
        // Clear expired token
        localStorage.removeItem("dropboxToken");
        localStorage.removeItem("dropboxTokenSetTime");
      }
    }
  }, []);
  // ---

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
      index += 1;

      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, 15);

    return () => clearInterval(intervalId);
  }, [activeMode]);

  useEffect(() => {
    if (!analysisResult || !activeMode) return;
    if (processingState !== "processing" && processingState !== "calculating")
      return;
    if (processedCheckpoints < totalCheckpoints) return;
    if (hasFinalizedRef.current) return;

    setAnalysisIssues(analysisResult.issues);

    if (analysisResult.shouldRevokeOutputUrl) {
      if (outputPdfObjectUrlRef.current) {
        URL.revokeObjectURL(outputPdfObjectUrlRef.current);
      }
      outputPdfObjectUrlRef.current = analysisResult.outputPdfUrl ?? null;
    } else if (outputPdfObjectUrlRef.current) {
      URL.revokeObjectURL(outputPdfObjectUrlRef.current);
      outputPdfObjectUrlRef.current = null;
    }

    setOutputPdfUrl(analysisResult.outputPdfUrl ?? null);

    if (activeMode === "code") {
      setReportUrl(analysisResult.reportUrl ?? null);
      const score = analysisResult.riskScore ?? 0;
      setTargetRiskScore(score);
      setRiskScore(0);
      setFinalRiskScore(0);
      setProcessingState(
        typeof analysisResult.riskScore === "number"
          ? "calculating"
          : "complete"
      );
      if (analysisResult.riskScore == null) {
        setFinalRiskScore(0);
      }
    } else {
      setProcessingState("complete");
    }

    hasFinalizedRef.current = true;
  }, [
    analysisResult,
    activeMode,
    processedCheckpoints,
    processingState,
    totalCheckpoints,
  ]);

  useEffect(() => {
    if (isResumingRef.current) {
      isResumingRef.current = false;
      return;
    }

    if (processingState === "processing" && activeMode && !isPaused) {
      let timeoutId: NodeJS.Timeout | undefined;

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
          setIsPaused(true);
          setPausedAtCheckpoint(index);
          setCurrentQuestion(questionAtCheckpoint.question);
          return;
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
        }
      };

      processNextCheckpointRef.current = processNextCheckpoint;

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
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processingState, activeMode, totalCheckpoints]);

  useEffect(() => {
    if (
      processingState === "calculating" &&
      activeMode === "code" &&
      targetRiskScore !== null
    ) {
      const duration = 2000;
      let startTime: number | null = null;
      let animationFrameId: number;

      const animateScore = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentScore = progress * targetRiskScore;
        setRiskScore(currentScore);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateScore);
        } else {
          setFinalRiskScore(targetRiskScore);
          setProcessingState("complete");
        }
      };

      animationFrameId = requestAnimationFrame(animateScore);
      return () => cancelAnimationFrame(animationFrameId);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processingState, activeMode, targetRiskScore]);

  // --- Token Handlers ---
  const handleTokenSubmit = (token: string) => {
    const now = Date.now();
    setDropboxToken(token);
    setTokenSetTime(now);
    localStorage.setItem("dropboxToken", token);
    localStorage.setItem("dropboxTokenSetTime", String(now));
    setShowTokenPopover(false);
  };

  const handleCloseTokenPopover = () => setShowTokenPopover(false);
  const handleOpenTokenPopover = () => setShowTokenPopover(true);
  // ---

  const handleQuestionSubmit = () => {
    isResumingRef.current = true;

    setIsPaused(false);
    setCurrentQuestion(null);
    setQuestionAnswer("");

    if (pausedAtCheckpoint !== null && processNextCheckpointRef.current) {
      setTimeout(() => {
        if (processNextCheckpointRef.current) {
          setProcessedCheckpoints((prev) => prev + 1);
          processNextCheckpointRef.current(pausedAtCheckpoint + 1);
        }
        setPausedAtCheckpoint(null);
      }, 100);
    } else {
      setPausedAtCheckpoint(null);
    }
  };

  const resetOutputPdf = () => {
    if (outputPdfObjectUrlRef.current) {
      URL.revokeObjectURL(outputPdfObjectUrlRef.current);
      outputPdfObjectUrlRef.current = null;
    }
    setOutputPdfUrl(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      // Use custom alert logic here if available, fallback to console
      console.error("Please upload a PDF file.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    if (inputPdfObjectUrlRef.current) {
      URL.revokeObjectURL(inputPdfObjectUrlRef.current);
      inputPdfObjectUrlRef.current = null;
    }

    resetOutputPdf();
    hasFinalizedRef.current = false;

    const objectUrl = URL.createObjectURL(file);
    inputPdfObjectUrlRef.current = objectUrl;
    setInputPdfUrl(objectUrl);
    setUploadedFile(file);
    setProcessingState("idle");
    setShowStickyNote(false);
    setAnalysisIssues([]);
    setAnalysisResult(null);
    setAnalysisError(null);
    setZoom(75);
    setRiskScore(0);
    setFinalRiskScore(0);
    setReportUrl(null);
    setTargetRiskScore(null);
    setProcessedCheckpoints(0);
    setCurrentProcessingIndex(0);
  };

  const handleUploadClick = () => {
    if (activeMode === "code") {
      setShowProjectPopover(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleProceed = () => {
    if (!uploadedFile || !activeMode) {
      return;
    }

    // --- Token Validation ---
    const now = Date.now();
    if (!dropboxToken || !tokenSetTime || now - tokenSetTime >= TOKEN_EXPIRATION_MS) {
      setAnalysisError("Dropbox token is missing or expired. Please set a new token.");
      setShowTokenPopover(true);
      return;
    }
    // ---

    resetOutputPdf();
    setProcessingState("processing");
    setShowStickyNote(false);
    setAnalysisIssues([]);
    setAnalysisResult(null);
    setAnalysisError(null);
    setRiskScore(0);
    setFinalRiskScore(0);
    setReportUrl(null);
    setProcessedCheckpoints(0);
    setCurrentProcessingIndex(0);
    setIsPaused(false);
    setPausedAtCheckpoint(null);
    hasFinalizedRef.current = false;

    const trimmedAnswers = answers.map((answer) => answer.trim());

    (async () => {
      setIsUploading(true);
      try {
        const result = await analyzeWorkspace({
          pdf_file: uploadedFile,
          mode: activeMode,
          degree: selectedDegree,
          accessToken: dropboxToken, // Pass the valid token
          projectName,
          questionnaire: trimmedAnswers.filter((answer) => answer.length > 0),
        });
        setAnalysisResult(result);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setAnalysisError(message);
        setProcessingState("idle");
        setProcessedCheckpoints(0);
        setCurrentProcessingIndex(0);
      } finally {
        setIsUploading(false);
      }
    })();
  };

  const handleModeChange = (mode: Mode) => {
    setActiveMode(mode);
    setShowModeDropdown(false);
    setProcessingState("idle");
    setSelectedDegree(1); // Reset degree on mode change
    if (inputPdfObjectUrlRef.current) {
      URL.revokeObjectURL(inputPdfObjectUrlRef.current);
      inputPdfObjectUrlRef.current = null;
    }
    resetOutputPdf();
    setInputPdfUrl(null);
    setUploadedFile(null);
    setAnalysisResult(null);
    setAnalysisError(null);
    setShowStickyNote(false);
    setAnalysisIssues([]);
    setActiveProject(null);
    setRiskScore(0);
    setFinalRiskScore(0);
    setReportUrl(null);
    setTargetRiskScore(null);
    setProcessedCheckpoints(0);
    setCurrentProcessingIndex(0);
    hasFinalizedRef.current = false;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDegreeClick = (degree: number) => {
    setSelectedDegree(degree);
  };

  const handleNewProjectClick = () => {
    setShowProjectPopover(false);
    setShowNewProjectPopover(true);
    setStep(0);
    setProjectName("");
    setAnswers(Array(projectQuestions.length).fill(""));
  };

  const handleProjectCreated = () => {
    setActiveProject({ name: projectName });
    setShowNewProjectPopover(false);
  };

  const handleCloseNewProjectPopover = () => {
    setShowNewProjectPopover(false);
  };

  const handleCloseProjectPopover = () => {
    setShowProjectPopover(false);
  };

  const handleSelectExistingProject = (project: { name: string }) => {
    setActiveProject(project);
    setShowProjectPopover(false);
    setTimeout(() => fileInputRef.current?.click(), 100);
  };

  const handleNextStep = () => {
    if (step === 0 && !projectName.trim()) return;
    setStep((prev) => Math.min(prev + 1, projectQuestions.length + 1));
  };

  const handleBackStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoom(75);

  const toggleModeDropdown = () => {
    setShowModeDropdown((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      if (inputPdfObjectUrlRef.current) {
        URL.revokeObjectURL(inputPdfObjectUrlRef.current);
      }
      if (outputPdfObjectUrlRef.current) {
        URL.revokeObjectURL(outputPdfObjectUrlRef.current);
      }
    };
  }, []);

  return {
    // derived
    isHomePage,
    flatCheckpoints,
    totalCheckpoints,

    // refs
    fileInputRef,
    checkpointRefs,
    projectPopoverRef,

    // state
    activeMode,
    processingState,
    processedCheckpoints,
    currentProcessingIndex,
    displayedIdealForText,
    inputPdfUrl,
    showStickyNote,
    analysisIssues,
    outputPdfUrl,
    selectedDegree,
    showModeDropdown,
    showProjectPopover,
    showNewProjectPopover,
    activeProject,
    riskScore,
    finalRiskScore,
    reportUrl,
    step,
    projectName,
    answers,
    zoom,
    isPanning,
    isPaused,
    currentQuestion,
    questionAnswer,
    analysisError,
    isUploading,

    // --- Token State ---
    showTokenPopover,
    tokenSetTime,
    // ---

    // setters exposed for UI bindings
    setShowStickyNote,
    setIsPanning,
    setQuestionAnswer,
    setProjectName,
    setAnalysisError,

    // handlers
    handleUploadClick,
    handleFileChange,
    handleProceed,
    handleModeChange,
    handleDegreeClick,
    handleNewProjectClick,
    handleProjectCreated,
    handleCloseNewProjectPopover,
    handleCloseProjectPopover,
    handleSelectExistingProject,
    handleQuestionSubmit,
    handleNextStep,
    handleBackStep,
    handleAnswerChange,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    toggleModeDropdown,

    // --- Token Handlers ---
    handleTokenSubmit,
    handleCloseTokenPopover,
    handleOpenTokenPopover,
    // ---
  };
}


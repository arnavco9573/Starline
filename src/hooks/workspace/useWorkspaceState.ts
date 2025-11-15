"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import {
  checkpoints,
  checkpointQuestions,
  idealForText,
} from "@/lib/constants";
import { AnalysisIssue, Mode, ProcessingState } from "@/types/workspace";
import {
  analyzeWorkspace,
  AnalyzeWorkspaceParams,
  WorkspaceAnalysisResponse,
  saveProject,
  generateReport, // --- [FIX 3] --- Import new function
} from "@/services/workspace";
import { downloadBase64Pdf } from "@/lib/utils";

export const projectQuestions = [
  {
    key: "Building Type / Occupancy Classification",
    question: "What is the building’s type or occupancy classification?",
  },
  {
    key: "Plot Area and Shape",
    question: "What is the plot area and its shape?",
  },
  {
    key: "Total Built-Up Area and Floor Count",
    question: "What is the total built-up area and number of floors?",
  },
  {
    key: "Building Height (in meters)",
    question: "How tall is the building in meters?",
  },
  {
    key: "Occupant Load and Expected Population per Floor",
    question: "How many people are expected per floor?",
  },
  {
    key: "Fire Safety Systems Provided",
    question: "What fire safety systems are installed?",
  },
  {
    key: "Accessibility Provisions (ramps, toilets, lifts, etc.)",
    question: "What accessibility features are provided?",
  },
  {
    key: "Service Planning (Electrical, HVAC, water, drainage, etc.)",
    question: "What building services are planned or installed?",
  },
  {
    key: "Access Road Width and Entry/Exit Configuration",
    question: "What is the access road width and the entry/exit layout?",
  },
  {
    key: "Jurisdiction or Development Control Regulation (DCR) applied",
    question: "Which regulations or DCR apply to this project?",
  },
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
  const [activeProject, setActiveProject] = useState<{ name: string } | null>(
    null
  );
  const [riskScore, setRiskScore] = useState(0);
  const [finalRiskScore, setFinalRiskScore] = useState(0);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [zoom, setZoom] = useState(75);
  const [isPanning, setIsPanning] = useState(false);
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

  const [isSavingProject, setIsSavingProject] = useState(false);
  const isResumingRef = useRef(false);
  const hasFinalizedRef = useRef(false);
  const inputPdfObjectUrlRef = useRef<string | null>(null);
  const outputPdfObjectUrlRef = useRef<string | null>(null);
  const lastRequestRef = useRef<AnalyzeWorkspaceParams | null>(null);

  const isHomePage = pathname === "/";

  const flatCheckpoints = useMemo(
    () => (activeMode ? checkpoints[activeMode].flatMap((c) => c.points) : []),
    [activeMode]
  );
  const totalCheckpoints = flatCheckpoints.length;

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showAgentPopover, setShowAgentPopover] = useState(false);

  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [rawAnalysisData, setRawAnalysisData] = useState<any>(null);

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
      setRawAnalysisData(analysisResult.rawAnalysisData);
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
  }, [analysisResult, activeMode]);

  useEffect(() => {
    if (isResumingRef.current) {
      isResumingRef.current = false;
      return;
    }

    if (processingState === "processing" && activeMode) {
      let timeoutId: NodeJS.Timeout | undefined;

      if (processedCheckpoints === 0) {
        setCurrentProcessingIndex(0);
        checkpointRefs.current = [];
      }

      const processNextCheckpoint = (index = 0) => {
        setCurrentProcessingIndex(index);

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

  const runAnalysis = (agentToUse: string | null) => {
    if (!uploadedFile || !activeMode) return;

    // Token Validation
    const now = Date.now();
    if (
      !dropboxToken ||
      !tokenSetTime ||
      now - tokenSetTime >= TOKEN_EXPIRATION_MS
    ) {
      setAnalysisError(
        "Dropbox token is missing or expired. Please set a new token."
      );
      setShowTokenPopover(true);
      return;
    }

    // --- All the logic from handleProceed is now here ---
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
    hasFinalizedRef.current = false;

    (async () => {
      setIsUploading(true);

      try {
        const requestPayload: AnalyzeWorkspaceParams = {
          pdf_file: uploadedFile,
          mode: activeMode,
          degree: selectedDegree,
          accessToken: dropboxToken,
          projectName,
          questionnaire: Object.values(answers),
          agentKey: agentToUse, // <-- Use the passed-in agent
        };

        lastRequestRef.current = requestPayload;
        const result = await analyzeWorkspace(requestPayload);
        setAnalysisResult(result);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setAnalysisError(message);
        setProcessingState("error");
        setProcessedCheckpoints(0);
        setCurrentProcessingIndex(0);
      } finally {
        setIsUploading(false);
      }
    })();
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
    setSelectedAgent(null);
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

    // Check for token first (we can do this here or in runAnalysis)
    const now = Date.now();
    if (
      !dropboxToken ||
      !tokenSetTime ||
      now - tokenSetTime >= TOKEN_EXPIRATION_MS
    ) {
      setAnalysisError(
        "Dropbox token is missing or expired. Please set a new token."
      );
      setShowTokenPopover(true);
      return;
    }

    if (activeMode === "code" && !selectedAgent) {
      // If no agent is selected, just show the popover.
      setShowAgentPopover(true);
      return;
    }

    // If we're here, we have an agent (or don't need one), so run the analysis.
    runAnalysis(selectedAgent);
  };

  const handleGenerateReport = async () => {
    if (!rawAnalysisData || !dropboxToken || isGeneratingReport) return;

    setIsGeneratingReport(true);
    setAnalysisError(null);
    try {
      // 3. Get both values from the API call
      const { reportUrl, base64Pdf } = await generateReport(
        rawAnalysisData,
        dropboxToken
      );

      // 4. If we got Base64 data, trigger the download
      if (base64Pdf) {
        const fileName = `Starline_Report_${Date.now()}.pdf`;
        downloadBase64Pdf(base64Pdf, fileName);
      }

      // 5. Set the URL as a fallback
      // This makes the "Download Report" link appear,
      // just in case the automatic download fails or the user wants it again.
      setReportUrl(reportUrl);
    } catch (error: any) {
      setAnalysisError(
        error.message || "Failed to generate report. Please try again."
      );
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleRetry = async () => {
    if (!lastRequestRef.current) return;
    setAnalysisError(null);
    setProcessingState("processing");
    setIsUploading(true);

    try {
      const result = await analyzeWorkspace(lastRequestRef.current);
      setAnalysisResult(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setAnalysisError(message);
      setProcessingState("idle");
    } finally {
      setIsUploading(false);
    }
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
    setSelectedAgent(null);
    setShowAgentPopover(false);
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

  const handleAgentSelect = (agentKey: string) => {
    setSelectedAgent(agentKey); // Set state for the UI
    setShowAgentPopover(false); // Close the popover

    // Run the analysis immediately with the new key.
    // No timeout, no stale state.
    runAnalysis(agentKey);
  };

  const handleCloseAgentPopover = () => {
    setShowAgentPopover(false);
  };

  const handleDegreeClick = (degree: number) => {
    if (activeMode !== "base") return;
    setSelectedDegree(degree);
  };

  const handleNewProjectClick = () => {
    setShowProjectPopover(false);
    setShowNewProjectPopover(true);
    setStep(0);
    setProjectName("");
    setAnswers({});
  };

  const handleProjectCreated = async () => {
    if (isSavingProject) return; // Prevent double-submit

    setIsSavingProject(true);
    setAnalysisError(null);
    try {
      // Call the new saveProject API function
      await saveProject(projectName, answers);

      // On success, set the active project and close the popover
      setActiveProject({ name: projectName });
      setShowNewProjectPopover(false);
    } catch (error: any) {
      // On failure, show an error
      setAnalysisError(
        error.message || "Failed to save project. Please try again."
      );
    } finally {
      setIsSavingProject(false);
    }
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
    // Ensure project name is filled before proceeding
    if (step === 0 && projectName.trim() === "") {
      alert("Please enter a project name.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
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
    analysisError,
    isUploading,
    isSavingProject,

    // --- Token State ---
    showTokenPopover,
    tokenSetTime,
    // ---

    // setters exposed for UI bindings
    setShowStickyNote,
    setIsPanning,
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
    handleNextStep,
    handleBackStep,
    handleAnswerChange,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    toggleModeDropdown,
    handleRetry,

    // --- Token Handlers ---
    handleTokenSubmit,
    handleCloseTokenPopover,
    handleOpenTokenPopover,
    // ---

    showAgentPopover,
    selectedAgent,
    handleAgentSelect,
    handleCloseAgentPopover,

    isGeneratingReport,
    handleGenerateReport,
  };
}

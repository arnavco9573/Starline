"use client";
import { Mode } from "@/types/workspace"; // Assuming types is at src/types
import {
  AlertTriangle,
  CheckCircleIcon,
  ChevronDown,
  Download,
  FileText,
  PlusIcon,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import React, { Suspense } from "react";
import {
  projectQuestions,
  useWorkspaceState,
} from "@/hooks/workspace/useWorkspaceState";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import TooltipButton from "@/components/workspace/TooltipButton";
import SelectProjectPopover from "@/components/workspace/SelectProjectPopover";
import NewProjectPopover from "@/components/workspace/NewProjectPopOver";
import PdfZoomControls from "@/components/workspace/PdfZoomControls";
import { LoadingIcon } from "@/components/icons/icons";
import ComplianceRiskMeter from "@/components/workspace/ComplianceRiskMeter";
import AnalysisNotes from "@/components/workspace/AnalysisNotes";
import ModeInfoPanel from "@/components/workspace/ModelInfoPanel";
import CheckpointList from "@/components/workspace/CheckPointList";
import DropboxTokenPopover from "@/components/workspace/DropBoxPopover";
import ArchitectureProcessingOverlay from "@/components/workspace/ArchitecureProcessingOverlay";

const PdfPreview = React.lazy(
  () => import("@/components/workspace/PdfPreview")
);

const mockExistingProjects = [
  { id: "proj_123", name: "Residential Complex - Phase 2" },
  { id: "proj_456", name: "Office Building Renovation" },
  { id: "proj_789", name: "Retail Store Layout" },
];

export default function ImageWorkspace() {
  const {
    isHomePage,
    fileInputRef,
    checkpointRefs,
    projectPopoverRef,
    activeMode,
    processingState,
    processedCheckpoints,
    currentProcessingIndex,
    displayedIdealForText,
    inputPdfUrl,
    showStickyNote,
    setShowStickyNote,
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
    setProjectName,
    zoom,
    isPanning,
    setIsPanning,
    isPaused,
    currentQuestion,
    questionAnswer,
    setQuestionAnswer,
    analysisError,
    isUploading,
    setAnalysisError,
    flatCheckpoints,
    totalCheckpoints,
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
    showTokenPopover,
    tokenSetTime,
    handleTokenSubmit,
    handleCloseTokenPopover,
    handleOpenTokenPopover,
    // ---
  } = useWorkspaceState();

  const hasInputPdf = Boolean(inputPdfUrl);
  const displayPdfUrl =
    processingState === "complete" && outputPdfUrl ? outputPdfUrl : inputPdfUrl;
  const viewerScale = zoom / 100;

  const availableDegrees: number[] = [];
  if (activeMode === "base") {
    availableDegrees.push(1, 2, 3, 4);
  } else if (activeMode === "plus") {
    availableDegrees.push(1, 2);
  }

  return (
    <div className="h-screen w-full bg-white overflow-hidden flex flex-col">
      <WorkspaceHeader
        isHomePage={isHomePage}
        showTokenPopover={showTokenPopover}
        tokenSetTime={tokenSetTime}
        handleTokenSubmit={handleTokenSubmit}
        handleCloseTokenPopover={handleCloseTokenPopover}
        handleOpenTokenPopover={handleOpenTokenPopover}
      />

      {/* --- Main Canvas Area --- */}
      <div className="flex-1 flex gap-4 px-12 pb-12 min-h-0">
        <main className="flex-[0.70] bg-[#ebfbff] bg-dotted-pattern [background-size:1rem_1rem] rounded-3xl shadow-sm flex items-center justify-center relative p-6">
          {/* Left Toolbar */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
            {availableDegrees.map((degree) => (
              <button
                key={degree}
                onClick={() => handleDegreeClick(degree)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition ${selectedDegree === degree
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
              >
                {degree}
              </button>
            ))}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf"
            />
            {/* --- Project Popover Section --- */}
            <div className="relative" ref={projectPopoverRef}>
              <TooltipButton
                onClick={handleUploadClick}
                tooltipText={
                  activeMode === "code"
                    ? "Create/Select Project & Upload"
                    : "Upload Image/PDF"
                }
                icon={<PlusIcon />}
                className={`bg-gray-100 text-black hover:bg-gray-200 ${!activeMode ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={!activeMode}
              />

              <AnimatePresence>
                {showProjectPopover && activeMode === "code" && (
                  <SelectProjectPopover
                    projects={mockExistingProjects}
                    onClose={handleCloseProjectPopover}
                    onNewProject={handleNewProjectClick}
                    onSelectProject={handleSelectExistingProject}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showNewProjectPopover && activeMode === "code" && (
                  <NewProjectPopover
                    projectQuestions={projectQuestions}
                    step={step}
                    projectName={projectName}
                    answers={answers}
                    onClose={handleCloseNewProjectPopover}
                    onCreate={handleProjectCreated}
                    setProjectName={setProjectName}
                    onAnswerChange={handleAnswerChange}
                    onNextStep={handleNextStep}
                    onBackStep={handleBackStep}
                  />
                )}
              </AnimatePresence>
            </div>
            {/* --- End Project Popover Section --- */}
          </div>

          {/* Zoom Controls (Only for Base/Plus) */}
          {hasInputPdf && activeMode !== "code" && (
            <PdfZoomControls
              isPanning={isPanning}
              onTogglePan={() => setIsPanning(!isPanning)}
              onZoomOut={handleZoomOut}
              onZoomIn={handleZoomIn}
              onResetZoom={handleResetZoom}
              zoom={zoom}
            />
          )}

          {/* --- Central Content Area --- */}
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center">
            {/* --- UI for Base/Plus Modes --- */}
            {activeMode && activeMode !== "code" && (
              <>
                {hasInputPdf ? (
                  <>
                    <div className="w-full h-[80%] flex items-center justify-center">
                      <div
                        className="relative inline-flex max-h-[calc(100vh*0.8*0.8)] rounded-2xl shadow-md bg-white overflow-auto"
                        style={{
                          cursor: isPanning ? "grab" : "default",
                          overflow: processingState === "processing" ? "hidden" : "auto"
                        }}
                      >
                        {displayPdfUrl && (
                          // --- MODIFIED ---
                          // Added Suspense wrapper for React.lazy
                          <Suspense
                            fallback={
                              <div className="p-10 text-center text-gray-500">
                                Loading PDF Viewer...
                              </div>
                            }
                          >
                            <PdfPreview
                              fileUrl={displayPdfUrl}
                              scale={viewerScale}
                              className="max-h-[calc(100vh*0.8*0.8)]"
                            />
                          </Suspense>
                          // --- END MODIFIED ---
                        )}
                        {processingState === "processing" && (
                          <ArchitectureProcessingOverlay
                            message={isUploading ? "UPLOADING DRAWING" : "ANALYZING ARCHITECTURE"}
                            subMessage={
                              isUploading
                                ? "Uploading drawing to analysis engine..."
                                : "Scanning structural integrity & code compliance..."
                            }
                            processedCount={processedCheckpoints}
                            totalCount={totalCheckpoints}
                          />
                        )}
                      </div>
                    </div>
                    {processingState === "idle" && (
                      <div className="text-center">
                        <p className="text-gray-500 text-sm mb-4">
                          Ready for analysis.
                        </p>
                        <button
                          onClick={handleProceed}
                          className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                          disabled={processingState !== "idle" || isUploading}
                        >
                          {isUploading ? "Uploading..." : "Proceed to Analysis"}
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
                    Click the '+' icon to upload your drawing PDF
                  </p>
                )}
              </>
            )}

            {/* --- UI for Code Mode --- */}
            {activeMode === "code" && (
              <>
                {!activeProject && !hasInputPdf && (
                  <p className="text-lg text-gray-500">
                    Click '+' to start a new compliance project.
                  </p>
                )}
                {activeProject && !hasInputPdf && (
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
                {hasInputPdf && processingState === "idle" && (
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
                      className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 disabled:bg-gray-400"
                      disabled={processingState !== "idle" || isUploading}
                    >
                      {isUploading ? "Uploading..." : "Start Compliance Audit"}
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

            {analysisError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl shadow-sm"
              >
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm font-medium flex-1 text-left">
                  {analysisError}
                </span>
                <button
                  onClick={() => setAnalysisError(null)}
                  className="p-1 rounded-full hover:bg-red-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
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
                <AnalysisNotes issues={analysisIssues} />
              </div>
            </motion.div>
          )}
        </main>

        <aside className="flex-[0.30] bg-white rounded-3xl shadow-sm p-4 ml-4 flex flex-col gap-3 overflow-hidden">
          {/* Mode Selection */}
          <div className="space-y-3 w-full">
            <div className="relative inline-block">
              <button
                onClick={toggleModeDropdown}
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
                      }}
                      className={`w-full text-left px-3 py-2 text-sm font-medium transition ${activeMode === mode
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-100/70 text-gray-800"
                        } ${mode !== "base" ? "border-t border-gray-200/40" : ""
                        }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <ModeInfoPanel
            activeMode={activeMode}
            displayedIdealForText={displayedIdealForText}
          />

          {/* Analysis Log */}
          {activeMode &&
            (processingState === "processing" ||
              processingState === "complete") && (
              <div className="flex-1 overflow-hidden flex flex-col mt-4">
                <div className="flex-1 overflow-y-auto pr-3 scrollbar-hide">
                  <CheckpointList
                    activeMode={activeMode}
                    flatCheckpoints={flatCheckpoints}
                    processedCheckpoints={processedCheckpoints}
                    currentProcessingIndex={currentProcessingIndex}
                    checkpointRefs={checkpointRefs}
                  />
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

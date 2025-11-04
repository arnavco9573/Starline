"use client";

import React from "react";
// Naye data structure ke liye types (aap isse global types mein move kar sakte hain)
import { AnalysisIssue } from "@/types/workspace";
import { Download } from "lucide-react"; // --- ICON IMPORT KIYA ---

interface AnalysisNotesProps {
    issues: AnalysisIssue[];
}

// Severity ke hisaab se styling ke liye helper object
const severityConfig: Record<
    string,
    {
        bg: string;
        border: string;
        text: string;
        title: string;
    }
> = {
    default: {
        bg: "bg-gray-100/50",
        border: "border-gray-300/50",
        text: "text-gray-900",
        title: "text-gray-800",
    },
    Minor: {
        bg: "bg-blue-100/50",
        border: "border-blue-300/50",
        text: "text-blue-900",
        title: "text-blue-800",
    },
    Important: {
        bg: "bg-yellow-100/50",
        border: "border-yellow-300/50",
        text: "text-yellow-900",
        title: "text-yellow-800",
    },
    Critical: {
        bg: "bg-red-100/50",
        border: "border-red-300/50",
        text: "text-red-900",
        title: "text-red-800",
    },
};

// Helper function jo severity ke hisaab se style chunta hai
const getStyles = (severity: string) => {
    return severityConfig[severity] || severityConfig.default;
};

// --- NAYA PDF PRINT FUNCTION ---
const handlePrintPdf = (issues: AnalysisIssue[]) => {
    // 1. HTML content string banayenge
    let htmlContent = `
    <html>
      <head>
        <title>Analysis Report</title>
        <!-- Tailwind CSS ko load karenge taaki styling kaam kare -->
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          /* Printing ke liye helper style */
          @media print {
            body {
              -webkit-print-color-adjust: exact; /* Colors print karne ke liye */
            }
            .no-print { display: none; } /* Print button ko print se hide karega */
          }
        </style>
      </head>
      <body class="bg-gray-50 p-8">
        <h1 class="text-3xl font-bold mb-6 text-gray-900">Analysis Report</h1>
        <!-- Nayi window mein bhi print button de denge -->
        <button 
          class="no-print mb-6 flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors shadow-md" 
          onclick="window.print()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
          Print / Save as PDF
        </button>
        <div class="space-y-4">
  `;

    // 2. Har issue ke liye HTML card banayenge
    issues.forEach((issue) => {
        const styles = getStyles(issue.severity);
        htmlContent += `
      <div class="p-4 rounded-lg border ${styles.bg} ${styles.border
            }" style="page-break-inside: avoid;">
        <!-- Header: ID aur Severity Badge -->
        <div class="flex justify-between items-center mb-2">
          <h4 class="font-bold text-base ${styles.title}">Issue #${issue.id}</h4>
          <span class="px-3 py-1 text-xs font-semibold rounded-full ${styles.bg.replace(
                "/50",
                ""
            )} ${styles.text}">
            ${issue.severity}
          </span>
        </div>

        <!-- Main Info: Description aur Recommendation -->
        <p class="mt-1 text-sm text-gray-800">
          <strong class="font-semibold text-gray-900">Description:</strong>
          ${issue.description}
        </p>
        <p class="mt-2 text-sm text-green-700">
          <strong class="font-semibold text-green-800">Recommendation:</strong>
          ${issue.suggested_fix}
        </p>

        <!-- Divider -->
        <hr class="my-3 ${styles.border.replace("/50", "/80")}" />

        <!-- Details Grid: Impact, Page, Confidence -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <p class="text-gray-700">
            <strong class="font-semibold text-gray-900">Impact:</strong>
            ${issue.impact}
          </p>
          <p class="text-gray-700">
            <strong class="font-semibold text-gray-900">Page:</strong>
            ${issue.page_number}
          </p>
          <p class="text-gray-700">
            <strong class="font-semibold text-gray-900">Confidence:</strong>
            ${issue.confidence?.toFixed(0)}%
          </p>
        </div>

        <!-- Detected Features -->
        ${issue.detected_features && issue.detected_features.length > 0
                ? `
            <div class="mt-3">
              <strong class="text-sm font-semibold text-gray-900">Detected Features:</strong>
              <ul class="list-disc list-inside pl-2 mt-1 text-xs text-gray-600 space-y-1">
                ${issue.detected_features
                    .map((feature) => `<li>${feature}</li>`)
                    .join("")}
              </ul>
            </div>
            `
                : ""
            }

        <!-- Notes -->
        ${issue.notes
                ? `
            <div class="mt-3">
              <strong class="text-sm font-semibold text-gray-900">Notes:</strong>
              <p class="text-xs italic text-gray-600 mt-1">"${issue.notes}"</p>
            </div>
            `
                : ""
            }
      </div>
    `;
    });

    // 3. HTML content ko close karenge
    htmlContent += `
        </div>
      </body>
    </html>
  `;

    // 4. Nayi window kholkar print dialog trigger karenge
    const printWindow = window.open("", "_blank");
    if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        // Thoda delay denge taaki content load ho sake
        setTimeout(() => {
            printWindow.focus(); // Focus zaroori hai kuch browsers ke liye
            printWindow.print();
        }, 1000); // 1 second delay
    } else {
        // Agar pop-up blocker ne rok diya
        alert("Could not open print window. Please disable pop-up blockers for this site.");
    }
};
// --- END NAYA PDF PRINT FUNCTION ---

const AnalysisNotes: React.FC<AnalysisNotesProps> = ({ issues }) => {
    if (!issues || issues.length === 0) {
        return (
            <div className="p-4 rounded-lg border bg-gray-100/50 border-gray-300/50">
                <p className="text-gray-600">No issues were found in this drawing.</p>
            </div>
        );
    }

    return (
        // --- WRAPPER ADD KIYA ---
        <div>
            {/* --- DOWNLOAD BUTTON UPDATE KIYA --- */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => handlePrintPdf(issues)} // Function call change kiya
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors shadow-md"
                >
                    <Download size={16} />
                    Save Report as PDF {/* Text change kiya */}
                </button>
            </div>

            <div className="space-y-4">
                {issues.map((issue) => {
                    const styles = getStyles(issue.severity);

                    return (
                        <div
                            key={issue.id}
                            className={`p-4 rounded-lg border ${styles.bg} ${styles.border}`}
                        >
                            {/* Header: ID aur Severity Badge */}
                            <div className="flex justify-between items-center mb-2">
                                <h4 className={`font-bold text-base ${styles.title}`}>
                                    Issue #{issue.id}
                                </h4>
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${styles.bg.replace(
                                        "/50",
                                        ""
                                    )} ${styles.text}`}
                                >
                                    {issue.severity}
                                </span>
                            </div>

                            {/* Main Info: Description aur Recommendation */}
                            <p className="mt-1 text-sm text-gray-800">
                                <strong className="font-semibold text-gray-900">
                                    Description:
                                </strong>{" "}
                                {issue.description}
                            </p>
                            <p className="mt-2 text-sm text-green-700">
                                <strong className="font-semibold text-green-800">
                                    Recommendation:
                                </strong>{" "}
                                {issue.suggested_fix}
                            </p>

                            {/* Divider */}
                            <hr className={`my-3 ${styles.border.replace("/50", "/80")}`} />

                            {/* Details Grid: Impact, Page, Confidence */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <p className="text-gray-700">
                                    <strong className="font-semibold text-gray-900">
                                        Impact:
                                    </strong>{" "}
                                    {issue.impact}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="font-semibold text-gray-900">Page:</strong>{" "}
                                    {issue.page_number}
                                </p>
                                <p className="text-gray-700">
                                    <strong className="font-semibold text-gray-900">
                                        Confidence:
                                    </strong>{" "}
                                    {issue.confidence?.toFixed(0)}%
                                </p>
                            </div>

                            {/* Detected Features (agar available hai) */}
                            {issue.detected_features &&
                                issue.detected_features.length > 0 && (
                                    <div className="mt-3">
                                        <strong className="text-sm font-semibold text-gray-900">
                                            Detected Features:
                                        </strong>
                                        <ul className="list-disc list-inside pl-2 mt-1 text-xs text-gray-600 space-y-1">
                                            {issue.detected_features.map((feature, idx) => (
                                                <li key={idx}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                            {/* Notes (agar available hai) */}
                            {issue.notes && (
                                <div className="mt-3">
                                    <strong className="text-sm font-semibold text-gray-900">
                                        Notes:
                                    </strong>
                                    <p className="text-xs italic text-gray-600 mt-1">
                                        "{issue.notes}"
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnalysisNotes;


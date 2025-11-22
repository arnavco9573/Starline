import { AnalysisIssue, Mode } from "@/types/workspace";
import axios from "axios";

export async function saveProject(
  projectName: string,
  data: Record<string, string>
): Promise<any> {
  const backendUrl = process.env.NEXT_PUBLIC_AI_CODE_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("Code backend URL is not configured.");
  }

  try {
    const response = await axios.post(`${backendUrl}/save_project`, {
      project_name: projectName,
      data: data,
    });
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to save the project.";
    throw new Error(message);
  }
}

export interface WorkspaceAnalysisResponse {
  issues: AnalysisIssue[];
  outputPdfUrl: string | null;
  shouldRevokeOutputUrl?: boolean;
  reportUrl?: string | null;
  riskScore?: number | null;
  rawAnalysisData?: any; // To hold the JSON for the report generator
}

export interface AnalyzeWorkspaceParams {
  pdf_file: File;
  mode: Mode;
  degree: number;
  accessToken: string; // This is the Dropbox token
  projectName?: string;
  questionnaire?: string[];
  agentKey?: string | null;
}

// Function to generate the report (for Issue 3)
export async function generateReport(
  analysisData: any,
  accessToken: string
): Promise<{ reportUrl: string | null; base64Pdf: string | null }> {
  // <-- CHANGED
  const codeBackendUrl = process.env.NEXT_PUBLIC_AI_CODE_BACKEND_URL;
  if (!codeBackendUrl) {
    throw new Error("Code backend URL is not configured.");
  }

  try {
    const reportResponse = await axios.post(
      `${codeBackendUrl}/generate-report-dropbox`,
      {
        data: analysisData,
        access_token: accessToken,
      }
    );
    const reportData = reportResponse.data;

    // --- 2. RETURN BOTH VALUES ---
    return {
      reportUrl: reportData.dropbox_url ?? null, // <-- Use dropbox_url
      base64Pdf: reportData.base64_pdf ?? null, // <-- Add base64_pdf
    };
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed during report generation step (/generate-report-dropbox).";
    throw new Error(message);
  }
}

// Helper function to create a Base64 URL
function createObjectUrlFromBase64(base64?: string | null): string | null {
  if (!base64 || typeof base64 !== "string") {
    return null;
  }
  try {
    return `data:application/pdf;base64,${base64}`;
  } catch (error) {
    console.error("Failed to create PDF object URL from base64", error);
    return null;
  }
}

export async function analyzeWorkspace({
  pdf_file,
  mode,
  degree,
  accessToken,
  projectName,
  questionnaire,
  agentKey,
}: AnalyzeWorkspaceParams): Promise<WorkspaceAnalysisResponse> {
  // ---
  // --- "Code Mode" Flow ---
  // ---
  if (mode === "code") {
    const codeBackendUrl = process.env.NEXT_PUBLIC_AI_CODE_BACKEND_URL;
    if (!codeBackendUrl) {
      throw new Error("Code backend URL is not configured.");
    }
    if (!projectName) {
      throw new Error("Project name is required for code analysis.");
    }
    if (!agentKey) {
      throw new Error("Agent key is required for code analysis.");
    }

    const analyzeFormData = new FormData();
    analyzeFormData.append("pdf_file", pdf_file); // Assuming 'pdf'
    analyzeFormData.append("project_name", projectName);
    analyzeFormData.append("agent_key", agentKey);

    let analyzeResponse;
    try {
      analyzeResponse = await axios.post(
        `${codeBackendUrl}/analyze`,
        analyzeFormData
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed during analysis step (/analyze).";
      throw new Error(message);
    }

    const analysisData = analyzeResponse.data;

    // --- [ISSUE 2 & 3 FIX] ---
    // Parse the issues and score
    const issues = normalizeIssues(analysisData?.analysis_summary);
    const riskScore =
      parseFloat(analysisData?.analysis_summary?.compliance_score) || 0;

    return {
      issues,
      riskScore,
      outputPdfUrl: null,
      reportUrl: null,
      rawAnalysisData: analysisData,
    };
  } else {
    // ---
    // --- "Base" & "Plus" Mode Flow ---
    // ---
    const formData = new FormData();
    formData.append("pdf_file", pdf_file);
    formData.append("mode", mode);
    formData.append("access_token", accessToken);

    if (mode === "base") {
      formData.append("degree", String(degree));
    }

    const backendUrl =
      mode === "plus"
        ? process.env.NEXT_PUBLIC_AI_PLUS_BACKEND_URL
        : process.env.NEXT_PUBLIC_AI_BASE_BACKEND_URL;

    try {
      const response = await axios.post(`${backendUrl}/process-pdf`, formData);
      const data = response.data ?? {};
      const outputPdfUrl = createObjectUrlFromBase64(data.marked_pdf_base64);

      // --- [ISSUE 2 FIX] ---
      const issues = normalizeIssues(data.json_result);

      return {
        issues,
        outputPdfUrl,
        shouldRevokeOutputUrl: false,
        reportUrl: null,
        riskScore: null,
      };
    } catch (error: any) {
      const message =
        error?.response?.data?.detail?.[0]?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to analyze the document.";
      throw new Error(message);
    }
  }
}

// --- [ISSUE 2 FIX] ---
// This function now correctly maps severities for your Hindi AnalysisNotes component
function normalizeIssues(analysisData: any): AnalysisIssue[] {
  if (typeof analysisData !== "object" || analysisData === null) {
    return [];
  }

  // --- Naya "code" mode format (analysis_summary) ---
  if (analysisData.compliant || analysisData.non_compliant) {
    const compliantIssues = (analysisData.compliant || []).map(
      (item: any): AnalysisIssue => ({
        id: item.id || `c-${Math.random()}`,
        description: item.item || "Compliant item",
        severity: "Minor", // Maps to "Minor"
        notes: item.clause_ref || "N/A",
        suggested_fix: item.description || "N/A",
        page_number: 1,
        impact: "N/A",
        confidence: 100,
        detected_features: [],
        location: undefined,
      })
    );

    const nonCompliantIssues = (analysisData.non_compliant || []).map(
      (item: any): AnalysisIssue => ({
        id: item.id || `nc-${Math.random()}`,
        description: item.item || "Non-compliant item",
        severity: "Critical", // Maps to "Critical"
        notes: item.clause_ref || "N/A",
        suggested_fix: item.description || "See description.",
        page_number: 1,
        impact: "N/A",
        confidence: 100,
        detected_features: [],
        location: undefined,
      })
    );
    return [...nonCompliantIssues, ...compliantIssues];
  }

  // --- Purana "base/plus" mode format (json_result) ---
  if (Array.isArray(analysisData.issues)) {
    return (analysisData.issues as any[]).map((issue, index) => {
      const obj = issue as Partial<AnalysisIssue> & Record<string, unknown>;
      let severity = String(obj.severity ?? "Unknown");

      // Map severities to match your component
      if (severity === "Medium") severity = "Important";
      if (severity === "High") severity = "Critical";
      // "Minor" already matches

      return {
        id: obj.id || index + 1,
        description: String(obj.description ?? ""),
        severity: severity, // Use the mapped severity
        page_number: Number(obj.page_number) || 1,
        impact: String(obj.impact ?? "N/A"),
        suggested_fix: String(obj.suggested_fix ?? "No recommendation."),
        confidence: Number(obj.confidence) || 0,
        notes: String(obj.notes ?? ""),
        detected_features: (obj.detected_features as string[]) || [],
        location: obj.location as AnalysisIssue["location"],
      };
    });
  }

  // Fallback
  return [];
}

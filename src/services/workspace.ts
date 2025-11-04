import { AnalysisIssue, Mode } from "@/types/workspace";
import axios from "axios";

export interface WorkspaceAnalysisResponse {
  issues: AnalysisIssue[];
  outputPdfUrl: string | null;
  shouldRevokeOutputUrl?: boolean;
  reportUrl?: string | null;
  riskScore?: number | null;
}

interface AnalyzeWorkspaceParams {
  pdf_file: File;
  mode: Mode;
  degree: number;
  accessToken: string;
  projectName?: string;
  questionnaire?: string[];
}

// Helper function to create a Base64 URL
function createObjectUrlFromBase64(base64?: string | null): string | null {
  if (!base64 || typeof base64 !== "string") {
    return null;
  }
  try {
    // Add the data URL prefix
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
}: AnalyzeWorkspaceParams): Promise<WorkspaceAnalysisResponse> {
  const formData = new FormData();
  formData.append("pdf_file", pdf_file);
  formData.append("mode", mode);
  formData.append("access_token", accessToken);

  if (mode === "base" || mode === "plus") {
    formData.append("degree", String(degree));
  }

  if (projectName) {
    formData.append("project_name", projectName);
  }

  if (questionnaire && questionnaire.length > 0) {
    formData.append("questionnaire", JSON.stringify(questionnaire));
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AI_BACKEND_URL}/process-pdf`,
      formData
    );

    const data = response.data ?? {};

    // 1. Get the marked PDF Base64 data
    const pdfBase64 = data.marked_pdf_base64;
    if (!pdfBase64) {
      throw new Error("API response did not contain marked_pdf_base64 data.");
    }
    const outputPdfUrl = createObjectUrlFromBase64(pdfBase64);

    // 2. Get the issues directly from the response
    // The normalizeIssues function now handles the new structure
    const issues = normalizeIssues(data.json_result?.issues || []);
    if (issues.length === 0) {
      console.warn("No issues were returned from the API.");
    }

    // 3. Return the data structure
    return {
      issues,
      outputPdfUrl: outputPdfUrl, // Send the Base64 data URL
      shouldRevokeOutputUrl: false, // We don't need to revoke this
      reportUrl: data.reportUrl ?? data.report_url ?? null,
      riskScore:
        typeof data.riskScore === "number"
          ? data.riskScore
          : typeof data.risk_score === "number"
          ? data.risk_score
          : null,
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

// --- UPDATED FUNCTION ---
// This function now maps all the new fields from your API response
// to match the AnalysisIssue interface in AnalysisNotes.tsx
function normalizeIssues(rawIssues: unknown): AnalysisIssue[] {
  if (!Array.isArray(rawIssues)) {
    return [];
  }

  return rawIssues.map((issue, index) => {
    if (typeof issue === "object" && issue !== null) {
      const obj = issue as Partial<AnalysisIssue> & Record<string, unknown>;

      // Map new fields
      return {
        id: obj.id || index + 1,
        description: String(obj.description ?? ""),
        severity: String(obj.severity ?? "Minor"),
        page_number: Number(obj.page_number) || 1,
        impact: String(obj.impact ?? "N/A"),
        suggested_fix: String(obj.suggested_fix ?? "No recommendation."),
        confidence: Number(obj.confidence) || 0,
        notes: String(obj.notes ?? ""),
        detected_features: (obj.detected_features as string[]) || [],
        location: obj.location as AnalysisIssue["location"], // Assumes location is correct
      };
    }

    // Fallback for unexpected data format
    return {
      id: index + 1,
      description: String(issue ?? ""),
      recommendation: "",
      confidence: 0,
      location: undefined,
      severity: "Unknown",
      page_number: 1,
      impact: "Unknown",
      suggested_fix: "N/A",
    };
  });
}

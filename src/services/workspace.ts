import { AnalysisIssue, Mode } from "@/types/workspace";
import axios from "axios";

export interface WorkspaceAnalysisResponse {
  issues: AnalysisIssue[];
  outputPdfUrl: string | null;
  shouldRevokeOutputUrl?: boolean;
  reportUrl?: string | null;
  riskScore?: number | null;
}

export interface AnalyzeWorkspaceParams {
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

  // ✅ Only send degree for base mode
  if (mode === "base") {
    formData.append("degree", String(degree));
  }

  if (projectName) {
    formData.append("project_name", projectName);
  }

  if (questionnaire?.length) {
    formData.append("questionnaire", JSON.stringify(questionnaire));
  }

  // ✅ THREE BACKEND SWITCH
  const backendUrl =
    mode === "plus"
      ? process.env.NEXT_PUBLIC_AI_PLUS_BACKEND_URL
      : mode === "code"
      ? process.env.NEXT_PUBLIC_AI_CODE_BACKEND_URL
      : process.env.NEXT_PUBLIC_AI_BASE_BACKEND_URL;

  try {
    const response = await axios.post(`${backendUrl}/process-pdf`, formData);

    const data = response.data ?? {};

    const outputPdfUrl = createObjectUrlFromBase64(data.marked_pdf_base64);
    const issues = normalizeIssues(data.json_result?.issues || []);

    return {
      issues,
      outputPdfUrl,
      shouldRevokeOutputUrl: false,
      reportUrl: data.reportUrl ?? data.report_url ?? null,
      riskScore: data.riskScore ?? data.risk_score ?? null,
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

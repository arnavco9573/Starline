export interface CheckpointCategory {
  title: string;
  points: string[];
}

export type Mode = "base" | "plus" | "code";
export type ProcessingState =
  | "idle"
  | "processing"
  | "calculating"
  | "complete";

export interface IssueLocation {
  coordinate_system: string;
  dpi: number;
  page_width: number;
  page_height: number;
  bounding_box: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}
export interface AnalysisIssue {
  id: string | number;
  severity: "Important" | "Minor" | "Critical" | string;
  page_number: number;
  description: string;
  impact: string;
  suggested_fix: string; // This was 'recommendation'
  confidence: number; // This is now 0-100
  notes?: string;
  detected_features?: string[];
  location?: IssueLocation;
}
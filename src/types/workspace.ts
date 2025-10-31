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

export interface AnalysisIssue {
  id: number;
  confidence: number;
  description: string;
  location?: number[] | number[][];
  recommendation: string;

}

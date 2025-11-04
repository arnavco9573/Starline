"use client";

import React from "react";
import { Hand, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import TooltipButton from "./TooltipButton";

interface PdfZoomControlsProps {
  isPanning: boolean;
  onTogglePan: () => void;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onResetZoom: () => void;
  zoom: number;
}

const PdfZoomControls: React.FC<PdfZoomControlsProps> = ({
  isPanning,
  onTogglePan,
  onZoomOut,
  onZoomIn,
  onResetZoom,
  zoom,
}) => {
  return (
    <div className="absolute left-6 bottom-6 flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full shadow-lg p-1.5 z-20">
      <TooltipButton
        onClick={onTogglePan}
        tooltipText="Pan"
        icon={<Hand className="w-4 h-4" />}
        className={isPanning ? "bg-blue-500 text-white" : "hover:bg-gray-100"}
      />
      <div className="w-px h-5 bg-gray-200 mx-1"></div>
      <TooltipButton
        onClick={onZoomOut}
        tooltipText="Zoom Out"
        icon={<ZoomOut className="w-5 h-5" />}
        className="hover:bg-gray-100"
      />
      <div
        className="w-16 text-center cursor-pointer"
        onClick={onResetZoom}
      >
        <span className="text-sm font-semibold text-gray-700">{zoom}%</span>
      </div>
      <TooltipButton
        onClick={onZoomIn}
        tooltipText="Zoom In"
        icon={<ZoomIn className="w-5 h-5" />}
        className="hover:bg-gray-100"
      />
      <div className="w-px h-5 bg-gray-200 mx-1"></div>
      <TooltipButton
        onClick={onResetZoom}
        tooltipText="Fit to Screen"
        icon={<Maximize2 className="w-4 h-4" />}
        className="hover:bg-gray-100"
      />
    </div>
  );
};

export default PdfZoomControls;

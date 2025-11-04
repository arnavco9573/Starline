"use client";

import React from "react";
import { CheckpointCategory, Mode } from "@/types/workspace";
import { checkpoints } from "@/lib/constants";

interface CheckpointListProps {
  activeMode: Mode | null;
  flatCheckpoints: string[];
  processedCheckpoints: number;
  currentProcessingIndex: number;
  checkpointRefs: React.RefObject<(HTMLLIElement | null)[]>;
}

const CheckpointList: React.FC<CheckpointListProps> = ({
  activeMode,
  flatCheckpoints,
  processedCheckpoints,
  currentProcessingIndex,
  checkpointRefs,
}) => {
  if (!activeMode || !flatCheckpoints.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>Select a mode to view checkpoints</p>
      </div>
    );
  }

  let cumulativePoints = 0;
  return (
    <div className="space-y-2 relative ml-4 scrollbar-hide">
      {checkpoints[activeMode].map((category: CheckpointCategory) => {
        const sectionStartIndex = cumulativePoints;
        cumulativePoints += category.points.length;

        return (
          <div key={category.title} className="relative scrollbar-hide">
            <h3 className="font-semibold text-base mb-2 text-gray-900 bg-gray-50/80 backdrop-blur-sm sticky top-0 z-20 py-2 px-1 border-b border-gray-200">
              {category.title}
            </h3>

            <ul className="space-y-1 relative">
              {category.points.map((point, index) => {
                const pointIndex = sectionStartIndex + index;
                const isProcessed = pointIndex < processedCheckpoints;
                const isCurrentlyProcessing =
                  pointIndex === currentProcessingIndex;

                return (
                  <li
                    key={point}
                    ref={(el) => {
                      if (checkpointRefs.current) {
                        checkpointRefs.current[pointIndex] = el;
                      }
                      if (isCurrentlyProcessing && el) {
                        setTimeout(() => {
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "nearest",
                          });
                        }, 100);
                      }
                    }}
                    className={`relative transition-all duration-500 ease-in-out transform flex items-center p-1 rounded-md ${
                      isCurrentlyProcessing
                        ? "text-green-800 font-semibold scale-[1.02]"
                        : isProcessed
                        ? "text-gray-700 opacity-90"
                        : "text-gray-400 opacity-50 translate-y-1"
                    }`}
                  >
                    <span className="flex-1 leading-relaxed text-sm">
                      {point}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CheckpointList;

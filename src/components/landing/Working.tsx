"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// --- Data for your carousel cards ---
const professionalCards = [
  {
    id: 1,
    title: "INTERIOR DESIGNER",
    imageUrl: "/interior_designer1.jpg", // Replace with your actual image paths
    description: "Fast checks for complex drawings.",
  },
  {
    id: 2,
    title: "ENGINEERS",
    imageUrl: "/Architect.jpg", // Replace with your actual image paths
    description: "Structural & regulatory validation.",
  },
  {
    id: 3,
    title: "ARCHITECTS",
    imageUrl: "/engineer.jpg", // Replace with your actual image paths
    description: "Compliant designs, first time.",
  },
  {
    id: 4, // Added for demonstration
    title: "CONSULTANTS",
    imageUrl: "/Business.jpg", // Replace with your actual image paths
    description: "Save time on reviews.",
  },
  {
    id: 5, // Added for demonstration
    title: "DEVELOPERS AND AUTHORITIES",
    imageUrl: "/Authority.jpg", // Replace with your actual image paths
    description: "Faster approvals with verified data.",
  },
];

// --- Custom Hook for Window Size (for responsiveness) ---
const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
};

export default function WhoStarLineIsFor() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const { width } = useWindowSize();

  const extendedCards = [
    ...professionalCards,
    ...professionalCards,
    ...professionalCards,
  ];

  const getSlidesToShow = useCallback(() => {
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }, [width]);

  const slidesToShow = getSlidesToShow();
  const cardWidth = 100 / slidesToShow;
  const totalOriginalWidth = professionalCards.length * cardWidth;

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number;
    const scrollSpeed = 0.005; // Adjust this value for speed

    const animateScroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;

      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      setCurrentOffset((prevOffset) => {
        let newOffset = prevOffset + scrollSpeed * deltaTime;
        if (newOffset >= totalOriginalWidth) {
          // Reset smoothly by subtracting the length of one full set
          newOffset -= totalOriginalWidth;
        }
        return newOffset;
      });

      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalOriginalWidth]);

  const getTransformValue = () => {
    return `translateX(-${currentOffset}%)`;
  };

  return (
    <section className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-12 ml-6">
          Who <span className="font-bold"> StarLine</span> Is For
        </h2>

        {/* --- Carousel Container with Gradient Fade --- */}
        <div className="overflow-hidden max-w-7xl mx-auto relative">
          {" "}
          {/* <-- 1. ADDED `relative` */}
          <div
            className="flex"
            style={{
              transform: getTransformValue(),
            }}
          >
            {/* --- Render extended cards for seamless looping --- */}
            {extendedCards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="px-3 flex-shrink-0"
                style={{
                  width: `${cardWidth}%`,
                }}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden relative group">
                  <div className="relative w-full h-80 lg:h-[28rem]">
                    <Image
                      src={card.imageUrl}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <h3 className="absolute top-4 left-4 text-white text-base font-extrabold tracking-wider px-2 py-1 rounded">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-700 text-sm">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* --- 2. ADDED GRADIENT OVERLAYS --- */}
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}

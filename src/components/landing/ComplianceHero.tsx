"use client"
import React from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ComplianceHero() {
  const handleWatchDemo = () => {
    const videoSection = document.getElementById("video-demo-section");
    videoSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="py-1 md:py-16 bg-white">
      {/* Ensure white background */}
      {/* Hero Section */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Standard container padding */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Increased gap on large screens */}
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Center text on mobile */}
            <h1 className="text-3xl md:text-4xl lg:text-4xl text-gray-900 leading-tight">
              {/* Responsive text size */}
              Ensures Every <br className="hidden sm:inline" />
              {/* Optional line break */}
              <span className="font-bold">Drawing Complies</span> with{" "}
              <br className="hidden sm:inline" />
              Indian Building Regulations
            </h1>
          </div>
          {/* Right Content */}
          <div className="space-y-6">
            <div className="rounded-2xl">
              <p className="text-gray-700 leading-relaxed text-center lg:text-left">
                {/* Center text on mobile */}
                In the world of architecture and construction, a single line on
                a drawing can define the safety, function, and legality of a
                building. Yet, one small error — A wrong dimension, a misplaced
                door, or a code violation — can lead to project delays,
                re-approvals, and even complete rework.
              </p>
            </div>
            {/* Align button center on mobile, end on large */}
            <div className="flex justify-center lg:justify-end">
              <button onClick={handleWatchDemo} className="bg-black hover:bg-gray-800 text-white rounded-full font-semibold text-sm transition-all transform hover:scale-105 shadow-lg flex items-center px-4 py-2 gap-2">
                Watch Demo
                <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#ebfbff] bg-dotted-pattern [background-size:1rem_1rem] mt-16 lg:mt-24 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side: Icons */}
            {/* Reduced icon size and gap for mobile */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 order-2 md:order-1">
              <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center rounded-full bg-white shadow-md">
                  {/* Added shadow */}
                  <Image
                    src={"/architect.png"}
                    width={60} // Adjusted size
                    height={60} // Adjusted size
                    alt="Manual drawing checks"
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain" // Responsive size with object-contain
                  />
                </div>
                <p className="text-gray-600 font-medium text-xs sm:text-sm">
                  {/* Responsive text size */}
                  Manual drawing checks
                  <br />
                  before approval
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center rounded-full bg-white shadow-md">
                  <Image
                    src={"/catalogue.png"}
                    width={60}
                    height={60}
                    alt="Building codes"
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                  />
                </div>
                <p className="text-gray-600 font-medium text-xs sm:text-sm">
                  Constantly changing
                  <br />
                  building codes.
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center rounded-full bg-white shadow-md">
                  <Image
                    src={"/approved.png"}
                    width={60}
                    height={60}
                    alt="Revisions and re-approvals"
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                  />
                </div>
                <p className="text-gray-600 font-medium text-xs sm:text-sm">
                  Delays from revisions
                  <br />
                  and re-approvals.
                </p>
              </div>
            </div>

            {/* Right side: Problem Statement */}
            <div className="space-y-2 relative text-center md:text-left order-1 md:order-2">
              {/* Center text on mobile */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-gray-900">
                {/* Responsive text size */}
                Construction <span className="font-bold">moves slowly.</span>
                <br />
                What makes it slower?
              </h2>
              {/* Optional: Hide or adjust highlighter on mobile */}
              <span
                className="hidden md:block absolute top-[62%] -right-4 h-8 w-40 bg-[#e5f5f9] -z-1"
                style={{ transform: "translateY(-50%)" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

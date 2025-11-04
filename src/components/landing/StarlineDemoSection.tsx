"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/app/Providers";

export default function StarlineDemoSection() {
  const { openWishlist } = useModal();
  return (
    <section className="bg-neutral-900 text-white py-16 md:py-24 md:mt-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center lg:justify-between">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin leading-tight mb-4">
            See the{" "}
            <span className="text-[#cef2fb] font-semibold">StarLine AI</span>{" "}
            platform in action
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8">
            Get a demo and discover how go-to-market teams use StarLine AI to
            supercharge their revenue engine and achieve full GTM Velocity.
          </p>
          <button
            onClick={openWishlist}
            className="inline-flex items-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Get a demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Geometric Shapes (Right Side) - Hidden on mobile and tablet */}
        <div className="hidden lg:flex lg:w-1/2 relative h-64 lg:h-80 items-center justify-center">
          {/* Main large cube outlines */}
          <div className="absolute w-64 h-64 border border-blue-500/30 rotate-12 -right-16 top-0 lg:-right-4 lg:top-10 scale-125 origin-center"></div>
          <div className="absolute w-48 h-48 border border-blue-500/20 -right-4 -bottom-8 lg:right-20 lg:-bottom-20 rotate-45 scale-150 origin-center"></div>

          {/* Smaller overlapping lines */}
          <div className="absolute w-32 h-32 border border-gray-600/50 -left-12 top-20 rotate-6"></div>
          <div className="absolute w-24 h-24 border border-gray-700/50 -right-24 bottom-10 -rotate-12"></div>
          <div className="absolute w-40 h-40 border border-purple-500/10 right-10 top-20 rotate-24"></div>
        </div>
      </div>

      {/* Background large overlapping shapes (subtle) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-40 border border-gray-700/30 rotate-45 -ml-20"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-60 h-60 border border-gray-800/20 -rotate-30 -mr-32"></div>
      </div>
    </section>
  );
}

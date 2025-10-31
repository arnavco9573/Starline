"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HowItWorks() {
  const [inView, setInView] = useState(false); // New state to track if component is in view
  const [videoLoaded, setVideoLoaded] = useState(false); // New state to control when video loads
  const videoSectionRef = useRef<HTMLDivElement>(null); // Ref for the section to observe

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true); // Component is now in view
          // Start a short delay before loading the video to allow thumbnail to fade
          setTimeout(() => {
            setVideoLoaded(true); // Now load the video
          }, 300); // 300ms delay, matches transition duration for smoother fade
        } else if (!entry.isIntersecting && inView) {
          // Optional: if you want to pause/reset when it scrolls out of view
          // setInView(false);
          // setVideoLoaded(false);
        }
      },
      // --- MODIFICATION HERE ---
      { threshold: 0.6 } // 60% of the way down the page
    );

    const currentVideoSectionRef = videoSectionRef.current;

    if (currentVideoSectionRef) {
      observer.observe(currentVideoSectionRef);
    }

    return () => {
      if (currentVideoSectionRef) {
        observer.unobserve(currentVideoSectionRef);
      }
    };
  }, [inView]); // Dependency array

  const vimeoVideoId = "1128796604";

  // Note: These parameters (byline, title, portrait) only work with Vimeo paid plans.
  // With a free plan, the Vimeo logo and basic controls will still be visible.
  const embedUrl = `https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1&muted=1&dnt=1&byline=0&title=0&portrait=0`;

  // The iframe src is only set when videoLoaded is true, after the thumbnail fade delay
  const iframeSrc = videoLoaded ? embedUrl : undefined;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* ## Heading Section ## */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See StarLine AI in action. Our platform simplifies the entire
            process, from upload to compliance, in just a few clicks.
          </p>
        </div>

        {/* ## Video Player Section ## */}
        <div
          id="video-demo-section"
          className="mt-12 max-w-5xl mx-auto"
          ref={videoSectionRef}
        >
          <div className="relative group aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-900">
            {/* Your thumbnail component */}
            {/* It will be visible until videoLoaded is true */}
            <Image
              src="/Demo.jpeg"
              alt="StarLine AI Demo Thumbnail"
              fill
              // This fades out the thumbnail when the video loads, with a 300ms transition
              className={`object-cover transition-opacity duration-300 ${
                videoLoaded ? "opacity-0" : "opacity-100"
              }`}
              priority
            />

            {/* Vimeo iframe player */}
            {/* It will only render its `src` when videoLoaded is true, allowing the thumbnail to fade first */}
            <iframe
              src={iframeSrc}
              title="StarLine AI Demo"
              // Only apply `pointer-events-none` if you want to completely block interaction until videoLoaded
              // You probably want to let users click it even if it's fading out
              className={`w-full h-full border-0 absolute inset-0 ${
                videoLoaded ? "" : "pointer-events-none" // Prevents clicks on the hidden iframe
              }`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

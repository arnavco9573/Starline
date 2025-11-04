"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface StatItem {
  value: string;
  description: string;
}

interface StatsData {
  top: StatItem;
  left: StatItem;
  right: StatItem;
}

const statsData: StatsData = {
  top: {
    value: "6+ hours",
    description:
      "Is what Indian architects & designers spend checking one complete drawing set.",
  },
  left: {
    value: "72%",
    description:
      "Of architects say the approval process is delayed due to manual drawing corrections.",
  },
  right: {
    value: "1 in 4",
    description:
      "projects faces rework because of dimension or code errors found late.",
  },
};

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    top: "0",
    left: "0%",
    right: "0 in 0",
  });

  const headingRef = useRef(null);
  const statsRef = useRef(null);

  // Function to animate numbers
  const animateNumber = (
    start: number,
    end: number,
    duration: number,
    setValue: (value: string) => void,
    suffix: string = ""
  ) => {
    const startTime = performance.now();

    const updateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValue = start + (end - start) * easeOutQuart;

      if (suffix === "%") {
        setValue(`${Math.round(currentValue)}${suffix}`);
      } else if (suffix === " in 4") {
        setValue(`1 in ${Math.round(currentValue)}`);
      } else if (suffix === "+ hours") {
        setValue(`${Math.round(currentValue)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };

    requestAnimationFrame(updateNumber);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            // Start number animations when stats come into view
            setTimeout(() => {
              // Animate top value (6+ hours)
              animateNumber(
                0,
                6,
                2000,
                (value) => {
                  setAnimatedValues((prev) => ({ ...prev, top: value }));
                },
                "+ hours"
              );

              // Animate left value (72%)
              animateNumber(
                0,
                72,
                2000,
                (value) => {
                  setAnimatedValues((prev) => ({ ...prev, left: value }));
                },
                "%"
              );

              // Animate right value (1 in 4)
              animateNumber(
                0,
                4,
                2000,
                (value) => {
                  setAnimatedValues((prev) => ({ ...prev, right: value }));
                },
                " in 4"
              );
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 md:py-8 overflow-hidden bg-white">
      {/* Adjusted padding */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Standard padding */}
        {/* Main container for the image and stats */}
        <div
          ref={statsRef}
          // Adjusted aspect ratio and max-width for better responsiveness
          className="relative flex items-center justify-center w-full max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto aspect-[4/3] md:aspect-[4/2.5]"
        >
          {/* Central image - Responsive width */}
          <div className="relative w-[45%] md:w-[50%] lg:w-[45%] aspect-square">
            {/* Control image size relative to parent */}
            <Image
              src="/HOUSENUMBER.jpg"
              alt="Building with connected figures illustrating construction delays"
              fill // Use fill to make it responsive within the container
              style={{ objectFit: "contain" }}
              className="z-0"
              sizes="(max-width: 640px) 60vw, (max-width: 768px) 60vw, (max-width: 1024px) 50vw, 45vw" // Provide sizes hint
            />
          </div>

          {/* --- DOTTED LINES (Responsive) --- */}
          {/* Line for Top Stat */}
          <div
            className="absolute left-[49%] h-16 w-[1px] border-l-2 border-dotted border-gray-400 z-10
                          sm:h-12 top-[8%]
                          md:h-16 md:top-[15.25%] md:left-[50%]
                          lg:h-20" /* ADJUST FOR MOBILE/DESKTOP */
          ></div>

          {/* Lines for Left Stat */}
          <div
            className="absolute w-8 h-[1px] border-t-2 border-dotted border-gray-400 z-10
                          top-[60%] left-[24%]
                          md:w-56 md:top-[62%] md:left-[14%]
                          " /* ADJUST FOR MOBILE/DESKTOP */
          ></div>
          <div
            className="absolute top-[48%] left-[23%] h-8 w-12 border-l-2 border-dotted border-gray-400 -rotate-12 z-10
                          md:h-24 md:top-[48.25%] md:left-[13%]
                          " /* ADJUST FOR MOBILE/DESKTOP */
          ></div>

          {/* Lines for Right Stat */}
          <div
            className="absolute top-[42%] right-[25%] w-8 h-[1px] border-t-2 border-dotted border-gray-400 z-10
                          md:w-36 md:top-[45%] md:right-[22.55%]
                          " /* ADJUST FOR MOBILE/DESKTOP */
          ></div>
          <div
            className="absolute top-[41%] right-[22%] h-8 w-[1px] border-l-2 border-dotted border-gray-400 -rotate-38 z-10
                          md:h-32 md:top-[43.25%] md:right-[19%]
                          " /* ADJUST FOR MOBILE/DESKTOP */
          ></div>
          {/* --- DOTTED LINES END --- */}

          {/* --- Stat Text Blocks (Responsive Positioning and Size) --- */}
          {/* Top Stat */}
          <div
            className="absolute -top-[20%] left-1/2 -translate-x-1/2 text-center w-36 sm:w-48 z-10
                          md:-top-[1%] md:w-56" /* ADJUST FOR MOBILE/DESKTOP */
          >
            <h3 className="text-xl sm:text-2xl md:text-5xl font-bold text-gray-900">
              {animatedValues.top}
            </h3>
            <p className="mt-1 text-[10px] sm:text-xs md:text-sm text-gray-600">
              {statsData.top.description}
            </p>
          </div>

          {/* Left Stat */}
          <div
            className="absolute top-[14%] -left-[4%] text-center w-32 sm:w-40 z-10
                          md:top-[30%] md:-left-[2%] md:w-48 lg:w-56" /* ADJUST FOR MOBILE/DESKTOP */
          >
            <h3 className="text-xl sm:text-2xl md:text-6xl font-bold text-center text-gray-900">
              {animatedValues.left}
            </h3>
            <p className="mt-1 text-[10px] sm:text-xs md:text-sm text-gray-600 text-center">
              {statsData.left.description}
            </p>
          </div>

          {/* Right Stat */}
          <div
            className="absolute top-[51%] -right-[4%] text-center w-32 sm:w-40 z-10
                          md:top-[60%] md:right-[4%] md:w-48 lg:w-56" /* ADJUST FOR MOBILE/DESKTOP */
          >
            <h3 className="text-xl sm:text-2xl md:text-6xl font-bold text-gray-900">
              {animatedValues.right}
            </h3>
            <p className="mt-1 text-[10px] sm:text-xs md:text-sm text-gray-600">
              {statsData.right.description}
            </p>
          </div>
          {/* --- Stat Text Blocks End --- */}
        </div>
        {/* --- Bottom Section: The Starline Effect benefits (Responsive) --- */}
        <div className="mt-16 md:mt-0">
          <div
            className="text-center md:text-left mb-12 md:mb-16"
            ref={headingRef}
          >
            {/* Center heading on mobile */}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <span className="font-extralight">The </span>Starline Effect —{" "}
              <span className="relative inline-block overflow-hidden">
                <span className="text-gray-700 font-normal relative z-10 px-2">
                  {/* Removed mt */}
                  Real Results. Real Speed
                </span>
                <span
                  className={`absolute inset-0 transition-transform duration-1000 ease-out ${
                    isVisible ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{ backgroundColor: "#e5f5f9" }}
                />
              </span>
            </h2>
          </div>
          {/* Grid stacks to 1 column on mobile, 2 on medium, 4 on large */}
          <div className="grid gap-y-10 gap-x-8 text-center grid-cols-2 lg:grid-cols-4">
            {/* Benefit 1 */}
            <div className="flex flex-col items-center">
              <Image src="/rush.png" alt="Speed icon" width={100} height={50} />{" "}
              {/* Smaller icon */}
              <p className="mt-4 text-base text-black">
                Up to <span className="font-semibold">80%</span> faster <br />
                drawing review
              </p>
            </div>
            {/* Benefit 2 */}
            <div className="flex flex-col items-center">
              <Image
                src="/submission.png"
                alt="Revision icon"
                width={100}
                height={50}
              />
              <p className="mt-4 text-base text-black">
                60% <span className="font-semibold">fewer revisions</span>{" "}
                <br />
                before authority submission
              </p>
            </div>
            {/* Benefit 3 */}
            <div className="flex flex-col items-center">
              <Image
                src="/microchip.png"
                alt="AI icon"
                width={100}
                height={50}
              />
              <p className="mt-4 text-base text-black">
                100% Indian building <br />
                <span className="font-semibold">code awareness</span>-NBC,{" "}
                <br />
                IS, and local bye-laws
              </p>
            </div>
            {/* Benefit 4 */}
            <div className="flex flex-col items-center">
              <Image
                src="/man.png"
                alt="Checking icon"
                width={100}
                height={50}
              />
              <p className="mt-4 text-base text-black">
                <span className="font-semibold">3 levels</span> of checking{" "}
                <br />
                from simple errors to full code validation
              </p>
            </div>
          </div>
        </div>
        {/* --- Bottom Section End --- */}
      </div>
    </section>
  );
};

export default StatsSection;

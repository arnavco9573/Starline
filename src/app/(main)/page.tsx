// Home.tsx
"use client";
import Image from "next/image";
import ComplianceHero from "@/components/landing/ComplianceHero";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import StarlineDemoSection from "@/components/landing/StarlineDemoSection";
import StatsSection from "@/components/landing/StatsSection";
import WhoStarLineIsFor from "@/components/landing/Working";
import { useModal } from "../Providers";
import { useEffect } from "react";

export default function Home() {
  const { openAccessPopup } = useModal();

  useEffect(() => {
  const alreadyClosed = localStorage.getItem("popupClosed");
  if (alreadyClosed) return; // Do not show again

  const timer = setTimeout(() => {
    openAccessPopup();
  }, 3000);

  return () => clearTimeout(timer);
}, [openAccessPopup]);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[75vh] -z-10 opacity-98">
        <Image
          src="/BG-image.svg"
          alt="Background decoration"
          fill
          priority
          quality={75}
          className="object-cover object-left-top"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10">
        <div className="min-h-[70vh] md:min-h-[60vh]">
          <HeroSection />
        </div>
        <ComplianceHero />
        <StatsSection />
        <HowItWorks />
        <WhoStarLineIsFor />
        <StarlineDemoSection />
        {/* DO NOT render AccessPopup here — it's already in Providers */}
      </div>
    </>
  );
}

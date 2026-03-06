"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementsSection from "@/components/AchievementsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import PublicationsSection from "@/components/PublicationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const SplashScreen = dynamic(() => import("@/components/SplashScreen"), { ssr: false });
const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false });

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      {splashDone && <Navigation />}

      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <ExperienceSection />
        <AchievementsSection />
        <SkillsSection />
        <EducationSection />
        <PublicationsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}

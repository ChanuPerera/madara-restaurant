"use client";

import React from "react";
import ModernNavbar from "@/components/modern/ModernNavbar";
import ModernHero from "@/components/modern/ModernHero";
import Catering3DCarousel from "@/components/Catering3DCarousel";
import ModernCateringGrid from "@/components/modern/ModernCateringGrid";
import ModernMenuSection from "@/components/modern/ModernMenuSection";
import ModernFooter from "@/components/modern/ModernFooter";
import MobileActionDock from "@/components/MobileActionDock";

/**
 * ModernThemeHome
 * The clean, light gourmet theme for Madara Restaurant.
 */
export default function ModernThemeHome() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-stone-900 relative w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
      {/* Sleek Floating Capsule Navigation */}
      <ModernNavbar />

      {/* Modern Minimal Hero Section */}
      <ModernHero />

      {/* Showstopper: Interactive 3D Food Carousel */}
      <section id="signatures" className="scroll-mt-20">
        <Catering3DCarousel forceTheme="light" />
      </section>

      {/* 4 Core Catering Pillars (Weddings, Dane, Celebrations, Corporate) */}
      <ModernCateringGrid />

      {/* Culinary Highlights & Menu Explorer */}
      <ModernMenuSection />

      {/* Clean Minimal Footer */}
      <ModernFooter />

      {/* Mobile Sticky Action Dock */}
      <MobileActionDock />
    </main>
  );
}

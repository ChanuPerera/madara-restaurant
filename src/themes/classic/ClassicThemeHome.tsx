"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CateringShowcase from "@/components/CateringShowcase";
import OfferBannerSlider from "@/components/OfferBannerSlider";
import MenuSection from "@/components/MenuSection";
import PartnersSection from "@/components/PartnersSection";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileActionDock from "@/components/MobileActionDock";

/**
 * ClassicThemeHome
 * Exact preserved backup of the original Dark Theme homepage layout.
 */
export default function ClassicThemeHome() {
  return (
    <main className="min-h-screen bg-madara-dark text-white relative w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section: Catering & Event Milestone Highlights */}
      <Hero />

      {/* Flagship Feature: Catering Showcase & Teaser (Side by Side) */}
      <CateringShowcase />

      {/* Interactive Offer Banner Slider */}
      <OfferBannerSlider />

      {/* Food & Beverage Menu (Dine-In, Takeaway, Delivery) */}
      <MenuSection />

      {/* Partners & Venues */}
      <PartnersSection />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Image Gallery */}
      <Gallery />

      {/* Contact & Catering Consultation */}
      <ContactSection />

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Dock (< 768px) */}
      <MobileActionDock />
    </main>
  );
}

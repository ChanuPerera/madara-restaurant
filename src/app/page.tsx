"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CateringMenuExplorer from "@/components/CateringMenuExplorer";
import ServicesGrid from "@/components/ServicesGrid";
import MenuSection from "@/components/MenuSection";
import ActionKitchenSpotlight from "@/components/ActionKitchenSpotlight";
import ByobExperience from "@/components/ByobExperience";
import PartnersSection from "@/components/PartnersSection";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-madara-dark text-white relative w-full max-w-full overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section: Catering & Event Dominance */}
      <Hero />

      {/* Flagship Feature: Catering Packages & Event Menus */}
      <CateringMenuExplorer />

      {/* Food & Beverage Menu (Dine-In, Takeaway, Delivery) */}
      <MenuSection />

      {/* Core Services Breakdown */}
      <ServicesGrid />

      {/* Live Action Kitchens Showcase */}
      <ActionKitchenSpotlight />

      {/* BYOB Experience & Spicy Chaser Bites */}
      <ByobExperience />

      {/* Partners & Venues */}
      <PartnersSection />

      {/* Customer Testimonials & 4.9 Star Ratings */}
      <Testimonials />

      {/* Filterable Image Gallery */}
      <Gallery />

      {/* Contact, Map, Operating Hours (7AM-10PM / Closed Poya) & Inquiries */}
      <ContactSection />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}

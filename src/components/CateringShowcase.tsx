"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  ChefHat, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  Users,
  UtensilsCrossed
} from "lucide-react";

export default function CateringShowcase() {
  const { language, t } = useLanguage();

  const cateringWhatsAppUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hi Madara Restaurant! 🎉 I would like to inquire about your Catering Packages and Menus for an upcoming event."
  )}`;

  return (
    <section id="catering" className="py-20 lg:py-28 relative bg-madara-dark overflow-hidden">
      {/* Background ambient light effects */}
      <div className="ambient-glow w-[550px] h-[550px] bg-madara-orange/8 top-12 left-6" />
      <div className="ambient-glow w-[450px] h-[450px] bg-amber-500/5 bottom-8 right-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Premium Catering Imagery & Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative group">
              {/* Outer decorative ambient glow ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-madara-orange/30 to-red-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-madara-surface shadow-2xl">
                {/* Showcase Image */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85"
                    alt="Madara Catering Menus & Event Buffet Setup"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Dark Vignette / Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Top-Right Floating Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-madara-orange" />
                    <span>650+ Events Catered</span>
                  </div>

                  {/* Top-Left Occasion Types Pill */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-madara-orange to-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Weddings • Dane • Parties
                  </div>

                  {/* Bottom Glass Card Highlight */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-panel border border-white/20 backdrop-blur-lg">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-madara-orange/20 border border-madara-orange/40 flex items-center justify-center text-madara-orange flex-shrink-0">
                          <UtensilsCrossed className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-white">
                            All-Inclusive Buffet Equipment
                          </p>
                          <p className="text-[11px] text-madara-textSecondary">
                            Buffet warmers, tableware & dedicated stewards
                          </p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex text-[11px] font-bold text-madara-orange bg-madara-orange/10 px-2.5 py-1 rounded-lg border border-madara-orange/25">
                        Free Setup
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, Key Inclusions, and CTA Button */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madara-orange/10 border border-madara-orange/30 text-madara-orange text-xs font-bold uppercase tracking-wider shadow-glow-orange-sm">
              <ChefHat className="w-3.5 h-3.5" />
              <span>{t("catering.badge")}</span>
            </div>

            {/* Section Heading */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight leading-tight">
                {t("catering.title")}{" "}
                <span className="text-gradient-orange">{t("catering.titleAccent")}</span>
              </h2>
              <p className="text-sm sm:text-base text-madara-textSecondary leading-relaxed">
                {t("catering.showcaseDesc")}
              </p>
            </div>

            {/* Inclusions / Perks List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-madara-orange flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-200">
                  {t("catering.perk1")}
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-madara-orange flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-200">
                  {t("catering.perk2")}
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-madara-orange flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-200">
                  {t("catering.perk3")}
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-madara-orange flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-200">
                  {t("catering.perk4")}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                href="/catering"
                className="btn-primary px-7 py-4 rounded-xl text-sm sm:text-base font-bold flex items-center gap-2.5 shadow-glow-orange group transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{t("catering.discoverMenuBtn")}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href={cateringWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-6 py-4 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("catering.whatsappInquiry")}</span>
              </a>
            </div>

            {/* Quick Guest Count Callout */}
            <div className="flex items-center gap-2 text-xs text-madara-textMuted pt-1">
              <Users className="w-3.5 h-3.5 text-madara-orange" />
              <span>
                {language === "si" 
                  ? "අවම අමුත්තන් 25 දෙනෙකුගේ සිට 1,000+ දක්වා ඕනෑම උත්සවයක් සඳහා සුදුසුයි"
                  : "Ideal for 25 to 1,000+ guests with custom quote options available"}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

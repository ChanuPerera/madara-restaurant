"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  CATERING_CATEGORIES, 
  CATERING_PACKAGES, 
  RESTAURANT_INFO,
  CateringPackageDetail
} from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ChefHat, 
  Cake, 
  HeartHandshake, 
  Sparkles, 
  SunMedium, 
  Flame, 
  Briefcase, 
  Utensils, 
  Check, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  ArrowRight,
  Users,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function CateringMenuExplorer() {
  const { language, t } = useLanguage();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("birthday");
  const [activePackageIndex, setActivePackageIndex] = useState<number>(0);
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  // Icon mapper helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Cake": return Cake;
      case "HeartHandshake": return HeartHandshake;
      case "SunMedium": return SunMedium;
      case "Flame": return Flame;
      case "Briefcase": return Briefcase;
      case "Utensils": return Utensils;
      default: return Sparkles;
    }
  };

  const currentCategory =
    CATERING_CATEGORIES.find((c) => c.id === selectedCategoryId) ||
    CATERING_CATEGORIES[0];

  const packagesInCurrentCategory = CATERING_PACKAGES.filter(
    (p) => p.categoryId === selectedCategoryId
  );

  // Reset slider index when category changes
  useEffect(() => {
    setActivePackageIndex(0);
    if (sliderContainerRef.current) {
      sliderContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedCategoryId]);

  // Scroll to specific package
  const scrollToPackage = (index: number) => {
    setActivePackageIndex(index);
    if (sliderContainerRef.current) {
      const container = sliderContainerRef.current;
      const cards = container.children;
      if (cards[index]) {
        const card = cards[index] as HTMLElement;
        container.scrollTo({
          left: card.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  const handleNextPackage = () => {
    if (activePackageIndex < packagesInCurrentCategory.length - 1) {
      scrollToPackage(activePackageIndex + 1);
    }
  };

  const handlePrevPackage = () => {
    if (activePackageIndex > 0) {
      scrollToPackage(activePackageIndex - 1);
    }
  };

  // Synchronize active dot on scroll
  const handleScroll = () => {
    if (!sliderContainerRef.current) return;
    const container = sliderContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    let closestIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const cardOffset = card.offsetLeft - container.offsetLeft;
      const diff = Math.abs(scrollLeft - cardOffset);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activePackageIndex) {
      setActivePackageIndex(closestIndex);
    }
  };

  // Helper to generate WhatsApp message for a package
  const generateWhatsAppPackageUrl = (pkg: CateringPackageDetail) => {
    let text = "";
    if (pkg.isCustomizable) {
      text = `Hi Madara Restaurant! 🎉\n\nI would like to inquire about a *Customized Catering Package* for our upcoming event.\n\nPlease share your customized menu builder and discuss available options with our team.\n\nThank you!`;
    } else {
      text = `Hi Madara Restaurant! 🎉\n\nI would like to inquire about your Catering Package:\n- *Occasion / Event:* ${pkg.categoryName}\n- *Selected Package:* ${pkg.packageName}\n- *Price:* ${pkg.priceDisplay}\n- *Min Guests:* ${pkg.minGuests} Pax\n\nPlease let me know availability and customized options for our event dates. Thank you!`;
    }
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const renderCategoryBanner = (cat: typeof CATERING_CATEGORIES[0]) => {
    return (
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-madara-orange/20 border border-madara-orange/30 flex items-center justify-center text-madara-orange flex-shrink-0">
            {React.createElement(getCategoryIcon(cat.icon), { className: "w-6 h-6" })}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
                {language === "si" && cat.sinhalaName ? cat.sinhalaName : cat.name}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-madara-orange/20 text-madara-orange border border-madara-orange/30">
                {cat.badge}
              </span>
            </div>
            <p className="text-sm text-madara-textSecondary mt-1">
              {cat.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20catering%20for%20${encodeURIComponent(cat.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Inquire via WhatsApp</span>
          </a>
        </div>
      </div>
    );
  };

  const renderPackages = (packages: CateringPackageDetail[]) => {
    const hasMultiple = packages.length > 1;
    return (
      <div className="space-y-4">
        {/* Packages Horizontal / Grid Slider Container */}
        <div 
          ref={sliderContainerRef}
          onScroll={handleScroll}
          className={`
            ${hasMultiple 
              ? "flex items-stretch overflow-x-auto snap-x snap-mandatory gap-5 pt-2 pb-4 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-x-visible md:pb-0" 
              : "grid grid-cols-1 pt-2"
            } gap-6
          `}
        >
          {packages.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`glass-panel-orange rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between relative border transition-all duration-300 ${
                pkg.isCustomizable
                  ? "border-madara-orange shadow-glow-orange bg-madara-surfaceElevated"
                  : "border-white/10 hover:border-madara-orange/40"
              } ${
                hasMultiple ? "w-[88vw] xs:w-[340px] sm:w-[380px] md:w-auto flex-shrink-0 snap-start" : "w-full"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-madara-orange to-red-600 text-white text-[11px] font-extrabold px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-wider shadow-md">
                  ⭐ Top Recommended
                </div>
              )}

              {pkg.isCustomizable && (
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-amber-500 to-madara-orange text-black text-[11px] font-extrabold px-3 py-0.5 sm:px-4 sm:py-1 rounded-full uppercase tracking-wider shadow-md">
                  ✨ 100% Tailor-Made Menu
                </div>
              )}

              <div>
                {/* Header: Title, Tagline, Price & Prominent View Full Menu Button */}
                <div className="pb-5 border-b border-white/10 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xl sm:text-2xl font-bold text-white font-serif">
                      {language === "si" && pkg.sinhalaName ? pkg.sinhalaName : pkg.packageName}
                    </h4>

                    <button
                      type="button"
                      onClick={() => setExpandedPackageId(expandedPackageId === pkg.id ? null : pkg.id)}
                      className="px-3 py-1.5 rounded-xl bg-madara-orange/20 hover:bg-madara-orange border border-madara-orange/50 text-madara-orange hover:text-white text-xs font-extrabold transition-all flex-shrink-0 cursor-pointer flex items-center gap-1 shadow-sm"
                    >
                      <span>{expandedPackageId === pkg.id ? "Hide Full Menu ▲" : "View Full Menu ▼"}</span>
                    </button>
                  </div>

                  <div className="inline-block bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10">
                    <span className="text-[10px] text-madara-textMuted uppercase font-bold block">
                      {t("catering.priceLabel")}
                    </span>
                    <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                      <span className={`text-lg sm:text-2xl font-extrabold ${pkg.isCustomizable ? "text-madara-amber" : "text-madara-orange"}`}>
                        {pkg.priceDisplay === "Custom Quote" && language === "si" ? "මිල ගණන් විමසන්න" : pkg.priceDisplay}
                      </span>
                      <span className="text-xs text-madara-textSecondary">
                        ({t("catering.minGuests").replace("{count}", pkg.minGuests.toString())})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="my-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {pkg.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-madara-textSecondary flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-madara-orange flex-shrink-0" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>

                {/* Collapsible Itemized Menu (Displayed when header button is clicked) */}
                {expandedPackageId === pkg.id && (
                  <div className="mt-4 space-y-4 p-4 rounded-2xl bg-black/40 border border-white/10 animate-in fade-in duration-200">
                    {pkg.menuSections.map((sec, secIdx) => (
                      <div key={secIdx} className="space-y-1">
                        <h5 className="text-xs font-bold text-madara-amber uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-madara-orange" />
                          <span>{sec.title}</span>
                        </h5>
                        <ul className="space-y-0.5 pl-3 text-xs text-madara-textSecondary">
                          {sec.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-1.5 leading-relaxed">
                              <span className="text-madara-orange text-[10px] mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Package Action Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-madara-textMuted text-center sm:text-left">
                  <span>Buffet warmers, setup &amp; stewards included.</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={generateWhatsAppPackageUrl(pkg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto btn-whatsapp px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{pkg.isCustomizable ? "Build Custom Menu" : "Book via WhatsApp"}</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* SLICKER PAGINATION DOTS & NAVIGATION CONTROLS */}
        {/* ============================================================ */}
        {hasMultiple && (
          <div className="pt-2 flex items-center justify-between gap-4 border-t border-white/10">
            {/* Package Counter Indicator */}
            <div className="flex items-center gap-2 text-xs text-madara-textMuted">
              <span className="text-white font-semibold">
                Package {activePackageIndex + 1} of {packages.length}
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="hidden sm:inline text-[11px] text-madara-orange truncate max-w-[200px]">
                {packages[activePackageIndex]?.packageName}
              </span>
            </div>

            {/* Slick Interactive Dots */}
            <div className="flex items-center gap-2 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10">
              {packages.map((pkg, idx) => {
                const isActive = idx === activePackageIndex;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => scrollToPackage(idx)}
                    aria-label={`Go to package ${idx + 1}: ${pkg.packageName}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "w-7 sm:w-8 bg-gradient-to-r from-madara-orange to-red-500 shadow-glow-orange"
                        : "w-2 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                );
              })}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevPackage}
                disabled={activePackageIndex === 0}
                aria-label="Previous Package"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                  activePackageIndex === 0
                    ? "border-white/5 text-white/20 cursor-not-allowed bg-black/20"
                    : "border-white/15 text-white hover:bg-madara-orange hover:border-madara-orange cursor-pointer bg-black/50"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextPackage}
                disabled={activePackageIndex === packages.length - 1}
                aria-label="Next Package"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                  activePackageIndex === packages.length - 1
                    ? "border-white/5 text-white/20 cursor-not-allowed bg-black/20"
                    : "border-white/15 text-white hover:bg-madara-orange hover:border-madara-orange cursor-pointer bg-black/50"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    );
  };

  return (
    <section id="catering" className="py-24 relative bg-madara-dark overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow w-[550px] h-[550px] bg-madara-orange/6 top-10 left-10" />
      <div className="ambient-glow w-[450px] h-[450px] bg-amber-500/4 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Mobile Occasion Selector Pills Bar (Visible on mobile/tablet < md) */}
        <div className="md:hidden mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-orange -mx-4 px-4">
            {CATERING_CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.icon);
              const isSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                    isSelected
                      ? "bg-gradient-to-r from-madara-orange to-red-600 text-white shadow-glow-orange scale-102"
                      : "bg-white/5 text-madara-textSecondary hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{language === "si" && cat.sinhalaName ? cat.sinhalaName : cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-black/40 text-white" : "bg-white/10 text-madara-textMuted"}`}>
                    {cat.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Unified Layout (Sidebar on Desktop + Single Content Column for All Viewports) */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8 lg:gap-10">
          {/* Desktop Sidebar Selector */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 space-y-3">
            <span className="text-xs font-bold text-madara-orange uppercase tracking-wider block mb-2 px-1">
              Select Occasion
            </span>
            {CATERING_CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.icon);
              const isSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? "bg-gradient-to-r from-madara-orange/20 to-red-600/10 border-madara-orange shadow-glow-orange-sm"
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? "bg-madara-orange text-white" : "bg-white/5 text-madara-orange border border-white/10"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-white block truncate">
                      {language === "si" && cat.sinhalaName ? cat.sinhalaName : cat.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Single Content Column (Rendered Exactly Once in the DOM) */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9 space-y-8">
            {renderCategoryBanner(currentCategory)}
            {renderPackages(packagesInCurrentCategory)}
          </div>
        </div>

        {/* Global Custom Catering Banner */}
        <div className="mt-16 glass-card rounded-3xl p-6 sm:p-10 border border-madara-orange/30 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-madara-orange flex items-center justify-center text-white shadow-glow-orange flex-shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-white font-serif">
                {t("catering.customBannerTitle")}
              </h4>
              <p className="text-xs sm:text-sm text-madara-textSecondary mt-1">
                {language === "si" ? (
                  <>අපි ඕනෑම අමුත්තන් සංඛ්‍යාවක්, ආහාර රුචිකත්වයක් හෝ තේමාවක් සඳහා ස්ථාවර මිලකින් තොරව විශේෂ ආහාර මෙනු සකස් කරමු. අපගේ කණ්ඩායම අමතන්න.</>
                ) : (
                  <>We design custom menus for any guest count, dietary preference, or theme with <strong>no fixed price</strong>. Contact our culinary team directly.</>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20discuss%20a%20customized%20catering%20menu%20for%20our%20event.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {RESTAURANT_INFO.whatsappFormatted}</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="btn-outline-dark px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-madara-orange" />
              <span>Call: {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

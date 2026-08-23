"use client";

import React, { useState } from "react";
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
  ChevronUp
} from "lucide-react";

export default function CateringMenuExplorer() {
  const { language, t } = useLanguage();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("birthday");

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
                {cat.name}
              </h3>
              {cat.sinhalaName && (
                <span className="text-xs text-madara-orange font-medium hidden sm:inline">
                  ({cat.sinhalaName})
                </span>
              )}
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
      <div className={`
        ${hasMultiple 
          ? "flex items-start overflow-x-auto snap-x snap-mandatory gap-4 pt-4 pb-4 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:pt-0 md:grid md:grid-cols-2 md:overflow-x-visible md:pb-0" 
          : "grid grid-cols-1 pt-4 md:pt-0"
        } gap-6
      `}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`glass-panel-orange rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col justify-between relative border transition-all duration-300 ${
              pkg.isCustomizable
                ? "border-madara-orange shadow-glow-orange bg-madara-surfaceElevated"
                : "border-white/10 hover:border-madara-orange/40"
            } ${
              hasMultiple ? "w-[85vw] xs:w-[320px] sm:w-[360px] md:w-auto flex-shrink-0 snap-start" : "w-full"
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-6 bg-gradient-to-r from-madara-orange to-red-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-wider shadow-md">
                ⭐ Top Recommended
              </div>
            )}

            {pkg.isCustomizable && (
              <div className="absolute -top-3 left-6 bg-gradient-to-r from-amber-500 to-madara-orange text-black text-[11px] font-extrabold px-3 py-0.5 sm:px-4 sm:py-1 rounded-full uppercase tracking-wider shadow-md">
                ✨ 100% Tailor-Made Menu
              </div>
            )}

            <div>
              {/* Header: Title, Sinhala name, Tagline, and Price */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 sm:pb-5 border-b border-white/10">
                <div>
                  <h4 className="text-lg sm:text-2xl font-bold text-white font-serif">
                    {language === "si" && pkg.sinhalaName ? pkg.sinhalaName : pkg.packageName}
                  </h4>
                  {pkg.sinhalaName && language !== "si" && (
                    <span className="text-xs text-madara-orange font-semibold block mt-0.5">
                      {pkg.sinhalaName}
                    </span>
                  )}
                </div>

                <div className="sm:text-right flex-shrink-0 bg-black/40 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-white/10">
                  <span className="text-[10px] text-madara-textMuted uppercase font-bold block">
                    {t("catering.priceLabel")}
                  </span>
                  <span className={`text-base sm:text-xl font-extrabold ${pkg.isCustomizable ? "text-madara-amber" : "text-madara-orange"}`}>
                    {pkg.priceDisplay === "Custom Quote" && language === "si" ? "මිල ගණන් විමසන්න" : pkg.priceDisplay}
                  </span>
                  <span className="text-[10px] sm:text-xs text-madara-textSecondary block">
                    {t("catering.minGuests").replace("{count}", pkg.minGuests.toString())}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="my-3 sm:my-4 flex flex-wrap gap-1.5 sm:gap-2">
                {pkg.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-madara-textSecondary flex items-center gap-1 sm:gap-1.5"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-madara-orange flex-shrink-0" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>

              {/* Itemized Menu Sections */}
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  {pkg.isCustomizable ? t("catering.customizationsTitle") : t("catering.inclusionsTitle")}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {pkg.menuSections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="bg-black/30 rounded-xl p-2.5 sm:p-3.5 border border-white/5"
                    >
                      <h5 className="text-xs font-bold text-madara-amber uppercase tracking-wider mb-1.5 sm:mb-2 flex items-center gap-1 sm:gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-madara-orange" />
                        <span>{sec.title}</span>
                      </h5>
                      <ul className="space-y-1 text-xs text-madara-textSecondary">
                        {sec.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-1 sm:gap-1.5">
                            <span className="text-madara-orange text-[10px] mt-0.5">•</span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Package Action Footer */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs text-madara-textMuted text-center sm:text-left">
                <span>{t("catering.includesFooter")}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={generateWhatsAppPackageUrl(pkg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto btn-whatsapp px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{pkg.isCustomizable ? t("catering.buildCustomMenu") : t("catering.contactNow")}</span>
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="catering" className="py-24 relative bg-madara-dark overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow w-[550px] h-[550px] bg-madara-orange/6 top-10 left-10" />
      <div className="ambient-glow w-[450px] h-[450px] bg-amber-500/4 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Catering Dominance */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madara-orange/10 border border-madara-orange/30 text-madara-orange text-xs font-bold uppercase tracking-wider mb-4 shadow-glow-orange-sm">
            <ChefHat className="w-3.5 h-3.5" />
            <span>{t("catering.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            {t("catering.title")} <span className="text-gradient-orange">{t("catering.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-madara-textSecondary">
            {t("catering.subtext")}
          </p>
        </div>

        {/* Desktop Layout (Sidebar + Content) */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-8 lg:gap-10">
          {/* Sidebar Selector */}
          <div className="md:col-span-4 lg:col-span-3 space-y-3">
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
                    {cat.sinhalaName && language !== "si" && (
                      <span className="text-[10px] text-madara-orange font-semibold block truncate mt-0.5">{cat.sinhalaName}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content Column (Banner + Packages) */}
          <div className="md:col-span-8 lg:col-span-9 space-y-8">
            {renderCategoryBanner(currentCategory)}
            {renderPackages(packagesInCurrentCategory)}
          </div>
        </div>

        {/* Mobile Layout (Accordion) */}
        <div className="md:hidden space-y-4">
          {CATERING_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const isOpen = selectedCategoryId === cat.id;
            const packages = CATERING_PACKAGES.filter((p) => p.categoryId === cat.id);
            
            return (
              <div key={cat.id} className="border border-white/10 rounded-3xl overflow-hidden bg-white/5 transition-all">
                {/* Accordion Header */}
                <button
                  onClick={() => setSelectedCategoryId(isOpen ? "" : cat.id)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-all ${
                    isOpen ? "bg-gradient-to-r from-madara-orange/20 to-red-600/10 border-b border-white/15" : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isOpen ? "bg-madara-orange text-white" : "bg-white/5 text-madara-orange"
                    }`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{language === "si" && cat.sinhalaName ? cat.sinhalaName : cat.name}</span>
                      </h4>
                      {cat.sinhalaName && language !== "si" && (
                        <span className="text-[10px] text-madara-textMuted block mt-0.5">{cat.sinhalaName}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-madara-orange">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="p-4 space-y-6 bg-madara-dark/50 border-t border-white/5">
                    {renderPackages(packages)}
                  </div>
                )}
              </div>
            );
          })}
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

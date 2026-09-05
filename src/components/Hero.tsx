"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  Flame, 
  ChefHat, 
  Wine, 
  Truck, 
  Star, 
  ArrowRight, 
  Sparkles,
  UtensilsCrossed,
  ShieldCheck,
  Phone,
  MessageCircle,
  Clock,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Play,
  Pause
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HeroSlide {
  id: string;
  image: string;
  pillEn: string;
  pillSi: string;
  titlePrefixEn: string;
  titleAccentEn: string;
  titlePrefixSi: string;
  titleAccentSi: string;
  descriptionEn: string;
  descriptionSi: string;
  badgeEn: string;
  badgeSi: string;
  ctaPrimaryEn: string;
  ctaPrimarySi: string;
  ctaPrimaryHref: string;
  statNumber: string;
  statLabelEn: string;
  statLabelSi: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=80",
    pillEn: "Homagama's #1 Event Catering Specialist",
    pillSi: "හෝමාගම අංක 1 උත්සව කේටරින් සේවාව",
    titlePrefixEn: "Grand Catering For",
    titleAccentEn: "Every Precious Milestone",
    titlePrefixSi: "ඔබේ සුවිශේෂී උත්සව සඳහා",
    titleAccentSi: "රාජකීය කේටරින් සේවාව",
    descriptionEn: "Full-scale event catering with luxury buffet setups, chafing warmers, and tailored packages across Homagama & Colombo.",
    descriptionSi: "හෝමාගම සහ කොළඹ අවට විවාහ මංගල්‍ය, දාන සහ උත්සව සඳහා උසස් තත්ත්වයේ කේටරින් සේවා සහ බුෆේ සැකසුම්.",
    badgeEn: "Weddings • Dane • Funerals • Birthdays",
    badgeSi: "මංගල්‍ය • දානමය පිංකම් • උපන්දින",
    ctaPrimaryEn: "Explore Catering Packages",
    ctaPrimarySi: "කේටරින් පැකේජ බලන්න",
    ctaPrimaryHref: "#catering",
    statNumber: "650+",
    statLabelEn: "Catering Events Delivered",
    statLabelSi: "සංවිධානය කළ උත්සව",
  },
  {
    id: "live_wok",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1920&q=80",
    pillEn: "Interactive Live Cooking Stations",
    pillSi: "සජීවී සූපශාස්ත්‍ර අත්දැකීම",
    titlePrefixEn: "Sizzling Flames &",
    titleAccentEn: "Live Action Wok Theater",
    titlePrefixSi: "සජීවී ගිනි දැල් මැද පිසෙන",
    titleAccentSi: "මොන්ගෝලියන් සහ කොත්තු",
    descriptionEn: "On-site live cooking stations: Mongolian wok bowls, molten cheese kottu, BBQ grills, and fresh hoppers.",
    descriptionSi: "ඔබේ උත්සව භූමියටම පැමිණෙන මොන්ගෝලියන් වොක්, චීස් කොත්තු, බාබකියු සහ උණු උණු ආප්ප සජීවී කුටි.",
    badgeEn: "Mongolian Wok • BBQ • Sizzling Kottu",
    badgeSi: "මොන්ගෝලියන් වොක් • BBQ • කොත්තු",
    ctaPrimaryEn: "View Action Kitchens",
    ctaPrimarySi: "ලයිව් කිචන් විස්තර",
    ctaPrimaryHref: "#experience",
    statNumber: "100%",
    statLabelEn: "Live Cooking Theater",
    statLabelSi: "නැවුම් සජීවී පිසීම",
  },
  {
    id: "byob",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
    pillEn: "BYOB Friendly Evening Dining",
    pillSi: "BYOB හිතකාමී රාත්‍රී භෝජනය",
    titlePrefixEn: "Bring Your Own Spirits,",
    titleAccentEn: "Savor Fiery Sri Lankan Bites",
    titlePrefixSi: "ඔබේ ප්‍රියතම පානය සමඟ",
    titleAccentSi: "කටට රසට දේවල් කළ බයිට්ස්",
    descriptionEn: "Zero corkage fee dining with chilled glassware, fresh ice buckets, and fiery hot butter cuttlefish bites.",
    descriptionSi: "කිසිදු අමතර ගාස්තුවකින් තොරව ඔබේ ප්‍රියතම පානය රැගෙන එන්න. නොමිලේ වීදුරු, අයිස් සහ රසවත් බයිට්ස්.",
    badgeEn: "Chilled Glassware • Ice Buckets • Hot Bites",
    badgeSi: "සිසිල් කළ වීදුරු • අයිස් • රසවත් බයිට්ස්",
    ctaPrimaryEn: "Discover Food Menu",
    ctaPrimarySi: "ආහාර මෙනුව බලන්න",
    ctaPrimaryHref: "#menu",
    statNumber: "0 LKR",
    statLabelEn: "Corkage Fee Guarantee",
    statLabelSi: "නොමිලේ වීදුරු සහ අයිස්",
  },
  {
    id: "menu_heritage",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80",
    pillEn: "Multi-Cuisine Masterpieces",
    pillSi: "බහු-දේශීය රසවත් ආහාර",
    titlePrefixEn: "Claypot Biryani, Sizzlers &",
    titleAccentEn: "Sri Lankan Heritage",
    titlePrefixSi: "මැටි ඇතිලි බිරියානි සහ",
    titleAccentSi: "දේශීය රසමුසු කෑම වර්ග",
    descriptionEn: "Claypot dum biryanis, seafood sizzlers, and heritage curries for dine-in, takeaway, and delivery.",
    descriptionSi: "සුවඳැති දම් බිරියානි, සීෆුඩ් සිස්ලර් සහ සාම්ප්‍රදායික රසැති කෑම වර්ග — ඩයිනින් හෝ ඩිලිවරි සඳහා.",
    badgeEn: "Multi-Cuisine • Dine-In • Takeaway",
    badgeSi: "බහු-දේශීය • ඩයිනින් • ඩිලිවරි",
    ctaPrimaryEn: "Explore Full Menu",
    ctaPrimarySi: "ආහාර මෙනුව බලන්න",
    ctaPrimaryHref: "#menu",
    statNumber: "100+",
    statLabelEn: "Master Menu Specialties",
    statLabelSi: "සුවිශේෂී කෑම වට්ටෝරු",
  },
];

export default function Hero() {
  const { language, t } = useLanguage();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  // Auto-play timer (6 seconds per slide)
  useEffect(() => {
    if (isPaused) return;

    slideIntervalRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [nextSlide, isPaused]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section 
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden select-none bg-madara-dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ============================================================ */}
      {/* BACKGROUND SLIDESHOW WITH SMOOTH CROSS-FADE & KEN-BURNS ZOOM */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Image with subtle Ken-Burns effect */}
              <img
                src={slide.image}
                alt={slide.titleAccentEn}
                className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                  isActive ? "scale-108 brightness-50" : "scale-100 brightness-30"
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              {/* Luxury Multi-Layer Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-madara-dark via-madara-dark/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-madara-dark via-transparent to-madara-dark/70" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-madara-dark" />
            </div>
          );
        })}

        {/* Ambient Glowing Orbs */}
        <div className="ambient-glow w-[600px] h-[600px] bg-madara-orange/15 top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 animate-glow" />
        <div className="ambient-glow w-[450px] h-[450px] bg-amber-500/10 bottom-10 right-10" />

        {/* Pattern Dot Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* MAIN HERO CONTENT (CENTER / LEFT ALIGNED) */}
      {/* ============================================================ */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Dynamic Animated Content */}
          <div className="lg:col-span-8 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-madara-orange/40 backdrop-blur-xl mb-6 shadow-glow-orange-sm animate-float">
              <span className="flex h-2.5 w-2.5 rounded-full bg-madara-orange animate-ping flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-madara-orange uppercase tracking-wider">
                {language === "si" ? currentSlide.pillSi : currentSlide.pillEn}
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="hidden sm:inline text-xs font-semibold text-white/80">
                191/B/1, Athurugiriya Rd, Homagama
              </span>
            </div>

            {/* Dynamic Headline with Slide Transition */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white font-serif leading-[1.12] mb-6 min-h-[2.4em] sm:min-h-[2.2em] flex flex-col justify-center">
              <span className="block text-white/95">
                {language === "si" ? currentSlide.titlePrefixSi : currentSlide.titlePrefixEn}
              </span>
              <span className="text-gradient-orange block mt-1">
                {language === "si" ? currentSlide.titleAccentSi : currentSlide.titleAccentEn}
              </span>
            </h1>

            {/* Description Text */}
            <p className="text-sm sm:text-lg text-madara-textSecondary max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed line-clamp-3 sm:line-clamp-none min-h-[4.5em]">
              {language === "si" ? currentSlide.descriptionSi : currentSlide.descriptionEn}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
              <a
                href={currentSlide.ctaPrimaryHref}
                className="btn-primary-orange px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold flex items-center gap-2.5 shadow-glow-orange group cursor-pointer"
              >
                <ChefHat className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>{language === "si" ? currentSlide.ctaPrimarySi : currentSlide.ctaPrimaryEn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#menu"
                className="btn-outline-dark px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold flex items-center gap-2 backdrop-blur-md"
              >
                <UtensilsCrossed className="w-4 h-4 text-madara-orange" />
                <span>{t("hero.btnMenu")}</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20event%20catering%20and%20dining.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp Hotline</span>
                <span className="sm:hidden">{RESTAURANT_INFO.whatsappFormatted}</span>
              </a>
            </div>

            {/* Slide Badges / Highlight Pills */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white/90 backdrop-blur-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-madara-orange" />
                <span>{language === "si" ? currentSlide.badgeSi : currentSlide.badgeEn}</span>
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 backdrop-blur-md flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Punctual Guarantee</span>
              </span>
            </div>

          </div>

          {/* Right Column: Floating Showcase Card & Slide Stats */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-5">
            {/* Live Interactive Stat Card */}
            <div className="glass-panel-orange rounded-3xl p-6 border border-madara-orange/30 shadow-2xl backdrop-blur-2xl relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-extrabold text-madara-orange uppercase tracking-wider block">
                    {language === "si" ? "විශේෂාංගය" : "Featured Spotlight"}
                  </span>
                  <p className="text-3xl font-extrabold text-white font-serif mt-1">
                    {currentSlide.statNumber}
                  </p>
                  <p className="text-xs text-madara-textSecondary mt-0.5 font-medium">
                    {language === "si" ? currentSlide.statLabelSi : currentSlide.statLabelEn}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-madara-orange/20 border border-madara-orange/40 flex items-center justify-center text-madara-orange">
                  <Star className="w-6 h-6 fill-madara-orange text-madara-orange" />
                </div>
              </div>

              {/* Progress Bar for Active Slide */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                  <span>{language === "si" ? "ස්ලයිඩය" : "Slide"} {currentSlideIndex + 1} / {totalSlides}</span>
                  <span className="text-madara-orange font-semibold">{isPaused ? "Paused" : "Auto-playing"}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    key={currentSlideIndex}
                    className={`h-full bg-gradient-to-r from-madara-orange to-red-500 rounded-full ${
                      isPaused ? "w-full" : "animate-[progress_6s_linear_infinite]"
                    }`}
                    style={{ width: isPaused ? "100%" : undefined }}
                  />
                </div>
              </div>

              {/* Quick Slide Switch Buttons */}
              <div className="mt-4 flex items-center justify-between gap-2">
                <button
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-madara-orange hover:text-white text-xs font-semibold text-white/80 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="px-2 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-xs transition-all cursor-pointer"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-madara-orange hover:text-white text-xs font-semibold text-white/80 transition-all flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Quick Ratings & Review Snippet */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1.5">4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-madara-textMuted mt-0.5">
                  Trusted by 650+ event hosts across Homagama
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* BOTTOM HERO CONTROLS: SLICK DOTS & QUICK NAVIGATION STRIP */}
      {/* ============================================================ */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Slick Slide Indicators & Arrow Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
          
          {/* Slick Dots Pagination */}
          <div className="flex items-center gap-2 sm:gap-3 bg-black/60 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/10">
            {HERO_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${slide.titleAccentEn}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? "w-8 sm:w-10 bg-gradient-to-r from-madara-orange to-red-500 shadow-glow-orange"
                      : "w-2.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              );
            })}
          </div>

          {/* Slide Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-madara-orange border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-white/70 px-2">
              0{currentSlideIndex + 1} / 0{totalSlides}
            </span>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-madara-orange border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* 4 Core Services Quick Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6">
          <a
            href="#catering"
            className="glass-panel p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-madara-orange/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform">
              <ChefHat className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white group-hover:text-madara-orange transition-colors truncate">
                Full Event Catering
              </p>
              <p className="text-[11px] text-madara-textMuted truncate">Weddings, Dane, Parties</p>
            </div>
          </a>

          <a
            href="#action-kitchen"
            className="glass-panel p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-madara-orange/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center text-madara-amber flex-shrink-0 group-hover:scale-110 transition-transform">
              <Flame className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white group-hover:text-madara-orange transition-colors truncate">
                Live Action Wok
              </p>
              <p className="text-[11px] text-madara-textMuted truncate">Mongolian, BBQ, Kottu</p>
            </div>
          </a>

          <a
            href="#byob"
            className="glass-panel p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-madara-orange/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Wine className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white group-hover:text-madara-orange transition-colors truncate">
                BYOB Dining
              </p>
              <p className="text-[11px] text-madara-textMuted truncate">Glassware &amp; Spicy Bites</p>
            </div>
          </a>

          <a
            href="#menu"
            className="glass-panel p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-madara-orange/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Truck className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white group-hover:text-madara-orange transition-colors truncate">
                Express Takeaway
              </p>
              <p className="text-[11px] text-madara-textMuted truncate">7:00 AM – 10:00 PM</p>
            </div>
          </a>
        </div>

      </div>

    </section>
  );
}

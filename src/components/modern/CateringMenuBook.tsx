"use client";

import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";

// Import Full A4 Cover Page Images from src/assets/menuBook
import pg1 from "@/assets/menuBook/pg1.jpeg";
import pg2 from "@/assets/menuBook/pg2.jpeg";
import pg3 from "@/assets/menuBook/pg3.jpeg";

import { 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  MapPin, 
  Clock, 
  BookMarked,
  ShieldCheck,
  Flame,
  Award,
  UtensilsCrossed,
  Sparkles,
  CheckCircle2,
  PartyPopper,
  HeartHandshake,
  Flower2,
  ChefHat,
  ArrowRight
} from "lucide-react";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(({ children, className = "" }, ref) => {
  return (
    <div 
      ref={ref} 
      className={`page ${className}`}
      style={{
        background: "linear-gradient(145deg, #FAF4EB 0%, #F3EAE0 100%)",
        borderRadius: "6px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.12)"
      }}
    >
      <div className="page-content">
        {children}
      </div>
    </div>
  );
});

Page.displayName = "Page";

// High-resolution food images for realistic corner platters
const FOOD_IMAGES = {
  friedRice: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
  chickenDevel: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
  yellowRice: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
  cutlet: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
  fishCurry: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
  riceSpread: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  bbqGrill: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
  noodles: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
  welcomeDrink: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
  dessert: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  stringHoppers: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  kottu: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  seafood: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80",
  warmer: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
  chickenDrumsticks: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
};

const TOTAL_PAGES = 16;

export default function CateringMenuBook() {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const bookRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Soft realistic paper flip sound
  const playPageFlipSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const bufferSize = ctx.sampleRate * 0.16;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(750, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.16);
      filter.Q.value = 1.6;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.16);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noiseSource.start();
    } catch {
      // Audio autoplay catch
    }
  };

  const handlePageFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
    playPageFlipSound();
  };

  const handleNext = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const handlePrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const turnToPage = (pageIndex: number) => {
    if (bookRef.current) {
      bookRef.current.pageFlip().turnToPage(pageIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full max-w-5xl mx-auto my-8 p-12 text-center bg-[#FAF8F5] rounded-3xl animate-pulse border border-stone-200">
        <BookMarked className="w-12 h-12 mx-auto text-amber-700 mb-3" />
        <p className="font-serif text-stone-700">Loading Catering Menu Book...</p>
      </div>
    );
  }

  // Table of Contents Main Categories (Flips to full A4 Cover Pages: pg1, pg2, pg3, pg4, pg5)
  const tocCategories = [
    {
      id: "party",
      num: "01",
      title: language === "si" ? "සාද මෙනු පැකේජ" : "Party & Celebration Packages",
      subtitle: language === "si" ? "උපන්දින, ආයතනික හා විශේෂ උත්සව සඳහා" : "Birthdays, Corporate Functions & Private Gatherings",
      packagesCount: language === "si" ? "මෙනු පැකේජ 03" : "3 Packages",
      priceRange: "Rs. 800/= - 950/=",
      coverPageNum: 2, // Page 2 (0-indexed 1) - pg1.jpg
      icon: PartyPopper,
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
    },
    {
      id: "bana",
      num: "02",
      title: language === "si" ? "බණ හා දානමය මෙනු පැකේජ" : "Bana & Alms-Giving Packages",
      subtitle: language === "si" ? "සාංඝික දාන, පිරිත් හා ආගමික පින්කම් සඳහා" : "Traditional Alms-Giving & Religious Ceremonies",
      packagesCount: language === "si" ? "මෙනු පැකේජ 03" : "3 Packages",
      priceRange: "Rs. 700/= - 1,100/=",
      coverPageNum: 6, // Page 6 (0-indexed 5) - pg2.jpg
      icon: Flower2,
      badgeColor: "bg-orange-100 text-orange-900 border-orange-300"
    },
    {
      id: "funeral",
      num: "03",
      title: language === "si" ? "අවමංගල්‍ය හා මල බත මෙනු" : "Funeral & Mala Batha Packages",
      subtitle: language === "si" ? "අවමංගල්‍ය හා මල බත සංග්‍රහ සේවාවන්" : "Dignified & Timely Support for Solemn Occasions",
      packagesCount: language === "si" ? "මෙනු පැකේජ 04" : "4 Packages",
      priceRange: "Rs. 490/= - 1,050/=",
      coverPageNum: 10, // Page 10 (0-indexed 9) - pg3.jpg
      icon: HeartHandshake,
      badgeColor: "bg-stone-200 text-stone-900 border-stone-300"
    },
    {
      id: "contact",
      num: "04",
      title: language === "si" ? "හෝමාගම කේටරින් ඩෙස්ක්" : "Homagama Catering Desk & Hotline",
      subtitle: language === "si" ? "ඍජු ඇමතුම්, WhatsApp හා වෙන්කරවා ගැනුම්" : "Direct Hotline, WhatsApp & Consultation Desk",
      packagesCount: language === "si" ? "විමසීම්" : "Reservations",
      priceRange: language === "si" ? "දිනපතා" : "Daily 6:30 AM - 10:30 PM",
      coverPageNum: 16, // Page 16 (0-indexed 15)
      icon: Phone,
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-6 p-2 sm:p-6 bg-[#FAF8F5] rounded-3xl flex flex-col items-center justify-center select-none font-sans">
      <style>{`
        .page {
          background: linear-gradient(145deg, #FAF4EB 0%, #F3EAE0 100%);
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .page-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px sm:padding: 18px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .full-cover-page {
          padding: 0 !important;
        }
        
        .full-cover-page .page-content {
          padding: 0 !important;
        }
      `}</style>

      {/* Main Flipbook Stage Container */}
      <div className="relative w-full flex justify-center items-center py-2 min-h-[480px] sm:min-h-[550px]">

        {/* Left Navigation Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur border border-stone-300 text-stone-800 flex items-center justify-center transition-all ${
            currentPage === 0
              ? "opacity-20 cursor-not-allowed"
              : "hover:scale-110 hover:bg-amber-600 hover:text-white cursor-pointer shadow-lg"
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={handleNext}
          disabled={isMobile ? currentPage >= TOTAL_PAGES - 1 : currentPage >= TOTAL_PAGES - 2}
          className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur border border-stone-300 text-stone-800 flex items-center justify-center transition-all ${
            (isMobile ? currentPage >= TOTAL_PAGES - 1 : currentPage >= TOTAL_PAGES - 2)
              ? "opacity-20 cursor-not-allowed"
              : "hover:scale-110 hover:bg-amber-600 hover:text-white cursor-pointer shadow-lg"
          }`}
          aria-label="Next Page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* HTMLFlipBook Component */}
        <HTMLFlipBook
          key={isMobile ? "mobile-single-view" : "desktop-double-view"}
          ref={bookRef}
          width={isMobile ? 320 : 370}
          height={isMobile ? 500 : 520}
          size="fixed"
          minWidth={280}
          maxWidth={isMobile ? 360 : 450}
          minHeight={420}
          maxHeight={600}
          maxShadowOpacity={0.4}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={handlePageFlip}
          className="mx-auto"
          style={{ margin: "0 auto" }}
          startPage={0}
          drawShadow={true}
          flippingTime={550}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* ============================================================== */}
          {/* PAGE 1: TABLE OF CONTENTS                                      */}
          {/* ============================================================== */}
          <Page>
            <div className="w-full h-full flex flex-col justify-between font-sans p-3">
              <div className="border-b border-amber-900/15 pb-2">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-800 block">
                  MADARA CATERING MENU BOOK
                </span>
                <h3 className="font-serif font-extrabold text-stone-900 text-xl sm:text-2xl tracking-tight">
                  {language === "si" ? "මෙනු පටුන" : "Table of Contents"}
                </h3>
                <p className="text-[10px] text-stone-500 mt-0.5">
                  {language === "si" 
                    ? "අදාළ කේටරින් කාණ්ඩය මත ක්ලික් කර එම මෙනු ආවරණ පිටුවට පිවිසෙන්න"
                    : "Click any main category to flip to its full cover page"}
                </p>
              </div>

              {/* Main Categories Navigation List */}
              <div className="space-y-2 my-auto py-1">
                {tocCategories.map((cat) => {
                  const IconComp = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => turnToPage(cat.coverPageNum - 1)}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-white/80 hover:bg-amber-100/90 border border-stone-200/80 hover:border-amber-400 text-left transition-all duration-200 group cursor-pointer shadow-2xs hover:shadow-md"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-amber-900/10 text-amber-900 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-amber-800 group-hover:text-amber-950">
                              {cat.num}.
                            </span>
                            <span className="text-xs font-bold text-stone-900 group-hover:text-amber-950 truncate">
                              {cat.title}
                            </span>
                          </div>
                          <span className="text-[9.5px] font-medium text-stone-500 block truncate">
                            {cat.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end flex-shrink-0 ml-2">
                        <span className="text-[9px] font-bold text-amber-900 bg-amber-100/90 group-hover:bg-amber-200 px-2 py-0.5 rounded-full">
                          {cat.packagesCount}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-amber-800 group-hover:underline mt-0.5">
                          p.{cat.coverPageNum} ➔
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 1 • Table of Contents
              </div>
            </div>
          </Page>

          {/* ============================================================== */}
          {/* PAGE 2: FULL A4 COVERPAGE OF CATEGORY 1 [pg1.jpg]               */}
          {/* ============================================================== */}
          <Page className="full-cover-page">
            <div className="w-full h-full relative rounded-md overflow-hidden flex flex-col justify-between select-none">
              <Image
                src={pg1}
                alt="Category 1 - Party Menus Cover"
                fill
                className="object-cover"
                priority
              />
              
              {/* Top Bar Overlay */}
              <div className="relative z-10 p-3 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                <span className="px-3 py-1 rounded-full bg-amber-500/90 text-stone-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  Category 01 • Party Menus
                </span>
                <button
                  onClick={() => turnToPage(0)}
                  className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 text-amber-200 hover:text-white text-[9px] font-bold border border-amber-400/40 cursor-pointer backdrop-blur"
                >
                  ◄ Table of Contents
                </button>
              </div>

              {/* Bottom Quick Navigation Bar Overlay */}
              <div className="relative z-10 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-xs font-serif font-extrabold text-amber-300 tracking-tight">
                      Party & Celebration Packages
                    </h3>
                    <p className="text-[9.5px] text-stone-300">
                      Rs. 800/= – Rs. 950/= per person • Page 2
                    </p>
                  </div>

                  <button
                    onClick={() => turnToPage(2)} // Page 3 (Party 01)
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg inline-flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                  >
                    <span>View Menus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Page>

          {/* PAGE 3: BIRTHDAY / CORPORATE / SMALL PARTY — MENU 01 */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Rice Spread" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.chickenDevel} alt="Chicken Devel" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-right pl-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-900 text-amber-100 font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
                  <span>BIRTHDAY & PARTY MENUS</span>
                </div>

                <div className="pt-0.5">
                  <span className="text-xs font-serif font-extrabold uppercase tracking-widest text-amber-950 block">
                    PARTY MENU 01
                  </span>
                  <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                    Classic Menu
                  </h2>
                  <div className="inline-block mt-0.5 px-3 py-1 rounded-full bg-amber-600 text-white font-extrabold text-xs shadow-xs">
                    Rs. 800/= per person
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 my-auto py-1 pr-1">
                {[
                  "Egg Fried Rice – Keeri Samba",
                  "Chicken Devel",
                  "Hot Butter Mushroom / Brinjal Moju",
                  "Vegetable Chopsy",
                  "Chilli Paste",
                  "Fish Cutlet",
                  "Papadam",
                ].map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-800 text-xs font-semibold py-1 border-b border-stone-200/60 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span className="tracking-tight">{dish}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-amber-900/80 text-center font-sans uppercase tracking-wider">
                Page 3 • Birthday & Party Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 4: BIRTHDAY / CORPORATE / SMALL PARTY — MENU 02 */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.noodles} alt="Noodles Spread" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.chickenDrumsticks} alt="Chilli Chicken" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-left pr-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-900 text-amber-100 font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
                  <span>BIRTHDAY & PARTY MENUS</span>
                </div>

                <div className="pt-0.5">
                  <span className="text-xs font-serif font-extrabold uppercase tracking-widest text-amber-950 block">
                    PARTY MENU 02
                  </span>
                  <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                    Special Menu
                  </h2>
                  <div className="inline-block mt-0.5 px-3 py-1 rounded-full bg-amber-600 text-white font-extrabold text-xs shadow-xs">
                    Rs. 950/= per person
                  </div>
                </div>
              </div>

              <div className="space-y-1 my-auto py-1 pl-1">
                {[
                  "Egg Fried Rice / White Rice",
                  "Egg Noodles",
                  "Chilli Chicken",
                  "Potato Baji",
                  "Stir-Fried Vegetables",
                  "Brinjal Moju",
                  "Fish Cutlet",
                  "Fried Onion & Maldive Fish Sambal",
                  "Papadam",
                ].map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-800 text-xs font-semibold py-0.5 border-b border-stone-200/60 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span className="tracking-tight">{dish}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-amber-900/80 text-center font-sans uppercase tracking-wider">
                Page 4 • Birthday & Party Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 5: BIRTHDAY / CORPORATE / SMALL PARTY — MENU 03 */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.yellowRice} alt="Yellow Rice" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.cutlet} alt="Cutlet" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-right pl-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-900 text-amber-100 font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  <PartyPopper className="w-3.5 h-3.5 text-amber-400" />
                  <span>BIRTHDAY & PARTY MENUS</span>
                </div>

                <div className="pt-0.5">
                  <span className="text-xs font-serif font-extrabold uppercase tracking-widest text-amber-950 block">
                    PARTY MENU 03
                  </span>
                  <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                    Sri Lankan Menu
                  </h2>
                  <div className="inline-block mt-0.5 px-3 py-1 rounded-full bg-amber-600 text-white font-extrabold text-xs shadow-xs">
                    Rs. 950/= per person
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 my-auto py-1 pr-1">
                {[
                  "Yellow Rice",
                  "Chicken Kuruma",
                  "Mixed Vegetable Salad",
                  "Brinjal Moju",
                  "Dhaal Curry",
                  "Potato Tempered",
                  "Fish Cutlet",
                  "Papadam",
                ].map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-800 text-xs font-semibold py-0.5 border-b border-stone-200/60 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span className="tracking-tight">{dish}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-amber-900/80 text-center font-sans uppercase tracking-wider">
                Page 5 • Birthday & Party Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* ============================================================== */}
          {/* PAGE 6: FULL A4 COVERPAGE OF CATEGORY 2 [pg2.jpg]               */}
          {/* ============================================================== */}
          <Page className="full-cover-page">
            <div className="w-full h-full relative rounded-md overflow-hidden flex flex-col justify-between select-none">
              <Image
                src={pg2}
                alt="Category 2 - Bana & Alms-Giving Menus Cover"
                fill
                className="object-cover"
                priority
              />
              
              {/* Top Bar Overlay */}
              <div className="relative z-10 p-3 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                <span className="px-3 py-1 rounded-full bg-orange-500/90 text-stone-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  Category 02 • Bana Menus
                </span>
                <button
                  onClick={() => turnToPage(0)}
                  className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 text-amber-200 hover:text-white text-[9px] font-bold border border-amber-400/40 cursor-pointer backdrop-blur"
                >
                  ◄ Table of Contents
                </button>
              </div>

              {/* Bottom Quick Navigation Bar Overlay */}
              <div className="relative z-10 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-xs font-serif font-extrabold text-amber-300 tracking-tight">
                      Bana & Alms-Giving Packages
                    </h3>
                    <p className="text-[9.5px] text-stone-300">
                      Rs. 700/= – Rs. 1,100/= per person • Page 6
                    </p>
                  </div>

                  <button
                    onClick={() => turnToPage(6)} // Page 7 (Bana 01)
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg inline-flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                  >
                    <span>View Menus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Page>

          {/* PAGE 7: BANA / ALMS-GIVING — MENU 01 */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.stringHoppers} alt="String Hoppers" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-left pr-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-950 text-amber-100 font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  <Flower2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>BANA & ALMS-GIVING MENUS</span>
                </div>

                <div className="pt-0.5">
                  <span className="text-xs font-serif font-extrabold uppercase tracking-widest text-amber-950 block">
                    BANA MENU 01
                  </span>
                  <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                    Tradition Bana Menu
                  </h2>
                  <div className="inline-block mt-0.5 px-3 py-1 rounded-full bg-orange-600 text-white font-extrabold text-xs shadow-xs">
                    Rs. 700/= per person
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 my-auto py-1 pl-1">
                {[
                  "Red Rice / White Rice",
                  "String Hoppers",
                  "Chicken Red Curry",
                  "Seeni Sambal",
                  "Pol Sambal",
                  "Dhaal Curry",
                  "Bean Curry",
                ].map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-800 text-xs font-semibold py-1 border-b border-stone-200/60 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span className="tracking-tight">{dish}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-orange-900/80 text-center font-sans uppercase tracking-wider">
                Page 7 • Bana & Alms-Giving Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 8: BANA / ALMS-GIVING — MENU 02 */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.fishCurry} alt="Fish Ambul Thiyal" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Country Red Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-right pl-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-950 text-amber-100 font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  <Flower2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>BANA & ALMS-GIVING MENUS</span>
                </div>

                <div className="pt-0.5">
                  <span className="text-xs font-serif font-extrabold uppercase tracking-widest text-amber-950 block">
                    BANA MENU 02
                  </span>
                  <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                    Fish Menu
                  </h2>
                  <div className="flex flex-col items-end gap-0.5 mt-0.5 text-[10px] font-extrabold text-stone-900">
                    <span className="bg-amber-200/90 border border-amber-400 px-2 py-0.5 rounded-full">Bala Fish — Rs. 800/=</span>
                    <span className="bg-amber-200/90 border border-amber-400 px-2 py-0.5 rounded-full">Tuna Fish — Rs. 950/=</span>
                    <span className="bg-amber-200/90 border border-amber-400 px-2 py-0.5 rounded-full">Thalapath — Rs. 1,000/=</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 my-auto py-1 pr-1">
                {[
                  "White Rice & Red Rice",
                  "Fish Ambul Thiyal",
                  "Dhaal Curry",
                  "Bean Curry",
                  "Potato Tempered",
                  "Fried Gotukola, Onion & Cashew Sambal",
                  "Fish Cutlet",
                  "Papadam & Chilli Pods",
                ].map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-800 text-xs font-semibold py-0.5 border-b border-stone-200/60 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span className="tracking-tight">{dish}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-orange-900/80 text-center font-sans uppercase tracking-wider">
                Page 8 • Bana & Alms-Giving Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 9: BANA / ALMS-GIVING — MENU 03 */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.friedRice} alt="Fried Rice" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.chickenDevel} alt="Fried Chicken Curry" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-left pr-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-950 text-amber-100 font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  <Flower2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>BANA & ALMS-GIVING MENUS</span>
                </div>

                <div className="pt-0.5">
                  <span className="text-xs font-serif font-extrabold uppercase tracking-widest text-amber-950 block">
                    BANA MENU 03
                  </span>
                  <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                    Special Bana Menu
                  </h2>
                  <div className="inline-block mt-0.5 px-3 py-1 rounded-full bg-orange-600 text-white font-extrabold text-xs shadow-xs">
                    Rs. 1,100/= per person
                  </div>
                </div>
              </div>

              <div className="space-y-1 my-auto py-1 pl-1">
                {[
                  "Fried Rice",
                  "White Rice",
                  "Fried Chicken Curry",
                  "Chickpea Curry",
                  "Vegetable Chopsy / Vegetable Salad",
                  "Potato Tempered",
                  "Umbalakada Sambal",
                  "Fish Cutlet",
                  "Papadam & Chilli Pods",
                ].map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-800 text-xs font-semibold py-0.5 border-b border-stone-200/60 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span className="tracking-tight">{dish}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-orange-900/80 text-center font-sans uppercase tracking-wider">
                Page 9 • Bana & Alms-Giving Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* ============================================================== */}
          {/* PAGE 10: FULL A4 COVERPAGE OF CATEGORY 3 [pg3.jpg]              */}
          {/* ============================================================== */}
          <Page className="full-cover-page">
            <div className="w-full h-full relative rounded-md overflow-hidden flex flex-col justify-between select-none">
              <Image
                src={pg3}
                alt="Category 3 - Funeral & Mala Batha Menus Cover"
                fill
                className="object-cover"
                priority
              />
              
              {/* Top Bar Overlay */}
              <div className="relative z-10 p-3 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                <span className="px-3 py-1 rounded-full bg-stone-500/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  Category 03 • Funeral Menus
                </span>
                <button
                  onClick={() => turnToPage(0)}
                  className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 text-amber-200 hover:text-white text-[9px] font-bold border border-amber-400/40 cursor-pointer backdrop-blur"
                >
                  ◄ Table of Contents
                </button>
              </div>

              {/* Bottom Quick Navigation Bar Overlay */}
              <div className="relative z-10 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-xs font-serif font-extrabold text-amber-300 tracking-tight">
                      Funeral & Mala Batha Packages
                    </h3>
                    <p className="text-[9.5px] text-stone-300">
                      Rs. 490/= – Rs. 1,050/= per person • Page 10
                    </p>
                  </div>

                  <button
                    onClick={() => turnToPage(10)} // Page 11 (Funeral 01)
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg inline-flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                  >
                    <span>View Menus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Page>

          {/* PAGE 11: FUNERAL MENUS — MENU 01 */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.fishCurry} alt="Linna Fish" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-right pl-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 text-amber-200 font-extrabold text-xs uppercase tracking-wider shadow-sm border border-stone-700">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                  <span>FUNERAL & MALA BATHA MENUS</span>
                </div>

                <div className="pt-0.5">
                  <span className="text-xs font-serif font-extrabold uppercase tracking-widest text-stone-900 block">
                    FUNERAL MENU 01
                  </span>
                  <h2 className="font-serif italic font-extrabold text-stone-800 text-xl sm:text-2xl tracking-tight leading-tight">
                    Traditional Menu
                  </h2>
                  <div className="inline-block mt-0.5 px-3 py-1 rounded-full bg-stone-800 text-white font-extrabold text-xs shadow-xs">
                    Rs. 550/= per person
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 my-auto py-1 pr-1">
                {[
                  "White Rice & Red Rice",
                  "Linna Fish Curry",
                  "Dhaal Curry",
                  "Potato Tempered",
                  "Long Bean Curry",
                  "Kos Mallum / Mannyok Mallum",
                  "Papadam",
                ].map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-800 text-xs font-semibold py-1 border-b border-stone-200/60 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span className="tracking-tight">{dish}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-stone-800 text-center font-sans uppercase tracking-wider">
                Page 11 • Funeral & Mala Batha Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 12: FUNERAL MENUS — MENU 02 */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.chickenDrumsticks} alt="Chicken Curry" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-left pr-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 text-amber-200 font-extrabold text-xs uppercase tracking-wider shadow-sm border border-stone-700">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                  <span>FUNERAL & MALA BATHA MENUS</span>
                </div>

                <div className="pt-0.5">
                  <span className="text-xs font-serif font-extrabold uppercase tracking-widest text-stone-900 block">
                    FUNERAL MENU 02
                  </span>
                  <h2 className="font-serif italic font-extrabold text-stone-800 text-xl sm:text-2xl tracking-tight leading-tight">
                    Chicken Menu
                  </h2>
                  <div className="inline-block mt-0.5 px-3 py-1 rounded-full bg-stone-800 text-white font-extrabold text-xs shadow-xs">
                    Rs. 550/= per person
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 my-auto py-1 pl-1">
                {[
                  "White Rice & Red Rice",
                  "Chicken Curry",
                  "Potato Curry",
                  "Gotukola Sambal",
                  "Polos Maluwa / Mannyok Maluwa",
                  "Mango / Amberella Maluwa",
                  "Papadam",
                ].map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-800 text-xs font-semibold py-1 border-b border-stone-200/60 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span className="tracking-tight">{dish}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-stone-800 text-center font-sans uppercase tracking-wider">
                Page 12 • Funeral & Mala Batha Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 13: MALA BATHA MENUS — MENU 01 */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.fishCurry} alt="Katta Karawala" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Steamed Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-right pl-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 text-amber-200 font-extrabold text-xs uppercase tracking-wider shadow-sm border border-stone-700">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                  <span>FUNERAL & MALA BATHA MENUS</span>
                </div>

                <div className="pt-0.5">
                  <span className="text-xs font-serif font-extrabold uppercase tracking-widest text-stone-900 block">
                    MALA BATHA 01
                  </span>
                  <h2 className="font-serif italic font-extrabold text-stone-800 text-xl sm:text-2xl tracking-tight leading-tight">
                    Basic Menu
                  </h2>
                  <div className="inline-block mt-0.5 px-3 py-1 rounded-full bg-stone-800 text-white font-extrabold text-xs shadow-xs">
                    Rs. 490/= per person
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 my-auto py-1 pr-1">
                {[
                  "White Rice",
                  "Katta Karawala Curry",
                  "Wattakka Curry",
                  "Cucumber Salad",
                  "Bean Tempered",
                  "Papadam",
                ].map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-800 text-xs font-semibold py-1 border-b border-stone-200/60 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span className="tracking-tight">{dish}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-stone-800 text-center font-sans uppercase tracking-wider">
                Page 13 • Funeral & Mala Batha Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 14: MALA BATHA MENUS — MENU 02 */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.fishCurry} alt="Katta Karawala & Ambul Thiyal" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Rice Spread" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-left pr-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 text-amber-200 font-extrabold text-xs uppercase tracking-wider shadow-sm border border-stone-700">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                  <span>FUNERAL & MALA BATHA MENUS</span>
                </div>

                <div className="pt-0.5">
                  <span className="text-xs font-serif font-extrabold uppercase tracking-widest text-stone-900 block">
                    MALA BATHA 02
                  </span>
                  <h2 className="font-serif italic font-extrabold text-stone-800 text-xl sm:text-2xl tracking-tight leading-tight">
                    Special Menu
                  </h2>
                  <div className="inline-block mt-0.5 px-3 py-1 rounded-full bg-stone-800 text-white font-extrabold text-xs shadow-xs">
                    Rs. 1,050/= per person
                  </div>
                </div>
              </div>

              <div className="space-y-1 my-auto py-1 pl-1">
                {[
                  "White Rice & Red Rice",
                  "Katta Karawala Curry",
                  "Wattakka Curry",
                  "Cucumber Salad",
                  "Bean Tempered",
                  "Fish Ambul Thiyal / Chicken Curry",
                  "Kos Mallum / Mannyok Mallum",
                  "Fried Gotukola, Rata Kajju Sambal",
                  "Papadam",
                ].map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-stone-800 text-xs font-semibold py-0.5 border-b border-stone-200/60 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                    <span className="tracking-tight">{dish}</span>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-stone-800 text-center font-sans uppercase tracking-wider">
                Page 14 • Funeral & Mala Batha Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 15: FUNERAL & MALA BATHA SERVICE STANDARDS */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#78716c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-left pt-0.5 border-b border-amber-900/15 pb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 text-amber-200 font-extrabold text-xs uppercase tracking-wider shadow-sm border border-stone-700 mb-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                  <span>FUNERAL & MALA BATHA MENUS</span>
                </div>
                <h2 className="font-serif italic font-extrabold text-stone-800 text-xl sm:text-2xl tracking-tight leading-tight">
                  Funeral Catering Support
                </h2>
                <p className="text-[10px] text-stone-600 mt-0.5">
                  Our emergency dispatch & dedicated catering service guarantees
                </p>
              </div>

              <div className="space-y-2.5 my-auto py-1">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-200 text-stone-800 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Rapid 2-Hour Express Delivery</h4>
                    <p className="text-[10px] text-stone-600 leading-relaxed mt-0.5">
                      Hot thermal containers delivered to funeral homes or residences across Colombo & Gampaha districts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-200 text-stone-800 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Complete Tableware & Cutlery</h4>
                    <p className="text-[10px] text-stone-600 leading-relaxed mt-0.5">
                      Porcelain plates, serving spoons, hot rice warmers, and serviettes provided hassle-free.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-200 text-stone-800 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Flexible Pax Top-up Support</h4>
                    <p className="text-[10px] text-stone-600 leading-relaxed mt-0.5">
                      Unexpected guests? Contact our Homagama desk for fast top-up portion dispatches.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9.5px] font-bold text-stone-800 text-center font-sans uppercase tracking-wider">
                Page 15 • Funeral Support • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 16: HOMAGAMA CATERING DESK & CONTACT (BACK COVER) */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.welcomeDrink} alt="Welcome Drink" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Catering Desk" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              
              {/* ENHANCED HIGH-VISIBILITY CATEGORY HEADER */}
              <div className="text-right pl-20 pt-0.5 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-900 text-emerald-100 font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  <Phone className="w-3.5 h-3.5 text-emerald-300" />
                  <span>HOMAGAMA CATERING DESK</span>
                </div>

                <div className="pt-0.5">
                  <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                    Direct Contact
                  </h2>
                  <div className="inline-block mt-0.5 px-3 py-1 rounded-full bg-emerald-700 text-white font-extrabold text-xs shadow-xs">
                    Booking & Consultations
                  </div>
                </div>
              </div>

              <div className="space-y-3 my-auto py-1 pr-1">
                <div>
                  <div className="flex items-center justify-between font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-700" />
                      Direct Catering Hotline
                    </span>
                    <span className="text-amber-800 font-bold text-xs">Call Us</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    {RESTAURANT_INFO.phoneFormatted} / {RESTAURANT_INFO.secondaryPhoneFormatted}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      WhatsApp Direct Contact
                    </span>
                    <span className="text-amber-800 font-bold text-xs">Chat</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    {RESTAURANT_INFO.whatsappFormatted} (Instant Quotes & Menu Customization)
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      Restaurant Address
                    </span>
                    <span className="text-amber-800 font-bold text-xs">Homagama</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5 line-clamp-2">
                    {RESTAURANT_INFO.address}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      Consultation Hours
                    </span>
                    <span className="text-amber-800 font-bold text-xs">Daily</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Open 7 days a week from 6:30 AM – 10:30 PM for event reservations.
                  </p>
                </div>
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 flex items-center justify-between text-[9px] text-stone-500 font-serif">
                <button 
                  onClick={() => turnToPage(0)} 
                  className="text-amber-800 font-sans font-bold hover:underline cursor-pointer"
                >
                  ◄ Table of Contents
                </button>
                <span>Page 16 • Contact & Back Cover</span>
              </div>
            </div>
          </Page>

        </HTMLFlipBook>
      </div>

      {/* Bottom navigation hint bar */}
      <div className="text-center mt-3 text-xs text-stone-500 flex items-center justify-center gap-2">
        <span>{language === "si" ? "පිටුවක් පෙරලීමට ඊතල හෝ පිටුවේ කොන ක්ලික් කරන්න" : "Click page corners or arrow buttons to turn pages"}</span>
        <span className="hidden sm:inline text-stone-400">•</span>
        <span className="hidden sm:inline">{language === "si" ? "යතුරුපුවරුවේ ◄ ► භාවිතා කළ හැක" : "Keyboard ◄ ► supported"}</span>
      </div>
    </div>
  );
}

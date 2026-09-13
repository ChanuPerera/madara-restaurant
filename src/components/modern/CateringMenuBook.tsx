"use client";

import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
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
  CheckCircle2
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

  // Structured Table of Contents categories
  const tocSections = [
    {
      category: language === "si" ? "සාද මෙනු" : "Party Menus",
      items: [
        { num: "01", name: "Menu 01 — Classic Menu", price: "Rs. 800/=", page: 2 },
        { num: "02", name: "Menu 02 — Special Menu", price: "Rs. 950/=", page: 3 },
        { num: "03", name: "Menu 03 — Sri Lankan Menu", price: "Rs. 950/=", page: 4 },
      ]
    },
    {
      category: language === "si" ? "බණ හා දානමය මෙනු" : "Bana / Alms-Giving",
      items: [
        { num: "04", name: "Menu 01 — Tradition Bana Menu", price: "Rs. 700/=", page: 5 },
        { num: "05", name: "Menu 02 — Fish Menu", price: "Rs. 800 - 1,000/=", page: 6 },
        { num: "06", name: "Menu 03 — Special Bana Menu", price: "Rs. 1,100/=", page: 7 },
      ]
    },
    {
      category: language === "si" ? "අවමංගල්‍ය හා මල බත මෙනු" : "Funeral & Mala Batha",
      items: [
        { num: "07", name: "Funeral 01 — Traditional Menu", price: "Rs. 550/=", page: 8 },
        { num: "08", name: "Funeral 02 — Chicken Menu", price: "Rs. 550/=", page: 9 },
        { num: "09", name: "Mala Batha 01 — Basic Menu", price: "Rs. 490/=", page: 10 },
        { num: "10", name: "Mala Batha 02 — Special Menu", price: "Rs. 1,050/=", page: 11 },
      ]
    },
    {
      category: language === "si" ? "විශේෂ සේවාවන් හා ඇමතුම්" : "Special Services & Contact",
      items: [
        { num: "11", name: "100% Custom Tailored Menu", price: "Custom", page: 12 },
        { num: "12", name: "Live Action Wok & BBQ Stations", price: "Live", page: 13 },
        { num: "13", name: "Buffet Setup & Artisanal Desserts", price: "Extras", page: 14 },
        { num: "14", name: "Catering Standards & Inclusions", price: "Info", page: 15 },
        { num: "15", name: "Homagama Catering Desk & Hotline", price: "Contact", page: 16 },
      ]
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
      `}</style>
      
      {/* Light Bar Top Controls */}
      <div className="w-full flex items-center justify-between mb-4 px-3">
        <div className="flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-amber-700" />
          <span className="font-serif font-bold text-stone-800 text-sm">
            {language === "si" ? "මාදාරා කේටරින් මෙනු සංග්‍රහය" : "Madara Catering Menu Book"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-700">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 transition-colors shadow-xs"
            title={soundEnabled ? "Mute Flip Sound" : "Enable Flip Sound"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
            <span className="hidden sm:inline font-medium">
              {soundEnabled ? "Sound ON" : "Sound OFF"}
            </span>
          </button>

          <span className="font-semibold text-amber-900 bg-amber-100/80 px-3 py-1.5 rounded-full border border-amber-200">
            {isMobile
              ? language === "si"
                ? `පිටුව ${currentPage + 1} / ${TOTAL_PAGES}`
                : `Page ${currentPage + 1} of ${TOTAL_PAGES}`
              : language === "si"
                ? `පිටුව ${currentPage + 1}-${Math.min(currentPage + 2, TOTAL_PAGES)} / ${TOTAL_PAGES}`
                : `Pages ${currentPage + 1}-${Math.min(currentPage + 2, TOTAL_PAGES)} of ${TOTAL_PAGES}`}
          </span>
        </div>
      </div>

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
          {/* PAGE 1: TABLE OF CONTENTS */}
          <Page>
            <div className="w-full h-full flex flex-col justify-between font-sans p-3">
              <div className="border-b border-amber-900/15 pb-2">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-800 block">
                  MADARA CATERING
                </span>
                <h3 className="font-serif font-extrabold text-stone-900 text-xl sm:text-2xl tracking-tight">
                  {language === "si" ? "මෙනු පටුන" : "Table of Contents"}
                </h3>
              </div>

              <div className="space-y-2.5 my-auto py-1">
                {tocSections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-900/80 block border-b border-amber-900/10 pb-0.5">
                      {section.category}
                    </span>
                    <div className="space-y-0.5">
                      {section.items.map((item) => (
                        <button
                          key={item.num}
                          onClick={() => turnToPage(item.page - 1)}
                          className="w-full flex items-center justify-between py-0.5 px-1 rounded hover:bg-amber-100/60 text-left transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <span className="text-[10px] font-mono font-bold text-amber-800 group-hover:text-amber-950 w-4">
                              {item.num}
                            </span>
                            <span className="text-[11px] font-medium text-stone-800 group-hover:text-stone-950 truncate">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
                            <span className="text-[10px] font-semibold text-stone-500">
                              {item.price}
                            </span>
                            <span className="text-[9px] font-mono text-amber-800 group-hover:underline">
                              p.{item.page}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 1 • Table of Contents
              </div>
            </div>
          </Page>

          {/* PAGE 2: BIRTHDAY / CORPORATE / SMALL PARTY — MENU 01 */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Rice Spread" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.chickenDevel} alt="Chicken Devel" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-right pl-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  PARTY MENU 01
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Classic Menu
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Rs. 800/= per person
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 2 • Birthday / Party Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 3: BIRTHDAY / CORPORATE / SMALL PARTY — MENU 02 */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.noodles} alt="Noodles Spread" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.chickenDrumsticks} alt="Chilli Chicken" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-left pr-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  PARTY MENU 02
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Special Menu
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Rs. 950/= per person
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 3 • Birthday / Party Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 4: BIRTHDAY / CORPORATE / SMALL PARTY — MENU 03 */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.yellowRice} alt="Yellow Rice" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.cutlet} alt="Cutlet" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-right pl-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  PARTY MENU 03
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Sri Lankan Menu
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Rs. 950/= per person
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 4 • Birthday / Party Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 5: BANA / ALMS-GIVING — MENU 01 */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.stringHoppers} alt="String Hoppers" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-left pr-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  BANA MENU 01
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Tradition Bana Menu
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Rs. 700/= per person
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 5 • Bana / Alms-Giving • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 6: BANA / ALMS-GIVING — MENU 02 */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.fishCurry} alt="Fish Ambul Thiyal" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Country Red Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-right pl-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  BANA MENU 02
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Fish Menu
                </h2>
                {/* 3 Fish Price Options */}
                <div className="flex flex-col items-end gap-0.5 mt-0.5 text-[10px] font-bold text-amber-950">
                  <span className="bg-amber-100/90 px-2 py-0.5 rounded">Bala Fish — Rs. 800/=</span>
                  <span className="bg-amber-100/90 px-2 py-0.5 rounded">Tuna Fish — Rs. 950/=</span>
                  <span className="bg-amber-100/90 px-2 py-0.5 rounded">Thalapath Fish — Rs. 1,000/=</span>
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 6 • Bana / Alms-Giving • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 7: BANA / ALMS-GIVING — MENU 03 */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.friedRice} alt="Fried Rice" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.chickenDevel} alt="Fried Chicken Curry" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-left pr-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  BANA MENU 03
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Special Bana Menu
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Rs. 1,100/= per person
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 7 • Bana / Alms-Giving • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 8: FUNERAL MENUS — MENU 01 */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.fishCurry} alt="Linna Fish" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-right pl-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  FUNERAL MENU 01
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Traditional Menu
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Rs. 550/= per person
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 8 • Funeral Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 9: FUNERAL MENUS — MENU 02 */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.chickenDrumsticks} alt="Chicken Curry" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-left pr-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  FUNERAL MENU 02
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Chicken Menu
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Rs. 550/= per person
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 9 • Funeral Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 10: MALA BATHA MENUS — MENU 01 */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.fishCurry} alt="Katta Karawala" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Steamed Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-right pl-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  MALA BATHA 01
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Basic Menu
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Rs. 490/= per person
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 10 • Mala Batha Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 11: MALA BATHA MENUS — MENU 02 */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.fishCurry} alt="Katta Karawala & Ambul Thiyal" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Rice Spread" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-left pr-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  MALA BATHA 02
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Special Menu
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Rs. 1,050/= per person
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 11 • Mala Batha Menus • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 12: 100% CUSTOM TAILORED MENU */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.seafood} alt="Seafood" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.bbqGrill} alt="BBQ" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-right pl-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  CHEF SPECIAL
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Custom Menu
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Tailored Pricing
                </div>
              </div>

              <div className="space-y-2.5 my-auto py-1 pr-1">
                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between">
                    <span>Biryani & Ghee Rice Spread</span>
                    <span className="text-amber-700 text-[11px] font-semibold">Custom</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Hyderabad mutton/chicken dum biryani, fragrant ghee rice, or Mongolian wok fried rice.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between">
                    <span>Seafood & Meat Specialties</span>
                    <span className="text-amber-700 text-[11px] font-semibold">Custom</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Garlic butter prawns, spicy Jaffna crab, cuttlefish black curry, & devilled mutton.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between">
                    <span>Vegetarian Delicacies</span>
                    <span className="text-amber-700 text-[11px] font-semibold">Custom</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Cashew nut & green pea curry, paneer butter masala, polos maluwa, & tempered dhal.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between">
                    <span>Chef Consultation</span>
                    <span className="text-amber-700 text-[11px] font-semibold">Free</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Direct one-on-one menu planning with our Executive Chef based on your exact budget.
                  </p>
                </div>
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 12 • Tailored Catering • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 13: LIVE ACTION STATIONS */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.bbqGrill} alt="Charcoal BBQ" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.kottu} alt="Cheese Kottu" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-left pr-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  ON-SITE COOKING
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Live Stations
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Event Add-Ons
                </div>
              </div>

              <div className="space-y-3 my-auto py-1 pl-1">
                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-700" />
                      Live Mongolian Wok
                    </span>
                    <span className="text-amber-700 text-[11px] font-semibold">Live Add-On</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    High-flame live wok chef tossing custom noodles, basmati rice, crispy vegetables, and meats.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-700" />
                      Charcoal BBQ Grills
                    </span>
                    <span className="text-amber-700 text-[11px] font-semibold">Live Add-On</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Sizzling chicken drumsticks, seasoned pork skewers, garlic butter prawns, & sausages.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-700" />
                      Cheese Kottu Bar
                    </span>
                    <span className="text-amber-700 text-[11px] font-semibold">Live Add-On</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Traditional clattering rotti chopped live with spicy gravy and rich melted cheddar.
                  </p>
                </div>
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 13 • Live Cooking Stations • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 14: BUFFET SETUP & DESSERTS */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.warmer} alt="Chafing Warmers" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.dessert} alt="Desserts" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-right pl-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  ALL-INCLUSIVE BUFFET
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Buffet Extras
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Setup & Sweets
                </div>
              </div>

              <div className="space-y-3 my-auto py-1 pr-1">
                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <UtensilsCrossed className="w-3.5 h-3.5 text-amber-700" />
                      Roll-Top Chafing Warmers
                    </span>
                    <span className="text-amber-700 text-[11px] font-semibold">FREE Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Stainless steel roll-top warmers, serving spoons, porcelain plates, & serviettes.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      Welcome Drinks Bar
                    </span>
                    <span className="text-amber-700 text-[11px] font-semibold">Add-On</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Chilled passion fruit cordial, iced lime-mint splash, and sweet rose falooda with basil seeds.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      Artisanal Desserts
                    </span>
                    <span className="text-amber-700 text-[11px] font-semibold">Add-On</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Authentic jaggery watalappam, smooth caramel pudding, and fresh fruit salad with vanilla ice cream.
                  </p>
                </div>
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 14 • Buffet Amenities • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 15: QUALITY & SERVICE STANDARDS */}
          <Page>
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-left pt-0.5 border-b border-amber-900/15 pb-2">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  BANQUET SERVICE ASSURANCE
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Hospitality Standards
                </h2>
                <p className="text-[10px] text-stone-600 mt-0.5">
                  Our core quality and service commitments for every event
                </p>
              </div>

              <div className="space-y-2.5 my-auto py-1">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100/90 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">100% Quality & Hygiene Standard</h4>
                    <p className="text-[10px] text-stone-600 leading-relaxed mt-0.5">
                      Strict temperature control, certified food handling, and fresh produce sourced daily.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100/90 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Punctual On-Site Setup Guarantee</h4>
                    <p className="text-[10px] text-stone-600 leading-relaxed mt-0.5">
                      Our catering van arrives up to 2 hours prior to ensure food is piping hot and ready.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100/90 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Uniformed Stewards & Coordination</h4>
                    <p className="text-[10px] text-stone-600 leading-relaxed mt-0.5">
                      Dedicated service stewards manage the buffet lines, replenishing dishes seamlessly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100/90 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Flexible Pax Minimums</h4>
                    <p className="text-[10px] text-stone-600 leading-relaxed mt-0.5">
                      Standard package orders starting from 35 guests, with custom packages scalable to 1,000+.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 15 • Quality Standards • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 16: HOMAGAMA CATERING DESK & CONTACT */}
          <Page>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-52 h-52 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.welcomeDrink} alt="Welcome Drink" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0 opacity-25 pointer-events-none">
              <img src={FOOD_IMAGES.riceSpread} alt="Catering Desk" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10 p-3">
              <div className="text-right pl-28 pt-0.5">
                <span className="text-[9px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  HOMAGAMA CATERING DESK
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-xl sm:text-2xl tracking-tight leading-tight">
                  Direct Contact
                </h2>
                <div className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-950 font-bold text-xs">
                  Booking & Consultations
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
                      WhatsApp Inquiry Line
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

              <div className="pt-1.5 border-t border-amber-900/15 text-[9px] text-stone-500 text-center font-serif">
                Page 16 • Contact & Location • Madara Restaurant
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

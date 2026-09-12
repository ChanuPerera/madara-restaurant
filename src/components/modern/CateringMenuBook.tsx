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
  BookMarked
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

// High-resolution food images for realistic round platters & cutouts
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

export default function CateringMenuBook() {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const bookRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Soft paper flip sound
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

  // Table of Contents items inside Page 1
  const tocItems = [
    { num: "01", titleEn: "Classic Party Feast", titleSi: "ක්ලැසික් සාද මෙනුව", page: 2 },
    { num: "02", titleEn: "Special Party Feast", titleSi: "ස්පෙෂල් සාද මෙනුව", page: 3 },
    { num: "03", titleEn: "Sri Lankan Heritage Spread", titleSi: "දේශීය සාද මෙනුව", page: 4 },
    { num: "04", titleEn: "Traditional Bana Dane", titleSi: "දානමය මෙනුව", page: 5 },
    { num: "05", titleEn: "Sacred Fish Dane Feast", titleSi: "මත්ස්‍ය දානමය මෙනුව", page: 6 },
    { num: "06", titleEn: "Comfort Funeral Wake", titleSi: "අවමංගල්‍ය මෙනුව", page: 7 },
    { num: "07", titleEn: "Traditional Mala Batha", titleSi: "පාරම්පරික මල බත", page: 8 },
    { num: "08", titleEn: "100% Custom Tailored Menu", titleSi: "ඔබට අවශ්‍ය පරිදි මෙනු", page: 9 },
    { num: "09", titleEn: "Live Action Wok & BBQ", titleSi: "සජීවී මොන්ගෝලියන් කුටි", page: 10 },
    { num: "10", titleEn: "Buffet Setup & Desserts", titleSi: "බුෆේ, බීම හා අතුරුපස", page: 11 },
    { num: "11", titleEn: "Contact & Location", titleSi: "ඇමතුම් හා විස්තර", page: 12 },
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
          justify-space: space-between;
          padding: 18px;
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
            {language === "si" ? "මාදාරා කේටරින් මෙනු සංග්‍රහය" : "Madara Event Menu Catalog"}
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
            {language === "si"
              ? `පිටුව ${currentPage + 1}-${currentPage + 2} / 12`
              : `Pages ${currentPage + 1}-${Math.min(currentPage + 2, 12)} of 12`}
          </span>
        </div>
      </div>

      {/* Main Flipbook Stage Container */}
      <div className="relative w-full flex justify-center items-center py-2 min-h-[550px]">

        {/* Left Navigation Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-stone-300 text-stone-800 flex items-center justify-center transition-all ${
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
          disabled={currentPage >= 10}
          className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-stone-300 text-stone-800 flex items-center justify-center transition-all ${
            currentPage >= 10
              ? "opacity-20 cursor-not-allowed"
              : "hover:scale-110 hover:bg-amber-600 hover:text-white cursor-pointer shadow-lg"
          }`}
          aria-label="Next Page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* HTMLFlipBook Component - Always open to 2-page spread starting on Page 1 (TOC) */}
        <HTMLFlipBook
          ref={bookRef}
          width={370}
          height={520}
          size="fixed"
          minWidth={300}
          maxWidth={450}
          minHeight={450}
          maxHeight={600}
          maxShadowOpacity={0.4}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={handlePageFlip}
          className="mx-auto"
          style={{ margin: "0 auto" }}
          startPage={0}
          drawShadow={true}
          flippingTime={650}
          usePortrait={false}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* PAGE 1: TABLE OF CONTENTS (Inside Book Left Page) */}
          <Page>
            <div className="w-full h-full flex flex-col justify-between font-sans">
              <div className="border-b border-amber-900/15 pb-3">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-800">
                  MADARA CATERING
                </span>
                <h3 className="font-serif font-extrabold text-stone-900 text-2xl tracking-tight mt-0.5">
                  {language === "si" ? "මෙනු පටුන" : "Table of Contents"}
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {language === "si" ? "පිටුවකට යාමට ක්ලික් කරන්න" : "Click any section to open page"}
                </p>
              </div>

              <div className="space-y-1.5 my-auto py-2">
                {tocItems.map((item) => (
                  <button
                    key={item.num}
                    onClick={() => turnToPage(item.page - 1)}
                    className="w-full flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-amber-100/50 text-left transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="text-xs font-mono font-bold text-amber-800 group-hover:text-amber-950">
                        {item.num}
                      </span>
                      <span className="text-xs font-bold text-stone-800 group-hover:text-stone-950 truncate">
                        {language === "si" ? item.titleSi : item.titleEn}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-amber-900/70 group-hover:text-amber-900 flex-shrink-0 ml-2">
                      Pg {item.page}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 1 • Table of Contents
              </div>
            </div>
          </Page>

          {/* PAGE 2: CLASSIC PARTY FEAST */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Left Corner Bleed) */}
            <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.riceSpread} alt="Fried Rice Platter" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Right Corner Bleed) */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.chickenDevel} alt="Spicy Chicken" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-right pl-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  PARTY MENU 01
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Classic Feast
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pr-2">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Keeri Samba Fried Rice</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">LKR 800</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Fragrant keeri samba rice wok-tossed with fresh eggs, scallions, and signature spices.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Spicy Chicken Devel</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Crispy chicken chunks tossed with bell peppers, onions, and fiery sweet-chilli glaze.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Hot Butter Mushroom</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Golden button mushrooms flash-fried in garlic butter and crushed red chili flakes.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Vegetable Chopsy</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Garden-fresh carrots, cabbage, baby corn, and beans wok-seared in light soy glaze.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Crispy Fish Cutlets</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Breaded tuna croquettes spiced with black pepper and roasted island herbs.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 2 • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 3: SPECIAL PARTY FEAST */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Right Corner Bleed) */}
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.noodles} alt="Wok Noodles Platter" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Left Corner Bleed) */}
            <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.chickenDrumsticks} alt="Grilled Chicken" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-left pr-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  PARTY MENU 02
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Special Feast
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pl-2">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Egg Rice & Noodles</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">LKR 950</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Dual main spread of seasoned egg fried rice and wok-tossed egg noodles with scallions.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Spicy Chilli Chicken</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Succulent chicken chunks sauteed with capsicum, tomatoes, and rich chili glaze.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Potato Baji & Moju</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Deep-fried sweet & sour eggplant moju paired with spiced potato temper.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Mixed Vegetables</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Sautéd seasonal vegetables with garlic, ginger, and aromatic house seasonings.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Fish Cutlets & Sambal</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Crispy tuna cutlets accompanied by crunchy caramelized onion and Maldive fish sambal.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 3 • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 4: SRI LANKAN HERITAGE SPREAD */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Left Corner Bleed) */}
            <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.yellowRice} alt="Yellow Rice Platter" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Right Corner Bleed) */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.riceSpread} alt="Curry Spread" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-right pl-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  PARTY MENU 03
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Heritage Spread
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pr-2">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Fragrant Yellow Rice</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">LKR 950</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Basmati rice cooked in coconut milk, turmeric, cardamom, cloves, and ghee.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Rich Chicken Kuruma</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Slow-cooked chicken in thick coconut cream gravy infused with roasted island spices.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Brinjal Moju & Salad</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Authentic sweet-tangy eggplants with green chillies and fresh garden salad.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Dhaal & Potato Temper</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Creamy red lentils tempered with mustard seeds and spicy potato aloo.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Fish Cutlets & Papadam</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Traditional Sri Lankan spicy fish cutlets served with crunchy papadam.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 4 • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 5: TRADITIONAL BANA DANE */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Right Corner Bleed) */}
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.stringHoppers} alt="String Hoppers" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Left Corner Bleed) */}
            <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.riceSpread} alt="Country Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-left pr-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  BANA MENU 01
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Traditional Dane
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pl-2">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Red & White Rice</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">LKR 700</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Nutritious Sri Lankan country red rice and fluffy steamed white rice.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Fresh String Hoppers</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Soft, freshly steamed rice flour string hoppers served hot.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Chicken Red Curry</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Traditional Sri Lankan red chicken curry simmered in roasted spices.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Seeni & Pol Sambal</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Sweet caramelized onion seeni sambal and fresh coconut pol sambal.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Dhaal & Green Beans</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Tempered yellow lentil dhaal curry and fresh green bean curry.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 5 • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 6: SACRED FISH DANE FEAST */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Left Corner Bleed) */}
            <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.fishCurry} alt="Fish Ambul Thiyal" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Right Corner Bleed) */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.riceSpread} alt="Country Red Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-right pl-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  BANA MENU 02
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Sacred Fish Dane
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pr-2">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Fish Ambul Thiyal</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">LKR 800-1000</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Goraka-blackened sour fish cooked in claypot (Bala, Tuna, or Thalapath).
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Country Red & White Rice</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Healthy indigenous red rice and polished white rice.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Dhaal & Bean Curry</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Rich yellow dhaal curry and fresh long beans tempered with coconut cream.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Potato Tempered</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Spiced potatoes sauteed with dried chillies, onions, and mustard seeds.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Gotukola Cashew Sambal</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Crispy gotukola leaves tossed with roasted cashews and lime dressing.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 6 • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 7: COMFORT FUNERAL WAKE */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Right Corner Bleed) */}
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.fishCurry} alt="Linna Fish Curry" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Left Corner Bleed) */}
            <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.yellowRice} alt="Comfort White Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-left pr-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-stone-600 block">
                  MEMORIAL WAKE
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Comfort Wake
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pl-2">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Linna Fish Curry</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">LKR 550</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Fresh Linna fish simmered in thick roasted coconut curry gravy.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">White & Red Rice</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Hot steamed white rice and wholesome country red rice.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Dhaal & Potato Temper</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Homestyle red lentil curry and spicy tempered potatoes.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Long Bean Curry</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Tender long beans cooked in mild coconut milk.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Kos / Mannyok Mallum</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Traditional jackfruit or manioc mallum with shredded coconut.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 7 • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 8: TRADITIONAL MALA BATHA */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Left Corner Bleed) */}
            <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.fishCurry} alt="Katta Karawala Curry" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Right Corner Bleed) */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.riceSpread} alt="Steamed Rice" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-right pl-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-stone-600 block">
                  TRADITIONAL MEMORIAL
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Mala Batha
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pr-2">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Steamed White Rice</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">LKR 490</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Warm, fluffy white rice cooked to perfection.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Katta Karawala Curry</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Deep-flavored dry fish karawala curry cooked with onions and chillies.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Village Wattakka Curry</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Sweet pumpkin wattakka curry in creamy coconut gravy.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Fresh Cucumber Salad</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Refreshing sliced cucumber salad with green chillies and lime juice.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Beans & Papadam</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Included</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Spicy tempered green beans accompanied by crunchy papadam.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 8 • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 9: 100% CUSTOM TAILORED MENU */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Right Corner Bleed) */}
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.seafood} alt="Seafood Platter" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Left Corner Bleed) */}
            <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.bbqGrill} alt="Charcoal BBQ Grill" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-left pr-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  CHEF SPECIAL
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Custom Feast
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pl-2">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Custom Biryani & Ghee Rice</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Custom</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Hyderabad dum biryani, fragrant ghee rice, or Mongolian wok fried rice.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Seafood & Meat Specialties</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Custom</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Garlic butter prawns, cuttlefish black curry, & devilled mutton.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Live Wok & BBQ Stations</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Custom</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    On-site live action wok and charcoal BBQ setups for large gatherings.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Artisanal Desserts</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Custom</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Watalappam, caramel pudding, fruit platters, & ice cream bars.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 9 • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 10: LIVE ACTION STATIONS */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Left Corner Bleed) */}
            <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.bbqGrill} alt="Charcoal BBQ Grill" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Right Corner Bleed) */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.kottu} alt="Cheese Kottu" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-right pl-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  ON-SITE LIVE COOKING
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Live Action
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pr-2">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Live Mongolian Wok</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Live Add-On</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    High-flame live wok chef tossing custom rice, noodles, veggies, and meats.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Charcoal BBQ Grills</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Live Add-On</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Sizzling grilled chicken drumsticks, sausages, and sweet corn on skewers.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Cheese Kottu Bar</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Live Add-On</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Hand-clattered kottu rotti chopped live with molten cheddar cheese.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 10 • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 11: BUFFET SETUP & DESSERTS */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Right Corner Bleed) */}
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.warmer} alt="Chafing Warmers" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Left Corner Bleed) */}
            <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.dessert} alt="Artisan Desserts" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-left pr-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  ALL-INCLUSIVE BUFFET
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Buffet Extras
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pl-2">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Roll-Top Warmers</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">FREE</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Heavy-duty stainless steel chafing warmers & porcelain tableware.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Welcome Drink Bar</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Add-On</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Chilled passion fruit cordial, iced lime-mint coolers, & rose falooda.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="tracking-tight">Artisanal Desserts</span>
                    <span className="text-stone-950 font-serif font-bold text-xs sm:text-sm">Add-On</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Jaggery watalappam, caramel pudding, & fresh fruit salad with ice cream.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 11 • Madara Catering
              </div>
            </div>
          </Page>

          {/* PAGE 12: CONTACT & LOCATION */}
          <Page>
            {/* Halftone Dot Matrix Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Big Round Food Cutout Platter (Top Left Corner Bleed) */}
            <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.welcomeDrink} alt="Welcome Drink" className="w-full h-full object-cover" />
            </div>

            {/* Second Food Cutout Platter (Bottom Right Corner Bleed) */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 border-amber-100/80 z-0">
              <img src={FOOD_IMAGES.riceSpread} alt="Catering Desk" className="w-full h-full object-cover" />
            </div>

            <div className="w-full h-full flex flex-col justify-between relative z-10">
              <div className="text-right pl-36 pt-1">
                <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-900 block">
                  HOMAGAMA CATERING DESK
                </span>
                <h2 className="font-serif italic font-extrabold text-amber-600 text-2xl sm:text-3xl tracking-tight leading-none mt-0.5">
                  Madara Desk
                </h2>
              </div>

              <div className="space-y-3 my-auto py-2 pr-2">
                <div>
                  <div className="flex items-center justify-between font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-700" />
                      Direct Catering Hotline
                    </span>
                    <span className="text-stone-950 font-serif font-bold text-xs">Call Us</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    {RESTAURANT_INFO.phoneFormatted} / {RESTAURANT_INFO.secondaryPhoneFormatted}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      Restaurant Address
                    </span>
                    <span className="text-stone-950 font-serif font-bold text-xs">Homagama</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5 line-clamp-2">
                    {RESTAURANT_INFO.address}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between font-bold text-stone-900 text-xs sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      Operating Hours
                    </span>
                    <span className="text-stone-950 font-serif font-bold text-xs">Daily</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans mt-0.5">
                    Open 7 days a week from 6:30 AM – 10:30 PM for consultations.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-900/15 text-[10px] text-stone-500 text-center font-serif">
                Page 12 • Contact & Location
              </div>
            </div>
          </Page>

        </HTMLFlipBook>
      </div>

      {/* Bottom hint text */}
      <div className="text-center mt-3 text-xs text-stone-500 flex items-center justify-center gap-2">
        <span>{language === "si" ? "පිටුවක් පෙරලීමට ඊතල හෝ පිටුවේ කොන ක්ලික් කරන්න" : "Click page corners or arrow buttons to turn pages"}</span>
        <span className="hidden sm:inline text-stone-400">•</span>
        <span className="hidden sm:inline">{language === "si" ? "යතුරුපුවරුවේ ◄ ► භාවිතා කළ හැක" : "Keyboard ◄ ► supported"}</span>
      </div>
    </div>
  );
}

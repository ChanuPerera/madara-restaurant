"use client";

import React, { useState } from "react";
import Link from "next/link";
import OrLogo from "@/assets/orlogo-01.png";
import HeroImg1 from "@/assets/hero/1.png";
import HeroImg2 from "@/assets/hero/2.png";
import HeroImg3 from "@/assets/hero/3.png";
import HeroImg4 from "@/assets/hero/4.png";
import HeroImg5 from "@/assets/hero/5.png";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  MessageCircle, 
  Phone, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  UtensilsCrossed
} from "lucide-react";

interface MenuItem {
  id: string;
  titleEn: string;
  titleSi: string;
  subtitleEn: string;
  subtitleSi: string;
  descEn: string;
  descSi: string;
  priceEn: string;
  priceSi: string;
  image: string;
  plateImage: string;
  categoryEn: string;
  categorySi: string;
  href: string;
}

const HERO_MENU_ITEMS: MenuItem[] = [
  {
    id: "restaurant_dining",
    titleEn: "RESTAURANT DINING",
    titleSi: "ආපනශාලා භෝජන",
    subtitleEn: "Warm Ambiance & Family Dining in Homagama",
    subtitleSi: "හෝමාගම පවුලේ රුචිකත්වයට සුපිරි භෝජන",
    descEn: "Experience premium dine-in hospitality with authentic Sri Lankan & fusion cuisine in a comfortable family atmosphere.",
    descSi: "පවුලේ සැමට එකට එක්ව රසවිඳිය හැකි සුපිරි ආපනශාලා පරිසරය සහ ප්‍රණීත ආහාර වේලක්.",
    priceEn: "Dine-In Daily",
    priceSi: "දිනපතා ආපනශාලාවෙන්",
    image: HeroImg1.src,
    plateImage: HeroImg1.src,
    categoryEn: "Restaurant Dining",
    categorySi: "ආපනශාලා භෝජන",
    href: "/",
  },
  {
    id: "take_away",
    titleEn: "TAKE AWAY",
    titleSi: "රැගෙන යාමේ ආහාර",
    subtitleEn: "Piping Hot Packed Meals & Quick Pickup",
    subtitleSi: "කඩිනමින් පැකට් කළ ප්‍රණීත ආහාර",
    descEn: "Quick, fresh, and hygienically packed lunch boxes and dinner takeaway meals ready for pickup.",
    descSi: "නියමිත වෙලාවට උණුසුම්ව සහ පිරිසිදුව පැකට් කළ රසවත් කෑම පාර්සල් කවුන්ටරයෙන්.",
    priceEn: "Fast Pickup",
    priceSi: "කඩිනම් කවුන්ටරයෙන්",
    image: HeroImg2.src,
    plateImage: HeroImg2.src,
    categoryEn: "Take Away Service",
    categorySi: "ටේක් අවේ",
    href: "/",
  },
  {
    id: "event_catering",
    titleEn: "EVENT CATERING",
    titleSi: "උත්සව කේටරින්",
    subtitleEn: "Weddings, Birthdays & Ceremonial Buffets",
    subtitleSi: "සාද, බණ හා මල බත මෙනු පැකේජ",
    descEn: "Full-scale banquet catering with warm chafing dishes, chinaware, and experienced steward service for 35+ guests.",
    descSi: "උණුසුම් බුෆේ උපකරණ, පෝසිලේන් පිඟන් සහ පළපුරුදු වේටර් සේවාව සමඟ අසමසම කේටරින් සංග්‍රහය.",
    priceEn: "From Rs. 490/=",
    priceSi: "රු. 490/= සිට",
    image: HeroImg3.src,
    plateImage: HeroImg3.src,
    categoryEn: "Banquet Catering",
    categorySi: "කේටරින් සේවාව",
    href: "/catering-menu",
  },
  {
    id: "corporate_meals",
    titleEn: "CORPORATE MEALS",
    titleSi: "ආයතනික කෑම",
    subtitleEn: "Office Lunch Boxes & Executive Buffets",
    subtitleSi: "කාර්යාලීය ආහාර පාර්සල් හා බුෆේ",
    descEn: "Tailored daily office lunch packs, conference meals, and executive corporate buffet setups.",
    descSi: "කාර්යාලීය දිවා ආහාර, රැස්වීම් සහ ආයතනික උත්සව සඳහා විශේෂිත මෙනු පැකේජ.",
    priceEn: "Custom Pax Rates",
    priceSi: "ආයතනික මිල ගණන්",
    image: HeroImg4.src,
    plateImage: HeroImg4.src,
    categoryEn: "Corporate Service",
    categorySi: "ආයතනික සේවාවන්",
    href: "/catering-menu",
  },
  {
    id: "food_delivery",
    titleEn: "FOOD DELIVERY",
    titleSi: "ආහාර බෙදාහැරීම",
    subtitleEn: "Doorstep Delivery across Homagama & Suburbs",
    subtitleSi: "ඔබේ නිවසටම කඩිනමින් ගෙනත් දීම",
    descEn: "Enjoy freshly prepared gourmet meals delivered hot directly to your home or office doorstep.",
    descSi: "උණුසුම්ව සහ ආරක්ෂිතව ඔබේ නිවසටම හෝ කාර්යාලයටම ආහාර ගෙනැවිත් දීමේ සේවාව.",
    priceEn: "Doorstep Express",
    priceSi: "නිවසටම බෙදාහැරීම",
    image: HeroImg5.src,
    plateImage: HeroImg5.src,
    categoryEn: "Delivery Service",
    categorySi: "බෙදාහැරීමේ සේවාව",
    href: "/",
  },
];

export default function ModernHero() {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState<string>("restaurant_dining");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const activeItem = HERO_MENU_ITEMS.find((item) => item.id === activeId) || HERO_MENU_ITEMS[0];

  const handleSelectDish = (id: string) => {
    if (id === activeId) return;
    setIsTransitioning(true);
    setActiveId(id);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const getWhatsAppUrl = (serviceTitle: string) => {
    const text =
      language === "si"
        ? `ආයුබෝවන් Madara Restaurant! මට ${serviceTitle} සේවාව පිළිබඳ තොරතුරු දැනගැනීමට අවශ්‍යයි.`
        : `Hi Madara Restaurant! I am interested in inquiring about ${serviceTitle}.`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-[#F4F3EF] text-stone-900 overflow-hidden flex flex-col justify-between pt-20 pb-12 select-none">
      
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-400/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-orange-400/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
        
        {/* Perfectly Balanced 3-Column Layout: Left (4 cols) | Center Dish (4 cols) | Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Clear Static Title ("MADARA CATERING") & Dynamic Selection Metadata */}
          <div className="lg:col-span-4 z-20 space-y-5 text-center lg:text-left">
            
            {/* Clear, Simple Static Headline Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-stone-900 tracking-tight leading-[0.95] uppercase">
                {language === "si" ? (
                  <>
                    මඩර <br />
                    <span className="text-amber-600">කේටරින්</span>
                  </>
                ) : (
                  <>
                    MADARA <br />
                    <span className="text-amber-600">CATERING</span>
                  </>
                )}
              </h1>
            </div>

            {/* Dynamic Selected Item Title & Subtitle Accent */}
            <div className={`space-y-1 pt-1 transition-all duration-500 ${
              isTransitioning ? "opacity-30 translate-y-1" : "opacity-100 translate-y-0"
            }`}>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="w-6 h-0.5 bg-amber-500 block flex-shrink-0" />
                <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-stone-900">
                  {language === "si" ? activeItem.titleSi : activeItem.titleEn}
                </h2>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 pl-8">
                {language === "si" ? activeItem.subtitleSi : activeItem.subtitleEn}
              </p>
            </div>

            {/* Paragraph Description */}
            <p className={`text-xs sm:text-sm text-stone-600 leading-relaxed font-normal max-w-sm mx-auto lg:mx-0 transition-all duration-500 ${
              isTransitioning ? "opacity-30 translate-y-1" : "opacity-100 translate-y-0"
            }`}>
              {language === "si" ? activeItem.descSi : activeItem.descEn}
            </p>

            {/* Direct Action Links */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href={getWhatsAppUrl(activeItem.titleEn)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md shadow-[#25D366]/20 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>WhatsApp Inquiry</span>
              </a>

              <Link
                href="/catering-menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span>Catering Menu</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>

          </div>

          {/* CENTER COLUMN: 100% HORIZONTALLY CENTERED Rotating 360-Degree Dish Plate */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-4 lg:py-0 mx-auto w-full z-10">
            
            {/* Circular Plate Container */}
            <div className="relative group flex flex-col items-center justify-center">
              {/* Soft Ambient Radial Blur */}
              <div className="absolute inset-0 rounded-full blur-3xl transform scale-110 pointer-events-none" />

              {/* Perfectly Centered Circular Plate */}
              <div className={`relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[410px] lg:h-[410px] rounded-full shadow-[0_30px_75px_-15px_rgba(0,0,0,0.22)] transition-all duration-700 ease-out mx-auto ${
                isTransitioning ? "scale-90 opacity-40 rotate-12" : "scale-100 opacity-100 rotate-0"
              }`}>
                
                {/* 360-Degree Continuous Slow Rotating Loop Image */}
                <div className="w-full h-full rounded-full overflow-hidden animate-[spin_55s_linear_infinite]">
                  <img
                    src={activeItem.plateImage}
                    alt={activeItem.titleEn}
                    className="w-full h-full rounded-full object-cover transform scale-110"
                  />
                </div>

              </div>

              {/* Price & Service Tag Badge on Plate */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-stone-200/80 text-[11px] font-extrabold text-stone-900 uppercase tracking-wider">
                {language === "si" ? activeItem.priceSi : activeItem.priceEn}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Vertical Pill Menu Stack */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center max-w-md mx-auto lg:max-w-none w-full z-20">
            
            <div className="hidden lg:flex items-center justify-between px-2 pb-1 text-xs font-bold uppercase tracking-wider text-stone-400">
              <span>{language === "si" ? "අපගේ ප්‍රධාන සේවාවන්" : "Our Featured Services"}</span>
              <span>0{HERO_MENU_ITEMS.findIndex((i) => i.id === activeId) + 1} / 0{HERO_MENU_ITEMS.length}</span>
            </div>

            {HERO_MENU_ITEMS.map((item) => {
              const isActive = item.id === activeId;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectDish(item.id)}
                  className={`group relative rounded-[36px] p-3 pr-5 flex items-center gap-3.5 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 via-[#FF6600] to-amber-500 text-white shadow-xl shadow-orange-500/25 lg:-translate-x-2 scale-[1.02]"
                      : "bg-white hover:bg-stone-50 text-stone-900 shadow-sm hover:shadow-md border border-stone-200/60"
                  }`}
                >
                  {/* Round Dish Image Thumbnail */}
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                    <img
                      src={item.image}
                      alt={item.titleEn}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Text Content inside Pill */}
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-xs sm:text-sm font-black font-serif uppercase tracking-wide truncate ${
                      isActive ? "text-white" : "text-stone-900"
                    }`}>
                      {language === "si" ? item.titleSi : item.titleEn}
                    </h3>
                    <p className={`text-[11px] truncate mt-0.5 ${
                      isActive ? "text-white/80 font-medium" : "text-stone-500"
                    }`}>
                      {language === "si" ? item.subtitleSi : item.subtitleEn}
                    </p>
                  </div>

                  {/* Arrow Indicator on Active */}
                  {isActive && (
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}

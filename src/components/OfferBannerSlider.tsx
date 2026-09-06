"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Tag, 
  Clock, 
  Gift, 
  Flame, 
  Wine, 
  Heart 
} from "lucide-react";

interface OfferSlide {
  id: string;
  badgeEn: string;
  badgeSi: string;
  titleEn: string;
  titleSi: string;
  subtitleEn: string;
  subtitleSi: string;
  descEn: string;
  descSi: string;
  promoCode: string;
  icon: React.ElementType;
  image: string;
  validityEn: string;
  validitySi: string;
  ctaTextEn: string;
  ctaTextSi: string;
}

const OFFERS: OfferSlide[] = [
  {
    id: "grand-catering",
    badgeEn: "Limited Time Catering Special",
    badgeSi: "විශේෂ කේටරින් දීමනාව",
    titleEn: "10% OFF + Free Welcome Drinks",
    titleSi: "10% වට්ටමක් + නොමිලේ පිළිගැනීමේ බීම",
    subtitleEn: "For Events Over 150 Guests",
    subtitleSi: "අමුත්තන් 150ට වැඩි උත්සව සඳහා",
    descEn: "Book your Wedding, Birthday, or Corporate event menu today and enjoy an instant 10% discount plus complimentary fresh welcome fruit drinks.",
    descSi: "ඔබේ මංගල්‍යය, උපන්දින සාදය හෝ ආයතනික උත්සවය අදම වෙන්කරවාගෙන 10%ක වට්ටමක් සහ නොමිලේ පැණි බීම සත්කාරය ලබාගන්න.",
    promoCode: "MADARA10",
    icon: Gift,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80",
    validityEn: "Valid for bookings made this month",
    validitySi: "මෙම මාසයේ වෙන්කිරීම් සඳහා පමණි",
    ctaTextEn: "Claim 10% Offer on WhatsApp",
    ctaTextSi: "වට්ටම WhatsApp හරහා ලබාගන්න",
  },
  {
    id: "live-wok-free",
    badgeEn: "Package Upgrade Bonus",
    badgeSi: "නොමිලේ සජීවී කුටියක්",
    titleEn: "Free Live Action Kottu & Wok Station",
    titleSi: "නොමිලේ ලයිව් කොත්තු සහ වොක් කුටියක්",
    subtitleEn: "With Premium Wedding & Dane Packages",
    subtitleSi: "ප්‍රිමියම් කේටරින් පැකේජ සඳහා",
    descEn: "Get an interactive live cooking station featuring Mongolian wok or sizzling kottu included with your buffet menu at zero extra charge.",
    descSi: "ඔබ තෝරාගන්නා බුෆේ මෙනුව සමඟ සජීවීව පිසින මොන්ගෝලියන් වොක් හෝ කොත්තු කුටියක් කිසිදු අමතර ගාස්තුවකින් තොරව ලබාගන්න.",
    promoCode: "FREEWOK",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80",
    validityEn: "Limited availability per weekend",
    validitySi: "සති අන්ත සඳහා සීමිත ඉඩකඩක්",
    ctaTextEn: "Claim Free Wok Station",
    ctaTextSi: "සජීවී කුටිය වෙන්කරගන්න",
  },
  {
    id: "byob-weekend",
    badgeEn: "Dine-In Special",
    badgeSi: "ඩයිනින් රාත්‍රී දීමනාව",
    titleEn: "Zero Corkage BYOB & 15% OFF Bites",
    titleSi: "අමතර ගාස්තු නැති BYOB සහ 15% වට්ටම්",
    subtitleEn: "Free Ice Buckets & Chilled Glassware",
    subtitleSi: "නොමිලේ වීදුරු සහ අයිස්",
    descEn: "Bring your favorite spirits on Friday & Saturday nights! Enjoy zero corkage fee, free ice buckets, and 15% off Hot Butter Cuttlefish.",
    descSi: "සිකුරාදා සහ සෙනසුරාදා රාත්‍රීන්හි ඔබේ ප්‍රියතම පානය රැගෙන එන්න. නොමිලේ වීදුරු, අයිස් සහ රසවත් බයිට්ස් සඳහා 15%ක වට්ටමක්.",
    promoCode: "BYOB15",
    icon: Wine,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    validityEn: "Every Friday & Saturday Evening",
    validitySi: "සෑම සිකුරාදා සහ සෙනසුරාදා රාත්‍රියකම",
    ctaTextEn: "Reserve BYOB Table Now",
    ctaTextSi: "මේසයක් වෙන්කරගන්න",
  },
  {
    id: "dane-blessing",
    badgeEn: "Sacred Event Offer",
    badgeSi: "දානමය පිංකම් විශේෂ දීමනාව",
    titleEn: "Free Traditional Dessert & Sweets Platter",
    titleSi: "නොමිලේ පාරම්පරික අතුරුපස සංග්‍රහය",
    subtitleEn: "For Alms Giving & Hil Dane Orders",
    subtitleSi: "හිල් දාන සහ දානමය පිංකම් සඳහා",
    descEn: "Honoring traditions with care. Receive a complimentary curd & treacle or traditional sweet platter for morning and midday Dane bookings.",
    descSi: "මහා සංඝරත්නය උදෙසා පිදෙන දානමය සංග්‍රහයන් සඳහා නොමිලේ පාරම්පරික කිරි සහ පැණි හෝ කැවිලි ප්ලැටරයක් හිමිවේ.",
    promoCode: "DANESPECIAL",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    validityEn: "Valid on all Dane catering bookings",
    validitySi: "සියලුම දානමය වෙන්කිරීම් සඳහා",
    ctaTextEn: "Inquire Dane Offer",
    ctaTextSi: "දානමය විස්තර ලබාගන්න",
  },
];

export default function OfferBannerSlider() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + OFFERS.length) % OFFERS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  const currentOffer = OFFERS[currentIndex];
  const IconComponent = currentOffer.icon;

  const getWhatsAppLink = (offer: OfferSlide) => {
    const text = language === "si"
      ? `ආයුබෝවන් Madara Restaurant! 🎁 මම මෙම විශේෂ දීමනාව පිළිබඳව විමසීමට කැමැත්තෙමි: "${offer.titleSi}" (Promo Code: ${offer.promoCode}). කරුණාකර වැඩිදුර විස්තර ලබාදෙන්න.`
      : `Hi Madara Restaurant! 🎁 I would like to claim the special offer: "${offer.titleEn}" (Promo Code: ${offer.promoCode}). Please provide details for my event booking.`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="w-full py-10 bg-madara-dark border-y border-white/10 relative overflow-hidden select-none">
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
                {language === "si" ? "විශේෂ දීමනා සහ ප්‍රවර්ධන" : "Exclusive Promotions & Special Offers"}
              </h3>
              <p className="text-xs text-madara-textMuted">
                {language === "si" ? "ඔබේ උත්සව සඳහා විශේෂ වට්ටම් සහ නොමිලේ ලැබෙන අමතර පහසුකම්" : "Limited-time deals for catering bookings & dine-in occasions"}
              </p>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Previous Offer"
              className="w-9 h-9 rounded-xl bg-madara-surface border border-white/10 text-gray-300 hover:text-white hover:border-amber-500/40 transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Offer"
              className="w-9 h-9 rounded-xl bg-madara-surface border border-white/10 text-gray-300 hover:text-white hover:border-amber-500/40 transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Banner Card */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/25 bg-madara-surface shadow-xl">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={currentOffer.image}
              alt={language === "si" ? currentOffer.titleSi : currentOffer.titleEn}
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 scale-105 filter brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#111318]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-[#111318]/60" />
          </div>

          {/* Content Layer */}
          <div className="relative z-10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[300px]">
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-4">
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-500/40 text-amber-400 uppercase tracking-wider">
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{language === "si" ? currentOffer.badgeSi : currentOffer.badgeEn}</span>
                </span>
                
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-gray-200 border border-white/15">
                  <Tag className="w-3 h-3 text-amber-400" />
                  <span>PROMO: {currentOffer.promoCode}</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif leading-tight">
                  {language === "si" ? currentOffer.titleSi : currentOffer.titleEn}
                </h4>
                <p className="text-sm sm:text-base font-medium text-amber-300">
                  {language === "si" ? currentOffer.subtitleSi : currentOffer.subtitleEn}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-madara-textSecondary max-w-2xl leading-relaxed">
                {language === "si" ? currentOffer.descSi : currentOffer.descEn}
              </p>

              {/* Validity Footer */}
              <div className="flex items-center gap-2 text-[11px] text-madara-textMuted pt-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === "si" ? currentOffer.validitySi : currentOffer.validityEn}</span>
              </div>
            </div>

            {/* Right Action CTA Column */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8">
              <a
                href={getWhatsAppLink(currentOffer)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto lg:w-full btn-whatsapp px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-lg group transition-all duration-300"
              >
                <MessageCircle className="w-4.5 h-4.5 text-white" />
                <span>{language === "si" ? currentOffer.ctaTextSi : currentOffer.ctaTextEn}</span>
              </a>

              <div className="text-[11px] text-gray-400 text-center lg:text-right w-full">
                {language === "si" ? "WhatsApp හරහා සෘජුවම වෙන්කරවාගන්න" : "Direct inquiry via WhatsApp desk"}
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators Dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {OFFERS.map((offer, index) => (
            <button
              key={offer.id}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-amber-500" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

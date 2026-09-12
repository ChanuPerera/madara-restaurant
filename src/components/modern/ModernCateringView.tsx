"use client";

import React, { useState } from "react";
import Link from "next/link";
import ModernNavbar from "@/components/modern/ModernNavbar";
import ModernFooter from "@/components/modern/ModernFooter";
import CateringMenuBook from "@/components/modern/CateringMenuBook";
import OrLogo from "@/assets/orlogo-01.png";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import { 
  BookOpen,
  Sparkles, 
  Flame, 
  MessageCircle, 
  Phone, 
  ArrowLeft,
  Users,
  ShieldCheck,
  Clock,
  GlassWater,
  IceCream,
  UtensilsCrossed
} from "lucide-react";

export default function ModernCateringView() {
  const { language } = useLanguage();

  const generateGeneralCateringWhatsAppUrl = () => {
    const text =
      language === "si"
        ? "ආයුබෝවන් Madara Restaurant! මට මෙනු පොත බලා ඉදිරි උත්සවයක් සඳහා කේටරින් සේවාව පිළිබඳව විමසීමට අවශ්‍යයි."
        : "Hi Madara Restaurant! I was reviewing your catering menu book and would like to inquire about event catering.";
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-stone-900 relative w-full max-w-full overflow-x-hidden">
      {/* Sleek Floating Capsule Navigation */}
      <ModernNavbar />

      {/* Breadcrumb & Hotline Sub-Bar */}
      <div className="pt-24 sm:pt-28 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-stone-500">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-medium text-stone-600 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === "si" ? "මුල් පිටුවට" : "Home"}</span>
            <span className="text-stone-300">/</span>
            <span className="text-amber-700 font-semibold">
              {language === "si" ? "කේටරින් මෙනු" : "Catering Menus"}
            </span>
          </Link>

          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-stone-700 hover:text-amber-600 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>{RESTAURANT_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Hero Header: Clean, Minimal Text, High Impact */}
      <section className="pt-4 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {language === "si"
                ? "හෝමාගම අංක 1 කේටරින් සේවාව"
                : "Homagama's Premier Event Catering"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            {language === "si" ? (
              <>
                උත්සව සඳහා වූ <span className="text-amber-600">කේටරින් මෙනු</span>
              </>
            ) : (
              <>
                Event Catering, <span className="text-amber-600">Curated to Perfection</span>
              </>
            )}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 leading-relaxed">
            {language === "si"
              ? "විනිවිද පෙනෙන පුද්ගලයෙකුට මිල ගණන්, නොමිලේ උණුසුම් බුෆේ උපකරණ සහ වෘත්තීය සේවාව සමඟ ඔබේ උත්සවය අමතක නොවන අත්දැකීමක් කරන්න."
              : "Transparent per-person packages, on-site chafing warmers, live stations, and dedicated stewards for gatherings of 35+ guests across Homagama & Colombo."}
          </p>

          {/* Quick Metric Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-stone-700">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === "si" ? "නොමිලේ බුෆේ භාජන සැකසුම" : "Free Buffet Setup & Warmers"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === "si" ? "නියමිත වේලාවට පැමිණීම" : "Strict On-Time Guarantee"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === "si" ? "අවම 35 දෙනෙකුගෙන්" : "From 35 Persons"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === "si" ? "සජීවී කුටි (Live Stations)" : "Live Wok & BBQ Stations"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Catering Menu Flipbook */}
      <section id="menu-book" className="py-12 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-3 text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold tracking-wide shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {language === "si" ? "පිටු පෙරලන අතථ්‍ය මෙනු පොත" : "Interactive Virtual Menu Book"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
            {language === "si" ? (
              <>
                පිටු පෙරලා බලන්න: <span className="text-amber-600">කේටරින් මෙනු පොත</span>
              </>
            ) : (
              <>
                Flip Through the Pages: <span className="text-amber-600">Madara Banquet Book</span>
              </>
            )}
          </h2>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-stone-500 leading-relaxed">
            {language === "si"
              ? "සැබෑ පොතක පිටු පෙරලනවා වගේම, අපගේ සියලුම කේටරින් පැකේජ, මිල ගණන් සහ විශේෂාංග පිටුවෙන් පිටුව පෙරළමින් පහසුවෙන් අධ්‍යයනය කරන්න."
              : "Turn pages just like a physical gourmet banquet book to explore our full package selections, itemized curries, and live stations."}
          </p>
        </div>

        {/* 3D Interactive Flipbook */}
        <CateringMenuBook />
      </section>

      {/* Visual Add-Ons & Live Stations: Clean, Attractive, Simple */}
      <section className="py-16 bg-stone-50/80 border-t border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              {language === "si" ? "අමතර සේවාවන්" : "Optional Enhancements"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
              {language === "si" ? "කේටරින් අතිරේක පහසුකම්" : "Catering Add-Ons & Live Stations"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              {language === "si"
                ? "ඔබ කැමති ප්‍රධාන මෙනුව සමඟ සජීවී කුටි, පිළිගැනීමේ බීම සහ රසකැවිලි පහසුවෙන් එක්කර ගන්න."
                : "Elevate your gathering with live chef stations, welcome beverage bars, and artisanal dessert selections."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Addon 1: Warmers & Setup */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === "si" ? "බුෆේ උපකරණ හා පිඟන්" : "Buffet Chafers & Cutlery"}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === "si"
                  ? "රෝල්-ටොප් උණුසුම් භාජන, පෝසිලේන් පිඟන් හා හැඳි ගෑරුප්පු නොමිලේ සපයනු ලැබේ."
                  : "Roll-top chafing warmers, porcelain dinnerware, and buffet linen setup included."}
              </p>
            </div>

            {/* Addon 2: Welcome Drinks */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <GlassWater className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === "si" ? "පිළිගැනීමේ බීම බාර්" : "Welcome Drinks Bar"}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === "si"
                  ? "නැවුම් පැෂන් ෆෘට්, දෙහි මින්ට් කූලර්ස් සහ පැණි රස ෆලූඩා සංග්‍රහ."
                  : "Chilled fresh passion fruit cordial, iced lime-mint splash, and sweet rose falooda."}
              </p>
            </div>

            {/* Addon 3: Desserts */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <IceCream className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === "si" ? "අතුරුපස සංග්‍රහ" : "Artisanal Desserts"}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === "si"
                  ? "කිතුල් වටලප්පන්, කැරමල් පුඩිං සහ අයිස්ක්‍රීම් සමඟ නැවුම් පළතුරු සලාද."
                  : "Traditional jaggery watalappam, caramel pudding, and fresh fruit salad with ice cream."}
              </p>
            </div>


          </div>
        </div>
      </section>

      {/* Effortless 3-Step Process (Minimal & Visual) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              {language === "si" ? "සරල පියවර 3" : "How It Works"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
              {language === "si" ? "කේටරින් වෙන්කරවා ගැනීම" : "Effortless Catering in 3 Steps"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 font-serif font-bold text-lg flex items-center justify-center mx-auto">
                01
              </div>
              <h4 className="text-base font-bold text-stone-900">
                {language === "si" ? "පැකේජය තෝරන්න" : "Choose Occasion & Pax"}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === "si"
                  ? "ඔබේ උත්සව දිනය, අමුත්තන් ගණන සහ කැමති මෙනු කාණ්ඩය තෝරන්න."
                  : "Select your event type, approximate guest count, and preferred base menu."}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 font-serif font-bold text-lg flex items-center justify-center mx-auto">
                02
              </div>
              <h4 className="text-base font-bold text-stone-900">
                {language === "si" ? "මෙනුව රස බලන්න" : "Customize & Taste"}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === "si"
                  ? "අපගේ ප්‍රධාන චෙෆ් සමඟ ව්‍යංජන සකසා ගන්න; අවශ්‍ය නම් සාම්පල් රස බැලීම් ලබාගන්න."
                  : "Tailor curries with our Head Chef and request menu tasting if desired."}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 font-serif font-bold text-lg flex items-center justify-center mx-auto">
                03
              </div>
              <h4 className="text-base font-bold text-stone-900">
                {language === "si" ? "අප සූදානම් කර පිළිගන්වමු" : "We Setup & Serve Hot"}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === "si"
                  ? "නියමිත වේලාවට පෙර පැමිණ උණුසුම් බුෆේ එක සකසා වෘත්තීය ලෙස සංග්‍රහ කරමු."
                  : "Our team arrives early, powers the warmers, and stewards manage the buffet."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct WhatsApp Consultation Capsule - Minimal Text & Enhanced Luxury UI */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-stone-950 via-[#1c140d] to-stone-950 text-white p-8 sm:p-12 shadow-2xl text-center space-y-6 border border-amber-500/30 relative overflow-hidden group">
          {/* Subtle Ambient Radial Glow & Dot Matrix */}
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Luxury Logo Badge */}
          <div className="w-14 h-14 rounded-2xl bg-stone-900/90 border border-amber-500/40 p-2.5 flex items-center justify-center mx-auto shadow-xl ring-4 ring-amber-500/20 relative z-10 transition-transform group-hover:scale-105">
            <img
              src={OrLogo.src}
              alt="Madara Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Minimal Text Heading */}
          <div className="space-y-1.5 max-w-lg mx-auto relative z-10">
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-amber-50 tracking-tight leading-tight">
              {language === "si"
                ? "විශේෂිත මෙනුවක් අවශ්‍යද?"
                : "Need a Custom Catering Menu?"}
            </h3>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <a
              href={generateGeneralCateringWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>{language === "si" ? "WhatsApp සංවාදය" : "Chat on WhatsApp"}</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="inline-flex items-center gap-2.5 bg-stone-900/90 hover:bg-stone-850 text-amber-300 border border-amber-500/40 px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95 hover:border-amber-400"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <ModernFooter />
    </main>
  );
}

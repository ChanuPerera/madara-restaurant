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
  UtensilsCrossed,
  CheckCircle2
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


      {/* Interactive 3D Catering Menu Flipbook */}
      <section id="menu-book" className="py-12 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-3 text-center mb-6">

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

      {/* Visual Add-Ons Section: Clean, Attractive, Premium Layout */}
      <section className="py-16 bg-stone-50/80 border-t border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{language === "si" ? "අමතර එක්කිරීම්" : "Optional Add-Ons"}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
              {language === "si" ? "කේටරින් අතිරේක සේවාවන් හා මිල ගණන්" : "Enhance Your Catering Package"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
              {language === "si"
                ? "ඔබ තෝරාගත් මෙනු පැකේජයට අවශ්‍ය පරිදි බුෆේ උපකරණ, පිළිගැනීමේ බීම හා අතුරුපස එකතු කර ගන්න."
                : "Customize your event with full buffet setups, refreshing welcome drinks, and artisanal desserts."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* ADDON CARD 1: FULL BUFFET SETUP */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shadow-xs">
                    <UtensilsCrossed className="w-6 h-6" />
                  </div>
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs px-3 py-1 rounded-full">
                    Rs. 150/= <span className="font-medium text-[10px]">/ pax</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    Option 01
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Full Buffet Setup
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Complete tableware, linen setup & service equipment
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wider block">
                    Includes:
                  </span>
                  <ul className="space-y-2 text-xs text-stone-700 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Buffet serving dishes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Buffet table with frills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Dinner plates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Water glasses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Paper serviettes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-600 text-[11px]">Dessert cups & spoons <span className="text-amber-800 font-normal italic">(when dessert in menu)</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ADDON CARD 2: WELCOME DRINKS */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shadow-xs">
                    <GlassWater className="w-6 h-6" />
                  </div>
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs px-3 py-1 rounded-full">
                    Welcome Drinks
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    Option 02
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Welcome Drinks
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Chilled cordials, fresh juices & iced coffee
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-3">
                  <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">Fruit Cordial Bar</span>
                      <span className="text-xs font-extrabold text-amber-900 bg-white px-2.5 py-0.5 rounded-full border border-amber-200">Rs. 100/= <span className="text-[9px] font-normal text-stone-500">/ pax</span></span>
                    </div>
                    <p className="text-[10.5px] text-stone-600">
                      <span className="font-semibold text-stone-700">Choices:</span> Orange | Strawberry | Guava | Blackcurrant
                    </p>
                  </div>

                  <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">Fresh Fruit Juice</span>
                      <span className="text-xs font-extrabold text-amber-900 bg-white px-2.5 py-0.5 rounded-full border border-amber-200">Rs. 320/= <span className="text-[9px] font-normal text-stone-500">/ pax</span></span>
                    </div>
                    <p className="text-[10.5px] text-stone-600">
                      <span className="font-semibold text-stone-700">Choices:</span> Watermelon | Pineapple | Mango
                    </p>
                  </div>

                  <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Signature Iced Coffee</span>
                      <span className="text-[10.5px] text-stone-500">Rich creamy cold brew</span>
                    </div>
                    <span className="text-xs font-extrabold text-amber-900 bg-white px-2.5 py-0.5 rounded-full border border-amber-200">Rs. 260/= <span className="text-[9px] font-normal text-stone-500">/ pax</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* ADDON CARD 3: DESSERTS */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shadow-xs">
                    <IceCream className="w-6 h-6" />
                  </div>
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs px-3 py-1 rounded-full">
                    Artisanal Desserts
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    Option 03
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    Artisanal Desserts
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Traditional Sri Lankan & gourmet desserts
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  <div className="grid grid-cols-1 gap-1.5">
                    
                    <div className="flex items-center justify-between py-1 px-2.5 rounded-xl bg-stone-50/80 border border-stone-200/60">
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>🍮</span> Cream Caramel Pudding
                      </span>
                      <span className="text-xs font-extrabold text-amber-900">Rs. 150/=</span>
                    </div>

                    <div className="flex items-center justify-between py-1 px-2.5 rounded-xl bg-stone-50/80 border border-stone-200/60">
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>🍮</span> Watalappan
                      </span>
                      <span className="text-xs font-extrabold text-amber-900">Rs. 180/=</span>
                    </div>

                    <div className="flex items-center justify-between py-1 px-2.5 rounded-xl bg-stone-50/80 border border-stone-200/60">
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>🍮</span> Biscuit Pudding
                      </span>
                      <span className="text-xs font-extrabold text-amber-900">Rs. 220/=</span>
                    </div>

                    <div className="p-2 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          <span>🍉</span> Fresh Cut Fruit
                        </span>
                        <span className="text-xs font-extrabold text-amber-900">Rs. 260/=</span>
                      </div>
                      <p className="text-[10px] text-stone-500 font-medium pl-6">
                        Watermelon | Mango | Pineapple | Papaya
                      </p>
                    </div>

                    <div className="flex items-center justify-between py-1 px-2.5 rounded-xl bg-stone-50/80 border border-stone-200/60">
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>🍓</span> Fruit Trifle
                      </span>
                      <span className="text-xs font-extrabold text-amber-900">Rs. 380/=</span>
                    </div>

                    <div className="flex items-center justify-between py-1 px-2.5 rounded-xl bg-stone-50/80 border border-stone-200/60">
                      <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>🍓</span> Strawberry Tres Leches
                      </span>
                      <span className="text-xs font-extrabold text-amber-900">Rs. 410/=</span>
                    </div>

                  </div>
                </div>
              </div>
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

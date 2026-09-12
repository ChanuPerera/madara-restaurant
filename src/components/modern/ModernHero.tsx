"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  CalendarCheck, 
  CheckCircle2, 
  Flame, 
  UtensilsCrossed 
} from "lucide-react";

export default function ModernHero() {
  const { language } = useLanguage();

  const getWhatsAppUrl = () => {
    const text =
      language === "si"
        ? "ආයුබෝවන් Madara Restaurant! මගේ උත්සවය සඳහා කේටරින් තොරතුරු සහ මිල ගණන් දැනගැනීමට කැමැත්තෙමි."
        : "Hi Madara Restaurant! I would like to inquire about catering packages and availability for an upcoming event.";
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5]">
      {/* Soft Ambient Radial Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Minimal Editorial Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Minimal Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {language === "si"
                  ? "හෝමාගම අංක 1 කේටරින් සේවාව"
                  : "Premier Event Catering & Dining in Homagama"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-bold text-stone-900 font-serif tracking-tight leading-[1.1]">
              {language === "si" ? (
                <>
                  සුවිශේෂී උත්සව. <br />
                  <span className="text-gradient-gold">අසමසම රස සත්කාරය.</span>
                </>
              ) : (
                <>
                  Crafted for Moments <br />
                  <span className="text-gradient-gold">Worth Celebrating.</span>
                </>
              )}
            </h1>

            {/* Minimalist Sub-headline */}
            <p className="text-sm sm:text-base md:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {language === "si"
                ? "මංගල සාද, දානමය පිංකම්, උපන්දින සහ ආයතනික උත්සව සඳහා විශේෂිත වූ සුපිරි කේටරින් සත්කාරය, සජීවී වොක් කුටි සහ BYOB ආපනශාලා අත්දැකීම."
                : "Bespoke catering for Weddings, Sacred Alms Givings (Dane), Corporate Gatherings & Private Celebrations. Featuring Live Mongolian Wok stations and Homagama's favorite BYOB lounge."}
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#catering"
                className="px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <span>{language === "si" ? "කේටරින් පැකේජ බලන්න" : "Explore Catering"}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === "si" ? "WhatsApp මඟින් විමසන්න" : "WhatsApp Consultation"}</span>
              </a>

              <Link
                href="/catering-menu"
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                {language === "si" ? "සම්පූර්ණ මෙනුව" : "Full Menu"}
              </Link>
            </div>

            {/* Minimal Metric Strip */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-stone-900">500+</div>
                <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">
                  {language === "si" ? "සාර්ථක උත්සව" : "Grand Events"}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-stone-900">100%</div>
                <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">
                  {language === "si" ? "නැවුම් අමුද්‍රව්‍ය" : "Halal & Clean"}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-stone-900">Live</div>
                <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">
                  {language === "si" ? "සජීවී වොක් කුටි" : "Action Kitchens"}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-stone-900">BYOB</div>
                <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">
                  {language === "si" ? "වීදුරු හා අයිස් සේවාව" : "Dining Lounge"}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Gourmet Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Premium Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/90 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=85"
                  alt="Madara Luxury Event Catering Display"
                  className="w-full h-[360px] sm:h-[440px] object-cover"
                />

                {/* Gradient scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{language === "si" ? "සජීවී බුෆේ සත්කාරය" : "Live Action Buffet"}</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif">
                    {language === "si"
                      ? "සෑම උත්සවයකටම නියමිත වේලාවට උණුසුම් ආහාර"
                      : "Punctual, Warm & Beautifully Presented Buffets"}
                  </h3>
                  <p className="text-xs text-stone-300">
                    191/B/1, Athurugiriya Road, Homagama • 070 453 5815
                  </p>
                </div>
              </div>

              {/* Floating Floating Stat Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    {language === "si" ? "සම්පූර්ණ උපකරණ" : "All-Inclusive Setup"}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {language === "si" ? "බුෆේ, භාජන හා වේටර්වරු" : "Warmers, Chinaware & Staff"}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

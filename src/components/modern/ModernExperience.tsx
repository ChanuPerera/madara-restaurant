"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { Flame, Wine, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";

export default function ModernExperience() {
  const { language } = useLanguage();

  const getWokBookingUrl = () => {
    const text =
      language === "si"
        ? "ආයුබෝවන් Madara Restaurant! මගේ උත්සවය සඳහා Live Action Wok කුටියක් ලබාගැනීමට විමසීමට කැමැත්තෙමි."
        : "Hi Madara Restaurant! I would like to book an on-site Live Action Mongolian Wok station for our upcoming event.";
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const getByobBookingUrl = () => {
    const text =
      language === "si"
        ? "ආයුබෝවන් Madara Restaurant! මට BYOB Dine-in මේසයක් වෙන්කරවා ගැනීමට අවශ්‍යයි."
        : "Hi Madara Restaurant! I would like to reserve a BYOB dining table with glassware & ice bucket service.";
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="experience" className="py-20 bg-stone-50/60 border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">
            {language === "si" ? "සුවිශේෂී අත්දැකීම්" : "Signature Vibes"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif tracking-tight">
            {language === "si" ? "සජීවී වොක් සහ " : "Live Cooking & "}
            <span className="text-gradient-gold">
              {language === "si" ? "BYOB ආපනශාලාව" : "BYOB Lounge"}
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            {language === "si"
              ? "මිතුරන්, පවුලේ අය හෝ උත්සව ආරාධිතයන් සඳහා අමතක නොවන රසවත් අත්දැකීම්"
              : "Unmatched live action culinary drama and relaxed dining right here in Homagama."}
          </p>
        </div>

        {/* 2-Column Experience Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Live Mongolian Wok & BBQ */}
          <div className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Madara Live Action Mongolian Wok"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                <span>{language === "si" ? "සජීවී කුස්සිය" : "Live Action Station"}</span>
              </div>
              <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-bold font-serif text-white">
                {language === "si" ? "මොන්ගෝලියන් වොක් සහ BBQ" : "Live Mongolian Wok & Charcoal BBQ"}
              </h3>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === "si"
                  ? "ඔබගේ උත්සව භූමියේදීම හෝ ආපනශාලාවේදී සජීවී ගිනි දැල් මැද පිසෙන මොන්ගෝලියන් බත්, කොත්තු සහ ග්‍රිල් බාබකියු."
                  : "Watch master chefs fire high-heat wok burners on-site. Guests select their choice of meats, seafood, sauces, and fresh noodles."}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-100">
                {[
                  language === "si" ? "උත්සව ස්ථානයේදීම පිසින සජීවී කුටි" : "Available for on-site private events",
                  language === "si" ? "අමුත්තන් කැමති පරිදි තෝරාගත හැකි අමුද්‍රව්‍ය" : "Interactive ingredient selection",
                  language === "si" ? "වෘත්තීය සූපවේදීන්ගේ අධීක්ෂණය" : "Handled by experienced culinary masters",
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={getWokBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all group-hover:bg-amber-600"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{language === "si" ? "Live Wok විස්තර ලබාගන්න" : "Inquire About Live Stations"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: BYOB Dining Lounge */}
          <div className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Madara BYOB Dining Facility"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-amber-100 text-amber-900 border border-amber-300/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Wine className="w-3.5 h-3.5" />
                <span>{language === "si" ? "BYOB පහසුකම" : "BYOB Dining"}</span>
              </div>
              <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-bold font-serif text-white">
                {language === "si" ? "BYOB රාත්‍රී භෝජන සත්කාරය" : "Bring Your Own Bottle (BYOB)"}
              </h3>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === "si"
                  ? "ඔබගේ ප්‍රියතම පාන වර්ග රැගෙන එන්න. වීදුරු, අයිස් බාල්දි සහ රසවත් උණුසුම් බයිට්ස් සමඟ මිත්‍රශීලී සත්කාරය."
                  : "Bring your favorite drinks with zero hassle. We provide premium glassware, ice bucket service, and fiery Sri Lankan devilled pairings."}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-100">
                {[
                  language === "si" ? "පිරිසිදු වීදුරු හා අයිස් කැට සත්කාරය" : "Chilled ice buckets & glassware provided",
                  language === "si" ? "හොට් බටර් දැල්ලෝ ඇතුළු විශේෂිත බයිට්ස්" : "Hot Butter Cuttlefish & devilled bites pairings",
                  language === "si" ? "පෞද්ගලික සාද හා මිතුරු හමුවීම් සඳහා ඉඩකඩ" : "Comfortable AC and open dining areas",
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={getByobBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all group-hover:bg-amber-600"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{language === "si" ? "මේසයක් වෙන්කරවා ගන්න" : "Reserve a BYOB Table"}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

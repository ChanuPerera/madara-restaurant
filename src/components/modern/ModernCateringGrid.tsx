"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  HeartHandshake, 
  Sparkles, 
  Users, 
  Briefcase, 
  Check, 
  MessageCircle, 
  ArrowUpRight 
} from "lucide-react";
import { useCateringOccasions, CateringOccasionItem } from "@/services/cateringService";

export default function ModernCateringGrid() {
  const { language } = useLanguage();
  const { occasions } = useCateringOccasions();

  const getWhatsAppLink = (pillar: CateringOccasionItem) => {
    if (pillar.whatsappPrefill) {
      return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(pillar.whatsappPrefill)}`;
    }
    const text =
      language === "si"
        ? `ආයුබෝවන් Madara Restaurant! මම "${pillar.titleSi}" සඳහා කේටරින් පැකේජ සහ මිල ගණන් පිළිබඳව සම්බන්ධ වීමට කැමැත්තෙමි.`
        : `Hi Madara Restaurant! I would like to contact you regarding catering packages for: "${pillar.titleEn}". Please send available menu options.`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="catering" className="py-20 bg-stone-50/70 border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">
              {language === "si" ? "විශේෂිත සේවාවන්" : "Tailored Hospitality"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif tracking-tight">
              {language === "si" ? "ප්‍රධාන කේටරින් " : "Catering For Every "}
              <span className="text-gradient-gold">
                {language === "si" ? `අංශ ${occasions.length || 4}` : "Occasion"}
              </span>
            </h2>
          </div>
          
          <Link
            href="/catering"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-900 hover:text-amber-600 transition-colors group"
          >
            <span>{language === "si" ? "සියලුම පැකේජ බලන්න" : "View All Catering Packages"}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Pillar Grid (Mapped from Firestore 'catering_occasions') */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {occasions.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/40 transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={pillar.image}
                  alt={language === "si" ? pillar.titleSi : pillar.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-amber-800 shadow-sm">
                  {language === "si" ? pillar.tagSi : pillar.tagEn}
                </div>
                <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold font-serif text-white">
                  {language === "si" ? pillar.titleSi : pillar.titleEn}
                </h3>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {language === "si" ? pillar.descSi : pillar.descEn}
                </p>

                {/* Bullets */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  {(language === "si" ? pillar.featuresSi : pillar.featuresEn).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Button */}
                <div className="pt-2">
                  <a
                    href={getWhatsAppLink(pillar)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-white fill-white/20" />
                    <span>{language === "si" ? "WhatsApp හරහා සම්බන්ධ වන්න" : "Contact for this Event"}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Parallax Fixed Background Showcase Banner */}
        <div 
          className="mt-16 relative rounded-3xl overflow-hidden bg-fixed bg-cover bg-center shadow-xl py-16 sm:py-20 px-6 sm:px-12 text-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/75 to-amber-950/85 backdrop-blur-[2px]" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-4 text-white">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Homagama's Most Trusted Caterer</span>
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">
              {language === "si"
                ? "ඔබගේ විශේෂ දිනය අමතක නොවන මතකයක් බවට පත් කරන ප්‍රණීතම කේටරින් සත්කාරය"
                : "Turning Your Special Moments Into Unforgettable Culinary Celebrations"}
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              {language === "si"
                ? "650+ උත්සව, 50,000+ තෘප්තිමත් පාරිභෝගිකයින් සහ 100% පිරිසිදුකම මුල් කරගත් ප්‍රමිතිය."
                : "Over 650 events delivered across Colombo with transparent per-person pricing, fresh local ingredients, and master chef execution."}
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/catering"
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                {language === "si" ? "කේටරින් මෙනු පොත බලන්න" : "Open Catering Menu Book"}
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all"
              >
                {language === "si" ? "අප ගැන වැඩිදුර තොරතුරු" : "Learn About Us"}
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

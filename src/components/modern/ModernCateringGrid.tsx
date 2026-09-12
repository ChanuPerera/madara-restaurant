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

interface CateringPillar {
  id: string;
  titleEn: string;
  titleSi: string;
  tagEn: string;
  tagSi: string;
  descEn: string;
  descSi: string;
  featuresEn: string[];
  featuresSi: string[];
  image: string;
}

const PILLARS: CateringPillar[] = [
  {
    id: "weddings",
    titleEn: "Weddings & Homecomings",
    titleSi: "මංගල හා දෙවැනි ගමන සාද",
    tagEn: "Grand Luxury",
    tagSi: "රාජකීය මට්ටම",
    descEn: "Bespoke banquet menus, roll-top luxury chafing dishes, live carvery & action stations with professional uniformed stewards.",
    descSi: "සුවිශේෂී මංගල බුෆේ වට්ටෝරු, සුඛෝපභෝගී රෝල්-ටොප් භාජන, සජීවී කුටි සහ නිල ඇඳුමින් සැරසුණු සේවක මණ්ඩලය.",
    featuresEn: ["Buffet warmers & tableware included", "Live Mongolian / BBQ stations", "Uniformed service stewards"],
    featuresSi: ["උණුසුම් බුෆේ භාජන හා පිඟන් භාණ්ඩ", "සජීවී මොන්ගෝලියන් / BBQ කුටි", "වෘත්තීය නිල ඇඳුම් සේවක මණ්ඩලය"],
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dane",
    titleEn: "Sacred Alms Giving & Bana",
    titleSi: "දානමය පිංකම් හා බණ",
    tagEn: "Pious & Traditional",
    tagSi: "ශ්‍රද්ධා සම්පන්න",
    descEn: "Traditional 7-curry vegetarian or fish menus prepared with pristine cleanliness and respect for the venerable Maha Sangha.",
    descSi: "මහා සංඝරත්නය උදෙසා පිරිසිදුකම මුල් කරගත්, සාම්ප්‍රදායික ව්‍යංජන 7 කින් යුතු ගුණදායක දානමය සංග්‍රහ.",
    featuresEn: ["Pure, authentic traditional curries", "Individual Sangha thali trays", "Punctual morning & noon delivery"],
    featuresSi: ["පාරම්පරික දේශීය ව්‍යංජන", "සංඝරත්නය උදෙසා විශේෂිත තැටි සැකසුම", "නියමිත වෙලාවටම පිළිගැන්වීම"],
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "birthdays",
    titleEn: "Birthdays & Private Parties",
    titleSi: "උපන්දින හා පෞද්ගලික සාද",
    tagEn: "Lively & Vibrant",
    tagSi: "විනෝදජනක",
    descEn: "Clattering kottu stations, crispy BYOB bites, fiery sizzlers, and customizable buffet options tailored to your guest count.",
    descSi: "උණු උණු චීස් කොත්තු, රසවත් බයිට්ස්, සිස්ලර්ස් සහ මිතුරන් සමඟ විනෝද විය හැකි නම්‍යශීලී පැකේජ.",
    featuresEn: ["Live Kottu clattering on-site", "BYOB bites & chaser setups", "Flexible minimums from 25 pax"],
    featuresSi: ["සජීවීව ක්ලැටර් වන කොත්තු කුටිය", "BYOB බයිට්ස් සහ චේසර් සැකසුම්", "අවම 25 දෙනෙකුගේ සිට ඇණවුම්"],
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "corporate",
    titleEn: "Corporate Events & Outdoor",
    titleSi: "ආයතනික හා එළිමහන් සාද",
    tagEn: "Corporate Standard",
    tagSi: "වෘත්තීය ප්‍රමිතිය",
    descEn: "Punctual corporate luncheons, conference catering, executive pack deliveries, and full outdoor canopy meal stations.",
    descSi: "කාර්යාල සම්මන්ත්‍රණ, වාර්ෂික හමුවීම් සහ එළිමහන් සාද සඳහා නියමිත වේලාවට ලබාදෙන වෘත්තීය කේටරින් සේවාව.",
    featuresEn: ["Punctual timing guaranteed", "Invoice & corporate payment options", "Full logistical setup & teardown"],
    featuresSi: ["100% නියමිත වේලාවට භාරදීම", "ආයතනික ඉන්වොයිස් පහසුකම්", "සම්පූර්ණ ප්‍රවාහන හා උපකරණ පහසුකම්"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ModernCateringGrid() {
  const { language } = useLanguage();

  const getWhatsAppLink = (pillar: CateringPillar) => {
    const text =
      language === "si"
        ? `ආයුබෝවන් Madara Restaurant! මම "${pillar.titleSi}" සඳහා කේටරින් පැකේජ සහ මිල ගණන් පිළිබඳව විමසීමට කැමැත්තෙමි.`
        : `Hi Madara Restaurant! I would like to inquire about catering packages for: "${pillar.titleEn}". Please send available menu options.`;
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
                {language === "si" ? "අංශ 4" : "Occasion"}
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

        {/* 4 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PILLARS.map((pillar) => (
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
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all group-hover:bg-amber-600"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    <span>{language === "si" ? "WhatsApp හරහා විමසන්න" : "Inquire for this Event"}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

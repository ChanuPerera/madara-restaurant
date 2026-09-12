"use client";

import React from "react";
import { Briefcase, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";

export default function FloatingCareersButton() {
  const { language } = useLanguage();

  const getWhatsAppCareerUrl = () => {
    const text =
      language === "si"
        ? "ආයුබෝවන් Madara Restaurant! මට ඔබගේ ආයතනයේ රැකියා ඇබෑර්තු පිළිබඳව විමසා කණ්ඩායමට එකතු වීමට අවශ්‍යයි."
        : "Hi Madara Restaurant! I am interested in joining your team and applying for a job vacancy.";
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <a
      href={getWhatsAppCareerUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_10px_30px_-5px_rgba(245,158,11,0.5)] border-2 border-amber-200/80 transition-all hover:scale-105 active:scale-95 group select-none cursor-pointer"
      title="Join our Team - Apply via WhatsApp"
    >
      <div className="w-6 h-6 rounded-full bg-stone-950/15 flex items-center justify-center text-stone-950 flex-shrink-0 group-hover:rotate-12 transition-transform">
        <Briefcase className="w-3.5 h-3.5" />
      </div>
      <span>{language === "si" ? "අප හා එක්වන්න" : "Join our Team"}</span>
      <MessageCircle className="w-4 h-4 text-stone-950 fill-stone-950/20" />
    </a>
  );
}

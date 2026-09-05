"use client";

import React from "react";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, MessageCircle } from "lucide-react";

export default function MobileActionDock() {
  const { language, t } = useLanguage();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090a0df2] backdrop-blur-xl border-t border-white/15 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        {/* Call Desk Button */}
        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="btn-outline-dark py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          aria-label="Call Madara Restaurant Direct"
        >
          <Phone className="w-4 h-4 text-madara-orange animate-pulse" />
          <span>{t("dock.callDirect")}</span>
        </a>

        {/* WhatsApp Direct Button */}
        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20catering%20and%20dining.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md"
          aria-label="Chat on WhatsApp Direct"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>{t("dock.whatsapp")}</span>
        </a>
      </div>
    </div>
  );
}

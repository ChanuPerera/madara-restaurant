"use client";

import React from "react";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import { 
  UtensilsCrossed, 
  GlassWater, 
  IceCream, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Phone,
  PlusCircle,
  Flame
} from "lucide-react";
import { useCateringEnhancements, CateringEnhancementItem } from "@/services/cateringService";

export default function CateringAddons() {
  const { language } = useLanguage();
  const { enhancements } = useCateringEnhancements();

  const getAddonIcon = (category: string, iconName?: string) => {
    if (iconName) {
      switch (iconName) {
        case "UtensilsCrossed": return UtensilsCrossed;
        case "GlassWater": return GlassWater;
        case "IceCream": return IceCream;
        case "Flame": return Flame;
        default: break;
      }
    }
    switch (category) {
      case "buffet": return UtensilsCrossed;
      case "drinks": return GlassWater;
      case "desserts": return IceCream;
      case "live_stations": return Flame;
      default: return Sparkles;
    }
  };

  const generateAddonWhatsAppUrl = () => {
    const text = `Hi Madara Restaurant! 🎉\n\nI would like to inquire about customized Catering Add-Ons (Buffet Setup, Welcome Drinks, Desserts & Live Stations) for our upcoming event.\n\nPlease share details and help us customize our package.\n\nThank you!`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="catering-addons" className="py-16 relative bg-madara-surface/30 border-t border-white/10">
      {/* Background Glow */}
      <div className="ambient-glow w-[450px] h-[450px] bg-madara-orange/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madara-orange/10 border border-madara-orange/30 text-madara-orange text-xs font-bold uppercase tracking-wider shadow-glow-orange-sm">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{language === "si" ? "අමතර සේවාවන්" : "Optional Enhancements"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight">
            {language === "si" ? "කේටරින් " : "Catering "}
            <span className="text-gradient-orange">
              {language === "si" ? "අතිරේක සේවාවන්" : "Add-Ons"}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-madara-textSecondary leading-relaxed">
            {language === "si"
              ? "ඔබගේ කේටරින් පැකේජය සමඟ බුෆේ උපකරණ, පිළිගැනීමේ බීම, රසවත් අතුරුපස හෝ සජීවී කුටි පහසුවෙන් එකතු කරගන්න."
              : "Enhance your catering package with these optional additions. Combine any main menu with a full buffet setup, welcome drinks, desserts, and live action stations."}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-madara-amber">
            <Sparkles className="w-3.5 h-3.5 text-madara-orange" />
            <span>
              {language === "si"
                ? "සියලුම කේටරින් මෙනු අවම 35 දෙනෙකුගේ සිට ඇණවුම් කළ හැක"
                : "All catering menus available for a minimum of 35 persons or more"}
            </span>
          </div>
        </div>

        {/* Dynamic Enhancements Grid (Mapped from Firestore 'catering_enhancements') */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            enhancements.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          } gap-6 lg:gap-8`}
        >
          {enhancements.map((addon) => {
            const Icon = getAddonIcon(addon.category, addon.icon);
            return (
              <div
                key={addon.id}
                className="glass-panel-orange rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-madara-orange/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Title & Icon Header */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-white/10 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-madara-orange/20 border border-madara-orange/30 flex items-center justify-center text-madara-orange flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
                        {language === "si" && addon.titleSi ? addon.titleSi : addon.title}
                      </h3>
                      <p className="text-xs text-madara-textMuted mt-0.5 leading-snug">
                        {language === "si" && addon.subtitleSi ? addon.subtitleSi : addon.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {addon.items.map((item, idx) => {
                      if (typeof item === "string") {
                        const colonIdx = item.indexOf(":");
                        if (colonIdx > 0 && colonIdx < item.length - 2) {
                          const title = item.substring(0, colonIdx).trim();
                          const choices = item.substring(colonIdx + 1).split(",").map((s) => s.trim());
                          return (
                            <div
                              key={idx}
                              className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1.5"
                            >
                              <span className="text-xs font-bold text-white block">{title}</span>
                              <div className="flex flex-wrap gap-1.5">
                                {choices.map((choice, cIdx) => (
                                  <span
                                    key={cIdx}
                                    className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-madara-textSecondary flex items-center gap-1"
                                  >
                                    <CheckCircle2 className="w-3 h-3 text-madara-orange flex-shrink-0" />
                                    <span>{choice}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={idx}
                            className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-start gap-2.5 text-xs text-white/90"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-madara-orange flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5"
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-xs sm:text-sm font-bold text-white">
                              {item.name}
                            </span>
                            {item.priceDisplay && (
                              <span className="text-xs font-extrabold text-madara-orange bg-madara-orange/10 px-2 py-0.5 rounded-md border border-madara-orange/20 flex-shrink-0">
                                {item.priceDisplay}
                              </span>
                            )}
                          </div>

                          {item.options && item.options.length > 0 && (
                            <div className="pt-1 flex flex-wrap gap-1.5">
                              {item.options.map((opt, optIdx) => (
                                <span
                                  key={optIdx}
                                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-madara-textSecondary flex items-center gap-1"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-madara-orange flex-shrink-0" />
                                  <span>{opt}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-madara-textMuted flex items-center justify-between">
                  <span>{language === "si" ? "අවශ්‍ය පරිදි වෙනස් කළ හැක" : "Customizable per guest count"}</span>
                  <span className="text-madara-orange font-bold">{language === "si" ? "අමතර සේවාවක්" : "Add-On"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Inquiry Button */}
        <div className="mt-12 text-center">
          <a
            href={generateAddonWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>{language === "si" ? "අමතර සේවාවන් පිළිබඳව විමසන්න" : "Inquire About Enhancements on WhatsApp"}</span>
          </a>
        </div>

      </div>
    </section>
  );
}

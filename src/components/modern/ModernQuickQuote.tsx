"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { MessageCircle, Sparkles, Check, Calculator, PhoneCall } from "lucide-react";

export default function ModernQuickQuote() {
  const { language } = useLanguage();
  const [eventType, setEventType] = useState("wedding");
  const [pax, setPax] = useState("50-100");
  const [addOns, setAddOns] = useState<string[]>(["warmers"]);

  const eventTypes = [
    { id: "wedding", labelEn: "Wedding / Homecoming", labelSi: "මංගල සාදය" },
    { id: "dane", labelEn: "Alms Giving (Dane)", labelSi: "දානමය පිංකම" },
    { id: "birthday", labelEn: "Birthday / Private", labelSi: "උපන්දින / සාදය" },
    { id: "corporate", labelEn: "Corporate Gathering", labelSi: "ආයතනික උත්සවය" },
  ];

  const paxOptions = [
    { id: "25-50", label: "25 - 50 Pax" },
    { id: "50-100", label: "50 - 100 Pax" },
    { id: "100-250", label: "100 - 250 Pax" },
    { id: "250+", label: "250+ Pax" },
  ];

  const availableAddons = [
    { id: "warmers", labelEn: "Buffet Warmers & Tableware", labelSi: "උණුසුම් බුෆේ උපකරණ" },
    { id: "wok", labelEn: "Live Mongolian Wok Station", labelSi: "සජීවී මොන්ගෝලියන් කුටිය" },
    { id: "stewards", labelEn: "Uniformed Stewards", labelSi: "නිල ඇඳුම් වේටර් සේවාව" },
  ];

  const toggleAddon = (id: string) => {
    setAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getWhatsAppEstimateUrl = () => {
    const selectedEvent = eventTypes.find((e) => e.id === eventType);
    const eventName = language === "si" ? selectedEvent?.labelSi : selectedEvent?.labelEn;
    const addOnNames = addOns
      .map((id) => {
        const found = availableAddons.find((a) => a.id === id);
        return language === "si" ? found?.labelSi : found?.labelEn;
      })
      .filter(Boolean)
      .join(", ");

    const text =
      language === "si"
        ? `ආයුබෝවන් Madara Restaurant! 📋 මට කේටරින් ඇස්තමේන්තුවක් ලබාගැනීමට අවශ්‍යයි:\n• උත්සවය: ${eventName}\n• අමුත්තන් ගණන: ${pax} දෙනෙකු\n• අමතර පහසුකම්: ${addOnNames || "නැත"}\nකරුණාකර සුදුසු මෙනු විකල්ප සහ මිල ගණන් දන්වන්න.`
        : `Hi Madara Restaurant! 📋 I would like a catering quotation:\n• Event: ${eventName}\n• Guest Count: ${pax}\n• Add-ons Requested: ${addOnNames || "None"}\nPlease send recommended menu options and per-person prices.`;

    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="quote" className="py-20 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Container */}
        <div className="bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-stone-200/90 shadow-xl p-6 sm:p-10 relative overflow-hidden">
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === "si" ? "ඉක්මන් ඇස්තමේන්තුව" : "Quick Catering Estimator"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              {language === "si" ? "විනාඩියෙන් මිල ගණන් " : "Get an Instant "}
              <span className="text-gradient-gold">
                {language === "si" ? "විමසන්න" : "WhatsApp Quote"}
              </span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-500">
              {language === "si"
                ? "ඔබගේ උත්සවයේ තොරතුරු තෝරා ක්ලික් කරන්න. අපගේ කේටරින් කණ්ඩායම සෘජුවම සම්බන්ධ වනු ඇත."
                : "Select your event specs below to generate an instant, tailored inquiry for our catering manager."}
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Step 1: Event Type */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                1. {language === "si" ? "උත්සවයේ වර්ගය තෝරන්න:" : "Select Occasion Type:"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {eventTypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEventType(item.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      eventType === item.id
                        ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                        : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    {language === "si" ? item.labelSi : item.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Guest Count */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                2. {language === "si" ? "අමුත්තන් සංඛ්‍යාව:" : "Estimated Guest Count:"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {paxOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPax(item.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      pax === item.id
                        ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                        : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5">
                3. {language === "si" ? "අවශ්‍ය අමතර පහසුකම් (විකල්ප):" : "Desired Add-ons (Optional):"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {availableAddons.map((item) => {
                  const selected = addOns.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAddon(item.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                        selected
                          ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                          : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <span className="truncate">{language === "si" ? item.labelSi : item.labelEn}</span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ml-2 ${
                          selected ? "bg-amber-500 text-black" : "border border-stone-300"
                        }`}
                      >
                        {selected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 text-center">
              <a
                href={getWhatsAppEstimateUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>
                  {language === "si"
                    ? "WhatsApp හරහා ඇස්තමේන්තුව ලබාගන්න"
                    : "Generate WhatsApp Quote & Check Availability"}
                </span>
              </a>

              <div className="mt-3 flex items-center justify-center gap-4 text-xs text-stone-500">
                <span>✓ {language === "si" ? "වහාම ප්‍රතිචාර" : "Fast Response"}</span>
                <span>•</span>
                <span>✓ {language === "si" ? "නොමිලේ උපදෙස්" : "Free Consultation"}</span>
                <span>•</span>
                <span>✓ {language === "si" ? "පැය 24 සේවාව" : "Direct WhatsApp Hotline"}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

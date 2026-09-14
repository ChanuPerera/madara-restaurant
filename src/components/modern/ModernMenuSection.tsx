"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MENU_ITEMS } from "@/data/restaurantData";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function ModernMenuSection() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");

  const tabs = [
    { id: "all", labelEn: "All Dishes", labelSi: "සියලුම කෑම" },
    { id: "rice", labelEn: "Rice", labelSi: "බත්" },
    { id: "kottu", labelEn: "Kottu", labelSi: "කොත්තු" },
    { id: "other", labelEn: "Other", labelSi: "වෙනත්" },
  ];

  // 8 items display max
  const filteredItems = useMemo(() => {
    if (activeTab === "all") {
      return MENU_ITEMS.slice(0, 8);
    }
    return MENU_ITEMS.filter((item) => item.category === activeTab).slice(0, 8);
  }, [activeTab]);

  return (
    <section id="menu" className="py-20 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">
            {language === "si" ? "ආපනශාලා මෙනුව" : "A La Carte & Takeaway"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif tracking-tight">
            {language === "si" ? "ජනප්‍රියම " : "Signature "}
            <span className="text-gradient-gold">
              {language === "si" ? "කෑම වට්ටෝරු" : "Highlights"}
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            {language === "si"
              ? "Dine-in, Takeaway සහ Delivery සඳහා ලබාගත හැකි ප්‍රියතම ආහාර"
              : "Freshly prepared for Dine-In, Takeaway, and Homagama Delivery."}
          </p>
        </div>

        {/* Category Tabs: All, Rice, Kottu, Other */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-stone-900 text-white shadow-sm scale-105"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-700"
              }`}
            >
              {language === "si" ? tab.labelSi : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Items Grid (8 items max, linked directly to product detail page) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const title = language === "si" && item.sinhalaName ? item.sinhalaName : item.name;
            const priceDisplay = item.portions && item.portions.length > 0
              ? `Rs. ${item.portions[0].priceLKR.toLocaleString()}/=`
              : `Rs. ${item.priceLKR.toLocaleString()}/=`;

            return (
              <Link
                key={item.id}
                href={`/menu/${item.id}`}
                className="bg-stone-50/50 rounded-2xl overflow-hidden border border-stone-200/70 hover:border-amber-400/80 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.subCategory && (
                    <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {item.subCategory}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-stone-900/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-extrabold shadow-sm">
                    {priceDisplay}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-700 transition-colors line-clamp-1">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-600">
                    <span>{language === "si" ? "විස්තර බලන්න" : "View Details"}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View Full Menu CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105"
          >
            <span>{language === "si" ? "සියලුම ආපනශාලා ආහාර මෙනුව බලන්න" : "View Full Menu Catalog"}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}

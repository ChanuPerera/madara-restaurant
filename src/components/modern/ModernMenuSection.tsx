"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO, MENU_ITEMS, MenuItem as DataMenuItem } from "@/data/restaurantData";
import { UtensilsCrossed, MessageCircle, ArrowRight, Flame } from "lucide-react";

export default function ModernMenuSection() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");

  const tabs = [
    { id: "all", labelEn: "All Highlights", labelSi: "සියල්ල" },
    { id: "fried_rice_basmathi", labelEn: "Fried Rice", labelSi: "ෆ්‍රයිඩ් රයිස්" },
    { id: "koththu", labelEn: "Koththu", labelSi: "කොත්තු" },
    { id: "side_chicken", labelEn: "Chicken Sides", labelSi: "චිකන්" },
    { id: "side_seafood", labelEn: "Seafood Sides", labelSi: "සීෆුඩ්" },
  ];

  const featuredList = MENU_ITEMS.slice(0, 12);

  const filteredItems =
    activeTab === "all"
      ? featuredList
      : MENU_ITEMS.filter((item) => item.category === activeTab);

  const getWhatsAppOrderLink = (item: DataMenuItem) => {
    const title = language === "si" && item.sinhalaName ? item.sinhalaName : item.name;
    const priceDisplay = item.portions && item.portions.length > 0
      ? `Rs. ${item.portions[0].priceLKR.toLocaleString()}/=`
      : `Rs. ${item.priceLKR.toLocaleString()}/=`;
    const text =
      language === "si"
        ? `ආයුබෝවන් Madara Restaurant! 🍽️ මට මෙම ආහාරය ඇණවුම් කිරීමට අවශ්‍යයි: "${title}" (${priceDisplay}).`
        : `Hi Madara Restaurant! 🍽️ I would like to order: "${title}" (${priceDisplay}).`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };


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

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-stone-50/50 rounded-2xl overflow-hidden border border-stone-200/70 hover:border-amber-400/50 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={language === "si" && item.sinhalaName ? item.sinhalaName : item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-stone-900/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-extrabold shadow-sm">
                  {item.portions && item.portions.length > 0
                    ? `Rs. ${item.portions[0].priceLKR.toLocaleString()}/=`
                    : `Rs. ${item.priceLKR.toLocaleString()}/=`}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-700 transition-colors line-clamp-1">
                    {language === "si" && item.sinhalaName ? item.sinhalaName : item.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <a
                  href={getWhatsAppOrderLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#25D366] hover:text-white text-stone-800 border border-stone-200 hover:border-transparent text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{language === "si" ? "ඇණවුම් කරන්න" : "Order on WhatsApp"}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105"
          >
            <span>{language === "si" ? "සියලුම ආපනශාලා ආහාර (Ala Carte) බලන්න" : "View All Ala Card Items"}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}

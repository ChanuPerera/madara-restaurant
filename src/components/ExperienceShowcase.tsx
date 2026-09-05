"use client";

import React, { useState } from "react";
import { ACTION_KITCHEN_STATIONS, MENU_ITEMS, RESTAURANT_INFO } from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Flame, 
  Wine, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Phone,
  GlassWater,
  Snowflake,
  ShieldCheck,
  ChefHat
} from "lucide-react";

export default function ExperienceShowcase() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"action" | "byob">("action");
  const [activeStationId, setActiveStationId] = useState(ACTION_KITCHEN_STATIONS[0].id);

  const activeStation =
    ACTION_KITCHEN_STATIONS.find((s) => s.id === activeStationId) ||
    ACTION_KITCHEN_STATIONS[0];

  const byobBites = MENU_ITEMS.filter((item) => item.isByobPairing).slice(0, 4);

  const byobFeatures = [
    { icon: GlassWater, title: "Crystal Glassware", desc: "Highball, rock glasses & tumblers provided." },
    { icon: Snowflake, title: "Chilled Ice Buckets", desc: "Unlimited fresh ice served to your table." },
    { icon: ShieldCheck, title: "Zero Hidden Corkage", desc: "No corkage fee with signature bite platters." },
    { icon: Flame, title: "Fiery Chaser Pairings", desc: "Hot butter & devilled dishes prepared spicy to order." },
  ];

  return (
    <section id="experience" className="py-20 relative bg-madara-surface/50 overflow-hidden border-y border-white/5">
      {/* Ambient Lighting */}
      <div className="ambient-glow w-[500px] h-[500px] bg-red-600/6 top-10 left-10" />
      <div className="ambient-glow w-[400px] h-[400px] bg-purple-600/6 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 2-Tab Switcher */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-madara-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Dining Experiences</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif tracking-tight">
            Live Action Kitchens <span className="text-gradient-orange">&amp; BYOB Dining</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-madara-textSecondary">
            Explore our on-site live high-flame cooking stations and relaxed evening BYOB dining with zero corkage fee in Homagama.
          </p>

          {/* Master 2-Tab Toggle */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 shadow-xl">
            <button
              onClick={() => setActiveTab("action")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "action"
                  ? "bg-gradient-to-r from-madara-orange to-red-600 text-white shadow-glow-orange"
                  : "text-madara-textSecondary hover:text-white"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Live Action Wok Theater</span>
            </button>

            <button
              onClick={() => setActiveTab("byob")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "byob"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "text-madara-textSecondary hover:text-white"
              }`}
            >
              <Wine className="w-4 h-4" />
              <span>BYOB Dining &amp; Chasers</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Action Kitchens */}
        {activeTab === "action" && (
          <div className="glass-panel-orange rounded-3xl p-6 sm:p-8 border border-madara-orange/30 shadow-2xl animate-in fade-in duration-300">
            {/* Station Quick Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {ACTION_KITCHEN_STATIONS.map((station) => (
                <button
                  key={station.id}
                  onClick={() => setActiveStationId(station.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    station.id === activeStationId
                      ? "bg-madara-orange text-white shadow-glow-orange-sm"
                      : "bg-white/5 text-madara-textSecondary border border-white/10 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {station.name.split("&")[0]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left: Station Visual */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/15 group">
                <img
                  src={activeStation.image}
                  alt={activeStation.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-bold">{activeStation.badge}</span>
                  <span className="text-madara-amber">Ideal for: {activeStation.bestFor}</span>
                </div>
              </div>

              {/* Right: Station Info */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <span className="text-xs font-bold text-madara-orange uppercase tracking-wider block">
                    {activeStation.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mt-0.5">
                    {activeStation.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-madara-textSecondary mt-2 leading-relaxed">
                    {activeStation.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-xs font-bold text-madara-amber block mb-1">
                    🔥 Highlight Dishes Tossed Live:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeStation.highlightItems.map((item, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-white/90">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(activeStation.name)}%20for%20our%20event.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book Live Station on WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="btn-outline-dark px-4 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Call: {RESTAURANT_INFO.phoneFormatted}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: BYOB Dining Experience */}
        {activeTab === "byob" && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl animate-in fade-in duration-300">
            {/* 4 Quick Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {byobFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-start">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                    <p className="text-[11px] text-madara-textMuted mt-0.5 leading-snug">{feat.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Chaser Bites Row */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Top Spicy Chasers for Your Drinks
                </h4>
                <span className="text-xs text-purple-400 font-semibold">Zero Corkage with Sharing Bites</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {byobBites.map((dish) => (
                  <div key={dish.id} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{dish.name}</h5>
                      <span className="text-xs font-extrabold text-madara-orange block mt-0.5">
                        LKR {dish.priceLKR.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-madara-textMuted">{dish.portion}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20reserve%20a%20table%20for%20BYOB%20evening%20dining.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reserve a BYOB Table via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

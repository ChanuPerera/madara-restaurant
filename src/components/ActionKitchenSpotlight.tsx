"use client";

import React, { useState } from "react";
import { ACTION_KITCHEN_STATIONS, RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  Flame, 
  ChefHat, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  MessageCircle,
  Calendar,
  Users
} from "lucide-react";

export default function ActionKitchenSpotlight() {
  const [activeStationId, setActiveStationId] = useState(ACTION_KITCHEN_STATIONS[0].id);

  const activeStation =
    ACTION_KITCHEN_STATIONS.find((s) => s.id === activeStationId) ||
    ACTION_KITCHEN_STATIONS[0];

  return (
    <section id="action-kitchen" className="py-24 relative overflow-hidden bg-madara-dark">
      {/* Background Ambient Glow */}
      <div className="ambient-glow w-[550px] h-[550px] bg-red-600/6 top-1/3 -right-40" />
      <div className="ambient-glow w-[400px] h-[400px] bg-madara-orange/5 -bottom-20 -left-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Live Cooking Theater</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            Live <span className="text-gradient-orange">Action Kitchens</span> &amp; Stations
          </h2>
          <p className="mt-4 text-sm sm:text-base text-madara-textSecondary">
            Transform your wedding, corporate event, or private party into an electrifying culinary spectacle. Our master chefs prepare sizzling creations live in front of your guests!
          </p>
        </div>

        {/* Station Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {ACTION_KITCHEN_STATIONS.map((station) => {
            const isActive = station.id === activeStationId;
            return (
              <button
                key={station.id}
                onClick={() => setActiveStationId(station.id)}
                className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-madara-orange to-red-600 text-white shadow-glow-orange border-none scale-105"
                    : "bg-white/5 text-madara-textSecondary border border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <Flame className={`w-4 h-4 ${isActive ? "text-white" : "text-madara-orange"}`} />
                <span>{station.name.split("&")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Station Deep Dive Showcase */}
        <div className="glass-panel-orange rounded-3xl p-6 sm:p-10 border border-madara-orange/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Station Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/20 shadow-2xl group">
                <img
                  src={activeStation.image}
                  alt={activeStation.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-madara-dark via-transparent to-black/20" />
                
                {/* Station Tag Pill */}
                <div className="absolute top-4 left-4 bg-madara-orange text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-glow-orange-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeStation.badge}</span>
                </div>

                {/* Best For Tag */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-xl border border-white/15 text-xs text-white/90">
                  <span className="text-madara-amber font-bold block mb-0.5">⭐ Recommended For:</span>
                  <span>{activeStation.bestFor}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Station Details & Booking Trigger */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-madara-orange uppercase tracking-wider block mb-1">
                  {activeStation.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-4">
                  {activeStation.name}
                </h3>
                <p className="text-sm sm:text-base text-madara-textSecondary leading-relaxed mb-6">
                  {activeStation.description}
                </p>

                {/* Chef Specialty Highlight Box */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-madara-orange/20 flex items-center justify-center text-madara-orange flex-shrink-0 mt-0.5">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Chef&apos;s Live Execution
                    </h4>
                    <p className="text-xs text-madara-textSecondary mt-0.5">
                      {activeStation.chefSpecialty}
                    </p>
                  </div>
                </div>

                {/* Highlight Dishes */}
                <div>
                  <h4 className="text-xs font-bold text-madara-amber uppercase tracking-wider mb-3">
                    Featured Station Dishes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStation.highlightItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-white font-medium bg-black/30 px-3 py-2 rounded-lg border border-white/5"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-madara-orange flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                <a
                  href="#catering"
                  className="btn-primary-orange px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-glow-orange"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>View Catering Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(activeStation.name)}%20for%20our%20event.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

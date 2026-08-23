"use client";

import React from "react";
import { RESTAURANT_INFO, MENU_ITEMS } from "@/data/restaurantData";
import { 
  Wine, 
  Sparkles, 
  Check, 
  Flame, 
  GlassWater, 
  Snowflake, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Phone
} from "lucide-react";

export default function ByobExperience() {
  // Get top 4 BYOB pairing items from menu
  const byobBites = MENU_ITEMS.filter((item) => item.isByobPairing).slice(0, 4);

  const byobFeatures = [
    {
      icon: GlassWater,
      title: "Crystal Glassware",
      desc: "Highball, rock glasses, beer tumblers, and wine glasses provided.",
    },
    {
      icon: Snowflake,
      title: "Chilled Ice Buckets",
      desc: "Unlimited fresh ice and chilling buckets served right to your table.",
    },
    {
      icon: ShieldCheck,
      title: "Zero Hidden Corkage",
      desc: "Transparent, nominal fee waived with our signature sharing bite platters.",
    },
    {
      icon: Flame,
      title: "Fiery Chaser Pairings",
      desc: "Authentic hot butter & devilled dishes prepared spicy to order.",
    },
  ];

  return (
    <section id="byob" className="py-24 relative bg-madara-surface/60 overflow-hidden">
      {/* Background Glow */}
      <div className="ambient-glow w-[450px] h-[450px] bg-purple-600/10 top-10 right-10" />
      <div className="ambient-glow w-[350px] h-[350px] bg-madara-orange/5 bottom-10 left-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Wine className="w-3.5 h-3.5" />
            <span>Corkage-Friendly Hospitality</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            The Ultimate <span className="text-gradient-orange">BYOB Dining Experience</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-madara-textSecondary">
            Bring your favorite vintage, beer, or spirits. We provide the ice, crystal glassware, appetizing bites, and vibrant ambience for the ultimate evening in Homagama.
          </p>
        </div>

        {/* 4 BYOB Feature Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {byobFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col items-start hover:border-madara-orange/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-madara-orange group-hover:border-madara-orange group-hover:text-white transition-all duration-300 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-madara-orange transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-madara-textSecondary mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Chef's Recommended BYOB Chaser Bites */}
        <div className="glass-panel-orange rounded-3xl p-6 sm:p-10 border border-madara-orange/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold text-madara-orange uppercase tracking-wider">
                Pairing Recommendation
              </span>
              <h3 className="text-2xl font-bold text-white font-serif mt-1">
                Top Spicy Chasers &amp; Bites for Your Drinks
              </h3>
            </div>
            <a
              href="#menu"
              className="text-xs font-bold text-madara-orange hover:text-white transition-colors flex items-center gap-1 self-start md:self-auto"
            >
              <span>View Full Bites Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {byobBites.map((dish) => (
              <div
                key={dish.id}
                className="bg-black/40 rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-madara-orange/50 transition-all"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-madara-orange">
                    🌶️ Level {dish.spicyLevel}
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-madara-orange transition-colors">
                      {dish.name}
                    </h4>
                    <p className="text-[11px] text-madara-textMuted mt-1 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-madara-orange">
                      LKR {dish.priceLKR.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-madara-textSecondary bg-white/5 px-2 py-0.5 rounded-md">
                      {dish.portion}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BYOB Info Banner */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-madara-orange/20 flex items-center justify-center text-madara-orange flex-shrink-0">
                <Wine className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-madara-textSecondary">
                Planning a group dinner or get-together? Call ahead on <strong>070 453 5815</strong> so we can prepare ice buckets and seating in advance.
              </p>
            </div>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20we%20are%20planning%20a%20BYOB%20group%20dinner.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us (070 453 5815)</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

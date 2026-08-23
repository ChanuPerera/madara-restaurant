"use client";

import React from "react";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  Flame, 
  ChefHat, 
  Wine, 
  Truck, 
  Star, 
  ArrowRight, 
  Sparkles,
  UtensilsCrossed,
  ShieldCheck,
  Phone,
  MessageCircle,
  Clock,
  HeartHandshake
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { language, t } = useLanguage();
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 overflow-hidden">
      {/* Background Ambient Glowing Orbs */}
      <div className="ambient-glow w-[550px] h-[550px] bg-madara-orange/8 top-[-100px] left-1/2 -translate-x-1/2" />
      <div className="ambient-glow w-[350px] h-[350px] bg-amber-500/6 bottom-10 left-10" />
      <div className="ambient-glow w-[350px] h-[350px] bg-red-600/6 top-40 right-10" />

      {/* Background Pattern Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#23242e_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Catering-First Headline & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Pill Tag */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-4 py-2 rounded-2xl sm:rounded-full bg-white/5 border border-madara-orange/30 backdrop-blur-md mb-6 shadow-glow-orange-sm animate-float">
              <span className="flex h-2 w-2 rounded-full bg-madara-orange animate-ping flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-madara-orange uppercase tracking-wider">
                {t("hero.pill")}
              </span>
              <span className="hidden sm:inline text-xs text-white/40">|</span>
              <span className="text-[10px] sm:text-xs font-semibold text-white/90 whitespace-nowrap">
                191/B/1, Athurugiriya Rd
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white font-serif leading-[1.1] mb-6">
              {t("hero.title")}{" "}
              <span className="text-gradient-orange block mt-1">
                {t("hero.titleAccent")}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-madara-textSecondary max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t("hero.subtext")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#catering"
                className="btn-primary-orange px-7 py-4 rounded-xl text-base font-bold flex items-center gap-2 shadow-glow-orange group cursor-pointer"
              >
                <ChefHat className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>{t("hero.btnCatering")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#menu"
                className="btn-outline-dark px-6 py-4 rounded-xl text-base font-semibold flex items-center gap-2"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>{t("hero.btnMenu")}</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20event%20catering.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-6 py-4 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {RESTAURANT_INFO.whatsappFormatted}</span>
              </a>
            </div>

            {/* Service Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Full Event Catering</p>
                  <p className="text-[11px] text-madara-textMuted">Weddings • Dane • Parties</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-madara-amber flex-shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Live Action Wok</p>
                  <p className="text-[11px] text-madara-textMuted">Mongolian &amp; BBQ</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Wine className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">BYOB Dining</p>
                  <p className="text-[11px] text-madara-textMuted">Glassware &amp; Ice</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Express Delivery</p>
                  <p className="text-[11px] text-madara-textMuted">Takeaway &amp; Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Feature Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card with Glowing Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-madara-surface shadow-2xl group">
                <div className="aspect-[4/3] sm:aspect-[1/1] relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80"
                    alt="Madara Restaurant Luxury Catering & Event Setup"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-madara-dark via-transparent to-black/30" />
                </div>

                {/* Floating Badge 1: 4.9 Star Rating */}
                <div className="absolute top-4 left-4 glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-xl border border-white/15">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">4.9 / 5.0</span>
                  <span className="text-[10px] text-madara-textMuted">{language === "si" ? "(සාද 650+)" : "(650+ Events)"}</span>
                </div>

                {/* Floating Badge 2: Catering Flagship */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-madara-orange to-red-600 text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-glow-orange-sm">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>{language === "si" ? "කේටරින් පැකේජ" : "Customizable Packages"}</span>
                </div>

                {/* Card Bottom Content Overlay */}
                <div className="p-6 relative bg-madara-surfaceElevated/90 border-t border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold text-madara-orange uppercase tracking-wider">
                        {language === "si" ? "ඕනෑම උත්සවයකට ගැලපෙන" : "Tailored For Any Event"}
                      </span>
                      <h3 className="text-lg font-bold text-white font-serif mt-0.5">
                        {language === "si" ? "මංගල්‍ය • දානමය පිංකම් • අවමංගල්‍ය • උපන්දින" : "Weddings • Alms Giving • Funerals • Birthdays"}
                      </h3>
                      <p className="text-xs text-madara-textSecondary mt-1">
                        {language === "si" ? "උසස් තත්ත්වයේ ආහාර සැකසුම්, සජීවී කුටි සහ පළපුරුදු සේවක මණ්ඩලය." : "Complete chafing displays, live cooking stations, and experienced stewards."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Punctual Setup Guarantee
                    </span>
                    <a
                      href="#catering"
                      className="text-madara-orange font-bold hover:underline flex items-center gap-1"
                    >
                      View Packages →
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Counter Badge */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl glass-panel-orange border border-madara-orange/30 shadow-2xl animate-float">
                <div className="w-12 h-12 rounded-xl bg-madara-orange flex items-center justify-center text-white shadow-glow-orange">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-white">650+</p>
                  <p className="text-xs text-madara-textSecondary">Catering Events Delivered</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Key Stats Ribbon */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {RESTAURANT_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-white/5 text-center group hover:border-madara-orange/40 transition-all"
            >
              <p className="text-2xl sm:text-4xl font-extrabold text-white font-serif group-hover:text-madara-orange transition-colors">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-madara-textMuted mt-1 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

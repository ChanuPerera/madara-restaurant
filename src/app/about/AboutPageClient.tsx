"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import ModernNavbar from "@/components/modern/ModernNavbar";
import ModernFooter from "@/components/modern/ModernFooter";
import MobileActionDock from "@/components/MobileActionDock";
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  UtensilsCrossed, 
  ChefHat, 
  Users, 
  Sparkles, 
  HeartHandshake, 
  CheckCircle2,
  Flame,
  Soup,
  PartyPopper,
  BadgeCheck
} from "lucide-react";
import {
  useAboutHero,
  useAccreditations,
  useCulinaryServices,
  useHygieneStandards,
} from "@/services/aboutService";

export default function AboutPageClient() {
  const { language } = useLanguage();

  // Dynamic Firestore Data
  const { hero } = useAboutHero();
  const { accreditations } = useAccreditations();
  const { services } = useCulinaryServices();
  const { standards } = useHygieneStandards();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "UtensilsCrossed":
        return UtensilsCrossed;
      case "Users":
        return Users;
      case "Flame":
        return Flame;
      case "PartyPopper":
        return PartyPopper;
      case "Soup":
        return Soup;
      case "ChefHat":
        return ChefHat;
      case "Award":
        return Award;
      case "ShieldCheck":
        return ShieldCheck;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans flex flex-col justify-between">
      {/* Navbar */}
      <ModernNavbar />

      <main className="flex-1">
        {/* Standardized Breadcrumb Bar */}
        <div className="pt-24 sm:pt-28 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-stone-500">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-medium text-stone-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "si" ? "මුල් පිටුවට" : "Home"}</span>
              <span className="text-stone-300">/</span>
              <span className="text-amber-700 font-semibold">
                {language === "si" ? "අප ගැන" : "About Us"}
              </span>
            </Link>
          </div>
        </div>

        {/* Hero Section: Story & Vision (Mapped from Firestore 'about_hero' & 'accreditations') */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>
                    {language === "si" && hero.heroBadgeSi
                      ? hero.heroBadgeSi
                      : hero.heroBadge}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  {language === "si" && hero.heroTitleSi
                    ? hero.heroTitleSi
                    : hero.heroTitle}
                </h1>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {language === "si" && hero.heroDescriptionSi
                    ? hero.heroDescriptionSi
                    : hero.heroDescription}
                </p>

                {/* Accreditation Badges from Firestore 'accreditations' */}
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold text-stone-800">
                  {accreditations.map((badge, idx) => (
                    <div
                      key={badge.id || idx}
                      className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 hover:border-amber-300 transition-colors"
                    >
                      {idx % 2 === 0 ? (
                        <Award className="w-4 h-4 text-amber-700" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-amber-700" />
                      )}
                      <span>
                        {language === "si" && badge.titleSi
                          ? badge.titleSi
                          : badge.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {hero.heroImageUrl && (
                <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-stone-200">
                  <img
                    src={hero.heroImageUrl}
                    alt={hero.heroTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Our Core Services (Mapped from Firestore 'culinary_services') */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              {language === "si" ? "අපගේ සේවාවන්" : "What We Offer"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              {language === "si" ? "අපගේ ප්‍රධාන සේවා අංශ" : "Our Core Culinary Services"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => {
              const Icon = getServiceIcon(svc.icon);
              return (
                <div
                  key={svc.id}
                  className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-serif font-bold text-stone-900">
                      {language === "si" && svc.titleSi ? svc.titleSi : svc.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {language === "si" && svc.descSi ? svc.descSi : svc.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Certifications & Standards (Mapped from Firestore 'hygiene_standards') */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {language === "si" ? "ගුණාත්මක බව සහ සෞඛ්‍යය" : "Quality & Hygiene Standards"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1">
                {language === "si" ? "අපගේ උසස් ප්‍රමිතීන් සහ සහතික" : "Our Standards & Certifications"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {standards.map((std) => (
                <div
                  key={std.id}
                  className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between hover:bg-white/15 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
                      {std.badgeText && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {language === "si" && std.badgeTextSi
                            ? std.badgeTextSi
                            : std.badgeText}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-stone-100">
                      {language === "si" && std.titleSi ? std.titleSi : std.title}
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {language === "si" && std.descSi ? std.descSi : std.description}
                    </p>
                  </div>

                  {(std.certificateNumber || std.issuingBody || std.validUntil) && (
                    <div className="pt-2 border-t border-white/10 text-[10.5px] text-stone-400 space-y-0.5">
                      {std.certificateNumber && (
                        <span className="block font-mono text-[10px] text-amber-300/90 font-semibold">
                          {std.certificateNumber}
                        </span>
                      )}
                      {std.issuingBody && (
                        <span className="block text-stone-400 text-[11px] truncate">
                          {language === "si" && std.issuingBodySi
                            ? std.issuingBodySi
                            : std.issuingBody}
                        </span>
                      )}
                      {std.validUntil && (
                        <span className="block text-stone-400 text-[10px] italic">
                          {std.validUntil}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Map Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Card Details (5 Cols) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  {language === "si" ? "සම්බන්ධ වන්න" : "Get In Touch"}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                  {language === "si" ? "සම්පූර්ණ සේවා විස්තර" : "Contact & Location Info"}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-stone-900">Address:</strong>
                    <span>{RESTAURANT_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-stone-900">Hotlines:</strong>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-amber-700 block font-semibold">
                      {RESTAURANT_INFO.phoneFormatted}
                    </a>
                    <a href={`tel:${RESTAURANT_INFO.secondaryPhone}`} className="hover:text-amber-700 block font-semibold">
                      {RESTAURANT_INFO.secondaryPhoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-stone-900">Email:</strong>
                    <span>{RESTAURANT_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-stone-900">Operating Hours:</strong>
                    <span>{RESTAURANT_INFO.openingHours.daily}</span>
                    <span className="block text-[11px] text-amber-800 font-semibold mt-0.5">{RESTAURANT_INFO.openingHours.poyaDays}</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent("Hi Madara Restaurant! I would like to contact you regarding your services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Contact via WhatsApp</span>
                </a>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="py-3 px-5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Hotline</span>
                </a>
              </div>
            </div>

            {/* Google Maps Iframe (7 Cols) */}
            <div className="lg:col-span-7 h-96 lg:h-full min-h-[380px] rounded-3xl overflow-hidden border border-stone-200 shadow-sm relative bg-stone-100">
              <iframe
                title="Madara Restaurant Homagama Location Map"
                src={RESTAURANT_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer & Mobile Dock */}
      <ModernFooter />
      <MobileActionDock />
    </div>
  );
}

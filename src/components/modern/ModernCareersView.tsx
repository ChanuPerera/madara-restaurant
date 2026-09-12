"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ModernNavbar from "@/components/modern/ModernNavbar";
import ModernFooter from "@/components/modern/ModernFooter";
import OrLogo from "@/assets/orlogo-01.png";
import { JOB_VACANCIES, RESTAURANT_INFO } from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Briefcase, 
  ChefHat, 
  Users, 
  Sparkles, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ArrowLeft, 
  Building2, 
  HeartHandshake, 
  UtensilsCrossed,
  ShieldCheck,
  Flame,
  BadgeCheck
} from "lucide-react";

export default function ModernCareersView() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-stone-900 relative w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
      {/* Sleek Floating Capsule Navigation */}
      <ModernNavbar />

      {/* Breadcrumb & Hotline Sub-Bar */}
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
              {language === "si" ? "රැකියා අවස්ථා" : "Careers"}
            </span>
          </Link>

          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-stone-700 hover:text-amber-600 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>{RESTAURANT_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Hero Header: Clean, Light Theme, Minimal Text */}
      <section className="pt-4 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {language === "si"
                ? "අප සමඟ එක්වන්න • හෝමාගම"
                : "We Are Hiring • Homagama"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            {language === "si" ? (
              <>
                ඔබේ අනාගතය සරසා ගන්න <span className="text-amber-600">මඩර ආයතනය සමඟ</span>
              </>
            ) : (
              <>
                Build Your Career with <span className="text-amber-600">Madara Restaurant</span>
              </>
            )}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 leading-relaxed">
            {language === "si"
              ? "හෝමාගම වේගයෙන්ම වර්ධනය වන ආපනශාලා සහ කේටරින් සේවාව සමඟ එක්වන්න. නිසි කලට වැටුප්, නොමිලේ ආහාර, සහ සහයෝගී රැකියා පරිසරයක්."
              : "Join Homagama's premier restaurant & catering team. Competitive salaries, daily duty meals, respectful management, and long-term career growth."}
          </p>

          {/* Quick Metric Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-stone-700">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>{language === "si" ? "5ක් විවෘත රැකියා" : "5 Open Roles"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
              <span>{language === "si" ? "නොමිලේ ආහාර සැපයේ" : "100% Free Duty Meals"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>{language === "si" ? "නියමිත වේලාවට වැටුප්" : "On-Time Salary & Service Charge"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Homagama</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vacancies List Section - Minimal Light Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              {language === "si" ? "විවෘත තනතුරු" : "Job Opportunities"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
              {language === "si" ? (
                <>වත්මන් <span className="text-amber-600">රැකියා අවස්ථා</span></>
              ) : (
                <>Current Open <span className="text-amber-600">Positions</span></>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              {language === "si"
                ? "පහත තනතුරු අධ්‍යයනය කර WhatsApp හෝ දුරකථන ඇමතුමක් මගින් සෘජුවම අයදුම් කරන්න."
                : "Select a position below and apply instantly via WhatsApp or direct call."}
            </p>
          </div>

          <div className="space-y-6">
            {JOB_VACANCIES.map((job) => {
              const waText = `Hi Madara Restaurant! 👋\n\nI am interested in applying for the *${job.title} (${job.sinhalaTitle})* position.\n\nHere are my details:\n- *Name:*\n- *Contact Number:*\n- *Location:*\n- *Years of Experience:*\n\nPlease let me know when I can attend an interview. Thank you!`;
              const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(waText)}`;

              return (
                <div
                  key={job.id}
                  id={job.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-2xs hover:shadow-md transition-all duration-300 space-y-5"
                >
                  {/* Top Bar: Title & Action CTAs */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-stone-100">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
                          {job.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-semibold">
                          {job.type}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{language === "si" ? "තනතුර පුරප්පාඩුයි" : "Immediate Vacancy"}</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                        {job.title}
                      </h3>
                      <p className="text-xs font-semibold text-amber-700 mt-0.5">
                        {job.sinhalaTitle}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all hover:scale-102"
                      >
                        <MessageCircle className="w-4 h-4 fill-white/20" />
                        <span>{language === "si" ? "WhatsApp මගින් අයදුම් කරන්න" : "Apply on WhatsApp"}</span>
                      </a>
                      <a
                        href={`tel:${RESTAURANT_INFO.phone}`}
                        className="inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300/80 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                      >
                        <Phone className="w-4 h-4 text-amber-600" />
                        <span>{RESTAURANT_INFO.phone}</span>
                      </a>
                    </div>
                  </div>

                  {/* Location & Experience */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>{job.location}</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Briefcase className="w-4 h-4 text-amber-600" />
                      <span>{job.experience}</span>
                    </span>
                  </div>

                  {/* Concise Overview */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {job.overview}
                  </p>

                  {/* Compact Benefits & Key Tags */}
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-stone-900 mr-1">
                      {language === "si" ? "ප්‍රතිලාභ:" : "Key Benefits:"}
                    </span>
                    {job.benefits.map((b, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{b}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Join Us Section - Minimal Light Grid */}
      <section className="py-16 bg-stone-50/80 border-t border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              {language === "si" ? "අපගේ වාසි" : "Why Madara"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900">
              {language === "si" ? (
                <>ඇයි <span className="text-amber-600">මඩර ආයතනය තෝරාගත යුත්තේ?</span></>
              ) : (
                <>Why Work at <span className="text-amber-600">Madara Restaurant?</span></>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              {language === "si"
                ? "අපගේ කාර්ය මණ්ඩලය ගෞරවයෙන් සහ සමානත්වයෙන් රැකබලා ගනිමු."
                : "We treat our team with dignity, fairness, and continuous professional growth."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ChefHat className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === "si" ? "නවීන කුස්සි පහසුකම්" : "Modern Kitchen Setup"}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === "si"
                  ? "අධි තාක්ෂණික වොක් කුටි, පිසින උපකරණ සහ පිරිසිදු සේවා ස්ථාන."
                  : "High-spec wok burners, combi equipment, and clean hygienic stations."}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === "si" ? "නිසි කලට වැටුප්" : "Prompt & Fair Pay"}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === "si"
                  ? "සෑම මසකම නිසි දිනට මාසික වැටුප්, සේවා ගාස්තු සහ දීමනා."
                  : "Guaranteed on-time monthly salary, service charge, and event tips."}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === "si" ? "නොමිලේ ආහාර හා තේ" : "Free Meals & Tea"}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === "si"
                  ? "සෑම වැඩ මුරයකදීම රසවත් සහ පෝෂ්‍යදායී කාර්ය මණ්ඩල ආහාර ලබාදේ."
                  : "Nutritious, delicious staff meals provided on every working shift."}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === "si" ? "වෘත්තීය දියුණුව" : "Skill Advancement"}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                {language === "si"
                  ? "සජීවී වොක් සූපවේදීන්ගෙන් පුහුණුව ලබා ඉදිරියට යාමට අවස්ථාව."
                  : "Learn live wok action, event catering, and Sri Lankan culinary masteries."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct WhatsApp Application Dark Luxury Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-stone-950 via-[#1c140d] to-stone-950 text-white p-8 sm:p-12 shadow-2xl text-center space-y-6 border border-amber-500/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo Badge */}
          <div className="w-14 h-14 rounded-2xl bg-stone-900/90 border border-amber-500/40 p-2.5 flex items-center justify-center mx-auto shadow-xl ring-4 ring-amber-500/20 relative z-10 transition-transform group-hover:scale-105">
            <img
              src={OrLogo.src}
              alt="Madara Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-1.5 max-w-lg mx-auto relative z-10">
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-amber-50 tracking-tight leading-tight">
              {language === "si"
                ? "අදම අයදුම් කිරීමට සූදානම්ද?"
                : "Ready to Join Our Team?"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              {language === "si"
                ? "WhatsApp මගින් ඔබේ විස්තර එවන්න හෝ කළමනාකාරීත්වය සෘජුවම අමතන්න."
                : "Send your details via WhatsApp or call our manager directly today."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent("Hi Madara Restaurant! I am interested in applying for a job vacancy.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp: {RESTAURANT_INFO.whatsappFormatted}</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="inline-flex items-center gap-2.5 bg-stone-900/90 hover:bg-stone-850 text-amber-300 border border-amber-500/40 px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95 hover:border-amber-400"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <ModernFooter />
    </main>
  );
}

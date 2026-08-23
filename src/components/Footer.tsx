"use client";

import React from "react";
import Link from "next/link";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import LogoWhite from "@/assets/logo_white.png";
import { 
  Flame, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Wine, 
  ChefHat, 
  Briefcase,
  AlertCircle
} from "lucide-react";

export default function Footer() {
  const { language, t } = useLanguage();

  const quickLinks = [
    { name: t("nav.catering"), href: "/#catering" },
    { name: t("nav.menu"), href: "/#menu" },
    { name: t("nav.actionKitchen"), href: "/#action-kitchen" },
    { name: t("nav.byob"), href: "/#byob" },
    { name: t("nav.partners"), href: "/#partners" },
    { name: t("nav.gallery"), href: "/#gallery" },
    { name: t("nav.careers"), href: "/careers" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  const cateringOfferings = language === "si" ? [
    "විවාහ සහ දෙවැනි ගමන උත්සව කේටරින්",
    "දානමය පිංකම් කේටරින් සේවා",
    "බණ සහ පිරිත් දානමය සේවාවන්",
    "අවමංගල්‍ය උත්සව ආහාර සැපයීම",
    "උපන්දින සහ පෞද්ගලික සාද කේටරින්",
    "ආයතනික විධායක දිවා භෝජන සංග්‍රහ",
    "සජීවී මොන්ගෝලියන් වොක් කුටි",
    "සජීවී අඟුරු බාබකියු සහ ග්‍රිල්ස්",
    "100% රුචි පරිදි සැකසූ ආහාර මෙනු",
  ] : [
    "Wedding & Homecoming Catering",
    "Alms Giving Ceremonies (දානමය පිංකම්)",
    "Bana & Pirith Dane Services (බණ සහ දාන)",
    "Funeral Memorial Wake Catering",
    "Birthday & Milestone Party Feasts",
    "Corporate Executive Luncheons",
    "Live Mongolian Wok Action Stations",
    "Live Charcoal BBQ & Satay Grills",
    "100% Customizable Tailored Menus",
  ];

  return (
    <footer className="bg-[#050608] border-t border-white/10 relative text-madara-textSecondary overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow w-[500px] h-[500px] bg-madara-orange/5 bottom-0 left-1/2 -translate-x-1/2" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Bio (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center group inline-flex">
              <img
                src={LogoWhite.src}
                alt="MADARA Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="mt-4 text-xs sm:text-sm text-madara-textSecondary leading-relaxed">
              {t("footer.subtext")}
            </p>

            {/* Social Links & WhatsApp */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-madara-orange text-white flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href={RESTAURANT_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-madara-orange text-white flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold">ig</span>
              </a>
              <a
                href={RESTAURANT_INFO.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-madara-orange text-white flex items-center justify-center transition-all duration-300"
                aria-label="TikTok"
              >
                <span className="text-xs font-bold">tt</span>
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20catering%20packages.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-glow-orange-sm inline-flex"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {RESTAURANT_INFO.whatsappFormatted}</span>
              </a>

              <Link
                href="/careers"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5 inline-flex"
              >
                <Briefcase className="w-4 h-4" />
                <span>{language === "si" ? "අපි බඳවා ගන්නවා! (රැකියා 5ක්)" : "We're Hiring! (5 Roles)"}</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              {t("footer.linksHeader")}
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`hover:text-madara-orange transition-colors flex items-center gap-1.5 ${
                      link.href.includes("careers") ? "text-madara-amber font-semibold" : "text-madara-textSecondary"
                    }`}
                  >
                    <span className="text-madara-orange text-[10px]">▸</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Catering Specialties (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              {t("footer.servicesHeader")}
            </h4>
            <ul className="space-y-2 text-xs">
              {cateringOfferings.slice(0, 6).map((svc, idx) => (
                <li key={idx} className="text-madara-textMuted flex items-start gap-1">
                  <span className="text-madara-orange text-[10px] mt-0.5">•</span>
                  <span>{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              {t("footer.contactHeader")}
            </h4>
            <div className="space-y-2.5 text-xs text-madara-textSecondary">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-madara-orange flex-shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-madara-orange flex-shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white font-semibold text-white">
                  {RESTAURANT_INFO.phoneFormatted}
                </a>
                <span className="text-white/30">|</span>
                <a href={`tel:${RESTAURANT_INFO.secondaryPhone}`} className="hover:text-white">
                  {RESTAURANT_INFO.secondaryPhoneFormatted}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-madara-amber flex-shrink-0" />
                <span>{language === "si" ? "දිනපතා විවෘතයි: පෙ.ව 7:00 – ප.ව 10:00" : "Open Daily: 7:00 AM – 10:00 PM"}</span>
              </p>
              <p className="flex items-start gap-2 text-red-300 font-semibold bg-red-950/40 p-2 rounded-lg border border-red-900/40">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{t("footer.poyaWarning")}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & SEO Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-madara-textMuted">
          <p>© {new Date().getFullYear()} Madara Restaurant &amp; Catering Services. {t("footer.rights")}</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>191/B/1, Athurugiriya Road, Homagama</span>
            <span>•</span>
            <Link href="/careers" className="text-madara-amber hover:underline">
              {t("nav.careers")}
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Bottom Right WhatsApp Action Button */}
      <a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20catering%20packages%20and%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 btn-whatsapp p-3 sm:px-5 sm:py-3.5 rounded-full flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform duration-300 group max-w-[calc(100vw-2rem)]"
        title="Chat on WhatsApp (070 453 5815)"
      >
        <MessageCircle className="w-5 h-5 text-white animate-bounce" />
        <span className="hidden sm:inline text-xs font-bold text-white">
          WhatsApp Desk (070 453 5815)
        </span>
      </a>
    </footer>
  );
}

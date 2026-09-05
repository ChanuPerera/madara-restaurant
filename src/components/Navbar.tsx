"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  Flame, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MessageCircle, 
  Clock, 
  ChefHat,
  Briefcase,
  UtensilsCrossed,
  Wine,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  AlertCircle,
  ChevronDown
} from "lucide-react";
import LogoWhite from "@/assets/logo_white.png";
import { useLanguage } from "@/context/LanguageContext";
export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.classList.add("overflow-hidden", "h-screen");
      document.body.classList.add("overflow-hidden", "h-screen");
    } else {
      document.documentElement.classList.remove("overflow-hidden", "h-screen");
      document.body.classList.remove("overflow-hidden", "h-screen");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden", "h-screen");
      document.body.classList.remove("overflow-hidden", "h-screen");
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t("nav.catering"), href: "/catering", icon: ChefHat },
    { name: t("nav.menu"), href: "/#menu", icon: UtensilsCrossed },
    { name: t("nav.partners"), href: "/#partners", icon: Sparkles },
    { name: t("nav.gallery"), href: "/#gallery", icon: ImageIcon },
    { name: t("nav.careers"), href: "/careers", icon: Briefcase, isCareer: true },
    { name: t("nav.contact"), href: "/#contact", icon: MapPin },
  ];

  const mainNavLinks = navLinks.filter(
    (link) => link.name !== t("nav.partners") && link.name !== t("nav.gallery")
  );
  
  const moreNavLinks = navLinks.filter(
    (link) => link.name === t("nav.partners") || link.name === t("nav.gallery")
  );

  return (
    <>
      {/* Clean, Unified Top Notification Announcement Bar (Responsive across all screens) */}
      <div className="bg-gradient-to-r from-[#14151b] via-[#20170f] to-[#14151b] border-b border-madara-orange/20 text-xs py-2 px-3 sm:px-4 text-madara-textSecondary relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-madara-orange text-white uppercase tracking-wider flex-shrink-0">
              Homagama
            </span>
            <span className="text-[11px] sm:text-xs truncate">
              {language === "si" ? (
                <>✨ පෙ.ව 7:00 – ප.ව 10:00 • <strong className="text-amber-400">පෝය දිනවල වසා ඇත</strong></>
              ) : (
                <>✨ Open 7:00 AM – 10:00 PM • <strong className="text-amber-400">Closed on Full Moon Poya Days</strong></>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] flex-shrink-0">
            <span className="hidden lg:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-madara-orange" />
              Daily: 7:00 AM – 10:00 PM
            </span>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1 text-white hover:text-madara-orange transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-madara-orange" />
              <span className="hidden sm:inline">{RESTAURANT_INFO.phoneFormatted}</span>
              <span className="sm:hidden">070 453 5815</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full max-w-full ${
          isScrolled
            ? "bg-madara-dark/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Row 1: Logo (Left) and Buttons/Mobile Toggle (Right) */}
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center group">
              <img
                src={LogoWhite.src}
                alt="MADARA Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop CTA Action Buttons (First Row - Right Side) */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher Button */}
              <button
                onClick={() => setLanguage(language === "en" ? "si" : "en")}
                className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-madara-orange/50 hover:bg-white/10 text-xs font-extrabold transition-all text-madara-orange flex items-center gap-1.5 cursor-pointer shadow-md"
                title={language === "en" ? "සිංහල භාෂාවට මාරු වන්න" : "Switch to English"}
              >
                <span>🌐</span>
                <span>{language === "en" ? "සිංහල" : "English"}</span>
              </button>

              {/* WhatsApp Catering Packages Link */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20catering%20packages%20and%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("nav.catering")}</span>
              </a>

              {/* Call Us Button */}
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="btn-outline-dark px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-madara-orange" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
            </div>

            {/* Mobile / Tablet Menu Toggle & Quick WhatsApp Button (First Row - Right Side on Mobile) */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Header Language Toggle */}
              <button
                onClick={() => setLanguage(language === "en" ? "si" : "en")}
                className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/15 text-[10px] font-extrabold text-madara-orange flex items-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                <span>🌐</span>
                <span>{language === "en" ? "සිං" : "EN"}</span>
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-3 py-1.5 rounded-lg text-xs font-bold sm:hidden flex items-center gap-1 shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-white hover:text-madara-orange hover:border-madara-orange/50 focus:outline-none transition-colors cursor-pointer"
                aria-label="Open Navigation Drawer"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Row 2: Desktop Navigation Links (Second Row - Aligned Center) */}
          <div className="hidden lg:flex items-center justify-center border-t border-white/10 pt-3 mt-3">
            <nav className="flex items-center gap-3 xl:gap-5">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-all ${
                    link.isCareer
                      ? "text-madara-amber hover:text-white bg-madara-amber/10 hover:bg-madara-amber/20 font-bold"
                      : "text-madara-textSecondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* More > Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg text-madara-textSecondary hover:text-white hover:bg-white/5 flex items-center gap-1 transition-all cursor-pointer ${
                    moreOpen ? "bg-white/5 text-white" : ""
                  }`}
                >
                  <span>{t("nav.more")} &gt;</span>
                </button>
                
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-40 rounded-xl bg-madara-surfaceElevated border border-white/10 p-1.5 shadow-2xl z-50 transition-all duration-200 ${
                    moreOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {moreNavLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs xl:text-sm rounded-lg text-madara-textSecondary hover:text-white hover:bg-white/5 transition-all"
                      >
                        <Icon className="w-4 h-4 text-madara-orange" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* Mobile / Tablet Right-to-Left Slide-In Navigation Drawer */}
      {/* ======================================================== */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        
        {/* 1. Dark Backdrop Overlay */}
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* 2. Slide-Over Drawer Panel (Slides Right to Left with Opaque Dark Background) */}
        <aside
          className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-[360px] p-6 z-50 flex flex-col justify-between shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out border-l border-white/15 ${
            mobileMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
          }`}
          style={{ backgroundColor: "#0c0d12" }}
        >
          <div>
            {/* Drawer Top Header: Logo + Close Button */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center"
              >
                <img
                  src={LogoWhite.src}
                  alt="MADARA Logo"
                  className="h-9 w-auto object-contain"
                />
              </Link>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setLanguage(language === "en" ? "si" : "en")}
                  className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-extrabold text-madara-orange flex items-center gap-1 cursor-pointer"
                >
                  <span>🌐</span>
                  <span>{language === "en" ? "සිංහල" : "English"}</span>
                </button>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-madara-textSecondary hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Navigation Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="mt-6 flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between group ${
                      link.isCareer
                        ? "bg-madara-amber/15 text-amber-300 border border-amber-500/30 hover:bg-madara-amber/25"
                        : "text-madara-textSecondary hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${link.isCareer ? "text-amber-400" : "text-madara-orange"}`} />
                      <span>{link.name}</span>
                    </div>
                    <span className="text-xs text-madara-orange opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Drawer Bottom Action Hub */}
          <div className="mt-8 pt-5 border-t border-white/10 space-y-3">
            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20catering%20packages.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-whatsapp py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Packages (070 453 5815)</span>
            </a>

            {/* Call Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="btn-outline-dark py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-madara-orange" />
                <span>0704535815</span>
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.secondaryPhone}`}
                className="btn-outline-dark py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-madara-orange" />
                <span>0736535815</span>
              </a>
            </div>

            {/* Operating Hours Reminder */}
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-madara-textMuted text-center">
              <p>🕒 Open Daily: <strong>7:00 AM – 10:00 PM</strong></p>
              <p className="text-red-400 font-semibold mt-0.5">⚠️ Closed on Full Moon Poya Days</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

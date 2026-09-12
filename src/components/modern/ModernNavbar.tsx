"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  Phone, 
  MessageCircle, 
  Menu as MenuIcon, 
  X, 
  Globe,
  Sparkles
} from "lucide-react";

export default function ModernNavbar() {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#catering", labelEn: "Catering", labelSi: "කේටරින්" },
    { href: "#menu", labelEn: "Menu", labelSi: "මෙනුව" },
    { href: "#contact", labelEn: "Contact", labelSi: "විස්තර" },
  ];

  const getWhatsAppUrl = () => {
    const text =
      language === "si"
        ? "ආයුබෝවන් Madara Restaurant! මට කේටරින් සහ ආපනශාලා තොරතුරු පිළිබඳව දැනගැනීමට අවශ්‍යයි."
        : "Hi Madara Restaurant! I would like to inquire about catering & dine-in services.";
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass-panel-light shadow-md border border-stone-200/80 py-2.5 px-4 sm:px-6"
            : "bg-white/80 backdrop-blur-md border border-stone-200/50 py-3 px-4 sm:px-6 shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white font-serif font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-stone-900 tracking-wider text-base sm:text-lg leading-tight">
                MADARA
              </span>
              <span className="text-[10px] tracking-widest text-stone-500 uppercase font-medium">
                Restaurant & Catering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-stone-600 hover:text-amber-600 transition-colors uppercase tracking-wider"
              >
                {language === "si" ? link.labelSi : link.labelEn}
              </a>
            ))}
          </nav>

          {/* Right Utilities: Language, WhatsApp CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "si" : "en")}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-stone-700 hover:bg-stone-100 border border-stone-200 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span>{language === "en" ? "සිංහල" : "English"}</span>
            </button>

            {/* Phone Call (Hidden on Mobile) */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>

            {/* WhatsApp Quick CTA */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all hover:shadow hover:scale-[1.02]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-2 border-t border-stone-100 mt-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors"
              >
                {language === "si" ? link.labelSi : link.labelEn}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

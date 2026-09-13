"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import OrLogo from "@/assets/orlogo-01.png";
import { 
  Phone, 
  MessageCircle, 
  Menu as MenuIcon, 
  X, 
  Globe,
  User
} from "lucide-react";

export default function ModernNavbar() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
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
    { href: "/menu", labelEn: "Menu", labelSi: "මෙනුව" },
    { href: "/catering", labelEn: "Catering Book", labelSi: "කේටරින් බුක්" },
    { href: "/careers", labelEn: "Careers", labelSi: "රැකියා", isCareer: true },
    { href: "/#contact", labelEn: "Contact", labelSi: "විස්තර" },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

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
          mobileMenuOpen
            ? "bg-white shadow-xl border border-stone-200 py-2.5 px-4 sm:px-6 text-stone-900"
            : scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md border border-stone-200/80 py-2 px-4 sm:px-6 text-stone-900"
            : "bg-transparent border border-transparent py-2.5 px-4 sm:px-6 text-stone-900 shadow-none"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo with orlogo-01.png */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-auto flex items-center justify-center">
              <Image 
                src={OrLogo} 
                alt="Madara Logo" 
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                priority 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold tracking-wider text-base sm:text-lg leading-tight text-stone-900">
                MADARA
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-700">
                Restaurant & Catering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              if (link.isCareer) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-sm hover:scale-105 transition-all flex items-center gap-1.5 ring-2 ring-amber-400/50"
                  >
                    <User className="w-3.5 h-3.5 text-stone-950 fill-stone-950/20" />
                    <span>{language === "si" ? link.labelSi : link.labelEn}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-bold transition-colors uppercase tracking-wider ${
                    active
                      ? "text-amber-700 font-extrabold"
                      : "text-stone-800 hover:text-amber-600"
                  }`}
                >
                  {language === "si" ? link.labelSi : link.labelEn}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities: Language, WhatsApp CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "si" : "en")}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors text-stone-800 hover:bg-stone-200/60 border border-stone-300/80 bg-white/50"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === "en" ? "සිංහල" : "English"}</span>
            </button>

            {/* Phone Call (Hidden on Mobile) */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-stone-800 hover:bg-stone-100 border border-stone-200 bg-white/50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>{RESTAURANT_INFO.phoneFormatted}</span>
            </a>

            {/* WhatsApp Direct */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === "si" ? "විමසන්න" : "Inquire"}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg transition-colors text-stone-800 hover:bg-stone-200/60"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-stone-200/30 mt-3 space-y-3">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors uppercase tracking-wider ${
                      active
                        ? "text-amber-700 font-extrabold"
                        : "text-stone-800 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                  >
                    {language === "si" ? link.labelSi : link.labelEn}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MENU_ITEMS } from "@/data/restaurantData";
import {
  X,
  Search,
  MapPin,
  Compass,
  Utensils,
  BookOpen,
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  ExternalLink,
  FileCode2,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  ChefHat,
  Flame,
  Globe
} from "lucide-react";

export interface SitemapDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SitemapLinkItem {
  id: string;
  category: "pages" | "catering" | "menu" | "dishes" | "xml";
  title: string;
  sinhalaTitle?: string;
  description: string;
  sinhalaDescription?: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export default function SitemapDrawer({ isOpen, onClose }: SitemapDrawerProps) {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "pages" | "catering" | "menu" | "dishes" | "xml">("all");
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimateIn, setIsAnimateIn] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Smooth slide-in and slide-out ease-in-out animation lifecycle
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = "hidden";
      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimateIn(true);
        });
      });
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 400);
      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timer);
      };
    } else {
      setIsAnimateIn(false);
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        setIsMounted(false);
        setSearchQuery("");
        setActiveTab("all");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Comprehensive static and dynamic sitemap catalogue
  const sitemapItems: SitemapLinkItem[] = useMemo(() => {
    const corePages: SitemapLinkItem[] = [
      {
        id: "home",
        category: "pages",
        title: "Home — Madara Restaurant & Catering",
        sinhalaTitle: "මුල් පිටුව — ප්‍රධාන ද්වාරය",
        description: "Homagama's premier destination for event catering, live action cooking, and dining.",
        sinhalaDescription: "හෝමාගම අග්‍රගන්‍ය කේටරින් සත්කාරය, සජීවී ක්‍රියාකාරී මුළුතැන්ගෙය සහ ආපනශාලාව.",
        href: "/",
        badge: "Main",
      },
      {
        id: "catering-page",
        category: "pages",
        title: "Event Catering Packages & 3D Flipbook",
        sinhalaTitle: "කේටරින් පැකේජ සහ ත්‍රිමාණ මෙනු පොත",
        description: "Explore weddings, alms giving, bana, birthdays, and custom corporate feast packages.",
        sinhalaDescription: "විවාහ, දානමය පිංකම්, උපන්දින සහ ආයතනික උත්සව සඳහා විශේෂිත කේටරින් පැකේජ.",
        href: "/catering",
        badge: "Catering",
      },
      {
        id: "menu-page",
        category: "pages",
        title: "Restaurant Food & Beverage Catalog",
        sinhalaTitle: "ආපනශාලා මෙනුව (Dine-in / Takeaway)",
        description: "Browse 60+ dishes: Basmathi fried rice, cheese kottu, seafood, and chef specials.",
        sinhalaDescription: "බස්මති ෆ්‍රයිඩ් රයිස්, චීස් කොත්තු, සීෆුඩ් ඇතුළු ප්‍රණීත ආහාර වර්ග 60+ ක්.",
        href: "/menu",
        badge: "Dine-in",
      },
      {
        id: "catering-menu-book",
        category: "pages",
        title: "3D Interactive Catering Menu Book",
        sinhalaTitle: "ත්‍රිමාණ අන්තර්ක්‍රියාකාරී කේටරින් පොත",
        description: "Realistic page-flipping digital menu book with itemized curry lists and prices.",
        sinhalaDescription: "සැබෑ පොතක පිටු පෙරලන්නාක් මෙන් කියවිය හැකි ඩිජිටල් කේටරින් මෙනු පොත.",
        href: "/catering-menu",
        badge: "3D Flipbook",
      },
      {
        id: "careers-page",
        category: "pages",
        title: "Careers & Open Vacancies (5+ Roles)",
        sinhalaTitle: "රැකියා අවස්ථා (ඇබෑර්තු 5+ ක්)",
        description: "Join the Madara culinary team: Head Chef, Commis, Stewards, Captains & Cleaners.",
        sinhalaDescription: "අපගේ කණ්ඩායමට එක්වන්න: ප්‍රධාන සූපවේදීන්, සේවක මහත්වරුන් සහ උපස්ථායකයින්.",
        href: "/careers",
        badge: "Hiring",
      },
      {
        id: "about-page",
        category: "pages",
        title: "About Us & Kitchen Heritage",
        sinhalaTitle: "අප පිළිබඳව සහ අපගේ ඉතිහාසය",
        description: "Learn about our hygiene standards, event execution pedigree, and culinary passion.",
        sinhalaDescription: "අපගේ උසස් සනීපාරක්ෂක ප්‍රමිතීන්, ආහාර පිළියෙල කිරීම සහ අත්දැකීම්.",
        href: "/about",
        badge: "About",
      },
    ];

    const cateringOccasions: SitemapLinkItem[] = [
      {
        id: "cat-wedding",
        category: "catering",
        title: "Wedding & Homecoming Catering Feasts",
        sinhalaTitle: "විවාහ සහ දෙවැනි ගමන උත්සව කේටරින්",
        description: "Grand buffet spreads with chafing dishes, executive stewards, and welcome drinks.",
        sinhalaDescription: "විවාහ මංගල්‍යය සහ දෙවැනි ගමන උත්සව සඳහා විශේෂ සුඛෝපභෝගී බුෆේ සත්කාරය.",
        href: "/catering#menu-book",
        badge: "Weddings",
      },
      {
        id: "cat-bana-alms",
        category: "catering",
        title: "Sacred Alms Giving & Bana Sermons (දානමය පිංකම්)",
        sinhalaTitle: "දානමය පිංකම් සහ බණ දේශනා සඳහා සත්කාරය",
        description: "Prepared with extreme cleanliness and devotion for Maha Sangha and commemorative alms.",
        sinhalaDescription: "මහා සංඝරත්නය උදෙසා පිරිනමන දානය සහ බණ පිංකම් සඳහා පිරිසිදුව පිළියෙල කළ මෙනු.",
        href: "/catering#menu-book",
        badge: "Sacred",
      },
      {
        id: "cat-birthday",
        category: "catering",
        title: "Birthday & Milestone Celebration Menus",
        sinhalaTitle: "උපන්දින සහ පෞද්ගලික සාද සංග්‍රහ",
        description: "Vibrant party catering with egg fried rice, devilled chicken, and dessert stations.",
        sinhalaDescription: "උපන්දින සහ සාද සඳහා සකස් කළ විචිත්‍රවත් මෙනු සහ අතුරුපස කුටි.",
        href: "/catering#menu-book",
        badge: "Parties",
      },
      {
        id: "cat-corporate",
        category: "catering",
        title: "Corporate Executive Lunches & High Tea",
        sinhalaTitle: "ආයතනික විධායක දිවා භෝජන සංග්‍රහ",
        description: "Punctual, professional catering for annual general meetings, seminars, and conferences.",
        sinhalaDescription: "සම්මන්ත්‍රණ සහ ආයතනික රැස්වීම් සඳහා නියමිත වේලාවට සපයන උසස් සේවාව.",
        href: "/catering#menu-book",
        badge: "Corporate",
      },
      {
        id: "cat-funeral",
        category: "catering",
        title: "Funeral Memorial Wake Catering",
        sinhalaTitle: "අවමංගල්‍ය උත්සව ආහාර සැපයීම",
        description: "Dignified, prompt, and comforting catering for memorial wakes and gatherings.",
        sinhalaDescription: "අවමංගල්‍ය අවස්ථාවන් සඳහා ගෞරවනීය හා කඩිනම් ආහාර සැපයුම් සේවාව.",
        href: "/catering#menu-book",
        badge: "Memorial",
      },
      {
        id: "cat-mala-batha",
        category: "catering",
        title: "Traditional Mala Batha Menus",
        sinhalaTitle: "සාම්ප්‍රදායික මල බත මෙනු",
        description: "Authentic Katta Karawala, wattakka, dhal curry, and comforting rice preparations.",
        sinhalaDescription: "කටිට කරවල, වට්ටක්කා, පරිප්පු සමඟ ගමේ රසයෙන් පිරි මල බත සංග්‍රහය.",
        href: "/catering#menu-book",
        badge: "Traditional",
      },
      {
        id: "cat-action-kitchen",
        category: "catering",
        title: "Live Action Kitchen & Mongolian Wok Stations",
        sinhalaTitle: "සජීවී මොන්ගෝලියන් වොක් සහ BBQ කුටි",
        description: "Live chefs preparing stir-fried noodles, sizzling BBQ skewers, and hot hoppers.",
        sinhalaDescription: "අමුත්තන් ඉදිරියෙහිම පිළියෙල කෙරෙන සජීවී හොපර්ස්, මොන්ගෝලියන් සහ BBQ ස්ටේෂන්.",
        href: "/catering#addons",
        badge: "Live Station",
      },
    ];

    const menuCategories: SitemapLinkItem[] = [
      {
        id: "menu-cat-all",
        category: "menu",
        title: "All Dine-In & Takeaway Dishes",
        sinhalaTitle: "සියලුම කෑම වර්ග (All Dishes)",
        description: "View entire restaurant menu catalog with portions and prices.",
        sinhalaDescription: "ආපනශාලාවේ සියලුම ආහාර වර්ග, කොටස් සහ මිල ගණන් පිරික්සන්න.",
        href: "/menu",
        badge: "All Dishes",
      },
      {
        id: "menu-cat-rice",
        category: "menu",
        title: "Basmathi Fried Rice Specialties",
        sinhalaTitle: "බස්මති ෆ්‍රයිඩ් රයිස් විශේෂාංග",
        description: "Steamed fragrant basmathi tossed with vegetable, egg, chicken, seafood, or mix.",
        sinhalaDescription: "එළවළු, බිත්තර, චිකන්, සීෆුඩ් සහ මික්ස් බස්මති ෆ්‍රයිඩ් රයිස් වර්ග.",
        href: "/menu?category=rice",
        badge: "Rice",
      },
      {
        id: "menu-cat-kottu",
        category: "menu",
        title: "Signature Kottu & Melted Cheese Kottu",
        sinhalaTitle: "විශේෂිත කොත්තු සහ චීස් කොත්තු",
        description: "Freshly chopped godamba roti with spices, chicken, seafood, dolphin, and rich cheese.",
        sinhalaDescription: "චිකන්, සීෆුඩ්, ඩොල්ෆින් සහ උණු කළ චීස් මුසු කළ රසවත් කොත්තු වර්ග.",
        href: "/menu?category=kottu",
        badge: "Kottu",
      },
      {
        id: "menu-cat-other",
        category: "menu",
        title: "Chef's Specials, Sizzlers & Sides",
        sinhalaTitle: "විශේෂ කෑම වර්ග, ඩෙවිල් සහ සයිඩ් ඩිෂ්",
        description: "Devilled chicken, hot butter cuttlefish, chopsuey, and fresh salads.",
        sinhalaDescription: "හොට් බටර් දැල්ලන්, චිකන් ඩෙවිල්, චොප්සි සහ සලාද වර්ග.",
        href: "/menu?category=other",
        badge: "Sides & Mains",
      },
    ];

    // Popular items from MENU_ITEMS
    const dishItems: SitemapLinkItem[] = MENU_ITEMS.slice(0, 15).map((dish) => ({
      id: `dish-${dish.id}`,
      category: "dishes",
      title: dish.name,
      sinhalaTitle: dish.sinhalaName || dish.name,
      description: `${dish.portion} • ${dish.description.slice(0, 75)}...`,
      sinhalaDescription: `${dish.portion} • ${dish.sinhalaName || dish.name}`,
      href: `/menu/${dish.id}`,
      badge: dish.category.toUpperCase(),
    }));

    const technicalItems: SitemapLinkItem[] = [
      {
        id: "sitemap-xml",
        category: "xml",
        title: "Official XML Sitemap (Search Engine Protocol)",
        sinhalaTitle: "සෙවුම් යන්ත්‍ර සඳහා වන නිල XML සිතියම",
        description: "74+ fully pre-rendered URLs indexing all landing pages and dynamic dish detail routes.",
        sinhalaDescription: "Google සහ අනෙකුත් සෙවුම් යන්ත්‍ර සඳහා සකස් කළ සවිස්තරාත්මක XML අඩවි සිතියම.",
        href: "/sitemap.xml",
        badge: "XML",
        isExternal: true,
      },
      {
        id: "robots-txt",
        category: "xml",
        title: "Robots.txt Crawl Directives",
        sinhalaTitle: "Robots.txt නීති හා මාර්ගෝපදේශ",
        description: "Standard web robot exclusion protocol linking directly to the XML sitemap index.",
        sinhalaDescription: "සෙවුම් යන්ත්‍ර රොබෝවරුන් සඳහා නීති සහ සිතියම් යොමුව.",
        href: "/robots.txt",
        badge: "Robots",
        isExternal: true,
      },
    ];

    return [...corePages, ...cateringOccasions, ...menuCategories, ...dishItems, ...technicalItems];
  }, []);

  // Filter items by category tab & search query
  const filteredItems = useMemo(() => {
    let result = sitemapItems;

    if (activeTab !== "all") {
      result = result.filter((item) => item.category === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.sinhalaTitle && item.sinhalaTitle.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q) ||
          (item.sinhalaDescription && item.sinhalaDescription.toLowerCase().includes(q)) ||
          item.href.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q))
      );
    }

    return result;
  }, [sitemapItems, activeTab, searchQuery]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center pointer-events-auto transition-opacity duration-500 ease-in-out ${
        isAnimateIn ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Dimmed Backdrop with ease-in-out fade */}
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          isAnimateIn ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet Drawer Container with Smooth Slide-in Ease-in-out */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sitemap-drawer-title"
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className={`relative w-full max-w-5xl max-h-[88vh] sm:max-h-[82vh] bg-stone-900 border-t border-amber-500/40 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden text-stone-200 z-10 transition-transform duration-500 ease-in-out transform will-change-transform ${
          isAnimateIn ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Grab Handle */}
        <div className="pt-3 pb-1 flex justify-center shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-stone-700/80 hover:bg-stone-600 transition-colors cursor-grab" />
        </div>

        {/* Header Bar */}
        <div className="px-5 sm:px-8 py-3 border-b border-stone-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="sitemap-drawer-title"
                  className="text-base sm:text-lg font-serif font-bold text-white tracking-wide"
                >
                  {language === "si" ? "අඩවි සිතියම සහ නාමාවලිය" : "Site Map & Navigation Directory"}
                </h2>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/20">
                  {sitemapItems.length}+ URLs
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {language === "si"
                  ? "පිටුවක් තෝරාගත් පසු Bottom Sheet එක ස්වයංක්‍රීයව වැසී අදාළ පිටුවට යොමු වේ."
                  : "Click any destination to navigate immediately. Drawer closes automatically."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs border border-stone-700 transition-colors"
              title="Open raw XML sitemap for search engines"
            >
              <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
              <span>XML Sitemap</span>
              <ArrowRight className="w-3 h-3 text-stone-400" />
            </a>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Site Map"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="px-5 sm:px-8 py-3 bg-stone-950/60 border-b border-stone-800 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "si"
                  ? "අඩවි සිතියමේ පිටු, කේටරින් සේවා හෝ කෑම වර්ග සොයන්න..."
                  : "Search pages, catering packages, or dishes (e.g., wedding, cheese kottu, rice)..."
              }
              className="w-full bg-stone-900 border border-stone-700/80 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeTab === "all"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {language === "si" ? "සියල්ල" : "All"} ({sitemapItems.length})
            </button>

            <button
              onClick={() => setActiveTab("pages")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeTab === "pages"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {language === "si" ? "ප්‍රධාන පිටු" : "Main Pages"}
            </button>

            <button
              onClick={() => setActiveTab("catering")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeTab === "catering"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {language === "si" ? "කේටරින් සේවා" : "Catering & Events"}
            </button>

            <button
              onClick={() => setActiveTab("menu")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeTab === "menu"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {language === "si" ? "මෙනු වර්ග" : "Menu Categories"}
            </button>

            <button
              onClick={() => setActiveTab("dishes")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeTab === "dishes"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {language === "si" ? "ප්‍රධාන ආහාර" : "Popular Dishes"}
            </button>

            <button
              onClick={() => setActiveTab("xml")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeTab === "xml"
                  ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {language === "si" ? "XML සිතියම" : "XML Sitemap"}
            </button>
          </div>
        </div>

        {/* Scrollable Sitemap Links Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-3 overscroll-contain">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Compass className="w-8 h-8 text-stone-600 mx-auto" />
              <p className="text-sm text-stone-400">
                {language === "si"
                  ? `"${searchQuery}" සඳහා ප්‍රතිඵල හමු නොවීය.`
                  : `No sitemap links matching "${searchQuery}".`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="text-xs text-amber-400 hover:underline pt-1"
              >
                {language === "si" ? "සියල්ල නැවත පෙන්වන්න" : "Reset search and show all"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="group p-3.5 sm:p-4 rounded-2xl bg-stone-800/60 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/50 transition-all duration-200 flex items-start justify-between gap-3 text-left"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-stone-700/70 text-amber-300 border border-amber-500/20">
                          {item.badge}
                        </span>
                      )}
                      <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                        {language === "si" && item.sinhalaTitle ? item.sinhalaTitle : item.title}
                      </h3>
                    </div>

                    <p className="text-[11px] text-stone-400 group-hover:text-stone-300 line-clamp-2 leading-relaxed">
                      {language === "si" && item.sinhalaDescription
                        ? item.sinhalaDescription
                        : item.description}
                    </p>

                    <div className="pt-1 text-[10px] text-stone-500 font-mono flex items-center gap-1">
                      <span className="text-amber-500/70">URL:</span>
                      <span className="truncate">{item.href}</span>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-xl bg-stone-700/50 group-hover:bg-amber-500 group-hover:text-stone-950 text-stone-400 flex items-center justify-center shrink-0 transition-all duration-200 mt-1">
                    {item.isExternal ? (
                      <ExternalLink className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer Bar inside Drawer */}
        <div className="px-5 sm:px-8 py-3 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {language === "si"
                ? "සම්පූර්ණ අඩවි සිතියම • සෙවුම් යන්ත්‍ර සඳහා සක්‍රීයයි"
                : "Active SSG Dynamic Sitemap • 74+ Indexed URLs"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>sitemap.xml</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              {language === "si" ? "වසන්න" : "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

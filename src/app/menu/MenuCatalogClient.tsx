"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MENU_ITEMS, 
  MENU_CATEGORIES, 
  RESTAURANT_INFO
} from "@/data/restaurantData";
import { useMenuItems, MENU_FALLBACK_IMAGE } from "@/services/menuService";
import { useLanguage } from "@/context/LanguageContext";
import ModernNavbar from "@/components/modern/ModernNavbar";
import ModernFooter from "@/components/modern/ModernFooter";
import MobileActionDock from "@/components/MobileActionDock";
import { 
  Search, 
  UtensilsCrossed, 
  ChevronRight, 
  Info,
  ArrowLeft,
  Phone,
  Radio
} from "lucide-react";

function MenuCatalogCardImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src || MENU_FALLBACK_IMAGE);

  useEffect(() => {
    setImgSrc(src || MENU_FALLBACK_IMAGE);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      onError={() => setImgSrc(MENU_FALLBACK_IMAGE)}
    />
  );
}

export default function MenuCatalogClient() {
  const { language } = useLanguage();
  const { items: liveMenuItems, isLive } = useMenuItems();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const restoredRef = useRef(false);

  // Restore scroll and filter state when returning from product details
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    try {
      const shouldRestore = sessionStorage.getItem("madara_menu_should_restore") === "true";
      const rawState = sessionStorage.getItem("madara_menu_state");

      if (shouldRestore && rawState) {
        sessionStorage.removeItem("madara_menu_should_restore");
        const state = JSON.parse(rawState);

        // Within reasonable time window (2 hours)
        if (Date.now() - (state.timestamp || 0) < 2 * 60 * 60 * 1000) {
          restoredRef.current = true;

          if (state.selectedCategory) {
            setSelectedCategory(state.selectedCategory);
          }
          if (state.searchQuery) {
            setSearchQuery(state.searchQuery);
          }
          if (state.itemId) {
            setHighlightedItemId(state.itemId);
            setTimeout(() => setHighlightedItemId(null), 3000);
          }

          const targetY = typeof state.scrollY === "number" ? state.scrollY : 0;
          const targetItemId = state.itemId;

          const performScroll = () => {
            if (targetItemId) {
              const el = document.getElementById(`menu-item-${targetItemId}`);
              if (el) {
                el.scrollIntoView({ block: "center", behavior: "instant" });
                return true;
              }
            }
            if (targetY > 0) {
              window.scrollTo({ top: targetY, behavior: "instant" });
              return true;
            }
            return false;
          };

          performScroll();
          const rId = requestAnimationFrame(performScroll);
          const t1 = setTimeout(performScroll, 60);
          const t2 = setTimeout(performScroll, 160);
          const t3 = setTimeout(performScroll, 320);
          const t4 = setTimeout(performScroll, 550);

          return () => {
            cancelAnimationFrame(rId);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
          };
        }
      }
    } catch (err) {
      console.warn("Could not restore menu scroll state:", err);
    }
  }, []);

  // Save state when clicking an item or navigating
  const saveCatalogState = (itemId?: string) => {
    try {
      const state = {
        scrollY: window.scrollY,
        itemId: itemId || "",
        selectedCategory,
        searchQuery,
        timestamp: Date.now(),
      };
      sessionStorage.setItem("madara_menu_state", JSON.stringify(state));
      sessionStorage.setItem("madara_menu_should_restore", "true");
    } catch {}
  };

  // Continuously record scroll position so back navigation remembers exact depth
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        try {
          const raw = sessionStorage.getItem("madara_menu_state");
          const existing = raw ? JSON.parse(raw) : {};
          sessionStorage.setItem(
            "madara_menu_state",
            JSON.stringify({
              ...existing,
              scrollY: window.scrollY,
              selectedCategory,
              searchQuery,
              timestamp: Date.now(),
            })
          );
        } catch {}
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [selectedCategory, searchQuery]);

  // Restaurant menu items mapped from Firebase Firestore (with fallback)
  const cardItems = useMemo(() => {
    return liveMenuItems.map((item) => ({
      id: item.id,
      name: item.name,
      sinhalaName: item.sinhalaName,
      category: item.category,
      categoryLabel: MENU_CATEGORIES.find(c => c.id === item.category)?.name || "Other",
      priceDisplay: item.portions && item.portions.length > 0
        ? `Rs. ${item.portions[0].priceLKR.toLocaleString()} – ${item.portions[item.portions.length - 1].priceLKR.toLocaleString()}/=`
        : `Rs. ${item.priceLKR.toLocaleString()}/=`,
      priceValue: item.priceLKR,
      portion: item.portion,
      description: item.description,
      image: item.image?.trim() || MENU_FALLBACK_IMAGE,
      tags: item.tags,
      allergens: item.allergens || []
    }));
  }, [liveMenuItems]);

  // Filtered items based on active category & search
  const filteredItems = useMemo(() => {
    return cardItems.filter((item) => {
      // Category Filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSinhala = item.sinhalaName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);

        if (!matchesName && !matchesSinhala && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [cardItems, selectedCategory, searchQuery]);

  // Ensure scroll is performed once filteredItems update
  useEffect(() => {
    if (highlightedItemId && restoredRef.current) {
      const el = document.getElementById(`menu-item-${highlightedItemId}`);
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }
  }, [filteredItems, highlightedItemId]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans flex flex-col justify-between">
      {/* Universal Floating Light Navbar */}
      <ModernNavbar />

      <main className="flex-1">
        {/* Consistent Breadcrumb & Hotline Sub-Bar */}
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
                {language === "si" ? "ආපනශාලා මෙනුව" : "Food Menu"}
              </span>
            </Link>

          </div>
        </div>

        {/* Header / Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-stone-900 max-w-3xl mx-auto leading-tight">
            {language === "si" ? (
              <>අපගේ <span className="text-amber-700">ආපනශාලා මෙනුව</span></>
            ) : (
              <>Explore Our <span className="text-amber-700">Food Menu</span></>
            )}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            {language === "si"
              ? "හෝමාගම මදාරා ආපනශාලාවේ ප්‍රණීත බත්, කොත්තු, අතුරු පස සහ විශේෂ කෑම වර්ග."
              : "Delicious freshly cooked Rice, Kottu, Side Dishes & Special Items at Madara Restaurant Homagama."}
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-lg mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "si" ? "කෑම වර්ග, බත්, කොත්තු සොයන්න..." : "Search Rice, Kottu, Side Dishes..."}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-stone-300 rounded-2xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-xs sm:text-sm shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs bg-stone-100 text-stone-600 hover:text-stone-900 px-2 py-0.5 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Dynamic Category Filter Chips & Live Indicator */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center gap-2 justify-center flex-wrap">
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === "all" ? liveMenuItems.length : liveMenuItems.filter(i => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                      : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
                  }`}
                >
                  <span>{language === "si" && cat.sinhalaName ? cat.sinhalaName : cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-black/30 text-white" : "bg-stone-100 text-stone-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          {isLive && (
            <div className="flex justify-center mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{language === "si" ? "සජීවී CMS මෙනුව සක්‍රියයි" : "Live CMS Menu Active"}</span>
              </span>
            </div>
          )}
        </section>

        {/* Product Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 max-w-lg mx-auto shadow-xs">
              <Info className="w-10 h-10 text-amber-600 mx-auto mb-2" />
              <h3 className="text-base font-bold text-stone-800">No dishes match your selection</h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">Try choosing another category or clearing search.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700 transition-all"
              >
                Reset Selection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                // SINGLE LANGUAGE ONLY
                const displayName = language === "si" && item.sinhalaName ? item.sinhalaName : item.name;

                const isHighlighted = highlightedItemId === item.id;

                return (
                  <Link
                    key={item.id}
                    id={`menu-item-${item.id}`}
                    href={`/menu/${item.id}`}
                    onClick={() => saveCatalogState(item.id)}
                    className={`group bg-white border ${
                      isHighlighted
                        ? "border-amber-500 ring-4 ring-amber-400/50 shadow-xl"
                        : "border-stone-200/90 hover:border-amber-400 shadow-xs hover:shadow-md"
                    } rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between`}
                  >
                    {/* Top Image */}
                    <div className="relative h-52 w-full bg-stone-100 overflow-hidden">
                      <MenuCatalogCardImage
                        src={item.image}
                        alt={displayName}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      {/* Category Label */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-stone-800 uppercase tracking-wider shadow-xs border border-stone-200">
                          {item.categoryLabel}
                        </span>
                      </div>

                      {/* Price Tag Overlay */}
                      <div className="absolute bottom-3 left-3">
                        <span className="text-xl font-black text-white drop-shadow-md">
                          {item.priceDisplay}
                        </span>
                        <span className="block text-[11px] font-semibold text-stone-200">
                          {item.portion}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title - Single Language Only */}
                        <h2 className="text-base font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug mb-2">
                          {displayName}
                        </h2>

                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Clean Single CTA: View Details */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-800">
                        <span>{language === "si" ? "තොරතුරු බලන්න" : "View Food Details"}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Universal Footer */}
      <ModernFooter />
      <MobileActionDock />
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MENU_ITEMS, 
  MENU_CATEGORIES, 
  RESTAURANT_INFO
} from "@/data/restaurantData";
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
  Phone
} from "lucide-react";

export default function MenuCatalogClient() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Restaurant menu items only (No catering packages)
  const cardItems = useMemo(() => {
    return MENU_ITEMS.map((item) => ({
      id: item.id,
      name: item.name,
      sinhalaName: item.sinhalaName,
      category: item.category, // rice, kottu, other
      categoryLabel: MENU_CATEGORIES.find(c => c.id === item.category)?.name || "Other",
      priceDisplay: `Rs. ${item.priceLKR.toLocaleString()}/=`,
      priceValue: item.priceLKR,
      portion: item.portion,
      description: item.description,
      image: item.image,
      tags: item.tags,
      allergens: item.allergens || []
    }));
  }, []);

  // Filtered items based on active category & search
  const filteredItems = useMemo(() => {
    return cardItems.filter((item) => {
      // Category Filter (Rice, Kottu, Other)
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

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-stone-700 hover:text-amber-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>{RESTAURANT_INFO.phoneFormatted}</span>
            </a>
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
              ? "හෝමාගම මදාරා ආපනශාලාවේ ප්‍රණීත බත්, කොත්තු, ෂෝටීස් සහ විශේෂ කෑම වර්ග."
              : "Delicious freshly cooked Rice, Kottu, Shorties & Special Dishes at Madara Restaurant Homagama."}
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-lg mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "si" ? "කෑම වර්ග, බත්, කොත්තු සොයන්න..." : "Search Rice, Kottu, Shorties..."}
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

        {/* Categories: All, Rice, Kottu, Other */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center gap-2 justify-center flex-wrap">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === "all"
                  ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                  : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
              }`}
            >
              {language === "si" ? "සියලු කෑම (All)" : "All Dishes"}
            </button>

            <button
              onClick={() => setSelectedCategory("rice")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === "rice"
                  ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                  : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
              }`}
            >
              🍚 {language === "si" ? "බත් (Rice)" : "Rice"}
            </button>

            <button
              onClick={() => setSelectedCategory("kottu")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === "kottu"
                  ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                  : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
              }`}
            >
              🍲 {language === "si" ? "කොත්තු (Kottu)" : "Kottu"}
            </button>

            <button
              onClick={() => setSelectedCategory("other")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === "other"
                  ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                  : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
              }`}
            >
              🍽️ {language === "si" ? "වෙනත් (Other / Shorties)" : "Other"}
            </button>
          </div>
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

                return (
                  <Link
                    key={item.id}
                    href={`/menu/${item.id}`}
                    className="group bg-white border border-stone-200/90 hover:border-amber-400 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    {/* Top Image */}
                    <div className="relative h-52 w-full bg-stone-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={displayName}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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

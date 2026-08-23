"use client";

import React, { useState, useMemo } from "react";
import { 
  MENU_CATEGORIES, 
  MENU_ITEMS, 
  MenuItem, 
  RESTAURANT_INFO 
} from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Search, 
  Flame, 
  Sparkles, 
  ChefHat, 
  Wine, 
  Soup, 
  Fish, 
  Coffee, 
  UtensilsCrossed, 
  X, 
  MessageCircle, 
  Tag, 
  CheckCircle,
  Clock
} from "lucide-react";

export default function MenuSection() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeModalDish, setActiveModalDish] = useState<MenuItem | null>(null);

  // Icon mapper helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame": return Flame;
      case "ChefHat": return ChefHat;
      case "Soup": return Soup;
      case "Sparkles": return Sparkles;
      case "Fish": return Fish;
      case "Wine": return Wine;
      case "Coffee": return Coffee;
      default: return UtensilsCrossed;
    }
  };

  // Filtered menu logic
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Category check
      const matchesCategory =
        selectedCategory === "all" || dish.category === selectedCategory;

      // Search query check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q) ||
        (dish.sinhalaName && dish.sinhalaName.toLowerCase().includes(q)) ||
        dish.tags.some((t) => t.toLowerCase().includes(q));

      // Dietary / Feature pill check
      let matchesFilter = true;
      if (selectedFilter === "chefs_special") {
        matchesFilter = !!dish.isChefsSpecial;
      } else if (selectedFilter === "action_kitchen") {
        matchesFilter = !!dish.isActionKitchen;
      } else if (selectedFilter === "byob_pairing") {
        matchesFilter = !!dish.isByobPairing;
      } else if (selectedFilter === "vegetarian") {
        matchesFilter = !!dish.isVegetarian;
      } else if (selectedFilter === "spicy") {
        matchesFilter = (dish.spicyLevel ?? 0) >= 2;
      }

      return matchesCategory && matchesSearch && matchesFilter;
    });
  }, [selectedCategory, searchQuery, selectedFilter]);

  return (
    <section id="menu" className="py-24 relative bg-madara-dark">
      {/* Background ambient lighting */}
      <div className="ambient-glow w-[500px] h-[500px] bg-madara-orange/5 top-1/4 left-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madara-orange/10 border border-madara-orange/30 text-madara-orange text-xs font-bold uppercase tracking-wider mb-4 shadow-glow-orange-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("menu.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            {t("menu.title")} <span className="text-gradient-orange">{t("menu.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-madara-textSecondary">
            {t("menu.subtext")}
          </p>
        </div>

        {/* Search & Quick Filters Bar */}
        <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 mb-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <Search className="w-4 h-4 text-madara-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("menu.searchPlaceholder")}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-madara-textMuted focus:outline-none focus:border-madara-orange transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-madara-textMuted hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Dietary / Attribute Filter Pills */}
          <div className="w-full md:w-1/2 overflow-x-auto pb-2 md:pb-0 scrollbar-orange">
            <div className="flex items-center gap-1.5 w-max px-1">
              {[
                { id: "all", label: t("menu.all") },
                { id: "chefs_special", label: `⭐ ${t("menu.chefsPicks")}` },
                { id: "action_kitchen", label: `🔥 ${t("menu.liveAction")}` },
                { id: "byob_pairing", label: `🍾 ${t("menu.byobBites")}` },
                { id: "vegetarian", label: `🌿 ${t("menu.vegetarian")}` },
                { id: "spicy", label: `🌶️ ${language === "si" ? "අධික සැර" : "Extra Spicy"}` },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedFilter === f.id
                      ? "bg-madara-orange text-white shadow-glow-orange-sm"
                      : "bg-white/5 text-madara-textSecondary hover:bg-white/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Category Navigation Pills */}
        <div className="w-full overflow-x-auto pb-4 mb-10 scrollbar-orange">
          <div className="flex items-center gap-2 w-max min-w-full justify-start md:justify-center px-4">
            {MENU_CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.icon);
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-madara-orange to-red-600 text-white shadow-glow-orange scale-105"
                      : "bg-white/5 text-madara-textSecondary border border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-madara-orange" />
                  <span>{language === "si" && cat.sinhalaName ? cat.sinhalaName : cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setActiveModalDish(dish)}
                className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between group cursor-pointer border border-white/10 hover:border-madara-orange/50 transition-all duration-300"
              >
                {/* Dish Photo */}
                <div className="aspect-[4/3] relative overflow-hidden bg-black/40">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-madara-dark/90 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1">
                    {dish.isChefsSpecial && (
                      <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] sm:text-[11px] font-extrabold flex items-center gap-0.5 sm:gap-1 shadow-md">
                        <Sparkles className="w-2.5 h-2.5" /> <span className="hidden xs:inline">{language === "si" ? "විශේෂ තේරීම" : "Chef Pick"}</span>
                      </span>
                    )}
                    {dish.isActionKitchen && (
                      <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] sm:text-[11px] font-extrabold flex items-center gap-0.5 sm:gap-1 shadow-md">
                        <Flame className="w-2.5 h-2.5" /> <span className="hidden xs:inline">{language === "si" ? "සජීවී" : "Live"}</span>
                      </span>
                    )}
                    {dish.isVegetarian && (
                      <span className="px-1.5 sm:px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] sm:text-[11px] font-extrabold flex items-center gap-0.5 sm:gap-1 shadow-md">
                        🌿 <span className="hidden xs:inline">{language === "si" ? "නිර්මාංශ" : "Veg"}</span>
                      </span>
                    )}
                  </div>

                  {/* Spice Level Indicator */}
                  {dish.spicyLevel !== undefined && dish.spicyLevel > 0 && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-red-400 border border-red-500/20">
                      {"🌶️".repeat(dish.spicyLevel)}
                    </div>
                  )}

                  {/* Portion Tag */}
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] text-madara-textSecondary border border-white/10">
                    {dish.portion}
                  </div>
                </div>

                {/* Dish Info */}
                <div className="p-3.5 sm:p-5 flex flex-col justify-between flex-grow">
                  <div>
                    {dish.sinhalaName && language !== "si" && (
                      <span className="text-[11px] text-madara-orange/90 font-medium block truncate">
                        {dish.sinhalaName}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-white font-serif group-hover:text-madara-orange transition-colors truncate">
                      {language === "si" && dish.sinhalaName ? dish.sinhalaName : dish.name}
                    </h3>
                    <p className="text-xs text-madara-textSecondary mt-1 sm:mt-2 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-4 sm:mt-5 pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-between gap-1.5">
                    <div>
                      <span className="text-[10px] text-madara-textMuted block">{t("menu.priceLabel")}</span>
                      <span className="text-sm sm:text-base font-extrabold text-madara-orange whitespace-nowrap">
                        LKR {dish.priceLKR.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-white/80 group-hover:text-madara-orange transition-colors flex items-center gap-0.5 sm:gap-1 bg-white/5 px-1.5 sm:px-2.5 py-1 rounded-lg">
                      {t("menu.detailsBtn")} <span className="hidden xs:inline">→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-3xl border border-white/10">
            <UtensilsCrossed className="w-12 h-12 text-madara-textMuted mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">{t("menu.noDishes")}</h3>
            <p className="text-xs text-madara-textSecondary mt-1">
              {t("menu.noDishesSub")}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedFilter("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-madara-orange text-white text-xs font-bold"
            >
              {language === "si" ? "පෙරහන් නැවත සකසන්න" : "Reset Filters"}
            </button>
          </div>
        )}

      </div>

      {/* Dish Details Modal */}
      {activeModalDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-madara-surfaceElevated border border-madara-orange/30 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Image Header */}
            <div className="aspect-[16/9] relative overflow-hidden bg-black">
              <img
                src={activeModalDish.image}
                alt={activeModalDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-madara-surfaceElevated via-transparent to-black/40" />

              {/* Close Button */}
              <button
                onClick={() => setActiveModalDish(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-madara-orange flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 -mt-6 relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {activeModalDish.isChefsSpecial && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-xs font-bold">
                    ⭐ {language === "si" ? "විශේෂ තේරීම" : "Chef's Signature"}
                  </span>
                )}
                {activeModalDish.isActionKitchen && (
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold">
                    🔥 {language === "si" ? "සජීවී කුටිය" : "Action Station Live"}
                  </span>
                )}
                {activeModalDish.isByobPairing && (
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-xs font-bold">
                    🍾 {language === "si" ? "BYOB ගැලපෙන" : "BYOB Top Pairing"}
                  </span>
                )}
              </div>

              {activeModalDish.sinhalaName && language !== "si" && (
                <span className="text-xs text-madara-orange font-semibold block">
                  {activeModalDish.sinhalaName}
                </span>
              )}
              <h3 className="text-2xl font-bold text-white font-serif mt-1">
                {language === "si" && activeModalDish.sinhalaName ? activeModalDish.sinhalaName : activeModalDish.name}
              </h3>

              <div className="flex items-center gap-4 my-3 text-xs text-madara-textSecondary">
                <span>{t("menu.portionLabel")}: <strong>{activeModalDish.portion}</strong></span>
                {activeModalDish.spicyLevel !== undefined && (
                  <span>{language === "si" ? "සැර" : "Spice"}: <strong>{"🌶️".repeat(activeModalDish.spicyLevel) || (language === "si" ? "මෘදු" : "Mild")}</strong></span>
                )}
              </div>

              <p className="text-sm text-madara-textSecondary leading-relaxed my-4">
                {activeModalDish.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 my-4">
                {activeModalDish.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-madara-textMuted"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Modal Footer: Price & Direct WhatsApp Inquiry */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-madara-textMuted block">{t("menu.priceLabel")}</span>
                  <span className="text-2xl font-extrabold text-madara-orange">
                    LKR {activeModalDish.priceLKR.toLocaleString()}
                  </span>
                </div>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20order/inquire%20about%20the%20${encodeURIComponent(activeModalDish.name)}%20(LKR%20${activeModalDish.priceLKR}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto btn-whatsapp px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t("catering.whatsappInquiry")}</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

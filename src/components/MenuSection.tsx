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
  Clock,
  ChevronRight,
  Info,
  ArrowUpRight
} from "lucide-react";

export default function MenuSection() {
  const { language, t } = useLanguage();
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("all");
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

  // Filter dishes based on search query and dietary/feature pills
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Search query check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q) ||
        (dish.sinhalaName && dish.sinhalaName.toLowerCase().includes(q)) ||
        dish.tags.some((tag) => tag.toLowerCase().includes(q));

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

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  // Group filtered dishes by category
  const categoriesWithDishes = useMemo(() => {
    const validCategories = MENU_CATEGORIES.filter((c) => c.id !== "all");

    // If a specific category tab is clicked (other than 'all'), filter to that category
    const relevantCategories = activeCategoryTab === "all" 
      ? validCategories 
      : validCategories.filter((c) => c.id === activeCategoryTab);

    return relevantCategories
      .map((cat) => {
        const dishes = filteredDishes.filter((d) => d.category === cat.id);
        return {
          ...cat,
          dishes,
        };
      })
      .filter((group) => group.dishes.length > 0);
  }, [filteredDishes, activeCategoryTab]);

  // Smooth scroll to category anchor
  const scrollToCategory = (catId: string) => {
    setActiveCategoryTab(catId);
    if (catId === "all") {
      const el = document.getElementById("menu-list-container");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      const el = document.getElementById(`category-group-${catId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Helper to generate WhatsApp order URL
  const generateWhatsAppDishUrl = (dish: MenuItem) => {
    const text = `Hi Madara Restaurant! 🍽️\n\nI would like to order / inquire about:\n- *Dish:* ${dish.name} ${dish.sinhalaName ? `(${dish.sinhalaName})` : ""}\n- *Portion:* ${dish.portion}\n- *Price:* LKR ${dish.priceLKR.toLocaleString()}\n\nPlease confirm availability and delivery / takeaway timings. Thank you!`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="menu" className="py-24 relative bg-madara-dark">
      {/* Background ambient lighting */}
      <div className="ambient-glow w-[600px] h-[600px] bg-madara-orange/5 top-1/4 left-1/3" />
      <div className="ambient-glow w-[400px] h-[400px] bg-amber-500/4 bottom-1/4 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* ============================================================ */}
        {/* SEARCH & DIETARY ATTRIBUTE FILTERS BAR */}
        {/* ============================================================ */}
        <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 mb-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4 shadow-xl">
          
          {/* Search Input */}
          <div className="relative w-full md:w-5/12">
            <Search className="w-4 h-4 text-madara-textMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("menu.searchPlaceholder")}
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-madara-textMuted focus:outline-none focus:border-madara-orange transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-madara-textMuted hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Feature Filter Pills */}
          <div className="w-full md:w-7/12 overflow-x-auto pb-1 md:pb-0 scrollbar-orange">
            <div className="flex items-center gap-2 w-max px-1">
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedFilter === f.id
                      ? "bg-madara-orange text-white shadow-glow-orange-sm scale-105"
                      : "bg-white/5 text-madara-textSecondary hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* STICKY / HORIZONTAL CATEGORY JUMP NAVIGATION STRIP */}
        {/* ============================================================ */}
        <div className="sticky top-20 z-30 mb-10 py-3 bg-madara-dark/95 backdrop-blur-xl border-y border-white/10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-2xl sm:border">
          <div className="overflow-x-auto scrollbar-orange">
            <div className="flex items-center gap-2 w-max px-2 py-1">
              <button
                onClick={() => scrollToCategory("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategoryTab === "all"
                    ? "bg-gradient-to-r from-madara-orange to-red-600 text-white shadow-glow-orange"
                    : "bg-white/5 text-madara-textSecondary hover:bg-white/10 border border-white/10"
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>{language === "si" ? "සියලුම කාණ්ඩ (All)" : "All Categories"}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 ml-1">
                  {filteredDishes.length}
                </span>
              </button>

              {MENU_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                const isSelected = activeCategoryTab === cat.id;
                const count = filteredDishes.filter((d) => d.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-madara-orange text-white shadow-glow-orange"
                        : "bg-white/5 text-madara-textSecondary hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-madara-orange" />
                    <span>{language === "si" && cat.sinhalaName ? cat.sinhalaName : cat.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-black/40 text-white" : "bg-white/10 text-madara-textMuted"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SINGLE COMPREHENSIVE LIST GROUPED BY DISH TYPE / CATEGORY */}
        {/* ============================================================ */}
        <div id="menu-list-container" className="space-y-12">
          {categoriesWithDishes.length > 0 ? (
            categoriesWithDishes.map((group) => {
              const CategoryIcon = getCategoryIcon(group.icon);

              return (
                <div 
                  key={group.id} 
                  id={`category-group-${group.id}`}
                  className="scroll-mt-36"
                >
                  {/* Group Header Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-madara-orange/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-madara-orange/20 border border-madara-orange/40 flex items-center justify-center text-madara-orange flex-shrink-0">
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                            {language === "si" && group.sinhalaName ? group.sinhalaName : group.name}
                          </h3>
                          {group.sinhalaName && language !== "si" && (
                            <span className="text-xs text-madara-orange font-semibold hidden sm:inline">
                              ({group.sinhalaName})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-madara-textMuted mt-0.5">
                          {group.dishes.length} {group.dishes.length === 1 ? "Dish" : "Dishes"} available
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-bold text-madara-orange uppercase tracking-wider bg-madara-orange/10 px-3 py-1 rounded-full border border-madara-orange/30">
                        {group.id === "signatures" ? "Master Specialties" : "Freshly Prepared"}
                      </span>
                    </div>
                  </div>

                  {/* Responsive Dishes List (Horizontal Sleek Rows) */}
                  <div className="space-y-3 sm:space-y-4">
                    {group.dishes.map((dish) => (
                      <div
                        key={dish.id}
                        className="glass-card rounded-2xl p-3 sm:p-5 border border-white/10 hover:border-madara-orange/40 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                      >
                        {/* Left: Thumbnail & Badges */}
                        <div 
                          onClick={() => setActiveModalDish(dish)}
                          className="flex items-start sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto cursor-pointer"
                        >
                          {/* Dish Image Thumbnail */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-black/40 flex-shrink-0 relative border border-white/10 group-hover:border-madara-orange/50 transition-colors">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                            {dish.spicyLevel !== undefined && dish.spicyLevel > 0 && (
                              <div className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 backdrop-blur-md text-[9px] text-red-400 font-bold border border-red-500/20">
                                {"🌶️".repeat(dish.spicyLevel)}
                              </div>
                            )}
                          </div>

                          {/* Titles, Portions, Tags & Description */}
                          <div className="min-w-0 flex-grow">
                            {/* Badges Bar */}
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              {dish.isChefsSpecial && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-extrabold flex items-center gap-1">
                                  ⭐ {language === "si" ? "විශේෂ තේරීම" : "Chef's Signature"}
                                </span>
                              )}
                              {dish.isActionKitchen && (
                                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold flex items-center gap-1">
                                  🔥 {language === "si" ? "සජීවී කුටිය" : "Live Action"}
                                </span>
                              )}
                              {dish.isByobPairing && (
                                <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-extrabold flex items-center gap-1">
                                  🍾 BYOB Favorite
                                </span>
                              )}
                              {dish.isVegetarian && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold">
                                  🌿 Veg
                                </span>
                              )}
                            </div>

                            {/* Dish Main Title */}
                            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-madara-orange transition-colors">
                              {language === "si" && dish.sinhalaName ? dish.sinhalaName : dish.name}
                            </h4>

                            {dish.sinhalaName && language !== "si" && (
                              <span className="text-xs text-madara-orange font-medium block">
                                {dish.sinhalaName}
                              </span>
                            )}

                            {/* Description */}
                            <p className="text-xs text-madara-textSecondary mt-1 line-clamp-2 sm:line-clamp-1 leading-relaxed">
                              {dish.description}
                            </p>

                            {/* Tags & Portion Meta */}
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="text-[11px] font-semibold text-white/70 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                                {dish.portion}
                              </span>
                              {dish.tags.slice(0, 3).map((t, idx) => (
                                <span key={idx} className="text-[10px] text-madara-textMuted hidden md:inline">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right: Price & Direct Actions */}
                        <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-2 sm:gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 flex-shrink-0">
                          <div className="sm:text-right">
                            <span className="text-[10px] text-madara-textMuted uppercase font-bold block sm:hidden">
                              {t("menu.priceLabel")}
                            </span>
                            <span className="text-base sm:text-lg font-extrabold text-madara-orange whitespace-nowrap">
                              LKR {dish.priceLKR.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setActiveModalDish(dish)}
                              aria-label={`View details for ${dish.name}`}
                              className="btn-outline-dark px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Info className="w-3.5 h-3.5 text-madara-orange" />
                              <span className="hidden xs:inline">{t("menu.detailsBtn")}</span>
                            </button>

                            <a
                              href={generateWhatsAppDishUrl(dish)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Order ${dish.name} on WhatsApp`}
                              className="btn-whatsapp px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Order</span>
                            </a>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 glass-panel rounded-3xl border border-white/10 max-w-2xl mx-auto">
              <UtensilsCrossed className="w-12 h-12 text-madara-textMuted mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">{t("menu.noDishes")}</h3>
              <p className="text-xs text-madara-textSecondary mt-1">
                {t("menu.noDishesSub")}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                  setActiveCategoryTab("all");
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-madara-orange text-white text-xs font-bold shadow-glow-orange-sm cursor-pointer"
              >
                {language === "si" ? "පෙරහන් නැවත සකසන්න" : "Reset Filters"}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ============================================================ */}
      {/* DISH DETAILS MODAL POPUP */}
      {/* ============================================================ */}
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
                aria-label="Close modal"
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
                {activeModalDish.isVegetarian && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold">
                    🌿 Vegetarian
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
                  <span>
                    {language === "si" ? "සැර" : "Spice"}: <strong>{"🌶️".repeat(activeModalDish.spicyLevel) || (language === "si" ? "මෘදු" : "Mild")}</strong>
                  </span>
                )}
              </div>

              <p className="text-sm text-madara-textSecondary leading-relaxed my-4">
                {activeModalDish.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 my-4">
                {activeModalDish.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-madara-textMuted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Modal Footer: Price & Direct WhatsApp Order */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-madara-textMuted block">{t("menu.priceLabel")}</span>
                  <span className="text-2xl font-extrabold text-madara-orange">
                    LKR {activeModalDish.priceLKR.toLocaleString()}
                  </span>
                </div>

                <a
                  href={generateWhatsAppDishUrl(activeModalDish)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto btn-whatsapp px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

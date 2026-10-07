"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MenuItem,
  MenuItemPortion,
  CateringPackageDetail,
  RESTAURANT_INFO,
  MENU_CATEGORIES,
  CATERING_CATEGORIES,
} from "@/data/restaurantData";
import {
  getDishFallbackImage,
  useMenuItem,
  useMenuItems,
  UnifiedProduct,
  MENU_FALLBACK_IMAGE,
} from "@/services/menuService";
import { useLanguage } from "@/context/LanguageContext";
import ModernNavbar from "@/components/modern/ModernNavbar";
import ModernFooter from "@/components/modern/ModernFooter";
import MobileActionDock from "@/components/MobileActionDock";
import {
  ChevronRight,
  MessageCircle,
  Phone,
  Share2,
  CheckCircle2,
  ArrowLeft,
  Clock,
  ShieldCheck,
  Utensils,
  Check,
  AlertCircle,
  Radio,
  Flame,
  Leaf,
  Sparkles,
} from "lucide-react";

export type { UnifiedProduct };

interface ProductDetailClientProps {
  product: UnifiedProduct;
  relatedProducts: UnifiedProduct[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Set the restore flag when user views a detail page
  useEffect(() => {
    try {
      sessionStorage.setItem("madara_menu_should_restore", "true");
    } catch {}
  }, []);

  const handleBackToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      sessionStorage.setItem("madara_menu_should_restore", "true");
    } catch {}

    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/menu/");
    }
  };

  const isRestaurant = product.kind === "restaurant";
  const item = product.data;
  const initialRestaurantDish = isRestaurant ? (item as MenuItem) : null;

  // Real-time synchronization with Firebase actual menu item
  const { item: liveDish, isLive } = useMenuItem(
    initialRestaurantDish?.id || "",
    initialRestaurantDish,
  );
  const currentDish = liveDish || initialRestaurantDish;

  // Real-time synchronization with all Firebase menu items for live related items
  const { items: allLiveMenuItems } = useMenuItems();

  const dynamicRelatedProducts = useMemo(() => {
    if (!isRestaurant) return relatedProducts;
    const currentId = currentDish?.id || "";
    const catId = currentDish?.category || "";

    const matches = allLiveMenuItems
      .filter((m) => m.id !== currentId && m.category === catId)
      .map((m) => {
        const catName =
          MENU_CATEGORIES.find((c) => c.id === m.category)?.name ||
          m.subCategory ||
          "Restaurant Dish";
        return { kind: "restaurant" as const, data: m, categoryName: catName };
      });

    if (matches.length >= 3) return matches.slice(0, 3);

    const filler = allLiveMenuItems
      .filter(
        (m) => m.id !== currentId && !matches.some((r) => r.data.id === m.id),
      )
      .slice(0, 3 - matches.length)
      .map((m) => {
        const catName =
          MENU_CATEGORIES.find((c) => c.id === m.category)?.name ||
          m.subCategory ||
          "Restaurant Dish";
        return { kind: "restaurant" as const, data: m, categoryName: catName };
      });

    const combined = [...matches, ...filler].slice(0, 3);
    return combined.length > 0 ? combined : relatedProducts;
  }, [
    isRestaurant,
    currentDish?.id,
    currentDish?.category,
    allLiveMenuItems,
    relatedProducts,
  ]);

  // Portion selection state with automatic sync when Firebase portions load/update
  const dishPortions = currentDish?.portions || [];
  const [selectedPortion, setSelectedPortion] =
    useState<MenuItemPortion | null>(
      dishPortions.length > 0 ? dishPortions[0] : null,
    );

  useEffect(() => {
    if (dishPortions.length > 0) {
      setSelectedPortion((prev) => {
        if (!prev) return dishPortions[0];
        const match = dishPortions.find((p) => p.size === prev.size);
        return match || dishPortions[0];
      });
    } else {
      setSelectedPortion(null);
    }
  }, [dishPortions]);

  // Display strings based on active language (single-language preference)
  const title =
    language === "si" && currentDish?.sinhalaName
      ? currentDish.sinhalaName
      : isRestaurant
        ? currentDish?.name || ""
        : (item as CateringPackageDetail).packageName;

  const description = isRestaurant
    ? currentDish?.description || ""
    : (item as CateringPackageDetail).tagline;
  const categoryName = product.categoryName;
  const isAvailable = isRestaurant ? currentDish?.isAvailable !== false : true;

  // Price calculations
  const currentPriceLKR = selectedPortion
    ? selectedPortion.priceLKR
    : isRestaurant
      ? currentDish?.priceLKR || 0
      : null;

  const priceDisplay = isRestaurant
    ? `Rs. ${currentPriceLKR?.toLocaleString()}/=`
    : (item as CateringPackageDetail).priceDisplay;

  const portionOrMin = selectedPortion
    ? selectedPortion.label
    : isRestaurant
      ? currentDish?.portion || "Full Portion"
      : `Min ${(item as CateringPackageDetail).minGuests} Guests Required`;

  // Image source with reliable fallback
  let imageUrl = MENU_FALLBACK_IMAGE;
  if (isRestaurant && currentDish) {
    imageUrl =
      currentDish.image?.trim() ||
      getDishFallbackImage(currentDish.category, currentDish.subCategory);
  } else if (!isRestaurant) {
    const cat = CATERING_CATEGORIES.find(
      (c) => c.id === (item as CateringPackageDetail).categoryId,
    );
    if (cat) imageUrl = cat.image;
  }

  const [heroImgSrc, setHeroImgSrc] = useState(imageUrl);
  useEffect(() => {
    setHeroImgSrc(imageUrl);
  }, [imageUrl]);

  // Allergens & Highlights
  const allergens = isRestaurant
    ? currentDish?.allergens || []
    : item.allergens || [];
  const highlightsList =
    isRestaurant && currentDish
      ? [
          currentDish.portion,
          ...(currentDish.tags || []),
          `Allergens: ${allergens && allergens.length > 0 ? allergens.join(", ") : "None"}`,
        ]
      : (item as CateringPackageDetail).highlights || [];

  // Menu sections if catering package
  const menuSections = !isRestaurant
    ? (item as CateringPackageDetail).menuSections
    : [];

  const getWhatsAppLink = () => {
    const currentUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `https://madararestaurant.com/menu/${currentDish?.id || item.id}/`;
    const portionText = selectedPortion ? ` - ${selectedPortion.label}` : "";
    const availText = !isAvailable
      ? " [Note: Inquiring on next batch availability]"
      : "";
    const text = `Hi Madara Restaurant! I am viewing your online menu and interested in:\n\n*${title}* (${priceDisplay}${portionText})${availText}\nURL: ${currentUrl}\n\nPlease share availability and ordering details.`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Madara Restaurant`,
          text: `Check out ${title} at Madara Restaurant & Catering Homagama!`,
          url: window.location.href,
        });
      } catch (e) {
        // Ignored if cancelled
      }
    } else if (typeof window !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans flex flex-col justify-between">
      {/* Light Navbar */}
      <ModernNavbar />

      {/* Consistent Breadcrumb & Hotline Sub-Bar */}
      <div className="pt-24 sm:pt-28 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-stone-500">
          <div className="inline-flex items-center gap-1.5 font-medium text-stone-600">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "si" ? "මුල් පිටුවට" : "Home"}</span>
            </Link>
            <span className="text-stone-300">/</span>
            <Link
              href="/menu/"
              onClick={handleBackToMenu}
              className="text-stone-600 hover:text-amber-600 transition-colors cursor-pointer"
            >
              {language === "si" ? "ආපනශාලා මෙනුව" : "Food Menu"}
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-amber-700 font-semibold truncate max-w-[180px] sm:max-w-xs">
              {title}
            </span>
          </div>

          {/* Live indicator on top bar if synced */}
          {isLive && isRestaurant && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {language === "si" ? "සජීවී දත්ත" : "Live CMS Synced"}
              </span>
            </span>
          )}
        </div>
      </div>

      <main className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBackToMenu}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-amber-700 transition-colors bg-white px-3.5 py-2 rounded-xl border border-stone-300 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {language === "si" ? "නැවත මෙනුවට" : "Back to All Menus"}
            </span>
          </button>

          {isLive && isRestaurant && (
            <span className="sm:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live CMS</span>
            </span>
          )}
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left: Product Image (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative h-80 sm:h-96 lg:h-[460px] w-full rounded-3xl overflow-hidden border border-stone-200 shadow-lg bg-stone-100 group">
              <Image
                src={heroImgSrc}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                onError={() => setHeroImgSrc(MENU_FALLBACK_IMAGE)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60" />

              {/* Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-xs font-bold text-stone-800 uppercase tracking-wider shadow-sm">
                  {categoryName}
                </span>

                {isRestaurant && currentDish?.isChefsSpecial && (
                  <span className="px-3 py-1.5 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Special</span>
                  </span>
                )}

                {isRestaurant && currentDish?.isVegetarian && (
                  <span className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Veg</span>
                  </span>
                )}
              </div>

              {/* Live Synced Tag on bottom-right of image */}
              {isLive && isRestaurant && (
                <div className="absolute bottom-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-black/60 backdrop-blur-md text-emerald-400 border border-white/20 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live CMS</span>
                  </span>
                </div>
              )}
            </div>

            {/* Quality Guarantees */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="block text-[11px] font-bold text-stone-800">
                  100% Hygienic
                </span>
                <span className="text-[10px] text-stone-500">
                  Prepared Fresh Daily
                </span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <Utensils className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="block text-[11px] font-bold text-stone-800">
                  Portion Size
                </span>
                <span className="text-[10px] text-stone-500">
                  {portionOrMin}
                </span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="block text-[11px] font-bold text-stone-800">
                  Prompt Service
                </span>
                <span className="text-[10px] text-stone-500">
                  Homagama & Colombo
                </span>
              </div>
            </div>
          </div>

          {/* Right: Title, Pricing, Allergens & CTAs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category Subtitle */}
              <div className="flex items-center justify-between mb-1">
                <span className="block text-xs font-bold uppercase tracking-widest text-amber-700">
                  {isRestaurant
                    ? currentDish?.subCategory ||
                      (language === "si" ? "ආපනශාලා ආහාර" : "Restaurant Dish")
                    : language === "si"
                      ? "කේටරින් පැකේජය"
                      : "Catering Package"}
                </span>

                {isRestaurant &&
                  currentDish?.spicyLevel !== undefined &&
                  currentDish.spicyLevel > 0 && (
                    <span
                      className="flex items-center gap-0.5 text-xs text-red-600 font-bold"
                      title={`Spicy Level: ${currentDish.spicyLevel}`}
                    >
                      {Array.from({ length: currentDish.spicyLevel }).map(
                        (_, i) => (
                          <Flame
                            key={i}
                            className="w-3.5 h-3.5 fill-red-500 text-red-600"
                          />
                        ),
                      )}
                    </span>
                  )}
              </div>

              {/* Title - Single Language */}
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight mb-4">
                {title}
              </h1>

              {/* Availability Notice if Sold Out */}
              {!isAvailable && (
                <div className="p-3 mb-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                  <span>
                    {language === "si"
                      ? "මෙම ආහාරය දැනට අවසන් වී ඇත (Sold Out). ලබාගත හැකි දිනය විමසීමට WhatsApp පණිවිඩයක් එවන්න."
                      : "This item is currently sold out. Inquire via WhatsApp for upcoming availability."}
                  </span>
                </div>
              )}

              {/* Price & Portion Box */}
              <div className="p-4 sm:p-5 bg-amber-500/10 rounded-2xl border border-amber-300/80 mb-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-0.5">
                      {language === "si" ? "මිල (Price)" : "Price"}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-900 tracking-tight">
                      {priceDisplay}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-0.5">
                      {language === "si" ? "ප්‍රමාණය" : "Portion"}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-stone-800 bg-white px-3 py-1.5 rounded-lg border border-stone-300 shadow-xs inline-block">
                      {portionOrMin}
                    </span>
                  </div>
                </div>

                {/* Portion Selector Buttons if item has portions in Firebase */}
                {dishPortions.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-amber-300/60">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-2">
                      {language === "si"
                        ? "ප්‍රමාණය තෝරන්න (Select Portion)"
                        : "Select Portion Size"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {dishPortions.map((p) => {
                        const isSelected = selectedPortion?.size === p.size;
                        return (
                          <button
                            key={p.size}
                            type="button"
                            onClick={() => setSelectedPortion(p)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              isSelected
                                ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                                : "bg-white text-stone-800 border-stone-300 hover:bg-amber-50"
                            }`}
                          >
                            {p.label || p.size} — Rs.{" "}
                            {p.priceLKR.toLocaleString()}/=
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  {language === "si" ? "විස්තරය" : "Description"}
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                  {description ||
                    (language === "si"
                      ? "නැවුම් රසැති ආහාර අත්දැකීමක්."
                      : "Delicious freshly prepared dish from our kitchen.")}
                </p>
              </div>

              {/* Highlights Checklist */}
              {highlightsList.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                    {isRestaurant
                      ? language === "si"
                        ? "විශේෂාංග"
                        : "Dish Highlights"
                      : language === "si"
                        ? "ඇතුළත් දෑ"
                        : "Included Menu Items"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {highlightsList.map((hl, idx) => {
                      const isAllergen = hl.startsWith("Allergens:");
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold shadow-xs ${
                            isAllergen
                              ? "bg-amber-50 border-amber-300 text-amber-950 font-bold sm:col-span-2"
                              : "bg-white border-stone-200 text-stone-800"
                          }`}
                        >
                          {isAllergen ? (
                            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                          )}
                          <span>{hl}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Detailed Menu Sections if Catering */}
              {menuSections && menuSections.length > 0 && (
                <div className="mb-6 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {language === "si"
                      ? "සම්පූර්ණ මෙනු අන්තර්ගතය"
                      : "Included Menu Breakdown"}
                  </h3>
                  {menuSections.map((sec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs"
                    >
                      <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                        {sec.title}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700">
                        {sec.items.map((mItem, iIdx) => (
                          <li key={iIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                            <span>{mItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTAs Section */}
            <div className="pt-6 border-t border-stone-200 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Primary WhatsApp Order / Contact Button */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-md hover:scale-102"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>
                    {language === "si"
                      ? "WhatsApp හරහා ඇනවුම් කරන්න"
                      : "Order via WhatsApp"}
                  </span>
                </a>

                {/* Direct Hotline Call Button */}
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="py-3.5 px-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-900 font-bold text-sm transition-all flex items-center justify-center gap-2 border border-stone-300 shadow-xs"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>
                    {language === "si" ? "ඇමතුමක් ලබාගන්න" : "Call Hotline"}
                  </span>
                </a>
              </div>

              {/* Share & Location Row */}
              <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
                <span>Homagama, Athurugiriya Rd</span>
                <button
                  onClick={handleShare}
                  className="hover:text-amber-700 transition-colors flex items-center gap-1 font-bold text-stone-700 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>
                        {language === "si" ? "සබැඳිය බෙදාගන්න" : "Share Link"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Options Section */}
        {dynamicRelatedProducts.length > 0 && (
          <section className="pt-10 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-stone-900">
                  {language === "si" ? "තවත් තේරීම්" : "You Might Also Like"}
                </h2>
              </div>
              <Link
                href="/menu/"
                className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <span>
                  {language === "si" ? "සම්පූර්ණ මෙනුව" : "View Full Menu"}
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dynamicRelatedProducts.map((rel) => {
                const relItem = rel.data;
                const relIsRest = rel.kind === "restaurant";
                const relTitle =
                  language === "si" && relItem.sinhalaName
                    ? relItem.sinhalaName
                    : relIsRest
                      ? (relItem as MenuItem).name
                      : (relItem as CateringPackageDetail).packageName;

                const relPrice = relIsRest
                  ? (relItem as MenuItem).portions &&
                    (relItem as MenuItem).portions!.length > 0
                    ? `Rs. ${(relItem as MenuItem).portions![0].priceLKR.toLocaleString()}/=`
                    : `Rs. ${(relItem as MenuItem).priceLKR.toLocaleString()}/=`
                  : (relItem as CateringPackageDetail).priceDisplay;

                let relImg = MENU_FALLBACK_IMAGE;
                if (relIsRest) {
                  const m = relItem as MenuItem;
                  relImg =
                    m.image?.trim() ||
                    getDishFallbackImage(m.category, m.subCategory);
                } else {
                  const cat = CATERING_CATEGORIES.find(
                    (c) =>
                      c.id === (relItem as CateringPackageDetail).categoryId,
                  );
                  if (cat) relImg = cat.image;
                }

                return (
                  <Link
                    key={relItem.id}
                    href={`/menu/${relItem.id}/`}
                    className="group bg-white border border-stone-200 hover:border-amber-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="relative h-40 w-full bg-stone-100 overflow-hidden">
                      <Image
                        src={relImg}
                        alt={relTitle}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-2 left-3">
                        <span className="text-base font-black text-white">
                          {relPrice}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                          {relTitle}
                        </h3>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-amber-700">
                        <span>
                          {language === "si" ? "තොරතුරු බලන්න" : "View Details"}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Universal Footer */}
      <ModernFooter />
      <MobileActionDock />
    </div>
  );
}

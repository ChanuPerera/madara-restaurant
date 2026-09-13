"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MenuItem, 
  CateringPackageDetail, 
  RESTAURANT_INFO,
  CATERING_CATEGORIES
} from "@/data/restaurantData";
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
  AlertTriangle
} from "lucide-react";

export type UnifiedProduct = 
  | { kind: "restaurant"; data: MenuItem; categoryName: string }
  | { kind: "catering"; data: CateringPackageDetail; categoryName: string };

interface ProductDetailClientProps {
  product: UnifiedProduct;
  relatedProducts: UnifiedProduct[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const isRestaurant = product.kind === "restaurant";
  const item = product.data;

  // Single Language display
  const title = language === "si" && item.sinhalaName ? item.sinhalaName : (isRestaurant ? (item as MenuItem).name : (item as CateringPackageDetail).packageName);
  const description = isRestaurant ? (item as MenuItem).description : (item as CateringPackageDetail).tagline;
  const categoryName = product.categoryName;
  const priceDisplay = isRestaurant ? `Rs. ${(item as MenuItem).priceLKR.toLocaleString()}/=` : (item as CateringPackageDetail).priceDisplay;
  const portionOrMin = isRestaurant ? (item as MenuItem).portion : `Min ${(item as CateringPackageDetail).minGuests} Guests Required`;

  // Image source
  let imageUrl = "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80";
  if (isRestaurant) {
    imageUrl = (item as MenuItem).image;
  } else {
    const cat = CATERING_CATEGORIES.find(c => c.id === (item as CateringPackageDetail).categoryId);
    if (cat) imageUrl = cat.image;
  }

  // Allergens (ONLY IF PRESENT)
  const allergens = item.allergens || [];

  // Highlights list
  const highlightsList = isRestaurant
    ? [(item as MenuItem).portion, ...((item as MenuItem).tags || [])]
    : (item as CateringPackageDetail).highlights || [];

  // Menu sections if catering
  const menuSections = !isRestaurant ? (item as CateringPackageDetail).menuSections : [];

  const getWhatsAppLink = () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : `https://madararestaurant.lk/menu/${item.id}`;
    const text = `Hi Madara Restaurant! I am viewing your online menu and interested in:\n\n*${title}* (${priceDisplay})\nURL: ${currentUrl}\n\nPlease share availability and ordering details.`;
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
        // Fallback
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
            <Link href="/menu" className="text-stone-600 hover:text-amber-600 transition-colors">
              {language === "si" ? "ආපනශාලා මෙනුව" : "Food Menu"}
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-amber-700 font-semibold truncate max-w-[180px] sm:max-w-xs">
              {title}
            </span>
          </div>

          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-stone-700 hover:text-amber-600 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>{RESTAURANT_INFO.phoneFormatted}</span>
          </a>
        </div>
      </div>

      <main className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">

        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-amber-700 transition-colors bg-white px-3.5 py-2 rounded-xl border border-stone-300 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "si" ? "නැවත මෙනුවට" : "Back to All Menus"}</span>
          </Link>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left: Product Image (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative h-80 sm:h-96 lg:h-[460px] w-full rounded-3xl overflow-hidden border border-stone-200 shadow-lg bg-stone-100 group">
              <Image
                src={imageUrl}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-bold text-stone-800 uppercase tracking-wider shadow-sm">
                  {categoryName}
                </span>
              </div>
            </div>

            {/* Quality Guarantees */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="block text-[11px] font-bold text-stone-800">100% Hygienic</span>
                <span className="text-[10px] text-stone-500">Prepared Fresh Daily</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <Utensils className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="block text-[11px] font-bold text-stone-800">Portion Size</span>
                <span className="text-[10px] text-stone-500">{portionOrMin}</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="block text-[11px] font-bold text-stone-800">Prompt Service</span>
                <span className="text-[10px] text-stone-500">Homagama & Colombo</span>
              </div>
            </div>
          </div>

          {/* Right: Title, Pricing, Allergens & CTAs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category Subtitle */}
              <span className="block text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">
                {isRestaurant ? (language === "si" ? "ආපනශාලා ආහාර" : "Restaurant Dish") : (language === "si" ? "කේටරින් පැකේජය" : "Catering Package")}
              </span>

              {/* Title - Single Language */}
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight mb-4">
                {title}
              </h1>

              {/* Price & Portion Box */}
              <div className="p-4 sm:p-5 bg-amber-500/10 rounded-2xl border border-amber-300/80 mb-6 flex items-center justify-between gap-4">
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
                  <span className="text-xs sm:text-sm font-bold text-stone-800 bg-white px-3 py-1.5 rounded-lg border border-stone-300 shadow-xs">
                    {portionOrMin}
                  </span>
                </div>
              </div>

              {/* ALLERGEN WARNING LABEL - ONLY IF ALLERGENS EXIST */}
              {allergens && allergens.length > 0 && (
                <div className="p-4 bg-amber-50 border-l-4 border-amber-600 rounded-r-2xl mb-6 flex items-start gap-3 text-stone-900 shadow-xs">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                      {language === "si" ? "ආසාත්මිකතා අනතුරු ඇඟවීම (Allergen Warning)" : "Allergen Warning"}
                    </span>
                    <span className="text-xs font-semibold text-stone-700 mt-0.5 block">
                      {language === "si" ? "මෙම ආහාරයේ ආසාත්මිකතා ඇතුළත් විය හැක: " : "Contains potential allergens: "}
                      <strong className="text-amber-950 font-bold">{allergens.join(", ")}</strong>
                    </span>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  {language === "si" ? "විස්තරය" : "Description"}
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                  {description}
                </p>
              </div>

              {/* Highlights Checklist */}
              {highlightsList.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                    {isRestaurant ? (language === "si" ? "විශේෂාංග" : "Dish Highlights") : (language === "si" ? "ඇතුළත් දෑ" : "Included Menu Items")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {highlightsList.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-800 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Menu Sections if Catering */}
              {menuSections && menuSections.length > 0 && (
                <div className="mb-6 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {language === "si" ? "සම්පූර්ණ මෙනු අන්තර්ගතය" : "Included Menu Breakdown"}
                  </h3>
                  {menuSections.map((sec, sIdx) => (
                    <div key={sIdx} className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
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
                {/* Primary WhatsApp Order Button */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>{language === "si" ? "WhatsApp හරහා විමසන්න" : "Order / Inquire via WhatsApp"}</span>
                </a>

                {/* Direct Hotline Call Button */}
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="py-3.5 px-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-900 font-bold text-sm transition-all flex items-center justify-center gap-2 border border-stone-300 shadow-xs"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>{language === "si" ? "ඇමතුමක් ලබාගන්න" : "Call Hotline"}</span>
                </a>
              </div>

              {/* Share Button */}
              <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
                <span>Homagama, Athurugiriya Rd</span>
                <button
                  onClick={handleShare}
                  className="hover:text-amber-700 transition-colors flex items-center gap-1 font-bold text-stone-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>{language === "si" ? "සබැඳිය බෙදාගන්න" : "Share Link"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Related Options Section */}
        {relatedProducts.length > 0 && (
          <section className="pt-10 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-stone-900">
                  {language === "si" ? "තවත් තේරීම්" : "You Might Also Like"}
                </h2>
              </div>
              <Link
                href="/menu"
                className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <span>{language === "si" ? "සම්පූර්ණ මෙනුව" : "View Full Menu"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => {
                const relItem = rel.data;
                const relIsRest = rel.kind === "restaurant";
                const relTitle = language === "si" && relItem.sinhalaName ? relItem.sinhalaName : (relIsRest ? (relItem as MenuItem).name : (relItem as CateringPackageDetail).packageName);
                const relPrice = relIsRest ? `Rs. ${(relItem as MenuItem).priceLKR.toLocaleString()}/=` : (relItem as CateringPackageDetail).priceDisplay;
                let relImg = "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80";
                if (relIsRest) relImg = (relItem as MenuItem).image;
                else {
                  const cat = CATERING_CATEGORIES.find(c => c.id === (relItem as CateringPackageDetail).categoryId);
                  if (cat) relImg = cat.image;
                }

                return (
                  <Link
                    key={relItem.id}
                    href={`/menu/${relItem.id}`}
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
                        <span>{language === "si" ? "තොරතුරු බලන්න" : "View Details"}</span>
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

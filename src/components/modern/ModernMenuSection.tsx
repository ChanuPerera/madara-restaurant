"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { UtensilsCrossed, MessageCircle, ArrowRight, Flame } from "lucide-react";

interface MenuItem {
  id: string;
  category: "wok" | "biryani" | "bites" | "kottu";
  nameEn: string;
  nameSi: string;
  price: string;
  descEn: string;
  descSi: string;
  image: string;
  spicy?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "wok-1",
    category: "wok",
    nameEn: "Special Seafood Mongolian Wok",
    nameSi: "විශේෂ සීෆුඩ් මොන්ගෝලියන් වොක්",
    price: "LKR 1,850",
    descEn: "High-flame wok tossed with cuttlefish, prawns, fresh greens & signature spicy oyster glaze.",
    descSi: "දැල්ලෝ, ඉස්සෝ සහ නැවුම් එළවළු සජීවී ගිනි දැල් මැද තෙම්පරාදු කළ විශේෂ මොන්ගෝලියන් බත්.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80",
    spicy: true,
  },
  {
    id: "wok-2",
    category: "wok",
    nameEn: "Triple Meat Grand Mongolian",
    nameSi: "ත්‍රිත්ව මස් මොන්ගෝලියන් රයිස්",
    price: "LKR 1,950",
    descEn: "Chicken, roast pork & beef strips tossed with noodles or rice and wok chili paste.",
    descSi: "චිකන්, පෝර්ක් සහ බීෆ් සමඟ සකසන ලද රසවත් මොන්ගෝලියන් බත් හෝ නූඩ්ල්ස්.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    spicy: true,
  },
  {
    id: "biryani-1",
    category: "biryani",
    nameEn: "Royal Claypot Chicken Dum Biryani",
    nameSi: "රාජකීය මැටි ඇතිලි චිකන් බිරියානි",
    price: "LKR 2,450",
    descEn: "Aromatic slow-dum basmati rice with whole marinated chicken leg, mint sambol & gravy.",
    descSi: "සුවඳැති බාස්මතී බිරියානි, බැදපු චිකන්, තම්බපු බිත්තරය සහ මින්ට් සම්බෝල සමඟ.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "biryani-2",
    category: "biryani",
    nameEn: "Lagoon Prawns Biryani Pot",
    nameSi: "කලපු ඉස්සෝ බිරියානි පොට්",
    price: "LKR 2,650",
    descEn: "Sealed claypot fragrant rice layered with spiced jumbo lagoon prawns & boiled eggs.",
    descSi: "නැවුම් කලපු ඉස්සන් යොදා රස ගැන්වූ සුවඳවත් රාජකීය බිරියානි සංග්‍රහය.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "bites-1",
    category: "bites",
    nameEn: "Fiery Hot Butter Cuttlefish (HBC)",
    nameSi: "හොට් බටර් දැල්ලෝ (HBC)",
    price: "LKR 1,950",
    descEn: "Crispy batter fried cuttlefish tossed in savory garlic butter, leeks & chili flakes.",
    descSi: "කරස් ගා හැපෙන බටර් දැල්ලෝ සහ බැදපු මිරිස් කරල් - අංක එකේ BYOB තේරීම.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    spicy: true,
  },
  {
    id: "bites-2",
    category: "bites",
    nameEn: "Black Pepper Beef Sizzler Plate",
    nameSi: "බ්ලැක් පෙපර් බීෆ් සිස්ලර්",
    price: "LKR 1,750",
    descEn: "Tender beef slices sizzled on iron plates with coarse black pepper & scallions.",
    descSi: "උණුසුම් යකඩ තැටියේ පිළිගන්වන කළු ගම්මිරිස් රසැති බීෆ් බයිට් එක.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    spicy: true,
  },
  {
    id: "kottu-1",
    category: "kottu",
    nameEn: "Molten Cheese Mixed Meat Kottu",
    nameSi: "මීට් මික්ස් චීස් කොත්තු",
    price: "LKR 1,650",
    descEn: "Clattered hot roti with chicken, beef, fresh vegetables smothered in rich cheddar cream.",
    descSi: "උණු උණු යකඩ තැටියේ කෙටූ රොටී, මස් වර්ග සහ උඩින් හැලූ උණු චීස් තට්ටුව.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "kottu-2",
    category: "kottu",
    nameEn: "Lagoon Seafood Sizzling Kottu",
    nameSi: "සීෆුඩ් සිස්ලින් කොත්තු",
    price: "LKR 1,850",
    descEn: "Crispy clattered flatbread with prawns, cuttlefish, egg & spicy roast curry sauce.",
    descSi: "නැවුම් ඉස්සෝ සහ දැල්ලෝ සුවඳැති කුළුබඩු කරියක් සමඟ කොත්තු කර පිළිගන්වයි.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    spicy: true,
  },
];

export default function ModernMenuSection() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "wok" | "biryani" | "bites" | "kottu">("all");

  const tabs = [
    { id: "all", labelEn: "All Highlights", labelSi: "සියල්ල" },
    { id: "wok", labelEn: "Mongolian Wok", labelSi: "මොන්ගෝලියන්" },
    { id: "biryani", labelEn: "Dum Biryani", labelSi: "බිරියානි" },
    { id: "bites", labelEn: "BYOB Bites", labelSi: "BYOB බයිට්ස්" },
    { id: "kottu", labelEn: "Cheese Kottu", labelSi: "කොත්තු" },
  ];

  const filteredItems =
    activeTab === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeTab);

  const getWhatsAppOrderLink = (item: MenuItem) => {
    const text =
      language === "si"
        ? `ආයුබෝවන් Madara Restaurant! 🍽️ මට මෙම ආහාරය ඇණවුම් කිරීමට / විමසීමට අවශ්‍යයි: "${item.nameSi}" (${item.price}).`
        : `Hi Madara Restaurant! 🍽️ I would like to order / inquire about: "${item.nameEn}" (${item.price}).`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="menu" className="py-20 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">
            {language === "si" ? "ආපනශාලා මෙනුව" : "A La Carte & Takeaway"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif tracking-tight">
            {language === "si" ? "ජනප්‍රියම " : "Signature "}
            <span className="text-gradient-gold">
              {language === "si" ? "කෑම වට්ටෝරු" : "Highlights"}
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            {language === "si"
              ? "Dine-in, Takeaway සහ Delivery සඳහා ලබාගත හැකි ප්‍රියතම ආහාර"
              : "Freshly prepared for Dine-In, Takeaway, and Homagama Delivery."}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-stone-900 text-white shadow-sm scale-105"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-700"
              }`}
            >
              {language === "si" ? tab.labelSi : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-stone-50/50 rounded-2xl overflow-hidden border border-stone-200/70 hover:border-amber-400/50 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={language === "si" ? item.nameSi : item.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.spicy && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white p-1 rounded-full shadow-sm" title="Spicy">
                    <Flame className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-stone-900/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-extrabold shadow-sm">
                  {item.price}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-700 transition-colors line-clamp-1">
                    {language === "si" ? item.nameSi : item.nameEn}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {language === "si" ? item.descSi : item.descEn}
                  </p>
                </div>

                <a
                  href={getWhatsAppOrderLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#25D366] hover:text-white text-stone-800 border border-stone-200 hover:border-transparent text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{language === "si" ? "ඇණවුම් කරන්න" : "Order on WhatsApp"}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/catering-menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-bold transition-colors"
          >
            <span>{language === "si" ? "සම්පූර්ණ කේටරින් සහ ආපනශාලා මෙනුව බලන්න" : "Explore Complete Catering & A La Carte Menus"}</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </Link>
        </div>

      </div>
    </section>
  );
}

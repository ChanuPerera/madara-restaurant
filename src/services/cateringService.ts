"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ==========================================
// 1. CATERING OCCASIONS
// ==========================================
export interface CateringOccasionItem {
  id: string;
  titleEn: string;
  titleSi: string;
  tagEn: string;
  tagSi: string;
  descEn: string;
  descSi: string;
  featuresEn: string[];
  featuresSi: string[];
  image: string;
  whatsappPrefill?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export const DEFAULT_CATERING_OCCASIONS: CateringOccasionItem[] = [
  {
    id: "weddings",
    titleEn: "Weddings & Homecomings",
    titleSi: "මංගල හා දෙවැනි ගමන සාද",
    tagEn: "Grand Luxury",
    tagSi: "රාජකීය මට්ටම",
    descEn:
      "Bespoke banquet menus, roll-top luxury chafing dishes, live carvery & action stations with professional uniformed stewards.",
    descSi:
      "සුවිශේෂී මංගල බුෆේ වට්ටෝරු, සුඛෝපභෝගී රෝල්-ටොප් භාජන, සජීවී කුටි සහ නිල ඇඳුමින් සැරසුණු සේවක මණ්ඩලය.",
    featuresEn: [
      "Buffet warmers & tableware included",
      "Live Mongolian / BBQ stations",
      "Uniformed service stewards",
    ],
    featuresSi: [
      "උණුසුම් බුෆේ භාජන හා පිඟන් භාණ්ඩ",
      "සජීවී මොන්ගෝලියන් / BBQ කුටි",
      "වෘත්තීය නිල ඇඳුම් සේවක මණ්ඩලය",
    ],
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "dane",
    titleEn: "Sacred Alms Giving & Bana",
    titleSi: "දානමය පිංකම් හා බණ",
    tagEn: "Pious & Traditional",
    tagSi: "ශ්‍රද්ධා සම්පන්න",
    descEn:
      "Traditional 7-curry vegetarian or fish menus prepared with pristine cleanliness and respect for the venerable Maha Sangha.",
    descSi:
      "මහා සංඝරත්නය උදෙසා පිරිසිදුකම මුල් කරගත්, සාම්ප්‍රදායික ව්‍යංජන 7 කින් යුතු ගුණදායක දානමය සංග්‍රහ.",
    featuresEn: [
      "Pure, authentic traditional curries",
      "Individual Sangha thali trays",
      "Punctual morning & noon delivery",
    ],
    featuresSi: [
      "පාරම්පරික දේශීය ව්‍යංජන",
      "සංඝරත්නය උදෙසා විශේෂිත තැටි සැකසුම",
      "නියමිත වෙලාවටම පිළිගැන්වීම",
    ],
    image:
      "https://pub-3e659b3b1f5541c5b91d1021ffa5092a.r2.dev/madara_media/catering/1790588121973_Luang_Prabang__Respecting_the_alms-giving_ritual.jpeg",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "birthdays",
    titleEn: "Birthdays & Private Parties",
    titleSi: "උපන්දින හා පෞද්ගලික සාද",
    tagEn: "Lively & Vibrant",
    tagSi: "විනෝදජනක",
    descEn:
      "Clattering kottu stations, crispy bites, fiery sizzlers, and customizable buffet options tailored to your guest count.",
    descSi:
      "උණු උණු චීස් කොත්තු, රසවත් බයිට්ස්, සිස්ලර්ස් සහ මිතුරන් සමඟ විනෝද විය හැකි නම්‍යශීලී පැකේජ.",
    featuresEn: [
      "Live Kottu clattering on-site",
      "Specialty bites & chaser setups",
      "Flexible minimums from 25 pax",
    ],
    featuresSi: [
      "සජීවීව ක්ලැටර් වන කොත්තු කුටිය",
      "විශේෂිත බයිට්ස් සහ සෝස් සැකසුම්",
      "අවම 25 දෙනෙකුගේ සිට ඇණවුම්",
    ],
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "corporate",
    titleEn: "Corporate Events & Outdoor",
    titleSi: "ආයතනික හා එළිමහන් සාද",
    tagEn: "Corporate Standard",
    tagSi: "වෘත්තීය ප්‍රමිතිය",
    descEn:
      "Punctual corporate luncheons, conference catering, executive pack deliveries, and full outdoor canopy meal stations.",
    descSi:
      "කාර්යාල සම්මන්ත්‍රණ, වාර්ෂික හමුවීම් සහ එළිමහන් සාද සඳහා නියමිත වේලාවට ලබාදෙන වෘත්තීය කේටරින් සේවාව.",
    featuresEn: [
      "Punctual timing guaranteed",
      "Invoice & corporate payment options",
      "Full logistical setup & teardown",
    ],
    featuresSi: [
      "100% නියමිත වේලාවට භාරදීම",
      "ආයතනික ඉන්වොයිස් පහසුකම්",
      "සම්පූර්ණ ප්‍රවාහන හා උපකරණ පහසුකම්",
    ],
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    displayOrder: 4,
    isActive: true,
  },
];

export function mapFirestoreDocToCateringOccasion(data: any, docId: string): CateringOccasionItem {
  const fallback = DEFAULT_CATERING_OCCASIONS.find(
    (o) => o.id === docId || o.id === data.id
  );

  const titleEn = data.titleEn || data.title || data.name || (fallback ? fallback.titleEn : docId);
  const titleSi = data.titleSi || data.sinhalaName || (fallback ? fallback.titleSi : titleEn);
  const tagEn = data.tagEn || data.badge || (fallback ? fallback.tagEn : "Special Occasion");
  const tagSi = data.tagSi || (fallback ? fallback.tagSi : tagEn);
  const descEn = data.descEn || data.description || (fallback ? fallback.descEn : "");
  const descSi = data.descSi || (fallback ? fallback.descSi : descEn);
  const featuresEn =
    Array.isArray(data.featuresEn) && data.featuresEn.length > 0
      ? data.featuresEn
      : Array.isArray(data.features) && data.features.length > 0
      ? data.features
      : fallback ? fallback.featuresEn : [];
  const featuresSi =
    Array.isArray(data.featuresSi) && data.featuresSi.length > 0
      ? data.featuresSi
      : fallback ? fallback.featuresSi : featuresEn;
  const image =
    data.imageUrl || data.imageSrc || data.image || (fallback ? fallback.image : "");

  return {
    id: docId || data.id,
    titleEn,
    titleSi,
    tagEn,
    tagSi,
    descEn,
    descSi,
    featuresEn,
    featuresSi,
    image,
    whatsappPrefill: data.whatsappPrefill,
    displayOrder: typeof data.displayOrder === "number" ? data.displayOrder : 999,
    isActive: data.isActive !== false,
  };
}

export function subscribeToCateringOccasions(
  onSuccess: (occasions: CateringOccasionItem[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const colRef = collection(db, "catering_occasions");
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onSuccess(DEFAULT_CATERING_OCCASIONS);
          return;
        }

        const items: CateringOccasionItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.isActive === false) return;
          items.push(mapFirestoreDocToCateringOccasion(data, docSnap.id));
        });

        items.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
        onSuccess(items.length > 0 ? items : DEFAULT_CATERING_OCCASIONS);
      },
      (error) => {
        console.warn("Firestore catering_occasions listener error, using fallback:", error);
        if (onError) onError(error);
        onSuccess(DEFAULT_CATERING_OCCASIONS);
      }
    );
  } catch (err) {
    console.warn("Failed to subscribe to catering_occasions:", err);
    onSuccess(DEFAULT_CATERING_OCCASIONS);
    return () => {};
  }
}

export function useCateringOccasions() {
  const [occasions, setOccasions] = useState<CateringOccasionItem[]>(DEFAULT_CATERING_OCCASIONS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCateringOccasions((items) => {
      setOccasions(items);
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  return { occasions, isLoaded };
}

// ==========================================
// 2. CATERING ENHANCEMENTS & ADD-ONS
// ==========================================
export interface EnhancementSubItem {
  name: string;
  priceDisplay?: string;
  options?: string[];
}

export interface CateringEnhancementItem {
  id: string;
  title: string;
  titleSi?: string;
  subtitle: string;
  subtitleSi?: string;
  category: string;
  icon?: string;
  items: (string | EnhancementSubItem)[];
  displayOrder?: number;
  isActive?: boolean;
}

export const DEFAULT_CATERING_ENHANCEMENTS: CateringEnhancementItem[] = [
  {
    id: "full-buffet-setup",
    title: "Full Buffet Setup",
    titleSi: "සම්පූර්ණ බුෆේ උපකරණ සේවාව",
    subtitle: "Complete tableware, linen setup & service equipment",
    subtitleSi: "මේස රෙදි, උණුසුම් බුෆේ භාජන හා පිඟන් භාණ්ඩ",
    category: "buffet",
    icon: "UtensilsCrossed",
    displayOrder: 1,
    isActive: true,
    items: [
      "Buffet serving dishes (roll-top stainless steel)",
      "Buffet table with elegant frills",
      "Ceramic dinner plates & cutlery",
      "Water glasses & tumblers",
      "Paper serviettes & toothpick holders",
      "Dessert cups & spoons",
    ],
  },
  {
    id: "welcome-drinks",
    title: "Welcome Drinks",
    titleSi: "පිළිගැනීමේ බීම වර්ග",
    subtitle: "Chilled cordials, fresh juices & iced coffee",
    subtitleSi: "නැවුම් පලතුරු යුෂ, කෝඩියල් සහ අයිස් කෝපි",
    category: "drinks",
    icon: "GlassWater",
    displayOrder: 2,
    isActive: true,
    items: [
      "Cordials: Orange, Strawberry, Guava, Blackcurrant",
      "Fresh Tropical Juices: Watermelon, Pineapple, Mango, Papaya",
      "Signature Iced Coffee with Vanilla Cream",
    ],
  },
  {
    id: "artisanal-desserts",
    title: "Artisanal Desserts",
    titleSi: "ප්‍රණීත අතුරුපස",
    subtitle: "Traditional Sri Lankan & gourmet desserts",
    subtitleSi: "වටලප්පන්, කැරමල් පුඩිං සහ පළතුරු සලාද",
    category: "desserts",
    icon: "IceCream",
    displayOrder: 3,
    isActive: true,
    items: [
      "Fresh Fruit Platters (Watermelon, Mango, Pineapple, Papaya)",
      "Watalappam with Cashew Nuts",
      "Caramel Pudding & Cream",
      "Ice Cream Cups with Chocolate Drizzle",
      "Curd & Treacle (Kithul Pani)",
    ],
  },
  {
    id: "live-stations",
    title: "Live Action Cooking Kitchens",
    titleSi: "සජීවී ඉවුම් පිහුම් කුටි",
    subtitle: "Live chef action cooking at your venue",
    subtitleSi: "ඔබගේ උත්සව භූමියේදීම සජීවීව පිසෙන ප්‍රණීත ආහාර",
    category: "live_stations",
    icon: "Flame",
    displayOrder: 4,
    isActive: true,
    items: [
      "Live Mongolian Wok Station (Chicken, Seafood, Veg)",
      "Charcoal BBQ Carvery Grill Station",
      "Live Action Clattering Kottu & Hoppers Bar",
    ],
  },
];

export function mapFirestoreDocToCateringEnhancement(
  data: any,
  docId: string
): CateringEnhancementItem {
  const fallback = DEFAULT_CATERING_ENHANCEMENTS.find(
    (e) => e.id === docId || e.id === data.id
  );

  return {
    id: docId || data.id,
    title: data.title || data.titleEn || (fallback ? fallback.title : "Catering Enhancement"),
    titleSi: data.titleSi || (fallback ? fallback.titleSi : undefined),
    subtitle: data.subtitle || data.description || (fallback ? fallback.subtitle : ""),
    subtitleSi: data.subtitleSi || (fallback ? fallback.subtitleSi : undefined),
    category: data.category || (fallback ? fallback.category : "buffet"),
    icon: data.icon || (fallback ? fallback.icon : undefined),
    items: Array.isArray(data.items) && data.items.length > 0 ? data.items : (fallback ? fallback.items : []),
    displayOrder: typeof data.displayOrder === "number" ? data.displayOrder : 999,
    isActive: data.isActive !== false,
  };
}

export function subscribeToCateringEnhancements(
  onSuccess: (enhancements: CateringEnhancementItem[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const colRef = collection(db, "catering_enhancements");
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onSuccess(DEFAULT_CATERING_ENHANCEMENTS);
          return;
        }

        const items: CateringEnhancementItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.isActive === false) return;
          items.push(mapFirestoreDocToCateringEnhancement(data, docSnap.id));
        });

        items.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
        onSuccess(items.length > 0 ? items : DEFAULT_CATERING_ENHANCEMENTS);
      },
      (error) => {
        console.warn("Firestore catering_enhancements listener error, using fallback:", error);
        if (onError) onError(error);
        onSuccess(DEFAULT_CATERING_ENHANCEMENTS);
      }
    );
  } catch (err) {
    console.warn("Failed to subscribe to catering_enhancements:", err);
    onSuccess(DEFAULT_CATERING_ENHANCEMENTS);
    return () => {};
  }
}

export function useCateringEnhancements() {
  const [enhancements, setEnhancements] = useState<CateringEnhancementItem[]>(
    DEFAULT_CATERING_ENHANCEMENTS
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCateringEnhancements((items) => {
      setEnhancements(items);
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  return { enhancements, isLoaded };
}

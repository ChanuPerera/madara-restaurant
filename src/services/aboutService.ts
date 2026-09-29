"use client";

import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ==========================================
// 1. ABOUT HERO
// ==========================================
export interface AboutHeroData {
  id: string;
  heroBadge: string;
  heroBadgeSi?: string;
  heroTitle: string;
  heroTitleSi?: string;
  heroDescription: string;
  heroDescriptionSi?: string;
  heroImageUrl?: string;
  updatedAt?: string;
}

export const DEFAULT_ABOUT_HERO: AboutHeroData = {
  id: "main",
  heroBadge: "Madara Restaurant & Catering",
  heroBadgeSi: "මඩර ආයතනික තොරතුරු",
  heroTitle: "Homagama's Premier Dining & Catering Destination",
  heroTitleSi: "හෝමාගම අග්‍රගන්‍ය ආපනශාලා සහ කේටරින් සේවාව",
  heroDescription:
    "Located at 191/B/1, Athurugiriya Road, Homagama, Madara Restaurant & Catering Services is synonymous with exceptional food quality, impeccable hygiene, and dedicated event catering. From intimate alms-giving (Dane) ceremonies to grand wedding buffets, we craft unforgettable culinary experiences.",
  heroDescriptionSi:
    "හෝමාගම අතුරුගිරිය පාරේ පිහිටි මඩර ආපනශාලාව යනු ප්‍රණීත ආහාර සහ උසස්ම මට්ටමේ කේටරින් සේවාවන් සපයන ප්‍රමුඛතම ආයතනයයි. මංගල උත්සව, බණ හා දානමය පිංකම්, අවමංගල්‍ය සහ ආයතනික උත්සව සඳහා විශ්වාසනීයම සේවාව අපි ලබා දෙන්නෙමු.",
  heroImageUrl:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
};

export function mapFirestoreDocToAboutHero(data: any, docId: string): AboutHeroData {
  return {
    id: docId || data.id || "main",
    heroBadge: data.heroBadge || data.badge || DEFAULT_ABOUT_HERO.heroBadge,
    heroBadgeSi: data.heroBadgeSi || data.badgeSi || DEFAULT_ABOUT_HERO.heroBadgeSi,
    heroTitle: data.heroTitle || data.title || DEFAULT_ABOUT_HERO.heroTitle,
    heroTitleSi: data.heroTitleSi || data.titleSi || DEFAULT_ABOUT_HERO.heroTitleSi,
    heroDescription: data.heroDescription || data.description || DEFAULT_ABOUT_HERO.heroDescription,
    heroDescriptionSi: data.heroDescriptionSi || data.descSi || DEFAULT_ABOUT_HERO.heroDescriptionSi,
    heroImageUrl: data.heroImageUrl || data.imageUrl || data.image || DEFAULT_ABOUT_HERO.heroImageUrl,
    updatedAt: data.updatedAt,
  };
}

export function subscribeToAboutHero(
  onSuccess: (hero: AboutHeroData) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const docRef = doc(db, "about_hero", "main");
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          onSuccess(mapFirestoreDocToAboutHero(docSnap.data(), docSnap.id));
        } else {
          // If 'main' doc does not exist, try fetching the first doc in 'about_hero' collection
          getDocs(collection(db, "about_hero")).then((querySnap) => {
            if (!querySnap.empty) {
              const firstDoc = querySnap.docs[0];
              onSuccess(mapFirestoreDocToAboutHero(firstDoc.data(), firstDoc.id));
            } else {
              onSuccess(DEFAULT_ABOUT_HERO);
            }
          }).catch(() => {
            onSuccess(DEFAULT_ABOUT_HERO);
          });
        }
      },
      (error) => {
        console.warn("Firestore about_hero listener error, using fallback:", error);
        if (onError) onError(error);
        onSuccess(DEFAULT_ABOUT_HERO);
      }
    );
  } catch (err) {
    console.warn("Failed to subscribe to about_hero:", err);
    onSuccess(DEFAULT_ABOUT_HERO);
    return () => {};
  }
}

export function useAboutHero() {
  const [hero, setHero] = useState<AboutHeroData>(DEFAULT_ABOUT_HERO);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAboutHero((data) => {
      setHero(data);
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  return { hero, isLoaded };
}

// ==========================================
// 2. ACCREDITATIONS
// ==========================================
export interface AccreditationItem {
  id: string;
  title: string;
  titleSi?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export const DEFAULT_ACCREDITATIONS: AccreditationItem[] = [
  { id: "badge-1", title: "650+ Delivered Catering Events", titleSi: "සාර්ථක උත්සව 650+", displayOrder: 1, isActive: true },
  { id: "badge-2", title: "100% Hygienic PHO Standards", titleSi: "100% සෞඛ්‍යාරක්ෂිත ප්‍රමිතිය", displayOrder: 2, isActive: true },
  { id: "badge-3", title: "Executive Master Chefs", titleSi: "පළපුරුදු ප්‍රධාන සූපවේදීන්", displayOrder: 3, isActive: true },
  { id: "badge-4", title: "Natural Spices & Zero Additives", titleSi: "ස්වාභාවික දේශීය කුළුබඩු", displayOrder: 4, isActive: true },
];

export function mapFirestoreDocToAccreditation(data: any, docId: string): AccreditationItem {
  return {
    id: docId || data.id,
    title: data.title || data.titleEn || data.name || "",
    titleSi: data.titleSi || data.nameSi || data.sinhalaTitle,
    displayOrder: typeof data.displayOrder === "number" ? data.displayOrder : 999,
    isActive: data.isActive !== false,
  };
}

export function subscribeToAccreditations(
  onSuccess: (items: AccreditationItem[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const colRef = collection(db, "accreditations");
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onSuccess(DEFAULT_ACCREDITATIONS);
          return;
        }

        const items: AccreditationItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.isActive === false) return;
          items.push(mapFirestoreDocToAccreditation(data, docSnap.id));
        });

        items.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
        onSuccess(items.length > 0 ? items : DEFAULT_ACCREDITATIONS);
      },
      (error) => {
        console.warn("Firestore accreditations listener error, using fallback:", error);
        if (onError) onError(error);
        onSuccess(DEFAULT_ACCREDITATIONS);
      }
    );
  } catch (err) {
    console.warn("Failed to subscribe to accreditations:", err);
    onSuccess(DEFAULT_ACCREDITATIONS);
    return () => {};
  }
}

export function useAccreditations() {
  const [accreditations, setAccreditations] = useState<AccreditationItem[]>(DEFAULT_ACCREDITATIONS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAccreditations((items) => {
      setAccreditations(items);
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  return { accreditations, isLoaded };
}

// ==========================================
// 3. CULINARY SERVICES
// ==========================================
export interface CulinaryServiceItem {
  id: string;
  title: string;
  titleSi?: string;
  description: string;
  descSi?: string;
  icon: string;
  imageUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export const DEFAULT_CULINARY_SERVICES: CulinaryServiceItem[] = [
  {
    id: "srv-fine-dining",
    title: "Fine Dining Restaurant",
    titleSi: "ආපනශාලා ආහාර සේවාව",
    description: "Authentic Sri Lankan heritage curries, Mongolian wok fried rice, and fresh hot kottu in a comfortable family ambiance.",
    descSi: "ප්‍රණීත බත්, කොත්තු, මෙන්ම චීන සහ දේශීය කෑම වර්ග එකම වහලක් යටින්.",
    icon: "UtensilsCrossed",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "srv-catering",
    title: "Grand Event Catering",
    titleSi: "උත්සව කේටරින් සේවාව",
    description: "Complete per-person catering packages for Weddings, Alms Givings, Funerals & Celebrations across Homagama & Colombo.",
    descSi: "මංගල උත්සව, බණ හා දානමය පිංකම්, අවමංගල්‍ය හා උපන්දින සාද සඳහා පූර්ණ කේටරින් සේවාව.",
    icon: "Users",
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "srv-live-wok",
    title: "Live Wok & Charcoal BBQ",
    titleSi: "සජීවී කුටි සහ BBQ",
    description: "On-site live action cooking stations featuring fiery Mongolian wok, charcoal BBQ, and hoppers/kottu clattering.",
    descSi: "ඔබේ උත්සව භූමියේදීම සජීවීව පිළියෙළ කරන මොන්ගෝලියන් වොක්, BBQ සහ ආප්ප කුටි.",
    icon: "Flame",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "srv-corporate",
    title: "Corporate Meals & Events",
    titleSi: "ආයතනික කෑම පැකේජ",
    description: "Tailor-made seminar buffets, packed executive lunches, and corporate dinner spreads delivered punctually.",
    descSi: "කාර්යාලීය උත්සව, සම්මන්ත්‍රණ සහ රැස්වීම් සඳහා ගුණාත්මක ආහාර පැකේජ.",
    icon: "PartyPopper",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "srv-delivery",
    title: "Takeaway & Fast Delivery",
    titleSi: "ටේක්-අවේ සහ ඩිලිවරි",
    description: "Quick takeaway packing and prompt home delivery across Homagama, Athurugiriya, and surrounding suburbs.",
    descSi: "හෝමාගම සහ අවට ප්‍රදේශ සඳහා ඉක්මන් ඩිලිවරි හා ටේක්-අවේ සේවාව.",
    icon: "Soup",
    imageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80",
    displayOrder: 5,
    isActive: true,
  },
];

export function mapFirestoreDocToCulinaryService(data: any, docId: string): CulinaryServiceItem {
  const fallback = DEFAULT_CULINARY_SERVICES.find((s) => s.id === docId || s.id === data.id);
  return {
    id: docId || data.id,
    title: data.title || data.titleEn || data.name || (fallback ? fallback.title : "Culinary Service"),
    titleSi: data.titleSi || data.nameSi || (fallback ? fallback.titleSi : undefined),
    description: data.description || data.descriptionEn || data.desc || (fallback ? fallback.description : ""),
    descSi: data.descSi || data.descriptionSi || (fallback ? fallback.descSi : undefined),
    icon: data.icon || (fallback ? fallback.icon : "UtensilsCrossed"),
    imageUrl: data.imageUrl || data.image || (fallback ? fallback.imageUrl : undefined),
    displayOrder: typeof data.displayOrder === "number" ? data.displayOrder : 999,
    isActive: data.isActive !== false,
  };
}

export function subscribeToCulinaryServices(
  onSuccess: (items: CulinaryServiceItem[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const colRef = collection(db, "culinary_services");
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onSuccess(DEFAULT_CULINARY_SERVICES);
          return;
        }

        const items: CulinaryServiceItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.isActive === false) return;
          items.push(mapFirestoreDocToCulinaryService(data, docSnap.id));
        });

        items.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
        onSuccess(items.length > 0 ? items : DEFAULT_CULINARY_SERVICES);
      },
      (error) => {
        console.warn("Firestore culinary_services listener error, using fallback:", error);
        if (onError) onError(error);
        onSuccess(DEFAULT_CULINARY_SERVICES);
      }
    );
  } catch (err) {
    console.warn("Failed to subscribe to culinary_services:", err);
    onSuccess(DEFAULT_CULINARY_SERVICES);
    return () => {};
  }
}

export function useCulinaryServices() {
  const [services, setServices] = useState<CulinaryServiceItem[]>(DEFAULT_CULINARY_SERVICES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCulinaryServices((items) => {
      setServices(items);
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  return { services, isLoaded };
}

// ==========================================
// 4. HYGIENE STANDARDS & CERTIFICATIONS
// ==========================================
export interface HygieneStandardItem {
  id: string;
  title: string;
  titleSi?: string;
  description: string;
  descSi?: string;
  category?: "standard" | "certification" | "partner" | string;
  badgeText?: string;
  badgeTextSi?: string;
  certificateNumber?: string;
  issuingBody?: string;
  issuingBodySi?: string;
  validUntil?: string;
  logoUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export const DEFAULT_HYGIENE_STANDARDS: HygieneStandardItem[] = [
  {
    id: "std-hygiene",
    title: "100% Hygienic Food Prep",
    titleSi: "100% සෞඛ්‍යාරක්ෂිත බව",
    description: "Strict kitchen hygiene protocols complying with public health safety and sanitation standards.",
    descSi: "මහජන සෞඛ්‍ය පරීක්ෂක (PHI) උපදෙස් අනුව ඉහළම පිරිසිදුකම සුරැකූ මුළුතැන්ගෙය.",
    category: "standard",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "std-chefs",
    title: "Executive Master Chefs",
    titleSi: "පළපුරුදු ප්‍රධාන සූපවේදීන්",
    description: "Decades of culinary expertise crafting authentic flavors and secret sauce reductions.",
    descSi: "වසර ගණනාවක පළපුරුද්ද සහිත සූපවේදීන්ගේ අත්ගුණයෙන් නිමවන ප්‍රණීත ආහාර.",
    category: "standard",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "std-spices",
    title: "100% Natural Spices",
    titleSi: "ස්වාභාවික දේශීය කුළුබඩු",
    description: "Only natural Sri Lankan spices and fresh ingredients—zero harmful artificial additives.",
    descSi: "කෘතිම රසකාරක නොමැතිව ස්වාභාවික දේශීය කුළුබඩු පමණක් භාවිතා කිරීම.",
    category: "standard",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "std-events",
    title: "650+ Delivered Events",
    titleSi: "විශ්වාසනීය කේටරින් සේවාව",
    description: "Over 650 successful catering events delivered with 4.9/5 customer satisfaction.",
    descSi: "සාර්ථක උත්සව 650 කට අධික ප්‍රමාණයක් සහ 50,000 කට අධික තෘප්තිමත් පාරිභෝගිකයින්.",
    category: "standard",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "cert-gmp",
    title: "GMP Certified Food Preparation",
    titleSi: "GMP සහතිකලත් ආහාර පිළියෙළ කිරීම",
    description: "Certified compliance with Good Manufacturing Practice for commercial kitchen sanitation, hygiene, and safe food storage.",
    descSi: "ආහාර සනීපාරක්ෂාව සහ ගබඩා කිරීම පිළිබඳ යහපත් නිෂ්පාදන පරිචයන් (GMP) ප්‍රමිතිගතභාවය.",
    badgeText: "GMP Certified",
    issuingBody: "Public Health Safety & Standards Authority",
    certificateNumber: "GMP-HOM-2026-04",
    validUntil: "2026 Annual Audit",
    category: "certification",
    logoUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
    displayOrder: 5,
    isActive: true,
  },
  {
    id: "cert-phi",
    title: "Public Health Inspector (PHI) Grade A",
    titleSi: "මහජන සෞඛ්‍ය පරීක්ෂක (PHI) Grade A ප්‍රමිතිය",
    description: "Highest hygiene grading awarded following rigorous inspection of kitchens, water supply, and waste disposal systems.",
    descSi: "මුළුතැන්ගෙය සහ ජල සැපයුම් දැඩි නිරීක්ෂණයට ලක්කර ලබාගත් ඉහළම Grade A ශ්‍රේණිය.",
    badgeText: "Grade A Inspected",
    issuingBody: "Ministry of Health Sri Lanka",
    certificateNumber: "PHI-WP-HOM-8891",
    validUntil: "Valid 2026",
    category: "certification",
    logoUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80",
    displayOrder: 6,
    isActive: true,
  },
  {
    id: "cert-slsi",
    title: "100% Pure Natural Spices Standard",
    titleSi: "100% ස්වාභාවික දේශීය කුළුබඩු ප්‍රමිතිය",
    description: "Zero synthetic coloring, zero artificial chemical flavorings, and freshly roasted natural spices in all curries.",
    descSi: "කෘතිම වර්ණකාරක හෝ රසකාරක නොමැතිව නැවුම්ව බැදගත් දේශීය කුළුබඩු භාවිතය.",
    badgeText: "100% Natural",
    issuingBody: "Sri Lankan Spice Growers & Quality Board",
    category: "standard",
    logoUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    displayOrder: 7,
    isActive: true,
  },
  {
    id: "cert-halal",
    title: "Certified Halal Meat Sourcing Partner",
    titleSi: "හලාල් සහතිකලත් මස් සැපයුම් හවුල්කාරිත්වය",
    description: "All chicken and beef items are strictly sourced from certified halal meat processing suppliers.",
    descSi: "සියලුම මස් වර්ග පිළිගත් හලාල් සහතික සහිත විශ්වාසනීය සැපයුම්කරුවන්ගෙන් පමණක් ලබාගැනීම.",
    badgeText: "Halal Sourced",
    issuingBody: "Certified Poultry & Meat Sourcing Council",
    certificateNumber: "HALAL-2026-SRI",
    validUntil: "Annual Renewal",
    category: "partner",
    logoUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
    displayOrder: 8,
    isActive: true,
  },
];

export function mapFirestoreDocToHygieneStandard(data: any, docId: string): HygieneStandardItem {
  const fallback = DEFAULT_HYGIENE_STANDARDS.find((s) => s.id === docId || s.id === data.id);
  return {
    id: docId || data.id,
    title: data.title || data.titleEn || data.name || (fallback ? fallback.title : "Hygiene Standard"),
    titleSi: data.titleSi || data.nameSi || (fallback ? fallback.titleSi : undefined),
    description: data.description || data.descriptionEn || data.desc || (fallback ? fallback.description : ""),
    descSi: data.descSi || data.descriptionSi || (fallback ? fallback.descSi : undefined),
    category: data.category || (fallback ? fallback.category : "standard"),
    badgeText: data.badgeText || (fallback ? fallback.badgeText : undefined),
    badgeTextSi: data.badgeTextSi || (fallback ? fallback.badgeTextSi : undefined),
    certificateNumber: data.certificateNumber || (fallback ? fallback.certificateNumber : undefined),
    issuingBody: data.issuingBody || (fallback ? fallback.issuingBody : undefined),
    issuingBodySi: data.issuingBodySi || (fallback ? fallback.issuingBodySi : undefined),
    validUntil: data.validUntil || (fallback ? fallback.validUntil : undefined),
    logoUrl: data.logoUrl || (fallback ? fallback.logoUrl : undefined),
    displayOrder: typeof data.displayOrder === "number" ? data.displayOrder : 999,
    isActive: data.isActive !== false,
  };
}

export function subscribeToHygieneStandards(
  onSuccess: (items: HygieneStandardItem[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const colRef = collection(db, "hygiene_standards");
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onSuccess(DEFAULT_HYGIENE_STANDARDS);
          return;
        }

        const items: HygieneStandardItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.isActive === false) return;
          items.push(mapFirestoreDocToHygieneStandard(data, docSnap.id));
        });

        items.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
        onSuccess(items.length > 0 ? items : DEFAULT_HYGIENE_STANDARDS);
      },
      (error) => {
        console.warn("Firestore hygiene_standards listener error, using fallback:", error);
        if (onError) onError(error);
        onSuccess(DEFAULT_HYGIENE_STANDARDS);
      }
    );
  } catch (err) {
    console.warn("Failed to subscribe to hygiene_standards:", err);
    onSuccess(DEFAULT_HYGIENE_STANDARDS);
    return () => {};
  }
}

export function useHygieneStandards() {
  const [standards, setStandards] = useState<HygieneStandardItem[]>(DEFAULT_HYGIENE_STANDARDS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToHygieneStandards((items) => {
      setStandards(items);
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  return { standards, isLoaded };
}

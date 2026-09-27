"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import menuImg1 from "@/assets/3dmenu/1.png";
import menuImg2 from "@/assets/3dmenu/2.png";
import menuImg3 from "@/assets/3dmenu/3.png";
import menuImg4 from "@/assets/3dmenu/4.png";
import menuImg5 from "@/assets/3dmenu/5.png";
import menuImg6 from "@/assets/3dmenu/6.png";
import menuImg7 from "@/assets/3dmenu/7.png";

export interface ShowcaseDish {
  id: string;
  nameEn: string;
  nameSi: string;
  categoryEn: string;
  categorySi: string;
  priceDisplay: string;
  descriptionEn: string;
  descriptionSi: string;
  image: string;
  badgeEn: string;
  badgeSi: string;
  displayOrder?: number;
  isActive?: boolean;
}

export const DEFAULT_SIGNATURE_DISHES: ShowcaseDish[] = [
  {
    id: "sig-mongolian-wok",
    nameEn: "Madara Grand Mongolian Wok Bowl",
    nameSi: "මදාරා මොන්ගෝලියන් වොක්",
    categoryEn: "Live Action Wok",
    categorySi: "සජීවී වොක් කුටිය",
    priceDisplay: "LKR 1,850",
    descriptionEn:
      "Sizzling high-flame wok bowls tossed with tender cutlets, fresh vegetables, prawns & signature wok sauce.",
    descriptionSi:
      "සජීවී ගිනි දැල් මැද පිසෙන නැවුම් එළවළු, මාළු සහ මස් ඇතුළත් සුවඳැති මොන්ගෝලියන් වොක්.",
    image: menuImg1.src,
    badgeEn: "Live Action Favorite",
    badgeSi: "ජනප්‍රියම සජීවී කෑම",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "sig-dum-biryani",
    nameEn: "Royal Claypot Dum Biryani",
    nameSi: "රාජකීය දම් බිරියානි",
    categoryEn: "Rice & Biryani",
    categorySi: "බත් සහ බිරියානි",
    priceDisplay: "LKR 2,450",
    descriptionEn:
      "Aromatic basmati rice sealed in authentic claypots with tender marinated chicken, boiled eggs & mint raita.",
    descriptionSi:
      "මැටි ඇතිලියේ තම්බා සැකසූ සුවඳැති බාස්මතී බිරියානි, චිකන් සහ මින්ට් චට්නි සමඟ.",
    image: menuImg2.src,
    badgeEn: "Chef's Signature",
    badgeSi: "සූපවේදී විශේෂ තේරීම",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "sig-hbc",
    nameEn: "Fiery Hot Butter Cuttlefish",
    nameSi: "හොට් බටර් දැල්ලෝ",
    categoryEn: "BYOB Special Bites",
    categorySi: "BYOB ප්‍රියතම බයිට්ස්",
    priceDisplay: "LKR 1,950",
    descriptionEn:
      "Crispy fried cuttlefish tossed in aromatic garlic butter, scallions, and roasted chilli flakes.",
    descriptionSi:
      "කරස් ගා බැදගත් දැල්ලෝ, ගාලික් බටර් සහ ලූණු කොළ සමඟ තෙම්පරාදු කළ බයිට් එක.",
    image: menuImg3.src,
    badgeEn: "#1 BYOB Pairing",
    badgeSi: "අංක 1 BYOB තේරීම",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "sig-cheese-kottu",
    nameEn: "Molten Cheese Mixed Kottu",
    nameSi: "චීස් කොත්තු - මීට් මික්ස්",
    categoryEn: "Sizzling Kottu",
    categorySi: "කොත්තු සත්කාරය",
    priceDisplay: "LKR 1,650",
    descriptionEn:
      "Hand-clattered roti on hot iron griddles with roast chicken, beef, fresh veggies & melted rich cheddar cheese.",
    descriptionSi:
      "උණු උණු යකඩ තැටියේ කොත්තු කර උඩින් උණු කළ චීස් හෙලූ රසවත් මික්ස් කොත්තු.",
    image: menuImg4.src,
    badgeEn: "Sizzling Hot",
    badgeSi: "උණු උණු කෑම",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "sig-lagoon-prawns",
    nameEn: "Garlic Butter Lagoon Prawns",
    nameSi: "ගාලික් බටර් ඉස්සෝ",
    categoryEn: "Seafood Specialties",
    categorySi: "සීෆුඩ් විශේෂ",
    priceDisplay: "LKR 2,200",
    descriptionEn:
      "Jumbo lagoon prawns flame-grilled with rich garlic butter, parsley, and lemon wedges.",
    descriptionSi:
      "නැවුම් කලපු ඉස්සන් ගාලික් බටර් සහ දෙහි යුෂ සමඟ ග්‍රිල් කළ රාජකීය සංග්‍රහය.",
    image: menuImg5.src,
    badgeEn: "Premium Seafood",
    badgeSi: "උසස් සීෆුඩ්",
    displayOrder: 5,
    isActive: true,
  },
  {
    id: "sig-lamprais",
    nameEn: "Traditional Banana Leaf Lamprais",
    nameSi: "පාරම්පරික ලම්ප්‍රයිස්",
    categoryEn: "Sri Lankan Heritage",
    categorySi: "දේශීය උරුමය",
    priceDisplay: "LKR 1,450",
    descriptionEn:
      "Slow-baked in authentic banana leaf: stock rice, mixed meat curry, blachan, ash plantain & brinjal moju.",
    descriptionSi:
      "කෙසෙල් කොළයේ ඔතා අවන් කළ පාරම්පරික සුවඳැති ලම්ප්‍රයිස් සංග්‍රහය.",
    image: menuImg6.src,
    badgeEn: "Heritage Classic",
    badgeSi: "පාරම්පරික රසය",
    displayOrder: 6,
    isActive: true,
  },
  {
    id: "sig-beef-sizzler",
    nameEn: "Spicy Pepper Beef Sizzler",
    nameSi: "බ්ලැක් පෙපර් බීෆ් සිස්ලර්",
    categoryEn: "Sizzlers & Grills",
    categorySi: "සිස්ලර්ස් සහ ග්‍රිල්ස්",
    priceDisplay: "LKR 1,750",
    descriptionEn:
      "Tender beef strips wok-tossed with crushed black pepper, capsicum, onions, and spicy sauce.",
    descriptionSi:
      "කළු ගමිරිස් සහ අමු මිරිස් සමඟ තෙම්පරාදු කළ බීෆ් සිස්ලර් බයිට් එක.",
    image: menuImg7.src,
    badgeEn: "Fiery Delight",
    badgeSi: "දේවල් කළ බයිට්",
    displayOrder: 7,
    isActive: true,
  },
];

export function mapFirestoreDocToSignature(docData: any, docId: string): ShowcaseDish {
  const fallback =
    DEFAULT_SIGNATURE_DISHES.find(
      (d) =>
        d.id === docId ||
        d.id === docData.id ||
        d.id.replace("sig-", "") === docId.replace("sig-", "")
    ) || DEFAULT_SIGNATURE_DISHES[0];

  const nameEn = String(docData.nameEn || docData.name || fallback.nameEn);
  const nameSi = String(docData.nameSi || docData.sinhalaName || fallback.nameSi);
  const categoryEn = String(docData.categoryEn || docData.category || fallback.categoryEn);
  const categorySi = String(docData.categorySi || fallback.categorySi);

  let priceDisplay = String(docData.priceDisplay || docData.price || "");
  if (!priceDisplay && typeof docData.priceLKR === "number") {
    priceDisplay = `LKR ${docData.priceLKR.toLocaleString()}`;
  }
  if (!priceDisplay) {
    priceDisplay = fallback.priceDisplay;
  }

  const descriptionEn = String(
    docData.descriptionEn || docData.description || fallback.descriptionEn
  );
  const descriptionSi = String(docData.descriptionSi || fallback.descriptionSi);
  const image = String(
    docData.imageUrl || docData.image || docData.imageSrc || fallback.image
  );
  const badgeEn = String(docData.badgeEn || docData.badge || fallback.badgeEn);
  const badgeSi = String(docData.badgeSi || fallback.badgeSi);
  const displayOrder = typeof docData.displayOrder === "number" ? docData.displayOrder : 999;
  const isActive = docData.isActive !== false;

  return {
    id: docId || docData.id || fallback.id,
    nameEn,
    nameSi,
    categoryEn,
    categorySi,
    priceDisplay,
    descriptionEn,
    descriptionSi,
    image,
    badgeEn,
    badgeSi,
    displayOrder,
    isActive,
  };
}

export function subscribeToCulinarySignatures(
  onSuccess: (dishes: ShowcaseDish[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const colRef = collection(db, "culinary_signatures");
    return onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onSuccess(DEFAULT_SIGNATURE_DISHES);
          return;
        }

        const items: ShowcaseDish[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.isActive === false) return;
          items.push(mapFirestoreDocToSignature(data, docSnap.id));
        });

        items.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
        onSuccess(items.length > 0 ? items : DEFAULT_SIGNATURE_DISHES);
      },
      (error) => {
        console.warn("Firestore culinary_signatures listener error, using fallback:", error);
        if (onError) onError(error);
        onSuccess(DEFAULT_SIGNATURE_DISHES);
      }
    );
  } catch (err) {
    console.warn("Failed to subscribe to culinary_signatures:", err);
    onSuccess(DEFAULT_SIGNATURE_DISHES);
    return () => {};
  }
}

export async function fetchCulinarySignaturesFromFirebase(): Promise<ShowcaseDish[]> {
  try {
    const snap = await getDocs(collection(db, "culinary_signatures"));
    if (snap.empty) {
      return DEFAULT_SIGNATURE_DISHES;
    }
    const items: ShowcaseDish[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.isActive === false) return;
      items.push(mapFirestoreDocToSignature(data, docSnap.id));
    });
    items.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
    return items.length > 0 ? items : DEFAULT_SIGNATURE_DISHES;
  } catch (err) {
    console.warn("Error fetching culinary_signatures from Firebase:", err);
    return DEFAULT_SIGNATURE_DISHES;
  }
}

export function useCulinarySignatures() {
  const [signatures, setSignatures] = useState<ShowcaseDish[]>(DEFAULT_SIGNATURE_DISHES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCulinarySignatures((items) => {
      setSignatures(items);
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  return { signatures, isLoaded };
}

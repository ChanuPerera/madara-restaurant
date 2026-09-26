import { MenuItem, MenuItemPortion } from "@/data/restaurantData";

// Category fallback food images when imageSRC / imageUrl is empty
export const getDishFallbackImage = (category?: string, subCategory?: string): string => {
  const cat = category?.toLowerCase();
  const sub = subCategory?.toLowerCase() || "";

  if (cat === "rice") {
    return "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80";
  }
  if (cat === "kottu") {
    return "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80";
  }
  if (sub.includes("seafood") || sub.includes("cuttlefish") || sub.includes("prawn") || sub.includes("fish")) {
    return "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80";
  }
  if (sub.includes("chicken") || sub.includes("pork") || sub.includes("grill")) {
    return "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80";
  }
  return "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80";
};

// Map Firestore document data into standard website MenuItem interface
export const mapFirestoreDocToMenuItem = (docData: any, docId: string): MenuItem => {
  const portions: MenuItemPortion[] = Array.isArray(docData.portions) && docData.portions.length > 0
    ? docData.portions.map((p: any) => ({
        size: String(p.size || ""),
        label: String(p.label || ""),
        priceLKR: Number(p.priceLKR) || 0,
      }))
    : [];

  const rawPrice = Number(docData.priceLKR) ||
    (portions.length > 0 ? portions[0].priceLKR : (docData.prices?.single || docData.prices?.full || 0));

  // Determine portion text
  let portionText = docData.portion || "";
  if (!portionText && portions.length > 0) {
    portionText = portions.map((p) => `${p.size}: ${p.priceLKR.toLocaleString()}`).join(" | ");
  } else if (!portionText) {
    portionText = "Full Portion";
  }

  // Determine image URL
  const rawImage = docData.imageUrl || docData.imageSrc || docData.imageSRC || docData.image || "";
  const finalImage = rawImage.trim() !== "" ? rawImage.trim() : getDishFallbackImage(docData.category, docData.subCategory);

  // Determine allergens
  let allergens: string[] = [];
  if (Array.isArray(docData.allergens) && docData.allergens.length > 0) {
    allergens = docData.allergens.map((a: any) => String(a).trim()).filter(Boolean);
  } else if (typeof docData.allergenDetails === "string" && docData.allergenDetails.trim()) {
    allergens = docData.allergenDetails
      .replace(/^Contains\s+/i, "")
      .split(/[,&]/)
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  return {
    id: String(docData.id || docId || "unknown"),
    name: docData.name || "Untitled Dish",
    sinhalaName: docData.sinhalaName || "",
    category: docData.category || "other",
    subCategory: docData.subCategory || "",
    priceLKR: rawPrice,
    description: docData.description || "",
    portion: portionText,
    portions: portions.length > 0 ? portions : undefined,
    spicyLevel: typeof docData.spicyLevel === "number" ? docData.spicyLevel : undefined,
    isChefsSpecial: Boolean(docData.isChefsSpecial || docData.isSignature),
    isVegetarian: Boolean(docData.isVegetarian),
    isActionKitchen: Boolean(docData.isActionKitchen),
    isByobPairing: Boolean(docData.isByobPairing),
    image: finalImage,
    tags: Array.isArray(docData.tags) ? docData.tags : [],
    allergens: allergens,
    isAvailable: docData.isAvailable !== false,
  };
};

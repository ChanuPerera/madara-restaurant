import { MenuItem, MenuItemPortion } from "@/data/restaurantData";
import menuFallbackImg from "@/assets/restaurant_menu/fallback.jpg";

// Menu fallback food image
export const MENU_FALLBACK_IMAGE = menuFallbackImg.src;

// Category fallback food image when imageSRC / imageUrl is empty
export const getDishFallbackImage = (_category?: string, _subCategory?: string): string => {
  return MENU_FALLBACK_IMAGE;
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
  const finalImage = rawImage.trim() !== "" ? rawImage.trim() : MENU_FALLBACK_IMAGE;

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

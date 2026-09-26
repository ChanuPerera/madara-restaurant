import { collection, doc, getDoc, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  MenuItem, 
  MENU_ITEMS, 
  MENU_CATEGORIES, 
  CATERING_PACKAGES, 
  CateringPackageDetail 
} from "@/data/restaurantData";
import { getDishFallbackImage, mapFirestoreDocToMenuItem } from "@/utils/menuUtils";

export type UnifiedProduct = 
  | { kind: "restaurant"; data: MenuItem; categoryName: string }
  | { kind: "catering"; data: CateringPackageDetail; categoryName: string };

export { getDishFallbackImage, mapFirestoreDocToMenuItem };

/**
 * Fetch all menu items from Firebase Firestore with fallback to static MENU_ITEMS.
 * Safe for server components (generateStaticParams, generateMetadata) and client callers.
 */
export async function fetchMenuItemsFromFirebase(includeUnavailable = false): Promise<MenuItem[]> {
  try {
    const snap = await getDocs(collection(db, "menu_items"));
    if (snap.empty) {
      console.warn("menu_items collection in Firebase is empty, falling back to local static catalog.");
      return MENU_ITEMS;
    }

    const items: (MenuItem & { displayOrder?: number })[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (!includeUnavailable && data.isAvailable === false) return;
      const item = mapFirestoreDocToMenuItem(data, docSnap.id) as MenuItem & { displayOrder?: number };
      item.displayOrder = typeof data.displayOrder === "number" ? data.displayOrder : 999;
      items.push(item);
    });

    items.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
    return items.length > 0 ? items : MENU_ITEMS;
  } catch (error) {
    console.warn("Error fetching menu items from Firebase, falling back to local catalog:", error);
    return MENU_ITEMS;
  }
}

/**
 * Fetch a single menu item by ID from Firebase Firestore with fallback to static MENU_ITEMS.
 */
export async function fetchMenuItemByIdFromFirebase(id: string): Promise<MenuItem | null> {
  if (!id) return null;

  try {
    // 1. Try direct doc ID lookup
    const docRef = doc(db, "menu_items", id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return mapFirestoreDocToMenuItem(snap.data(), snap.id);
    }

    // 2. Try query by "id" field in case doc ID differs from item.id
    const q = query(collection(db, "menu_items"), where("id", "==", id), limit(1));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      const foundDoc = querySnap.docs[0];
      return mapFirestoreDocToMenuItem(foundDoc.data(), foundDoc.id);
    }
  } catch (error) {
    console.warn(`Firestore lookup failed for menu item ${id}, checking static catalog:`, error);
  }

  // 3. Fallback to static catalog
  const fallback = MENU_ITEMS.find((m) => m.id === id);
  return fallback || null;
}

/**
 * Resolve a product by ID across Firebase restaurant menu items and catering packages.
 */
export async function getProductByIdFromSources(id: string): Promise<UnifiedProduct | null> {
  // 1. Check restaurant dish from Firebase / static catalog
  const menuItem = await fetchMenuItemByIdFromFirebase(id);
  if (menuItem) {
    const catName = MENU_CATEGORIES.find((c) => c.id === menuItem.category)?.name || menuItem.subCategory || "Restaurant Dish";
    return { kind: "restaurant", data: menuItem, categoryName: catName };
  }

  // 2. Check catering package
  const cateringPkg = CATERING_PACKAGES.find((c) => c.id === id);
  if (cateringPkg) {
    return { kind: "catering", data: cateringPkg, categoryName: cateringPkg.categoryName };
  }

  return null;
}

/**
 * Get related products for a given item, powered by live Firebase menu data.
 */
export async function getRelatedProductsFromSources(
  currentId: string,
  categoryId: string,
  kind: "restaurant" | "catering",
  liveItems?: MenuItem[]
): Promise<UnifiedProduct[]> {
  if (kind === "catering") {
    const relatedCatering = CATERING_PACKAGES
      .filter((c) => c.id !== currentId && c.categoryId === categoryId)
      .map((c) => ({ kind: "catering" as const, data: c, categoryName: c.categoryName }));

    if (relatedCatering.length >= 3) return relatedCatering.slice(0, 3);

    const filler = CATERING_PACKAGES
      .filter((c) => c.id !== currentId && !relatedCatering.some((r) => r.data.id === c.id))
      .slice(0, 3 - relatedCatering.length)
      .map((c) => ({ kind: "catering" as const, data: c, categoryName: c.categoryName }));

    return [...relatedCatering, ...filler];
  }

  // Restaurant items
  const menuList = (liveItems && liveItems.length > 0) 
    ? liveItems 
    : await fetchMenuItemsFromFirebase();

  const sameCat = menuList
    .filter((m) => m.id !== currentId && m.category === categoryId)
    .map((m) => {
      const catName = MENU_CATEGORIES.find((c) => c.id === m.category)?.name || m.subCategory || "Restaurant Dish";
      return { kind: "restaurant" as const, data: m, categoryName: catName };
    });

  if (sameCat.length >= 3) {
    return sameCat.slice(0, 3);
  }

  const filler = menuList
    .filter((m) => m.id !== currentId && !sameCat.some((r) => r.data.id === m.id))
    .slice(0, 3 - sameCat.length)
    .map((m) => {
      const catName = MENU_CATEGORIES.find((c) => c.id === m.category)?.name || m.subCategory || "Restaurant Dish";
      return { kind: "restaurant" as const, data: m, categoryName: catName };
    });

  return [...sameCat, ...filler].slice(0, 3);
}

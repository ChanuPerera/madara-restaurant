"use client";

import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MenuItem, MENU_ITEMS } from "@/data/restaurantData";
import { 
  fetchMenuItemsFromFirebase, 
  fetchMenuItemByIdFromFirebase,
  getProductByIdFromSources,
  getRelatedProductsFromSources,
  getDishFallbackImage, 
  mapFirestoreDocToMenuItem,
  MENU_FALLBACK_IMAGE,
  UnifiedProduct
} from "./menuData";

export { 
  fetchMenuItemsFromFirebase, 
  fetchMenuItemByIdFromFirebase,
  getProductByIdFromSources,
  getRelatedProductsFromSources,
  getDishFallbackImage, 
  mapFirestoreDocToMenuItem,
  MENU_FALLBACK_IMAGE
};
export type { UnifiedProduct };

// Subscribe to real-time updates for all menu items
export const subscribeToMenuItems = (
  onSuccess: (items: MenuItem[]) => void,
  onError?: (error: Error) => void
): (() => void) => {
  try {
    const unsubscribe = onSnapshot(
      collection(db, "menu_items"),
      (snap) => {
        if (snap.empty) {
          onSuccess(MENU_ITEMS);
          return;
        }

        const items: (MenuItem & { displayOrder?: number })[] = [];
        snap.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.isAvailable === false) return;
          const item = mapFirestoreDocToMenuItem(data, docSnap.id) as MenuItem & { displayOrder?: number };
          item.displayOrder = typeof data.displayOrder === "number" ? data.displayOrder : 999;
          items.push(item);
        });

        items.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
        onSuccess(items);
      },
      (err) => {
        console.warn("Real-time menu listener error, using fallback:", err);
        if (onError) onError(err);
        onSuccess(MENU_ITEMS);
      }
    );

    return unsubscribe;
  } catch (err: any) {
    console.warn("Failed to attach Firestore snapshot listener:", err);
    onSuccess(MENU_ITEMS);
    return () => {};
  }
};

// Subscribe to a single menu item by ID in real-time
export const subscribeToMenuItem = (
  id: string,
  onSuccess: (item: MenuItem | null) => void,
  onError?: (error: Error) => void
): (() => void) => {
  if (!id) {
    onSuccess(null);
    return () => {};
  }

  try {
    const docRef = doc(db, "menu_items", id);
    let unsubQuery: (() => void) | null = null;

    const unsubDoc = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const item = mapFirestoreDocToMenuItem(docSnap.data(), docSnap.id);
          onSuccess(item);
        } else {
          // If not found by doc ID, try querying by "id" field in Firestore
          const q = query(collection(db, "menu_items"), where("id", "==", id));
          unsubQuery = onSnapshot(
            q,
            (querySnap) => {
              if (!querySnap.empty) {
                const found = querySnap.docs[0];
                onSuccess(mapFirestoreDocToMenuItem(found.data(), found.id));
              } else {
                const fallback = MENU_ITEMS.find((m) => m.id === id) || null;
                onSuccess(fallback);
              }
            },
            (err) => {
              if (onError) onError(err);
              const fallback = MENU_ITEMS.find((m) => m.id === id) || null;
              onSuccess(fallback);
            }
          );
        }
      },
      (err) => {
        console.warn(`Real-time listener error for item ${id}:`, err);
        if (onError) onError(err);
        const fallback = MENU_ITEMS.find((m) => m.id === id) || null;
        onSuccess(fallback);
      }
    );

    return () => {
      unsubDoc();
      if (unsubQuery) unsubQuery();
    };
  } catch (err: any) {
    console.warn(`Failed to attach Firestore listener for item ${id}:`, err);
    const fallback = MENU_ITEMS.find((m) => m.id === id) || null;
    onSuccess(fallback);
    return () => {};
  }
};

// Custom React hook for client-side menu consuming
export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = subscribeToMenuItems(
      (liveItems) => {
        if (!isMounted) return;
        setItems(liveItems);
        setIsLive(true);
        setLoading(false);
      },
      () => {
        if (!isMounted) return;
        setIsLive(false);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return { items, isLive, loading };
}

// Custom React hook for single item client-side consuming & live synchronization
export function useMenuItem(id: string, initialItem?: MenuItem | null) {
  const [item, setItem] = useState<MenuItem | null>(initialItem || null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(!initialItem);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    // If initialItem changes from outside, keep it
    if (initialItem) {
      setItem(initialItem);
    }

    const unsubscribe = subscribeToMenuItem(
      id,
      (liveItem) => {
        if (!isMounted) return;
        if (liveItem) {
          setItem(liveItem);
          setIsLive(true);
        } else if (initialItem) {
          setItem(initialItem);
        }
        setLoading(false);
      },
      () => {
        if (!isMounted) return;
        if (initialItem) {
          setItem(initialItem);
        }
        setIsLive(false);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [id, initialItem]);

  return { item, isLive, loading };
}

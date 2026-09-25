"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MenuItem, MENU_ITEMS } from "@/data/restaurantData";
import { getDishFallbackImage, mapFirestoreDocToMenuItem } from "@/utils/menuUtils";

export { getDishFallbackImage, mapFirestoreDocToMenuItem };

// Fetch once from Firestore with fallback to static MENU_ITEMS
export const fetchMenuItemsFromFirebase = async (): Promise<MenuItem[]> => {
  try {
    const snap = await getDocs(collection(db, "menu_items"));
    if (snap.empty) {
      console.warn("menu_items collection in Firebase is empty, falling back to local static catalog.");
      return MENU_ITEMS;
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
    return items;
  } catch (error) {
    console.warn("Error fetching menu items from Firebase, falling back to local catalog:", error);
    return MENU_ITEMS;
  }
};

// Subscribe to real-time updates from Firebase Firestore
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
      (err) => {
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

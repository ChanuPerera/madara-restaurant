import type { MetadataRoute } from "next";
import { MENU_ITEMS, CATERING_PACKAGES } from "@/data/restaurantData";
import { fetchMenuItemsFromFirebase } from "@/services/menuData";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://madararestaurant.com";
  const now = new Date();

  // Core Landing and Pillar Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catering/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/menu/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/careers/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catering-menu/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Collect all unique dish & package IDs (Firebase live + static fallback)
  const allIds = new Set<string>();
  MENU_ITEMS.forEach((item) => allIds.add(item.id));
  CATERING_PACKAGES.forEach((pkg) => allIds.add(pkg.id));

  try {
    const liveItems = await fetchMenuItemsFromFirebase(true);
    if (liveItems && liveItems.length > 0) {
      liveItems.forEach((item) => allIds.add(item.id));
    }
  } catch (err) {
    console.warn("Sitemap: using static menu IDs fallback:", err);
  }

  const dynamicRoutes: MetadataRoute.Sitemap = Array.from(allIds).map((id) => ({
    url: `${baseUrl}/menu/${id}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}

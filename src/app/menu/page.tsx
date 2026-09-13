import React from "react";
import type { Metadata } from "next";
import MenuCatalogClient from "./MenuCatalogClient";
import { RESTAURANT_INFO } from "@/data/restaurantData";

export const metadata: Metadata = {
  title: "Food & Catering Menu | Madara Restaurant & Catering Homagama",
  description:
    "Explore full food menus and event catering packages at Madara Restaurant Homagama. Features Rice, Kottu, Seafood, Curries & Per-Person Catering Menus.",
  keywords: [
    "Madara Menu Homagama",
    "Restaurant Menu Homagama",
    "Catering Menu Homagama",
    "Mongolian Wok Homagama",
    "Cheese Kottu Homagama",
    "Jaffna Crab Curry Homagama",
    "Fried Rice Homagama",
    "Food Delivery Homagama",
    "Madara Restaurant Prices",
  ],
  alternates: {
    canonical: "https://madararestaurant.lk/menu/",
  },
  openGraph: {
    title: "Food & Catering Menu | Madara Restaurant & Catering Homagama",
    description:
      "Full menu showcase for dine-in, takeaway, and per-person catering packages in Homagama. Signature Wok, Biryani, Kottu, Seafood, and event catering spreads.",
    url: "https://madararestaurant.lk/menu/",
    siteName: "Madara Restaurant & Catering",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Madara Restaurant Food & Catering Menu",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
};

export default function MenuPage() {
  const jsonLdMenu = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Madara Restaurant & Catering Services Homagama",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
    description: "Homagama's premier restaurant and event catering service.",
    url: "https://madararestaurant.lk/menu/",
    telephone: RESTAURANT_INFO.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: RESTAURANT_INFO.address,
      addressLocality: "Homagama",
      addressRegion: "Western Province",
      addressCountry: "LK",
    },
    servesCuisine: ["Sri Lankan", "Chinese", "Western", "Mongolian Wok", "Indian"],
    hasMenu: "https://madararestaurant.lk/menu/",
    priceRange: "LKR 700 - LKR 3,850",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMenu) }}
      />
      <MenuCatalogClient />
    </>
  );
}

import React from "react";
import type { Metadata } from "next";
import CateringPageClient from "./CateringPageClient";
import { RESTAURANT_INFO } from "@/data/restaurantData";

export const metadata: Metadata = {
  title: "Catering Menus & Tailored Packages | Madara Restaurant Homagama",
  description:
    "Explore full catering menus and tailored per-person packages for Weddings, Birthdays, Alms Giving (Dane), Funerals, and Corporate events in Homagama & Colombo. Includes buffet warmers, table setup, and party stewards. Book via WhatsApp.",
  keywords: [
    "Catering Menu Homagama",
    "Catering Packages Homagama",
    "Wedding Catering Homagama",
    "Alms Giving Catering Colombo",
    "Dane Catering Service Sri Lanka",
    "Birthday Catering Homagama",
    "Funeral Catering Homagama",
    "Outdoor Catering Homagama",
    "Madara Catering Menu",
    "Buffet Catering Homagama",
  ],
  alternates: {
    canonical: "https://madararestaurant.lk/catering/",
  },
  openGraph: {
    title: "Catering Menus & Tailored Packages | Madara Restaurant Homagama",
    description:
      "All-inclusive event catering menus with itemized selections, transparent per-person pricing, buffet warmers, tableware, and steward services across Homagama and Colombo.",
    url: "https://madararestaurant.lk/catering/",
    siteName: "Madara Restaurant & Catering",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Madara Restaurant Catering Menus & Event Packages",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
};

export default function CateringPage() {
  const jsonLdCatering = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Madara Restaurant & Catering Services Homagama",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    description: "Homagama's premier catering service for Weddings, Alms Giving (Dane), Funerals, Birthdays, and Corporate Events.",
    url: "https://madararestaurant.lk/catering/",
    telephone: RESTAURANT_INFO.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: RESTAURANT_INFO.address,
      addressLocality: "Homagama",
      addressRegion: "Western Province",
      addressCountry: "LK",
    },
    servesCuisine: ["Sri Lankan", "Chinese", "Western", "Mongolian Wok", "BBQ"],
    hasMenu: "https://madararestaurant.lk/catering/",
    priceRange: "LKR 700 - LKR 3,850",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCatering) }}
      />
      <CateringPageClient />
    </>
  );
}

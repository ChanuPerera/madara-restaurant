import React from "react";
import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { RESTAURANT_INFO } from "@/data/restaurantData";

export const metadata: Metadata = {
  title: "About Us & Contact Info | Madara Restaurant & Catering Homagama",
  description:
    "Learn about Madara Restaurant & Catering Services in Homagama. Over 650 delivered catering events, 100% food safety standards, executive master chefs, and 50,000+ satisfied guests. Call 0704535815.",
  keywords: [
    "About Madara Restaurant",
    "Madara Catering Homagama",
    "Madara Restaurant Contact",
    "Madara Phone Number",
    "Restaurant Homagama Address",
    "Food Safety Certification Homagama",
    "Athurugiriya Road Catering",
    "Homagama Catering Desk",
  ],
  alternates: {
    canonical: "https://madararestaurant.lk/about/",
  },
  openGraph: {
    title: "About Us & Contact Info | Madara Restaurant & Catering Homagama",
    description:
      "Homagama's premier catering and dining destination. 100% hygienic prep, master chefs, and 650+ delivered catering events.",
    url: "https://madararestaurant.lk/about/",
    siteName: "Madara Restaurant & Catering",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "About Madara Restaurant & Catering Homagama",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
};

export default function AboutPage() {
  const jsonLdAbout = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Madara Restaurant & Catering Services Homagama",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    description: "Homagama's premier restaurant and event catering service.",
    url: "https://madararestaurant.lk/about/",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }}
      />
      <AboutPageClient />
    </>
  );
}

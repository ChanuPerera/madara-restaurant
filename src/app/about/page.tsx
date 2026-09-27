import React from "react";
import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { RESTAURANT_INFO } from "@/data/restaurantData";

export const metadata: Metadata = {
  title: "About Madara Restaurant & Catering Services Homagama",
  description:
    "Discover Homagama's trusted catering specialist with over 650 successful events. Master chefs, hygienic preparation, and full event hospitality. Contact us today!",
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
    canonical: "https://madararestaurant.com/about/",
  },
  openGraph: {
    title: "About Madara Restaurant & Catering Services Homagama",
    description:
      "Homagama's premier catering and dining destination. 100% hygienic prep, master chefs, and 650+ delivered catering events.",
    url: "https://madararestaurant.com/about/",
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
  twitter: {
    card: "summary_large_image",
    title: "About Madara Restaurant & Catering Services Homagama",
    description:
      "Homagama's premier catering specialist with over 650 successful events. Contact us today!",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
  },
};

export default function AboutPage() {
  const jsonLdAbout = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://madararestaurant.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: "https://madararestaurant.com/about/",
          },
        ],
      },
      {
        "@type": "FoodEstablishment",
        name: "Madara Restaurant & Catering Services Homagama",
        image:
          "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
        description:
          "Homagama's premier restaurant and event catering service.",
        url: "https://madararestaurant.com/about/",
        telephone: RESTAURANT_INFO.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: RESTAURANT_INFO.address,
          addressLocality: "Homagama",
          addressRegion: "Western Province",
          addressCountry: "LK",
        },
        servesCuisine: [
          "Sri Lankan",
          "Chinese",
          "Western",
          "Mongolian Wok",
          "Indian",
        ],
        hasMenu: "https://madararestaurant.com/menu/",
        priceRange: "LKR 700 - LKR 3,850",
      },
    ],
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

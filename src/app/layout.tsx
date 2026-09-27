import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const quicksand = localFont({
  src: "../../public/fonts/quicksand-latin.woff2",
  variable: "--font-quicksand",
  display: "swap",
  weight: "300 700",
  fallback: ["Quicksand", "system-ui", "sans-serif"],
});

const cinzel = localFont({
  src: [
    {
      path: "../../public/fonts/cinzel-latin.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/cinzel-latin-ext.woff2",
      weight: "400 900",
      style: "normal",
    },
  ],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Madara Restaurant & Catering Homagama | Event Catering",
    template: "%s | Madara Restaurant Homagama",
  },
  description:
    "Homagama's premier catering service for Weddings, Dane, Funerals, and Parties. Enjoy live Mongolian wok, BBQ, and dine-in. Book your catering menu today!",
  keywords: [
    "Madara Restaurant",
    "Madara Catering Homagama",
    "Wedding Catering Homagama",
    "Alms Giving Catering Sri Lanka",
    "Dane Catering Homagama",
    "Bana and Dane Food Catering",
    "Funeral Catering Homagama",
    "Birthday Catering Packages Homagama",
    "Corporate Event Catering Homagama",
    "Live Action Kitchen Sri Lanka",
    "Mongolian Wok Station Homagama",
    "Athurugiriya Road Restaurant",
    "Food Delivery Homagama",
  ],
  authors: [{ name: "Madara Restaurant & Catering Team" }],
  creator: "Madara Restaurant",
  publisher: "Madara Restaurant",
  metadataBase: new URL("https://madararestaurant.lk"),
  alternates: {
    canonical: "https://madararestaurant.lk/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Madara Restaurant & Catering Homagama | Event Catering Specialist",
    description:
      "Homagama's premier catering service for Weddings, Dane, Funerals, and Parties. Live Action Stations, Dine-in & BYOB. Call 0704535815.",
    url: "https://madararestaurant.lk/",
    siteName: "Madara Restaurant & Catering",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Madara Restaurant & Catering Homagama Events",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madara Restaurant & Catering Homagama | Event Catering Specialist",
    description:
      "Homagama's premier catering service for Weddings, Dane, Funerals, and Parties. Live Action Stations, Dine-in & BYOB. Call 0704535815.",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import FloatingCareersButton from "@/components/FloatingCareersButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://madararestaurant.lk/#website",
        "url": "https://madararestaurant.lk/",
        "name": "Madara Restaurant & Catering Homagama",
        "description": "Homagama's premier catering service and multi-cuisine restaurant",
        "inLanguage": ["en", "si"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://madararestaurant.lk/menu/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Restaurant",
        "@id": "https://madararestaurant.lk/#restaurant",
        "name": RESTAURANT_INFO.name,
        "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
        "telephone": RESTAURANT_INFO.phone,
        "email": RESTAURANT_INFO.email,
        "url": "https://madararestaurant.lk/",
        "menu": "https://madararestaurant.lk/menu/",
        "servesCuisine": [
          "Sri Lankan",
          "Asian Fusion",
          "Mongolian Wok",
          "Charcoal BBQ",
          "Traditional Dane Curries",
          "Indian",
          "Seafood",
        ],
        "priceRange": "LKR 750 - LKR 4,950",
        "currenciesAccepted": "LKR",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "191/B/1, Athurugiriya Road",
          "addressLocality": "Homagama",
          "addressRegion": "Western Province",
          "postalCode": "10200",
          "addressCountry": "LK",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 6.8436,
          "longitude": 80.0019,
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "07:00",
            "closes": "22:00",
          },
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "650",
          "bestRating": "5",
          "worstRating": "1",
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Madara Restaurant & Catering Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Wedding & Homecoming Catering",
                "description": "Grand event catering with luxury chafing displays, live action stations, and stewards.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Alms Giving & Bana Dane Catering (දානමය පිංකම්)",
                "description": "Pious, traditional 7-curry Dane meals prepared with supreme cleanliness for Maha Sangha.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Funeral & Memorial Catering",
                "description": "Dignified, punctual catering for memorial wakes, tea service with short eats, and warm buffets.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Birthday Party & Corporate Catering",
                "description": "Customizable multi-cuisine catering for birthdays, office seminars, and private gatherings.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Live Action Cooking Kitchens",
                "description": "On-site live Mongolian wok, charcoal BBQ, and hoppers/kottu cooking stations.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${quicksand.variable} ${cinzel.variable} ${quicksand.className}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-amber-600 selection:text-white">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <FloatingCareersButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

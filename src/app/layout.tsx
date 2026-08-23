import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madara Restaurant & Catering Homagama | Wedding, Alms Giving, Bana & Event Catering",
  description:
    "Homagama's premier catering specialist for Weddings, Alms Giving (දානමය පිංකම්), Bana & Dane, Funeral meals, Birthday celebrations & Corporate events. Live Mongolian wok stations, charcoal BBQ, takeaway & BYOB dining at 191/B/1, Athurugiriya Road, Homagama. Call 0704535815 / 0736535815.",
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
    "BYOB Restaurant Homagama",
    "Athurugiriya Road Restaurant",
    "Food Delivery Homagama",
  ],
  authors: [{ name: "Madara Restaurant & Catering Team" }],
  creator: "Madara Restaurant",
  publisher: "Madara Restaurant",
  metadataBase: new URL("https://madararestaurant.lk"),
  alternates: {
    canonical: "https://madararestaurant.lk",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Madara Restaurant & Catering Homagama | Grand Event Catering Specialist",
    description:
      "Catering for Weddings, Alms Giving (Dane), Funerals, Birthdays & Corporate Events. Live Action Stations, Dine-in & BYOB dining in Homagama, Sri Lanka. Call 0704535815.",
    url: "https://madararestaurant.lk",
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
    description: "Catering for Weddings, Alms Giving, Funerals, Birthdays & Corporate Events in Homagama. Call 0704535815.",
    images: ["https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&h=630&q=80"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": "https://madararestaurant.lk/#restaurant",
        "name": RESTAURANT_INFO.name,
        "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
        "telephone": RESTAURANT_INFO.phone,
        "email": RESTAURANT_INFO.email,
        "url": "https://madararestaurant.lk",
        "menu": "https://madararestaurant.lk/#menu",
        "servesCuisine": ["Sri Lankan", "Asian Fusion", "Mongolian Wok", "Charcoal BBQ", "Traditional Dane Curries", "Indian", "Seafood"],
        "priceRange": "LKR 750 - LKR 4,950",
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
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "BYOB Dining Facility",
                "description": "Bring Your Own Bottle dining with glassware, ice bucket service, and spicy chaser pairings.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-madara-dark text-white min-h-screen antialiased selection:bg-madara-orange selection:text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

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
    default: "Madara Restaurant Homagama | Multi-Cuisine Dine-in, BYOB & Catering",
    template: "%s | Madara Restaurant Homagama",
  },
  description:
    "Visit Homagama's top multi-cuisine restaurant on Athurugiriya Road. Dine-in, BYOB with zero corkage, takeaway, and Sri Lankan, Chinese & Mongolian wok food. Event catering specialist.",
  keywords: [
    "Madara Restaurant",
    "Homagama Restaurant",
    "Restaurants in Homagama",
    "Homagama Restaurants",
    "BYOB Restaurant Homagama",
    "Homagama BYOB Places",
    "Restaurants near Homagama",
    "Athurugiriya Road Restaurant",
    "Restaurants near Athurugiriya",
    "Family Restaurant Homagama",
    "Mongolian Wok Station Homagama",
    "Best Fried Rice Homagama",
    "Cheese Kottu Homagama",
    "Food Delivery Homagama",
    "Madara Catering Homagama",
    "Wedding Catering Homagama",
    "Alms Giving Catering Sri Lanka",
    "Dane Catering Homagama",
    "Funeral Catering Homagama",
    "Birthday Catering Packages Homagama",
    "Corporate Event Catering Homagama",
  ],
  authors: [{ name: "Madara Restaurant & Catering Team" }],
  creator: "Madara Restaurant",
  publisher: "Madara Restaurant",
  metadataBase: new URL("https://madararestaurant.com"),
  alternates: {
    canonical: "https://madararestaurant.com/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Madara Restaurant Homagama | Multi-Cuisine Dine-in, BYOB & Catering",
    description:
      "Homagama's top dining & event catering destination on Athurugiriya Road. Live Mongolian wok, BBQ, BYOB with zero corkage, and full-service event catering. Call 0704535815.",
    url: "https://madararestaurant.com/",
    siteName: "Madara Restaurant & Catering",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Madara Restaurant & Catering Homagama",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madara Restaurant Homagama | Multi-Cuisine Dine-in, BYOB & Catering",
    description:
      "Homagama's top dining & event catering destination on Athurugiriya Road. Live Mongolian wok, BBQ, BYOB with zero corkage, and full-service event catering.",
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
        "@id": "https://madararestaurant.com/#website",
        url: "https://madararestaurant.com/",
        name: "Madara Restaurant & Catering Homagama",
        description:
          "Homagama's premier catering service and multi-cuisine restaurant",
        inLanguage: ["en", "si"],
        potentialAction: {
          "@type": "SearchAction",
          target: "https://madararestaurant.com/menu/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Restaurant",
        "@id": "https://madararestaurant.com/#restaurant",
        name: RESTAURANT_INFO.name,
        image:
          "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
        telephone: RESTAURANT_INFO.phone,
        email: RESTAURANT_INFO.email,
        url: "https://madararestaurant.com/",
        menu: "https://madararestaurant.com/menu/",
        servesCuisine: [
          "Sri Lankan",
          "Asian Fusion",
          "Mongolian Wok",
          "Charcoal BBQ",
          "Traditional Dane Curries",
          "Indian",
          "Seafood",
        ],
        priceRange: "LKR 750 - LKR 4,950",
        currenciesAccepted: "LKR",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        address: {
          "@type": "PostalAddress",
          streetAddress: "191/B/1, Athurugiriya Road",
          addressLocality: "Homagama",
          addressRegion: "Western Province",
          postalCode: "10200",
          addressCountry: "LK",
        },
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Homagama",
          },
          {
            "@type": "AdministrativeArea",
            name: "Athurugiriya",
          },
          {
            "@type": "AdministrativeArea",
            name: "Western Province",
          },
        ],
        amenityFeature: [
          {
            "@type": "LocationFeatureSpecification",
            name: "BYOB (Bring Your Own Bottle) Allowed",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Zero Corkage Fee",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Dine-In Seating",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Takeaway & Delivery",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Live Cooking Kitchens",
            value: true,
          },
        ],
        geo: {
          "@type": "GeoCoordinates",
          latitude: 6.8436,
          longitude: 80.0019,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "07:00",
            closes: "22:00",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "650",
          bestRating: "5",
          worstRating: "1",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Madara Restaurant & Catering Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Wedding & Homecoming Catering",
                description:
                  "Grand event catering with luxury chafing displays, live action stations, and stewards.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Alms Giving & Bana Dane Catering (දානමය පිංකම්)",
                description:
                  "Pious, traditional 7-curry Dane meals prepared with supreme cleanliness for Maha Sangha.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Funeral & Memorial Catering",
                description:
                  "Dignified, punctual catering for memorial wakes, tea service with short eats, and warm buffets.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Birthday Party & Corporate Catering",
                description:
                  "Customizable multi-cuisine catering for birthdays, office seminars, and private gatherings.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Live Action Cooking Kitchens",
                description:
                  "On-site live Mongolian wok, charcoal BBQ, and hoppers/kottu cooking stations.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${cinzel.variable} ${quicksand.className}`}
    >
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

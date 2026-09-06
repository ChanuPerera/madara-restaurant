import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CateringMenuExplorer from "@/components/CateringMenuExplorer";
import Catering3DCarousel from "@/components/Catering3DCarousel";
import Footer from "@/components/Footer";
import MobileActionDock from "@/components/MobileActionDock";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  ChevronRight, 
  Home, 
  ChefHat, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Flame, 
  UtensilsCrossed, 
  CheckCircle2, 
  Phone, 
  MessageCircle,
  ArrowLeft
} from "lucide-react";

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
    "name": "Madara Restaurant & Catering Services Homagama",
    "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    "description": "Homagama's premier catering service for Weddings, Alms Giving (Dane), Funerals, Birthdays, and Corporate Events.",
    "url": "https://madararestaurant.lk/catering/",
    "telephone": RESTAURANT_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": RESTAURANT_INFO.address,
      "addressLocality": "Homagama",
      "addressRegion": "Western Province",
      "addressCountry": "LK",
    },
    "servesCuisine": ["Sri Lankan", "Chinese", "Western", "Mongolian Wok", "BBQ"],
    "hasMenu": "https://madararestaurant.lk/catering/",
    "priceRange": "LKR 2,150 - LKR 3,850",
  };

  return (
    <main className="min-h-screen bg-madara-dark text-white relative w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCatering) }}
      />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Page Header / Breadcrumb Bar */}
      <div className="bg-madara-surface/60 border-b border-white/10 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-madara-textSecondary">
            <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-madara-orange font-semibold">Catering Menus & Packages</span>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-madara-textSecondary hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Hero Overview Banner */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-madara-surface/40 to-transparent">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madara-orange/10 border border-madara-orange/30 text-madara-orange text-xs font-bold uppercase tracking-wider shadow-glow-orange-sm">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Homagama's #1 Event Catering Specialist</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white font-serif tracking-tight">
            Event Catering Menus & <span className="text-gradient-orange">Tailored Packages</span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-madara-textSecondary leading-relaxed">
            From intimate gatherings and sacred alms givings to grand wedding feasts and corporate summits. 
            Enjoy transparent per-person pricing, itemized customizable menus, on-site chafing warmers, and dedicated steward service.
          </p>

          {/* Key Metric Badges */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-madara-textSecondary">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-madara-orange" />
              <span>650+ Delivered Events</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-madara-orange" />
              <span>Free Buffet Equipment & Setup</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-madara-orange" />
              <span>Strict On-Time Arrival Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Flame className="w-3.5 h-3.5 text-madara-orange" />
              <span>Live Action Stations Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Perspective Showcase Carousel (Example 1 Style) */}
      <Catering3DCarousel />

      {/* Main Complete Interactive Catering Explorer */}
      <CateringMenuExplorer />

      {/* Why Choose Madara Catering / 4-Step Process Section */}
      <section className="py-20 bg-madara-surface/40 border-t border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-madara-orange uppercase tracking-wider">
              Seamless Event Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              How Our Catering Service Works
            </h2>
            <p className="text-sm sm:text-base text-madara-textSecondary">
              We make event catering effortless from the initial consultation to the final dessert serving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative space-y-3">
              <div className="w-12 h-12 rounded-xl bg-madara-orange/20 border border-madara-orange/30 text-madara-orange flex items-center justify-center font-serif text-lg font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-white">Select Your Occasion</h3>
              <p className="text-xs text-madara-textSecondary leading-relaxed">
                Choose your event type (Wedding, Dane, Birthday, Corporate, Memorial) and review transparent per-person packages.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative space-y-3">
              <div className="w-12 h-12 rounded-xl bg-madara-orange/20 border border-madara-orange/30 text-madara-orange flex items-center justify-center font-serif text-lg font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-white">Tailor Your Menu</h3>
              <p className="text-xs text-madara-textSecondary leading-relaxed">
                Customize mains, meats, curries, and desserts. Add live action cooking stations (Mongolian wok, BBQ, sizzling kottu).
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative space-y-3">
              <div className="w-12 h-12 rounded-xl bg-madara-orange/20 border border-madara-orange/30 text-madara-orange flex items-center justify-center font-serif text-lg font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-white">On-Site Buffet Setup</h3>
              <p className="text-xs text-madara-textSecondary leading-relaxed">
                Our team arrives early with chafing warmers, serving utensils, and tableware. Everything is kept piping hot.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative space-y-3">
              <div className="w-12 h-12 rounded-xl bg-madara-orange/20 border border-madara-orange/30 text-madara-orange flex items-center justify-center font-serif text-lg font-bold">
                04
              </div>
              <h3 className="text-base font-bold text-white">Dedicated Steward Service</h3>
              <p className="text-xs text-madara-textSecondary leading-relaxed">
                Professional stewards manage the buffet and assist guests, ensuring you can relax and enjoy your celebration.
              </p>
            </div>
          </div>

          {/* Quick Direct Inquiries Banner */}
          <div className="mt-14 glass-panel-orange p-6 sm:p-8 rounded-2xl border border-madara-orange/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-bold text-white font-serif">
                Have specific dietary needs or custom guest requirements?
              </h4>
              <p className="text-xs sm:text-sm text-madara-textSecondary">
                Our Head Chef and Catering Manager are ready to formulate a custom proposal for your budget.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Madara Restaurant! I would like to consult with your catering manager regarding a customized catering menu."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Catering Desk</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="btn-outline-dark px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-madara-orange" />
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Dock */}
      <MobileActionDock />
    </main>
  );
}

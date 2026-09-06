"use client";

import React from "react";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Truck, 
  ChefHat, 
  Flame, 
  Wine, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

export default function ServicesGrid() {
  const services = [
    {
      icon: ChefHat,
      title: "Wedding & Event Catering",
      subtitle: "From 20 to 1,000+ Guests",
      description: "Event catering with luxury chafing displays, custom menus, live action stations, and silver service stewards.",
      highlights: ["Weddings & Homecomings", "Alms Giving (Dane) & Funerals", "Customizable Event Menus"],
      actionLabel: "View Catering Packages",
      actionHref: "#catering",
      badge: "Primary Specialty",
      color: "from-emerald-500/20 to-transparent",
      accentIcon: "text-emerald-400",
    },
    {
      icon: Flame,
      title: "Live Action Kitchens",
      subtitle: "On-Site High-Flame Cooking",
      description: "Chefs fire up live Mongolian woks, sizzling charcoal BBQ grills, and cheese kottu at your event.",
      highlights: ["Mongolian Wok Stations", "Charcoal BBQ & Satay", "Live Hoppers & Kottu"],
      actionLabel: "Explore Action Stations",
      actionHref: "#action-kitchen",
      badge: "Live Action",
      color: "from-red-500/20 to-transparent",
      accentIcon: "text-red-400",
    },
    {
      icon: Wine,
      title: "BYOB (Bring Your Own Bottle)",
      subtitle: "Corkage-Friendly Hospitality",
      description: "Bring your own spirits. We provide chilled ice buckets, crystal glassware, fresh lime, and spicy bites.",
      highlights: ["Glassware & Ice Buckets", "Transparent Minimal Corkage", "Fiery Bite Pairings"],
      actionLabel: "View BYOB Details",
      actionHref: "#byob",
      badge: "Customer Favorite",
      color: "from-amber-500/20 to-transparent",
      accentIcon: "text-madara-amber",
    },
    {
      icon: UtensilsCrossed,
      title: "Dine-In Atmosphere",
      subtitle: "Indoor AC & Garden Veranda",
      description: "Enjoy fresh, hot meals in our stylish dark obsidian and warm amber dining halls in Homagama.",
      highlights: ["Air Conditioned Dining", "Outdoor Garden Patio", "Warm Attentive Hospitality"],
      actionLabel: "View Food Menu",
      actionHref: "#menu",
      badge: "Open 7AM - 10PM",
      color: "from-orange-500/20 to-transparent",
      accentIcon: "text-madara-orange",
    },
    {
      icon: ShoppingBag,
      title: "Takeaway & Express Pickup",
      subtitle: "Ready in Minutes",
      description: "Pre-order via call or WhatsApp for quick collection in leak-proof thermal food-grade packaging.",
      highlights: ["Phone/WhatsApp Pre-ordering", "Insulated Hot Packaging", "Quick Counter Handover"],
      actionLabel: "Order for Pickup",
      actionHref: "#menu",
      badge: "Fast Service",
      color: "from-blue-500/20 to-transparent",
      accentIcon: "text-blue-400",
    },
    {
      icon: Truck,
      title: "Homagama Express Delivery",
      subtitle: "Doorstep Hot Delivery",
      description: "Get piping hot Sri Lankan specialties, Biryani, and fried rice delivered straight to your door.",
      highlights: ["Homagama Suburb Delivery", "Real-Time WhatsApp Updates", "Hot & Crispy Packaging"],
      actionLabel: "Check Delivery Menu",
      actionHref: "#menu",
      badge: "Hot Delivery",
      color: "from-purple-500/20 to-transparent",
      accentIcon: "text-purple-400",
    },
  ];

  return (
    <section id="services" className="py-20 relative bg-madara-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madara-orange/10 border border-madara-orange/30 text-madara-orange text-xs font-bold uppercase tracking-wider mb-4">
            <span>Our Core Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            Catering, Dining &amp; <span className="text-gradient-orange">Live Experiences</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-madara-textSecondary">
            From 1,000-guest wedding events and religious alms giving (Dane) to dine-in feasts and BYOB evenings in Homagama.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((svc, index) => {
            const Icon = svc.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group hover:border-madara-orange/40 transition-all duration-300"
              >
                {/* Background Subtle Gradient */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${svc.color} blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
                />

                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-madara-orange group-hover:border-madara-orange transition-all duration-300 shadow-md">
                      <Icon className={`w-7 h-7 ${svc.accentIcon} group-hover:text-white transition-colors duration-300`} />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-madara-textSecondary group-hover:border-madara-orange/30 group-hover:text-madara-orange transition-colors">
                      {svc.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white font-serif group-hover:text-madara-orange transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs font-semibold text-madara-amber mt-0.5">
                    {svc.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-base text-madara-textSecondary mt-3 leading-relaxed">
                    {svc.description}
                  </p>

                  {/* Key Highlights Bullet Points */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-white/5">
                    {svc.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-madara-textSecondary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-madara-orange flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-7 pt-4 border-t border-white/10">
                  <a
                    href={svc.actionHref}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-madara-orange text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>{svc.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

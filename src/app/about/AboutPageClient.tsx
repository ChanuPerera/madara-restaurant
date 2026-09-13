"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import ModernNavbar from "@/components/modern/ModernNavbar";
import ModernFooter from "@/components/modern/ModernFooter";
import MobileActionDock from "@/components/MobileActionDock";
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  UtensilsCrossed, 
  ChefHat, 
  Users, 
  Sparkles, 
  HeartHandshake, 
  CheckCircle2,
  Flame,
  Soup,
  PartyPopper
} from "lucide-react";

export default function AboutPageClient() {
  const { language } = useLanguage();

  const services = [
    {
      title: language === "si" ? "ආපනශාලා ආහාර සේවාව" : "Fine Dining Restaurant",
      desc: language === "si" ? "ප්‍රණීත බත්, කොත්තු, මෙන්ම චීන සහ දේශීය කෑම වර්ග එකම වහලක් යටින්." : "Authentic Sri Lankan heritage curries, Mongolian wok fried rice, and fresh hot kottu.",
      icon: UtensilsCrossed,
    },
    {
      title: language === "si" ? "උත්සව කේටරින් සේවාව" : "Grand Event Catering",
      desc: language === "si" ? "මංගල උත්සව, බණ හා දානමය පිංකම්, අවමංගල්‍ය හා උපන්දින සාද සඳහා පූර්ණ කේටරින් සේවාව." : "Complete per-person catering packages for Weddings, Alms Givings, Funerals & Parties.",
      icon: Users,
    },
    {
      title: language === "si" ? "සජීවී කුටි සහ BBQ" : "Live Wok & Charcoal BBQ",
      desc: language === "si" ? "ඔබේ උත්සව භූමියේදීම සජීවීව පිළියෙළ කරන මොන්ගෝලියන් වොක්, BBQ සහ ආප්ප කුටි." : "On-site live action cooking stations featuring Mongolian wok, charcoal BBQ, and hoppers.",
      icon: Flame,
    },
    {
      title: language === "si" ? "ආයතනික කෑම පැකේජ" : "Corporate Meals & Events",
      desc: language === "si" ? "කාර්යාලීය උත්සව, සම්මන්ත්‍රණ සහ රැස්වීම් සඳහා ගුණාත්මක ආහාර පැකේජ." : "Tailor-made seminar buffets, packed lunches, and executive dinner spreads.",
      icon: PartyPopper,
    },
    {
      title: language === "si" ? "ටේක්-අවේ සහ ඩිලිවරි" : "Takeaway & Fast Delivery",
      desc: language === "si" ? "හෝමාගම සහ අවට ප්‍රදේශ සඳහා ඉක්මන් ඩිලිවරි හා ටේක්-අවේ සේවාව." : "Quick takeaway and prompt home delivery across Homagama and Athurugiriya.",
      icon: Soup,
    },
  ];

  const standards = [
    {
      title: language === "si" ? "100% සෞඛ්‍යාරක්ෂිත බව" : "100% Hygienic Food Prep",
      desc: language === "si" ? "මහජන සෞඛ්‍ය පරීක්ෂක (PHI) උපදෙස් අනුව ඉහළම පිරිසිදුකම සුරැකූ මුළුතැන්ගෙය." : "Strict kitchen hygiene protocols complying with public health safety standards.",
    },
    {
      title: language === "si" ? "පළපුරුදු ප්‍රධාන සූපවේදීන්" : "Executive Master Chefs",
      desc: language === "si" ? "වසර ගණනාවක පළපුරුද්ද සහිත සූපවේදීන්ගේ අත්ගුණයෙන් නිමවන ප්‍රණීත ආහාර." : "Decades of culinary expertise crafting authentic flavors and secret sauce reductions.",
    },
    {
      title: language === "si" ? "ස්වාභාවික දේශීය කුළුබඩු" : "100% Natural Spices",
      desc: language === "si" ? "කෘතිම රසකාරක නොමැතිව ස්වාභාවික දේශීය කුළුබඩු පමණක් භාවිතා කිරීම." : "Only natural Sri Lankan spices and fresh ingredients—zero harmful artificial additives.",
    },
    {
      title: language === "si" ? "විශ්වාසනීය කේටරින් සේවාව" : "650+ Delivered Events",
      desc: language === "si" ? "සාර්ථක උත්සව 650 කට අධික ප්‍රමාණයක් සහ 50,000 කට අධික තෘප්තිමත් පාරිභෝගිකයින්." : "Over 650 successful catering events delivered with 4.9/5 customer satisfaction.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans flex flex-col justify-between">
      {/* Navbar */}
      <ModernNavbar />

      <main className="flex-1">
        {/* Standardized Breadcrumb Bar */}
        <div className="pt-24 sm:pt-28 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-stone-500">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-medium text-stone-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "si" ? "මුල් පිටුවට" : "Home"}</span>
              <span className="text-stone-300">/</span>
              <span className="text-amber-700 font-semibold">
                {language === "si" ? "අප ගැන" : "About Us"}
              </span>
            </Link>

          </div>
        </div>

        {/* Hero Section: Story & Vision */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === "si" ? "මඩර ආයතනික තොරතුරු" : "Madara Restaurant & Catering"}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                {language === "si" ? (
                  <>හෝමාගම අග්‍රගන්‍ය <span className="text-amber-700">ආපනශාලා සහ කේටරින් සේවාව</span></>
                ) : (
                  <>Homagama's Premier <span className="text-amber-700">Dining & Catering Destination</span></>
                )}
              </h1>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {language === "si"
                  ? "හෝමාගම අතුරුගිරිය පාරේ පිහිටි මඩර ආපනශාලාව යනු ප්‍රණීත ආහාර සහ උසස්ම මට්ටමේ කේටරින් සේවාවන් සපයන ප්‍රමුඛතම ආයතනයයි. මංගල උත්සව, බණ හා දානමය පිංකම්, අවමංගල්‍ය සහ ආයතනික උත්සව සඳහා විශ්වාසනීයම සේවාව අපි ලබා දෙන්නෙමු."
                  : "Located at 191/B/1, Athurugiriya Road, Homagama, Madara Restaurant & Catering Services is synonymous with exceptional food quality, impeccable hygiene, and dedicated event catering. From intimate alms-giving (Dane) ceremonies to grand wedding buffets, we craft unforgettable culinary experiences."}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-stone-800">
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>650+ Delivered Catering Events</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>100% Hygienic PHO Standards</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Core Services */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              {language === "si" ? "අපගේ සේවාවන්" : "What We Offer"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              {language === "si" ? "අපගේ ප්‍රධාන සේවා අංශ" : "Our Core Culinary Services"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Certifications & Standards */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {language === "si" ? "ගුණාත්මක බව සහ සෞඛ්‍යය" : "Quality & Hygiene Standards"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1">
                {language === "si" ? "අපගේ උසස් ප්‍රමිතීන්" : "Our Standards & Certifications"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {standards.map((std, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-amber-400" />
                  <h4 className="text-sm font-bold text-stone-100">{std.title}</h4>
                  <p className="text-xs text-stone-300 leading-relaxed">{std.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Map Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Card Details (5 Cols) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  {language === "si" ? "සම්බන්ධ වන්න" : "Get In Touch"}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                  {language === "si" ? "සම්පූර්ණ සේවා විස්තර" : "Contact & Location Info"}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-stone-900">Address:</strong>
                    <span>{RESTAURANT_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-stone-900">Hotlines:</strong>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-amber-700 block font-semibold">
                      {RESTAURANT_INFO.phoneFormatted}
                    </a>
                    <a href={`tel:${RESTAURANT_INFO.secondaryPhone}`} className="hover:text-amber-700 block font-semibold">
                      {RESTAURANT_INFO.secondaryPhoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-stone-900">Email:</strong>
                    <span>{RESTAURANT_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-stone-900">Operating Hours:</strong>
                    <span>{RESTAURANT_INFO.openingHours.daily}</span>
                    <span className="block text-[11px] text-amber-800 font-semibold mt-0.5">{RESTAURANT_INFO.openingHours.poyaDays}</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent("Hi Madara Restaurant! I would like to contact you regarding your services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Contact via WhatsApp</span>
                </a>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="py-3 px-5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Hotline</span>
                </a>
              </div>
            </div>

            {/* Google Maps Iframe (7 Cols) */}
            <div className="lg:col-span-7 h-96 lg:h-full min-h-[380px] rounded-3xl overflow-hidden border border-stone-200 shadow-sm relative bg-stone-100">
              <iframe
                title="Madara Restaurant Homagama Location Map"
                src={RESTAURANT_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer & Mobile Dock */}
      <ModernFooter />
      <MobileActionDock />
    </div>
  );
}

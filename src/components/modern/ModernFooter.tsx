"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  MessageCircle, 
  ArrowUpRight 
} from "lucide-react";

export default function ModernFooter() {
  const { language } = useLanguage();

  return (
    <footer id="contact" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-serif font-black text-xl">
                M
              </div>
              <div>
                <span className="font-serif font-bold text-white tracking-wider text-xl leading-tight block">
                  MADARA
                </span>
                <span className="text-[10px] tracking-widest text-amber-400 uppercase font-semibold">
                  Restaurant & Catering
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {language === "si"
                ? "හෝමාගම අග්‍රගන්‍ය කේටරින් සත්කාරය, සජීවී මොන්ගෝලියන් කුටි සහ BYOB ආපනශාලාව."
                : "Homagama's premier destination for bespoke event catering, live action culinary stations & BYOB dining."}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              {language === "si" ? "ප්‍රධාන සබැඳි" : "Explore"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catering" className="hover:text-amber-400 transition-colors">
                  {language === "si" ? "කේටරින් පැකේජ" : "Catering Packages"}
                </Link>
              </li>
              <li>
                <Link href="/catering-menu" className="hover:text-amber-400 transition-colors">
                  {language === "si" ? "සම්පූර්ණ කේටරින් මෙනුව" : "Full Catering Menu"}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-amber-400 transition-colors">
                  {language === "si" ? "රැකියා අවස්ථා" : "Careers"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              {language === "si" ? "සම්බන්ධ වන්න" : "Contact & Orders"}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.phone} / {RESTAURANT_INFO.secondaryPhone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +94 70 453 5815
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>7:00 AM - 10:00 PM (Daily)</span>
              </li>
            </ul>
          </div>

          {/* Location & Map Link */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              {language === "si" ? "ලිපිනය හා ස්ථානය" : "Find Us"}
            </h4>
            <div className="flex items-start gap-2 text-xs text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.address}, Homagama, Sri Lanka</span>
            </div>

            <div className="pt-2">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold border border-stone-700 transition-colors group"
              >
                <span>Google Maps Direction</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Madara Restaurant & Catering. All rights reserved.</p>
          <p className="text-stone-600">Homagama, Western Province, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingCareersButton() {
  const { language } = useLanguage();
  const pathname = usePathname();

  // Hide the floating button when the user is already on the careers page
  if (pathname === "/careers") {
    return null;
  }

  return (
    <Link
      href="/careers"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_10px_30px_-5px_rgba(245,158,11,0.5)] border-2 border-amber-200/80 transition-all hover:scale-105 active:scale-95 group select-none cursor-pointer"
      title={
        language === "si"
          ? "රැකියා ඇබෑර්තු - අප හා එක්වන්න"
          : "Join our Team - View Careers & Vacancies"
      }
    >
      <div className="w-6 h-6 rounded-full bg-stone-950/15 flex items-center justify-center text-stone-950 flex-shrink-0 group-hover:rotate-12 transition-transform">
        <Briefcase className="w-3.5 h-3.5" />
      </div>
      <span>{language === "si" ? "අප හා එක්වන්න" : "Join our Team"}</span>
      <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

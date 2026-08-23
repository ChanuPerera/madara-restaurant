"use client";

import React from "react";
import { PARTNERS_LIST } from "@/data/restaurantData";
import { Handshake, Award, ShieldCheck, Building2 } from "lucide-react";

export default function PartnersSection() {
  return (
    <section id="partners" className="py-20 relative bg-madara-surface/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-madara-textMuted text-xs font-semibold uppercase tracking-wider mb-3">
            <Handshake className="w-3.5 h-3.5 text-madara-orange" />
            <span>Trusted Collaborators &amp; Clients</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif">
            Our Valued <span className="text-gradient-orange">Partners &amp; Venues</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-madara-textSecondary">
            Proudly partnering with event planners, wedding venues, and corporate accounts across Homagama and the Western Province.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNERS_LIST.map((partner, idx) => (
            <div
              key={idx}
              className="glass-card p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center group hover:border-madara-orange/40 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-madara-orange group-hover:scale-110 transition-transform mb-2">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-madara-orange transition-colors">
                {partner.name}
              </span>
              <span className="text-[10px] text-madara-textMuted mt-0.5">
                {partner.category}
              </span>
              <span className="mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-madara-amber border border-white/5">
                {partner.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Corporate Trust Ribbon */}
        <div className="mt-12 p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">ISO &amp; Food Hygiene Certified</p>
              <p className="text-[11px] text-madara-textMuted">Highest standards of freshness &amp; safety</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-madara-orange flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">500+ Catered Events Delivered</p>
              <p className="text-[11px] text-madara-textMuted">100% on-time setup guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-madara-amber flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Corporate Invoice &amp; Tax Billing</p>
              <p className="text-[11px] text-madara-textMuted">Streamlined company accounts</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

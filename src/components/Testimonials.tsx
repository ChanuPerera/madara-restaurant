"use client";

import React from "react";
import { TESTIMONIALS } from "@/data/restaurantData";
import { Star, Quote, CheckCircle2, HeartHandshake } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative bg-madara-dark overflow-hidden">
      {/* Ambient background glow */}
      <div className="ambient-glow w-[400px] h-[400px] bg-amber-500/10 top-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-madara-amber text-xs font-bold uppercase tracking-wider mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Verified Diner &amp; Event Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            Loved By Our <span className="text-gradient-orange">Guests &amp; Hosts</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-madara-textSecondary">
            Read real feedback from wedding couples, corporate organizers, and weekend diners who made Madara their favorite culinary destination.
          </p>

          {/* Aggregate Rating Pill */}
          <div className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-2xl glass-panel border border-white/10">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-bold text-white">4.9 out of 5.0</span>
            <span className="text-xs text-madara-textMuted">• Over 520+ Google Reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card rounded-3xl p-7 flex flex-col justify-between border border-white/10 relative group hover:border-madara-orange/40 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-madara-orange/20 absolute top-6 right-6" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex text-amber-400 gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-madara-textSecondary leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-madara-orange/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-madara-orange transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-madara-amber font-medium">
                    {t.roleOrEvent}
                  </p>
                  <p className="text-[10px] text-madara-textMuted flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{t.location} • {t.date}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

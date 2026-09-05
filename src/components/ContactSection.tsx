"use client";

import React, { useState } from "react";
import { RESTAURANT_INFO, FAQS } from "@/data/restaurantData";
import { useLanguage } from "@/context/LanguageContext";
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  ChevronDown, 
  HelpCircle, 
  ExternalLink,
  Navigation
} from "lucide-react";

export default function ContactSection() {
  const { language, t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="contact" className="py-24 relative bg-madara-dark overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow w-[500px] h-[500px] bg-madara-orange/5 top-1/3 left-10" />
      <div className="ambient-glow w-[400px] h-[400px] bg-amber-500/5 bottom-1/4 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madara-orange/10 border border-madara-orange/30 text-madara-orange text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            Contact Our <span className="text-gradient-orange">Catering &amp; Dining Desk</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-madara-textSecondary">
            Located conveniently along Athurugiriya Road in Homagama. Reach out for wedding events, alms givings, birthday packages, or takeaway orders.
          </p>
        </div>

        {/* Contact Info Grid + Map (Balanced 2-Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Left Column: Direct Contacts & Operating Hours */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Action Contact Hub */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-white font-serif mb-6">
                Direct Inquiries &amp; Hotlines
              </h3>

              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-madara-orange/10 border border-madara-orange/20 flex items-center justify-center text-madara-orange flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-madara-textMuted uppercase">Call Us Directly</span>
                    <div className="flex flex-col mt-0.5 space-y-0.5">
                      <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-base font-bold text-white hover:text-madara-orange transition-colors">
                        {RESTAURANT_INFO.phoneFormatted} (Primary Desk)
                      </a>
                      <a href={`tel:${RESTAURANT_INFO.secondaryPhone}`} className="text-sm font-semibold text-madara-textSecondary hover:text-white transition-colors">
                        {RESTAURANT_INFO.secondaryPhoneFormatted} (Secondary Line)
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-madara-textMuted uppercase">WhatsApp Catering Desk</span>
                    <a
                      href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20catering%20and%20dining.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-emerald-400 hover:underline block mt-0.5"
                    >
                      {RESTAURANT_INFO.whatsappFormatted} (Instant Chat)
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-madara-amber flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-madara-textMuted uppercase">Restaurant &amp; Kitchen Address</span>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {RESTAURANT_INFO.address}
                    </p>
                    <p className="text-xs text-madara-textMuted mt-0.5">
                      {RESTAURANT_INFO.landmark}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-madara-textMuted uppercase">Official Email</span>
                    <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-sm text-white hover:text-madara-orange transition-colors block mt-0.5">
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20your%20catering%20packages.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiries</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="btn-outline-dark py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-madara-orange" />
                  <span>Call Us Now</span>
                </a>
              </div>

            </div>

            {/* Operating Hours Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
              <div className="flex items-center gap-3 mb-5">
                <Clock className="w-5 h-5 text-madara-orange" />
                <h3 className="text-lg font-bold text-white font-serif">
                  Operating Hours &amp; Schedule
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-madara-textSecondary">Monday – Sunday</span>
                  <span className="font-bold text-white">7:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5 bg-red-900/20 px-2 rounded-lg text-red-300">
                  <span className="font-semibold">Full Moon Poya Days</span>
                  <span className="font-bold uppercase text-[11px] text-amber-300">Closed (Religious Observance)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-madara-textSecondary">Breakfast Service</span>
                  <span className="font-bold text-white">7:00 AM – 11:00 AM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-madara-textSecondary">Lunch Service</span>
                  <span className="font-bold text-madara-amber">11:30 AM – 3:30 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-madara-textSecondary">Dinner &amp; Evening Dining</span>
                  <span className="font-bold text-madara-orange">6:30 PM – 10:00 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Location Map & Catering Consultation Desk */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Google Map Box */}
            <div className="glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl flex-grow">
              <div className="p-4 sm:p-5 bg-madara-surfaceElevated border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-madara-orange/20 border border-madara-orange/30 flex items-center justify-center text-madara-orange flex-shrink-0">
                    <Navigation className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Madara Restaurant &amp; Catering Homagama
                    </h4>
                    <span className="text-xs text-madara-textSecondary block">
                      191/B/1, Athurugiriya Rd, Homagama
                    </span>
                  </div>
                </div>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-madara-orange hover:underline flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Interactive Iframe */}
              <div className="relative flex-grow w-full min-h-[320px] sm:min-h-[380px] bg-black/50">
                <iframe
                  src={RESTAURANT_INFO.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "320px" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Madara Restaurant 191/B/1 Athurugiriya Road Homagama Location"
                  className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Directions & Parking Footer */}
              <div className="p-4 sm:p-5 bg-madara-surfaceElevated border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-madara-textSecondary">
                <span className="flex items-center gap-1.5">
                  🚗 <strong>On-site customer parking</strong> available for pickups and consultations.
                </span>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-madara-orange hover:bg-madara-orange/90 text-white font-bold transition-colors flex items-center gap-1.5 shadow-glow-orange-sm"
                >
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick In-Person Consultation Notice */}
            <div className="glass-panel-orange rounded-2xl p-5 border border-madara-orange/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Planning a Grand Event or Wedding?
                </h4>
                <p className="text-xs text-madara-textSecondary mt-1">
                  Visit our Homagama desk in person or message us directly on WhatsApp for customized catering menus and live cooking station bookings.
                </p>
              </div>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20would%20like%20to%20schedule%20a%20catering%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shadow-md flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-madara-textMuted text-xs font-semibold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-madara-orange" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Got Questions? We&apos;ve Got Answers
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.slice(0, 3).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-madara-orange flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-madara-textSecondary leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

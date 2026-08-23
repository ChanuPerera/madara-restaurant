"use client";

import React, { useState } from "react";
import { RESTAURANT_INFO, FAQS } from "@/data/restaurantData";
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  Calendar, 
  ChevronDown, 
  HelpCircle, 
  Send, 
  ExternalLink,
  Navigation,
  ChefHat,
  Users,
  CheckCircle2
} from "lucide-react";

export default function ContactSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick Catering / General Inquiry Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("Wedding / Homecoming Reception");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("50");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Hi Madara Restaurant & Catering! 🎉\n\nI would like to submit an Event / Catering Inquiry:\n- *Name:* ${name}\n- *Phone Number:* ${phone}\n- *Occasion / Event:* ${eventType}\n- *Tentative Date:* ${eventDate || "To be decided"}\n- *Estimated Guests:* ${guestCount} Pax\n- *Requirements / Notes:* ${message || "Please share available menus"}\n\nPlease get in touch with available packages. Thank you!`;

    const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative bg-madara-dark overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow w-[500px] h-[500px] bg-madara-orange/5 top-1/3 left-10" />

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

        {/* Contact Info Grid + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Left Column: Direct Contacts & Operating Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Action Contact Hub */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
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
                    <span className="text-xs font-bold text-madara-textMuted uppercase">WhatsApp Catering Packages</span>
                    <a
                      href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
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
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
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
                  <span className="text-madara-textSecondary">Dinner &amp; BYOB</span>
                  <span className="font-bold text-madara-orange">6:30 PM – 10:00 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Catering Inquiry Form & Map */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Catering Inquiry Form */}
            <div className="glass-panel-orange rounded-3xl p-6 sm:p-8 border border-madara-orange/30 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <ChefHat className="w-6 h-6 text-madara-orange" />
                <div>
                  <h3 className="text-xl font-bold text-white font-serif">
                    Request a Quick Catering Consultation
                  </h3>
                  <p className="text-xs text-madara-textSecondary">
                    Fill in your event details and send directly to our WhatsApp catering desk for an instant response.
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-serif">
                    Inquiry Sent Successfully!
                  </h4>
                  <p className="text-xs text-madara-textSecondary mt-1">
                    Your details have been dispatched to our catering team via WhatsApp. We will reply shortly with package options.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 btn-primary-orange px-5 py-2 rounded-xl text-xs font-bold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-madara-textSecondary uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Kasun Silva"
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-madara-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-madara-textSecondary uppercase tracking-wider mb-1">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="077 123 4567"
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-madara-orange"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-madara-textSecondary uppercase tracking-wider mb-1">
                        Event Type
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-madara-orange"
                      >
                        <option value="Wedding / Homecoming Reception" className="bg-madara-surface">Wedding / Homecoming</option>
                        <option value="Alms Giving Ceremony (දානමය පිංකම)" className="bg-madara-surface">Alms Giving (දානමය පිංකම)</option>
                        <option value="Bana & Dane Service (බණ සහ දාන)" className="bg-madara-surface">Bana &amp; Dane (බණ සහ දාන)</option>
                        <option value="Funeral & Memorial Service" className="bg-madara-surface">Funeral &amp; Memorial</option>
                        <option value="Birthday Party Celebration" className="bg-madara-surface">Birthday Party</option>
                        <option value="Corporate Seminar & Meeting" className="bg-madara-surface">Corporate Seminar</option>
                        <option value="Casual Gathering / BBQ Night" className="bg-madara-surface">Casual Gathering / BBQ</option>
                        <option value="Customizable Menu Order" className="bg-madara-surface">Customizable Menu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-madara-textSecondary uppercase tracking-wider mb-1">
                        Tentative Date
                      </label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-madara-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-madara-textSecondary uppercase tracking-wider mb-1">
                        Est. Guests (Pax)
                      </label>
                      <input
                        type="number"
                        min="15"
                        max="1500"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        placeholder="50"
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-madara-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-madara-textSecondary uppercase tracking-wider mb-1">
                      Special Requirements / Dietary / Action Station Requests
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Vegetarian curries needed, live Mongolian wok station, buffet equipment setup in Homagama..."
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-madara-orange"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-whatsapp py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Catering Inquiry via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

            {/* Google Map Box */}
            <div className="glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col min-h-[300px]">
              <div className="p-4 bg-madara-surfaceElevated border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-madara-orange animate-pulse" />
                  <span className="text-xs font-bold text-white">
                    Madara Restaurant • 191/B/1, Athurugiriya Rd, Homagama
                  </span>
                </div>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-madara-orange hover:underline flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="relative flex-grow w-full min-h-[260px] bg-black/50">
                <iframe
                  src={RESTAURANT_INFO.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "260px" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Madara Restaurant 191/B/1 Athurugiriya Road Homagama Location"
                  className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="p-4 bg-madara-surfaceElevated border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-madara-textSecondary">
                <span>🚗 On-site parking available for customer pickups and consultations.</span>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-madara-orange text-white font-bold transition-colors"
                >
                  Get Directions →
                </a>
              </div>
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

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
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

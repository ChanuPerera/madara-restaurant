import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { JOB_VACANCIES, RESTAURANT_INFO } from "@/data/restaurantData";
import { 
  Briefcase, 
  ChefHat, 
  Users, 
  Sparkles, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ArrowLeft, 
  Flame, 
  Building2, 
  HeartHandshake, 
  UtensilsCrossed 
} from "lucide-react";
import Footer from "@/components/Footer";
import LogoWhite from "@/assets/logo_white.png";

export const metadata: Metadata = {
  title: "Careers & Job Vacancies | Madara Restaurant & Catering Homagama",
  description:
    "We are hiring! Join Madara Restaurant in Homagama. Immediate job vacancies for Chinese Chef, Rice & Curry Chef, Kitchen Helper, Waiter / Steward, and Cleaning Staff. Attractive salary & meals provided. Apply today via WhatsApp or Call 0704535815.",
  keywords: [
    "Restaurant Jobs Homagama",
    "Chinese Chef Vacancy Homagama",
    "Rice and Curry Cook Jobs Sri Lanka",
    "Kitchen Helper Jobs Homagama",
    "Waiter Jobs Homagama",
    "Cleaning Staff Vacancies Colombo",
    "Madara Restaurant Careers",
    "Hotel and Catering Jobs Sri Lanka",
  ],
  alternates: {
    canonical: "https://madararestaurant.lk/careers/",
  },
  openGraph: {
    title: "Careers & Job Vacancies | Madara Restaurant Homagama",
    description:
      "Join our passionate culinary and catering team in Homagama. Vacancies for Chinese Chef, Rice & Curry Chef, Kitchen Helper, Waiter, and Cleaning Staff. Apply now!",
    url: "https://madararestaurant.lk/careers/",
    siteName: "Madara Restaurant",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Madara Restaurant Careers & Vacancies",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
};

export default function CareersPage() {
  const jsonLdJobPostings = {
    "@context": "https://schema.org",
    "@graph": JOB_VACANCIES.map((job) => ({
      "@type": "JobPosting",
      "title": job.title,
      "description": `${job.overview} Responsibilities: ${job.responsibilities.join(", ")}. Requirements: ${job.requirements.join(", ")}.`,
      "datePosted": "2026-01-15",
      "validThrough": "2026-12-31",
      "employmentType": job.type === "Full-Time" ? "FULL_TIME" : "PART_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": RESTAURANT_INFO.name,
        "sameAs": "https://madararestaurant.lk",
        "logo": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80",
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": RESTAURANT_INFO.address,
          "addressLocality": "Homagama",
          "addressRegion": "Western Province",
          "addressCountry": "LK",
        },
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "LKR",
        "value": {
          "@type": "QuantitativeValue",
          "unitText": "MONTH",
        },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-madara-dark text-white relative w-full max-w-full overflow-x-hidden">
      {/* Inject JobPosting JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdJobPostings) }}
      />

      {/* Top Navbar Header */}
      <header className="sticky top-0 z-40 bg-madara-dark/95 backdrop-blur-md border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <img
              src={LogoWhite.src}
              alt="MADARA Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-semibold text-white border border-white/10 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="btn-primary-orange px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call Hotline:</span>
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#15161c] to-madara-dark border-b border-white/10">
        <div className="ambient-glow w-[500px] h-[500px] bg-madara-orange/8 top-[-100px] left-1/2 -translate-x-1/2" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-madara-orange/10 border border-madara-orange/30 text-madara-orange text-xs font-bold uppercase tracking-wider mb-6 shadow-glow-orange-sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>We Are Actively Hiring • Homagama</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-tight">
            Build Your Career with <span className="text-gradient-orange">Madara Restaurant</span>
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-madara-textSecondary max-w-3xl mx-auto leading-relaxed">
            Join one of Homagama&apos;s fastest-growing restaurant and catering brands. We offer attractive compensation, daily meals, respectful management, and long-term career growth.
          </p>

          {/* Quick Stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="glass-card p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-2xl font-extrabold text-madara-orange">5</span>
              <span className="text-xs text-madara-textMuted block mt-0.5">Open Roles</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-2xl font-extrabold text-emerald-400">100%</span>
              <span className="text-xs text-madara-textMuted block mt-0.5">Duty Meals Provided</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-2xl font-extrabold text-amber-400">On-Time</span>
              <span className="text-xs text-madara-textMuted block mt-0.5">Salary &amp; Service Charge</span>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-2xl font-extrabold text-white">Homagama</span>
              <span className="text-xs text-madara-textMuted block mt-0.5">Athurugiriya Rd</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vacancies List Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif">
              Current Open <span className="text-gradient-orange">Positions</span>
            </h2>
            <p className="text-xs sm:text-sm text-madara-textSecondary mt-2">
              Review the roles below and apply instantly by contacting our recruitment team on WhatsApp or phone.
            </p>
          </div>

          <div className="space-y-8">
            {JOB_VACANCIES.map((job) => {
              const waText = `Hi Madara Restaurant! 👋\n\nI am interested in applying for the *${job.title} (${job.sinhalaTitle})* position.\n\nHere are my details:\n- *Name:*\n- *Contact Number:*\n- *Location:*\n- *Years of Experience:*\n\nPlease let me know when I can attend an interview. Thank you!`;
              const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(waText)}`;

              return (
                <div
                  key={job.id}
                  id={job.id}
                  className="glass-panel-orange rounded-3xl p-6 sm:p-10 border border-madara-orange/30 shadow-2xl relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-madara-orange text-white text-xs font-bold uppercase tracking-wider">
                          {job.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                          {job.type}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                          Immediate Vacancy
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                        {job.title}
                      </h3>
                      <span className="text-sm font-semibold text-madara-amber block mt-0.5">
                        {job.sinhalaTitle}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Apply via WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${RESTAURANT_INFO.phone}`}
                        className="btn-outline-dark px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-4 h-4 text-madara-orange" />
                        <span>Call: {RESTAURANT_INFO.phone}</span>
                      </a>
                    </div>
                  </div>

                  {/* Location & Experience tags */}
                  <div className="flex flex-wrap items-center gap-4 my-4 text-xs text-madara-textSecondary">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-madara-orange" />
                      <span>{job.location}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-madara-amber" />
                      <span>{job.experience}</span>
                    </span>
                  </div>

                  {/* Overview */}
                  <p className="text-sm text-madara-textSecondary leading-relaxed my-4">
                    {job.overview}
                  </p>

                  {/* Responsibilities & Requirements Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-madara-orange" />
                        <span>Key Responsibilities:</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-madara-textSecondary">
                        {job.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-madara-orange flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
                      <h4 className="text-xs font-bold text-madara-amber uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-madara-amber" />
                        <span>Requirements &amp; Qualifications:</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-madara-textSecondary">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-madara-amber flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-white">Benefits:</span>
                      {job.benefits.map((b, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-emerald-400"
                        >
                          ✓ {b}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-madara-textMuted">
                      <span>Ready to apply? Contact <strong>070 453 5815</strong> today!</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 bg-madara-surface/40 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Why Work at <span className="text-gradient-orange">Madara Restaurant?</span>
            </h3>
            <p className="text-xs sm:text-sm text-madara-textSecondary mt-2">
              We treat our staff like family with dignity, fairness, and continuous professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5 text-center">
              <div className="w-12 h-12 rounded-xl bg-madara-orange/20 text-madara-orange flex items-center justify-center mx-auto mb-3">
                <ChefHat className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Top Commercial Kitchen</h4>
              <p className="text-xs text-madara-textMuted mt-1">High-spec wok burners, combi equipment, and clean hygienic stations.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Prompt &amp; Fair Pay</h4>
              <p className="text-xs text-madara-textMuted mt-1">Guaranteed on-time monthly salary, service charge, and event tips.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Free Meals &amp; Tea</h4>
              <p className="text-xs text-madara-textMuted mt-1">Nutritious, delicious staff meals provided on every working shift.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Skill Advancement</h4>
              <p className="text-xs text-madara-textMuted mt-1">Learn live wok action, event catering, and Sri Lankan culinary masteries.</p>
            </div>
          </div>

          {/* Quick Apply Banner */}
          <div className="mt-12 glass-panel-orange rounded-3xl p-6 sm:p-8 text-center max-w-3xl mx-auto border border-madara-orange/30">
            <h4 className="text-xl font-bold text-white font-serif">
              Interested in Applying Today?
            </h4>
            <p className="text-xs sm:text-sm text-madara-textSecondary mt-2">
              Send your details via WhatsApp to <strong>070 453 5815</strong> or call our manager directly on <strong>0704535815 / 0736535815</strong>.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Madara%20Restaurant,%20I%20am%20interested%20in%20applying%20for%20a%20job%20vacancy.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {RESTAURANT_INFO.whatsappFormatted}</span>
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="btn-outline-dark px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-madara-orange" />
                <span>Call: {RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}

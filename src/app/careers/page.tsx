import React from "react";
import type { Metadata } from "next";
import { JOB_VACANCIES, RESTAURANT_INFO } from "@/data/restaurantData";
import ModernCareersView from "@/components/modern/ModernCareersView";

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
    <>
      {/* Inject JobPosting JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdJobPostings) }}
      />
      <ModernCareersView />
    </>
  );
}

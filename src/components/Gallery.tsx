"use client";

import React, { useState } from "react";
import { GALLERY_ITEMS } from "@/data/restaurantData";
import { Image as ImageIcon, X, Sparkles, Eye } from "lucide-react";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeImage, setActiveImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const categories = ["All", "Action Cooking", "Catering", "Plated Dishes", "Ambience"];

  const filteredGallery =
    selectedCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 relative bg-madara-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madara-orange/10 border border-madara-orange/30 text-madara-orange text-xs font-bold uppercase tracking-wider mb-4">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            Moments From <span className="text-gradient-orange">Our Kitchen &amp; Events</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-madara-textSecondary">
            Take a visual tour through our ambient dining spaces, high-flame action cooking stations, and event setups.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-madara-orange text-white shadow-glow-orange-sm scale-105"
                  : "bg-white/5 text-madara-textSecondary border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Masonry Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="glass-card rounded-2xl overflow-hidden aspect-[4/3] relative group cursor-pointer border border-white/10 hover:border-madara-orange/50 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4" />

              {/* Hover Overlay Info */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="self-start text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-madara-orange text-white">
                  {item.category}
                </span>

                <div>
                  <h4 className="text-sm font-bold text-white font-serif">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-madara-textSecondary mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-madara-surfaceElevated rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-madara-orange flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] relative bg-black">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <span className="text-xs font-bold text-madara-orange uppercase tracking-wider block mb-1">
                {activeImage.category}
              </span>
              <h3 className="text-xl font-bold text-white font-serif">
                {activeImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-madara-textSecondary mt-2">
                {activeImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { Flame, MessageCircle, Sparkles } from "lucide-react";
import {
  useCulinarySignatures,
  ShowcaseDish,
} from "@/services/signatureService";

export type { ShowcaseDish };

interface Catering3DCarouselProps {
  forceTheme?: "light" | "dark";
}

export default function Catering3DCarousel({
  forceTheme,
}: Catering3DCarouselProps = {}) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = forceTheme
    ? forceTheme === "light"
    : theme === "modern-light";
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1000);
  const [activeIndex, setActiveIndex] = useState(0);

  // Dynamic dishes loaded from Firebase 'culinary_signatures' collection
  const { signatures: dishes } = useCulinarySignatures();

  const startXRef = useRef<number>(0);
  const startAngleRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);

  const totalItems = Math.max(dishes.length, 1);
  const stepAngle = (2 * Math.PI) / totalItems;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute active item index based on current rotation angle
  useEffect(() => {
    if (totalItems === 0) return;
    let normalized =
      ((-rotationAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    let index = Math.round(normalized / stepAngle) % totalItems;
    setActiveIndex((index + totalItems) % totalItems);
  }, [rotationAngle, stepAngle, totalItems]);

  // Snap to nearest item angle smoothly when drag finishes
  const snapToNearest = useCallback(
    (currentAngle: number) => {
      let nearestIndex = Math.round(-currentAngle / stepAngle);
      let targetAngle = -nearestIndex * stepAngle;

      let start = currentAngle;
      let change = targetAngle - start;
      let startTime: number | null = null;
      const duration = 400; // ms

      const animateSnap = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        let ease = 1 - Math.pow(1 - progress, 3);
        setRotationAngle(start + change * ease);

        if (progress < 1) {
          requestAnimationFrame(animateSnap);
        }
      };
      requestAnimationFrame(animateSnap);
    },
    [stepAngle],
  );

  // Mouse & Touch Drag Handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    startAngleRef.current = rotationAngle;
    dragDistanceRef.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startXRef.current;
    dragDistanceRef.current = Math.abs(deltaX);
    // Sensitivity: 600px radius scaling
    const sensitivity = windowWidth < 640 ? 0.006 : 0.0035;
    setRotationAngle(startAngleRef.current + deltaX * sensitivity);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToNearest(rotationAngle);
  };

  // Direct Click on card to rotate it to front
  const handleCardClick = (index: number) => {
    if (dragDistanceRef.current > 5) return; // Prevent click trigger if user was dragging
    let targetAngle = -index * stepAngle;
    snapToNearest(targetAngle);
  };

  const activeDish = dishes[activeIndex] || dishes[0];

  const getWhatsAppLink = (dish: ShowcaseDish) => {
    const text =
      language === "si"
        ? `ආයුබෝවන් Madara Restaurant! 🍽️ මම මෙම විශේෂ කෑම පිළිබඳව සම්බන්ධ වීමට කැමැත්තෙමි: "${dish.nameSi}" (${dish.priceDisplay}). කරුණාකර ලබාගත හැකි වේලාවන් දන්වන්න.`
        : `Hi Madara Restaurant! 🍽️ I would like to contact you regarding: "${dish.nameEn}" (${dish.priceDisplay}). Please confirm availability.`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  // Config parameters derived from user's settings screenshot:
  // Carousel X radius = 600, Carousel Y radius = 0, Carousel X rotation = 14deg tilt, Thumbs min alpha = 0.3
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const radiusX = isMobile ? 220 : isTablet ? 420 : 600; // Carousel X radius: 600
  const radiusY = isMobile ? 56 : isTablet ? 80 : 120; // Increased Y-axis gap for inactive items
  const itemWidth = isMobile ? 150 : isTablet ? 220 : 290;
  const itemHeight = isMobile ? 150 : isTablet ? 270 : 270;
  const minAlpha = 0.3; // Thumbs minimum alpha: 0.3 from settings screenshot

  return (
    <section
      className={`py-16 md:py-24 relative overflow-hidden select-none border-b transition-colors duration-500 ${
        isLight
          ? "bg-[#FAF8F5] border-stone-200/70"
          : "bg-[#090a0f] border-white/10"
      }`}
    >
      {/* Ambient Radial Background */}
      {isLight ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f37b20]/10 via-transparent to-stone-50/50 pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f37b20]/15 via-[#090a0f] to-[#090a0f] pointer-events-none" />
      )}
      <div
        className={`ambient-glow w-[750px] h-[750px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] ${
          isLight ? "bg-[#f37b20]/10" : "bg-[#f37b20]/15"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-36">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              isLight
                ? "bg-[#f37b20]/10 border border-[#f37b20]/30 text-[#f37b20]"
                : "bg-[#f37b20]/20 border border-[#f37b20]/40 text-[#f37b20]"
            }`}
          >
            <Flame className="w-4 h-4 text-[#f37b20]" />
            <span>
              {language === "si"
                ? "3D ආහාර ප්‍රදර්ශනය"
                : "Interactive 3D Carousel"}
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-bold font-serif tracking-tight ${isLight ? "text-stone-900" : "text-white"}`}
          >
            {language === "si" ? "විශේෂිත " : "Masterpiece "}
            <span
              className={
                isLight ? "text-gradient-gold" : "text-gradient-orange"
              }
            >
              {language === "si" ? "ආහාර වට්ටෝරු" : "Culinary Signatures"}
            </span>
          </h2>

          <p
            className={`mt-3 text-xs sm:text-sm ${isLight ? "text-stone-500" : "text-madara-textMuted"}`}
          >
            {language === "si"
              ? "මවුස් එකෙන් ඇදීමෙන් (Mouse Drag) හෝ කාඩ්පත ක්ලික් කිරීමෙන් 3D කැරුසලය කරකවන්න"
              : "Drag left/right with your mouse or swipe to smoothly rotate the 3D ring."}
          </p>
        </div>

        {/* 3D Ring Carousel Stage (Mouse Drag & Touch Swipe Controls) */}
        <div
          className={`relative w-full h-[320px] sm:h-[440px] md:h-[520px] flex items-center justify-center overflow-visible select-none  ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {dishes.map((dish, index) => {
            // Orbital angle theta around 3D ring with continuous rotationAngle offset
            const baseAngle = index * stepAngle;
            const theta = baseAngle + rotationAngle;

            // X and Y offset based on Carousel X radius = 600
            const posX = Math.sin(theta) * radiusX;
            const posY = -(1 - Math.cos(theta)) * radiusY;

            // Normalized depth factor (1 = front center, 0 = back center)
            const depthFactor = (Math.cos(theta) + 1) / 2;

            // Apply 3D perspective parameters from screenshot settings (alpha 0.3, rotation 14deg)
            const scale = 0.55 + 0.55 * depthFactor;
            const opacity =
              minAlpha + (1 - minAlpha) * Math.pow(depthFactor, 1.3);
            const zIndex = Math.round(100 * depthFactor);
            const rotateYAngle = Math.sin(theta) * -18; // 3D Y rotation
            const rotateXAngle = 14; // Carousel X rotation = 14deg tilt from screenshot

            const isActive = index === activeIndex;

            return (
              <div
                key={dish.id}
                onClick={() => handleCardClick(index)}
                style={{
                  transform: `translate3d(${posX}px, ${posY}px, 0) rotateX(${rotateXAngle}deg) rotateY(${rotateYAngle}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  width: `${itemWidth}px`,
                  height: `${itemHeight}px`,
                }}
                className="absolute transition-transform duration-75 ease-out flex flex-col items-center justify-center pointer-events-auto"
              >
                {/* Floating Food Cutout Image (No Box / No Border) */}
                <div className="relative w-full h-full flex items-center justify-center z-10">
                  {/* Clean Dish Image */}
                  <img
                    src={dish.image}
                    alt={language === "si" ? dish.nameSi : dish.nameEn}
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      isActive
                        ? ""
                        : "filter brightness-85 hover:brightness-105"
                    }`}
                    draggable={false}
                  />

                  {/* Top Badge for Active Dish */}
                  {isActive && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500 text-black px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-extrabold shadow-lg flex items-center gap-1 z-20">
                      <Sparkles className="w-3 h-3" />
                      <span>
                        {language === "si" ? dish.badgeSi : dish.badgeEn}
                      </span>
                    </div>
                  )}

                  {/* Price Tag for Active Dish */}
                  {isActive && (
                    <div
                      className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-extrabold shadow-lg z-20 ${
                        isLight
                          ? "bg-white/95 backdrop-blur-md border border-stone-200 text-stone-900 shadow-stone-300/40"
                          : "bg-black/85 backdrop-blur-md border border-white/20 text-white"
                      }`}
                    >
                      {dish.priceDisplay}
                    </div>
                  )}
                </div>

                {/* Floor Mirror Reflection (Tightly Aligned Underneath Plate) */}
                <div
                  className="w-full h-[45%] overflow-hidden pointer-events-none opacity-35 -mt-12 sm:-mt-16 md:-mt-20 z-0"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 85%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 85%)",
                  }}
                >
                  <img
                    src={dish.image}
                    alt="reflection"
                    className="w-full h-[250%] object-contain transform scale-y-[-1] -translate-y-8 sm:-translate-y-12 md:-translate-y-16"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

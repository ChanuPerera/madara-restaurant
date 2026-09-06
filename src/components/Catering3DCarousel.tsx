"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { Flame, MessageCircle, Sparkles } from "lucide-react";
import menuImg1 from "@/assets/3dmenu/1.png";
import menuImg2 from "@/assets/3dmenu/2.png";
import menuImg3 from "@/assets/3dmenu/3.png";
import menuImg4 from "@/assets/3dmenu/4.png";
import menuImg5 from "@/assets/3dmenu/5.png";
import menuImg6 from "@/assets/3dmenu/6.png";
import menuImg7 from "@/assets/3dmenu/7.png";

interface ShowcaseDish {
  id: string;
  nameEn: string;
  nameSi: string;
  categoryEn: string;
  categorySi: string;
  priceDisplay: string;
  descriptionEn: string;
  descriptionSi: string;
  image: string;
  badgeEn: string;
  badgeSi: string;
}

const DISHES: ShowcaseDish[] = [
  {
    id: "mongolian-wok",
    nameEn: "Madara Grand Mongolian Wok Bowl",
    nameSi: "මදාරා මොන්ගෝලියන් වොක්",
    categoryEn: "Live Action Wok",
    categorySi: "සජීවී වොක් කුටිය",
    priceDisplay: "LKR 1,850",
    descriptionEn:
      "Sizzling high-flame wok bowls tossed with tender cutlets, fresh vegetables, prawns & signature wok sauce.",
    descriptionSi:
      "සජීවී ගිනි දැල් මැද පිසෙන නැවුම් එළවළු, මාළු සහ මස් ඇතුළත් සුවඳැති මොන්ගෝලියන් වොක්.",
    image: menuImg1.src,
    badgeEn: "Live Action Favorite",
    badgeSi: "ජනප්‍රියම සජීවී කෑම",
  },
  {
    id: "dum-biryani",
    nameEn: "Royal Claypot Dum Biryani",
    nameSi: "රාජකීය දම් බිරියානි",
    categoryEn: "Rice & Biryani",
    categorySi: "බත් සහ බිරියානි",
    priceDisplay: "LKR 2,450",
    descriptionEn:
      "Aromatic basmati rice sealed in authentic claypots with tender marinated chicken, boiled eggs & mint raita.",
    descriptionSi:
      "මැටි ඇතිලියේ තම්බා සැකසූ සුවඳැති බාස්මතී බිරියානි, චිකන් සහ මින්ට් චට්නි සමඟ.",
    image: menuImg2.src,
    badgeEn: "Chef's Signature",
    badgeSi: "සූපවේදී විශේෂ තේරීම",
  },
  {
    id: "hbc-sizzler",
    nameEn: "Fiery Hot Butter Cuttlefish",
    nameSi: "හොට් බටර් දැල්ලෝ",
    categoryEn: "BYOB Special Bites",
    categorySi: "BYOB ප්‍රියතම බයිට්ස්",
    priceDisplay: "LKR 1,950",
    descriptionEn:
      "Crispy fried cuttlefish tossed in aromatic garlic butter, scallions, and roasted chilli flakes.",
    descriptionSi:
      "කරස් ගා බැදගත් දැල්ලෝ, ගාලික් බටර් සහ ලූණු කොළ සමඟ තෙම්පරාදු කළ බයිට් එක.",
    image: menuImg3.src,
    badgeEn: "#1 BYOB Pairing",
    badgeSi: "අංක 1 BYOB තේරීම",
  },
  {
    id: "cheese-kottu",
    nameEn: "Molten Cheese Mixed Kottu",
    nameSi: "චීස් කොත්තු - මීට් මික්ස්",
    categoryEn: "Sizzling Kottu",
    categorySi: "කොත්තු සත්කාරය",
    priceDisplay: "LKR 1,650",
    descriptionEn:
      "Hand-clattered roti on hot iron griddles with roast chicken, beef, fresh veggies & melted rich cheddar cheese.",
    descriptionSi:
      "උණු උණු යකඩ තැටියේ කොත්තු කර උඩින් උණු කළ චීස් හෙලූ රසවත් මික්ස් කොත්තු.",
    image: menuImg4.src,
    badgeEn: "Sizzling Hot",
    badgeSi: "උණු උණු කෑම",
  },
  {
    id: "bbq-prawns",
    nameEn: "Garlic Butter Lagoon Prawns",
    nameSi: "ගාලික් බටර් ඉස්සෝ",
    categoryEn: "Seafood Specialties",
    categorySi: "සීෆුඩ් විශේෂ",
    priceDisplay: "LKR 2,200",
    descriptionEn:
      "Jumbo lagoon prawns flame-grilled with rich garlic butter, parsley, and lemon wedges.",
    descriptionSi:
      "නැවුම් කලපු ඉස්සන් ගාලික් බටර් සහ දෙහි යුෂ සමඟ ග්‍රිල් කළ රාජකීය සංග්‍රහය.",
    image: menuImg5.src,
    badgeEn: "Premium Seafood",
    badgeSi: "උසස් සීෆුඩ්",
  },
  {
    id: "heritage-lamprais",
    nameEn: "Traditional Banana Leaf Lamprais",
    nameSi: "පාරම්පරික ලම්ප්‍රයිස්",
    categoryEn: "Sri Lankan Heritage",
    categorySi: "දේශීය උරුමය",
    priceDisplay: "LKR 1,450",
    descriptionEn:
      "Slow-baked in authentic banana leaf: stock rice, mixed meat curry, blachan, ash plantain & brinjal moju.",
    descriptionSi:
      "කෙසෙල් කොළයේ ඔතා අවන් කළ පාරම්පරික සුවඳැති ලම්ප්‍රයිස් සංග්‍රහය.",
    image: menuImg6.src,
    badgeEn: "Heritage Classic",
    badgeSi: "පාරම්පරික රසය",
  },
  {
    id: "black-pepper-beef",
    nameEn: "Spicy Pepper Beef Sizzler",
    nameSi: "බ්ලැක් පෙපර් බීෆ් සිස්ලර්",
    categoryEn: "Sizzlers & Grills",
    categorySi: "සිස්ලර්ස් සහ ග්‍රිල්ස්",
    priceDisplay: "LKR 1,750",
    descriptionEn:
      "Tender beef strips wok-tossed with crushed black pepper, capsicum, onions, and spicy sauce.",
    descriptionSi:
      "කළු ගමිරිස් සහ අමු මිරිස් සමඟ තෙම්පරාදු කළ බීෆ් සිස්ලර් බයිට් එක.",
    image: menuImg7.src,
    badgeEn: "Fiery Delight",
    badgeSi: "දේවල් කළ බයිට්",
  },
];

export default function Catering3DCarousel() {
  const { language } = useLanguage();
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1000);
  const [activeIndex, setActiveIndex] = useState(0);

  const startXRef = useRef<number>(0);
  const startAngleRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);

  const totalItems = DISHES.length;
  const stepAngle = (2 * Math.PI) / totalItems;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute active item index based on current rotation angle
  useEffect(() => {
    let normalized =
      ((-rotationAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    let index = Math.round(normalized / stepAngle) % totalItems;
    setActiveIndex(index);
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

  const activeDish = DISHES[activeIndex];

  const getWhatsAppLink = (dish: ShowcaseDish) => {
    const text =
      language === "si"
        ? `ආයුබෝවන් Madara Restaurant! 🍽️ මම මෙම විශේෂ කෑම පිළිබඳව විමසීමට කැමැත්තෙමි: "${dish.nameSi}" (${dish.priceDisplay}). කරුණාකර ලබාගත හැකි වේලාවන් දන්වන්න.`
        : `Hi Madara Restaurant! 🍽️ I would like to order / inquire about: "${dish.nameEn}" (${dish.priceDisplay}). Please confirm availability.`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  // Config parameters derived from user's settings screenshot:
  // Carousel X radius = 600, Carousel Y radius = 0, Carousel X rotation = 14deg tilt, Thumbs min alpha = 0.3
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const radiusX = isMobile ? 220 : isTablet ? 420 : 600; // Carousel X radius: 600
  const radiusY = isMobile ? 56 : isTablet ? 80 : 120; // Increased Y-axis gap for inactive items
  const itemWidth = isMobile ? 150 : isTablet ? 220 : 290;
  const itemHeight = isMobile ? 150 : isTablet ? 210 : 270;
  const minAlpha = 0.3; // Thumbs minimum alpha: 0.3 from settings screenshot

  return (
    <section className="py-16 md:py-24 bg-[#090a0f] relative overflow-hidden select-none border-b border-white/10">
      {/* Dark Ambient Radial Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-[#090a0f] to-[#090a0f] pointer-events-none" />
      <div className="ambient-glow w-[750px] h-[750px] bg-amber-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-36">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>
              {language === "si"
                ? "3D ආහාර ප්‍රදර්ශනය"
                : "Interactive 3D Carousel"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
            {language === "si" ? "විශේෂිත " : "Masterpiece "}
            <span className="text-gradient-orange">
              {language === "si" ? "ආහාර වට්ටෝරු" : "Culinary Signatures"}
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-madara-textMuted">
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
          {DISHES.map((dish, index) => {
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
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/85 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-extrabold shadow-lg z-20">
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

        {/* Title, Description & WhatsApp Button (Centered below 3D Carousel with NO extra dots/arrows) */}
        <div className="max-w-xl mx-auto text-center space-y-2  transition-all duration-500">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            {language === "si" ? activeDish.categorySi : activeDish.categoryEn}
          </span>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
            {language === "si" ? activeDish.nameSi : activeDish.nameEn}
          </h3>

          <p className="text-xs sm:text-sm text-madara-textSecondary leading-relaxed max-w-md mx-auto">
            {language === "si"
              ? activeDish.descriptionSi
              : activeDish.descriptionEn}
          </p>

          {/* WhatsApp Direct Action Button */}
          <div className="pt-3 flex items-center justify-center">
            <a
              href={getWhatsAppLink(activeDish)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-7 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-lg group transition-all duration-300"
            >
              <MessageCircle className="w-4.5 h-4.5 text-white" />
              <span>
                {language === "si"
                  ? "WhatsApp හරහා සෘජුවම විමසන්න"
                  : "Order / Inquire via WhatsApp"}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

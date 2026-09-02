# Madara Restaurant — UI/UX Design System Specification

**Theme Identity:** Modern Dark Luxury with Flame Orange Glow  
**Color Palette:** Dark Obsidian (`#090A0D`), Surface (`#111217`, `#181920`), Crisp White (`#FFFFFF`), Flame Orange (`#FF6B00`, `#FF851A`), Amber Gold (`#F59E0B`)  
**Design Orientation:** Catering-First Hierarchy & Careers Recruitment Portal  

---

## 1. Color Palette Tokens

```
  DARK OBSIDIAN BACKGROUNDS         CRISP WHITE TEXT            VIBRANT FLAME ORANGE ACCENTS
┌─────────────────────────────┐   ┌───────────────────┐   ┌────────────────────────────────┐
│  #090A0D (Deep Canvas)      │   │  #FFFFFF (Pure)   │   │  #FF5500 (Electric Flame)      │
│  #111217 (Surface Card)     │   │  #F3F4F6 (Soft)   │   │  #FF6B00 (Brand Primary)       │
│  #181920 (Elevated Surface) │   │  #9CA3AF (Muted)  │   │  #FF851A (Hover Glow)          │
│  #23242E (Subtle Border)    │   │  #6B7280 (Subtle) │   │  #F59E0B (Amber Rating/Gold)   │
└─────────────────────────────┘   └───────────────────┘   └────────────────────────────────┘
```

---

## 2. Catering Explorer Design Pattern

### A. Event Category Selector
- Horizontally scrollable & grid-responsive event pills with icons:
  - 🎂 **Birthday Parties**
  - 💍 **Wedding & Homecoming Banquets**
  - 🕊️ **Funeral & Memorial Catering**
  - 🪷 **Alms Giving (දානමය පිංකම්)**
  - 🪔 **Bana & Dane (බණ සහ දාන)**
  - 💼 **Corporate Events & Seminars**
  - 🎉 **Casual Parties & Get-Togethers**
  - ✨ **Customizable Tailor-Made Packages**

### B. Catering Package Cards
- **Header**: Package Tier (Silver, Gold, Platinum / Standard, Deluxe, Royal), Event Tag, and Price per Guest in bold Flame Orange (`LKR 2,200/pax`).
- **Occasion Badge**: Pill indicating minimum guest count and inclusion notes.
- **Itemized Dish Categories**: Clean accordion or nested list showing:
  - 🍹 *Welcome Beverages*
  - 🍚 *Rice, Roti & Mains*
  - 🍗 *Meats, Seafood & Poultry*
  - 🍛 *Traditional Vegetable Curries & Dhal*
  - 🥗 *Salads, Sambols & Accompaniments*
  - 🍨 *Desserts & Seasonal Fruits*
- **Action Button**: 1-Click WhatsApp Inquiry button that generates a pre-formatted message for that exact package.

### C. Customizable Tailor-Made Package Card
- Special glowing border (`border-madara-orange`).
- Tagline: *"No Fixed Price — 100% Customized According to Your Event & Budget"*.
- Interactive prompt to call or WhatsApp chef with custom dish list.

---

## 3. Careers Page UI Patterns (`/careers/`)

- **Hero Banner**: "Join the Madara Culinary Family" with employee value proposition (competitive salary, meals provided, friendly team, training).
- **Vacancy Cards**:
  - Role Title (English + Sinhala).
  - Job Category badge (Kitchen, Service, Cleaning).
  - Key Responsibilities & Requirements list with checkmarks.
  - Work Type (Full-time / Part-time / Catering Shift).
  - Dual CTAs: "Apply via WhatsApp" (green button) and "Call Hotline" (`0704535815`).

---

## 4. Navigation & Global Header Layout

- **Logo**: "MADARA" in serif font with flame icon and "Catering & Restaurant • Homagama" subtitle.
- **Nav Links**: Catering Packages, Food Menu, Action Kitchen, BYOB, Careers, Contact & Location.
- **Top Announcement Bar**: "Open Daily: 7:00 AM – 10:00 PM • Closed on Full Moon Poya Days • Call: 0704535815".
- **Primary CTA Button**: "Catering Inquiries" with direct WhatsApp desk link.

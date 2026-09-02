# Madara Restaurant — Project Scope Document (Catering-First Focus)

**Document Version:** 2.0.0  
**Project Name:** Madara Restaurant & Catering Services  
**Location:** 191/B/1, Athurugiriya Road, Homagama, Sri Lanka  
**Contact Numbers:** 0704535815 / 0736535815  
**WhatsApp Desk:** 0704535815  
**Email:** madararestaurant@gmail.com  
**Operating Hours:** 7:00 AM – 10:00 PM (Daily) • **Closed on all Full Moon Poya Days**  
**Primary Theme:** Dark Obsidian, Crisp White, Vibrant Flame Orange  
**Deployment Target:** cPanel Shared / VPS Hosting (`public_html`)  

---

## 1. Strategic Vision: Catering & Event Dominance

**Madara Restaurant** is a premier culinary and catering enterprise based in **Homagama, Sri Lanka**. While providing a welcoming dine-in restaurant with live action kitchens and BYOB hospitality, the **primary commercial and marketing focus of the brand is its comprehensive, high-capacity Catering Services**.

The web platform is engineered to:
1. **Highlight and Prioritize Catering Packages by Specific Event Types**:
   - **Birthday Parties** (Kids & Adults celebration packages)
   - **Wedding & Homecoming Receptions** (Lavish banquet menus with action stations)
   - **Funeral & Memorial Catering** (Dignified mourning refreshments, tea, and meal buffets)
   - **Alms Giving Ceremonies (දානමය පිංකම්)** (Traditional vegetarian, fish & meat Dane spreads)
   - **Bana & Dane Services (බණ සහ දාන)** (Night religious ceremony refreshments, morning & midday Dane)
   - **Corporate Events & Meetings** (Executive luncheons, seminars, training packs)
   - **Casual Parties & Get-Togethers** (Action BBQ, hot bites, kottu bars)
   - **100% Customizable Tailor-Made Packages** (Flexible custom menu builds with direct WhatsApp quote desk; no rigid pricing)
2. **Provide Full Dish-by-Dish Transparency**: Every package lists itemized dishes (Welcome drinks, Rice & Mains, Meats/Seafood, Traditional Curries, Accompaniments, Desserts) and price per guest.
3. **Showcase Dine-In, Live Action Kitchens & BYOB**: Secondary highlights for walk-in restaurant guests and weekend diners.
4. **Dedicated Careers & Recruitment Portal**: Dedicated `/careers/` page displaying live vacancies for Chinese Chefs, Rice & Curry Chefs, Kitchen Helpers, Waiters/Stewards, and Cleaning Staff with 1-click WhatsApp job applications.
5. **Top-Tier Local SEO & cPanel Performance**: 100% pre-rendered static HTML with rich Schema.org structured data (`Restaurant`, `CateringService`, `JobPosting`, `LocalBusiness`).

---

## 2. Business Information & Operational Policy

| Attribute | Details |
| :--- | :--- |
| **Address** | 191/B/1, Athurugiriya Road, Homagama, Sri Lanka |
| **Hotlines** | 0704535815 / 0736535815 |
| **WhatsApp Direct** | +94 70 453 5815 (0704535815) |
| **Official Email** | madararestaurant@gmail.com |
| **Operating Hours** | 7:00 AM – 10:00 PM (Monday through Sunday) |
| **Poya Day Policy** | **Closed on all Full Moon Poya Days** (Religious observance) |
| **Payment Model** | Direct contact, bank transfer / cash on delivery for catering. No web gateway or online customer accounts needed. |

---

## 3. Catering Event Categories & Package Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     MADARA CATERING EVENT CATALOG                       │
└─────────────────────────────────────────────────────────────────────────┘
  ├── 1. Birthday Parties (Kids & Adults themes, finger food & mains)
  ├── 2. Wedding & Homecoming Receptions (Multi-course banquets, stewards)
  ├── 3. Funeral & Memorial Services (Dignified refreshments & full meals)
  ├── 4. Alms Giving Ceremonies (දානමය පිංකම් - Traditional Dane spreads)
  ├── 5. Bana & Dane Ceremonies (බණ සහ දාන - Night pirith tea & morning dane)
  ├── 6. Corporate Events & Seminars (Executive buffet & lunch packs)
  ├── 7. Casual Parties & Get-Togethers (Live BBQ, Mongolian wok, hot bites)
  └── 8. Customizable Packages (Tailor-made menus with direct chef consultation)
```

---

## 4. Career Opportunities Portal

The website includes a dedicated, indexable **Careers Page** (`/careers/`) showcasing:
- **Chinese Chef (චයිනීස් චෙෆ්)**: Wok mastery, Mongolian rice, noodles, dragon dishes.
- **Rice & Curry Chef (රයිස් ඇන්ඩ් කරි චෙෆ්)**: Authentic Sri Lankan banquet & alms-giving curries.
- **Kitchen Helper (කුස්සි සහයක)**: Kitchen preparation, ingredient handling, cleanliness.
- **Waiter / Steward (වේටර් / සත්කාරක)**: Restaurant hospitality and outdoor banquet service.
- **Cleaning Staff (පිරිසිදු කිරීමේ සේවක)**: Hygiene, sanitization, dishwashing.
- Direct 1-Click Application via WhatsApp (`0704535815`) or Direct Phone Call.

---

## 5. cPanel Static Export & SEO Architecture

1. **Static HTML Generation**: Next.js App Router with `output: 'export'` compiles multi-page HTML (`index.html`, `careers/index.html`).
2. **cPanel Upload**: Upload build directory `out/` into `public_html/`.
3. **Structured Data (JSON-LD)**:
   - `CateringService` & `FoodEstablishment` for Homagama catering queries.
   - `JobPosting` schema for each vacancy on the `/careers/` route.
   - `OpeningHoursSpecification` noting 07:00 - 22:00 and Poya Day closures.

# Madara Restaurant — Software Requirements Specification (SRS)

**Document Version:** 2.0.0  
**Focus:** Catering-First Architecture & Recruitment Portal  
**Target Region:** Homagama, Western Province, Sri Lanka  
**Contact Numbers:** 0704535815 / 0736535815 | **WhatsApp:** 0704535815  
**Email:** madararestaurant@gmail.com  
**Address:** 191/B/1, Athurugiriya Road, Homagama  
**Hours:** 7:00 AM – 10:00 PM (Daily) • **Closed on all Full Moon Poya Days**  

---

## 1. Functional Requirements (FR)

### FR-1: Catering Priority & Event Catalog (Top Priority)
- **FR-1.1**: The homepage and navigation must prioritize Catering as the flagship value proposition.
- **FR-1.2**: Categorized Catering Navigation tabs covering:
  1. *Birthday Parties*
  2. *Wedding & Homecoming Banquets*
  3. *Funeral & Memorial Catering*
  4. *Alms Giving Ceremonies (දානමය පිංකම්)*
  5. *Bana & Dane Services (බණ සහ දාන)*
  6. *Corporate Events & Seminars*
  7. *Casual Parties & Get-Togethers*
  8. *Customizable Tailor-Made Packages*
- **FR-1.3**: For each categorized event, display distinct package tiers (e.g. Standard, Deluxe, Royal) featuring:
  - Package title & occasion suitability.
  - Transparent price per guest in LKR (e.g., LKR 2,200/pax, LKR 3,450/pax).
  - Minimum guest count specification.
  - **Itemized Dish Breakdown**: Clear lists of Welcome Drinks, Rice/Noodles/Mains, Meats/Seafood, Traditional Curries, Accompaniments, and Desserts.
  - 1-Click "Inquire for this Package via WhatsApp" button with pre-filled event & package details.
- **FR-1.4 (Customizable Packages)**:
  - Provide a dedicated showcase for custom orders.
  - Explicitly state: **"No Fixed Price — 100% Customized According to Your Taste & Budget"**.
  - Direct CTA button linking to WhatsApp and phone hotlines for chef consultation.

### FR-2: Careers & Job Vacancies Page (`/careers/`)
- **FR-2.1**: Dedicated, crawlable `/careers/` route linked in the Header and Footer.
- **FR-2.2**: Showcase 5 active job vacancies:
  1. **Chinese Chef (චයිනීස් චෙෆ්)**
  2. **Rice & Curry Chef (රයිස් ඇන්ඩ් කරි චෙෆ්)**
  3. **Kitchen Helper (කුස්සි සහයක)**
  4. **Waiter / Steward (වේටර් / සත්කාරක)**
  5. **Cleaning Staff (පිරිසිදු කිරීමේ සේවක)**
- **FR-2.3**: For each vacancy, display:
  - Job Title (English & Sinhala).
  - Job Type (Full-Time / Part-Time / Event-Based).
  - Location (191/B/1, Athurugiriya Road, Homagama).
  - Responsibilities & Key Requirements.
  - Benefits & Work Environment details.
  - 1-Click "Apply via WhatsApp" (`0704535815`) button with pre-filled role information.
  - Direct Call Hotline (`0704535815` / `0736535815`).

### FR-3: Restaurant Menu Showcase (Dine-In, Takeaway, Delivery)
- **FR-3.1**: Display categorized food & beverage menu (Signatures, Wok, Rice & Biryani, Sri Lankan, Grills, Seafood, BYOB Bites, Desserts).
- **FR-3.2**: Real-time keyword search across dish names, ingredients, and Sinhala names.
- **FR-3.3**: Dietary & feature badges (Chef's Special, Live Action, BYOB Pairing, Vegetarian, Spicy Levels).
- **FR-3.4**: Dish detail modal with WhatsApp quick inquiry.

### FR-4: Live Action Kitchens & BYOB Experience
- **FR-4.1**: Spotlight on live cooking stations (Mongolian Wok, Charcoal BBQ, Live Cheese Kottu & Hoppers, Pasta Bar) available for catering events and dine-in.
- **FR-4.2**: BYOB facility explanation: glassware provided, ice bucket service, corkage-friendly hospitality, and spicy chaser pairings.

### FR-5: Contact, Map, Operating Hours & Inquiries
- **FR-5.1**: Display updated address: `191/B/1, Athurugiriya Road, Homagama`.
- **FR-5.2**: Display phone numbers: `0704535815` / `0736535815` and WhatsApp: `0704535815`.
- **FR-5.3**: Display operating hours: `7:00 AM – 10:00 PM (Daily)` and explicit notice: **"Closed on all Full Moon Poya Days"**.
- **FR-5.4**: Embedded Google Maps centered on Homagama with "Get Directions" link.
- **FR-5.5**: Catering & General Inquiry Form with direct WhatsApp and Email (`madararestaurant@gmail.com`) dispatch.

### FR-6: Removed Legacy Components
- **Removed**: Instant Event Budget Estimator (slider).
- **Removed**: Table reservation forms and "Book Tables" buttons.
- **Removed**: "Catering and Live Work QUOTA".

---

## 2. Non-Functional Requirements (NFR)

### NFR-1: Search Engine Optimization (SEO) & Structured Data
- Root Layout JSON-LD:
  - `@type: Restaurant` & `FoodEstablishment`
  - `@type: LocalBusiness` at `191/B/1, Athurugiriya Road, Homagama`
  - `@type: CateringService` targeting Homagama, Kottawa, Maharagama, and Colombo suburbs.
  - `OpeningHoursSpecification` with 07:00 - 22:00.
- Careers Page JSON-LD:
  - `@type: JobPosting` for each of the 5 live vacancies (Chinese Chef, Rice & Curry Chef, Kitchen Helper, Waiter, Cleaning Staff) with employmentType, hiringOrganization, jobLocation, and validThrough attributes.

### NFR-2: Performance & cPanel Compatibility
- Next.js Static Export generates static `.html` for all routes (`/index.html`, `/careers/index.html`).
- Optimized `.htaccess` with 1-year caching and Gzip compression.

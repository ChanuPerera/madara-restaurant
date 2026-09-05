# UI/UX Audit — madara-restaurant.vercel.app

**Site reviewed:** https://madara-restaurant.vercel.app
**Business:** Madara Restaurant & Catering, Homagama, Sri Lanka
**Audit date:** September 2026

---

## 1. What the Site Currently Does Well

- **Clear primary CTA path.** Every section — hero, packages, dish cards, BYOB, footer — routes to a pre-filled WhatsApp message or a `tel:` link. This is well suited to a market where WhatsApp is the default booking channel.
- **Strong occasion segmentation.** Catering is split by occasion (Wedding, Alms Giving/Dane, Funeral, Birthday, Corporate, Casual, Custom) with bilingual (Sinhala/English) labels — good for a multi-generational, multi-language local audience.
- **Rich menu data.** Dishes carry price, portion size, spice-level icons, and dietary/feature tags (Chef's Signature, BYOB Favorite, Vegetarian). This is more structured than a typical single-page restaurant site.
- **Trust signals present.** Rating (4.9/5, 650+ events), named testimonials with event type and date, partner logos, and certifications (ISO/food hygiene) are all included.
- **Sticky, always-visible contact info.** Phone number and WhatsApp are present in the top bar, header, and footer.

---

## 2. Key Problems Observed

### 2.1 Page is a single, very long scroll with heavy content duplication
The homepage renders catering packages, several menu categories, "core offerings," live action kitchen, BYOB, partners, testimonials, gallery, contact form, and FAQ **all on one URL**. Combined with what appears to be duplicated markup for the same package cards and nav links (the same "Joyful Celebration Package" and "Grand Gala Birthday Feast" content appears twice in sequence, and the full nav list appears three times in the header alone), this page is extremely heavy to parse — for both users and for accessibility tools/screen readers, which will announce the same content repeatedly.
**Fix:** Audit the DOM for duplicated components (likely leftover from a carousel/mobile-menu implementation rendering both open and closed states in the accessibility tree simultaneously). Ensure only one visible, focusable copy of repeated content exists at a time.

### 2.2 Occasion tabs only fully build out "Birthday Parties"
Of the eight occasion tabs (Birthday, Wedding, Funeral, Alms Giving, Bana & Dane, Corporate, Casual, Customizable), only Birthday Parties shows populated package cards in the crawled content — the other seven show just a heading with no visible package details. If this reflects the live site (not just a crawl limitation), it's a major conversion gap: a bride/groom clicking "Wedding & Homecoming" hits an empty tab.
**Fix:** Confirm every occasion tab renders at least one package card with price and inclusions, matching the Birthday tab's level of detail.

### 2.3 Placeholder stock photography throughout
Every dish, banner, and hero image resolves to generic Unsplash stock photos (e.g., a single prawn stock photo is reused for both "Sizzling Black Pepper Jumbo Prawns" and "Garlic Butter Glazed Lagoon Prawns"; a crab-curry stock photo is reused for "Madara Grand Mixed Meat Sizzler"). For a catering business, food photography *is* the product — using unrelated stock images undermines trust and is easy for a prospective customer to notice.
**Fix:** Replace with real photography of the actual dishes and past events. This is the single highest-impact change on the page.

### 2.4 No dedicated pages / poor information scent for deep links
Nearly the entire site lives behind same-page anchors (`#catering`, `#menu`, `#action-kitchen`, `#byob`, `#gallery`, `#contact`) with only `/careers/` as a real sub-page. This limits SEO (each occasion, e.g. "wedding catering Homagama," could be its own indexable landing page), makes sharing a specific package link clunky, and means browser back/forward behavior after using an anchor nav can feel broken on mobile.
**Fix:** Consider dedicated landing pages per major occasion (wedding, alms giving, corporate) that can be linked to directly from ads/search and social, while keeping the current single-page layout as a general overview.

### 2.5 No visible price for full events, only per-head estimates on some packages
Packages show "LKR X / Person" with a minimum guest count, but there's no interactive way to estimate total cost for a given guest count — the user has to do the multiplication themselves or message WhatsApp to ask. Given the "Interactive Catering Estimator" ambition implied elsewhere, this is currently just a static list.
**Fix:** Add a simple guest-count input/slider next to each package that live-updates an estimated total (e.g., "250 guests × LKR 2,950 ≈ LKR 737,500") before the user commits to messaging.

### 2.6 Contact form ends in a WhatsApp handoff with no visible confirmation state
The "Request a Quick Catering Consultation" form collects name, phone, event type, date, guest count, and requirements, then sends to WhatsApp. It's not clear from the page what happens if a user doesn't have WhatsApp installed (desktop users especially), or whether there's a fallback (email/direct submission).
**Fix:** Add a non-WhatsApp fallback (e.g., "or email us directly" with a mailto link, already present in the footer but not tied to the form) and a clear post-submit confirmation state.

### 2.7 Bilingual toggle scope is unclear
A "🌐සිංහල" toggle appears in the header, but it's not clear from the crawl whether it switches the entire page or only labels. Given the strong bilingual content in Sinhala already embedded per-item (dish names, occasion names), a full-page toggle would meaningfully widen the audience, especially for Dane/alms-giving customers who may prefer to browse in Sinhala.
**Fix:** Confirm and, if needed, extend the language toggle to translate all body copy, not just the section headers already dual-labeled.

### 2.8 FAQ accordion buries decision-relevant answers
Of five FAQ questions, only "What types of events does Madara Restaurant cater for?" is expanded/visible by default; the other four (package customization, hours/Poya policy, careers, BYOB rules) are collapsed. BYOB rules and the Poya-day closure policy are important enough to a first-time visitor that burying them behind a click may cause avoidable WhatsApp questions that a well-labeled FAQ should pre-empt.
**Fix:** Keep the accordion, but consider auto-expanding the BYOB and Poya-day-policy answers, or surfacing them as short inline copy near the relevant sections (BYOB section, top announcement bar) in addition to the FAQ.

---

## 3. Prioritized Recommendations

| Priority | Issue | Effort | Impact |
|---|---|---|---|
| 1 | Replace stock photos with real dish/event photography | Medium | Very High |
| 2 | Fix/verify empty occasion tabs (Wedding, Funeral, Corporate, etc.) | Low–Medium | Very High |
| 3 | Remove duplicated DOM content (nav, package cards) | Low | High (a11y + performance) |
| 4 | Add live per-guest cost estimator to packages | Medium | High |
| 5 | Add non-WhatsApp fallback + confirmation state on contact form | Low | Medium |
| 6 | Split key occasions into indexable sub-pages for SEO | Medium–High | Medium (long-term) |
| 7 | Confirm full-page language toggle coverage | Low–Medium | Medium |
| 8 | Surface BYOB/Poya policy outside the collapsed FAQ | Low | Medium |

---

## 4. Notes on Method
This audit is based on the publicly rendered content of https://madara-restaurant.vercel.app at the time of review. Some issues (e.g., the empty occasion tabs, duplicated DOM nodes) should be re-verified directly in a browser and against the site's live/interactive state, since a static crawl can sometimes misrepresent content that is genuinely present but loaded dynamically (e.g., behind a tab click).

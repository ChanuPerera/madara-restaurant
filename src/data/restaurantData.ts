export interface MenuItem {
  id: string;
  name: string;
  sinhalaName?: string;
  category: string;
  priceLKR: number;
  description: string;
  portion: string;
  spicyLevel?: 0 | 1 | 2 | 3;
  isChefsSpecial?: boolean;
  isVegetarian?: boolean;
  isActionKitchen?: boolean;
  isByobPairing?: boolean;
  image: string;
  tags: string[];
}

export interface CateringEventCategory {
  id: string;
  name: string;
  sinhalaName?: string;
  description: string;
  icon: string;
  image: string;
  badge: string;
}

export interface CateringPackageDetail {
  id: string;
  categoryId: string; // birthday, wedding, funeral, alms_giving, bana_dane, corporate, casual_party, custom
  categoryName: string;
  packageName: string;
  sinhalaName?: string;
  tagline: string;
  pricePerPersonLKR: number | null; // null for custom packages with no fixed price
  priceDisplay: string; // e.g. "LKR 2,200 / Person" or "No Fixed Price (Contact Us)"
  minGuests: number;
  popular?: boolean;
  isCustomizable?: boolean;
  idealFor: string;
  highlights: string[];
  menuSections: {
    title: string;
    items: string[];
  }[];
}

export interface ActionKitchenStation {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  chefSpecialty: string;
  highlightItems: string[];
  badge: string;
  image: string;
  bestFor: string;
}

export interface JobVacancy {
  id: string;
  title: string;
  sinhalaTitle: string;
  category: "Kitchen" | "Service" | "Hygiene & Utility";
  type: "Full-Time" | "Part-Time" | "Event-Based" | "Full-Time / Part-Time" | "Full-Time / Event-Based";
  location: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  roleOrEvent: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface Partner {
  name: string;
  category: string;
  logoText: string;
  badge: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "catering" | "dining" | "byob" | "careers";
}

export const RESTAURANT_INFO = {
  name: "Madara Restaurant & Catering Services",
  shortName: "Madara Restaurant",
  tagline: "Homagama's Premier Event Catering, Live Action Kitchen & Dining Destination",
  subTagline: "Catering for Weddings, Alms Giving, Bana, Funerals, Birthdays & Corporate Events • Live Action Wok • BYOB Friendly",
  phone: "0704535815",
  secondaryPhone: "0736535815",
  phoneFormatted: "070 453 5815",
  secondaryPhoneFormatted: "073 653 5815",
  whatsappNumber: "94704535815", // numeric for wa.me links
  whatsappFormatted: "070 453 5815",
  email: "madararestaurant@gmail.com",
  address: "191/B/1, Athurugiriya Road, Homagama, Sri Lanka",
  landmark: "Athurugiriya Road, Homagama",
  googleMapsUrl: "https://maps.google.com/?q=191/B/1+Athurugiriya+Road+Homagama",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.479592209736!2d80.00194!3d6.84361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25178651c6bdf%3A0x6a0c5c36a3f12345!2sHomagama%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk",
  openingHours: {
    daily: "7:00 AM – 10:00 PM (Daily)",
    poyaDays: "CLOSED ON ALL FULL MOON POYA DAYS",
    breakfast: "7:00 AM – 11:00 AM",
    lunch: "11:30 AM – 3:30 PM",
    dinner: "6:30 PM – 10:00 PM",
    cateringDesk: "Available 7:00 AM – 10:00 PM Daily for Consultations",
  },
  socialLinks: {
    facebook: "https://facebook.com/MadaraRestaurantHomagama",
    instagram: "https://instagram.com/madararestaurant",
    tiktok: "https://tiktok.com/@madararestaurant",
  },
  stats: [
    { label: "Catering Events Delivered", value: "650+" },
    { label: "Satisfied Guests Served", value: "50,000+" },
    { label: "Customer Rating", value: "4.9 / 5.0" },
    { label: "Event Menu Specialties", value: "100+" },
  ],
};

// ==========================================
// CATERING EVENT CATEGORIES & PACKAGES
// ==========================================

export const CATERING_CATEGORIES: CateringEventCategory[] = [
  {
    id: "birthday",
    name: "Birthday Parties",
    sinhalaName: "උපන්දින සාද",
    description: "Vibrant menus featuring party finger foods, fried rice, pasta, grills, and sweet dessert tables.",
    icon: "Cake",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    badge: "Kids & Adults",
  },
  {
    id: "wedding",
    name: "Wedding & Homecoming",
    sinhalaName: "විවාහ සහ දෙවැනි ගමන උත්සව",
    description: "Lavish multi-course events, premium chafing setups, live cooking, and professional stewards.",
    icon: "HeartHandshake",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    badge: "Grand Events",
  },
  {
    id: "funeral",
    name: "Funeral & Memorial",
    sinhalaName: "අවමංගල්‍ය සහ මතක වස්ත්‍ර පූජා",
    description: "Dignified, punctual catering for gatherings and memorial wakes with tea, short eats, or hot meals.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    badge: "Dignified & Punctual",
  },
  {
    id: "alms_giving",
    name: "Alms Giving (දානමය පිංකම්)",
    sinhalaName: "දානමය පිංකම් සත්කාර",
    description: "Traditional Sri Lankan Dane meals prepared with strict cleanliness and pure ingredients.",
    icon: "SunMedium",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    badge: "Pure & Traditional",
  },
  {
    id: "bana_dane",
    name: "Bana & Dane (බණ සහ දාන)",
    sinhalaName: "ධර්ම දේශනා සහ දාන සත්කාර",
    description: "Catering for night preaching refreshments and morning/midday traditional Dane offerings.",
    icon: "Flame",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    badge: "Pious Service",
  },
  {
    id: "corporate",
    name: "Corporate Events & Seminars",
    sinhalaName: "ආයතනික සහ සම්මන්ත්‍රණ සත්කාර",
    description: "Executive hot buffet setups and high-end packed meals for seminars, meetings, and office gatherings.",
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    badge: "Professional & On-Time",
  },
  {
    id: "casual_party",
    name: "Casual Parties & Get-Togethers",
    sinhalaName: "සාද සහ සුහද හමුවීම්",
    description: "Action-packed parties with live BBQ grills, hot butter cuttlefish, cheese kottu, and full BYOB setup.",
    icon: "Utensils",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    badge: "Live Action & BYOB",
  },
  {
    id: "custom",
    name: "Customizable Packages",
    sinhalaName: "ඔබට අවශ්‍ය පරිදි සකස් කළ පැකේජ",
    description: "Tailor-made menus designed around your guest count, favorite dishes, and budget with no fixed price.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    badge: "100% Flexible Menu",
  },
];

export const CATERING_PACKAGES: CateringPackageDetail[] = [
  // 1. BIRTHDAY PARTIES
  {
    id: "bday-standard",
    categoryId: "birthday",
    categoryName: "Birthday Parties",
    packageName: "Joyful Celebration Package",
    sinhalaName: "ජෝයිෆුල් උපන්දින පැකේජය",
    tagline: "Fun, vibrant spread suitable for kids and family birthday celebrations",
    pricePerPersonLKR: 2150,
    priceDisplay: "LKR 2,150 / Person",
    minGuests: 25,
    idealFor: "Kids Birthdays, Family Milestones, Casual Home Gatherings",
    highlights: ["Buffet warmers & setup", "Disposable/Ceramic dinnerware", "Party steward service"],
    menuSections: [
      {
        title: "Welcome Drinks",
        items: ["Fresh Mixed Fruit Punch", "Iced Passion Fruit Cordial"],
      },
      {
        title: "Mains & Rice",
        items: ["Egg & Vegetable Fried Rice (Basmati)", "Spicy Veg Wok Noodles or Creamy Macaroni"],
      },
      {
        title: "Meats & Poultry",
        items: ["Crispy Devilled Chicken with Capsicum", "Fried Fish Nuggets with Sweet Chili Dip"],
      },
      {
        title: "Curries & Sides",
        items: ["Creamy Potato & Green Pea Curry", "Chili Paste & Chili Katta Sambol", "Crispy Papadam"],
      },
      {
        title: "Dessert Table",
        items: ["Chocolate Biscuit Pudding with Cashew", "Vanilla Ice Cream with Strawberry Syrup"],
      },
    ],
  },
  {
    id: "bday-deluxe",
    categoryId: "birthday",
    categoryName: "Birthday Parties",
    packageName: "Grand Gala Birthday Feast",
    sinhalaName: "ග්‍රෑන්ඩ් ගාලා උපන්දින මංගල්‍යය",
    tagline: "Premium party spread with Hot Butter Cuttlefish, mixed grills, and live action options",
    pricePerPersonLKR: 2950,
    priceDisplay: "LKR 2,950 / Person",
    minGuests: 30,
    popular: true,
    idealFor: "21st Birthdays, 50th Golden Celebrations, Evening Party Dinners",
    highlights: ["Live Action Station add-on ready", "BYOB glassware & ice service", "Dedicated party stewards"],
    menuSections: [
      {
        title: "Welcome Drinks & Mocktails",
        items: ["Blue Lagoon Mint Sparkler", "Fresh Squeezed Lime & Honey Juice"],
      },
      {
        title: "Starters & Finger Bites",
        items: ["Crispy Chicken Drumlets", "Spiced Vegetable Spring Rolls with Sweet Garlic Sauce"],
      },
      {
        title: "Mains & Rice",
        items: ["Special Mixed Meat Fried Rice (Basmati)", "Singapore Spicy Seafood Noodles", "Steamed Fragrant Jasmine Rice"],
      },
      {
        title: "Meat & Seafood Specialties",
        items: ["Chef's Signature Hot Butter Cuttlefish (HBC)", "Slow-Roasted Pepper BBQ Chicken", "Devilled Pork with Fried Garlic (or Fish)"],
      },
      {
        title: "Accompaniments & Salads",
        items: ["Hawaiian Chicken & Pineapple Salad", "Fried Moru Chili, Papadam, and Chili Paste"],
      },
      {
        title: "Desserts",
        items: ["Madara Warm Sizzling Brownie Bites", "Fresh Cut Tropical Fruit Platter", "Caramel Custard with Cream"],
      },
    ],
  },

  // 2. WEDDING & HOMECOMING
  {
    id: "wed-royal",
    categoryId: "wedding",
    categoryName: "Wedding & Homecoming",
    packageName: "Royal Wedding Spread",
    sinhalaName: "රාජකීය මංගල භෝජන සංග්‍රහය",
    tagline: "Grand 7-course multi-cuisine feast with luxury presentation, live stations & bridal table service",
    pricePerPersonLKR: 3950,
    priceDisplay: "LKR 3,950 / Person",
    minGuests: 50,
    popular: true,
    idealFor: "Weddings, Homecoming Receptions, Grand Engagement Galas",
    highlights: [
      "Luxury chafing dishes with floral/theme buffet setup",
      "1 Live Action Station included (Mongolian Wok or Live Hoppers)",
      "Dedicated Maitre d' & uniformed silver service staff",
      "Complimentary VIP Bridal Table service",
      "Full BYOB glassware, ice bar & chaser serving station included",
    ],
    menuSections: [
      {
        title: "Welcome Beverages",
        items: ["Tropical Island Fruit Punch with Fresh Mint", "King Coconut Orange Splash", "Chilled Mocktails"],
      },
      {
        title: "Rice, Biryani & Breads",
        items: [
          "Aged Basmati Fragrant Mutton or Chicken Dum Biryani",
          "Special Mixed Seafood Fried Rice",
          "Wok Tossed Singapore Rice Vermicelli",
          "Butter Garlic Naan Breads",
        ],
      },
      {
        title: "Meat, Poultry & Seafood Spread",
        items: [
          "Tandoori Spiced Chicken Tikka Masala",
          "Madara Signature Crispy Hot Butter Cuttlefish",
          "Slow-Simmered Mutton Rogan Josh (or Black Pork Curry)",
          "Golden Prawn Skewers with Lemon Herb Glaze",
        ],
      },
      {
        title: "Curries & Traditional Delicacies",
        items: [
          "Paneer Butter Masala with Cashew Gravy",
          "Devilled Button Mushrooms & Sweet Corn",
          "Creamy Potato & Green Pea Curry in Coconut Milk",
        ],
      },
      {
        title: "Salads & Accompaniments",
        items: [
          "Russian Egg & Potato Salad with Mustard Cream",
          "Spicy Raw Mango & Katta Sambol",
          "Traditional Malay Pickle (Achcharu)",
          "Mint Raita, Crispy Papadam & Chili Paste",
        ],
      },
      {
        title: "Grand Dessert Bar",
        items: [
          "Traditional Watalappam with Kithul Treacle & Cashews",
          "Belgian Chocolate Mousse Cups",
          "Fresh Fruit Salad with Vanilla Bean Gelato",
          "Assorted French Mini Pastries",
        ],
      },
    ],
  },
  {
    id: "wed-silver",
    categoryId: "wedding",
    categoryName: "Wedding & Homecoming",
    packageName: "Classic Elegance Wedding Package",
    sinhalaName: "ක්ලැසික් මංගල පැකේජය",
    tagline: "Refined 5-course spread with complete buffet setup and steward service",
    pricePerPersonLKR: 3250,
    priceDisplay: "LKR 3,250 / Person",
    minGuests: 50,
    idealFor: "Intimate Weddings, Registration Ceremonies, Homecomings",
    highlights: ["Full buffet presentation", "BYOB glassware included", "Uniformed stewards"],
    menuSections: [
      {
        title: "Welcome Drinks",
        items: ["Fresh Lime & Mint Fizz", "Mixed Fruit Nectar"],
      },
      {
        title: "Mains & Rice",
        items: ["Fragrant Ghee Basmati Rice", "Vegetable Fried Noodles", "Steamed Basmati Rice"],
      },
      {
        title: "Meats & Seafood",
        items: ["Roast Chicken with Rich Herb Gravy", "Fish Mustard Curry (Ambulthiyal or Devilled)", "Sweet & Sour Crispy Prawns"],
      },
      {
        title: "Vegetables & Curries",
        items: ["Cashew Nut & Green Pea Curry", "Tempered Dhal with Crispy Garlic", "Fried Eggplant (Brinjal Moju)"],
      },
      {
        title: "Salads & Accompaniments",
        items: ["Fresh Garden Green Salad", "Malay Pickle", "Papadam & Chili Paste"],
      },
      {
        title: "Desserts",
        items: ["Creamy Caramel Pudding", "Fruit Trifle with Custard", "Ice Cream"],
      },
    ],
  },

  // 3. FUNERAL & MEMORIAL CATERING
  {
    id: "fun-tea-meal",
    categoryId: "funeral",
    categoryName: "Funeral & Memorial",
    packageName: "Dignified Memorial Tea & Meal Service",
    sinhalaName: "අවමංගල්‍ය තේ පැන් සහ ආහාර සත්කාරය",
    tagline: "Thoughtful, dignified and strictly on-time catering for wake gatherings and funeral ceremonies",
    pricePerPersonLKR: 1850,
    priceDisplay: "LKR 1,850 / Person",
    minGuests: 30,
    idealFor: "Funeral Houses, Memorial Services, 7th Day Alms Support",
    highlights: ["24/7 emergency dispatch support", "Punctual & quiet service setup", "Warm thermal chafing equipment"],
    menuSections: [
      {
        title: "Continuous Tea & Coffee Station",
        items: ["Ceylon Milk Tea & Black Tea with Ginger", "Fresh Filtered Coffee", "Assorted Cream Biscuits"],
      },
      {
        title: "Short Eats & Refreshments (Optional Afternoon Slot)",
        items: ["Fish Cutlets with Garlic Dip", "Vegetable Pastry Triangles", "Egg Sandwiches"],
      },
      {
        title: "Comforting Main Buffet",
        items: [
          "Steamed Premium Samba / Keeri Samba Rice",
          "Red Rice (Rathu Kakulu)",
          "Village Style Chicken Curry or Fresh Thalapath Fish Ambulthiyal",
          "Polos Curry (Baby Jackfruit) / Breadfruit Curry",
          "Creamy Tempered Dhal Curry with Garlic & Curry Leaves",
          "Gotukola Sambol / Pol Sambol",
          "Fried Dried Fish (Katta Karawala) / Moru Chili",
          "Crispy Papadam",
        ],
      },
      {
        title: "Desserts",
        items: ["Creamy Buffalo Curd with Sinharaja Kithul Treacle", "Fresh Banana / Seasonal Fruit Slices"],
      },
    ],
  },

  // 4. ALMS GIVING (දානමය පිංකම්)
  {
    id: "alms-traditional",
    categoryId: "alms_giving",
    categoryName: "Alms Giving (දානමය පිංකම්)",
    packageName: "Traditional Maha Sangha Dane Spread",
    sinhalaName: "මහා සංඝරත්නය උදෙසා පාරම්පරික දානමය පැකේජය",
    tagline: "Prepared with utmost piety, supreme hygiene, and authentic Sri Lankan temple-style curries",
    pricePerPersonLKR: 1950,
    priceDisplay: "LKR 1,950 / Person",
    minGuests: 20,
    popular: true,
    idealFor: "3-Month / 1-Year Alms Givings, Pirith Pinkam Dane, Sanghika Dane",
    highlights: [
      "Strict vegetarian & non-vegetarian segregated preparation",
      "Pure coconut oil & unadulterated spices",
      "Special Buddha Pooja & Maha Sangha offerings packaged reverently",
      "Traditional clay handi or stainless buffet presentation",
    ],
    menuSections: [
      {
        title: "Buddha Pooja & Morning Offering Pack",
        items: ["Kiri Ahara (Milk Rice) with Kithul Treacle", "Kavum, Kokis & Athirasa Platter", "Fresh Lotus Blossom set"],
      },
      {
        title: "Rice Varieties",
        items: ["Steamed Fragrant Samba Rice", "Traditional Rathu Kakulu (Red Raw Rice)", "Suwandel Heritage Rice (Optional)"],
      },
      {
        title: "Fish, Poultry & Traditional Proteins",
        items: [
          "Authentic Southern Thalapath Fish Ambulthiyal",
          "Country Chicken Village Curry in Rich Coconut Milk",
          "Boiled Eggs Tempered with Onions (Optional)",
        ],
      },
      {
        title: "Traditional 7-Curry Spread (හත්මාළුව / එළවළු)",
        items: [
          "Slow-Cooked Tender Polos Curry (Baby Jackfruit)",
          "Cashew Nut & Green Pea Curry in Creamy Gravy",
          "Kiri Kos (Jackfruit in Golden Coconut Milk)",
          "Creamy Tempered Parippu (Dhal) with Curry Leaves",
          "Brinjal Pahi (Sweet & Sour Eggplant Pickle)",
          "Mukunuwenna or Gotukola Mellum with Shredded Coconut",
          "Fried Katta Karawala & Moru Chili",
          "Crispy Papadam",
        ],
      },
      {
        title: "Traditional Sweet Offerings",
        items: [
          "Rich Watalappam with Roasted Cashew & Kithul Treacle",
          "Buffalo Curd with Pure Kithul Treacle (මී කිරි සහ කිතුල් පැණි)",
          "Fresh Kolikuttu Bananas & Sweet Mango Slices",
        ],
      },
    ],
  },

  // 5. BANA & DANE (බණ සහ දාන)
  {
    id: "bana-night-dane",
    categoryId: "bana_dane",
    categoryName: "Bana & Dane (බණ සහ දාන)",
    packageName: "All-Night Bana Refreshments & Morning Dane",
    sinhalaName: "ධර්ම දේශනා තේ පැන් සහ පසුදින හිල් දානය",
    tagline: "Complete two-stage package covering evening Dhamma sermon hospitality and morning Hil Dane",
    pricePerPersonLKR: 2350,
    priceDisplay: "LKR 2,350 / Person",
    minGuests: 25,
    idealFor: "All-Night Pirith, Evening Bana Sermons, Hil Dane & Dawal Dane Combinations",
    highlights: [
      "Evening herbal tea & traditional sweetmeat service",
      "Early morning 6:30 AM Hil Dane delivery guarantee",
      "Complete respectful tableware & thermal equipment",
    ],
    menuSections: [
      {
        title: "Evening Bana Sermon Refreshments (රාත්‍රී බණ තේ පැන්)",
        items: [
          "Hot Belimal / Ranawara Herbal Infusion with Jaggery (බෙලිමල් / රණවරා සහ හකුරු)",
          "Ceylon Spiced Milk Tea & Ginger Black Tea",
          "Konda Kavum, Mung Kavum & Halapa Platter",
          "Vegetable Short Eats & Sandwiches",
        ],
      },
      {
        title: "Morning Hil Dane (පසුදින හිල් දානය - 6:30 AM)",
        items: [
          "Hot Kola Kenda (Herbal Porridge) with Hakuru (Jaggery)",
          "Warm Pol Rotti & Lunu Miris",
          "String Hoppers (Indi Appa) with Kiri Hodi & Pol Sambol",
          "Fish Curry or Potato Curry",
          "Fresh Fruit Cuts & Bananas",
        ],
      },
      {
        title: "Midday Main Dane Spread (දවල් දානය - Optional Upgrade)",
        items: [
          "Full 7-Curry Traditional Village Meal with Fish Ambulthiyal / Chicken",
          "Curd & Treacle",
          "Watalappam",
        ],
      },
    ],
  },

  // 6. CORPORATE EVENTS & SEMINARS
  {
    id: "corp-exec",
    categoryId: "corporate",
    categoryName: "Corporate Events & Seminars",
    packageName: "Executive Business Luncheon Buffet",
    sinhalaName: "විධායක ආයතනික දිවා භෝජන පැකේජය",
    tagline: "Polished, on-time corporate catering for board meetings, seminars, and corporate celebrations",
    pricePerPersonLKR: 2450,
    priceDisplay: "LKR 2,450 / Person",
    minGuests: 25,
    popular: true,
    idealFor: "Corporate Training Seminars, Annual Meetings, Office Celebrations",
    highlights: ["Formal executive setup", "Tax invoicing & corporate PO friendly", "Punctual delivery guaranteed"],
    menuSections: [
      {
        title: "Welcome Refreshments & Mid-Session Tea",
        items: ["Fresh Lime Mint Cooler", "Ceylon Milk Tea / Black Coffee with Cookies"],
      },
      {
        title: "Executive Mains",
        items: ["Fragrant Steamed Basmati Rice", "Vegetable Fried Rice or Garlic Butter Noodles", "Herb Roasted Potatoes"],
      },
      {
        title: "Meats & Poultry",
        items: ["Smoked Butter Chicken Masala", "Grilled Fish Fillet in Lemon Garlic Sauce (or Pepper Pork)"],
      },
      {
        title: "Vegetables & Curries",
        items: ["Cashew Nut & Green Pea Curry", "Dhal Fry with Tempered Garlic", "Steamed Buttered Vegetables"],
      },
      {
        title: "Salads & Sides",
        items: ["Russian Egg Salad", "Fresh Green Tossed Salad", "Chili Paste & Papadam"],
      },
      {
        title: "Desserts",
        items: ["Caramel Custard Pudding with Toasted Almonds", "Fresh Tropical Fruit Platter"],
      },
    ],
  },

  // 7. CASUAL PARTIES & GET-TOGETHERS
  {
    id: "party-bbq-kottu",
    categoryId: "casual_party",
    categoryName: "Casual Parties & Get-Togethers",
    packageName: "Action BBQ & Kottu Night Fiesta",
    sinhalaName: "ඇක්ෂන් බාබකියු සහ කොත්තු නයිට් සාදය",
    tagline: "High-energy outdoor and party spread featuring live charcoal BBQ grills, cheese kottu & spicy BYOB bites",
    pricePerPersonLKR: 3100,
    priceDisplay: "LKR 3,100 / Person",
    minGuests: 25,
    popular: true,
    idealFor: "Batch Parties, Friday Night Gatherings, Backyard BBQ Nights",
    highlights: ["Live on-site charcoal grill chef", "Rhythmic live cheese kottu station", "Full BYOB ice & glassware service"],
    menuSections: [
      {
        title: "Welcome Mixers & Chasers",
        items: ["Ginger Beer Cocktail Mixers", "Citrus Mint Soda Sparkler"],
      },
      {
        title: "Live Charcoal BBQ Station",
        items: [
          "Charcoal Grilled Spiced Chicken Quarters",
          "Skewered Pork Belly Satay with Peanut Dip",
          "Garlic Herb Butter Toasted Baguette Slices",
          "Grilled Sweet Corn on the Cob",
        ],
      },
      {
        title: "Live Action Wok & Kottu",
        items: [
          "Live Action Rhythmic Cheese Kottu (Chicken & Beef)",
          "Mongolian Seafood Wok Tossed Rice",
        ],
      },
      {
        title: "Spicy Chaser Bites & Salads",
        items: [
          "Madara Crispy Hot Butter Cuttlefish (HBC)",
          "Crispy Spiced Potato Wedges with Garlic Mayo",
          "Tangy Dijon Coleslaw Salad",
        ],
      },
      {
        title: "Desserts",
        items: ["Chocolate Mousse Cups", "Tropical Fruit Skewers with Honey Glaze"],
      },
    ],
  },

  // 8. CUSTOMIZABLE TAILOR-MADE PACKAGES
  {
    id: "custom-package",
    categoryId: "custom",
    categoryName: "Customizable Packages",
    packageName: "100% Tailor-Made Custom Catering Menu",
    sinhalaName: "ඔබේ මනාපය පරිදි සැකසූ විශේෂ පැකේජය",
    tagline: "Hand-pick every single dish, action station, and presentation style according to your exact budget & taste",
    pricePerPersonLKR: null,
    priceDisplay: "No Fixed Price — Contact for Custom Quote",
    minGuests: 20,
    isCustomizable: true,
    idealFor: "Any Event, Custom Budgets, Specialized Cuisines, Unique Guest Counts",
    highlights: [
      "Zero fixed price — 100% transparent quotation based on selections",
      "Direct menu consultation with Executive Chef",
      "Unlimited combinations of Sri Lankan, Chinese, Indian, Mongolian & Western dishes",
      "Add any Live Action Cooking Station (Wok, BBQ, Hoppers, Kottu, Pasta)",
      "Choice of Standard Buffet, Luxury VIP Setup, or Drop-off Catering",
    ],
    menuSections: [
      {
        title: "Customizable Rice & Breads Selection",
        items: ["Basmati Biryani (Mutton/Chicken/Veg)", "Mongolian Wok Fried Rice", "Ghee Rice", "Red Raw Rice", "Pol Rotti", "Garlic Naan", "Egg Hoppers"],
      },
      {
        title: "Customizable Meat & Seafood Options",
        items: ["Hot Butter Cuttlefish", "Jaffna Fiery Crab Curry", "Black Pork Curry", "Butter Chicken Masala", "Charcoal BBQ Chicken", "Mutton Rogan Josh", "Garlic Butter Prawns"],
      },
      {
        title: "Customizable Vegetarian Curries & Delicacies",
        items: ["Cashew Nut & Green Pea Curry", "Paneer Butter Masala", "Traditional Polos Curry", "Devilled Mushrooms", "Tempered Dhal Fry", "Brinjal Moju", "Kiri Kos"],
      },
      {
        title: "Customizable Desserts & Live Action Add-ons",
        items: ["Sizzling Chocolate Brownie", "Traditional Watalappam", "Curd & Kithul Treacle", "Ice Cream Sundae Bar", "Live Mongolian Wok", "Live BBQ Station", "Live Cheese Kottu Bar"],
      },
    ],
  },
];

// ==========================================
// RESTAURANT FOOD & BEVERAGE MENU (DINE-IN)
// ==========================================

export const MENU_CATEGORIES = [
  { id: "all", name: "All Dishes", sinhalaName: "සියලුම කෑම වර්ග", icon: "UtensilsCrossed" },
  { id: "signatures", name: "Chef's Signatures", sinhalaName: "සූපවේදී විශේෂ තේරීම්", icon: "Flame" },
  { id: "action_wok", name: "Action Wok & Noodles", sinhalaName: "සජීවී වොක් සහ නූඩ්ල්ස්", icon: "ChefHat" },
  { id: "rice_biryani", name: "Rice & Biryani", sinhalaName: "බත් සහ බිරියානි", icon: "Soup" },
  { id: "sri_lankan", name: "Sri Lankan Heritage", sinhalaName: "දේශීය උරුමය", icon: "Sparkles" },
  { id: "grills_sizzlers", name: "Grills & Sizzlers", sinhalaName: "ග්‍රිල්ස් සහ සිස්ලර්ස්", icon: "Flame" },
  { id: "seafood", name: "Seafood Delights", sinhalaName: "සීෆුඩ් ආහාර", icon: "Fish" },
  { id: "byob_bites", name: "BYOB Bites & Chasers", sinhalaName: "BYOB බයිට්ස්", icon: "Wine" },
  { id: "desserts_drinks", name: "Desserts & Drinks", sinhalaName: "අතුරුපස සහ බීම වර්ග", icon: "Coffee" },
];

export const MENU_ITEMS: MenuItem[] = [
  // 1. Chef's Signatures
  {
    id: "sig-1",
    name: "Madara Volcano Mongolian Wok",
    sinhalaName: "මදාරා මොන්ගෝලියන් වොක්",
    category: "signatures",
    priceLKR: 2850,
    description: "Chef's live wok-tossed jasmine rice infused with shredded chicken, ocean prawns, tender beef strips, crisp bell peppers, and our secret smoked chili reduction.",
    portion: "Serves 1-2 Persons",
    spicyLevel: 2,
    isChefsSpecial: true,
    isActionKitchen: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    tags: ["Chef Special", "Live Action", "Signature", "Fusion"],
  },
  {
    id: "sig-2",
    name: "Sizzling Black Pepper Jumbo Prawns",
    sinhalaName: "බ්ලැක් පෙපර් ඉස්සෝ සිස්ලර්",
    category: "signatures",
    priceLKR: 3400,
    description: "Lagoon jumbo prawns sauteed on a smoking cast iron plate with crushed Matale black pepper, button onions, and garlic butter glaze.",
    portion: "Large Platter",
    spicyLevel: 2,
    isChefsSpecial: true,
    isByobPairing: true,
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80",
    tags: ["Seafood", "Sizzling", "Chef Special", "BYOB Favorite"],
  },
  {
    id: "sig-3",
    name: "Smoked Butter Chicken Masala & Naan",
    sinhalaName: "බටර් චිකන් මසාලා සහ නාන්",
    category: "signatures",
    priceLKR: 2450,
    description: "Velvety tandoor-roasted boneless chicken simmered in rich cashew cream and sun-ripened tomato gravy, served with dual garlic butter naan.",
    portion: "Full Portion with 2 Naan",
    spicyLevel: 1,
    isChefsSpecial: true,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    tags: ["Indian", "Tandoor", "Chef Special"],
  },

  // 2. Action Wok & Noodles
  {
    id: "wok-1",
    name: "Live Action Cheese Kottu — Mixed Meat",
    sinhalaName: "චීස් කොත්තු - මීට් මික්ස්",
    category: "action_wok",
    priceLKR: 2200,
    description: "Godamba rotti chopped live with chicken, beef strips, scrambled eggs, and loaded with molten mozzarella cheese gravy.",
    portion: "Regular (Heavy)",
    spicyLevel: 2,
    isActionKitchen: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    tags: ["Action Kitchen", "Sri Lankan", "Cheese Kottu"],
  },
  {
    id: "wok-2",
    name: "Seafood Dragon Noodles",
    sinhalaName: "සීෆුඩ් ඩ්‍රැගන් නූඩ්ල්ස්",
    category: "action_wok",
    priceLKR: 2150,
    description: "High-heat wok-tossed egg noodles with cuttlefish rings, lagoon prawns, bean sprouts, bok choy, and fiery chili garlic sauce.",
    portion: "Large Bowl",
    spicyLevel: 3,
    isActionKitchen: true,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    tags: ["Spicy Wok", "Seafood", "Action Wok"],
  },
  {
    id: "wok-3",
    name: "Crispy Egg Hopper Fiesta (Set of 4)",
    sinhalaName: "බිත්තර ආප්ප සංග්‍රහය",
    category: "action_wok",
    priceLKR: 1200,
    description: "Crispy laced traditional hoppers prepared on live clay pans: 2 runny-yolk egg hoppers and 2 plain hoppers with seeni sambal and lunu miris.",
    portion: "Set of 4 + Sambals",
    spicyLevel: 1,
    isActionKitchen: true,
    isVegetarian: false,
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
    tags: ["Hoppers", "Traditional", "Live Action"],
  },

  // 3. Rice & Biryani
  {
    id: "rice-1",
    name: "Royal Dum Biryani (Mutton / Chicken)",
    sinhalaName: "දම් බුරියානි ප්ලැටර්",
    category: "rice_biryani",
    priceLKR: 2950,
    description: "Slow-cooked long grain aged basmati sealed in a clay handi with saffron, whole aromatic spices, boiled egg, mint raita, Malay pickle, and cashew plum chutney.",
    portion: "Handi Clay Pot (1-2 Pax)",
    spicyLevel: 2,
    isChefsSpecial: true,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    tags: ["Dum Biryani", "Clay Handi", "Royal"],
  },
  {
    id: "rice-2",
    name: "Madara Special Mixed Fried Rice",
    sinhalaName: "මදාරා ස්පෙෂල් මික්ස්ඩ් ෆ්‍රයිඩ් රයිස්",
    category: "rice_biryani",
    priceLKR: 2200,
    description: "Wok-charred basmati rice tossed with shredded roast chicken, prawns, pork bits, egg ribbons, and scallions, served with spicy chili paste and chop suey gravy.",
    portion: "Serves 1-2 Persons",
    spicyLevel: 1,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    tags: ["Fried Rice", "Chinese Fusion", "Best Seller"],
  },
  {
    id: "rice-3",
    name: "Authentic Dutch Burgher Lamprais",
    sinhalaName: "ලම්ප්‍රයිස් (කෙසෙල් කොළයේ ඔතා පිළියෙළ කළ)",
    category: "rice_biryani",
    priceLKR: 2350,
    description: "Short-grain samba rice cooked in rich meat stock, paired with four-meat curry, frikkadels (meatballs), blachan, brinjal pahe, and seeni sambol wrapped and baked in a fresh banana leaf.",
    portion: "Individual Banana Leaf Pack",
    spicyLevel: 2,
    isChefsSpecial: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    tags: ["Lamprais", "Banana Leaf", "Heritage"],
  },

  // 4. Sri Lankan Heritage
  {
    id: "sl-1",
    name: "Jaffna Style Fiery Crab Curry",
    sinhalaName: "යාපනය කකුළු කරිය",
    category: "sri_lankan",
    priceLKR: 3800,
    description: "Fresh mud crabs simmered in roasted Jaffna curry powder, thick coconut milk, drumstick leaves, and tempered fenugreek. Served with roast paan.",
    portion: "Full Pot with 2 Roast Paan",
    spicyLevel: 3,
    isChefsSpecial: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Sri Lankan Heritage", "Spicy", "Authentic Crab"],
  },
  {
    id: "sl-2",
    name: "Authentic Black Pork Curry & Pol Rotti",
    sinhalaName: "කළු ඌරු මස් කරිය සහ පොල් රොටි",
    category: "sri_lankan",
    priceLKR: 2100,
    description: "Tender pork cubes marinated in roasted goraka and dark spices, slow cooked till dark and rich. Paired with 3 hot coconut rottis and lunu miris.",
    portion: "Full Dish + 3 Rottis",
    spicyLevel: 3,
    isByobPairing: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    tags: ["Village Heritage", "Spicy", "BYOB Classic"],
  },
  {
    id: "sl-3",
    name: "Creamy Cashew & Green Pea Curry",
    sinhalaName: "කජු කරිය",
    category: "sri_lankan",
    priceLKR: 1950,
    description: "Whole whole plump raw cashews gently stewed in fragrant first-press coconut milk, cardamom, curry leaves, and green peas.",
    portion: "Medium Bowl",
    spicyLevel: 1,
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegetarian", "Royal Curry", "Mild Spice"],
  },

  // 5. Grills & Sizzlers
  {
    id: "grill-1",
    name: "Madara Grand Mixed Meat Sizzler",
    sinhalaName: "මදාරා ග්‍රෑන්ඩ් සිස්ලර් ප්ලැටර්",
    category: "grills_sizzlers",
    priceLKR: 3600,
    description: "Combination of grilled tenderloin steak medallions, barbecue chicken drumsticks, grilled sausages, butter-glazed veggies, and crispy wedges with mushroom pepper sauce.",
    portion: "Sizzling Hot Iron Platter (1-2 Pax)",
    spicyLevel: 2,
    isChefsSpecial: true,
    isByobPairing: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Sizzler", "Grill", "BYOB Feast"],
  },
  {
    id: "grill-2",
    name: "Charcoal Grilled Whole BBQ Snapper",
    sinhalaName: "BBQ ගල් මාළු ග්‍රිල් එක",
    category: "grills_sizzlers",
    priceLKR: 3200,
    description: "Whole fresh red snapper marinated in lemon garlic chili butter, wrapped and grilled over coconut charcoal embers. Served with garlic dip and salad.",
    portion: "Whole Fish (Approx 700g)",
    spicyLevel: 2,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    tags: ["Charcoal Grill", "Fresh Catch", "Seafood BBQ"],
  },

  // 6. Seafood Delights
  {
    id: "sea-1",
    name: "Garlic Butter Glazed Lagoon Prawns",
    sinhalaName: "ගාලික් බටර් ඉස්සෝ",
    category: "seafood",
    priceLKR: 2800,
    description: "Freshwater lagoon prawns pan-seared with creamy French butter, roasted garlic flakes, lemon zest, and fresh parsley.",
    portion: "Large Platter",
    spicyLevel: 1,
    isByobPairing: true,
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80",
    tags: ["Seafood", "Garlic Butter", "Gourmet"],
  },
  {
    id: "sea-2",
    name: "Devilled Spicy Cuttlefish Rings",
    sinhalaName: "දැල්ලෝ ඩෙවල්",
    category: "seafood",
    priceLKR: 2300,
    description: "Tender cuttlefish tossed with ripe tomatoes, banana peppers, scallions, chili flakes, and a savory sweet-sour reduction.",
    portion: "Full Platter",
    spicyLevel: 3,
    isByobPairing: true,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    tags: ["Devilled", "Spicy Chaser", "BYOB Favorite"],
  },

  // 7. BYOB Bites & Chasers
  {
    id: "byob-1",
    name: "Crispy Hot Butter Cuttlefish (HBC)",
    sinhalaName: "හොට් බටර් දැල්ලෝ",
    category: "byob_bites",
    priceLKR: 2450,
    description: "Golden battered tender cuttlefish rings flash-fried and tossed in rich garlic butter, dried red chilies, spring onions, and capsicum.",
    portion: "Sharing Platter",
    spicyLevel: 2,
    isChefsSpecial: true,
    isByobPairing: true,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    tags: ["BYOB #1 Favorite", "Hot Butter", "Crowd Magnet"],
  },
  {
    id: "byob-2",
    name: "Spicy Pepper Beef Chaser Bites",
    sinhalaName: "ස්පයිසි පෙපර් බීෆ් බයිට්ස්",
    category: "byob_bites",
    priceLKR: 2350,
    description: "Thinly sliced tender beef stir-fried with crushed black pepper, caramelized red onions, curry leaves, and green chilies.",
    portion: "Platter",
    spicyLevel: 3,
    isByobPairing: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Beef Chaser", "Pepper Fry", "BYOB Essential"],
  },
  {
    id: "byob-3",
    name: "Fried Handalla / Silver Fish Chaser",
    sinhalaName: "බැදපු හාල්මැස්සෝ / හඳැල්ලෝ බයිට් එක",
    category: "byob_bites",
    priceLKR: 1650,
    description: "Crispy whole silver fish tempered with fried curry leaves, red chili flakes, roasted peanuts, and lime wedges.",
    portion: "Crunchy Bowl",
    spicyLevel: 2,
    isByobPairing: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    tags: ["Crunchy", "Local Favorite", "BYOB Bite"],
  },

  // 8. Desserts & Drinks
  {
    id: "des-1",
    name: "Madara Sizzling Brownie with Vanilla Ice Cream",
    sinhalaName: "සිස්ලින් බ්‍රව්නී සහ අයිස්ක්‍රීම්",
    category: "desserts_drinks",
    priceLKR: 1250,
    description: "Fudge walnut brownie served on a sizzling hot plate, smothered in warm Belgian chocolate ganache and crowned with Madagascar vanilla bean gelato.",
    portion: "Single Serving",
    spicyLevel: 0,
    isChefsSpecial: true,
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
    tags: ["Dessert", "Sizzling", "Sweet"],
  },
  {
    id: "des-2",
    name: "Traditional Watalappam with Roasted Cashews",
    sinhalaName: "සාම්ප්‍රදායික වටලප්පන්",
    category: "desserts_drinks",
    priceLKR: 750,
    description: "Steamed coconut jaggery custard enriched with ground nutmeg, cardamom, and topped with generous toasted cashews.",
    portion: "Dessert Bowl",
    spicyLevel: 0,
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    tags: ["Traditional Sweet", "Jaggery Custard", "Dessert"],
  },
  {
    id: "des-3",
    name: "Fresh Passion Fruit Mint Cooler",
    sinhalaName: "නැවුම් පැෂන් ෆෘට් කූලර්",
    category: "desserts_drinks",
    priceLKR: 650,
    description: "Chilled fresh passion fruit pulp blended with lime juice, garden mint, cane syrup, and sparkling soda.",
    portion: "Tall Glass (350ml)",
    spicyLevel: 0,
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    tags: ["Beverage", "Refreshing", "Mocktail"],
  },
];

// ==========================================
// LIVE ACTION KITCHEN STATIONS
// ==========================================

export const ACTION_KITCHEN_STATIONS: ActionKitchenStation[] = [
  {
    id: "mongolian-wok",
    name: "Mongolian BBQ & Volcano Wok Station",
    subtitle: "High-Heat Live Stir-Fry Action",
    description: "Guests pick their choice of marinated meats, fresh seafood, crisp garden vegetables, and signature sauces. Master chefs flash-fry them on 300°C cast iron woks with high-energy culinary flair.",
    chefSpecialty: "Live wok fire performance with customized spice adjustments",
    highlightItems: ["Custom Stir-Fry Bowls", "Seafood Volcano Wok", "Teriyaki Glazed Chicken Wok", "Spicy Garlic Veggie Bowls"],
    badge: "Weddings & Galas",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80",
    bestFor: "Wedding Receptions, Corporate Galas, Outdoor Events",
  },
  {
    id: "charcoal-bbq",
    name: "Flaming Charcoal BBQ & Satay Station",
    subtitle: "Coconut Husk Ember Roasting",
    description: "A sizzling live grill station featuring marinated chicken quarters, skewered lemongrass satay, spiced pork belly cuts, and seafood skewers charred to smoky perfection over open coals.",
    chefSpecialty: "Real coconut shell charcoal smoking with house marinades",
    highlightItems: ["Chicken & Pork Satay with Peanut Dip", "BBQ Chicken Quarters", "Chili Garlic Grilled Jumbo Prawns", "Grilled Sweet Corn"],
    badge: "Outdoor Parties & BYOB",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80",
    bestFor: "Cocktail Evenings, Birthday Parties, Garden Dinners",
  },
  {
    id: "kottu-hopper",
    name: "Rhythmic Action Kottu & Live Hopper Bar",
    subtitle: "Sri Lanka's Iconic Street Theater",
    description: "The unmistakable rhythmic sound of blades slicing godamba rotti on cast iron plates! Accompanied by crispy golden hoppers and runny egg hoppers served hot from the pan with fiery sambols.",
    chefSpecialty: "Signature Cheese Kottu and crispy rimmed egg hoppers",
    highlightItems: ["Molten Cheese Kottu", "Black Pork Kottu", "Live Egg & Milk Hoppers", "Seenisambol & Katta Sambol Bars"],
    badge: "Sri Lankan Night Favorite",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80",
    bestFor: "Sri Lankan Theme Dinners, Late-Night Wedding Buffets, Casual Parties",
  },
  {
    id: "pasta-noodle",
    name: "Tossed Italian Pasta & Asian Noodle Bar",
    subtitle: "Fresh Sautéed Pasta Made to Order",
    description: "Live station where chefs toss Penne, Fettuccine, or Asian noodles with choice of creamy Alfredo, spicy Arrabbiata, carbonara, or dragon chili sauce loaded with parmesan and meats.",
    chefSpecialty: "Handcrafted sauces tossed right in front of guests",
    highlightItems: ["Creamy Garlic Chicken Fettuccine", "Spicy Seafood Arrabbiata", "Vegetarian Pesto Penne", "Dragon Wok Tossed Noodle"],
    badge: "Executive & VIP Setup",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
    bestFor: "Executive Corporate Events, Intimate Family Gatherings, Anniversaries",
  },
];

// ==========================================
// CAREERS & JOB VACANCIES
// ==========================================

export const JOB_VACANCIES: JobVacancy[] = [
  {
    id: "chinese-chef",
    title: "Chinese Chef",
    sinhalaTitle: "චයිනීස් චෙෆ් (Chinese Wok Master)",
    category: "Kitchen",
    type: "Full-Time",
    location: "191/B/1, Athurugiriya Road, Homagama",
    experience: "2+ Years Experience in Chinese / Fusion Cooking",
    overview: "We are seeking a talented and high-energy Chinese Chef with mastery in high-heat Wok stations, fried rice, noodle varieties, Mongolian wok, and Chinese fusion dishes for our restaurant and large-scale catering events.",
    responsibilities: [
      "Prepare all Chinese dishes, fried rice varieties, Mongolian wok stir-fries, and dragon noodles according to authentic quality standards.",
      "Manage high-heat wok cooking with speed, consistency, and presentation during peak restaurant hours and live catering action stations.",
      "Control food portioning, minimize wastage, and maintain kitchen stock levels.",
      "Maintain the highest standards of culinary hygiene, cleanliness, and food safety.",
    ],
    requirements: [
      "Minimum 2+ years proven experience as a Chinese Cook/Chef in a recognized restaurant or catering firm.",
      "Thorough knowledge of Chinese sauces, wok techniques, and seasoning balances.",
      "Ability to handle high-volume rush orders with composure and consistency.",
      "Hardworking, punctual, and a collaborative team player.",
    ],
    benefits: [
      "Attractive, highly competitive salary package.",
      "Daily duty meals and refreshments provided.",
      "Service charge and performance incentives.",
      "Friendly, supportive working environment with career growth opportunities.",
    ],
  },
  {
    id: "rice-curry-chef",
    title: "Rice & Curry Chef",
    sinhalaTitle: "රයිස් ඇන්ඩ් කරි චෙෆ් (Sri Lankan Traditional Master)",
    category: "Kitchen",
    type: "Full-Time",
    location: "191/B/1, Athurugiriya Road, Homagama",
    experience: "3+ Years in Sri Lankan Traditional & Event Cooking",
    overview: "Looking for an experienced Sri Lankan Traditional Rice & Curry Chef with deep knowledge in preparing authentic village-style curries, fish ambulthiyal, black pork, wedding events, and sacred Alms Giving (Dane) traditional menus.",
    responsibilities: [
      "Prepare authentic Sri Lankan curries, meat and fish preparations, polos, cashew curries, and vegetable spreads with traditional flavor perfection.",
      "Execute large-scale catering batches for wedding buffets, funeral meals, and Alms Giving (Dane) ceremonies.",
      "Ensure traditional reverence and hygiene standards for religious and cultural alms-giving menus.",
      "Oversee raw ingredient prep, spice roasting, and proper food storage.",
    ],
    requirements: [
      "3+ years of professional cooking experience in Sri Lankan cuisine.",
      "Expert knowledge of traditional spice blends, roasting techniques, and curry profiles.",
      "Experience in preparing large-volume catering meals (50 to 500+ guests).",
      "Dedication to cleanliness and authentic taste.",
    ],
    benefits: [
      "Competitive salary negotiable based on experience.",
      "Free daily duty meals and tea.",
      "Event performance bonuses for large catering orders.",
      "Safe, respectful, and well-equipped commercial kitchen.",
    ],
  },
  {
    id: "kitchen-helper",
    title: "Kitchen Helper",
    sinhalaTitle: "කුස්සි සහයක (Kitchen Assistant)",
    category: "Kitchen",
    type: "Full-Time / Part-Time",
    location: "191/B/1, Athurugiriya Road, Homagama",
    experience: "Prior experience preferred, but freshers with passion are welcome!",
    overview: "We need hardworking and enthusiastic Kitchen Helpers to assist our Head Chefs in daily food preparation, vegetable and meat cutting, ingredient stocking, and maintaining a spotless kitchen environment.",
    responsibilities: [
      "Assist chefs with cutting vegetables, cleaning seafood and meats, and organizing mise en place.",
      "Wash and sanitize cookware, utensils, cutting boards, and kitchen work surfaces.",
      "Assist in packing food containers and loading catering equipment for outdoor events.",
      "Maintain strict cleanliness and waste disposal standards.",
    ],
    requirements: [
      "Energetic, physically active, and eager to learn culinary skills.",
      "Basic understanding of hygiene and food handling.",
      "Willingness to work flexible shifts including morning or evening catering runs.",
    ],
    benefits: [
      "Attractive salary with on-time payments.",
      "All duty meals provided.",
      "Hands-on training from master chefs with opportunities to promote to Assistant Chef.",
    ],
  },
  {
    id: "waiter-steward",
    title: "Waiter / Steward",
    sinhalaTitle: "වේටර් / සත්කාරක (Dining & Banquet Steward)",
    category: "Service",
    type: "Full-Time / Event-Based",
    location: "191/B/1, Athurugiriya Road, Homagama",
    experience: "1+ Years Hospitality or Catering Steward Experience",
    overview: "Seeking polite, well-groomed, and customer-focused Waiters / Stewards to provide courteous dining table service at our restaurant and represent Madara at grand wedding receptions and corporate banquets.",
    responsibilities: [
      "Greet customers warmly, present menus, take accurate food/beverage orders, and serve dishes with professionalism.",
      "Provide table service including BYOB glassware, ice buckets, and prompt table clearing.",
      "Assist in setting up buffet tables, chafing warmers, and dining layouts at outdoor wedding and catering venues.",
      "Ensure customer satisfaction and handle guest inquiries with respect.",
    ],
    requirements: [
      "Pleasant personality, good grooming, and positive communication skills.",
      "Customer-first hospitality mindset.",
      "Ability to work effectively in a team during busy weekend shifts.",
    ],
    benefits: [
      "Attractive basic salary + Service Charge + event tips.",
      "Free duty meals and staff uniforms provided.",
      "Flexible schedule options for student/part-time stewards.",
    ],
  },
  {
    id: "cleaning-staff",
    title: "Cleaning Staff",
    sinhalaTitle: "පිරිසිදු කිරීමේ සේවක (Hygiene & Maintenance Staff)",
    category: "Hygiene & Utility",
    type: "Full-Time",
    location: "191/B/1, Athurugiriya Road, Homagama",
    experience: "Experience in commercial cleaning preferred",
    overview: "Looking for dedicated Cleaning Staff responsible for maintaining the cleanliness, sanitization, and hygienic appeal of our restaurant dining hall, kitchen, restrooms, and catering equipment.",
    responsibilities: [
      "Sweep, mop, wash, and sanitize restaurant dining areas, garden patios, and restroom facilities.",
      "Clean catering chafing dishes, buffet warmers, and service equipment after outdoor events.",
      "Maintain waste bins, recycling disposal, and kitchen grease traps.",
      "Ensure spotless cleanliness standards before, during, and after service hours.",
    ],
    requirements: [
      "Responsible, trustworthy, and detail-oriented regarding cleanliness.",
      "Good physical stamina and dedication to hygiene.",
      "Ability to work according to daily sanitization schedules.",
    ],
    benefits: [
      "Reliable, competitive monthly salary.",
      "Duty meals and tea provided daily.",
      "Overtime pay and event bonuses.",
    ],
  },
];

// ==========================================
// TESTIMONIALS & PARTNERS
// ==========================================

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Dinesh & Sanduni Perera",
    roleOrEvent: "Wedding Reception Catering (250 Guests)",
    location: "Homagama / Kottawa",
    rating: 5,
    comment: "Madara Restaurant handled our wedding catering with an on-site Mongolian action kitchen. Every single guest complimented the food! The Hot Butter Cuttlefish and Biryani were phenomenal. Best decision we made for our big day.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    date: "January 2026",
  },
  {
    id: "test-2",
    name: "Kavindu Jayawardena",
    roleOrEvent: "Corporate Year-End Event (120 Pax)",
    location: "Athurugiriya Road Corridor",
    rating: 5,
    comment: "We booked Madara for our tech firm's annual celebration. The catering was on time to the exact minute, the food was piping hot, and the BYOB hospitality was seamless. Highly recommended in Homagama!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    date: "December 2025",
  },
  {
    id: "test-3",
    name: "Anoma Weerasinghe",
    roleOrEvent: "Maha Sangha Alms Giving (දානමය පිංකම - 40 Pax)",
    location: "Homagama",
    rating: 5,
    comment: "Madara prepared our 1-year remembrance Sanghika Dane. The polos curry, thalapath ambulthiyal, and traditional watalappam were prepared with utmost piety and cleanliness. The Venerable Theros praised the authentic taste.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    date: "February 2026",
  },
];

export const PARTNERS_LIST: Partner[] = [
  { name: "Ceylon Hospitality Partners", category: "Hospitality Network", logoText: "CEYLON HOSPITALITY", badge: "Premium Partner" },
  { name: "Lanka Wedding & Event Planners", category: "Event Management", logoText: "LANKA EVENTS", badge: "Preferred Caterer" },
  { name: "NSBM University Corridor", category: "Institutional Accounts", logoText: "NSBM CORRIDOR", badge: "Corporate Tie-Up" },
  { name: "Homagama Bankers Club", category: "Corporate Partner", logoText: "BANKERS CLUB", badge: "Official Caterer" },
  { name: "Green Valley Venues", category: "Venue Partner", logoText: "GREEN VALLEY", badge: "Exclusive Kitchen" },
  { name: "Colombo Sound & Lighting", category: "Production Partner", logoText: "COLOMBO SOUND", badge: "Audio Visual Partner" },
];

export const FAQS: FAQItem[] = [
  {
    question: "What types of events does Madara Restaurant cater for?",
    answer: "We cater for all events: Weddings, Homecoming receptions, Birthday parties, Funeral memorial wakes, Alms Giving ceremonies (දානමය පිංකම්), Bana & Dane (බණ සහ දාන), Corporate seminars, and Casual backyard/BBQ parties. We also create 100% customizable menus tailored to your exact budget.",
    category: "catering",
  },
  {
    question: "How do your customizable catering packages work?",
    answer: "Our customizable packages have no rigid or fixed price! You can hand-pick your favorite rice varieties, curries, meats (chicken, pork, mutton, seafood), traditional dishes, and live action stations. Simply contact us via WhatsApp (0704535815) or call 0704535815 / 0736535815, and our chef will prepare a tailor-made quote for your guest count and budget.",
    category: "catering",
  },
  {
    question: "What are your operating hours and Poya day policy?",
    answer: "Madara Restaurant is open daily from 7:00 AM to 10:00 PM for breakfast, lunch, dinner, takeaway, and catering consultations. Please note that we are CLOSED ON ALL FULL MOON POYA DAYS in observance of religious holidays (pre-booked religious Alms Giving / Dane orders can be arranged in advance).",
    category: "dining",
  },
  {
    question: "How do I apply for a job vacancy at Madara Restaurant?",
    answer: "We are actively recruiting Chinese Chefs, Rice & Curry Chefs, Kitchen Helpers, Waiters/Stewards, and Cleaning Staff. You can view full requirements on our Careers page and apply immediately by sending a WhatsApp message to 0704535815 or calling 0704535815 / 0736535815.",
    category: "careers",
  },
  {
    question: "How does your BYOB (Bring Your Own Bottle) facility work?",
    answer: "We are proudly BYOB friendly! You are welcome to bring your favorite spirits, wines, or beers. We provide chilled ice buckets, highball/wine glasses, lemon wedges, and our servers are happy to assist. Pair your drinks with our famous spicy bites like Hot Butter Cuttlefish and Devilled Pork.",
    category: "byob",
  },
];

export const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Signature Mongolian Wok Fire Action",
    category: "Action Cooking",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    description: "Chef tossing ingredients on 300°C cast iron wok.",
  },
  {
    id: "gal-2",
    title: "Luxury Wedding Buffet Setup",
    category: "Catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    description: "Grand wedding reception dining layout with chafing displays.",
  },
  {
    id: "gal-3",
    title: "Traditional Alms Giving (Dane) Spread",
    category: "Catering",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    description: "Authentic traditional Sri Lankan 7-curry Dane preparation.",
  },
  {
    id: "gal-4",
    title: "Hot Butter Cuttlefish & Chaser Platter",
    category: "Plated Dishes",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    description: "Crisp golden cuttlefish with garlic butter and dry chili.",
  },
  {
    id: "gal-5",
    title: "Madara Ambient Dining Hall & Bar",
    category: "Ambience",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    description: "Modern dark atmosphere with warm glowing amber lights.",
  },
  {
    id: "gal-6",
    title: "Live Charcoal BBQ Skewer Grill",
    category: "Action Cooking",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    description: "Smoky pork belly and chicken satay grilling over coconut embers.",
  },
  {
    id: "gal-7",
    title: "Royal Dum Biryani Clay Handi",
    category: "Plated Dishes",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    description: "Slow-cooked saffron basmati sealed in traditional earthenware.",
  },
  {
    id: "gal-8",
    title: "Live Hopper & Kottu Action Counter",
    category: "Action Cooking",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    description: "Rhythmic cheese kottu preparation at a private garden party.",
  },
];

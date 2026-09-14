import menuImg1 from "@/assets/3dmenu/1.png";
import menuImg2 from "@/assets/3dmenu/2.png";
import menuImg3 from "@/assets/3dmenu/3.png";
import menuImg4 from "@/assets/3dmenu/4.png";
import menuImg5 from "@/assets/3dmenu/5.png";
import menuImg6 from "@/assets/3dmenu/6.png";
import menuImg7 from "@/assets/3dmenu/7.png";

export interface MenuItemPortion {
  size: string;
  label: string;
  priceLKR: number;
}

export interface MenuItem {
  id: string;
  name: string;
  sinhalaName?: string;
  category: string;
  priceLKR: number;
  description: string;
  portion: string;
  portions?: MenuItemPortion[];
  spicyLevel?: 0 | 1 | 2 | 3;
  isChefsSpecial?: boolean;
  isVegetarian?: boolean;
  isActionKitchen?: boolean;
  isByobPairing?: boolean;
  image: string;
  tags: string[];
  allergens?: string[];
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
  allergens?: string[];
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
  overviewSi?: string;
  responsibilities: string[];
  responsibilitiesSi?: string[];
  requirements: string[];
  requirementsSi?: string[];
  benefits: string[];
  benefitsSi?: string[];
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
  category: "catering" | "dining" | "careers";
}

export const RESTAURANT_INFO = {
  name: "Madara Restaurant & Catering Services",
  shortName: "Madara Restaurant",
  tagline: "Homagama's Premier Event Catering, Live Action Kitchen & Dining Destination",
  subTagline: "Catering for Weddings, Alms Giving, Bana, Funerals, Birthdays & Corporate Events • Live Action Wok • Fine Dining",
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
    id: "birthday_party",
    name: "Birthday / Corporate / Small Party Menus",
    sinhalaName: "උපන්දින / ආයතනික / කුඩා සාද මෙනු",
    description: "Vibrant party menus featuring egg fried rice, yellow rice, noodles, chicken devel, and traditional side dishes.",
    icon: "Cake",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    badge: "Parties & Events",
  },
  {
    id: "bana_alms",
    name: "Bana / Alms-Giving Menus",
    sinhalaName: "බණ / දානමය මෙනු",
    description: "Prepared with utmost cleanliness and reverence for Bana sermons and Maha Sangha Dane offerings.",
    icon: "SunMedium",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    badge: "Sacred & Traditional",
  },
  {
    id: "funeral",
    name: "Funeral Menus",
    sinhalaName: "අවමංගල්‍ය මෙනු",
    description: "Comforting, punctual catering service for funeral wakes and memorial gatherings.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    badge: "Dignified Service",
  },
  {
    id: "mala_batha",
    name: "Mala Batha Menus",
    sinhalaName: "මල බත මෙනු",
    description: "Respectfully prepared traditional Mala Batha menus featuring Katta Karawala, wattakka, and rice.",
    icon: "Flame",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    badge: "Traditional Memorial",
  },
  {
    id: "custom",
    name: "Customizable Packages",
    sinhalaName: "ඔබට අවශ්‍ය පරිදි සකස් කළ පැකේජ",
    description: "Tailor-made menus designed around your guest count, favorite dishes, and budget with no fixed price.",
    icon: "Utensils",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    badge: "100% Flexible Menu",
  },
];

export const CATERING_PACKAGES: CateringPackageDetail[] = [
  // 1. BIRTHDAY / CORPORATE / SMALL PARTY MENUS
  {
    id: "party-menu-01",
    categoryId: "birthday_party",
    categoryName: "Birthday / Corporate / Small Party Menus",
    packageName: "Menu 01 – Classic Menu",
    sinhalaName: "මෙනු 01 – ක්ලැසික් මෙනු",
    tagline: "Essential party feast with Keeri Samba egg fried rice, chicken devel, and side dishes",
    pricePerPersonLKR: 800,
    priceDisplay: "Rs. 800 / Person",
    minGuests: 35,
    idealFor: "Birthday Parties, Small Office Gatherings, Casual Get-Togethers",
    highlights: [
      "Egg Fried Rice – Keeri Samba",
      "Chicken Devel & Fish Cutlet",
      "Hot Butter Mushroom / Brinjal Moju",
      "Vegetable Chopsy, Chilli Paste & Papadam",
    ],
    menuSections: [
      {
        title: "Included Menu Items",
        items: [
          "Egg Fried Rice – Keeri Samba",
          "Chicken Devel",
          "Hot Butter Mushroom / Brinjal Moju",
          "Vegetable Chopsy",
          "Chilli Paste",
          "Fish Cutlet",
          "Papadam",
        ],
      },
    ],
  },
  {
    id: "party-menu-02",
    categoryId: "birthday_party",
    categoryName: "Birthday / Corporate / Small Party Menus",
    packageName: "Menu 02 – Special Menu",
    sinhalaName: "මෙනු 02 – ස්පෙෂල් මෙනු",
    tagline: "Grand party celebration menu with dual rice/noodles, chilli chicken, and special sambal",
    pricePerPersonLKR: 950,
    priceDisplay: "Rs. 950 / Person",
    minGuests: 35,
    popular: true,
    idealFor: "Corporate Functions, Birthday Celebrations, Evening Gatherings",
    highlights: [
      "Egg Fried Rice / White Rice & Egg Noodles",
      "Chilli Chicken & Potato Baji",
      "Stir-Fried Vegetables & Brinjal Moju",
      "Fried Onion & Maldive Fish Sambal",
    ],
    menuSections: [
      {
        title: "Included Menu Items",
        items: [
          "Egg Fried Rice / White Rice",
          "Egg Noodles",
          "Chilli Chicken",
          "Potato Baji",
          "Stir-Fried Vegetables",
          "Brinjal Moju",
          "Fish Cutlet",
          "Fried Onion & Maldive Fish Sambal",
          "Papadam",
        ],
      },
    ],
  },
  {
    id: "party-menu-03",
    categoryId: "birthday_party",
    categoryName: "Birthday / Corporate / Small Party Menus",
    packageName: "Menu 03 – Sri Lankan Menu",
    sinhalaName: "මෙනු 03 – ශ්‍රී ලාංකේය මෙනු",
    tagline: "Authentic Sri Lankan party spread featuring yellow rice and chicken kuruma",
    pricePerPersonLKR: 950,
    priceDisplay: "Rs. 950 / Person",
    minGuests: 35,
    idealFor: "Traditional Party Feasts, Family Celebrations, Corporate Dinners",
    highlights: [
      "Fragrant Yellow Rice",
      "Chicken Kuruma & Brinjal Moju",
      "Mixed Vegetable Salad & Potato Tempered",
      "Dhaal Curry, Fish Cutlet & Papadam",
    ],
    menuSections: [
      {
        title: "Included Menu Items",
        items: [
          "Yellow Rice",
          "Chicken Kuruma",
          "Mixed Vegetable Salad",
          "Brinjal Moju",
          "Dhaal Curry",
          "Potato Tempered",
          "Fish Cutlet",
          "Papadam",
        ],
      },
    ],
  },

  // 2. BANA / ALMS-GIVING MENUS
  {
    id: "bana-menu-01",
    categoryId: "bana_alms",
    categoryName: "Bana / Alms-Giving Menus",
    packageName: "Menu 01 – Tradition Bana Menu",
    sinhalaName: "මෙනු 01 – පාරම්පරික බණ මෙනු",
    tagline: "Simple & traditional Bana & Dane offering with string hoppers and chicken red curry",
    pricePerPersonLKR: 700,
    priceDisplay: "Rs. 700 / Person",
    minGuests: 35,
    idealFor: "Evening Bana Sermons, Morning Hil Dane, Family Alms Giving",
    highlights: [
      "Red Rice / White Rice & String Hoppers",
      "Chicken Red Curry",
      "Seeni Sambal & Pol Sambal",
      "Dhaal Curry & Bean Curry",
    ],
    menuSections: [
      {
        title: "Included Menu Items",
        items: [
          "Red Rice / White Rice",
          "String Hoppers",
          "Chicken Red Curry",
          "Seeni Sambal",
          "Pol Sambal",
          "Dhaal Curry",
          "Bean Curry",
        ],
      },
    ],
  },
  {
    id: "bana-menu-02",
    categoryId: "bana_alms",
    categoryName: "Bana / Alms-Giving Menus",
    packageName: "Menu 02 – Fish Menu",
    sinhalaName: "මෙනු 02 – මාළු මෙනු",
    tagline: "Village style seafood alms-giving spread with choice of Bala, Tuna, or Thalapath fish",
    pricePerPersonLKR: 800,
    priceDisplay: "Bala: Rs. 800 | Tuna: Rs. 950 | Thalapath: Rs. 1,000",
    minGuests: 35,
    popular: true,
    idealFor: "Sanghika Dane, Village Seafood Feasts, Alms Giving Ceremonies",
    highlights: [
      "Bala Fish — Rs. 800/= per person",
      "Tuna Fish — Rs. 950/= per person",
      "Thalapath Fish — Rs. 1,000/= per person",
      "Fish Ambul Thiyal & Fried Gotukola Cashew Sambal",
    ],
    menuSections: [
      {
        title: "Included Menu Items",
        items: [
          "White Rice & Red Rice",
          "Fish Ambul Thiyal",
          "Dhaal Curry",
          "Bean Curry",
          "Potato Tempered",
          "Fried Gotukola, Onion & Cashew Sambal",
          "Fish Cutlet",
          "Papadam & Chilli Pods",
        ],
      },
    ],
  },
  {
    id: "bana-menu-03",
    categoryId: "bana_alms",
    categoryName: "Bana / Alms-Giving Menus",
    packageName: "Menu 03 – Special Bana Menu",
    sinhalaName: "මෙනු 03 – ස්පෙෂල් බණ මෙනු",
    tagline: "Grand alms-giving feast with fried rice, white rice, fried chicken curry, and chickpea curry",
    pricePerPersonLKR: 1100,
    priceDisplay: "Rs. 1,100 / Person",
    minGuests: 35,
    idealFor: "Maha Sangha Dane, 3-Month & 1-Year Alms Givings, Grand Ceremonies",
    highlights: [
      "Fried Rice & White Rice",
      "Fried Chicken Curry & Chickpea Curry",
      "Vegetable Chopsy / Salad & Potato Tempered",
      "Umbalakada Sambal & Fish Cutlet",
    ],
    menuSections: [
      {
        title: "Included Menu Items",
        items: [
          "Fried Rice",
          "White Rice",
          "Fried Chicken Curry",
          "Chickpea Curry",
          "Vegetable Chopsy / Vegetable Salad",
          "Potato Tempered",
          "Umbalakada Sambal",
          "Fish Cutlet",
          "Papadam & Chilli Pods",
        ],
      },
    ],
  },

  // 3. FUNERAL MENUS
  {
    id: "funeral-menu-01",
    categoryId: "funeral",
    categoryName: "Funeral Menus",
    packageName: "Menu 01 – Traditional Menu",
    sinhalaName: "මෙනු 01 – පාරම්පරික මෙනු",
    tagline: "Comforting traditional meal featuring Linna fish curry and fresh village mallum",
    pricePerPersonLKR: 550,
    priceDisplay: "Rs. 550 / Person",
    minGuests: 35,
    idealFor: "Funeral Gatherings, Wake Dinners, Memorial Services",
    highlights: [
      "White Rice & Red Rice",
      "Linna Fish Curry",
      "Dhaal Curry & Potato Tempered",
      "Long Bean Curry & Kos / Mannyok Mallum",
    ],
    menuSections: [
      {
        title: "Included Menu Items",
        items: [
          "White Rice & Red Rice",
          "Linna Fish Curry",
          "Dhaal Curry",
          "Potato Tempered",
          "Long Bean Curry",
          "Kos Mallum / Mannyok Mallum",
          "Papadam",
        ],
      },
    ],
  },
  {
    id: "funeral-menu-02",
    categoryId: "funeral",
    categoryName: "Funeral Menus",
    packageName: "Menu 02 – Chicken Menu",
    sinhalaName: "මෙනු 02 – චිකන් මෙනු",
    tagline: "Homestyle Sri Lankan meal with chicken curry, polos maluwa, and gotukola sambal",
    pricePerPersonLKR: 550,
    priceDisplay: "Rs. 550 / Person",
    minGuests: 35,
    popular: true,
    idealFor: "Funeral House Refreshments, Evening Gatherings, Homestyle Comfort Meals",
    highlights: [
      "White Rice & Red Rice",
      "Chicken Curry & Potato Curry",
      "Gotukola Sambal",
      "Polos Maluwa / Mannyok Maluwa & Mango / Amberella Maluwa",
    ],
    menuSections: [
      {
        title: "Included Menu Items",
        items: [
          "White Rice & Red Rice",
          "Chicken Curry",
          "Potato Curry",
          "Gotukola Sambal",
          "Polos Maluwa / Mannyok Maluwa",
          "Mango / Amberella Maluwa",
          "Papadam",
        ],
      },
    ],
  },

  // 4. MALA BATHA MENUS
  {
    id: "mala-batha-menu-01",
    categoryId: "mala_batha",
    categoryName: "Mala Batha Menus",
    packageName: "Menu 01 – Basic Menu",
    sinhalaName: "මෙනු 01 – බේසික් මෙනු",
    tagline: "Simple traditional Mala Batha with Katta Karawala curry and Wattakka curry",
    pricePerPersonLKR: 490,
    priceDisplay: "Rs. 490 / Person",
    minGuests: 35,
    idealFor: "Traditional Mala Batha Offerings, Post-Funeral Gatherings",
    highlights: [
      "White Rice",
      "Katta Karawala Curry",
      "Wattakka Curry & Cucumber Salad",
      "Bean Tempered & Papadam",
    ],
    menuSections: [
      {
        title: "Included Menu Items",
        items: [
          "White Rice",
          "Katta Karawala Curry",
          "Wattakka Curry",
          "Cucumber Salad",
          "Bean Tempered",
          "Papadam",
        ],
      },
    ],
  },
  {
    id: "mala-batha-menu-02",
    categoryId: "mala_batha",
    categoryName: "Mala Batha Menus",
    packageName: "Menu 02 – Special Menu",
    sinhalaName: "මෙනු 02 – ස්පෙෂල් මෙනු",
    tagline: "Complete Mala Batha feast with dual rice, Katta Karawala, Fish Ambul Thiyal / Chicken Curry, and cashew sambal",
    pricePerPersonLKR: 1050,
    priceDisplay: "Rs. 1,050 / Person",
    minGuests: 35,
    popular: true,
    idealFor: "Grand Mala Batha Gatherings, Family Memorial Rituals",
    highlights: [
      "White Rice & Red Rice",
      "Katta Karawala Curry & Wattakka Curry",
      "Fish Ambul Thiyal / Chicken Curry",
      "Kos Mallum / Mannyok Mallum & Fried Gotukola Rata Kajju Sambal",
    ],
    menuSections: [
      {
        title: "Included Menu Items",
        items: [
          "White Rice & Red Rice",
          "Katta Karawala Curry",
          "Wattakka Curry",
          "Cucumber Salad",
          "Bean Tempered",
          "Fish Ambul Thiyal / Chicken Curry",
          "Kos Mallum / Mannyok Mallum",
          "Fried Gotukola, Rata Kajju Sambal",
          "Papadam",
        ],
      },
    ],
  },

  // 5. CUSTOMIZABLE TAILOR-MADE PACKAGES
  {
    id: "custom-package",
    categoryId: "custom",
    categoryName: "Customizable Packages",
    packageName: "100% Tailor-Made Custom Catering Menu",
    sinhalaName: "ඔබේ මනාපය පරිදි සැකසූ විශේෂ පැකේජය",
    tagline: "Hand-pick every single dish, action station, and presentation style according to your exact budget & taste",
    pricePerPersonLKR: null,
    priceDisplay: "No Fixed Price — Contact for Custom Quote",
    minGuests: 35,
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
// CATERING ADD-ONS & ENHANCEMENTS
// ==========================================

export interface CateringAddonCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  items: {
    name: string;
    priceDisplay: string;
    description?: string;
    options?: string[];
  }[];
}

export const CATERING_ADDONS: CateringAddonCategory[] = [
  {
    id: "buffet_setup",
    title: "1. Full Buffet Setup",
    subtitle: "Complete elegant buffet table setup, frills, tableware, glasses & serviettes",
    icon: "UtensilsCrossed",
    items: [
      {
        name: "Full Buffet Setup Package",
        priceDisplay: "Rs. 150 / Person",
        options: [
          "Buffet serving dishes",
          "Buffet table with frills",
          "Dinner plates",
          "Water glasses",
          "Paper serviettes",
        ],
      },
    ],
  },
  {
    id: "welcome_drinks",
    title: "2. Welcome Drinks",
    subtitle: "Refreshing welcome cordials, fresh fruit juices & iced coffee choices",
    icon: "GlassWater",
    items: [
      {
        name: "Cordial",
        priceDisplay: "Rs. 100 / Person",
        options: ["Orange", "Strawberry", "Guava", "Blackcurrant"],
      },
      {
        name: "Fresh Juice",
        priceDisplay: "Rs. 320 / Person",
        options: ["Watermelon", "Pineapple", "Mango"],
      },
      {
        name: "Iced Coffee",
        priceDisplay: "Rs. 260 / Person",
      },
    ],
  },
  {
    id: "desserts",
    title: "3. Artisanal Desserts",
    subtitle: "Delicious handcrafted puddings, fresh fruit platters & specialty sweets",
    icon: "IceCream",
    items: [
      { name: "Cream Caramel Pudding", priceDisplay: "Rs. 150 / Person" },
      { name: "Watalappan", priceDisplay: "Rs. 180 / Person" },
      { name: "Biscuit Pudding", priceDisplay: "Rs. 220 / Person" },
      {
        name: "Fresh Cut Fruit Platter",
        priceDisplay: "Rs. 260 / Person",
        options: ["Watermelon", "Mango", "Pineapple", "Papaya"],
      },
      { name: "Fruit Trifle", priceDisplay: "Rs. 380 / Person" },
      { name: "Strawberry Tres Leches", priceDisplay: "Rs. 410 / Person" },
    ],
  },
];

// ==========================================
// RESTAURANT FOOD & BEVERAGE MENU (DINE-IN)
// ==========================================

export const MENU_CATEGORIES = [
  { id: "all", name: "All Dishes", sinhalaName: "සියලුම කෑම වර්ග", icon: "UtensilsCrossed" },
  { id: "fried_rice_basmathi", name: "Fried Rice (Basmathi)", sinhalaName: "ෆ්‍රයිඩ් රයිස් (බස්මති)", icon: "Soup" },
  { id: "fried_rice_kiri_samba", name: "Fried Rice (Kiri Samba)", sinhalaName: "ෆ්‍රයිඩ් රයිස් (කිරි සම්බා)", icon: "Soup" },
  { id: "chopsy_rice_basmathi", name: "Chopsy Rice (Basmathi)", sinhalaName: "චොප්සි රයිස් (බස්මති)", icon: "Sparkles" },
  { id: "madara_special_rice", name: "Madara Special Fried Rice", sinhalaName: "මදාරා ස්පෙෂල් රයිස්", icon: "Flame" },
  { id: "koththu", name: "Koththu & Cheese Koththu", sinhalaName: "කොත්තු සහ චීස් කොත්තු", icon: "ChefHat" },
  { id: "side_chicken", name: "Side Dishes — Chicken", sinhalaName: "අතුරු පස - චිකන්", icon: "ChefHat" },
  { id: "side_fish", name: "Side Dishes — Fish", sinhalaName: "අතුරු පස - මාළු", icon: "Fish" },
  { id: "side_mix_grill", name: "Side Dishes — Mix Grill", sinhalaName: "අතුරු පස - මික්ස් ග්‍රිල්", icon: "Flame" },
  { id: "side_pork", name: "Side Dishes — Pork", sinhalaName: "අතුරු පස - පෝර්ක්", icon: "Sparkles" },
  { id: "side_egg", name: "Side Dishes — Egg", sinhalaName: "අතුරු පස - බිත්තර", icon: "Coffee" },
  { id: "side_veg", name: "Side Dishes — Vegetable", sinhalaName: "අතුරු පස - එළවළු", icon: "Sparkles" },
  { id: "side_seafood", name: "Side Dishes — Seafood", sinhalaName: "අතුරු පස - සීෆුඩ්", icon: "Fish" },
];

export const MENU_ITEMS: MenuItem[] = [
  // 1. Fried Rice (Basmathi)
  {
    id: "fr-bas-veg",
    name: "Vegetable Fried Rice (Basmathi)",
    sinhalaName: "එළවළු ෆ්‍රයිඩ් රයිස් (බස්මති)",
    category: "fried_rice_basmathi",
    priceLKR: 550,
    description: "Steamed basmathi rice tossed with mixed vegetables.",
    portion: "S: 550 | M: 1,000 | L: 1,550",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 550 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1000 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1550 },
    ],
    image: menuImg1.src,
    tags: ["Basmathi", "Vegetable", "Fried Rice"],
    allergens: ["Sesame", "Soy", "Gluten"],
    isVegetarian: true,
  },
  {
    id: "fr-bas-egg",
    name: "Egg Fried Rice (Basmathi)",
    sinhalaName: "බිත්තර ෆ්‍රයිඩ් රයිස් (බස්මති)",
    category: "fried_rice_basmathi",
    priceLKR: 670,
    description: "Steamed basmathi rice tossed with scrambled egg pieces.",
    portion: "S: 670 | M: 1,250 | L: 1,800",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 670 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1250 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1800 },
    ],
    image: menuImg1.src,
    tags: ["Basmathi", "Egg", "Fried Rice"],
    allergens: ["Egg", "Sesame", "Soy", "Gluten"],
  },
  {
    id: "fr-bas-chicken",
    name: "Chicken Fried Rice (Basmathi)",
    sinhalaName: "චිකන් ෆ්‍රයිඩ් රයිස් (බස්මති)",
    category: "fried_rice_basmathi",
    priceLKR: 700,
    description: "Steamed basmathi rice tossed with diced chicken.",
    portion: "S: 700 | M: 1,350 | L: 2,000",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 700 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1350 },
      { size: "L", label: "Large Portion (L)", priceLKR: 2000 },
    ],
    image: menuImg1.src,
    tags: ["Basmathi", "Chicken", "Fried Rice"],
    allergens: ["Sesame", "Soy", "Gluten"],
  },
  {
    id: "fr-bas-seafood",
    name: "Seafood Fried Rice (Basmathi)",
    sinhalaName: "සීෆුඩ් ෆ්‍රයිඩ් රයිස් (බස්මති)",
    category: "fried_rice_basmathi",
    priceLKR: 800,
    description: "Steamed basmathi rice tossed with mixed seafood fish, prawn and cuttlefish.",
    portion: "S: 800 | M: 1,550 | L: 2,200",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 800 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1550 },
      { size: "L", label: "Large Portion (L)", priceLKR: 2200 },
    ],
    image: menuImg1.src,
    tags: ["Basmathi", "Seafood", "Fish, Prawn & Cuttlefish"],
    allergens: ["Seafood/Crustaceans", "Sesame", "Soy", "Gluten"],
  },
  {
    id: "fr-bas-mix",
    name: "Mix Fried Rice (Basmathi)",
    sinhalaName: "මික්ස් ෆ්‍රයිඩ් රයිස් (බස්මති)",
    category: "fried_rice_basmathi",
    priceLKR: 850,
    description: "Steamed basmathi rice combined with a mix of seafood, chicken and sausages and egg.",
    portion: "S: 850 | M: 1,700 | L: 2,350",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 850 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1700 },
      { size: "L", label: "Large Portion (L)", priceLKR: 2350 },
    ],
    image: menuImg1.src,
    tags: ["Basmathi", "Mixed Proteins", "Chef Special"],
    allergens: ["Egg", "Seafood/Crustaceans", "Sesame", "Soy", "Gluten"],
  },
  {
    id: "fr-bas-nasi",
    name: "Nasi Goreng (Basmathi)",
    sinhalaName: "නාසි ගෝරෙන් (බස්මති)",
    category: "fried_rice_basmathi",
    priceLKR: 850,
    description: "Indonesian-style steamed rice with a sweet-savory chili paste flavor profile.",
    portion: "S: 850 | M: 1,700 | L: 2,350",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 850 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1700 },
      { size: "L", label: "Large Portion (L)", priceLKR: 2350 },
    ],
    image: menuImg1.src,
    tags: ["Indonesian Style", "Spicy Sweet", "Nasi Goreng"],
    allergens: ["Egg", "Seafood/Crustaceans (paste)", "Sesame", "Soy", "Gluten", "Pineapple"],
  },

  // 2. Fried Rice (Kiri Samba)
  {
    id: "fr-ks-veg",
    name: "Vegetable Fried Rice (Kiri Samba)",
    sinhalaName: "එළවළු ෆ්‍රයිඩ් රයිස් (කිරි සම්බා)",
    category: "fried_rice_kiri_samba",
    priceLKR: 450,
    description: "Traditional short-grain Kiri Samba rice stir-fried with mixed vegetables.",
    portion: "S: 450 | M: 800 | L: 1,350",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 450 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 800 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1350 },
    ],
    image: menuImg1.src,
    tags: ["Kiri Samba", "Vegetable", "Short Grain"],
    allergens: ["Sesame", "Soy", "Gluten"],
    isVegetarian: true,
  },
  {
    id: "fr-ks-egg",
    name: "Egg Fried Rice (Kiri Samba)",
    sinhalaName: "බිත්තර ෆ්‍රයිඩ් රයිස් (කිරි සම්බා)",
    category: "fried_rice_kiri_samba",
    priceLKR: 550,
    description: "Short-grain Kiri Samba fried rice with scrambled egg.",
    portion: "S: 550 | M: 1,050 | L: 1,420",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 550 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1050 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1420 },
    ],
    image: menuImg1.src,
    tags: ["Kiri Samba", "Egg", "Short Grain"],
    allergens: ["Egg", "Sesame", "Soy", "Gluten"],
  },
  {
    id: "fr-ks-chicken",
    name: "Chicken Fried Rice (Kiri Samba)",
    sinhalaName: "චිකන් ෆ්‍රයිඩ් රයිස් (කිරි සම්බා)",
    category: "fried_rice_kiri_samba",
    priceLKR: 600,
    description: "Short-grain Kiri Samba fried rice with chicken pieces.",
    portion: "S: 600 | M: 1,200 | L: 1,800",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 600 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1200 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1800 },
    ],
    image: menuImg1.src,
    tags: ["Kiri Samba", "Chicken", "Short Grain"],
    allergens: ["Sesame", "Soy", "Gluten"],
  },
  {
    id: "fr-ks-seafood",
    name: "Seafood Fried Rice (Kiri Samba)",
    sinhalaName: "සීෆුඩ් ෆ්‍රයිඩ් රයිස් (කිරි සම්බා)",
    category: "fried_rice_kiri_samba",
    priceLKR: 700,
    description: "Short-grain Kiri Samba fried rice with mixed seafood.",
    portion: "S: 700 | M: 1,350 | L: 2,050",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 700 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1350 },
      { size: "L", label: "Large Portion (L)", priceLKR: 2050 },
    ],
    image: menuImg1.src,
    tags: ["Kiri Samba", "Seafood", "Short Grain"],
    allergens: ["Seafood/Crustaceans", "Sesame", "Soy", "Gluten"],
  },
  {
    id: "fr-ks-mix",
    name: "Mix Fried Rice (Kiri Samba)",
    sinhalaName: "මික්ස් ෆ්‍රයිඩ් රයිස් (කිරි සම්බා)",
    category: "fried_rice_kiri_samba",
    priceLKR: 750,
    description: "Short-grain Kiri Samba fried rice loaded with mixed proteins - chicken, seafood, sausage and egg.",
    portion: "S: 750 | M: 1,550 | L: 2,100",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 750 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1550 },
      { size: "L", label: "Large Portion (L)", priceLKR: 2100 },
    ],
    image: menuImg1.src,
    tags: ["Kiri Samba", "Mixed Proteins", "Short Grain"],
    allergens: ["Egg", "Seafood/Crustaceans", "Sesame", "Soy", "Gluten"],
  },

  // 3. Chopsy Rice (Basmathi)
  {
    id: "chopsy-veg",
    name: "Vegetable Rice (Chopsy)",
    sinhalaName: "එළවළු චොප්සි බත් (බස්මති)",
    category: "chopsy_rice_basmathi",
    priceLKR: 1450,
    description: "Basmathi rice served with a vegetable chop suey gravy/stir-fry.",
    portion: "M: 1,450 | L: 2,250",
    portions: [
      { size: "M", label: "Medium Portion (M)", priceLKR: 1450 },
      { size: "L", label: "Large Portion (L)", priceLKR: 2250 },
    ],
    image: menuImg3.src,
    tags: ["Chopsy Rice", "Vegetable", "Chop Suey Gravy"],
    allergens: ["Soy", "Gluten", "Sesame"],
    isVegetarian: true,
  },
  {
    id: "chopsy-chicken",
    name: "Chicken Rice (Chopsy)",
    sinhalaName: "චිකන් චොප්සි බත් (බස්මති)",
    category: "chopsy_rice_basmathi",
    priceLKR: 1550,
    description: "Basmathi rice served with chicken chop suey gravy/stir-fry.",
    portion: "M: 1,550 | L: 2,350",
    portions: [
      { size: "M", label: "Medium Portion (M)", priceLKR: 1550 },
      { size: "L", label: "Large Portion (L)", priceLKR: 2350 },
    ],
    image: menuImg3.src,
    tags: ["Chopsy Rice", "Chicken", "Chop Suey Gravy"],
    allergens: ["Soy", "Gluten", "Sesame"],
  },
  {
    id: "chopsy-mix",
    name: "Mix Rice (Chopsy)",
    sinhalaName: "මික්ස් චොප්සි බත් (බස්මති)",
    category: "chopsy_rice_basmathi",
    priceLKR: 1650,
    description: "Basmathi rice served with mixed meat chop suey gravy/stir-fry.",
    portion: "M: 1,650 | L: 2,500",
    portions: [
      { size: "M", label: "Medium Portion (M)", priceLKR: 1650 },
      { size: "L", label: "Large Portion (L)", priceLKR: 2500 },
    ],
    image: menuImg3.src,
    tags: ["Chopsy Rice", "Mixed Meat", "Chop Suey Gravy"],
    allergens: ["Soy", "Gluten", "Seafood", "Sesame"],
  },
  {
    id: "chopsy-seafood",
    name: "Seafood Rice (Chopsy)",
    sinhalaName: "සීෆුඩ් චොප්සි බත් (බස්මති)",
    category: "chopsy_rice_basmathi",
    priceLKR: 1600,
    description: "Basmathi rice served with seafood chop suey gravy/stir-fry.",
    portion: "M: 1,600 | L: 2,450",
    portions: [
      { size: "M", label: "Medium Portion (M)", priceLKR: 1600 },
      { size: "L", label: "Large Portion (L)", priceLKR: 2450 },
    ],
    image: menuImg3.src,
    tags: ["Chopsy Rice", "Seafood", "Chop Suey Gravy"],
    allergens: ["Seafood/Crustaceans", "Soy", "Gluten"],
  },

  // 4. Madara Special Fried Rice
  {
    id: "madara-special-single",
    name: "Madara Special Fried Rice — Single Portion",
    sinhalaName: "මදාරා ස්පෙෂල් ෆ්‍රයිඩ් රයිස් — තනි පෝෂන්",
    category: "madara_special_rice",
    priceLKR: 1200,
    description: "Special chopsy rice with a unique gravy, include 1 chicken drumstick.",
    portion: "Single Portion (1 Drumstick)",
    image: menuImg3.src,
    tags: ["Madara Special", "Single Portion", "1 Drumstick"],
    allergens: ["Poultry", "Soy", "Gluten", "Sesame", "Seafood"],
    isChefsSpecial: true,
  },
  {
    id: "madara-special-medium",
    name: "Madara Special Fried Rice — Medium Portion",
    sinhalaName: "මදාරා ස්පෙෂල් ෆ්‍රයිඩ් රයිස් — මධ්‍යම පෝෂන්",
    category: "madara_special_rice",
    priceLKR: 2400,
    description: "Special chopsy rice with a unique gravy, include 2 chicken drumsticks.",
    portion: "Medium Portion (2 Drumsticks)",
    image: menuImg3.src,
    tags: ["Madara Special", "Medium Portion", "2 Drumsticks"],
    allergens: ["Poultry", "Soy", "Gluten", "Sesame", "Seafood"],
    isChefsSpecial: true,
  },
  {
    id: "madara-special-large",
    name: "Madara Special Fried Rice — Large Portion",
    sinhalaName: "මදාරා ස්පෙෂල් ෆ්‍රයිඩ් රයිස් — ලාර්ජ් පෝෂන්",
    category: "madara_special_rice",
    priceLKR: 4500,
    description: "Special chopsy rice with a unique gravy, include 4 chicken drumsticks.",
    portion: "Large Portion (4 Drumsticks)",
    image: menuImg3.src,
    tags: ["Madara Special", "Large Portion", "4 Drumsticks"],
    allergens: ["Poultry", "Soy", "Gluten", "Sesame", "Seafood"],
    isChefsSpecial: true,
  },

  // 5. Koththu & Cheese Koththu
  {
    id: "kottu-veg",
    name: "Vegetable Koththu",
    sinhalaName: "එළවළු කොත්තු",
    category: "koththu",
    priceLKR: 450,
    description: "Chopped roti tossed with vegetables and spices.",
    portion: "S: 450 | M: 700 | L: 1,000",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 450 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 700 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1000 },
    ],
    image: menuImg5.src,
    tags: ["Koththu", "Vegetable", "Street Food"],
    allergens: ["Gluten (wheat)", "Egg"],
  },
  {
    id: "kottu-egg",
    name: "Egg Koththu",
    sinhalaName: "බිත්තර කොත්තු",
    category: "koththu",
    priceLKR: 600,
    description: "Chopped roti tossed with egg, vegetables, and spices.",
    portion: "S: 600 | M: 900 | L: 1,300",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 600 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 900 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1300 },
    ],
    image: menuImg5.src,
    tags: ["Koththu", "Egg", "Classic"],
    allergens: ["Egg", "Gluten (wheat)"],
  },
  {
    id: "kottu-chicken",
    name: "Chicken Koththu",
    sinhalaName: "චිකන් කොත්තු",
    category: "koththu",
    priceLKR: 700,
    description: "Chopped roti tossed with chicken, vegetables, and spices.",
    portion: "S: 700 | M: 1,050 | L: 1,550",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 700 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1050 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1550 },
    ],
    image: menuImg5.src,
    tags: ["Koththu", "Chicken", "Best Seller"],
    allergens: ["Gluten (wheat)", "Chicken", "Egg"],
  },
  {
    id: "kottu-seafood",
    name: "Seafood Koththu",
    sinhalaName: "සීෆුඩ් කොත්තු",
    category: "koththu",
    priceLKR: 800,
    description: "Chopped roti tossed with seafood, vegetables, and spices.",
    portion: "S: 800 | M: 1,300 | L: 1,750",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 800 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1300 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1750 },
    ],
    image: menuImg5.src,
    tags: ["Koththu", "Seafood", "Spicy"],
    allergens: ["Seafood/Crustaceans", "Gluten (wheat)", "Egg"],
  },
  {
    id: "kottu-dolphin",
    name: "Dolphin Koththu",
    sinhalaName: "ඩොල්ෆින් කොත්තු",
    category: "koththu",
    priceLKR: 800,
    description: "Chopped roti specialty mix (local style).",
    portion: "S: 800 | M: 1,350 | L: 1,750",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 800 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1350 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1750 },
    ],
    image: menuImg5.src,
    tags: ["Koththu", "Dolphin Style", "Local Specialty"],
    allergens: ["Gluten (wheat)", "Chicken", "Egg"],
  },
  {
    id: "kottu-cheese-chicken",
    name: "Cheese Koththu — Chicken",
    sinhalaName: "චීස් කොත්තු — චිකන්",
    category: "koththu",
    priceLKR: 950,
    description: "Chicken koththu finished with melted cheese.",
    portion: "S: 950 | M: 1,350 | L: 1,700",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 950 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1350 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1700 },
    ],
    image: menuImg5.src,
    tags: ["Cheese Koththu", "Chicken", "Cheesy"],
    allergens: ["Dairy (cheese)", "Gluten (wheat)", "Chicken", "Egg"],
  },
  {
    id: "kottu-cheese-seafood",
    name: "Cheese Koththu — Seafood",
    sinhalaName: "චීස් කොත්තු — සීෆුඩ්",
    category: "koththu",
    priceLKR: 1100,
    description: "Seafood koththu finished with melted cheese.",
    portion: "S: 1,100 | M: 1,450 | L: 1,900",
    portions: [
      { size: "S", label: "Small Portion (S)", priceLKR: 1100 },
      { size: "M", label: "Medium Portion (M)", priceLKR: 1450 },
      { size: "L", label: "Large Portion (L)", priceLKR: 1900 },
    ],
    image: menuImg5.src,
    tags: ["Cheese Koththu", "Seafood", "Cheesy"],
    allergens: ["Dairy (cheese)", "Seafood/Crustaceans", "Gluten (wheat)", "Egg"],
  },

  // 6. Side Dishes — Chicken
  {
    id: "side-chicken-devel",
    name: "Chicken Devel",
    sinhalaName: "චිකන් ඩෙවල්",
    category: "side_chicken",
    priceLKR: 1300,
    description: "Tossed semi-dry spicy/sweet devilled chicken.",
    portion: "Full Portion",
    image: menuImg2.src,
    tags: ["Chicken", "Devilled", "Spicy Sweet"],
    allergens: ["Soy", "Gluten"],
    isByobPairing: true,
  },
  {
    id: "side-chicken-stew",
    name: "Chicken Stew",
    sinhalaName: "චිකන් ස්ටූ",
    category: "side_chicken",
    priceLKR: 1300,
    description: "Mild broth-based chicken curry/stew.",
    portion: "Full Portion",
    image: menuImg2.src,
    tags: ["Chicken", "Stew", "Mild Curry"],
    allergens: ["Mustard", "Soy"],
  },
  {
    id: "side-chicken-garlic",
    name: "Chicken Fried with Garlic",
    sinhalaName: "සුදු ළූණු සමග බැදපු චිකන්",
    category: "side_chicken",
    priceLKR: 1300,
    description: "Deep-fried chicken tossed with garlic bits.",
    portion: "Full Portion",
    image: menuImg2.src,
    tags: ["Chicken", "Garlic Fried", "Crispy"],
    allergens: ["Gluten", "Soy"],
    isByobPairing: true,
  },
  {
    id: "side-chicken-chilli-cashew",
    name: "Chilli Chicken with Cashew",
    sinhalaName: "කජු සමග චිලි චිකන්",
    category: "side_chicken",
    priceLKR: 1500,
    description: "Stir-fried chili chicken cooked with cashew nuts.",
    portion: "Full Portion",
    image: menuImg2.src,
    tags: ["Chilli Chicken", "Cashew Nuts", "Stir Fry"],
    allergens: ["Tree nuts (cashew)", "Soy", "Gluten"],
  },

  // 7. Side Dishes — Fish
  {
    id: "side-fish-fried",
    name: "Fried Fish",
    sinhalaName: "බැදපු මාළු",
    category: "side_fish",
    priceLKR: 1500,
    description: "Deep-fried battered fish pieces.",
    portion: "Full Portion",
    image: menuImg2.src,
    tags: ["Fish", "Fried", "Battered"],
    allergens: ["Fish", "Gluten"],
  },
  {
    id: "side-fish-hot-garlic",
    name: "Hot Garlic Fish",
    sinhalaName: "හොට් ගාලික් ෆිෂ්",
    category: "side_fish",
    priceLKR: 1700,
    description: "Fish tossed in a punchy hot garlic sauce.",
    portion: "Full Portion",
    image: menuImg2.src,
    tags: ["Fish", "Hot Garlic", "Spicy"],
    allergens: ["Fish", "Soy", "Gluten"],
  },
  {
    id: "side-fish-devilled",
    name: "Devilled Fish",
    sinhalaName: "මාළු ඩෙවල්",
    category: "side_fish",
    priceLKR: 1600,
    description: "Batter Fried fish tossed in a spicy-sweet devilled sauce.",
    portion: "Full Portion",
    image: menuImg2.src,
    tags: ["Fish", "Devilled", "Spicy Sweet"],
    allergens: ["Fish", "Soy", "Gluten"],
  },
  {
    id: "side-fish-handallo-500g",
    name: "Fried Handallo (500g)",
    sinhalaName: "බැදපු හඳැල්ලෝ (500g)",
    category: "side_fish",
    priceLKR: 1900,
    description: "Deep-fried small local fish (500g portion).",
    portion: "500g Portion",
    image: menuImg2.src,
    tags: ["Handallo", "Small Fish", "500g"],
    allergens: ["Fish", "Gluten"],
    isByobPairing: true,
  },
  {
    id: "side-fish-handallo-1kg",
    name: "Fried Handallo (1kg)",
    sinhalaName: "බැදපු හඳැල්ලෝ (1kg)",
    category: "side_fish",
    priceLKR: 3750,
    description: "Deep-fried small local fish (1kg portion).",
    portion: "1kg Portion",
    image: menuImg2.src,
    tags: ["Handallo", "Small Fish", "1kg"],
    allergens: ["Fish"],
    isByobPairing: true,
  },
  {
    id: "side-fish-stew",
    name: "Fish Stew",
    sinhalaName: "මාළු ස්ටූ",
    category: "side_fish",
    priceLKR: 3750,
    description: "Mild gravy fish stew portion.",
    portion: "Full Portion",
    image: menuImg2.src,
    tags: ["Fish", "Stew", "Mild Gravy"],
    allergens: ["Fish", "Mustard"],
  },

  // 8. Side Dishes — Mix Grill
  {
    id: "side-mix-grill-small",
    name: "Mix Grill — Small Portion",
    sinhalaName: "මික්ස් ග්‍රිල් — කුඩා පෝෂන්",
    category: "side_mix_grill",
    priceLKR: 3500,
    description: "Includes Crab, Chicken, Cuttlefish, Pork, Prawn, Bullseye Egg, Sausage, Baby Paraw, Potato, Sweet Corn.",
    portion: "Small Portion",
    image: menuImg7.src,
    tags: ["Mix Grill", "Seafood & Meat", "Small Platter"],
    allergens: ["Crustaceans/Seafood", "Egg", "Pork", "Poultry", "Gluten/Soy"],
    isChefsSpecial: true,
  },
  {
    id: "side-mix-grill-large",
    name: "Mix Grill — Large Portion",
    sinhalaName: "මික්ස් ග්‍රිල් — විශාල පෝෂන්",
    category: "side_mix_grill",
    priceLKR: 4990,
    description: "Includes Crab, Chicken, Cuttlefish, Pork, Prawn, Bullseye Egg, Sausage, Baby Paraw, Potato, Sweet Corn.",
    portion: "Large Portion",
    image: menuImg7.src,
    tags: ["Mix Grill", "Seafood & Meat", "Grand Platter"],
    allergens: ["Crustaceans/Seafood", "Egg", "Pork", "Poultry", "Gluten/Soy"],
    isChefsSpecial: true,
  },

  // 9. Side Dishes — Pork
  {
    id: "side-pork-devilled",
    name: "Devilled Pork",
    sinhalaName: "පෝර්ක් ඩෙවල්",
    category: "side_pork",
    priceLKR: 1550,
    description: "Pork tossed in a spicy-sweet devilled sauce.",
    portion: "Full Portion",
    image: menuImg6.src,
    tags: ["Pork", "Devilled", "Spicy Sweet"],
    allergens: ["Pork", "Soy", "Gluten"],
    isByobPairing: true,
  },
  {
    id: "side-pork-fried",
    name: "Fried Pork",
    sinhalaName: "බැදපු පෝර්ක්",
    category: "side_pork",
    priceLKR: 1400,
    description: "Fried pork pieces.",
    portion: "Full Portion",
    image: menuImg6.src,
    tags: ["Pork", "Fried", "Crispy"],
    allergens: ["Pork"],
  },
  {
    id: "side-pork-black-curry",
    name: "Black Pork Curry",
    sinhalaName: "කළු ඌරු මස් කරිය",
    category: "side_pork",
    priceLKR: 1600,
    description: "Traditional dark roasted spice pork curry.",
    portion: "Full Portion",
    image: menuImg6.src,
    tags: ["Pork", "Black Curry", "Traditional"],
    allergens: ["Pork"],
  },
  {
    id: "side-pork-stew",
    name: "Pork Stew",
    sinhalaName: "පෝර්ක් ස්ටූ",
    category: "side_pork",
    priceLKR: 1600,
    description: "Slow-cooked mild pork stew/gravy.",
    portion: "Full Portion",
    image: menuImg6.src,
    tags: ["Pork", "Stew", "Slow Cooked"],
    allergens: ["Pork", "Mustard"],
  },

  // 10. Side Dishes — Egg
  {
    id: "side-egg-bullseye",
    name: "Bullseye",
    sinhalaName: "බුල්සයි බිත්තරය",
    category: "side_egg",
    priceLKR: 100,
    description: "Fried sunny-side-up egg.",
    portion: "Single Egg",
    image: menuImg6.src,
    tags: ["Egg", "Sunny Side Up", "Bullseye"],
    allergens: ["Egg"],
  },
  {
    id: "side-egg-sl-omelet",
    name: "Sri Lankan Omelet",
    sinhalaName: "ශ්‍රී ලාංකේය ඔම්ලට්",
    category: "side_egg",
    priceLKR: 450,
    description: "Spiced local-style beaten egg omelet with onions and chili.",
    portion: "Full Omelet",
    image: menuImg6.src,
    tags: ["Egg", "Omelet", "Sri Lankan Style"],
    allergens: ["Egg"],
  },
  {
    id: "side-egg-cheese-omelet",
    name: "Cheese Omelet",
    sinhalaName: "චීස් ඔම්ලට්",
    category: "side_egg",
    priceLKR: 850,
    description: "Egg omelet folded with cheese.",
    portion: "Full Omelet",
    image: menuImg6.src,
    tags: ["Egg", "Cheese Omelet", "Cheesy"],
    allergens: ["Egg", "Dairy"],
  },
  {
    id: "side-egg-chicken-omelet",
    name: "Chicken Omelet",
    sinhalaName: "චිකන් ඔම්ලට්",
    category: "side_egg",
    priceLKR: 950,
    description: "Egg omelet loaded with minced/small chicken bits.",
    portion: "Full Omelet",
    image: menuImg6.src,
    tags: ["Egg", "Chicken Omelet"],
    allergens: ["Egg", "Poultry"],
  },
  {
    id: "side-egg-seafood-omelet",
    name: "Seafood Omelet",
    sinhalaName: "සීෆුඩ් ඔම්ලට්",
    category: "side_egg",
    priceLKR: 1100,
    description: "Egg omelet loaded with seafood bits.",
    portion: "Full Omelet",
    image: menuImg6.src,
    tags: ["Egg", "Seafood Omelet"],
    allergens: ["Egg", "Seafood/Crustaceans"],
  },

  // 11. Side Dishes — Vegetable
  {
    id: "side-veg-boiled",
    name: "Boiled Vegetables",
    sinhalaName: "තම්බන ලද එළවළු",
    category: "side_veg",
    priceLKR: 950,
    description: "Plain boiled mixed vegetables.",
    portion: "Full Plate",
    image: menuImg4.src,
    tags: ["Vegetable", "Boiled", "Healthy"],
    allergens: ["None"],
    isVegetarian: true,
  },
  {
    id: "side-veg-chopsy",
    name: "Vegetable Chopsy",
    sinhalaName: "එළවළු චොප්සි",
    category: "side_veg",
    priceLKR: 900,
    description: "Stir-fried mixed vegetable gravy/chopsuey.",
    portion: "Full Portion",
    image: menuImg4.src,
    tags: ["Vegetable", "Chop Suey", "Stir Fry"],
    allergens: ["Soy", "Gluten"],
    isVegetarian: true,
  },
  {
    id: "side-veg-hbm",
    name: "Hot Butter Mushroom",
    sinhalaName: "හොට් බටර් මෂ්රූම්",
    category: "side_veg",
    priceLKR: 800,
    description: "Battered mushrooms tossed in hot butter sauce.",
    portion: "Full Portion",
    image: menuImg4.src,
    tags: ["Mushroom", "Hot Butter", "Crispy"],
    allergens: ["Dairy (butter)", "Gluten", "Soy", "Egg"],
    isVegetarian: true,
    isByobPairing: true,
  },
  {
    id: "side-veg-tempura",
    name: "Vegetable Tempura",
    sinhalaName: "වේජ් ටෙම්පුරා",
    category: "side_veg",
    priceLKR: 950,
    description: "Batter-fried mixed vegetable fritters.",
    portion: "Full Portion",
    image: menuImg4.src,
    tags: ["Vegetable", "Tempura", "Fritters"],
    allergens: ["Gluten", "Egg"],
    isVegetarian: true,
  },
  {
    id: "side-veg-onion-rings",
    name: "Onion Rings",
    sinhalaName: "ලූණු රින්ග්ස්",
    category: "side_veg",
    priceLKR: 400,
    description: "Deep-fried battered onion rings.",
    portion: "Full Portion",
    image: menuImg4.src,
    tags: ["Onion Rings", "Snack", "Crispy"],
    allergens: ["Gluten"],
    isVegetarian: true,
  },
  {
    id: "side-veg-fries",
    name: "French Fries",
    sinhalaName: "ෆ්‍රෙන්ච් ෆ්‍රයිස්",
    category: "side_veg",
    priceLKR: 950,
    description: "Deep-fried potato fries.",
    portion: "Full Portion",
    image: menuImg4.src,
    tags: ["French Fries", "Potato", "Crispy"],
    allergens: ["None"],
    isVegetarian: true,
  },
  {
    id: "side-veg-cucumber",
    name: "Peeled Cucumber",
    sinhalaName: "පිපිඤ්ඤා ප්ලේට් එක",
    category: "side_veg",
    priceLKR: 200,
    description: "Fresh sliced/peeled cucumber plate.",
    portion: "Fresh Plate",
    image: menuImg4.src,
    tags: ["Cucumber", "Fresh Salad"],
    allergens: ["None"],
    isVegetarian: true,
  },

  // 12. Side Dishes — Seafood
  {
    id: "side-seafood-devilled-prawn",
    name: "Devilled Prawn",
    sinhalaName: "ඉස්සෝ ඩෙවල්",
    category: "side_seafood",
    priceLKR: 1450,
    description: "Prawns tossed in a spicy-sweet devilled sauce.",
    portion: "Full Portion",
    image: menuImg4.src,
    tags: ["Prawns", "Devilled", "Spicy Sweet"],
    allergens: ["Crustaceans (prawn)", "Soy", "Gluten"],
  },
  {
    id: "side-seafood-hbp",
    name: "Hot Butter Prawn",
    sinhalaName: "හොට් බටර් ඉස්සෝ",
    category: "side_seafood",
    priceLKR: 1550,
    description: "Battered prawns tossed in hot butter sauce.",
    portion: "Full Portion",
    image: menuImg4.src,
    tags: ["Prawns", "Hot Butter", "Battered"],
    allergens: ["Crustaceans (prawn)", "Dairy (butter)", "Gluten", "Soy"],
    isByobPairing: true,
  },
  {
    id: "side-seafood-hbc",
    name: "Hot Butter Cuttlefish",
    sinhalaName: "හොට් බටර් දැල්ලෝ",
    category: "side_seafood",
    priceLKR: 1550,
    description: "Battered cuttlefish tossed in hot butter sauce.",
    portion: "Full Portion",
    image: menuImg4.src,
    tags: ["Cuttlefish", "Hot Butter", "Crowd Favorite"],
    allergens: ["Seafood (cuttlefish)", "Dairy (butter)", "Gluten", "Soy"],
    isByobPairing: true,
  },
  {
    id: "side-seafood-prawn-stew",
    name: "Prawn Stew",
    sinhalaName: "ඉස්සෝ ස්ටූ",
    category: "side_seafood",
    priceLKR: 1650,
    description: "Prawn gravy stew.",
    portion: "Full Portion",
    image: menuImg4.src,
    tags: ["Prawns", "Stew", "Gravy"],
    allergens: ["Crustaceans (prawn)"],
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
    id: "kottu-chef",
    title: "Kottu Chef",
    sinhalaTitle: "කොත්තු Chef",
    category: "Kitchen",
    type: "Full-Time",
    location: RESTAURANT_INFO.address,
    experience: "කොත්තු, හොප්පර්ස් සහ short eats සෑදීමේ පළපුරුද්ද තිබීම",
    overview: "අපගේ ආපනශාලාවේ රසවත් කොත්තු, ආප්ප (hoppers) සහ short eats සකස් කිරීම සඳහා පළපුරුදු සහ ක්‍රියාශීලී කොත්තු සූපවේදියෙකු සොයයි.",
    overviewSi: "අපගේ ආපනශාලාවේ රසවත් කොත්තු, ආප්ප (hoppers) සහ short eats සකස් කිරීම සඳහා පළපුරුදු සහ ක්‍රියාශීලී කොත්තු සූපවේදියෙකු සොයයි.",
    responsibilities: [
      "Prepare delicious kottu, hoppers, and short eats.",
      "Maintain food quality, consistency, and taste.",
      "Follow kitchen hygiene and food safety standards.",
    ],
    responsibilitiesSi: [
      "රසවත් කොත්තු, හොප්පර්ස් සහ short eats සකස් කිරීම.",
      "ආහාරවල රසය සහ ගුණාත්මකභාවය පවත්වා ගැනීම.",
      "Kitchen hygiene සහ safety standards අනුගමනය කිරීම.",
    ],
    requirements: [
      "Experience in preparing kottu, hoppers, and short eats.",
      "Ability to work quickly, efficiently, and cleanly.",
      "Ability to work collaboratively as part of a team.",
    ],
    requirementsSi: [
      "කොත්තු, හොප්පර්ස් සහ short eats සෑදීමේ පළපුරුද්ද තිබීම.",
      "වේගයෙන් සහ පිරිසිදුව වැඩ කිරීමේ හැකියාව.",
      "කණ්ඩායමක් සමඟ වැඩ කිරීමට හැකියාව.",
    ],
    benefits: [
      "Attractive, competitive salary package.",
      "100% Free daily duty meals and tea.",
      "Service charge and performance bonuses.",
      "Friendly, supportive working environment.",
    ],
    benefitsSi: [
      "ආකර්ෂණීය සහ තරඟකාරී වැටුප් පැකේජයක්.",
      "රාජකාරි වේලාවන්හිදී නොමිලේ ආහාර සහ තේ පැන්.",
      "සේවා ගාස්තු (Service Charge) සහ දීමනා.",
      "සුහදශීලී සහ ගෞරවනීය සේවා පරිසරයක්.",
    ],
  },
  {
    id: "chinese-chef",
    title: "Chinese Chef",
    sinhalaTitle: "චයිනීස් Chef",
    category: "Kitchen",
    type: "Full-Time",
    location: RESTAURANT_INFO.address,
    experience: "Experience in preparing Chinese cuisine",
    overview: "Seeking an experienced Chinese Chef skilled in high-heat wok cooking, authentic fried rice, noodles, and Chinese fusion dishes.",
    overviewSi: "ආපනශාලා ප්‍රමිතීන්ට අනුකූලව රසවත් චයිනීස් ආහාර, වොක් ආහාර සහ නූඩ්ල්ස් පිළියෙල කිරීම සඳහා පළපුරුදු චයිනීස් සූපවේදියෙකු සොයයි.",
    responsibilities: [
      "Prepare Chinese dishes according to restaurant standards.",
      "Maintain food quality, taste, and presentation.",
      "Ensure proper kitchen hygiene and safety practices.",
    ],
    responsibilitiesSi: [
      "ආපනශාලා ප්‍රමිතීන්ට අනුකූලව චයිනීස් ආහාර සකස් කිරීම.",
      "ආහාරවල ගුණාත්මකභාවය, රසය සහ පිළිගැන්වීම උසස්ව පවත්වා ගැනීම.",
      "කුස්සියේ සනීපාරක්ෂාව සහ ආරක්ෂිත පුරුදු නිසි ලෙස අනුගමනය කිරීම.",
    ],
    requirements: [
      "Experience in preparing Chinese cuisine.",
      "Good knowledge of Chinese cooking techniques.",
      "Ability to work efficiently in a busy kitchen environment.",
    ],
    requirementsSi: [
      "චයිනීස් ආහාර සකස් කිරීමේ පළපුරුද්ද තිබීම.",
      "චයිනීස් පිසීමේ ක්‍රමවේදයන් පිළිබඳ මනා දැනුම.",
      "කාර්යබහුල කුස්සි පරිසරයක කාර්යක්ෂමව වැඩ කිරීමේ හැකියාව.",
    ],
    benefits: [
      "Attractive salary package based on expertise.",
      "Free daily duty meals and refreshments.",
      "Service charge and live event bonuses.",
      "Modern commercial kitchen wok setup.",
    ],
    benefitsSi: [
      "දක්ෂතාවය සහ පළපුරුද්ද මත ආකර්ෂණීය වැටුප්.",
      "නොමිලේ දෛනික ආහාර සහ තේ පැන්.",
      "සේවා ගාස්තු සහ කේටරින් දීමනා.",
      "නවීන වොක් උපකරණ සහිත සේවා ස්ථානයක්.",
    ],
  },
  {
    id: "rice-curry-chef",
    title: "Rice & Curry Chef (Bulk Cooking)",
    sinhalaTitle: "රයිස් ඇන්ඩ් කරි Chef (Bulk Cooking)",
    category: "Kitchen",
    type: "Full-Time",
    location: RESTAURANT_INFO.address,
    experience: "Previous experience in bulk cooking required",
    overview: "Looking for a dedicated Sri Lankan Rice & Curry Chef specialized in high-volume bulk cooking (500+ lunch packets & catering portions per day).",
    overviewSi: "දිනකට දිවා ආහාර පැකට් 500+ ඉක්මවූ තොග පිසීම් (Bulk Cooking) සහ උත්සව කේටරින් සේවා සඳහා පළපුරුදු ශ්‍රී ලාංකේය රයිස් ඇන්ඩ් කරි ප්‍රධාන සූපවේදියෙකු සොයයි.",
    responsibilities: [
      "Prepare large-scale rice and curry meals (500+ lunch portions per day).",
      "Handle all aspects of Sri Lankan rice and curry preparation.",
      "Maintain consistent taste, quality, and food safety standards.",
    ],
    responsibilitiesSi: [
      "මහා පරිමාණ සහල් සහ ව්‍යංජන ආහාර වේල් සකස් කිරීම (දිනකට දිවා ආහාර පැකට් 500+).",
      "ශ්‍රී ලාංකේය රයිස් ඇන්ඩ් කරි පිළියෙල කිරීමේ සියලු අංශ හැසිරවීම.",
      "ස්ථාවර රසය, ගුණාත්මකභාවය සහ ආහාර සුරක්ෂිතතා ප්‍රමිතීන් පවත්වා ගැනීම.",
    ],
    requirements: [
      "Previous experience in bulk cooking is required.",
      "Should have experience preparing a variety of rice and curry dishes.",
      "Ability to manage high-volume kitchen operations.",
    ],
    requirementsSi: [
      "තොග වශයෙන් ආහාර පිසීමේ (Bulk Cooking) පෙර පළපුරුද්ද අනිවාර්ය වේ.",
      "විවිධ රයිස් ඇන්ඩ් කරි ව්‍යංජන වර්ග සකස් කිරීමේ පළපුරුද්ද තිබීම.",
      "ඉහළ පරිමාවකින් යුත් කුස්සි මෙහෙයුම් කළමනාකරණය කිරීමේ හැකියාව.",
    ],
    benefits: [
      "High, competitive salary negotiable based on bulk cooking skill.",
      "Free duty meals and refreshments provided.",
      "Large-scale catering incentives and annual bonuses.",
      "Spacious, well-equipped commercial kitchen environment.",
    ],
    benefitsSi: [
      "තොග පිසීමේ පළපුරුද්ද මත ඉහළ ආකර්ෂණීය වැටුප්.",
      "නොමිලේ දෛනික ආහාර සහ තේ පැන්.",
      "කේටරින් දීමනා සහ විශේෂ ප්‍රසාද දීමනා.",
      "විශාල වාණිජ කුස්සි පරිශ්‍රයක සේවය කිරීමේ අවස්ථාව.",
    ],
  },
  {
    id: "kitchen-helper",
    title: "Kitchen Helper",
    sinhalaTitle: "කුස්සි සහයක (Kitchen Helper)",
    category: "Kitchen",
    type: "Full-Time / Part-Time",
    location: RESTAURANT_INFO.address,
    experience: "Trainees & experienced candidates welcome",
    overview: "Energetic and enthusiastic Kitchen Helpers needed to assist chefs with ingredient preparation, mise en place, and maintaining kitchen order.",
    overviewSi: "අපගේ ප්‍රධාන සූපවේදීන්ට අමුද්‍රව්‍ය සූදානම් කිරීම, කපා කොටා ගැනීම සහ කුස්සියේ පිළිවෙළ පවත්වා ගැනීම සඳහා පුහුණු හෝ නුපුහුණු සහයකයින් සොයයි.",
    responsibilities: [
      "Assist chefs with daily kitchen operations.",
      "Prepare ingredients and maintain kitchen cleanliness.",
      "Support smooth workflow inside the kitchen.",
    ],
    responsibilitiesSi: [
      "දෛනික කුස්සි මෙහෙයුම් සඳහා ප්‍රධාන සූපවේදීන්ට සහාය වීම.",
      "අමුද්‍රව්‍ය සූදානම් කිරීම සහ කුස්සියේ පිරිසිදුකම පවත්වා ගැනීම.",
      "කුස්සිය තුළ සුමට කාර්ය ප්‍රවාහයකට සහාය වීම.",
    ],
    requirements: [
      "Trainees and experienced candidates are welcome.",
      "Willingness to learn and work as part of a team.",
      "Hardworking and responsible attitude.",
    ],
    requirementsSi: [
      "පුහුණු හෝ නුපුහුණු (Trainees) ඕනෑම අයෙකුට අයදුම් කළ හැක.",
      "ඉගෙනීමට ඇති උනන්දුව සහ කණ්ඩායමක් ලෙස වැඩ කිරීමේ හැකියාව.",
      "මහන්සි වී වැඩ කරන, වගකීම් සහගත ආකල්පය.",
    ],
    benefits: [
      "Good starting salary with on-time payment.",
      "Free meals provided on every shift.",
      "Hands-on culinary training with growth opportunities.",
    ],
    benefitsSi: [
      "නියමිත වේලාවට ලබාදෙන ආරම්භක වැටුප්.",
      "සෑම වැඩ මුරයකදීම නොමිලේ ආහාර.",
      "සූපවේදීන්ගෙන් සෘජු වෘත්තීය පුහුණුව හා උසස්වීම් අවස්ථා.",
    ],
  },
  {
    id: "cleaner",
    title: "Cleaner",
    sinhalaTitle: "පිරිසිදු කිරීමේ සේවක (Cleaner)",
    category: "Hygiene & Utility",
    type: "Full-Time",
    location: RESTAURANT_INFO.address,
    experience: "No previous experience required",
    overview: "Dedicated cleaners responsible for keeping our restaurant dining areas, kitchen, and catering equipment spotless and hygienic.",
    overviewSi: "ආපනශාලා භෝජනාගාරය, කුස්සිය සහ උපකරණවල ඉහළ පිරිසිදුකම හා සනීපාරක්ෂාව පවත්වා ගැනීම සඳහා කැපවූ පිරිසිදු කිරීමේ සේවකයින් සොයයි.",
    responsibilities: [
      "Maintain cleanliness of kitchen and restaurant areas.",
      "Ensure a clean and hygienic working environment.",
      "Assist with general cleaning duties.",
    ],
    responsibilitiesSi: [
      "කුස්සිය සහ ආපනශාලා පරිශ්‍රයේ පිරිසිදුකම පවත්වා ගැනීම.",
      "පිරිසිදු හා සනීපාරක්ෂක සේවා පරිසරයක් සහතික කිරීම.",
      "සාමාන්‍ය පිරිසිදු කිරීමේ කටයුතු සඳහා සහාය වීම.",
    ],
    requirements: [
      "No previous experience required.",
      "Responsible and hardworking.",
      "Ability to follow hygiene standards.",
    ],
    requirementsSi: [
      "පෙර පළපුරුද්දක් අවශ්‍ය නොවේ (නුපුහුණු අයටද අයදුම් කළ හැක).",
      "වගකීම් සහගත සහ මහන්සි වී වැඩ කළ හැකි අයෙකු වීම.",
      "සනීපාරක්ෂක ප්‍රමිතීන් අනුගමනය කිරීමේ හැකියාව.",
    ],
    benefits: [
      "Reliable monthly salary with overtime pay.",
      "Duty meals and tea provided daily.",
      "Respectful, clean, and safe workplace environment.",
    ],
    benefitsSi: [
      "නියමිත මාසික වැටුප් සහ අතිකාල දීමනා (OT).",
      "නොමිලේ දෛනික ආහාර සහ තේ පැන්.",
      "ගෞරවනීය සහ සුරක්ෂිත සේවා පරිසරයක්.",
    ],
  },
  {
    id: "waiter",
    title: "Waiter",
    sinhalaTitle: "වේටර් (Waiter)",
    category: "Service",
    type: "Full-Time",
    location: RESTAURANT_INFO.address,
    experience: "Previous experience is an advantage but not mandatory",
    overview: "Customer-oriented Waiters to welcome guests, take orders, serve food and beverages, and ensure a warm dining experience.",
    overviewSi: "පාරිභෝගිකයින් සුහදව පිළිගැනීම, ඇණවුම් ලබා ගැනීම සහ ආහාර පිළිගැන්වීම සඳහා මිත්‍රශීලී වේටර්වරුන් සොයයි.",
    responsibilities: [
      "Welcome and serve customers professionally.",
      "Take orders and ensure customer satisfaction.",
      "Maintain cleanliness of dining areas.",
    ],
    responsibilitiesSi: [
      "පාරිභෝගිකයන් සුහදශීලීව හා වෘත්තීය මට්ටමින් පිළිගැනීම සහ සේවය කිරීම.",
      "ඇණවුම් ලබා ගැනීම සහ පාරිභෝගික තෘප්තිය සහතික කිරීම.",
      "භෝජනාගාර ප්‍රදේශයේ පිරිසිදුකම පවත්වා ගැනීම.",
    ],
    requirements: [
      "Good communication skills.",
      "Friendly and customer-focused attitude.",
      "Previous experience is an advantage but not mandatory.",
    ],
    requirementsSi: [
      "යහපත් සන්නිවේදන කුසලතා.",
      "මිත්‍රශීලී සහ පාරිභෝගික කේන්ද්‍රීය ආකල්පය.",
      "පෙර පළපුරුද්ද අමතර සුදුසුකමක් වන නමුත් අනිවාර්ය නොවේ.",
    ],
    benefits: [
      "Attractive basic salary + Service Charge + tips.",
      "Free daily duty meals and uniform provided.",
      "Positive, supportive team culture.",
    ],
    benefitsSi: [
      "ආකර්ෂණීය වැටුප් + සේවා ගාස්තු (Service Charge) + පාරිභෝගික ටිප්ස්.",
      "නොමිලේ ආහාර සහ නිල ඇඳුම් සැපයේ.",
      "සුහදශීලී කාර්ය මණ්ඩලයක් සමඟ වැඩ කිරීමේ අවස්ථාව.",
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
    answer: "We are actively recruiting Kottu Chefs, Chinese Chefs, Rice & Curry Chefs (Bulk Cooking), Kitchen Helpers, Cleaners, and Waiters. You can view full requirements on our Careers page and apply immediately by sending a WhatsApp message to 0704535815 or calling 0704535815 / 0736535815.",
    category: "careers",
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

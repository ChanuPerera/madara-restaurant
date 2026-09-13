import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { 
  MENU_ITEMS, 
  CATERING_PACKAGES, 
  MENU_CATEGORIES, 
  CATERING_CATEGORIES,
  RESTAURANT_INFO,
  MenuItem,
  CateringPackageDetail
} from "@/data/restaurantData";
import ProductDetailClient, { UnifiedProduct } from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static HTML paths for all food items & catering packages
export async function generateStaticParams() {
  const menuIds = MENU_ITEMS.map((item) => ({ id: item.id }));
  const cateringIds = CATERING_PACKAGES.map((pkg) => ({ id: pkg.id }));
  return [...menuIds, ...cateringIds];
}

// Helper to look up unified product
function getProductById(id: string): UnifiedProduct | null {
  const menuItem = MENU_ITEMS.find((m) => m.id === id);
  if (menuItem) {
    const catName = MENU_CATEGORIES.find((c) => c.id === menuItem.category)?.name || "Restaurant Dish";
    return { kind: "restaurant", data: menuItem, categoryName: catName };
  }

  const cateringPkg = CATERING_PACKAGES.find((c) => c.id === id);
  if (cateringPkg) {
    const catName = cateringPkg.categoryName;
    return { kind: "catering", data: cateringPkg, categoryName: catName };
  }

  return null;
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Menu Item Not Found | Madara Restaurant Homagama",
      description: "The requested food item or catering package was not found in our menu.",
    };
  }

  const isRest = product.kind === "restaurant";
  const item = product.data;
  const title = isRest ? (item as MenuItem).name : (item as CateringPackageDetail).packageName;
  const description = isRest 
    ? (item as MenuItem).description 
    : (item as CateringPackageDetail).tagline;
  const priceText = isRest 
    ? `Rs. ${(item as MenuItem).priceLKR.toLocaleString()}/=` 
    : (item as CateringPackageDetail).priceDisplay;

  let imageUrl = "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80";
  if (isRest) {
    imageUrl = (item as MenuItem).image;
  } else {
    const cat = CATERING_CATEGORIES.find((c) => c.id === (item as CateringPackageDetail).categoryId);
    if (cat) imageUrl = cat.image;
  }

  const seoTitle = `${title} (${priceText}) | Madara Restaurant Homagama`;
  const seoDescription = `${description} Order online or inquire about catering in Homagama & Colombo. Phone: ${RESTAURANT_INFO.phoneFormatted}.`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      title,
      `${title} Homagama`,
      `${product.categoryName} Homagama`,
      "Madara Restaurant Menu",
      "Madara Catering Homagama",
      "Sri Lanka Food Delivery",
    ],
    alternates: {
      canonical: `https://madararestaurant.lk/menu/${id}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://madararestaurant.lk/menu/${id}`,
      siteName: "Madara Restaurant & Catering",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_LK",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const isRest = product.kind === "restaurant";
  const item = product.data;
  const title = isRest ? (item as MenuItem).name : (item as CateringPackageDetail).packageName;
  const description = isRest ? (item as MenuItem).description : (item as CateringPackageDetail).tagline;
  const priceValue = isRest ? (item as MenuItem).priceLKR : (item as CateringPackageDetail).pricePerPersonLKR || 0;

  let imageUrl = "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80";
  if (isRest) {
    imageUrl = (item as MenuItem).image;
  } else {
    const cat = CATERING_CATEGORIES.find((c) => c.id === (item as CateringPackageDetail).categoryId);
    if (cat) imageUrl = cat.image;
  }

  // Schema.org JSON-LD Structured Data
  const jsonLdProduct = isRest
    ? {
        "@context": "https://schema.org",
        "@type": "MenuItem",
        name: title,
        description: description,
        image: imageUrl,
        offers: {
          "@type": "Offer",
          price: priceValue,
          priceCurrency: "LKR",
          availability: "https://schema.org/InStock",
          url: `https://madararestaurant.lk/menu/${id}`,
        },
        suitableForDiet: (item as MenuItem).isVegetarian ? "https://schema.org/VegetarianDiet" : undefined,
        menuAddOn: "Buffet Setup, Welcome Drinks & Desserts available upon request",
      }
    : {
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        description: description,
        image: imageUrl,
        brand: {
          "@type": "Brand",
          name: "Madara Catering Services",
        },
        offers: {
          "@type": "Offer",
          price: priceValue,
          priceCurrency: "LKR",
          availability: "https://schema.org/InStock",
          url: `https://madararestaurant.lk/menu/${id}`,
        },
      };

  // Find related products in the same category (excluding current)
  const categoryId = isRest ? (item as MenuItem).category : (item as CateringPackageDetail).categoryId;
  
  const relatedRestaurant = MENU_ITEMS
    .filter((m) => m.id !== id && m.category === categoryId)
    .map((m) => {
      const catName = MENU_CATEGORIES.find((c) => c.id === m.category)?.name || "Restaurant Dish";
      return { kind: "restaurant" as const, data: m, categoryName: catName };
    });

  const relatedCatering = CATERING_PACKAGES
    .filter((c) => c.id !== id && c.categoryId === categoryId)
    .map((c) => ({ kind: "catering" as const, data: c, categoryName: c.categoryName }));

  const relatedProducts: UnifiedProduct[] = [...relatedRestaurant, ...relatedCatering].slice(0, 3);

  // If less than 3, pick any popular items
  if (relatedProducts.length < 3) {
    const filler = MENU_ITEMS
      .filter((m) => m.id !== id && !relatedProducts.some((r) => r.data.id === m.id))
      .slice(0, 3 - relatedProducts.length)
      .map((m) => {
        const catName = MENU_CATEGORIES.find((c) => c.id === m.category)?.name || "Restaurant Dish";
        return { kind: "restaurant" as const, data: m, categoryName: catName };
      });
    relatedProducts.push(...filler);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}

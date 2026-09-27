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
  CateringPackageDetail,
} from "@/data/restaurantData";
import {
  fetchMenuItemsFromFirebase,
  getProductByIdFromSources,
  getRelatedProductsFromSources,
  UnifiedProduct,
} from "@/services/menuData";
import { getDishFallbackImage, MENU_FALLBACK_IMAGE } from "@/utils/menuUtils";
import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static HTML paths for all food items (from Firebase + static) & catering packages
export async function generateStaticParams() {
  const menuIdsSet = new Set<string>();

  // 1. Add static fallback IDs
  MENU_ITEMS.forEach((item) => menuIdsSet.add(item.id));

  // 2. Add all actual menu items from Firebase
  try {
    const liveItems = await fetchMenuItemsFromFirebase(true);
    if (liveItems && liveItems.length > 0) {
      liveItems.forEach((item) => menuIdsSet.add(item.id));
    }
  } catch (err) {
    console.warn(
      "Could not fetch Firebase items during generateStaticParams:",
      err,
    );
  }

  // 3. Add catering package IDs
  const cateringIds = CATERING_PACKAGES.map((pkg) => pkg.id);
  cateringIds.forEach((id) => menuIdsSet.add(id));

  return Array.from(menuIdsSet).map((id) => ({ id }));
}

// Dynamic SEO Metadata Generation using Firebase actual item data
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductByIdFromSources(id);

  if (!product) {
    return {
      title: "Menu Item Not Found | Madara Restaurant Homagama",
      description:
        "The requested food item or catering package was not found in our menu.",
    };
  }

  const isRest = product.kind === "restaurant";
  const item = product.data;
  const title = isRest
    ? (item as MenuItem).name
    : (item as CateringPackageDetail).packageName;
  const description = isRest
    ? (item as MenuItem).description
    : (item as CateringPackageDetail).tagline;
  const priceText = isRest
    ? `Rs. ${(item as MenuItem).priceLKR.toLocaleString()}/=`
    : (item as CateringPackageDetail).priceDisplay;

  let imageUrl = MENU_FALLBACK_IMAGE;
  if (isRest) {
    const dish = item as MenuItem;
    imageUrl =
      dish.image?.trim() ||
      getDishFallbackImage(dish.category, dish.subCategory);
  } else {
    const cat = CATERING_CATEGORIES.find(
      (c) => c.id === (item as CateringPackageDetail).categoryId,
    );
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
      canonical: `https://madararestaurant.com/menu/${id}/`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://madararestaurant.com/menu/${id}/`,
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
  const product = await getProductByIdFromSources(id);

  if (!product) {
    notFound();
  }

  const isRest = product.kind === "restaurant";
  const item = product.data;
  const title = isRest
    ? (item as MenuItem).name
    : (item as CateringPackageDetail).packageName;
  const description = isRest
    ? (item as MenuItem).description
    : (item as CateringPackageDetail).tagline;
  const priceValue = isRest
    ? (item as MenuItem).priceLKR
    : (item as CateringPackageDetail).pricePerPersonLKR || 0;

  let imageUrl = MENU_FALLBACK_IMAGE;
  if (isRest) {
    imageUrl =
      (item as MenuItem).image?.trim() ||
      getDishFallbackImage(
        (item as MenuItem).category,
        (item as MenuItem).subCategory,
      );
  } else {
    const cat = CATERING_CATEGORIES.find(
      (c) => c.id === (item as CateringPackageDetail).categoryId,
    );
    if (cat) imageUrl = cat.image;
  }

  // Schema.org JSON-LD Structured Data with BreadcrumbList
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://madararestaurant.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isRest ? "Food Menu" : "Catering Packages",
            item: isRest
              ? "https://madararestaurant.com/menu/"
              : "https://madararestaurant.com/catering/",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: `https://madararestaurant.com/menu/${id}/`,
          },
        ],
      },
      isRest
        ? {
            "@type": "MenuItem",
            name: title,
            description: description,
            image: imageUrl,
            offers: {
              "@type": "Offer",
              price: priceValue,
              priceCurrency: "LKR",
              availability:
                (item as MenuItem).isAvailable !== false
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              url: `https://madararestaurant.com/menu/${id}/`,
            },
            suitableForDiet: (item as MenuItem).isVegetarian
              ? "https://schema.org/VegetarianDiet"
              : undefined,
            menuAddOn:
              "Buffet Setup, Welcome Drinks & Desserts available upon request",
          }
        : {
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
              url: `https://madararestaurant.com/menu/${id}/`,
            },
          },
    ],
  };

  // Find related products in the same category (powered by live Firebase menu data)
  const categoryId = isRest
    ? (item as MenuItem).category
    : (item as CateringPackageDetail).categoryId;
  const relatedProducts = await getRelatedProductsFromSources(
    id,
    categoryId,
    product.kind,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}

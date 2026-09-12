"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import ModernThemeHome from "@/themes/modern/ModernThemeHome";
import ClassicThemeHome from "@/themes/classic/ClassicThemeHome";

/**
 * HomePage
 * Selects theme layout based on environment configuration:
 * 1. "modern-light" (New ultra-clean light theme with Catering3DCarousel) [Default]
 * 2. "classic-dark" (Preserved original dark theme)
 * Controlled strictly via NEXT_PUBLIC_THEME in .env and built.
 */
export default function HomePage() {
  const { theme } = useTheme();

  if (theme === "classic-dark") {
    return <ClassicThemeHome />;
  }

  return <ModernThemeHome />;
}

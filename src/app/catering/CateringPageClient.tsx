"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import ModernCateringView from "@/components/modern/ModernCateringView";
import ClassicCateringView from "@/themes/classic/ClassicCateringView";

export default function CateringPageClient() {
  const { theme } = useTheme();

  if (theme === "classic-dark") {
    return <ClassicCateringView />;
  }

  return <ModernCateringView />;
}

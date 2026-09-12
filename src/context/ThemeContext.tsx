"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { ThemeMode, THEME_CONFIG } from "@/config/themeConfig";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "madara_selected_theme";

/**
 * ThemeProvider
 * Strictly controlled via NEXT_PUBLIC_THEME environment variable at build/deploy time.
 * Dynamic UI switching has been disabled as requested.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme: ThemeMode = THEME_CONFIG.defaultTheme;

  // Clear any legacy localStorage theme override from previous user clicks
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem(THEME_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (theme === "modern-light") {
        root.classList.add("theme-modern-light");
        root.classList.remove("theme-classic-dark");
        root.style.colorScheme = "light";
      } else {
        root.classList.add("theme-classic-dark");
        root.classList.remove("theme-modern-light");
        root.style.colorScheme = "dark";
      }
    }
  }, [theme]);

  // Safe no-ops to preserve interface compatibility without allowing runtime layout hijacking
  const setTheme = (_newTheme: ThemeMode) => {};
  const toggleTheme = () => {};

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    isLight: theme === "modern-light",
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: THEME_CONFIG.defaultTheme,
      setTheme: () => {},
      toggleTheme: () => {},
      isLight: THEME_CONFIG.defaultTheme === "modern-light",
    };
  }
  return context;
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        madara: {
          dark: "#090A0D",
          surface: "#111217",
          surfaceElevated: "#181920",
          border: "#23242E",
          borderLight: "rgba(255, 255, 255, 0.08)",
          orange: "#FF6B00",
          orangeHover: "#FF851A",
          orangeGlow: "#FF5500",
          amber: "#F59E0B",
          gold: "#FBBF24",
          textPrimary: "#FFFFFF",
          textSecondary: "#D1D5DB",
          textMuted: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        "glow-orange": "0 0 25px -5px rgba(255, 107, 0, 0.18)",
        "glow-orange-sm": "0 0 12px rgba(255, 107, 0, 0.12)",
        "glow-orange-lg": "0 0 45px -10px rgba(255, 107, 0, 0.22)",
        "card-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-orange": "linear-gradient(135deg, #FF851A 0%, #FF5500 100%)",
        "gradient-dark-card": "linear-gradient(180deg, rgba(24, 25, 32, 0.8) 0%, rgba(17, 18, 23, 0.95) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2.5s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

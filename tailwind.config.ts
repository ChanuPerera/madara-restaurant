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
          dark: "#111318",
          surface: "#181A22",
          surfaceElevated: "#1E202A",
          border: "#2A2D38",
          borderLight: "rgba(255, 255, 255, 0.08)",
          orange: "#D97706",
          orangeHover: "#EA580C",
          orangeGlow: "rgba(217, 119, 6, 0.2)",
          amber: "#F59E0B",
          gold: "#EAB308",
          textPrimary: "#F8FAFC",
          textSecondary: "#CBD5E1",
          textMuted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        "glow-orange": "0 0 20px -5px rgba(217, 119, 6, 0.15)",
        "glow-orange-sm": "0 0 10px rgba(217, 119, 6, 0.1)",
        "glow-orange-lg": "0 0 35px -10px rgba(217, 119, 6, 0.2)",
        "card-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-orange": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        "gradient-dark-card": "linear-gradient(180deg, rgba(30, 32, 42, 0.8) 0%, rgba(24, 26, 34, 0.95) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 8s ease-in-out infinite",
        "glow": "glow 3.5s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        glow: {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

export type ThemeMode = "modern-light" | "classic-dark";

export interface ThemeConfig {
  defaultTheme: ThemeMode;
  availableThemes: { id: ThemeMode; labelEn: string; labelSi: string }[];
}

export const THEME_CONFIG: ThemeConfig = {
  defaultTheme:
    (process.env.NEXT_PUBLIC_THEME as ThemeMode) || "modern-light",
  availableThemes: [
    {
      id: "modern-light",
      labelEn: "Modern Light",
      labelSi: "නවීන සුදු තේමාව",
    },
    {
      id: "classic-dark",
      labelEn: "Classic Dark",
      labelSi: "සම්භාව්‍ය අඳුරු තේමාව",
    },
  ],
};

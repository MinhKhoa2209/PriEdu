"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");

  return (
    <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-full">
      <button
        onClick={() => setTheme("light")}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
          theme === "light"
            ? "bg-primary text-white shadow-sm"
            : "text-on-surface-variant hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-base">light_mode</span>
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
          theme === "dark"
            ? "bg-primary text-white shadow-sm"
            : "text-on-surface-variant hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-base">dark_mode</span>
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
          theme === "system"
            ? "bg-primary text-white shadow-sm"
            : "text-on-surface-variant hover:bg-surface-container"
        }`}
      >
        <span className="material-symbols-outlined text-base">computer</span>
      </button>
    </div>
  );
}

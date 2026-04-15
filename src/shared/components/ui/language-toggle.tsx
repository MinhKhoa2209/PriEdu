"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function LanguageToggle() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [locale, setLocale] = useState<string>("vi");

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-full">
      <button
        onClick={() => changeLanguage("vi")}
        disabled={isPending}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
          locale === "vi"
            ? "bg-primary text-white shadow-sm"
            : "text-on-surface-variant hover:bg-surface-container"
        }`}
      >
        🇻🇳 VI
      </button>
      <button
        onClick={() => changeLanguage("en")}
        disabled={isPending}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
          locale === "en"
            ? "bg-primary text-white shadow-sm"
            : "text-on-surface-variant hover:bg-surface-container"
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}

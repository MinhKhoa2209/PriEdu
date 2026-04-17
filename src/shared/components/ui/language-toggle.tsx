'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'vi', name: 'Việt', flag: '🇻🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];
  const nextLanguage = languages.find(lang => lang.code !== locale) || languages[1];

  const handleLanguageChange = async () => {
    console.log('[LanguageToggle] Current locale:', locale);
    console.log('[LanguageToggle] Switching to:', nextLanguage.code);
    
    startTransition(async () => {
      try {
        // Set cookie for locale
        document.cookie = `NEXT_LOCALE=${nextLanguage.code}; path=/; max-age=31536000`;
        console.log('[LanguageToggle] Cookie set to:', nextLanguage.code);
        
        // Refresh the page to apply new locale
        router.refresh();
        console.log('[LanguageToggle] Page refreshed');
      } catch (error) {
        console.error('[LanguageToggle] Error changing language:', error);
      }
    });
  };

  return (
    <button
      onClick={handleLanguageChange}
      className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
      disabled={isPending}
      title={`Language: ${currentLanguage.name}`}
    >
      <span className="text-lg">{currentLanguage.flag}</span>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
        {currentLanguage.code.toUpperCase()}
      </span>
    </button>
  );
}

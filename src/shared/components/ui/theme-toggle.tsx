'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse">
        <span className="material-symbols-outlined text-slate-400">light_mode</span>
      </button>
    );
  }

  const cycleTheme = () => {
    console.log('[ThemeToggle] Current theme:', theme);
    console.log('[ThemeToggle] Document classList:', document.documentElement.classList.toString());
    
    if (theme === 'light') {
      console.log('[ThemeToggle] Switching to dark');
      setTheme('dark');
    } else if (theme === 'dark') {
      console.log('[ThemeToggle] Switching to system');
      setTheme('system');
    } else {
      console.log('[ThemeToggle] Switching to light');
      setTheme('light');
    }
    
    // Log after a short delay to see the change
    setTimeout(() => {
      console.log('[ThemeToggle] After change - classList:', document.documentElement.classList.toString());
    }, 100);
  };

  const getIcon = () => {
    if (theme === 'dark') return 'dark_mode';
    if (theme === 'system') return 'computer';
    return 'light_mode';
  };

  const getLabel = () => {
    if (theme === 'dark') return 'Dark';
    if (theme === 'system') return 'Auto';
    return 'Light';
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
      title={`Theme: ${getLabel()}`}
    >
      <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-lg">
        {getIcon()}
      </span>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
        {getLabel()}
      </span>
    </button>
  );
}

import Link from 'next/link';
import { LanguageToggle } from '@/shared/components/ui/language-toggle';
import { ThemeToggle } from '@/shared/components/ui/theme-toggle';

export function MobileTopBar() {
  return (
    <header className="md:hidden flex items-center justify-between mb-6 px-4 pt-4">
      <h2 className="text-xl font-extrabold text-primary tracking-tight font-headline">PriEdu</h2>
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <Link 
          href="/student/settings"
          className="p-2 bg-surface-container-low dark:bg-surface-container rounded-full hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface">account_circle</span>
        </Link>
      </div>
    </header>
  );
}

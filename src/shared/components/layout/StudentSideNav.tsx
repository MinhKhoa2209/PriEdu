'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LanguageToggle } from '@/shared/components/ui/language-toggle';
import { ThemeToggle } from '@/shared/components/ui/theme-toggle';

interface StudentSideNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function StudentSideNav({ isOpen, onToggle }: StudentSideNavProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const user = session?.user as any;
  const userName = user?.name || 'Student';
  const userLevel = user?.level || 1;
  const userImage = user?.image;

  const navItems = [
    { href: '/student/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { href: '/student/adventure', icon: 'explore', label: 'Adventure' },
    { href: '/student/library', icon: 'local_library', label: 'Library' },
    { href: '/student/chat', icon: 'smart_toy', label: 'AI Tutor' },
    { href: '/student/settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside 
      className={`hidden md:flex flex-col fixed left-0 top-0 h-full py-6 space-y-2 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Logo and Toggle Button */}
      <div className="px-6 mb-4 flex items-center justify-between">
        <h1 className="text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-tight">PriEdu</h1>
        <button
          onClick={onToggle}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title="Toggle sidebar"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-xl">
            {isOpen ? 'chevron_left' : 'menu'}
          </span>
        </button>
      </div>
      
      {/* Theme and Language Toggles */}
      <div className="px-4 mb-4 flex gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      {/* User Profile */}
      <div className="px-4 mb-6">
        <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="relative w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden flex-shrink-0">
            {userImage ? (
              <img 
                src={userImage} 
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">person</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{userName}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Level {userLevel}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Daily Quest Button */}
      <div className="px-4 mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
        <Link 
          href="/student/adventure" 
          className="w-full block py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-xl font-bold text-sm text-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 transition-all hover:scale-105"
        >
          Start Daily Quest
        </Link>
      </div>
    </aside>
  );
}

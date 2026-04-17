'use client';

import { useState } from 'react';
import { StudentSideNav } from "@/shared/components/layout/StudentSideNav";
import { MobileTopBar } from "@/shared/components/layout/MobileTopBar";
import { MobileBottomNav } from "@/shared/components/layout/MobileBottomNav";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <StudentSideNav isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <MobileTopBar />
      
      {/* Floating menu button when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="hidden md:flex fixed top-4 left-4 z-50 items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-2xl">
            menu
          </span>
        </button>
      )}
      
      <main 
        className={`min-h-screen p-4 md:p-8 pb-24 md:pb-8 transition-all duration-300 ${
          sidebarOpen ? 'md:ml-64' : 'md:ml-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      <MobileBottomNav />
    </div>
  );
}

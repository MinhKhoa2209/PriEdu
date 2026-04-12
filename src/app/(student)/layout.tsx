import type { ReactNode } from 'react';
import Link from 'next/link';

// Shared layout for all student routes
export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 space-y-4 hidden md:block">
        <div className="text-xl font-bold text-indigo-600">PriEdu</div>
        <nav className="space-y-2 pt-4">
          <Link
            href="/dashboard"
            className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-medium"
          >
            My Dashboard
          </Link>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

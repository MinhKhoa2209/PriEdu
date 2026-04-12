import type { ReactNode } from 'react';

// Shared layout for all teacher routes
export default function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 space-y-4 hidden md:block">
        <div className="text-xl font-bold text-indigo-600">PriEdu Teacher</div>
        <nav className="space-y-2 pt-4">
          <a href="/teacher/dashboard" className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-medium">
            Dashboard
          </a>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

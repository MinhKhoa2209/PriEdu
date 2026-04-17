import Link from "next/link";

export function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-bright/90 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex items-center justify-between z-50">
      <Link href="/student/dashboard" className="flex flex-col items-center space-y-1 text-primary">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
        <span className="text-[10px] font-bold font-headline">Home</span>
      </Link>
      <Link href="/student/adventure" className="flex flex-col items-center space-y-1 text-slate-400">
        <span className="material-symbols-outlined">explore</span>
        <span className="text-[10px] font-bold font-headline">Adventure</span>
      </Link>
      
      {/* Floating Action Button inside Bottom Nav */}
      <Link href="/student/chat" className="w-14 h-14 -mt-10 bg-primary text-white rounded-full shadow-lg border-4 border-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-2xl">smart_toy</span>
      </Link>

      <Link href="/student/library" className="flex flex-col items-center space-y-1 text-slate-400">
        <span className="material-symbols-outlined">local_library</span>
        <span className="text-[10px] font-bold font-headline">Library</span>
      </Link>
      <Link href="/student/settings" className="flex flex-col items-center space-y-1 text-slate-400">
        <span className="material-symbols-outlined">settings</span>
        <span className="text-[10px] font-bold font-headline">Settings</span>
      </Link>
    </nav>
  );
}

import Link from "next/link";

export function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-bright/90 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex items-center justify-between z-50">
      <Link href="/student/dashboard" className="flex flex-col items-center space-y-1 text-primary">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
        <span className="text-[10px] font-bold font-headline">Chính</span>
      </Link>
      <Link href="/student/lessons" className="flex flex-col items-center space-y-1 text-slate-400">
        <span className="material-symbols-outlined">auto_stories</span>
        <span className="text-[10px] font-bold font-headline">Học</span>
      </Link>
      
      {/* Floating Action Button inside Bottom Nav */}
      <button className="w-14 h-14 -mt-10 bg-primary text-white rounded-full shadow-lg border-4 border-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      <Link href="/achievements" className="flex flex-col items-center space-y-1 text-slate-400">
        <span className="material-symbols-outlined">military_tech</span>
        <span className="text-[10px] font-bold font-headline">Thành tựu</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center space-y-1 text-slate-400">
        <span className="material-symbols-outlined">account_circle</span>
        <span className="text-[10px] font-bold font-headline">Tớ</span>
      </Link>
    </nav>
  );
}

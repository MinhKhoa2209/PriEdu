import Link from "next/link";
import Image from "next/image";

export function TeacherSideNav() {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 py-6 space-y-2 bg-slate-50 dark:bg-slate-900 h-screen w-64 border-r border-slate-100/10 z-50">
      <div className="px-6 mb-8">
        <h1 className="text-lg font-black text-indigo-800 dark:text-indigo-200 font-headline">The Intelligent Playroom</h1>
      </div>
      <div className="px-4 mb-10">
        <div className="flex items-center gap-3 p-3 bg-surface-container-high rounded-xl">
          <div className="relative w-10 h-10 rounded-full bg-primary-fixed overflow-hidden">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwfOhyjj26Gg-WjX-mtsiCRc4BP0ME39QD2TPOzojDCmDm7rxglba0n4114Svpf-BAEde7h0bj9yaNc62t01QQTw6b-0Ob9UklvNc4EIlo9TU_WOUw2AlzmNhTpCi8XbyKdTvO-DIK30J7FDadb6IgcmQpyvmltwaGlQqkZA8kbzrpN-AFxESHnKkme31z2VJlYGWo5KwFRS2cIF3TxzQGQBXlLxd9Pz5fwqy5dQBeKA1gHF_JHmBcm0F0U_hIpOO7vQhubvuDkG2k" 
              alt="Teacher Avatar" 
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-headline text-sm font-semibold tracking-wide text-indigo-700">Young Explorer</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Level 12 Curator</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        <Link href="/teacher/dashboard" className="flex items-center gap-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-100 rounded-xl mx-2 scale-102 p-3 font-headline text-sm font-semibold tracking-wide transition-all duration-200">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span>Dashboard</span>
        </Link>
        <Link href="/teacher/lessons" className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mx-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl p-3 font-headline text-sm font-semibold tracking-wide hover:scale-102 transition-transform duration-300 ease-out">
          <span className="material-symbols-outlined">auto_stories</span>
          <span>Lessons</span>
        </Link>
        <Link href="/teacher/library" className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mx-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl p-3 font-headline text-sm font-semibold tracking-wide hover:scale-102 transition-transform duration-300 ease-out">
          <span className="material-symbols-outlined">local_library</span>
          <span>Library</span>
        </Link>
        <Link href="/achievements" className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mx-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl p-3 font-headline text-sm font-semibold tracking-wide hover:scale-102 transition-transform duration-300 ease-out">
          <span className="material-symbols-outlined">military_tech</span>
          <span>Achievements</span>
        </Link>
        <Link href="/settings" className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mx-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl p-3 font-headline text-sm font-semibold tracking-wide hover:scale-102 transition-transform duration-300 ease-out">
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </Link>
      </nav>
      <div className="px-4 mt-auto">
        <button className="w-full bg-primary text-white py-3 rounded-xl font-headline font-bold shadow-[0_4px_0_0_#3323cc] active:shadow-none active:translate-y-1 transition-all">
          Start Daily Quest
        </button>
        <div className="mt-4">
          <Link href="/help" className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mx-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl p-3 font-headline text-sm font-semibold tracking-wide">
            <span className="material-symbols-outlined">help</span>
            <span>Help Center</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

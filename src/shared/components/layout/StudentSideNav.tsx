import Link from "next/link";
import Image from "next/image";

export function StudentSideNav() {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full py-6 space-y-2 w-64 bg-slate-50 border-r border-slate-100/10 z-50">
      <div className="px-6 mb-8">
        <h1 className="text-lg font-black text-indigo-800 tracking-tight font-headline">The Intelligent Playroom</h1>
      </div>
      <div className="px-4 mb-10">
        <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
          <div className="relative w-10 h-10 rounded-full border-2 border-secondary-container overflow-hidden">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM-Slg8uJAZYdsg-c5mqMrLMycjGObFTBNhtzYB20R55DEPWIcaux61sbGOky_nUe7Yzq6RMFfIDd-q9-z0Lpphg2t217WLtuP8ZB6K5A2Fu03wzBbfZBP5ecry65nvPMo4m518VgoADVLxGv2sGuJp9564uHlKIdfVZaApYByUnEvDD8knbNIP8XLeYHh6T7xh-YLKX-iv6xiWjYxdtCVfUTY_uC7-z6uTy-im0wtOFfvtjIzArlU0qCKLW4FWB43Uxj8qvx5g8pd" 
              alt="Student Avatar" 
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-800 font-headline">Young Explorer</p>
            <p className="text-[10px] text-slate-500">Level 12 Curator</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        <Link href="/student/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-indigo-100 text-indigo-800 rounded-xl transition-all duration-200 shadow-inner">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-sm font-semibold font-headline">Dashboard</span>
        </Link>
        <Link href="/student/lessons" className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-xl transition-transform duration-300 ease-out hover:scale-102">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="text-sm font-semibold font-headline">Lessons</span>
        </Link>
        <Link href="/student/library" className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-xl transition-transform duration-300 ease-out hover:scale-102">
          <span className="material-symbols-outlined">local_library</span>
          <span className="text-sm font-semibold font-headline">Library</span>
        </Link>
        <Link href="/achievements" className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-xl transition-transform duration-300 ease-out hover:scale-102">
          <span className="material-symbols-outlined">military_tech</span>
          <span className="text-sm font-semibold font-headline">Achievements</span>
        </Link>
        <Link href="/student/chat" className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-xl transition-transform duration-300 ease-out hover:scale-102">
          <span className="material-symbols-outlined">smart_toy</span>
          <span className="text-sm font-semibold font-headline">Gia sư AI</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 rounded-xl transition-transform duration-300 ease-out hover:scale-102">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-semibold font-headline">Settings</span>
        </Link>
      </nav>
      <div className="px-4 mt-auto pt-6 border-t border-slate-100/10">
        <button className="w-full py-4 px-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl font-bold text-sm 3d-button transition-all">
          Start Daily Quest
        </button>
        <Link href="/help" className="flex items-center space-x-3 px-4 py-3 mt-4 text-slate-500 hover:bg-slate-200/50 rounded-xl transition-all">
          <span className="material-symbols-outlined">help</span>
          <span className="text-sm font-semibold font-headline">Help Center</span>
        </Link>
      </div>
    </aside>
  );
}

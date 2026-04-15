export function MobileTopBar() {
  return (
    <header className="md:hidden flex items-center justify-between mb-8 px-2 pt-4">
      <h2 className="text-xl font-extrabold text-indigo-700 tracking-tight font-headline">Playroom</h2>
      <div className="flex space-x-3">
        <button className="p-2 bg-white rounded-full shadow-sm">
          <span className="material-symbols-outlined text-slate-600">notifications</span>
        </button>
        <button className="p-2 bg-white rounded-full shadow-sm">
          <span className="material-symbols-outlined text-slate-600">account_circle</span>
        </button>
      </div>
    </header>
  );
}

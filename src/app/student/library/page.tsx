import Image from "next/image";
import Link from "next/link";

export default function ResourceLibrary() {
  return (
    <main className="md:p-8">
      {/* Header Section with Overlapping Typography */}
      <header className="relative mb-16">
        <div className="absolute -top-12 -left-4 opacity-5 pointer-events-none hidden md:block">
          <h1 className="text-[12rem] font-black leading-none font-headline tracking-tighter">LIBRARY</h1>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2 block font-headline">Student Hub</span>
            <h2 className="text-5xl font-extrabold text-on-surface tracking-tight leading-tight font-headline">Resource <br/> <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Library</span></h2>
            <p className="mt-4 text-on-surface-variant max-w-md font-medium leading-relaxed">Discover a world of interactive learning materials powered by AI, tailored specifically for your curriculum journey.</p>
          </div>
          <div className="w-full md:w-auto flex gap-4">
            <div className="relative flex-1 md:w-72">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-12 pr-4 py-4 bg-surface-container-high rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-on-surface outline-none" placeholder="Search lessons..." type="text"/>
            </div>
            <button className="bg-surface-container-highest p-4 rounded-2xl text-primary hover:bg-primary-container hover:text-white transition-all">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>
      </header>

      {/* Quick Access / Favorites Asymmetric Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 mb-16 md:h-[500px]">
        {/* Featured Glassmorphism Card */}
        <div className="md:col-span-2 md:row-span-2 bg-primary-container rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-end group cursor-pointer min-h-[300px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSnns74RMRmBRxXy6ZJj1f_RdbvR62x-cKplwKbtKiUMzK1RPr3i45FzGwl5LnxWjkpF_g_LsFnfvS3VQ7Msy1CI5oZcKlxzatM7p_Z4XkzmbsmcMBrKWwdyWwMp5_-JQe4VM3Le8uexNYxh8LOpLSyLvbwxITbrg2R2ogcD_4Z_1anp3H1VT9c6EQZMsZKgi0M0mkJfWL3GmAOT21h9sfmDTRyLkEhtahksrW3LuUfHwbJyyjUgPCWVNFENxfRxR_TLOIXreMoR1x" 
            alt="AI Science Explorer" 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="relative z-20">
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-headline">Trending AI</span>
              <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-headline">Physics</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight font-headline">Quantum Leap: Exploring Modern Physics</h3>
            <p className="text-white/80 font-medium mb-6 line-clamp-2 md:line-clamp-none">Dive deep into the mysteries of the universe with our new interactive AI simulation module.</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button className="bg-white text-primary px-6 py-2.5 rounded-xl font-bold transition-all text-sm 3d-button hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none font-headline">Start Exploration</button>
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest">45m Estimated</span>
            </div>
          </div>
        </div>

        {/* Secondary Category Cards */}
        <div className="md:col-span-2 bg-secondary-container rounded-3xl p-6 relative overflow-hidden group cursor-pointer border border-outline-variant/10 min-h-[150px]">
          <div className="flex flex-col h-full justify-between relative z-10">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/40 backdrop-blur-md rounded-2xl text-secondary border border-white/20 shadow-sm">
                <span className="material-symbols-outlined text-3xl">auto_stories</span>
              </div>
              <span className="text-[10px] font-black text-secondary/80 uppercase tracking-widest font-headline">Level: Beginner</span>
            </div>
            <div className="mt-4 md:mt-0">
              <h4 className="text-xl font-extrabold text-on-secondary-container mb-1 font-headline">Storytelling Engine</h4>
              <p className="text-sm font-medium text-on-secondary-container/80">AI-powered creative writing workshop.</p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[120px]">edit_note</span>
          </div>
        </div>

        <div className="md:col-span-1 bg-tertiary-fixed rounded-3xl p-6 relative overflow-hidden group cursor-pointer border border-outline-variant/10 min-h-[150px]">
          <div className="flex flex-col h-full justify-between relative z-10">
            <div className="p-3 bg-white/40 backdrop-blur-md rounded-2xl text-on-tertiary-fixed w-fit border border-white/20 shadow-sm">
              <span className="material-symbols-outlined text-3xl">calculate</span>
            </div>
            <h4 className="text-xl font-extrabold text-on-tertiary-fixed font-headline mt-4 md:mt-0">Math Blitz</h4>
          </div>
          <div className="absolute -right-6 -bottom-6 text-on-tertiary-fixed/20 group-hover:rotate-12 transition-transform">
            <span className="material-symbols-outlined text-[100px]">functions</span>
          </div>
        </div>

        <div className="md:col-span-1 bg-surface-container-high rounded-3xl p-6 relative overflow-hidden group cursor-pointer border border-primary/5 min-h-[150px]">
          <div className="flex flex-col h-full justify-between relative z-10">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary w-fit shadow-sm">
              <span className="material-symbols-outlined text-3xl">print</span>
            </div>
            <h4 className="text-xl font-extrabold text-on-surface font-headline mt-4 md:mt-0">Printables</h4>
          </div>
          <div className="absolute -right-6 -bottom-6 text-primary/10 group-hover:-translate-y-2 transition-transform">
            <span className="material-symbols-outlined text-[100px]">description</span>
          </div>
        </div>
      </section>

      {/* Categorized Resource Grid */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h3 className="text-2xl font-black text-on-surface tracking-tight font-headline">Recent Resources</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-primary text-white rounded-full text-xs font-bold cursor-pointer font-headline shadow-md">All</span>
          <span className="px-4 py-2 bg-surface-container text-on-surface-variant hover:bg-surface-container-high rounded-full text-xs font-bold transition-all cursor-pointer font-headline border border-outline-variant/10">Interactive</span>
          <span className="px-4 py-2 bg-surface-container text-on-surface-variant hover:bg-surface-container-high rounded-full text-xs font-bold transition-all cursor-pointer font-headline border border-outline-variant/10">Quizzes</span>
          <span className="px-4 py-2 bg-surface-container text-on-surface-variant hover:bg-surface-container-high rounded-full text-xs font-bold transition-all cursor-pointer font-headline border border-outline-variant/10">Video</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Resource Card 1 */}
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-outline-variant/10 stitch-effect flex flex-col">
          <div className="relative h-48 w-full">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWR65JbCxTc6GNjDNTC42qsT8IXbdQBdoOkE1uXmBvsjAP2uMgIAPPPBP8IdyzKoXUA0DHIUdTyu0klm8DSJeQmR6uyTmwFnEuOCa6tapedEnoImjbiG1AElE6mLo4Yg-cBpIRKBbYm6rysrjq3QJNUnO3vKErGc8FN970R-SAlL02yJAxquAuM0R6HdvgsQEo6m2EaYAPB-j-teYtZeiAO5RxzVXbj8mYE3295KHnC9kV59oqZlUmBSKS8kAdxHdRW6Znq-w-QRa_" 
              alt="Chemistry Module" 
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase shadow-sm">Lesson Plan</div>
            <div className="absolute bottom-4 right-4 bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm">Beginner</div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-lg font-extrabold text-on-surface mb-2 group-hover:text-primary transition-colors font-headline">Molecular Bonds & Magic</h4>
            <p className="text-sm text-on-surface-variant mb-6 font-medium leading-relaxed flex-1">Explore the fascinating world of chemical reactions through 3D interactive models.</p>
            <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary/60 text-lg">timer</span>
                <span className="text-xs font-bold text-on-surface-variant font-headline">25 MIN</span>
              </div>
              <button className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-1 group/btn hover:underline decoration-2 underline-offset-4">
                Details <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Resource Card 2 */}
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-outline-variant/10 stitch-effect flex flex-col">
          <div className="relative h-48 w-full">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF82ZombXG7YhkMjR5jGHIg9j4ffnaVTuxsHdvIqBwBymtoDLSnMH0sNF6WtuwbNooE3hYT9WI_EaEbNAxpOgqiEYf59eHHK_CtdmIoDe5aI7MpJsCkOpFayshCxDiy8tC9mg_JcHgR5_Qu8zv8ysk4ayVTghYqPGs2d8PeOBxSlspO_Q-x9GqGunGvKpTaAPdy24lhbSmEbWDIqZMr6X7qU2lV4_rZ-IYn1s6j0BsoqjAS-5kTVESJ4Xh5oHAHlPjxJXCsmJupzsB" 
              alt="History Journey" 
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase shadow-sm">VR Experience</div>
            <div className="absolute bottom-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm">Advanced</div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-lg font-extrabold text-on-surface mb-2 group-hover:text-primary transition-colors font-headline">Ancient Civilizations Walk</h4>
            <p className="text-sm text-on-surface-variant mb-6 font-medium leading-relaxed flex-1">A fully immersive VR journey through the streets of Athens and Rome.</p>
            <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary/60 text-lg">timer</span>
                <span className="text-xs font-bold text-on-surface-variant font-headline">15 MIN</span>
              </div>
              <button className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-1 group/btn hover:underline decoration-2 underline-offset-4">
                Details <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Resource Card 3 */}
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-outline-variant/10 stitch-effect flex flex-col">
          <div className="relative h-48 w-full">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh81MLFffcPTMRd6SieB2Ewxj8Hz_PB1rONTgN25eXsYEeyL0Yvw6-Hz6AMje7v6aG-1QwVgLL9XN6oYGdYEvwnrWw_-lHBJlFz5iyRfzY6zLiaEoZaaJ6T3HAtKWYOEgcivOz6MHb_0qSWXNG6MQCVq26rbowoYw1dMvIeP3uJ0VQssq4yO9rvYJcnB1trsf0jiwxpT_QYzYUEERawfwtu2Z-81yMCE3T6JFKqSmSq4FHjb-FCOt75FbY1epUkdfHasxVZxgA_SHo" 
              alt="Collaborative Learning" 
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase shadow-sm">Quiz</div>
            <div className="absolute bottom-4 right-4 bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm">Intermediate</div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-lg font-extrabold text-on-surface mb-2 group-hover:text-primary transition-colors font-headline">Global Citizen Quiz</h4>
            <p className="text-sm text-on-surface-variant mb-6 font-medium leading-relaxed flex-1">Test your knowledge of world geography and international cultures.</p>
            <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary/60 text-lg">timer</span>
                <span className="text-xs font-bold text-on-surface-variant font-headline">10 MIN</span>
              </div>
              <button className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-1 group/btn hover:underline decoration-2 underline-offset-4">
                Details <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

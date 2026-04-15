import Image from "next/image";

export default function TeacherDashboard() {
  return (
    <main className="md:ml-64 min-h-screen p-8 text-on-surface selection:bg-primary-fixed-dim">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-headline font-extrabold text-primary mb-1 leading-tight text-4xl lg:text-5xl">Welcome back, Ms. Halloway!</h2>
          <p className="text-on-surface-variant font-body">Your explorers have been busy! 12 new assignments are ready for review.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <span className="material-symbols-outlined p-3 bg-surface-container-low text-primary rounded-full hover:bg-primary-fixed transition-colors cursor-pointer">notifications</span>
            <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-surface"></span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20">
            <span className="material-symbols-outlined text-secondary">calendar_today</span>
            <span className="text-sm font-headline font-bold">Oct 24, 2023</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="col-span-1 border-b pb-8 md:col-span-8 md:border-b-0 space-y-8">
          <div className="bg-surface-container-low rounded-lg p-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-2xl font-headline font-bold text-on-surface mb-1">Class Progress Overview</h3>
                <p className="text-sm text-on-surface-variant">Average mastery across all curriculum modules</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold font-headline">+12% this week</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest rounded-lg p-6 stitch-effect flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle className="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                    <circle className="text-primary-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" strokeWidth="8"></circle>
                  </svg>
                  <span className="absolute text-xl font-headline font-bold text-primary">76%</span>
                </div>
                <p className="font-headline font-bold text-on-surface">Creative Arts</p>
                <p className="text-xs text-on-surface-variant mt-1">18/24 Students Mastered</p>
              </div>
              <div className="bg-surface-container-lowest rounded-lg p-6 stitch-effect flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle className="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                    <circle className="text-secondary" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="20" strokeLinecap="round" strokeWidth="8"></circle>
                  </svg>
                  <span className="absolute text-xl font-headline font-bold text-secondary">92%</span>
                </div>
                <p className="font-headline font-bold text-on-surface">Digital Logic</p>
                <p className="text-xs text-on-surface-variant mt-1">22/24 Students Mastered</p>
              </div>
              <div className="bg-surface-container-lowest rounded-lg p-6 stitch-effect flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle className="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                    <circle className="text-tertiary-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="130" strokeLinecap="round" strokeWidth="8"></circle>
                  </svg>
                  <span className="absolute text-xl font-headline font-bold text-tertiary-container">48%</span>
                </div>
                <p className="font-headline font-bold text-on-surface">Advanced Physics</p>
                <p className="text-xs text-on-surface-variant mt-1">11/24 Students Mastered</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-headline font-bold text-on-surface">Assignments to Grade</h3>
              <button className="text-primary font-headline font-bold text-sm flex items-center gap-1 hover:underline">
                View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-5 rounded-lg stitch-effect hover:translate-y-[-4px] transition-transform duration-300">
                <div className="flex justify-between mb-4">
                  <span className="bg-primary-fixed text-on-primary-fixed text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide">Science</span>
                  <span className="text-on-surface-variant text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> 2h left
                  </span>
                </div>
                <h4 className="font-headline font-bold text-on-surface mb-1">Volcano Simulation 3D</h4>
                <p className="text-xs text-on-surface-variant mb-4">8 Submissions pending review</p>
                <div className="flex -space-x-2 mb-4">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHVAMBOeSUeff2metILD0stnM4HTzdyoptERRAZYjvGvxpEMUE7RaS_bF9foMR5KAIT4iO8ed40mQSFdDbHsbSC9n383TCqBkoLemYUYlSs7Qckzy1vRpKtSvpCJk7EUHk25dZO9YESVjIio11LEIcpLplXWZN3zsLgk-xZ3T8JHbp40iO6m7xj7KpgGxXyTOX6pzycw76dd72jj4fnwQXuPLIn_-dr0YJRMoi7yzTT_6FkJXJLHmznmeoiZvyn7cQnAnR8Uy0cMVQ" width={24} height={24} alt="Student" className="w-6 h-6 rounded-full border-2 border-surface object-cover" />
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG4vP0Y1vBdlOrXFsb3GEy_p1CWtAavle0A_3W7wSCmxTthe1M6XFaaZt6bms7jf9DJXePqgMcDCxJPyxR-8vvvD0d1o5xUm5XByZ6IGPNDyF-Z7M89TttG1_am69YRFyF2UOv0fM9tSEDQ65o36no75QXqlhqWGHDfJtLeUGl9SrnRDYO5bfnwAoDU6gaR5ASQ2Seoa2dcwkikB8rGVVCBqdmaZfB9PKK6vjR7xUrfuqB0VZxWtC-GVRQ-wXzqd9ScGKGWm4lnn2w" width={24} height={24} alt="Student" className="w-6 h-6 rounded-full border-2 border-surface object-cover" />
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6YVTRqHritGwYO2P8ZZlqx6g7XqU2Xq0aR9Yr9Ln0UochU6kX5PGs4YqSFurtmkgKhb2tya3dlNeJ8lE2UvF7Ylj7Y5J_iEFOKt5DkJiGQvwb_6b1EgC4VW4ji-A3bdiShJVUI44pVdtbo51oJe4LGpYIlHaMu0Rvw3APLLq1areypgsTstzoluuhVvgwDeaV0in0BYFaEuaHPMjP0xLKHo9vrOI9dSl7m4EMwhoHxiwPLKfttqCyiyBxG64xfmibU1yoGe8JnTMp" width={24} height={24} alt="Student" className="w-6 h-6 rounded-full border-2 border-surface object-cover" />
                  <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-surface flex items-center justify-center text-[8px] font-bold">+5</div>
                </div>
                <button className="w-full bg-surface-container-low text-primary py-2 rounded-full text-xs font-bold font-headline hover:bg-primary hover:text-white transition-colors">Start Review</button>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-lg stitch-effect hover:translate-y-[-4px] transition-transform duration-300">
                <div className="flex justify-between mb-4">
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide">Mathematics</span>
                  <span className="text-on-surface-variant text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> 5h left
                  </span>
                </div>
                <h4 className="font-headline font-bold text-on-surface mb-1">Geometric Puzzles: Level 4</h4>
                <p className="text-xs text-on-surface-variant mb-4">14 Submissions pending review</p>
                <div className="flex -space-x-2 mb-4">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPUNgkHm8BVgsRaa6ZjOpdVkzrWOWGnkns6mOOAcIujCgOETJdqtT4rHk5KaDB4W8Tn2bUgSugypwGoqpLzWelfq56NkAvKvio_6ffOt5ntjaqLqiwkp5rYPFL67rBDzTTGkuCsDYsFuJFefwLziOLQOI3tR8uNiDyZvtNLn6PitkGXBpVItpC1jaXXU6KALoDNrOmcNk286YZqxciLGzz2drHPm79kO0IgnXj0KO9qvqxQOs6xXzOlHhzRTFumaBimv38dFUxKZC-" width={24} height={24} alt="Student" className="w-6 h-6 rounded-full border-2 border-surface object-cover" />
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqdf4LMU4y9chN8-dfnJ5Rh6nf0U5PcfaabA06v2XjenHmCa911GdQmmcYTKQrVtHeqMqXb1YIg6pEGTKhLnUococSLyuOCVm4nTXS7FOpsxY2uTMk50HXKvoFfHdDhtJWfh2RaBfhSvxeCvsifaN5GJ0jgVS7EOWwe-I8osyygy3-FJDYnB5I9EDECbFJnTJSaFZEKzXs7Y_H9pYxiSYvUBV3eHYLvCTCv90dr1lAb_r1AIG5iJfUtEl0mP49MlvklWvkExLe3SAm" width={24} height={24} alt="Student" className="w-6 h-6 rounded-full border-2 border-surface object-cover" />
                  <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-surface flex items-center justify-center text-[8px] font-bold">+12</div>
                </div>
                <button className="w-full bg-surface-container-low text-primary py-2 rounded-full text-xs font-bold font-headline hover:bg-primary hover:text-white transition-colors">Start Review</button>
              </div>
            </div>
          </div>
        </section>

        <aside className="col-span-1 md:col-span-4 space-y-8">
          <div className="bg-surface-container-low rounded-lg p-6">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-error">trending_down</span>
              Weak Knowledge Areas
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-on-surface">Newtonian Physics</span>
                  <span className="text-on-surface-variant">32% Mastery</span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-error w-[32%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-on-surface-variant italic">Core Concept: Action & Reaction</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-on-surface">Historical Chronology</span>
                  <span className="text-on-surface-variant">45% Mastery</span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-container w-[45%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-on-surface-variant italic">Core Concept: The Industrial Age</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-on-surface">Data Structures</span>
                  <span className="text-on-surface-variant">58% Mastery</span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container w-[58%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-on-surface-variant italic">Core Concept: Binary Trees</p>
              </div>
            </div>
            
            <button className="w-full mt-8 border-2 border-outline-variant/30 text-on-surface-variant py-3 rounded-xl font-headline font-bold text-sm hover:bg-surface-container transition-colors">
              Generate Review Session
            </button>
          </div>

          {/* AI Notice Card */}
          <div className="bg-primary p-6 rounded-lg relative overflow-hidden text-white shadow-xl">
            <div className="relative z-10">
              <h3 className="text-xl font-headline font-bold mb-2">AI Educator Assistant</h3>
              <p className="text-xs text-on-primary-container/80 mb-6 leading-relaxed">
                "Students are struggling with Newton's 3rd law. Shall I prepare a new interactive VR lab for tomorrow's session?"
              </p>
              <div className="flex gap-2">
                <button className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full text-xs font-bold font-headline transition-transform hover:scale-105 active:scale-95">Yes, Prepare Lab</button>
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-bold font-headline transition-colors">Dismiss</button>
              </div>
            </div>
            {/* Decorative element for Glassmorphism/AI feel */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary-container/20 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-surface-container-low rounded-lg p-6">
            <h3 className="text-sm font-headline font-bold text-on-surface mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-surface-container-highest text-primary font-headline font-bold flex flex-col items-center justify-center w-12 h-12 rounded-lg">
                  <span className="text-xs">OCT</span>
                  <span className="text-lg leading-none">25</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-on-surface">Parent-Teacher Meeting</h4>
                  <p className="text-[10px] text-on-surface-variant">Focus: Explorer Growth Plans</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-surface-container-highest text-secondary font-headline font-bold flex flex-col items-center justify-center w-12 h-12 rounded-lg">
                  <span className="text-xs">OCT</span>
                  <span className="text-lg leading-none">28</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-on-surface">Mars Colony Expedition</h4>
                  <p className="text-[10px] text-on-surface-variant">Multi-class VR Field Trip</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95 group">
          <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">auto_awesome</span>
        </button>
      </div>
    </main>
  );
}

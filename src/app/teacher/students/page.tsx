import Image from "next/image";

export default function StudentDirectory() {
  return (
    <main className="min-h-[calc(100vh-6rem)] md:p-8">
      {/* Header */}
      <header className="relative mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold text-primary/5 absolute -top-4 md:-top-8 -left-2 pointer-events-none select-none tracking-tighter">DIRECTORY</h2>
        <div className="flex flex-col md:flex-row justify-between md:items-end relative z-10 gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight font-headline">Student Directory</h3>
            <p className="text-on-surface-variant font-medium">Class 10-B • 28 Students</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-1 items-center bg-surface-container-high px-4 py-2 rounded-xl">
              <span className="material-symbols-outlined text-outline mr-2">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full md:w-64 outline-none" placeholder="Search students..." type="text"/>
            </div>
            <button className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-5 py-2 rounded-xl font-bold hover:translate-y-[-2px] transition-all shadow-[0_4px_0_0_#1b6b4f] active:shadow-none active:translate-y-1">
              <span className="material-symbols-outlined">add</span>
              Enroll
            </button>
          </div>
        </div>
      </header>

      {/* AI Insights Highlight Cards (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        <div className="col-span-1 md:col-span-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">psychology</span>
            <span className="text-sm font-bold uppercase tracking-widest text-on-surface-variant font-headline">AI Attention Alerts</span>
          </div>
        </div>

        {/* Priority Card 1 */}
        <div className="col-span-1 md:col-span-7 bg-primary-container rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-[0_16px_32px_-12px_rgba(79,70,229,0.2)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 gap-4">
              <div className="flex gap-4 items-center">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAExIi8qQ_NOgwg4qyhgJVCgjNDwgHOzwkXPnOh4dO5uAFo4f8ilRLkVZIeBgJuenC0E4SwDz7H459ICvXL9h8d6c2HkCf08ICdlAuwh6mnZp--GxiIMivIXlGPrNLV5GJyKSyxaEEih86KxLizo4-TuHJERl7hTGoXQAEP97w6fWzmXZFQMDxdLlB2JhTGEnxTt3XbtjMR8by_jYJp-0ReUnHxksvbK55M7OyaohV1rP7bYMFfT0I1Xu_myfPosVN8RQxkgADo66R_" width={64} height={64} alt="Student" className="w-16 h-16 rounded-xl object-cover border-2 border-white/20" />
                <div>
                  <h4 className="text-xl md:text-2xl font-bold font-headline">Liam Henderson</h4>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">Mathematics Block</span>
                </div>
              </div>
              <div className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm md:text-base self-start">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                Intervention Needed
              </div>
            </div>
            <p className="text-base md:text-lg text-primary-fixed leading-relaxed mb-6 max-w-lg">
              Liam's engagement in geometry modules has dropped by 40% this week. AI suggests a personalized visual-spatial review session.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors font-headline">Start AI Tutorial</button>
              <button className="bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors font-headline">View Progress Map</button>
            </div>
          </div>
        </div>

        {/* Priority Card 2 */}
        <div className="col-span-1 md:col-span-5 bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-[0_16px_32px_-12px_rgba(79,70,229,0.08)] relative border border-outline-variant/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
            </div>
            <div>
              <h4 className="text-lg font-bold font-headline">Rising Star: Maya Chen</h4>
              <p className="text-sm text-on-surface-variant font-medium">98th Percentile in Literacy</p>
            </div>
          </div>
          <p className="text-on-surface-variant mb-6 font-medium leading-relaxed">
            Maya has completed 3 weeks of curriculum in 4 days. Suggest unlocking "Advanced Narrative Theory" module.
          </p>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-4/5 rounded-full"></div>
          </div>
          <div className="mt-4 flex justify-between text-xs font-bold uppercase text-on-surface-variant tracking-wider font-headline">
            <span>Curriculum Pace</span>
            <span className="text-secondary">Accelerated</span>
          </div>
        </div>
      </section>

      {/* Main Class Roster - Staircase Layout */}
      <section className="bg-surface-container-low rounded-2xl p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <h4 className="text-xl font-bold text-on-surface font-headline">Class Roster</h4>
          <div className="flex gap-2 self-end md:self-auto">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-white rounded-lg shadow-sm border border-outline-variant/10">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-white rounded-lg shadow-sm border border-outline-variant/10">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4 flex flex-col">
          {/* Roster Item 1 */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10 md:ml-0 flex flex-col md:flex-row items-start md:items-center justify-between group hover:-translate-y-1 transition-all duration-200 gap-4">
            <div className="flex items-center gap-4">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcShwRxXYtAU1tAhsCS3ylUxRCqB-5RSNTO84wwv4HqQnRo7zRyXeEsshoNilQnuu5bxQm-C0SivMvDdYzeXvmp02jzVtkxfeaj3dPFO2oKyFtt2n5JMjr4Is60aWFpxxLzLNnk0RybhlTkWs54oHijytKuvr6w0H35qIpJKjfayFN8jKp8VjfkWN2ZPH2TJyRh8x0sZQ8x8MgTlWGYEWK5TPt3sJcSR0fG8DNvX8ncw6VtmV99PX5u88x1ZvJ-FHSDKUog4Pj4IdM" width={48} height={48} alt="Student" className="rounded-xl object-cover" />
              <div>
                <h5 className="font-bold text-on-surface font-headline">Alice Thompson</h5>
                <span className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase tracking-widest">Student ID: #88210</span>
              </div>
            </div>
            <div className="flex gap-6 md:gap-12 items-center w-full md:w-auto justify-between md:justify-end">
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase mb-1 font-headline">Attendance</p>
                <p className="font-bold text-on-surface">98%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase mb-1 font-headline">Avg Grade</p>
                <p className="font-bold text-on-surface">A-</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-secondary-fixed text-on-secondary-fixed px-2 md:px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase md:block hidden">Stable</span>
                <button className="p-2 bg-surface-container hover:bg-primary border border-outline-variant/10 hover:text-white rounded-lg transition-all">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Roster Item 2 */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10 md:ml-4 flex flex-col md:flex-row items-start md:items-center justify-between group hover:-translate-y-1 transition-all duration-200 gap-4">
            <div className="flex items-center gap-4">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuApE1ziF6rcC670N9Y4BobTC4oK_7gbsJsYBQVSVs0MqRRGXHN2enGr7Zg43Kf78i8-Lg7ysNs873kk8k1-PG3_D_3g0Er0gB0Iz1JpogyPmo2wvw_-FsIRv1x1VQCVNowFwwYlGmkUWpfwFA6RstAKpNmhfiJ9kUVf8bK9NCPwGiYE2iErPTZ4uCTY6BoChq8_-DVxnHiEvqzkGe2AJJ4w5EwwK-kDIObJLeQnZjsOEQ0O792--U0S_I5hG2Z1EGi1PSZnYI92r989" width={48} height={48} alt="Student" className="rounded-xl object-cover" />
              <div>
                <h5 className="font-bold text-on-surface font-headline">David Miller</h5>
                <span className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase tracking-widest">Student ID: #88211</span>
              </div>
            </div>
            <div className="flex gap-6 md:gap-12 items-center w-full md:w-auto justify-between md:justify-end">
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase mb-1 font-headline">Attendance</p>
                <p className="font-bold text-on-surface">85%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase mb-1 font-headline">Avg Grade</p>
                <p className="font-bold text-on-surface">B</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 md:px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase md:block hidden">Fluctuating</span>
                <button className="p-2 bg-surface-container hover:bg-primary border border-outline-variant/10 hover:text-white rounded-lg transition-all">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Roster Item 3 */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10 md:ml-8 flex flex-col md:flex-row items-start md:items-center justify-between group hover:-translate-y-1 transition-all duration-200 gap-4">
            <div className="flex items-center gap-4">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoy_wzxX59KMLgQw34zbFd9CKgIieQXf4yVA6MyddQkWVpDvO52x9yuYYugKx0M7WM4JN2esIp6lL_n3HzDk-e6n3bYf606k_N1X4R2zdVSbDfKKpPOa7wsebs_P80pAMCccBmZ1d82yfUTvhdndx9pMCTLSZCloFQNqRlu_UUo8D5qVudYLxWWeDxPMhr5P-5_p-ZnmKpeVKmHrsSQi1xLOQ4wS_DzvFHdJ0vyI4S-CnzIVFtimRa8u_Zh3LByCfP5jI-4DoCKW7V" width={48} height={48} alt="Student" className="rounded-xl object-cover" />
              <div>
                <h5 className="font-bold text-on-surface font-headline">Elena Rodriguez</h5>
                <span className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase tracking-widest">Student ID: #88212</span>
              </div>
            </div>
            <div className="flex gap-6 md:gap-12 items-center w-full md:w-auto justify-between md:justify-end">
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase mb-1 font-headline">Attendance</p>
                <p className="font-bold text-on-surface">100%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase mb-1 font-headline">Avg Grade</p>
                <p className="font-bold text-on-surface">A+</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-secondary-fixed text-on-secondary-fixed px-2 md:px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase md:block hidden">Excelling</span>
                <button className="p-2 bg-surface-container hover:bg-primary border border-outline-variant/10 hover:text-white rounded-lg transition-all">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Quick Insights Overlay */}
      <div className="fixed bottom-8 right-8 w-80 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white hidden md:block">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <h6 className="font-bold text-on-surface font-headline">Daily Pulse</h6>
          </div>
          <span className="text-[10px] font-black uppercase text-secondary tracking-tighter">Live</span>
        </div>
        <p className="text-sm text-on-surface-variant mb-4">Class focus is at <span className="font-bold">82%</span>. Best time for complex tasks is the next 45 minutes.</p>
        <div className="flex -space-x-2">
          <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1EuXMPHlQK3-MNY6sezsqtUa4KPCQTtEMdxiEfrzrrh67XJHkHw7IhtxhNYkvQD4VX4CXFMSr87wdP4XcOdYx6_TxpE-OjxVAJ9jIDkdaXCZok_b8UCimdbGApspaIhgLrUUfHAKaL_vte5_DeT4nJcMeFAKd2kRY6pkngo3EZ1vOVpXZNPo2CSXmrVUT4cTswx1V5hSATq6JzIgkBYVN2TyK-OBbP7IyE7g25eS6b_CvCbYrcfmu4qJ-XeAycQYgSvwFuvjAAx3H" width={32} height={32} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
          <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg3zOQbw33eMr3bBgIjfFG1klukWuycggD-iCnJaffUkxj8YkueUGMp-GByKfVJ8F2pB-kAblwPy83h6QQ1S1sRAmwnBNEwWA7egP189KPfzi8dI5s5Xiy1gfjEr3-HzFRaaJOV46w-9_pp1FEmT3E3iZUfGFfifeFtHDK906z1g-xvHNKigMTcz71UF6G2P_uimW-qTE3GJozbwibPSOzinc_g1Zwngy23Tdb2lIJfmOPwOEVmNVp3Y3ZNJX4D85zSq0VYRUfYHDI" width={32} height={32} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
          <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl1fR1i5R5oYm59uFWMPKtvbwblwNdXPFG9O8FnDWcPcVWzK23X4DWR2MzpKTz8Nd-Dz2GwgyShw1OJEyvUhgJQ99LecWQlSzTrSI44RDgr-jlL6UThQQycVv8WZ57lAPLGPEobTow0q1GrlsPmSTe8-swt4-L2sZARv5iJJaUxpZpMwxwkgp-Q1wEDrPODSR9lOvJvTbc-VKjchQazwG5p_KBFbi2WVPhidm2-cRQMKJwtBXyucBezbO-1UVgfyX9Zp8jH9btsnid" width={32} height={32} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
          <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-primary">+25</div>
        </div>
      </div>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function AdventureMap() {
  return (
    <div className="relative w-full h-[calc(100vh-6rem)] -m-4 md:-m-8 bg-surface overflow-hidden flex items-center justify-center font-body">
      {/* World Map Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9xv-o-LWFc6H-ACW511ryODUDNDKrGXD5DAKUAkEuFyJwZKjUqqpxMacs9_ZVhinYaGZHNZTMmRhPnBiLGGde_hOTE_E1lZuVjgiB5SJXU7QdQ49xhksTGqGhUn-kztWbLUMGl15L8EnZHuG6_igC3YsIjI1lF73eNlCzHFNSmNs65e7AYLdxR_X7VRi4_0BahSMunuZzKYpkOcR4x6rRgp7tzgXyndbFwWBw3KA-OIeEdaUOoChg5iwUvhFi4KaxLaaLmXSJ5IDd" 
          alt="Adventure Map Island" 
          fill
          className="object-cover opacity-80 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
      </div>

      {/* Interactive Map Elements */}
      <div className="relative z-10 w-full h-full max-w-6xl mx-auto flex items-center justify-center">
        {/* Note: SVG path representation using simple absolute styling for desktop/tablet view */}
        <svg className="absolute inset-0 w-full h-full hidden md:block" fill="none" viewBox="0 0 1200 800">
          <path d="M200 600 Q 400 650 600 400 T 1000 200" stroke="rgba(53, 37, 205, 0.4)" strokeLinecap="round" strokeWidth="8" strokeDasharray="12 12"></path>
        </svg>

        {/* Level Node: Science Springs (Completed) */}
        <div className="absolute left-[10%] bottom-[10%] md:left-[15%] md:bottom-[20%] group">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary-fixed rounded-full flex items-center justify-center shadow-lg shadow-secondary/30 ring-4 ring-white">
              <span className="material-symbols-outlined text-on-secondary-fixed text-3xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
            </div>
            <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 bg-white px-3 md:px-4 py-1 rounded-full shadow-md whitespace-nowrap">
              <p className="text-[10px] md:text-xs font-bold text-secondary uppercase tracking-tight font-headline">Science Springs</p>
            </div>
            <div className="absolute -top-2 md:-top-4 -right-2 md:-right-4 bg-tertiary-fixed text-on-tertiary-fixed w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 border-white">
              <span className="material-symbols-outlined text-xs md:text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
            </div>
          </div>
        </div>

        {/* Level Node: Math Mountains (Current Active) */}
        <div className="absolute left-[50%] top-[30%] md:left-[45%] md:top-[40%] transform -translate-x-1/2 group">
          <div className="relative cursor-pointer hover:scale-110 transition-transform duration-300">
            {/* Glow effect */}
            <div className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-primary/40 ring-4 md:ring-8 ring-primary-container/30 relative z-10">
              <span className="material-symbols-outlined text-white text-4xl md:text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>calculate</span>
            </div>
            <div className="absolute -bottom-10 md:-bottom-14 left-1/2 -translate-x-1/2 bg-primary text-white px-4 md:px-6 py-2 rounded-xl md:rounded-2xl shadow-xl z-20 whitespace-nowrap border-2 border-primary-container">
              <p className="text-[10px] md:text-sm font-black uppercase tracking-widest font-headline">Math Mountains</p>
            </div>
          </div>
        </div>

        {/* Level Node: Grammar Forest (Locked) */}
        <div className="absolute right-[5%] top-[5%] md:right-[10%] md:top-[15%] opacity-60">
          <div className="relative grayscale">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-container rounded-full flex items-center justify-center shadow-md ring-4 ring-white">
              <span className="material-symbols-outlined text-on-surface-variant text-3xl md:text-4xl">park</span>
            </div>
            <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 bg-surface-container-high px-3 md:px-4 py-1 rounded-full whitespace-nowrap">
              <p className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase tracking-tight font-headline">Grammar Forest</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            </div>
          </div>
        </div>

        {/* AI Character Bubble */}
        <div className="absolute right-[10%] md:right-[20%] bottom-[15%] md:bottom-[30%] max-w-[200px] md:max-w-xs">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border-l-4 border-tertiary-fixed relative">
            <div className="absolute -bottom-3 -left-3 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full p-1 shadow-lg ring-2 ring-tertiary">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7VakaPfmCsCpoEFdcsp78Zk88DwPMWdAYEoJhjQpqG_IdIZp0IE6serJD3zZz-bYc8N5BCjmIaDHzh19IT5VuYdCEFBRx0Y-riVr_nHJNnufDqqZXQxT46Gh26cwkqqnm0VSdiY-XIGUgTOat-SBpF5Er3BQ0d9BrfzJPSqHISpD5fmLV1Himpuup7ig7exMLS1zBceGjyh8r52DYnXX-N_3sCZnRrnS2gSLWSjKQwYQW4m-8HD1Tk0vJR3uO1QDXOk1G8zNXvoFY" width={48} height={48} alt="Socratic" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="ml-8 md:ml-10">
              <p className="text-[10px] md:text-xs font-black text-tertiary uppercase tracking-widest mb-1 font-headline">Socratic Hint</p>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                "If the summit is at x + 500, and we are at the base, what happens to x as we climb?"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SideNavBar (Parchment Quest Log) - Visible on larger screens */}
      <aside className="hidden xl:flex fixed right-0 top-20 z-40 h-[calc(100%-8rem)] w-72 rounded-l-3xl bg-surface/80 backdrop-blur-2xl shadow-[-20px_0_30px_-10px_rgba(0,0,0,0.1)] flex-col p-4 space-y-4">
        <div className="flex items-center gap-3 p-2">
           <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtXMwJPFzY6KgCy-vp1zUl4yNFMgH6ngI798dUfs_CwV2-SYko9EA1hQVZknrHnI5ERRkLgcdYHJApqLIMPIFW60tSQij5pLtGvjvGW2kXlA7R8-ky0cQmfR8jJaYItmCn1YSst1d-uWnHVZXlRamPTFQNIXyhCIX5M2qqpSRjwNYNNckvG_QnkY4rqrBdgThWuet-yFG44RB4Tz-P78jTssrlxZglWVlMH5ghZBx4TTYaE8VoJ-lkGdG9ahV8JbjLD5bZaNbJN2c3" width={48} height={48} alt="AI Tutor" className="object-cover" />
           </div>
           <div>
              <p className="text-lg font-black text-primary font-headline">Gia sư AI</p>
              <p className="text-xs font-semibold tracking-wide text-on-surface-variant">Sẵn sàng phiêu lưu?</p>
           </div>
        </div>
        
        {/* Parchment styling emulation */}
        <div className="flex-grow bg-[#fffvw] rounded-2xl p-6 shadow-inner border border-outline-variant/30 rotate-[0deg] relative overflow-hidden" style={{backgroundColor: '#fdfaef', backgroundImage: 'radial-gradient(#e5dbba 0.5px, transparent 0.5px)', backgroundSize: '10px 10px'}}>
           <h3 className="font-headline font-extrabold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">menu_book</span>
              Nhật ký Nhiệm vụ
           </h3>
           <ul className="space-y-4">
              <li className="border-b border-outline-variant/30 pb-2">
                 <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Nhiệm vụ chính</p>
                 <p className="text-on-surface font-bold text-sm">Giải phương trình của Những Đỉnh Núi</p>
              </li>
              <li className="border-b border-outline-variant/30 pb-2">
                 <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Thử thách ngày</p>
                 <p className="text-on-surface font-medium text-sm">Đọc 3 ghi chú Khoa học</p>
              </li>
              <li className="border-b border-outline-variant/30 pb-2 opacity-60">
                 <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Sắp diễn ra</p>
                 <p className="text-on-surface font-medium text-sm">Động từ trong Rừng sâu</p>
              </li>
           </ul>
        </div>
        
        <button className="bg-gradient-to-r from-primary to-primary-container text-white py-4 px-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all w-full font-headline mt-auto shadow-lg shadow-primary/20 3d-button">
           Bắt đầu Nhiệm vụ
        </button>
      </aside>

      {/* Floating Action Button: Magic Lens (Mobile/Tablet) */}
      <div className="fixed bottom-24 right-4 md:right-8 z-50 xl:hidden">
        <button className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary-fixed-dim rounded-full shadow-2xl shadow-primary/50 flex flex-col items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group border-4 border-primary-container">
          <span className="material-symbols-outlined text-3xl md:text-4xl group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>center_focus_weak</span>
          <span className="text-[8px] md:text-[9px] font-black uppercase mt-1 font-headline">Lens</span>
        </button>
      </div>

    </div>
  );
}

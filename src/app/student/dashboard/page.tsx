import Image from "next/image";

export default function StudentDashboard() {
  return (
    <>
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight font-headline leading-tight">
            Chào buổi sáng, <br/><span className="text-primary">Young Explorer!</span>
          </h2>
          <p className="mt-4 text-on-surface-variant max-w-md">Sẵn sàng để tiếp tục cuộc hành trình khám phá tri thức của bạn hôm nay chưa?</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          <div className="flex-shrink-0 bg-secondary-container p-4 rounded-lg flex items-center space-x-3 min-w-[140px]">
            <div className="bg-white/40 p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-secondary-container uppercase tracking-wider font-headline">Streak</p>
              <p className="text-xl font-black text-on-secondary-container font-headline">8 Days</p>
            </div>
          </div>
          <div className="flex-shrink-0 bg-tertiary-fixed p-4 rounded-lg flex items-center space-x-3 min-w-[140px]">
            <div className="bg-white/40 p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-tertiary-fixed uppercase tracking-wider font-headline">Stars</p>
              <p className="text-xl font-black text-on-tertiary-fixed font-headline">1,240</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Curriculum & Progress */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container-low rounded-lg p-6 md:p-10 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface font-headline">Lộ trình học tập</h3>
                  <p className="text-sm text-on-surface-variant">Hành trình khám phá vũ trụ tri thức</p>
                </div>
                <button className="bg-white text-primary p-3 rounded-full shadow-sm hover:scale-105 transition-transform flex items-center justify-center">
                  <span className="material-symbols-outlined">map</span>
                </button>
              </div>

              {/* Learning Journey Map */}
              <div className="flex flex-col space-y-12 py-4">
                {/* Unit 1: Finished */}
                <div className="flex items-center space-x-6">
                  <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 bg-secondary flex items-center justify-center rounded-full text-white shadow-lg ring-8 ring-secondary-container z-10">
                      <span className="material-symbols-outlined text-3xl">check</span>
                    </div>
                    <div className="absolute top-16 w-1 h-12 bg-secondary-container"></div>
                  </div>
                  <div className="bg-surface-container-lowest p-5 rounded-lg flex-1 stitch-effect shadow-sm">
                    <p className="text-xs font-bold text-secondary uppercase font-headline">Unit 01</p>
                    <h4 className="font-bold text-on-surface mt-1">Sự kỳ diệu của Đại dương</h4>
                  </div>
                </div>

                {/* Unit 2: Current */}
                <div className="flex items-center space-x-6">
                  <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary flex items-center justify-center rounded-full text-white shadow-lg ring-8 ring-primary-fixed z-10">
                      <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                    </div>
                    <div className="absolute top-16 w-1 h-12 bg-outline-variant/30 border-dashed border-l-2"></div>
                  </div>
                  <div className="bg-primary p-6 rounded-lg flex-1 shadow-lg transform -rotate-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-primary-fixed uppercase font-headline">Đang học</p>
                        <h4 className="text-lg font-bold text-white mt-1">Chinh phục Sao Hỏa</h4>
                      </div>
                      <div className="text-white bg-white/20 px-3 py-1 rounded-full text-xs font-bold">4/10 Lessons</div>
                    </div>
                    <div className="w-full bg-white/20 h-2 rounded-full mt-4">
                      <div className="bg-white h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                </div>

                {/* Unit 3: Locked */}
                <div className="flex items-center space-x-6 opacity-60">
                  <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 bg-surface-variant flex items-center justify-center rounded-full text-on-surface-variant z-10">
                      <span className="material-symbols-outlined text-3xl">lock</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-5 rounded-lg flex-1 stitch-effect">
                    <p className="text-xs font-bold text-on-surface-variant uppercase font-headline">Unit 03</p>
                    <h4 className="font-bold text-on-surface mt-1">Cánh rừng nhiệt đới bí ẩn</h4>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* AI Tutor Card */}
          <div className="glass-panel p-8 rounded-lg stitch-effect relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-container rounded-full blur-2xl opacity-50"></div>
            <div className="flex items-center space-x-4 mb-6 relative z-10">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary-fixed flex items-center justify-center shadow-lg relative overflow-hidden p-2">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdgwWhjQ70vzlJfj9PeVxyms7H11FGmETEpgt6sPBvpAxB-QqY0caFwaQeM4Th__3eOCMSMAR6w_Uqrk8mppFBq3URad3d6Ew2xdYSraWKmbO5hvhsS-RAKWGDh4q0ehy8zVytLroPtnP-kC5N3qOGJkRKJMPYTpOIe0H7UwwXfOLNTGRtgDK4IFVum_7tHeb_rTzr-r8nT4R9AxilH-8DVg_E2lBR7OTfSU_FpH1UweKOeEuVfqdpHpZy3wYC8ACUaiZTBic9u7xY" 
                    alt="AI Mascot" 
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-on-surface font-headline">Gia sư AI</h3>
                <p className="text-sm text-secondary font-semibold">Tớ đang sẵn sàng!</p>
              </div>
            </div>
            
            <div className="bg-secondary-container p-4 rounded-xl mb-6 relative z-10">
              <div className="absolute -left-2 top-4 w-4 h-4 bg-secondary-container rotate-45"></div>
              <p className="text-sm text-on-secondary-container font-medium leading-relaxed">
                Chào bạn! Hôm nay chúng ta sẽ cùng nhau khám phá về **Trọng lực trên các hành tinh** nhé. Bạn đã sẵn sàng chưa?
              </p>
            </div>
            
            <div className="space-y-3 relative z-10">
              <button className="w-full py-3 bg-white hover:bg-slate-50 text-primary border border-primary-fixed rounded-xl text-sm font-bold transition-all text-left px-4 flex justify-between items-center group">
                Cùng bắt đầu thôi!
                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <button className="w-full py-3 bg-white hover:bg-slate-50 text-on-surface-variant border border-outline-variant rounded-xl text-sm font-medium transition-all text-left px-4">
                Tớ muốn ôn tập bài cũ
              </button>
            </div>
          </div>

          {/* Daily Tasks */}
          <div className="bg-surface-container-low p-8 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-on-surface font-headline">Nhiệm vụ ngày</h3>
              <span className="text-xs font-bold text-primary bg-primary-fixed px-3 py-1 rounded-full">3/5 Xong</span>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="text-sm text-on-surface-variant line-through font-medium">Hoàn thành bài đọc Vũ trụ</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="text-sm text-on-surface-variant line-through font-medium">Video về lỗ đen</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="text-sm text-on-surface-variant line-through font-medium">Luyện tập từ vựng tiếng Anh</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-6 h-6 rounded-lg border-2 border-outline-variant group-hover:border-primary transition-colors"></div>
                <span className="text-sm text-on-surface font-semibold group-hover:text-primary transition-colors">Vượt qua bài Quiz tuần</span>
              </li>
              <li className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-6 h-6 rounded-lg border-2 border-outline-variant group-hover:border-primary transition-colors"></div>
                <span className="text-sm text-on-surface font-semibold group-hover:text-primary transition-colors">Viết cảm nhận bài học</span>
              </li>
            </ul>
            <div className="mt-8 p-4 bg-tertiary-fixed rounded-xl flex items-center space-x-3">
              <span className="material-symbols-outlined text-on-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
              <p className="text-xs font-bold text-on-tertiary-fixed font-headline">Hoàn thành để nhận thêm 50 Stars!</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h3 className="text-2xl font-bold text-on-surface font-headline mb-6">Thành tựu mới nhất</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-6 rounded-lg stitch-effect text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-fixed rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <p className="text-sm font-bold text-on-surface">Ngôi sao chăm chỉ</p>
            <p className="text-[10px] text-on-surface-variant mt-1">Học 7 ngày liên tiếp</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-lg stitch-effect text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 mx-auto mb-4 bg-secondary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            </div>
            <p className="text-sm font-bold text-on-surface">Mọt sách chính hiệu</p>
            <p className="text-[10px] text-on-surface-variant mt-1">Đọc 20 tài liệu mới</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-lg stitch-effect text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 mx-auto mb-4 bg-tertiary-fixed rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>calculate</span>
            </div>
            <p className="text-sm font-bold text-on-surface">Nhà toán học trẻ</p>
            <p className="text-[10px] text-on-surface-variant mt-1">Giải 100 bài toán</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-lg stitch-effect text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-fixed-dim rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-fixed-variant text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>palette</span>
            </div>
            <p className="text-sm font-bold text-on-surface">Thiên tài nghệ thuật</p>
            <p className="text-[10px] text-on-surface-variant mt-1">Tạo 5 dự án vẽ</p>
          </div>
        </div>
      </section>
    </>
  );
}

import { getQuestsAction } from "@/modules/backend/actions/quest";
import { getUserStatsAction } from "@/modules/backend/actions/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function AdventureMap() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("student.adventure");
  
  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const userStatsResult = await getUserStatsAction(userId);
  const userLevel = userStatsResult.success ? userStatsResult.data.level : 1;
  
  const questsResult = await getQuestsAction(userLevel);
  const quests = questsResult.success ? questsResult.data : [];

  // Map quests to positions
  const questPositions = [
    { left: '15%', bottom: '20%' },
    { left: '45%', top: '40%' },
    { right: '10%', top: '15%' },
    { left: '30%', bottom: '40%' }
  ];

  const getQuestIcon = (subject: string) => {
    const icons: Record<string, string> = {
      science: 'waves',
      math: 'calculate',
      language: 'park',
      history: 'castle'
    };
    return icons[subject] || 'star';
  };

  return (
    <div className="relative w-full h-[calc(100vh-6rem)] -m-4 md:-m-8 bg-surface dark:bg-surface-dim overflow-hidden flex items-center justify-center font-body">
      {/* World Map Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9xv-o-LWFc6H-ACW511ryODUDNDKrGXD5DAKUAkEuFyJwZKjUqqpxMacs9_ZVhinYaGZHNZTMmRhPnBiLGGde_hOTE_E1lZuVjgiB5SJXU7QdQ49xhksTGqGhUn-kztWbLUMGl15L8EnZHuG6_igC3YsIjI1lF73eNlCzHFNSmNs65e7AYLdxR_X7VRi4_0BahSMunuZzKYpkOcR4x6rRgp7tzgXyndbFwWBw3KA-OIeEdaUOoChg5iwUvhFi4KaxLaaLmXSJ5IDd" 
          alt="Adventure Map" 
          fill
          className="object-cover opacity-80 mix-blend-multiply dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent dark:from-surface-dim"></div>
      </div>

      {/* Interactive Map Elements */}
      <div className="relative z-10 w-full h-full max-w-6xl mx-auto flex items-center justify-center">
        {/* Quest Path */}
        <svg className="absolute inset-0 w-full h-full hidden md:block" fill="none" viewBox="0 0 1200 800">
          <path d="M200 600 Q 400 650 600 400 T 1000 200" stroke="rgba(53, 37, 205, 0.4)" strokeLinecap="round" strokeWidth="8" strokeDasharray="12 12"></path>
        </svg>

        {/* Dynamic Quest Nodes */}
        {quests.map((quest, index) => {
          const position = questPositions[index] || questPositions[0];
          const isActive = quest.status === 'in_progress';
          const isCompleted = quest.status === 'completed';
          const isLocked = quest.status === 'locked';

          return (
            <div 
              key={quest.id}
              className={`absolute ${isLocked ? 'opacity-60' : ''}`}
              style={position}
            >
              <div className="relative">
                {isActive && (
                  <div className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                )}
                
                <div className={`
                  ${isActive ? 'w-24 h-24 md:w-32 md:h-32' : 'w-16 h-16 md:w-20 md:h-20'}
                  ${isCompleted ? 'bg-secondary-fixed' : isActive ? 'bg-primary' : 'bg-surface-container dark:bg-surface-container-high'}
                  ${isLocked ? 'grayscale' : ''}
                  rounded-full flex items-center justify-center shadow-lg
                  ${isActive ? 'ring-4 md:ring-8 ring-primary-container/30' : 'ring-4 ring-white dark:ring-surface-container'}
                  transition-all duration-300 hover:scale-110 cursor-pointer
                `}>
                  <span 
                    className={`material-symbols-outlined ${isActive ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} ${isCompleted || isActive ? 'text-white' : 'text-on-surface-variant'}`}
                    style={{ fontVariationSettings: isCompleted ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {getQuestIcon(quest.subject)}
                  </span>
                </div>

                <div className={`absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 ${isActive ? 'bg-primary text-white px-4 md:px-6 py-2 rounded-xl md:rounded-2xl border-2 border-primary-container' : 'bg-white dark:bg-surface-container px-3 md:px-4 py-1 rounded-full'} shadow-md whitespace-nowrap`}>
                  <p className={`text-[10px] md:text-xs font-bold uppercase tracking-tight font-headline ${isActive ? '' : isCompleted ? 'text-secondary' : 'text-on-surface-variant'}`}>
                    {quest.title}
                  </p>
                </div>

                {isCompleted && (
                  <div className="absolute -top-2 md:-top-4 -right-2 md:-right-4 bg-tertiary-fixed text-on-tertiary-fixed w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 border-white dark:border-surface-container">
                    <span className="material-symbols-outlined text-xs md:text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                )}

                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full">
                    <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  </div>
                )}

                {quest.progress > 0 && !isCompleted && (
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-24">
                    <div className="h-1.5 bg-surface-container dark:bg-surface-container-high rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${quest.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* AI Character Bubble */}
        <div className="absolute right-[10%] md:right-[20%] bottom-[15%] md:bottom-[30%] max-w-[200px] md:max-w-xs">
          <div className="bg-white/90 dark:bg-surface-container/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border-l-4 border-tertiary-fixed relative">
            <div className="absolute -bottom-3 -left-3 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-surface-container rounded-full p-1 shadow-lg ring-2 ring-tertiary">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7VakaPfmCsCpoEFdcsp78Zk88DwPMWdAYEoJhjQpqG_IdIZp0IE6serJD3zZz-bYc8N5BCjmIaDHzh19IT5VuYdCEFBRx0Y-riVr_nHJNnufDqqZXQxT46Gh26cwkqqnm0VSdiY-XIGUgTOat-SBpF5Er3BQ0d9BrfzJPSqHISpD5fmLV1Himpuup7ig7exMLS1zBceGjyh8r52DYnXX-N_3sCZnRrnS2gSLWSjKQwYQW4m-8HD1Tk0vJR3uO1QDXOk1G8zNXvoFY" 
                width={48} 
                height={48} 
                alt="Socratic" 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <div className="ml-8 md:ml-10">
              <p className="text-[10px] md:text-xs font-black text-tertiary uppercase tracking-widest mb-1 font-headline">{t('socraticHint')}</p>
              <p className="text-xs md:text-sm text-on-surface-variant dark:text-on-surface font-medium leading-relaxed">
                {t('readyForAdventure', { level: userLevel })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quest Log Sidebar */}
      <aside className="hidden xl:flex fixed right-0 top-20 z-40 h-[calc(100%-8rem)] w-72 rounded-l-3xl bg-surface/80 dark:bg-surface-container/80 backdrop-blur-2xl shadow-[-20px_0_30px_-10px_rgba(0,0,0,0.1)] flex-col p-4 space-y-4">
        <div className="flex items-center gap-3 p-2">
          <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtXMwJPFzY6KgCy-vp1zUl4yNFMgH6ngI798dUfs_CwV2-SYko9EA1hQVZknrHnI5ERRkLgcdYHJApqLIMPIFW60tSQij5pLtGvjvGW2kXlA7R8-ky0cQmfR8jJaYItmCn1YSst1d-uWnHVZXlRamPTFQNIXyhCIX5M2qqpSRjwNYNNckvG_QnkY4rqrBdgThWuet-yFG44RB4Tz-P78jTssrlxZglWVlMH5ghZBx4TTYaE8VoJ-lkGdG9ahV8JbjLD5bZaNbJN2c3" 
              width={48} 
              height={48} 
              alt="AI Tutor" 
              className="object-cover" 
            />
          </div>
          <div>
            <p className="text-lg font-black text-primary font-headline">{t("title")}</p>
            <p className="text-xs font-semibold tracking-wide text-on-surface-variant">{t("questLog")}</p>
          </div>
        </div>
        
        <div className="flex-grow bg-[#fdfaef] dark:bg-surface-container-low rounded-2xl p-6 shadow-inner border border-outline-variant/30 relative overflow-hidden">
          <h3 className="font-headline font-extrabold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">menu_book</span>
            {t("questLog")}
          </h3>
          <ul className="space-y-4">
            {quests.filter(q => q.status !== 'locked').map((quest) => (
              <li key={quest.id} className="border-b border-outline-variant/30 pb-2">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                  {quest.status === 'in_progress' ? t('active') : quest.status === 'completed' ? t('completed') : t('available')}
                </p>
                <p className="text-on-surface font-bold text-sm">{quest.title}</p>
                <p className="text-xs text-on-surface-variant mt-1">{quest.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-tertiary font-bold">+{quest.xpReward} XP</span>
                  <span className="text-xs text-secondary font-bold">+{quest.starsReward} ⭐</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <Link href="/student/chat">
          <button className="bg-gradient-to-r from-primary to-primary-container text-white py-4 px-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all w-full font-headline mt-auto shadow-lg shadow-primary/20">
            {t('startQuest')}
          </button>
        </Link>
      </aside>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4 md:right-8 z-50 xl:hidden">
        <Link href="/student/chat">
          <button className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary-fixed-dim rounded-full shadow-2xl shadow-primary/50 flex flex-col items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group border-4 border-primary-container">
            <span className="material-symbols-outlined text-3xl md:text-4xl group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>center_focus_weak</span>
            <span className="text-[8px] md:text-[9px] font-black uppercase mt-1 font-headline">Start</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

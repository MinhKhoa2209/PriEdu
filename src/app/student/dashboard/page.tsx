import { getUserStatsAction, getStudentSubmissionsAction } from "@/modules/backend/actions/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { LanguageToggle } from "@/shared/components/ui/language-toggle";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("student.dashboard");
  
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch real user data
  const userId = (session.user as any).id;
  const userStatsResult = await getUserStatsAction(userId);
  const submissionsResult = await getStudentSubmissionsAction(userId);
  
  const userStats = userStatsResult.success ? userStatsResult.data : {
    name: session.user.name || "Explorer",
    level: 1,
    xp: 0,
    stars: 0,
    streak: 1
  };
  
  const submissions = submissionsResult.success ? submissionsResult.data : [];

  return (
    <>
      {/* Header with Settings */}
      <div className="flex justify-end gap-4 mb-6">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight font-headline leading-tight">
            {t("greeting")}, <br/><span className="text-primary">{userStats.name}!</span>
          </h2>
          <p className="mt-4 text-on-surface-variant max-w-md">{t("subtitle")}</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          <div className="flex-shrink-0 bg-secondary-container p-4 rounded-lg flex items-center space-x-3 min-w-[140px]">
            <div className="bg-white/40 dark:bg-black/20 p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-secondary-container uppercase tracking-wider font-headline">{t("streak")}</p>
              <p className="text-xl font-black text-on-secondary-container font-headline">{userStats.streak} {t("days")}</p>
            </div>
          </div>
          <div className="flex-shrink-0 bg-tertiary-fixed p-4 rounded-lg flex items-center space-x-3 min-w-[140px]">
            <div className="bg-white/40 dark:bg-black/20 p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-tertiary-fixed uppercase tracking-wider font-headline">{t("stars")}</p>
              <p className="text-xl font-black text-on-tertiary-fixed font-headline">{userStats.stars.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Curriculum & Progress */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container-low dark:bg-surface-container rounded-lg p-6 md:p-10 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface font-headline">{t("learningPath")}</h3>
                  <p className="text-sm text-on-surface-variant">{t("learningPathSubtitle")}</p>
                </div>
                <button className="bg-white dark:bg-surface-container-high text-primary p-3 rounded-full shadow-sm hover:scale-105 transition-transform flex items-center justify-center">
                  <span className="material-symbols-outlined">map</span>
                </button>
              </div>

              {/* Learning Journey Map - Placeholder for now */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary-container dark:bg-primary-container/20 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-3xl text-primary">science</span>
                    <h4 className="font-bold text-on-primary-container">Science Module</h4>
                  </div>
                  <div className="h-2 bg-white/30 dark:bg-black/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[65%] rounded-full"></div>
                  </div>
                  <p className="text-xs text-on-primary-container/70 mt-2">65% Complete</p>
                </div>
                
                <div className="bg-secondary-container dark:bg-secondary-container/20 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-3xl text-secondary">calculate</span>
                    <h4 className="font-bold text-on-secondary-container">Math Module</h4>
                  </div>
                  <div className="h-2 bg-white/30 dark:bg-black/30 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[82%] rounded-full"></div>
                  </div>
                  <p className="text-xs text-on-secondary-container/70 mt-2">82% Complete</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-lg p-6">
            <h3 className="text-xl font-bold text-on-surface font-headline mb-4">{t("recentActivity")}</h3>
            <div className="space-y-3">
              {submissions.length === 0 ? (
                <p className="text-on-surface-variant text-sm">No recent submissions</p>
              ) : (
                submissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="flex items-center gap-4 p-3 bg-surface-container-lowest dark:bg-surface-container-low rounded-lg">
                    <span className="material-symbols-outlined text-primary">assignment</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-on-surface">Homework Submission</p>
                      <p className="text-xs text-on-surface-variant">
                        Score: {submission.correctnessScore.toFixed(0)}%
                      </p>
                    </div>
                    <span className="text-xs text-on-surface-variant">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Achievements */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low dark:bg-surface-container rounded-lg p-6">
            <h3 className="text-lg font-bold text-on-surface font-headline mb-4">Level Progress</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-surface-container" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeWidth="8"></circle>
                  <circle 
                    className="text-primary" 
                    cx="64" 
                    cy="64" 
                    fill="transparent" 
                    r="56" 
                    stroke="currentColor" 
                    strokeDasharray="351.86" 
                    strokeDashoffset={351.86 * (1 - (userStats.xp % 100) / 100)} 
                    strokeLinecap="round" 
                    strokeWidth="8"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-primary font-headline">{userStats.level}</span>
                  <span className="text-xs text-on-surface-variant">Level</span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-on-surface-variant">
              {userStats.xp % 100} / 100 XP to next level
            </p>
          </div>

          <div className="bg-surface-container-low dark:bg-surface-container rounded-lg p-6">
            <h3 className="text-lg font-bold text-on-surface font-headline mb-4">{t("achievements")}</h3>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-surface-container-lowest dark:bg-surface-container-low rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-on-surface-variant opacity-30">emoji_events</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

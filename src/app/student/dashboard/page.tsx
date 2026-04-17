import { getUserStatsAction, getStudentSubmissionsAction, getModuleProgressAction } from "@/modules/backend/actions/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

// Module configuration (icons and colors only)
const MODULE_CONFIG: Record<string, {
  icon: string;
  gradient: string;
  border: string;
  bgColor: string;
  textColor: string;
}> = {
  science: {
    icon: 'science',
    gradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    border: 'border-blue-200 dark:border-blue-800/30',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  math: {
    icon: 'calculate',
    gradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    border: 'border-purple-200 dark:border-purple-800/30',
    bgColor: 'bg-purple-500',
    textColor: 'text-purple-600 dark:text-purple-400'
  },
  mathematics: {
    icon: 'calculate',
    gradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    border: 'border-purple-200 dark:border-purple-800/30',
    bgColor: 'bg-purple-500',
    textColor: 'text-purple-600 dark:text-purple-400'
  },
  english: {
    icon: 'menu_book',
    gradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    border: 'border-green-200 dark:border-green-800/30',
    bgColor: 'bg-green-500',
    textColor: 'text-green-600 dark:text-green-400'
  },
  history: {
    icon: 'history_edu',
    gradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    border: 'border-orange-200 dark:border-orange-800/30',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-600 dark:text-orange-400'
  }
};

// Achievement configuration - TODO: Move to database
const ACHIEVEMENTS = [
  { icon: 'emoji_events', color: 'text-yellow-500', unlocked: true },
  { icon: 'workspace_premium', color: 'text-blue-500', unlocked: true },
  { icon: 'military_tech', color: 'text-purple-500', unlocked: true },
  { icon: 'star', color: 'text-orange-500', unlocked: false },
  { icon: 'verified', color: 'text-green-500', unlocked: false },
  { icon: 'grade', color: 'text-pink-500', unlocked: false },
];

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("student.dashboard");
  
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch real user data
  const userId = (session.user as any).id;
  const [userStatsResult, submissionsResult, moduleProgressResult] = await Promise.all([
    getUserStatsAction(userId),
    getStudentSubmissionsAction(userId),
    getModuleProgressAction(userId)
  ]);
  
  const userStats = userStatsResult.success ? userStatsResult.data : {
    name: session.user.name || "Explorer",
    level: 1,
    xp: 0,
    stars: 0,
    streak: 0
  };
  
  const submissions = submissionsResult.success ? submissionsResult.data : [];
  
  // Get real module progress from database
  const moduleProgressData = moduleProgressResult.success ? moduleProgressResult.data : [];
  
  // Merge with config to get display properties
  const learningModules = moduleProgressData
    .map(module => {
      const config = MODULE_CONFIG[module.id] || MODULE_CONFIG['science']; // fallback
      return {
        ...module,
        ...config
      };
    })
    .filter(module => module.lessons > 0); // Only show modules with actual progress
  
  // Calculate XP progress
  const xpForNextLevel = 100;
  const currentLevelXP = userStats.xp % xpForNextLevel;
  const xpProgress = (currentLevelXP / xpForNextLevel) * 100;
  
  // Calculate achievements
  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.unlocked).length;
  const totalAchievements = ACHIEVEMENTS.length;
  
  // Daily goal progress - TODO: Fetch from user activity
  const dailyGoalTarget = 3;
  const dailyGoalCompleted = submissions.filter(s => {
    const today = new Date();
    const submissionDate = new Date(s.createdAt);
    return submissionDate.toDateString() === today.toDateString();
  }).length;
  const dailyGoalProgress = Math.min((dailyGoalCompleted / dailyGoalTarget) * 100, 100);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-on-surface dark:text-slate-100 mb-2">
              {t('greeting')}, <span className="text-primary">{userStats.name}</span>! 👋
            </h1>
            <p className="text-on-surface-variant dark:text-slate-400">{t('subtitle')}</p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex gap-3">
            <div className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-3 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl">local_fire_department</span>
                <div>
                  <p className="text-xs opacity-90">{t('streak')}</p>
                  <p className="text-xl font-bold">{userStats.streak} {t('days')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-secondary to-secondary-container text-white px-6 py-3 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl">stars</span>
                <div>
                  <p className="text-xs opacity-90">{t('stars')}</p>
                  <p className="text-xl font-bold">{userStats.stars}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Level Progress Card */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">{t('learningPath')}</h2>
                <p className="text-sm text-on-surface-variant dark:text-slate-400">{t('learningPathSubtitle')}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
                <span className="text-2xl font-bold text-primary">Lv {userStats.level}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">{currentLevelXP} / {xpForNextLevel} XP</span>
                <span className="text-primary font-semibold">{Math.round(xpProgress)}%</span>
              </div>
              <div className="h-3 bg-surface-container dark:bg-surface-container-high rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-on-surface-variant text-center mt-2">
                {t('xpProgress', { xp: xpForNextLevel - currentLevelXP, level: userStats.level + 1 })}
              </p>
            </div>
          </div>

          {/* Learning Modules */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-on-surface">{t('yourLearningPath')}</h2>
              <Link 
                href="/student/adventure"
                className="text-primary hover:text-primary/80 text-sm font-semibold flex items-center gap-1"
              >
                {t('viewAll')}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
            
            {learningModules.length === 0 ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-30 mb-2">school</span>
                <p className="text-on-surface-variant mb-2">{t('noModulesYet')}</p>
                <p className="text-sm text-on-surface-variant/70 mb-4">{t('noModulesDesc')}</p>
                <Link 
                  href="/student/adventure"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl hover:bg-primary/90 transition-colors"
                >
                  <span className="material-symbols-outlined">explore</span>
                  {t('startLearning')}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningModules.map((module) => (
                  <div key={module.id} className={`bg-gradient-to-br ${module.gradient} p-5 rounded-2xl border ${module.border}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`${module.bgColor} p-2 rounded-xl`}>
                        <span className="material-symbols-outlined text-white text-2xl">{module.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-on-surface">{t(module.id)}</h3>
                        <p className="text-xs text-on-surface-variant">{t('moduleLessons', { count: module.lessons })}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-on-surface-variant">{t('progress')}</span>
                        <span className={`${module.textColor} font-semibold`}>{module.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/50 dark:bg-black/30 rounded-full overflow-hidden">
                        <div className={`h-full ${module.bgColor} rounded-full`} style={{ width: `${module.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <h2 className="text-xl font-bold text-on-surface mb-4">{t('recentActivity')}</h2>
            <div className="space-y-3">
              {submissions.length === 0 ? (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-30 mb-2">assignment</span>
                  <p className="text-on-surface-variant">{t('noSubmissions')}</p>
                  <p className="text-sm text-on-surface-variant/70">{t('noSubmissionsDesc')}</p>
                </div>
              ) : (
                submissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="flex items-center gap-4 p-4 bg-surface-container-lowest dark:bg-surface-container-low rounded-2xl hover:scale-[1.02] transition-transform">
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl">
                      <span className="material-symbols-outlined text-primary">assignment_turned_in</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-on-surface">{t('homeworkSubmission')}</p>
                      <p className="text-sm text-on-surface-variant">
                        {t('score')}: {submission.correctnessScore.toFixed(0)}% • {t('neatness')}: {submission.neatnessScore.toFixed(0)}%
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

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <h2 className="text-lg font-bold text-on-surface mb-4">{t('quickActions')}</h2>
            <div className="space-y-3">
              <Link 
                href="/student/chat"
                className="flex items-center gap-3 p-4 bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 rounded-2xl transition-colors group"
              >
                <span className="material-symbols-outlined text-primary text-2xl">smart_toy</span>
                <div>
                  <p className="font-semibold text-on-surface group-hover:text-primary transition-colors">{t('aiTutor')}</p>
                  <p className="text-xs text-on-surface-variant">{t('getHelpInstantly')}</p>
                </div>
              </Link>
              
              <Link 
                href="/student/library"
                className="flex items-center gap-3 p-4 bg-secondary/10 dark:bg-secondary/20 hover:bg-secondary/20 dark:hover:bg-secondary/30 rounded-2xl transition-colors group"
              >
                <span className="material-symbols-outlined text-secondary text-2xl">local_library</span>
                <div>
                  <p className="font-semibold text-on-surface group-hover:text-secondary transition-colors">{t('library')}</p>
                  <p className="text-xs text-on-surface-variant">{t('browseResources')}</p>
                </div>
              </Link>
              
              <Link 
                href="/student/adventure"
                className="flex items-center gap-3 p-4 bg-tertiary/10 dark:bg-tertiary/20 hover:bg-tertiary/20 dark:hover:bg-tertiary/30 rounded-2xl transition-colors group"
              >
                <span className="material-symbols-outlined text-tertiary text-2xl">explore</span>
                <div>
                  <p className="font-semibold text-on-surface group-hover:text-tertiary transition-colors">{t('adventure')}</p>
                  <p className="text-xs text-on-surface-variant">{t('startQuests')}</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-3xl p-6 shadow-sm border border-outline-variant/10">
            <h2 className="text-lg font-bold text-on-surface mb-4">{t('achievements')}</h2>
            <div className="grid grid-cols-3 gap-3">
              {ACHIEVEMENTS.map((achievement, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-2xl flex items-center justify-center ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10' 
                      : 'bg-surface-container-lowest dark:bg-surface-container-low'
                  }`}
                >
                  <span 
                    className={`material-symbols-outlined text-3xl ${
                      achievement.unlocked ? achievement.color : 'text-on-surface-variant opacity-20'
                    }`}
                    style={achievement.unlocked ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {achievement.icon}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-on-surface-variant mt-4">
              {t('achievementsUnlocked', { count: unlockedAchievements, total: totalAchievements })}
            </p>
          </div>

          {/* Daily Goal */}
          <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-2">{t('dailyGoal')}</h2>
            <p className="text-sm opacity-90 mb-4">{t('dailyGoalDesc', { count: dailyGoalTarget })}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('progressLabel')}</span>
                <span className="font-semibold">{dailyGoalCompleted}/{dailyGoalTarget}</span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${dailyGoalProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

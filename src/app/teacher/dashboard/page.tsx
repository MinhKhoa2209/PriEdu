import { getClassProgressAction, getStudentAlertsAction, getClassMasteryAction } from "@/modules/backend/actions/teacher";
import { getPendingSubmissionsAction } from "@/modules/backend/actions/teacher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { LanguageToggle } from "@/shared/components/ui/language-toggle";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";

export default async function TeacherDashboard() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("teacher.dashboard");
  
  if (!session?.user) {
    redirect("/login");
  }

  const userRole = (session.user as any).role;
  if (userRole !== 'TEACHER') {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const classProgressResult = await getClassProgressAction(userId);
  const alertsResult = await getStudentAlertsAction();
  const masteryResult = await getClassMasteryAction();
  const pendingResult = await getPendingSubmissionsAction();

  const classProgress = classProgressResult.success ? classProgressResult.data : {
    totalStudents: 0,
    avgLevel: 0,
    avgXP: 0,
    students: []
  };

  const alerts = alertsResult.success ? alertsResult.data : [];
  const mastery = masteryResult.success ? masteryResult.data : [];
  const pendingSubmissions = pendingResult.success ? pendingResult.data : [];

  return (
    <main className="md:ml-64 min-h-screen p-8 text-on-surface selection:bg-primary-fixed-dim">
      {/* Settings */}
      <div className="flex justify-end gap-4 mb-6">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-headline font-extrabold text-primary mb-1 leading-tight text-4xl lg:text-5xl">
            {t("welcome")}, {session.user.name}!
          </h2>
          <p className="text-on-surface-variant font-body">
            {t("subtitle")} {pendingSubmissions.length} {t("newAssignments")}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <span className="material-symbols-outlined p-3 bg-surface-container-low dark:bg-surface-container text-primary rounded-full hover:bg-primary-fixed transition-colors cursor-pointer">
              notifications
            </span>
            {alerts.length > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-surface dark:border-surface-dim"></span>
            )}
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low dark:bg-surface-container px-4 py-2 rounded-full border border-outline-variant/20">
            <span className="material-symbols-outlined text-secondary">calendar_today</span>
            <span className="text-sm font-headline font-bold">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="col-span-1 border-b pb-8 md:col-span-8 md:border-b-0 space-y-8">
          {/* Class Progress Overview */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-lg p-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-2xl font-headline font-bold text-on-surface mb-1">
                  {t("classProgress")}
                </h3>
                <p className="text-sm text-on-surface-variant">{t("averageMastery")}</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold font-headline">
                  {classProgress.totalStudents} Students
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mastery.length > 0 ? (
                mastery.slice(0, 3).map((subject) => (
                  <div key={subject.subject} className="bg-surface-container-lowest dark:bg-surface-container-low rounded-lg p-6 stitch-effect flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle className="text-surface-container dark:text-surface-container-high" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                        <circle 
                          className="text-primary-container" 
                          cx="48" 
                          cy="48" 
                          fill="transparent" 
                          r="40" 
                          stroke="currentColor" 
                          strokeDasharray="251.2" 
                          strokeDashoffset={251.2 * (1 - subject.mastery / 100)} 
                          strokeLinecap="round" 
                          strokeWidth="8"
                        ></circle>
                      </svg>
                      <span className="absolute text-xl font-headline font-bold text-primary">
                        {Math.round(subject.mastery)}%
                      </span>
                    </div>
                    <p className="font-headline font-bold text-on-surface capitalize">{subject.subject}</p>
                    <p className="text-xs text-on-surface-variant mt-1">Class Average</p>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-on-surface-variant py-8">
                  No mastery data available yet
                </div>
              )}
            </div>
          </div>

          {/* Pending Submissions */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-headline font-bold text-on-surface">
                Pending Reviews
              </h3>
              <Link href="/teacher/review">
                <button className="text-sm font-bold text-primary hover:underline">
                  View All →
                </button>
              </Link>
            </div>
            <div className="space-y-4">
              {pendingSubmissions.length > 0 ? (
                pendingSubmissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="flex items-center gap-4 p-4 bg-surface-container-lowest dark:bg-surface-container-low rounded-lg hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">assignment</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-on-surface">{submission.student.name}</p>
                      <p className="text-sm text-on-surface-variant">
                        Score: {submission.correctnessScore.toFixed(0)}% • 
                        Neatness: {submission.neatnessScore.toFixed(0)}%
                      </p>
                    </div>
                    <span className="text-xs text-on-surface-variant">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                    <Link href={`/teacher/review?id=${submission.id}`}>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90">
                        Review
                      </button>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center text-on-surface-variant py-8">
                  No pending submissions
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="col-span-1 md:col-span-4 space-y-8">
          {/* Student Alerts */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-lg p-6">
            <h3 className="text-lg font-headline font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-error">warning</span>
              AI Alerts
            </h3>
            <div className="space-y-3">
              {alerts.length > 0 ? (
                alerts.slice(0, 5).map((alert, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.severity === 'high' 
                        ? 'bg-error-container/20 border-error' 
                        : 'bg-secondary-container/20 border-secondary'
                    }`}
                  >
                    <p className="font-bold text-sm text-on-surface">{alert.studentName}</p>
                    <p className="text-xs text-on-surface-variant mt-1">{alert.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-on-surface-variant text-center py-4">
                  No alerts at this time
                </p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-container-low dark:bg-surface-container rounded-lg p-6">
            <h3 className="text-lg font-headline font-bold text-on-surface mb-4">
              Class Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Total Students</span>
                <span className="text-2xl font-bold text-primary">{classProgress.totalStudents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Avg Level</span>
                <span className="text-2xl font-bold text-secondary">{classProgress.avgLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Avg XP</span>
                <span className="text-2xl font-bold text-tertiary">{classProgress.avgXP}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <Link href="/teacher/students">
              <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all">
                View All Students
              </button>
            </Link>
            <Link href="/teacher/review">
              <button className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-lg font-bold hover:bg-secondary-container/80 transition-all">
                Review Submissions
              </button>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

import { getClassProgressAction } from "@/modules/backend/actions/teacher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StudentDirectory() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  const classProgressResult = await getClassProgressAction(userId);
  
  const classData = classProgressResult.success ? classProgressResult.data : {
    totalStudents: 0,
    students: []
  };

  return (
    <main className="min-h-[calc(100vh-6rem)] md:p-8">
      {/* Header */}
      <header className="relative mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold text-primary/5 absolute -top-4 md:-top-8 -left-2 pointer-events-none select-none tracking-tighter">DIRECTORY</h2>
        <div className="flex flex-col md:flex-row justify-between md:items-end relative z-10 gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight font-headline">Student Directory</h3>
            <p className="text-on-surface-variant font-medium">Class 10-B • {classData.totalStudents} Students</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-1 items-center bg-surface-container-high dark:bg-surface-container px-4 py-2 rounded-xl">
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

      {/* Main Class Roster */}
      <section className="bg-surface-container-low dark:bg-surface-container rounded-2xl p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <h4 className="text-xl font-bold text-on-surface font-headline">Class Roster</h4>
          <div className="flex gap-2 self-end md:self-auto">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-white dark:bg-surface-container-high rounded-lg shadow-sm border border-outline-variant/10">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-white dark:bg-surface-container-high rounded-lg shadow-sm border border-outline-variant/10">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4 flex flex-col">
          {classData.students.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl opacity-30 mb-4">school</span>
              <p className="text-lg font-medium">No students enrolled yet</p>
            </div>
          ) : (
            classData.students.map((student: any, index: number) => (
              <div 
                key={student.id}
                className={`bg-surface-container-lowest dark:bg-surface-container-low p-5 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col md:flex-row items-start md:items-center justify-between group hover:-translate-y-1 transition-all duration-200 gap-4`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-primary font-bold">
                    {student.name?.charAt(0) || 'S'}
                  </div>
                  <div>
                    <h5 className="font-bold text-on-surface font-headline">{student.name}</h5>
                    <span className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                      Level {student.level} • {student.xp} XP
                    </span>
                  </div>
                </div>
                <div className="flex gap-6 md:gap-12 items-center w-full md:w-auto justify-between md:justify-end">
                  <div className="text-center">
                    <p className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase mb-1 font-headline">Stars</p>
                    <p className="font-bold text-on-surface">{student.stars}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase mb-1 font-headline">Recent Score</p>
                    <p className="font-bold text-on-surface">{student.recentScore.toFixed(0)}%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-surface-container hover:bg-primary dark:bg-surface-container-high border border-outline-variant/10 hover:text-white rounded-lg transition-all">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

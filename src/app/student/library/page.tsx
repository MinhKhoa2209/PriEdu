import { getResourcesAction } from "@/modules/backend/actions/quest";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function ResourceLibrary() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  const t = await getTranslations("student.library");
  
  const featuredResult = await getResourcesAction({ featured: true });
  const allResourcesResult = await getResourcesAction({});
  
  const featuredResources = featuredResult.success ? featuredResult.data : [];
  const allResources = allResourcesResult.success ? allResourcesResult.data : [];

  const getResourceIcon = (type: string) => {
    const icons: Record<string, string> = {
      video: 'play_circle',
      article: 'auto_stories',
      quiz: 'quiz',
      interactive: 'science'
    };
    return icons[type] || 'book';
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      science: 'bg-primary-container text-on-primary-container',
      math: 'bg-tertiary-fixed text-on-tertiary-fixed',
      history: 'bg-secondary-container text-on-secondary-container',
      language: 'bg-surface-container-high text-on-surface',
      geography: 'bg-primary-fixed text-on-primary-fixed'
    };
    return colors[subject] || 'bg-surface-container text-on-surface';
  };

  return (
    <main className="md:p-8">
      {/* Header */}
      <header className="relative mb-16">
        <div className="absolute -top-12 -left-4 opacity-5 pointer-events-none hidden md:block">
          <h1 className="text-[12rem] font-black leading-none font-headline tracking-tighter">LIBRARY</h1>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2 block font-headline">{t("studentHub")}</span>
            <h2 className="text-5xl font-extrabold text-on-surface tracking-tight leading-tight font-headline">
              {t("title")}
            </h2>
            <p className="mt-4 text-on-surface-variant max-w-md font-medium leading-relaxed">
              {t("discoverMaterials")}
            </p>
          </div>
          <div className="w-full md:w-auto flex gap-4">
            <div className="relative flex-1 md:w-72">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                className="w-full pl-12 pr-4 py-4 bg-surface-container-high dark:bg-surface-container rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-on-surface outline-none" 
                placeholder={t("searchPlaceholder")}
                type="text"
              />
            </div>
            <button className="bg-surface-container-highest dark:bg-surface-container p-4 rounded-2xl text-primary hover:bg-primary-container hover:text-white transition-all">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Resources Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 mb-16 md:h-[500px]">
        {/* Main Featured Card */}
        {featuredResources[0] && (
          <div className="md:col-span-2 md:row-span-2 bg-primary-container dark:bg-primary-container/20 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-end group cursor-pointer min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-primary/20 dark:bg-primary/40"></div>
            <div className="relative z-20">
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-headline">
                  {t("featured")}
                </span>
                <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-headline">
                  {featuredResources[0].subject}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight font-headline">
                {featuredResources[0].title}
              </h3>
              <p className="text-white/80 font-medium mb-6 line-clamp-2">
                {featuredResources[0].description}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link href={featuredResources[0].url}>
                  <button className="bg-white text-primary px-6 py-2.5 rounded-xl font-bold transition-all text-sm hover:scale-105 font-headline">
                    {t("startLearning")}
                  </button>
                </Link>
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
                  {t("minutes", { count: featuredResources[0].duration })}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Featured Cards */}
        {featuredResources.slice(1, 4).map((resource, index) => (
          <div 
            key={resource.id}
            className={`${index === 0 ? 'md:col-span-2' : 'md:col-span-1'} ${getSubjectColor(resource.subject)} rounded-3xl p-6 relative overflow-hidden group cursor-pointer border border-outline-variant/10 min-h-[150px]`}
          >
            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">{getResourceIcon(resource.type)}</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest font-headline opacity-80">
                  {t(resource.type as "video" | "article" | "quiz" | "interactive")}
                </span>
              </div>
              <div className="mt-4 md:mt-0">
                <h4 className="text-xl font-extrabold mb-1 font-headline">{resource.title}</h4>
                <p className="text-sm font-medium opacity-80 line-clamp-2">{resource.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* All Resources Grid */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-on-surface font-headline">{t("categories")}</h3>
        <div className="flex gap-2">
          {['all', 'science', 'math', 'language', 'history'].map((category) => (
            <button 
              key={category}
              className="px-4 py-2 rounded-full text-sm font-bold bg-surface-container-low dark:bg-surface-container hover:bg-primary hover:text-white transition-all"
            >
              {t(category as "all" | "science" | "math" | "language" | "history")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allResources.map((resource) => (
          <Link key={resource.id} href={resource.url}>
            <div className="bg-surface-container-low dark:bg-surface-container rounded-2xl p-6 hover:shadow-lg transition-all group cursor-pointer border border-outline-variant/10">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${getSubjectColor(resource.subject)} rounded-xl`}>
                  <span className="material-symbols-outlined text-2xl">{getResourceIcon(resource.type)}</span>
                </div>
                <span className="text-xs font-bold text-on-surface-variant uppercase">
                  {t("minutes", { count: resource.duration })}
                </span>
              </div>
              <h4 className="text-lg font-bold text-on-surface mb-2 font-headline group-hover:text-primary transition-colors">
                {resource.title}
              </h4>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">
                {resource.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getSubjectColor(resource.subject)}`}>
                  {resource.subject}
                </span>
                <span className="text-xs font-bold text-primary">
                  {t("difficulty")}: {resource.difficulty}/3
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { LanguageToggle } from '@/shared/components/ui/language-toggle';

export default function SelectRolePage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const t = useTranslations('auth');
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'TEACHER' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      setError(t('selectRoleSubtitle'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/user/set-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to set role');
      }

      // Update session with new role
      await update({
        ...session,
        user: {
          ...session?.user,
          role: selectedRole,
        },
      });

      // Redirect based on role
      const redirectUrl = selectedRole === 'STUDENT' 
        ? '/student/dashboard' 
        : '/teacher/dashboard';
      
      router.push(redirectUrl);
      router.refresh();
    } catch (error) {
      setError('Failed to set role. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-indigo-900/50">
              <span className="text-3xl font-bold">P</span>
            </div>
            <LanguageToggle />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-200 tracking-tight mb-2">{t('welcomeToPriEdu')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('selectRoleSubtitle')}</p>
        </div>

        {/* Role Selection Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white dark:border-slate-800 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 dark:shadow-slate-900/50">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            {/* Student Role */}
            <button
              onClick={() => setSelectedRole('STUDENT')}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 ${
                selectedRole === 'STUDENT'
                  ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg scale-[1.02]'
                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedRole === 'STUDENT' ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                }`}>
                  <span className={`material-symbols-outlined text-2xl ${
                    selectedRole === 'STUDENT' ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                  }`}>
                    school
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{t('studentRole')}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('studentRoleDesc')}</p>
                </div>
                {selectedRole === 'STUDENT' && (
                  <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">check_circle</span>
                )}
              </div>
            </button>

            {/* Teacher Role */}
            <button
              onClick={() => setSelectedRole('TEACHER')}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 ${
                selectedRole === 'TEACHER'
                  ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg scale-[1.02]'
                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedRole === 'TEACHER' ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                }`}>
                  <span className={`material-symbols-outlined text-2xl ${
                    selectedRole === 'TEACHER' ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                  }`}>
                    person
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{t('teacherRole')}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('teacherRoleDesc')}</p>
                </div>
                {selectedRole === 'TEACHER' && (
                  <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">check_circle</span>
                )}
              </div>
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleRoleSelection}
            disabled={!selectedRole || isLoading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-base shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              </div>
            ) : (
              t('continue')
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          {t('changeRoleLater')}
        </div>
      </div>
    </div>
  );
}

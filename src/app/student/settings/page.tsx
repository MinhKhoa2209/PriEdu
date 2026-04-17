'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LanguageToggle } from '@/shared/components/ui/language-toggle';
import { ThemeToggle } from '@/shared/components/ui/theme-toggle';

export default function SettingsPage() {
  const t = useTranslations('student.settings');
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  });

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formData.name,
        },
      });

      setMessage(t('profileUpdated'));
      setIsEditing(false);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(t('profileUpdateFailed'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">{t('title')}</h1>
          <p className="text-slate-600 dark:text-slate-400">{t('subtitle')}</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('profileInfo')}</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold text-sm flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                  {t('edit')}
                </button>
              )}
            </div>

            {message && (
              <div className={`mb-4 p-4 rounded-2xl ${
                message.includes('success') 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
              }`}>
                {message}
              </div>
            )}

            <div className="space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                  {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{session?.user?.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{(session?.user as any)?.role || t('student')}</p>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  {t('fullName')}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                ) : (
                  <p className="px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-900 dark:text-white">
                    {session?.user?.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  {t('emailAddress')}
                </label>
                <p className="px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-600 dark:text-slate-400">
                  {session?.user?.email}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 ml-1">
                  {t('emailCannotChange')}
                </p>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  {t('role')}
                </label>
                <p className="px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-600 dark:text-slate-400">
                  {(session?.user as any)?.role || t('student')}
                </p>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {isSaving ? t('saving') : t('saveChanges')}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: session?.user?.name || '',
                        email: session?.user?.email || '',
                      });
                    }}
                    className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white py-3 rounded-2xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    {t('cancel')}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Appearance Section */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('appearance')}</h2>
            
            <div className="space-y-4">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{t('theme')}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t('themeDesc')}</p>
                </div>
                <ThemeToggle />
              </div>

              {/* Language */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{t('language')}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t('languageDesc')}</p>
                </div>
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('accountActions')}</h2>
            
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-2xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-600 dark:text-red-400">logout</span>
                  <div className="text-left">
                    <p className="font-semibold text-red-600 dark:text-red-400">{t('logOut')}</p>
                    <p className="text-xs text-red-600/70 dark:text-red-400/70">{t('logOutDesc')}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('about')}</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">{t('version')}</span>
                <span className="text-slate-900 dark:text-white font-semibold">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">{t('platform')}</span>
                <span className="text-slate-900 dark:text-white font-semibold">PriEdu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

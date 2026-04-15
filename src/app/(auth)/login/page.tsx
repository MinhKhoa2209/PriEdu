'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/modules/frontend/components/ui/Button';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login - in real app, call auth action
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-slate-100 font-sans">
      <div className="w-full max-w-md">
        {/* Branding/Logo */}
        <div className="text-center mb-8 animate-in fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200 mb-4 transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl font-bold">P</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Welcome back!</h1>
          <p className="text-slate-500 mt-2">Log in to your PriEdu assistant</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 animate-in slide-in-from-bottom-2">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="teacher@priedu.com"
                required
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all duration-200 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all duration-200 text-slate-800"
              />
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <label className="flex items-center cursor-pointer group text-slate-500 hover:text-indigo-600 transition-colors">
                <input type="checkbox" className="mr-2 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                Remember me
              </label>
              <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-700 underline-offset-4 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 text-base rounded-2xl shadow-lg shadow-indigo-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link href="#" className="font-bold text-indigo-600 hover:text-indigo-700 tracking-tight">
                Get started for free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer/Trust info */}
        <div className="mt-8 text-center text-xs text-slate-400 font-medium tracking-wide flex items-center justify-center gap-4">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            Secure Authentication
          </span>
          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
          <span>v1.0.0</span>
        </div>
      </div>
    </div>
  );
}

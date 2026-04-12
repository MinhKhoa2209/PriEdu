import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PriEdu - Learn, Play, and Grow!',
  description: 'An AI-powered educational ecosystem for primary students.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white text-center px-4">
      <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
          Welcome to <span className="text-indigo-600">PriEdu</span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Your personal AI tutor that helps you learn from your mistakes and grow smarter every day. Never gives you the answer, but always guides you to it!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link 
            href="/dashboard" 
            className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-indigo-500 hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95"
          >
            Go to Student Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

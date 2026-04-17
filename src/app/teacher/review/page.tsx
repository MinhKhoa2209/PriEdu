import { getPendingSubmissionsAction } from "@/modules/backend/actions/teacher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function ReviewModule() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch pending submissions
  const submissionsResult = await getPendingSubmissionsAction();
  const submissions = submissionsResult.success ? submissionsResult.data : [];
  
  // Get the first pending submission for review
  const submission = submissions[0];

  if (!submission) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)] bg-surface text-on-surface">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">task_alt</span>
          <h2 className="text-2xl font-bold mb-2">All caught up!</h2>
          <p className="text-on-surface-variant">No pending submissions to review.</p>
          <Link href="/teacher/dashboard" className="mt-6 inline-block text-primary hover:underline font-bold">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] -m-4 md:-m-8 overflow-hidden bg-surface text-on-surface">
      {/* Left Side: Source Document */}
      <div className="w-full md:w-1/2 bg-surface-container-low dark:bg-surface-container p-4 md:p-8 overflow-y-auto border-r border-outline-variant/20 custom-scrollbar border-t md:border-t-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <Link href="/teacher/dashboard" className="text-secondary hover:underline flex items-center gap-1 mb-2 text-xs font-bold font-headline">
              <span className="material-symbols-outlined text-[1rem]">arrow_back</span> Back to Dashboard
            </Link>
            <span className="text-[0.65rem] text-on-surface-variant font-headline font-bold uppercase tracking-wider">Student Submission</span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight font-headline">
              {submission.student.name}'s Homework
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center w-10 h-10 bg-white dark:bg-surface-container-high rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-primary">
              <span className="material-symbols-outlined">zoom_in</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-white dark:bg-surface-container-high rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-primary">
              <span className="material-symbols-outlined">fullscreen</span>
            </button>
          </div>
        </div>

        {/* Submission Image Container */}
        <div className="bg-white dark:bg-surface-container-high p-6 md:p-12 shadow-sm rounded-xl border border-outline-variant/10 relative min-h-[600px] md:min-h-[1000px]">
          {submission.imageUrl ? (
            <div className="relative w-full h-[500px] md:h-[800px]">
              <Image 
                src={submission.imageUrl} 
                alt="Student Handwriting" 
                fill
                className="object-contain opacity-90"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[500px] md:h-[800px] text-on-surface-variant">
              <div className="text-center">
                <span className="material-symbols-outlined text-6xl mb-4">image</span>
                <p>No image available</p>
              </div>
            </div>
          )}
          
          {/* AI Scanning Overlay */}
          <div className="absolute inset-0 pointer-events-none border-2 border-primary/5 rounded-xl"></div>
        </div>
      </div>

      {/* Right Side: AI Recognition & Controls */}
      <div className="w-full md:w-1/2 bg-surface dark:bg-surface-container-lowest p-4 md:p-8 overflow-y-auto flex flex-col gap-8 custom-scrollbar">
        {/* AI Score Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-[0.6rem] font-bold text-on-surface-variant font-headline uppercase tracking-wider block mb-2">Correctness Score</span>
            <div className="flex items-baseline gap-1 text-primary">
              <span className="text-4xl font-bold font-headline">{submission.correctnessScore}</span>
              <span className="text-primary/60 font-bold">/100</span>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-[0.6rem] font-bold text-on-surface-variant font-headline uppercase tracking-wider block mb-2">Neatness Score</span>
            <div className="flex items-center gap-2 text-secondary">
              <span className="text-4xl font-bold font-headline">{submission.neatnessScore}</span>
              <span className="text-secondary/60 font-bold">/100</span>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-container-high p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-[0.6rem] font-bold text-on-surface-variant font-headline uppercase tracking-wider block mb-2">Status</span>
            <div className="flex items-center gap-2 text-tertiary-container">
              <span className="text-2xl font-bold font-headline">Pending</span>
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>pending</span>
            </div>
          </div>
        </div>

        {/* AI Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-on-surface font-headline">AI Transcription & Analysis</h3>
            <div className="flex items-center gap-2 text-[0.7rem] text-primary bg-primary-fixed/20 px-2 py-1 rounded-full font-bold">
              <span className="material-symbols-outlined text-[1rem]">auto_awesome</span>
              GEMINI_VISION_V1
            </div>
          </div>
          
          <div className="bg-surface-container-lowest dark:bg-surface-container p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-sm leading-relaxed text-on-surface text-base">
            {submission.extractedText || 'No text extracted'}
          </div>
          
          {submission.feedback && (
            <div className="bg-primary-container/10 dark:bg-primary-container/20 p-6 rounded-xl border border-primary/20">
              <h4 className="font-bold text-primary mb-2 font-headline">AI Feedback</h4>
              <p className="text-on-surface text-sm">{submission.feedback}</p>
            </div>
          )}
        </div>

        {/* Teacher Feedback Controls */}
        <form action={async (formData: FormData) => {
          'use server';
          const { gradeSubmissionAction } = await import('@/modules/backend/actions/teacher');
          const feedback = formData.get('feedback') as string;
          const approved = formData.get('approved') === 'true';
          
          await gradeSubmissionAction(submission.id, feedback, approved);
          redirect('/teacher/dashboard');
        }} className="bg-surface-container-low dark:bg-surface-container p-6 md:p-8 rounded-xl border border-outline-variant/10">
          <h3 className="font-bold text-on-surface font-headline mb-6">Educator Override & Feedback</h3>
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Detailed Comments</label>
              <textarea 
                name="feedback"
                className="w-full bg-white dark:bg-surface-container-high border border-outline-variant/20 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none placeholder:text-on-surface-variant/40 text-on-surface" 
                placeholder="Type feedback for student here..." 
                rows={4}
                defaultValue={submission.feedback || ''}
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button 
                type="submit"
                name="approved"
                value="true"
                className="w-full sm:flex-1 bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-md"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Approve & Publish
              </button>
              <button 
                type="submit"
                name="approved"
                value="false"
                className="w-full sm:w-auto px-8 py-4 border-2 border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container transition-colors"
              >
                Request Revision
              </button>
            </div>
          </div>
        </form>

        {/* Data Trace */}
        <div className="mt-auto pt-6 border-t border-outline-variant/10">
          <div className="flex items-center justify-between text-on-surface-variant text-xs">
            <div className="flex items-center gap-4 font-bold font-headline opacity-60">
              <span>ID: {submission.id.slice(0, 12)}</span>
              <span>Student: {submission.student.name}</span>
            </div>
            <div className="flex gap-4">
              <button className="hover:text-primary transition-colors flex items-center justify-center">
                 <span className="material-symbols-outlined text-[1.2rem]">share</span>
              </button>
              <button className="hover:text-primary transition-colors flex items-center justify-center">
                 <span className="material-symbols-outlined text-[1.2rem]">print</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

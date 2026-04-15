import Image from "next/image";
import Link from "next/link";

export default function ReviewModule() {
  return (
    <div className="flex h-[calc(100vh-6rem)] -m-4 md:-m-8 overflow-hidden bg-surface text-on-surface">
      {/* Left Side: Source Document */}
      <div className="w-full md:w-1/2 bg-surface-container-low p-4 md:p-8 overflow-y-auto border-r border-outline-variant/20 custom-scrollbar border-t md:border-t-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <Link href="/dashboard" className="text-secondary hover:underline flex items-center gap-1 mb-2 text-xs font-bold font-headline">
              <span className="material-symbols-outlined text-[1rem]">arrow_back</span> Back to Dashboard
            </Link>
            <span className="text-[0.65rem] text-on-surface-variant font-headline font-bold uppercase tracking-wider">Student Submission</span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight font-headline">Handwritten Essay: The Mars Colony</h2>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-primary">
              <span className="material-symbols-outlined">zoom_in</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-primary">
              <span className="material-symbols-outlined">fullscreen</span>
            </button>
          </div>
        </div>

        {/* Submission Image Container */}
        <div className="bg-white p-6 md:p-12 shadow-sm rounded-xl border border-outline-variant/10 relative min-h-[600px] md:min-h-[1000px]">
          {/* Note: the image here is an example placeholder from the original design */}
          <div className="relative w-full h-[500px] md:h-[800px]">
             <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5cyXToNaqrPvnqhQZTzY07uoFYp5Q2qcW8_WI0Hox4r2pfLGCRUxiO6SmZexDKODg2dFFNkdrKiEzrqvTxEgTfRtWoXouI-jSrOs6aoZ10ziDdsoRM9FqpWIIN1DDnH3y8aaVmJr4VcZN_v3QGmT6rkzcVbcQU7V-VQzXHqjQUZjEXpicWAaJKQqYol3PTRX6ZqtVMYcPdjLv2lPyfdgVG_iK5Gni_Tb5LhtGFoOqfJK60b_l4U8KJz13U_9B1BsoirfBWfIhAoIS" 
                alt="Student Handwriting" 
                fill
                className="object-contain opacity-90"
             />
          </div>
          
          {/* AI Scanning Overlay Emulation */}
          <div className="absolute inset-0 pointer-events-none border-2 border-primary/5 rounded-xl"></div>
          {/* Mock Highlights on Image */}
          <div className="absolute top-[20%] left-[10%] w-[30%] h-6 bg-error/10 border-b-2 border-error/30"></div>
          <div className="absolute top-[35%] left-[45%] w-[15%] h-6 bg-error/10 border-b-2 border-error/30"></div>
        </div>
      </div>

      {/* Right Side: AI Recognition & Controls */}
      <div className="w-full md:w-1/2 bg-surface p-4 md:p-8 overflow-y-auto flex flex-col gap-8 custom-scrollbar">
        {/* AI Score Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-[0.6rem] font-bold text-on-surface-variant font-headline uppercase tracking-wider block mb-2">Automated Score</span>
            <div className="flex items-baseline gap-1 text-primary">
              <span className="text-4xl font-bold font-headline">84</span>
              <span className="text-primary/60 font-bold">/100</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-[0.6rem] font-bold text-on-surface-variant font-headline uppercase tracking-wider block mb-2">Confidence Level</span>
            <div className="flex items-center gap-2 text-secondary">
              <span className="text-4xl font-bold font-headline">98%</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-[0.6rem] font-bold text-on-surface-variant font-headline uppercase tracking-wider block mb-2">Readability</span>
            <div className="flex items-center gap-2 text-tertiary-container">
              <span className="text-3xl font-bold font-headline">High</span>
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
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
          
          <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant/10 shadow-sm leading-relaxed text-on-surface text-lg">
            <p className="mb-4">
              Building a colony on Mars is a <span className="bg-error/10 text-error px-1 border-b-2 border-error cursor-help font-semibold" title="Spelling Error: Should be 'significant'">signifigant</span> challenge for humanity. 
              Starting in the 21st century, space agencies planned to transform our multi-planetary dreams into reality.
            </p>
            <p>
              One major factor was the invention of reusable rockets, which allowed for 
              faster transport. However, the lack of an atmosphere <span className="bg-error/10 text-error px-1 border-b-2 border-error cursor-help font-semibold" title="Grammar: 'led' instead of 'lead'">lead</span> to challenging surface conditions...
            </p>
          </div>
        </div>

        {/* Teacher Feedback Controls */}
        <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/10">
          <h3 className="font-bold text-on-surface font-headline mb-6">Educator Override & Feedback</h3>
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-4">Manual Score Adjustment</label>
              <input className="w-full h-2 bg-outline-variant/30 appearance-none rounded-full accent-primary" type="range" defaultValue="84" />
              <div className="flex justify-between mt-2 text-xs font-bold text-on-surface-variant font-headline">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Detailed Comments</label>
              <textarea 
                className="w-full bg-white border border-outline-variant/20 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none placeholder:text-on-surface-variant/40" 
                placeholder="Type feedback for student here..." 
                rows={4}
                defaultValue="Great effort on the introduction, Young Explorer! Just remember to watch out for the spelling of 'significant' and the past tense of 'lead'."
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button className="w-full sm:flex-1 bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-md">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                Publish Grade
              </button>
              <button className="w-full sm:w-auto px-8 py-4 border-2 border-outline-variant text-on-surface-variant font-bold rounded-xl hover:bg-surface-container transition-colors">
                Save Draft
              </button>
            </div>
          </div>
        </div>

        {/* Data Trace */}
        <div className="mt-auto pt-6 border-t border-outline-variant/10">
          <div className="flex items-center justify-between text-on-surface-variant text-xs">
            <div className="flex items-center gap-4 font-bold font-headline opacity-60">
              <span>ID: PR-9210-ASMT</span>
              <span>TS: 2024-10-24T14:30:00Z</span>
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

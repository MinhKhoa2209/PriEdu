import Link from 'next/link';

interface Submission {
  id: string;
  extractedText: string;
  correctnessScore: number;
  createdAt: string | Date;
}

interface SubmissionCardProps {
  submission: Submission;
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  const scoreColor =
    submission.correctnessScore >= 7
      ? 'text-emerald-600 bg-emerald-50'
      : submission.correctnessScore >= 4
      ? 'text-amber-600 bg-amber-50'
      : 'text-red-600 bg-red-50';

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div
          className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${scoreColor}`}
        >
          Score: {submission.correctnessScore}/10
        </div>
        <p className="text-slate-700 text-sm line-clamp-2 leading-relaxed">
          {submission.extractedText || 'Image submission'}
        </p>
      </div>
      <Link
        href={`?chat=${submission.id}`}
        className="flex-shrink-0 bg-[#4f46e5] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-500 hover:shadow-md transition-all active:scale-95"
      >
        Start Tutoring
      </Link>
    </div>
  );
}

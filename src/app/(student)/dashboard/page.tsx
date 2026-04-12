import { submissionRepo } from '../../../modules/backend/repository/submissionRepo';
import SocraticChat from '../../../modules/frontend/components/ai/SocraticChat';
import Link from 'next/link';

export default async function StudentDashboard({ 
  params, 
  searchParams 
}: { 
  params: Promise<any>, 
  searchParams: Promise<{ chat?: string }> 
}) {
  await params;
  const { chat } = await searchParams;

  // In a real app we would get this from Auth
  const HOCK_STUDENT_ID = '654321098765432109876543'; // 24 char hex for MongoDB ObjectId

  let submissions: any[] = [];
  try {
    submissions = await submissionRepo.getSubmissionsByStudentId(HOCK_STUDENT_ID);
  } catch (err) {
    console.warn("Database not configured or unreachable, using mock data for frontend demo.");
    submissions = [
      {
        id: "mock_sub_1",
        extractedText: "5 + 5 = 11",
        feedback: "Check your math on 5 + 5.",
        correctnessScore: 0,
        createdAt: new Date().toISOString()
      },
      {
        id: "mock_sub_2",
        extractedText: "10 * 2 = 20",
        feedback: "Great job!",
        correctnessScore: 10,
        createdAt: new Date().toISOString()
      }
    ];
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-slate-800">My Learning Dashboard</h1>

        {/* View switching logic - basic param based approach */}
        {chat ? (
          <div>
            <Link href="?" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center space-x-2 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span>Back to Dashboard</span>
            </Link>
            <SocraticChat submissionId={chat} />
          </div>
        ) : (
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold text-slate-700">Recent Assignments</h2>
            {submissions.map(sub => (
              <div key={sub.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Score: {sub.correctnessScore}/10</div>
                  <p className="text-slate-800 line-clamp-2 max-w-md">{sub.extractedText || 'Image submission'}</p>
                </div>
                <Link
                  href={`?chat=${sub.id}`}
                  className="bg-[#4f46e5] text-white px-6 py-2 rounded-full font-medium shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all active:scale-95"
                >
                  Start Socratic Tutoring
                </Link>
              </div>
            ))}
            {submissions.length === 0 && (
              <div className="p-8 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
                No assignments found. Tell your teacher to upload something!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { userRepo } from '../../../../modules/backend/repository/userRepo';

export default async function TeacherDashboard({
  params,
  searchParams,
}: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  await params;
  await searchParams;

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-slate-800">Teacher Dashboard</h1>
        <p className="text-slate-500">Analytics, Knowledge Maps, and Student Progress will be displayed here.</p>
      </div>
    </div>
  );
}

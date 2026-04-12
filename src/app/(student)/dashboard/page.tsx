export default async function StudentDashboard({ params, searchParams }: { params: Promise<any>, searchParams: Promise<any> }) {
  await params;
  await searchParams;
  return (
    <div>
      <h1>Student Dashboard</h1>
    </div>
  );
}

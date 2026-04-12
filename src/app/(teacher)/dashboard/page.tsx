export default async function TeacherDashboard({ params, searchParams }: { params: Promise<any>, searchParams: Promise<any> }) {
  await params;
  await searchParams;
  return (
    <div>
      <h1>Teacher Dashboard</h1>
    </div>
  );
}

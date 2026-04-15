import { TeacherSideNav } from "@/shared/components/layout/TeacherSideNav";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <TeacherSideNav />
      {children}
    </div>
  );
}

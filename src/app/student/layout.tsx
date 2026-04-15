import { StudentSideNav } from "@/shared/components/layout/StudentSideNav";
import { MobileTopBar } from "@/shared/components/layout/MobileTopBar";
import { MobileBottomNav } from "@/shared/components/layout/MobileBottomNav";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <StudentSideNav />
      <MobileTopBar />
      
      <main className="md:ml-64 p-4 md:p-8 pb-24 md:pb-8">
        {children}
      </main>
      
      <MobileBottomNav />
    </div>
  );
}

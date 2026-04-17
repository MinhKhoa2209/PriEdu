  import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const role = (session.user as any).role;
    if (!role) {
      redirect('/select-role');
    }
    if (role === 'TEACHER') {
      redirect('/teacher/dashboard');
    } else if (role === 'STUDENT') {
      redirect('/student/dashboard');
    }
  }
  redirect('/login');
}

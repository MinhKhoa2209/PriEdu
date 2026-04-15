import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  // If logged in, redirect based on role
  if (session?.user) {
    const role = (session.user as any).role;
    if (role === 'TEACHER') {
      redirect('/teacher/dashboard');
    } else if (role === 'STUDENT') {
      redirect('/student/dashboard');
    }
  }
  
  // If not logged in, redirect to login
  redirect('/login');
}

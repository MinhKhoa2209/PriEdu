import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from './src/shared/constants';

/**
 * Route Protection Middleware
 * Runs on the Edge before each request.
 * 
 * Current Status: Placeholder - reads a 'role' cookie for demo.
 * Replace with real JWT/session validation (e.g. NextAuth, Lucia Auth) in production.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read role from cookie (placeholder — replace with real auth session check)
  const role = request.cookies.get('role')?.value;

  // Protect student routes: /dashboard
  if (pathname.startsWith('/dashboard') && role !== 'STUDENT') {
    // TODO: Redirect to login once auth is implemented
    // return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  // Protect teacher routes: /teacher/*
  if (pathname.startsWith('/teacher') && role !== 'TEACHER') {
    // TODO: Redirect to login once auth is implemented
    // return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except Next.js internal routes and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

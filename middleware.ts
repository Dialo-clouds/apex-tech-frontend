import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define your protected routes
const protectedRoutes = ['/account', '/account/orders', '/admin'];

export function middleware(request: NextRequest) {
  // ✅ SAFE: Vercel-compatible cookie check
  const path = request.nextUrl.pathname;

  // Check if the user is trying to access a protected route
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  if (isProtectedRoute) {
    // Get the token from cookies (Vercel's request.cookies API is safe)
    const token = request.cookies.get('apex_token')?.value || null;

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|media|auth).*)'],
};
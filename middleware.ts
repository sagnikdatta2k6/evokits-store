import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the route is an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Look for our secure HTTP-Only cookie
    const adminSession = request.cookies.get('admin_session');

    // If no session exists, instantly redirect to the dedicated login page
    // This happens entirely on the server/edge, so the browser never receives
    // the admin dashboard HTML/JS payloads.
    if (!adminSession) {
      const loginUrl = new URL('/admin-login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If they have the cookie, or they are not visiting /admin, let the request proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};

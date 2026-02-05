import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for session token (next-auth stores it in cookies)
  const token = request.cookies.get('authjs.session-token')?.value
    || request.cookies.get('__Secure-authjs.session-token')?.value;

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith('/auth');

  // Allow checkout success/cancel pages without auth (Stripe redirects here)
  if (pathname.startsWith('/checkout/success') || pathname.startsWith('/checkout/cancel')) {
    return NextResponse.next();
  }

  // Only /account is protected
  const isProtectedRoute = pathname.startsWith('/account');

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Redirect to home if accessing auth pages with token
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/checkout/:path*', '/auth/:path*'],
};

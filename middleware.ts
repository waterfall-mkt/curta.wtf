import { type NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/docs/intro') {
    return NextResponse.redirect(new URL('/docs', request.url));
  }

  if (request.nextUrl.pathname === '/guides') {
    return NextResponse.redirect(new URL('/guides/player/getting-started', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/docs/intro', '/guides'],
};

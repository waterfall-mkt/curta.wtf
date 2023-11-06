import { type NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/docs/overview') {
    return NextResponse.redirect(new URL('/docs', request.url));
  } else if (request.nextUrl.pathname === '/docs/puzzles') {
    return NextResponse.redirect(new URL('/docs/puzzles/overview', request.url));
  } else if (request.nextUrl.pathname === '/attend') {
    // Temporary redirect to Curta Cup form
    return NextResponse.redirect(new URL('https://forms.gle/kYLwBqWSFc59efoc7', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/docs/overview', '/docs/puzzles', '/attend'],
};

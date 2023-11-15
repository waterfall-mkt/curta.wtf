import { type NextRequest, NextResponse } from 'next/server';

import { getChainIdAndId, getChainInfo } from './lib/utils';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/docs/overview') {
    return NextResponse.redirect(new URL('/docs', request.url));
  } else if (request.nextUrl.pathname === '/docs/puzzles') {
    return NextResponse.redirect(new URL('/docs/puzzles/overview', request.url));
  } else if (request.nextUrl.pathname.toLowerCase().match(/puzzle\/(?:\d+|eth):(\d+)/)) {
    const ids = getChainIdAndId(request.nextUrl.pathname.split('/')[2] ?? '');
    if (!ids) return;

    if (ids.chainId === 1) {
      return NextResponse.redirect(new URL(`/puzzle/${ids.id}`, request.url));
    }
    return NextResponse.redirect(
      new URL(`/puzzle/${getChainInfo(ids.chainId).network}:${ids.id}`, request.url),
    );
  } else if (request.nextUrl.pathname === '/attend') {
    // Temporary redirect to Curta Cup form
    return NextResponse.redirect(new URL('https://forms.gle/kYLwBqWSFc59efoc7', request.url));
  } else if (request.nextUrl.pathname === '/faq') {
    // Temporary redirect to Curta Cup form
    return NextResponse.redirect(
      new URL(
        'https://docs.google.com/document/d/1-SQ4es7Hpq-73OqS89ARJ6vdXdOSt6fGhtt3E4zuXC0/edit',
        request.url,
      ),
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/docs/overview', '/docs/puzzles', '/puzzle/:path*', '/attend', '/faq'],
};

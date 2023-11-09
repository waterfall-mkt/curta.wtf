import { type NextRequest, NextResponse } from 'next/server';

import { getChainIdAndId } from './lib/utils';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/docs/intro') {
    return NextResponse.redirect(new URL('/docs', request.url));
  } else if (request.nextUrl.pathname === '/guides') {
    return NextResponse.redirect(new URL('/guides/player/getting-started', request.url));
  } else if (request.nextUrl.pathname.startsWith('/puzzle')) {
    const ids = getChainIdAndId(request.nextUrl.pathname.split('/')[1] ?? '');
    if (!ids) return;

    if (ids.chainId === 1) {
      return NextResponse.rewrite(new URL(`/puzzle/${ids.id}`, request.url));
    }
    return NextResponse.rewrite(new URL(`/puzzle/${ids.chainId}:${ids.id}`, request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/docs/intro', '/guides', '/puzzle/:slug'],
};

import { type NextRequest, NextResponse } from 'next/server';

import { getChainIdAndId, getNetworkName } from './lib/utils';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/docs/intro') {
    return NextResponse.redirect(new URL('/docs', request.url));
  } else if (request.nextUrl.pathname === '/guides') {
    return NextResponse.redirect(new URL('/guides/player/getting-started', request.url));
  } else if (request.nextUrl.pathname.toLowerCase().match(/puzzle\/(?:\d+|eth):(\d+)/)) {
    const ids = getChainIdAndId(request.nextUrl.pathname.split('/')[2] ?? '');
    if (!ids) return;

    if (ids.chainId === 1) {
      return NextResponse.redirect(new URL(`/puzzle/${ids.id}`, request.url));
    }
    return NextResponse.redirect(
      new URL(`/puzzle/${getNetworkName(ids.chainId)}:${ids.id}`, request.url),
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/docs/intro', '/guides', '/puzzle/:path*'],
};

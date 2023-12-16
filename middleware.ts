import { type NextRequest, NextResponse } from 'next/server';

import { getChainIdAndId, getChainInfo } from './lib/utils';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.toLowerCase().match(/puzzle\/(?:\d+|eth):(\d+)/)) {
    const ids = getChainIdAndId(request.nextUrl.pathname.split('/')[2] ?? '');
    if (!ids) return;

    // The default chain for Curta Puzzles is Ethereum.
    if (ids.chainId === 1) {
      return NextResponse.redirect(new URL(`/puzzle/${ids.id}`, request.url));
    }
    return NextResponse.redirect(
      new URL(`/puzzle/${getChainInfo(ids.chainId).network}:${ids.id}`, request.url),
    );
  } else if (request.nextUrl.pathname.toLowerCase().match(/golf\/(?:\d+|base):(\d+)/)) {
    const ids = getChainIdAndId(request.nextUrl.pathname.split('/')[2] ?? '');
    if (!ids) return;

    // The default chain for Curta Golf is Base.
    if (ids.chainId === 8453) {
      return NextResponse.redirect(new URL(`/golf/${ids.id}`, request.url));
    }
    return NextResponse.redirect(
      new URL(`/golf/${getChainInfo(ids.chainId).network}:${ids.id}`, request.url),
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/puzzle/:path*', '/golf/:path*'],
};

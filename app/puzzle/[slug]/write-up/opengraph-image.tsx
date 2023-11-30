/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server';

import { getChainIdAndId, getChainInfo } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Image
// -----------------------------------------------------------------------------

export default async function Image({ params }: { params: { slug: string } }) {
  const inter400 = fetch(
    new URL(
      '../../../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff',
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  const inter500 = fetch(
    new URL(
      '../../../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff',
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  const inter600 = fetch(
    new URL(
      '../../../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff',
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  // Process slug.
  const ids = getChainIdAndId(params.slug);

  // Return early if `slug` is an invalid format.
  if (!ids) return;

  const { chainId, id } = ids;

  return new ImageResponse(
    (
      <div
        tw="flex flex-col items-center justify-center bg-[#0D1017] w-full h-full"
        style={{ fontFamily: 'Inter 400' }}
      >
        {/* Top padding. */}
        <div tw="w-full h-10 flex">
          <div tw="h-10 w-10" />
          <div tw="h-10 grow border-l-2 border-r-2 border-[#27303D]" />
          <div tw="h-10 w-10" />
        </div>
        <div tw="w-full flex grow">
          {/* Left padding. */}
          <div tw="w-10 h-full border-b-2 border-t-2 border-[#27303D]" />
          {/* Main content. */}
          <div tw="grow h-full flex flex-col p-12 bg-[#12161F] border-2 border-[#27303D]">
            <div tw="flex items-center">
              <div tw="flex h-16 w-16 mr-5">
                <img
                  src="data:image/png;base64,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"
                  alt="Curta logo."
                  width="64"
                  height="64"
                />
              </div>
              <span style={{ fontSize: 40 }}>
                <span
                  style={{
                    fontFamily: 'Inter 600',
                    color: '#F0F6FC',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.25,
                  }}
                >
                  Curta
                </span>
                <span
                  style={{
                    fontFamily: 'Inter 400',
                    marginLeft: 9,
                    color: '#94A3B3',
                    lineHeight: 1.25,
                  }}
                >
                  | Docs
                </span>
              </span>
            </div>
            <div tw="flex flex-col mt-auto">
              <div
                tw="flex grow items-center"
                style={{ maxWidth: 1020 }} // 1200 - 2*40 - 2*48 - 2*2
              >
                <div
                  style={{
                    fontSize: 64,
                    lineHeight: 1.2,
                    color: '#94A3B3',
                    fontFamily: 'Inter 500',
                  }}
                >
                  Puzzles
                </div>
                <div
                  style={{
                    display: 'flex',
                    width: 40,
                    height: 40,
                    marginLeft: 16,
                    marginRight: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: 64,
                    lineHeight: 1.2,
                    color: '#94A3B3',
                    fontFamily: 'Inter 500',
                  }}
                >
                  {getChainInfo(chainId).name}
                </div>
                <div
                  style={{
                    display: 'flex',
                    width: 40,
                    height: 40,
                    marginLeft: 16,
                    marginRight: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: 64,
                    lineHeight: 1.2,
                    color: '#F0F6FC',
                    fontFamily: 'Inter 600',
                    letterSpacing: '-0.025em',
                  }}
                >
                  {`#${id}`}
                </div>
              </div>
            </div>
          </div>
          {/* Right padding. */}
          <div tw="h-full w-10 border-b-2 border-t-2 border-[#27303D]" />
        </div>
        {/* Bottom padding. */}
        <div tw="w-full h-10 flex">
          <div tw="h-10 w-10" />
          <div tw="h-10 grow border-l-2 border-r-2 border-[#27303D]" />
          <div tw="h-10 w-10" />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter 400', data: await inter400 },
        { name: 'Inter 500', data: await inter500 },
        { name: 'Inter 600', data: await inter600 },
      ],
    },
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const runtime = 'edge';

/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server';

import { DOCS_PAGES } from '@/lib/constants/site';

// -----------------------------------------------------------------------------
// Image
// -----------------------------------------------------------------------------

export async function GET(req: Request) {
  const inter400 = fetch(
    new URL(
      '../../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff',
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  const inter500 = fetch(
    new URL(
      '../../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff',
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  const inter600 = fetch(
    new URL(
      '../../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff',
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer());

  const { searchParams } = new URL(req.url);

  const hasSlug = searchParams.has('slug');
  const hasDescription = searchParams.get('description');

  const slug = hasSlug ? searchParams.get('slug') : null;
  const description = hasDescription ? searchParams.get('description') : null;

  if (!hasSlug) return null;

  const [groupName, pageName] = (() => {
    for (let i = 0; i < DOCS_PAGES.length; ++i) {
      const section = DOCS_PAGES[i];
      for (let j = 0; j < section.groups.length; ++j) {
        const group = section.groups[j];
        if ('pages' in group) {
          const page = group.pages.find((page) => page.slug === slug);
          if (page) return [group.name, page.name];
        } else if (group.slug === slug) {
          return ['', group.name];
        }
      }
    }

    return ['', ''];
  })();

  if (pageName.length === 0) return null;

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
              <div tw="flex h-16 w-16 rounded-lg border border-[#27303D] mr-5">
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
            <div tw="flex flex-col mt-auto gap-8">
              <div tw="flex grow items-center">
                {groupName.length > 0 ? (
                  <div
                    style={{
                      fontSize: 64,
                      lineHeight: 1.2,
                      color: '#94A3B3',
                      fontFamily: 'Inter 500',
                    }}
                  >
                    {groupName}
                  </div>
                ) : null}
                {groupName.length > 0 ? (
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
                ) : null}
                <div
                  style={{
                    fontSize: 64,
                    lineHeight: 1.2,
                    color: '#F0F6FC',
                    fontFamily: 'Inter 600',
                    letterSpacing: '-0.025em',
                  }}
                >
                  {pageName}
                </div>
              </div>
              {description && description.length > 0 ? (
                <div
                  tw="flex"
                  style={{
                    fontSize: 40,
                    lineHeight: 1.5,
                    color: '#94A3B3',
                    fontFamily: 'Inter 400',
                  }}
                >
                  {description}
                </div>
              ) : null}
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
        { name: 'Inter 400', data: await inter400, weight: 400 },
        { name: 'Inter 500', data: await inter500, weight: 500 },
        { name: 'Inter 600', data: await inter600, weight: 600 },
      ],
    },
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const runtime = 'edge';

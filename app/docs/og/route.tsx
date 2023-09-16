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
            <div tw="flex gap-5">
              <div tw="flex h-16 w-16 rounded-lg border border-[#27303D]"></div>
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

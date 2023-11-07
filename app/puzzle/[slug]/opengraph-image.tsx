import { ImageResponse } from 'next/server';

import { PRESET_COLORS } from '@/lib/constants/presetColors';
import {
  fetchPuzzleById,
  fetchPuzzleFlagColors,
  getChainIdAndId,
  getPuzzleTimeLeft,
  getShortenedAddress,
  getTimeLeftString,
} from '@/lib/utils';

// -----------------------------------------------------------------------------
// Image
// -----------------------------------------------------------------------------

export default async function Image({ params }: { params: { slug: string } }) {
  const inter400 = fetch(
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

  const ids = getChainIdAndId(params.slug);
  // Return empty image if `slug` is an invalid format.
  if (!ids) return null;

  const { chainId, id } = ids;
  const [{ data: puzzle }, { colors }] = await Promise.all([
    fetchPuzzleById(id, chainId),
    fetchPuzzleFlagColors(id),
  ]);
  if (!puzzle) return null;

  const author = getShortenedAddress(puzzle.author.address).substring(2).toUpperCase();
  const phase = getPuzzleTimeLeft(puzzle.firstSolveTimestamp).phase;
  const solves = puzzle.numberSolved;
  const name = puzzle.name;
  const firstSolveTimestamp = puzzle.firstSolveTimestamp
    ? getTimeLeftString(puzzle.solveTime ?? 0)
    : '–';
  const defaultColors = PRESET_COLORS[0]; // Default to the first preset color which is Waterfall
  const flagColors = colors
    ? {
        bg: `#${((BigInt(colors) >> BigInt(72)) & BigInt(0xffffff)).toString(16).padStart(6, '0')}`,
        border: `#${((BigInt(colors) >> BigInt(48)) & BigInt(0xffffff))
          .toString(16)
          .padStart(6, '0')}`,
        text: `#${((BigInt(colors) >> BigInt(24)) & BigInt(0xffffff))
          .toString(16)
          .padStart(6, '0')}`,
        subtext: `#${(BigInt(colors) & BigInt(0xffffff)).toString(16).padStart(6, '0')}`,
      }
    : defaultColors;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 64,
          fontFamily: 'Inter 400',
          background: '#0D1017',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: '#94A3B3',
              fontSize: 40,
              lineHeight: 1.5,
            }}
          >
            Puzzle #{id}
          </div>
          <div
            style={{
              display: 'flex',
              width: 656.25,
              color: '#F0F6FC',
              fontSize: 80,
              fontFamily: 'Inter 600',
              lineHeight: 1.2125,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: 'flex',
              color: '#94A3B3',
              fontSize: 40,
              lineHeight: 1.5,
            }}
          >
            by
            <div
              style={{
                display: 'flex',
                color: '#F0F6FC',
                fontSize: 40,
                lineHeight: 1.5,
                marginLeft: 8,
              }}
            >
              {` 0x${author}`}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginTop: 197,
            }}
          >
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#758195"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{ marginTop: 4 }}
                >
                  <circle cx="12" cy="12" r="3" />
                  <line x1="3" x2="9" y1="12" y2="12" />
                  <line x1="15" x2="21" y1="12" y2="12" />
                </svg>

                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
                  <div
                    style={{
                      display: 'flex',
                      color: '#C1CDD9',
                      fontSize: 40,
                      lineHeight: 1.25,
                      fontFamily: 'Inter 600',
                      letterSpacing: '-0.05em',
                    }}
                  >
                    {phase}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      color: '#758195',
                      fontSize: 24,
                      lineHeight: 1,
                    }}
                  >
                    Phase
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', marginLeft: 40 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#758195"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{ marginTop: 4 }}
                >
                  <line x1="10" x2="14" y1="2" y2="2" />
                  <line x1="12" x2="15" y1="14" y2="11" />
                  <circle cx="12" cy="14" r="8" />
                </svg>

                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
                  <div
                    style={{
                      display: 'flex',
                      color: '#C1CDD9',
                      fontSize: 40,
                      lineHeight: 1.25,
                      fontFamily: 'Inter 600',
                      letterSpacing: '-0.05em',
                    }}
                  >
                    {firstSolveTimestamp}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      color: '#758195',
                      fontSize: 24,
                      lineHeight: 1,
                    }}
                  >
                    First solve
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', marginLeft: 40 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={40}
                  height={40}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#758195"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{ marginTop: 4 }}
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>

                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
                  <div
                    style={{
                      display: 'flex',
                      color: '#C1CDD9',
                      fontSize: 40,
                      lineHeight: 1.25,
                      fontFamily: 'Inter 600',
                      letterSpacing: '-0.05em',
                    }}
                  >
                    {solves}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      color: '#758195',
                      fontSize: 24,
                      lineHeight: 1,
                    }}
                  >
                    Solves
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flag card. */}
        <div
          style={{
            display: 'flex',
            width: '319.75',
            height: '499',
            background: flagColors.border,
            padding: 4.8447,
            borderRadius: 9.6893,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 19.3786,
              background: flagColors.bg,
              borderRadius: 4.8447,
              height: '100%',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    fontSize: 24.2233,
                    lineHeight: 1.25,
                    letterSpacing: '-0.05em',
                    color: flagColors.text,
                    fontFamily: 'Inter 600',
                  }}
                >
                  Puzzle #{id}
                </div>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: 14.534,
                      lineHeight: 1.3333,
                      color: flagColors.subtext,
                      marginRight: 4.8447,
                    }}
                  >
                    Created by
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      fontSize: 14.534,
                      color: flagColors.text,
                      fontFamily: 'Inter 600',
                    }}
                  >
                    {author}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  paddingLeft: 9.6893,
                  paddingRight: 9.6893,
                  paddingTop: 4.8447,
                  paddingBottom: 4.8447,
                  backgroundColor: flagColors.text,
                  borderRadius: 38.7572,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={flagColors.bg}
                  width="19.3786"
                  height="19.3786"
                >
                  <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={flagColors.bg}
                  width="19.3786"
                  height="19.3786"
                >
                  <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={flagColors.bg}
                  width="19.3786"
                  height="19.3786"
                >
                  <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                </svg>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: 271.301,
                backgroundColor: 'rgba(0,0,0,0.2)',
                marginTop: 9.6893,
                borderRadius: 9.6893,
              }}
            >
              {/* Flag NFT art. */}
            </div>
            <div style={{ display: 'flex', marginTop: 14.534, width: '100%' }}>
              <div style={{ display: 'flex', width: 130.8058, height: 46.0243 }}>
                <div
                  style={{
                    display: 'flex',
                    width: 24.2233,
                    height: 24.2233,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke={flagColors.subtext}
                    width="24.2233"
                    height="24.2233"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 4.8447 }}>
                  <div
                    style={{
                      fontSize: 19.3786,
                      fontFamily: 'Inter 600',
                      color: flagColors.text,
                      lineHeight: 1.25,
                      letterSpacing: '-0.05em',
                    }}
                  >
                    A85572C
                  </div>
                  <div style={{ color: flagColors.subtext, fontSize: 14.534, lineHeight: 1.333 }}>
                    Captured by
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', width: 130.8058, height: 46.0243 }}>
                <div
                  style={{
                    display: 'flex',
                    width: 24.2233,
                    height: 24.2233,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke={flagColors.subtext}
                    width="24.2233"
                    height="24.2233"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 4.8447 }}>
                  <div
                    style={{
                      fontSize: 19.3786,
                      fontFamily: 'Inter 600',
                      color: flagColors.text,
                      lineHeight: 1.25,
                      letterSpacing: '-0.05em',
                    }}
                  >
                    A85572C
                  </div>
                  <div style={{ color: flagColors.subtext, fontSize: 14.534, lineHeight: 1.333 }}>
                    Solution
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: 14.534, width: '100%' }}>
              <div style={{ display: 'flex', width: 130.8058, height: 46.0243 }}>
                <div
                  style={{
                    display: 'flex',
                    width: 24.2233,
                    height: 24.2233,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke={flagColors.subtext}
                    width="24.2233"
                    height="24.2233"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                    />
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 4.8447 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <div
                      style={{
                        fontSize: 19.3786,
                        fontFamily: 'Inter 600',
                        color: flagColors.text,
                        lineHeight: 1.25,
                        letterSpacing: '-0.05em',
                      }}
                    >
                      2
                    </div>
                    <div
                      style={{
                        fontSize: 14.534,
                        fontFamily: 'Inter 600',
                        color: flagColors.subtext,
                        letterSpacing: '-0.05em',
                        marginLeft: 4.8447,
                        lineHeight: 1.3333,
                      }}
                    >
                      / 220
                    </div>
                  </div>
                  <div style={{ color: flagColors.subtext, fontSize: 14.534, lineHeight: 1.333 }}>
                    Rank
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', width: 130.8058, height: 46.0243 }}>
                <div
                  style={{
                    display: 'flex',
                    width: 24.2233,
                    height: 24.2233,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke={flagColors.subtext}
                    width="24.2233"
                    height="24.2233"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 4.8447 }}>
                  <div
                    style={{
                      fontSize: 19.3786,
                      fontFamily: 'Inter 600',
                      color: flagColors.text,
                      lineHeight: 1.25,
                      letterSpacing: '-0.05em',
                    }}
                  >
                    45:42:21
                  </div>
                  <div style={{ color: flagColors.subtext, fontSize: 14.534, lineHeight: 1.333 }}>
                    Solve time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter 400', data: await inter400, weight: 400 },
        { name: 'Inter 600', data: await inter600, weight: 600 },
      ],
    },
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const runtime = 'edge';

import { ImageResponse } from 'next/server';

import { db } from '@/lib/db';

// -----------------------------------------------------------------------------
// Image
// -----------------------------------------------------------------------------

export default async function Image() {
  const inter400 = fetch(
    new URL('../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const inter600 = fetch(
    new URL('../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const [authors, puzzles, solves, solversArr] = await Promise.all([
    db.userInfo.count({ where: { isPuzzleAuthor: true } }),
    db.puzzle.count(),
    db.puzzleSolve.count(),
    db.$queryRaw`SELECT COUNT(DISTINCT solver_address) FROM puzzle_solves` as Promise<
      {
        'count(distinct solver_address)': bigint;
      }[]
    >,
  ]);
  const solvers = solversArr[0]['count(distinct solver_address)'];

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          backgroundColor: '#0D1017',
          width: '100%',
          height: '100%',
          fontFamily: 'Inter 400',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <svg width="209" viewBox="0 0 209 58">
            <path
              d="M0.8 29C0.8 23.5067 2.02667 18.6 4.48 14.28C6.98667 9.90666 10.3733 6.52 14.64 4.12C18.96 1.66667 23.7867 0.439999 29.12 0.439999C35.36 0.439999 40.8267 2.04 45.52 5.24C50.2133 8.44 53.4933 12.8667 55.36 18.52H42.48C41.2 15.8533 39.3867 13.8533 37.04 12.52C34.7467 11.1867 32.08 10.52 29.04 10.52C25.7867 10.52 22.88 11.2933 20.32 12.84C17.8133 14.3333 15.84 16.4667 14.4 19.24C13.0133 22.0133 12.32 25.2667 12.32 29C12.32 32.68 13.0133 35.9333 14.4 38.76C15.84 41.5333 17.8133 43.6933 20.32 45.24C22.88 46.7333 25.7867 47.48 29.04 47.48C32.08 47.48 34.7467 46.8133 37.04 45.48C39.3867 44.0933 41.2 42.0667 42.48 39.4H55.36C53.4933 45.1067 50.2133 49.56 45.52 52.76C40.88 55.9067 35.4133 57.48 29.12 57.48C23.7867 57.48 18.96 56.28 14.64 53.88C10.3733 51.4267 6.98667 48.04 4.48 43.72C2.02667 39.4 0.8 34.4933 0.8 29ZM102.766 12.68V57H91.4863V51.4C90.0463 53.32 88.1529 54.84 85.8063 55.96C83.5129 57.0267 81.0063 57.56 78.2863 57.56C74.8196 57.56 71.7529 56.84 69.0863 55.4C66.4196 53.9067 64.3129 51.7467 62.7663 48.92C61.2729 46.04 60.5263 42.6267 60.5263 38.68V12.68H71.7263V37.08C71.7263 40.6 72.6063 43.32 74.3663 45.24C76.1263 47.1067 78.5263 48.04 81.5663 48.04C84.6596 48.04 87.0863 47.1067 88.8463 45.24C90.6063 43.32 91.4863 40.6 91.4863 37.08V12.68H102.766ZM121.017 19.56C122.457 17.2133 124.324 15.3733 126.617 14.04C128.964 12.7067 131.63 12.04 134.617 12.04V23.8H131.657C128.137 23.8 125.47 24.6267 123.657 26.28C121.897 27.9333 121.017 30.8133 121.017 34.92V57H109.817V12.68H121.017V19.56ZM151.201 21.88V43.32C151.201 44.8133 151.547 45.9067 152.241 46.6C152.987 47.24 154.214 47.56 155.921 47.56H161.121V57H154.081C144.641 57 139.921 52.4133 139.921 43.24V21.88H134.641V12.68H139.921V1.72H151.201V12.68H161.121V21.88H151.201ZM162.296 34.68C162.296 30.2 163.176 26.2267 164.936 22.76C166.75 19.2933 169.176 16.6267 172.216 14.76C175.31 12.8933 178.75 11.96 182.536 11.96C185.843 11.96 188.723 12.6267 191.176 13.96C193.683 15.2933 195.683 16.9733 197.176 19V12.68H208.456V57H197.176V50.52C195.736 52.6 193.736 54.3333 191.176 55.72C188.67 57.0533 185.763 57.72 182.456 57.72C178.723 57.72 175.31 56.76 172.216 54.84C169.176 52.92 166.75 50.2267 164.936 46.76C163.176 43.24 162.296 39.2133 162.296 34.68ZM197.176 34.84C197.176 32.12 196.643 29.8 195.576 27.88C194.51 25.9067 193.07 24.4133 191.256 23.4C189.443 22.3333 187.496 21.8 185.416 21.8C183.336 21.8 181.416 22.3067 179.656 23.32C177.896 24.3333 176.456 25.8267 175.336 27.8C174.27 29.72 173.736 32.0133 173.736 34.68C173.736 37.3467 174.27 39.6933 175.336 41.72C176.456 43.6933 177.896 45.2133 179.656 46.28C181.47 47.3467 183.39 47.88 185.416 47.88C187.496 47.88 189.443 47.3733 191.256 46.36C193.07 45.2933 194.51 43.8 195.576 41.88C196.643 39.9067 197.176 37.56 197.176 34.84Z"
              fill="#F0F6FC"
            />
          </svg>
          <div
            style={{
              display: 'flex',
              color: '#94A3B3',
              fontSize: 40,
              marginTop: 32,
              lineHeight: 1.5,
            }}
          >
            A CTF protocol, where players create and solve EVM puzzles to earn NFTs.
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: 1072, // = 1200 - 64 * 2
              marginTop: 218, // = 630 - 64 - 58 - 32 - 2 * 1.5 * 40 - 1.25 * 40 - 24 - 64
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
                  <path d="m12 19 7-7 3 3-7 7-3-3z" />
                  <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
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
                    {authors}
                  </div>
                  <div style={{ display: 'flex', color: '#758195', fontSize: 24, lineHeight: 1 }}>
                    Authors
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
                  <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
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
                    {puzzles}
                  </div>
                  <div style={{ display: 'flex', color: '#758195', fontSize: 24, lineHeight: 1 }}>
                    Puzzles
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
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
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
                    {solvers.toString()}
                  </div>
                  <div style={{ display: 'flex', color: '#758195', fontSize: 24, lineHeight: 1 }}>
                    Solvers
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
                  <div style={{ display: 'flex', color: '#758195', fontSize: 24, lineHeight: 1 }}>
                    Solves
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 8,
                  paddingLeft: 8,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingRight: 16,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid #27303D',
                  borderRadius: 50,
                }}
              >
                <svg width="40" viewBox="0 0 24 24" fill="#C1CDD9">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                <div style={{ display: 'flex', fontSize: 24, marginLeft: 8, color: '#C1CDD9' }}>
                  waterfall-mkt/curta
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
        { name: 'Inter 400', data: await inter400 },
        { name: 'Inter 600', data: await inter600 },
      ],
    },
  );
}

import { ImageResponse } from 'next/server';

//import { fetchAuthors, fetchPuzzles, fetchSolvesCount } from '@/lib/utils';

/* const inter300 = fetch(
  new URL(
    '../../../../node_modules/@fontsource/inter/files/inter-latin-300-normal.woff',
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
).then((res) => res.arrayBuffer()); */

export default async function Image() {
  /* const [{ data: authors }, { data: puzzles }, { data: solvesCount }] = await Promise.all([
    fetchAuthors(),
    fetchPuzzles(),
    fetchSolvesCount(),
  ]); */

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          backgroundImage: 'linear-gradient(to left, #0F172A, #0D1017, #0D1017)',
          width: '100%',
          height: '100%',
        }}
      >
        hi
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

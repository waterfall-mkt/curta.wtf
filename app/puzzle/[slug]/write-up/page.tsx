import { notFound } from 'next/navigation';
import { cache } from 'react';

import { useMDXComponents as getMDXComponents } from 'mdx-components';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { Address } from 'viem';

import { fetchPuzzleById, getChainIdAndId, getChainInfo } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: { params: { slug: string } }) {
  const ids = getChainIdAndId(params.slug);

  // Return 404 if `slug` is an invalid format.
  if (!ids) return notFound();

  const { chainId, id } = ids;

  const { data: puzzle, error } = await fetchPuzzleById(id, chainId);

  // Return 404 if `puzzle` is `null` or there was an `error` in fetching the
  // data.
  if (!puzzle || error) return notFound();

  // Fetch write-up's MDX.
  const response = await cache(
    async () =>
      await fetch(
        `https://raw.githubusercontent.com/waterfall-mkt/curta-write-ups/main/puzzles/${
          getChainInfo(chainId).network
        }/${id}.mdx`,
      ),
  )();

  // Return 404 if write-up is not found.
  if (!response.ok) return notFound();

  const normalizedSlug = decodeURIComponent(params.slug.toLowerCase());

  // Parse frontmatter and generate content from MDX.
  const source = await response.text();
  const { content, frontmatter } = await compileMDX<{ authors: Address[]; adapted_from?: string }>({
    source,
    components: getMDXComponents({}),
    options: { parseFrontmatter: true },
  });
  const authors = frontmatter.authors.map((author) => author.toLowerCase());

  return (
    <div
      id={`content-/puzzle/${normalizedSlug}/write-up`}
      role="tabpanel"
      aria-labelledby={`trigger-/puzzle/${normalizedSlug}/write-up`}
      className="mx-auto flex max-w-[90rem] flex-col gap-12 px-4 pt-4 lg:flex-row lg:px-20 lg:pt-8"
    >
      <article className="prose max-w-full grow dark:prose-invert prose-h1:mb-4 prose-h1:text-3xl prose-h1:font-semibold prose-h1:tracking-tight prose-h1:text-gray-50 prose-h2:mb-2 prose-h2:mt-6 prose-h2:text-xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:text-gray-50 prose-h3:mb-2 prose-h3:mt-5 prose-h3:text-lg prose-h3:font-semibold prose-h3:tracking-tight prose-h3:text-gray-50 prose-strong:font-medium prose-strong:text-gray-50 prose-th:py-[1px] prose-img:my-2 prose-video:my-0 prose-h1:md:text-4xl prose-h2:md:mb-4 prose-h2:md:mt-12 prose-h2:md:text-2xl prose-h3:md:mb-4 prose-h3:md:mt-6 prose-h3:md:text-xl prose-img:md:my-4 lg:max-w-none">
        <h1>Write-up for {puzzle.name ?? `Puzzle #${puzzle.id}`}</h1>
        <hr className="my-6 w-full rounded-full border-stroke" role="separator" />
        {content}
      </article>
      <div className="flex min-w-[22.5rem] flex-col">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-200">Written by</div>
          <div className="rounded-xl border border-stroke p-4">
            {authors.map((author) => (
              <div key={author}>{author}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 43_200;

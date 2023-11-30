import { notFound } from 'next/navigation';
import { cache } from 'react';

import { Github } from 'lucide-react';
import { useMDXComponents as getMDXComponents } from 'mdx-components';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { Address } from 'viem';

import { fetchPuzzleById, getChainIdAndId, getChainInfo } from '@/lib/utils';

import UserDisplay from '@/components/templates/user-display';
import { Badge, Button } from '@/components/ui';

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
  const writeUpUrlPath = `main/puzzles/${getChainInfo(chainId).network}/${id}.mdx`;
  const response = await cache(
    async () =>
      await fetch(
        `https://raw.githubusercontent.com/waterfall-mkt/curta-write-ups/${writeUpUrlPath}`,
      ),
  )();

  // Return 404 if write-up is not found.
  if (!response.ok) return notFound();

  const normalizedSlug = decodeURIComponent(params.slug.toLowerCase());

  // Parse frontmatter and generate content from MDX.
  const source = await response.text();
  const { content, frontmatter } = await compileMDX<{
    author: Address;
    contributors: Address[];
    adapted_from?: string;
  }>({
    source,
    components: getMDXComponents({}),
    options: { parseFrontmatter: true },
  });

  return (
    <div
      id={`content-/puzzle/${normalizedSlug}/write-up`}
      role="tabpanel"
      aria-labelledby={`trigger-/puzzle/${normalizedSlug}/write-up`}
      className="mx-auto flex max-w-[90rem] flex-col gap-12 px-4 pt-4 md:flex-row md:px-20 md:pt-8"
    >
      <article className="prose max-w-full grow dark:prose-invert prose-h1:mb-4 prose-h1:text-3xl prose-h1:font-semibold prose-h1:tracking-tight prose-h1:text-gray-50 prose-h2:mb-2 prose-h2:mt-6 prose-h2:text-xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:text-gray-50 prose-h3:mb-2 prose-h3:mt-5 prose-h3:text-lg prose-h3:font-semibold prose-h3:tracking-tight prose-h3:text-gray-50 prose-strong:font-medium prose-strong:text-gray-50 prose-th:py-[1px] prose-img:my-2 prose-video:my-0 md:max-w-none prose-h1:md:text-4xl prose-h2:md:mb-4 prose-h2:md:mt-12 prose-h2:md:text-2xl prose-h3:md:mb-4 prose-h3:md:mt-6 prose-h3:md:text-xl prose-img:md:my-4">
        <h1>Write-up for {puzzle.name ?? `Puzzle #${puzzle.id}`}</h1>
        <div className="not-prose flex items-center justify-between">
          <UserDisplay address={frontmatter.author} displaySocials={false}>
            {frontmatter.author.toLowerCase() === puzzle.author.address.toLowerCase() ? (
              <Badge size="sm" variant="secondary" intent="primary">
                Author
              </Badge>
            ) : null}
          </UserDisplay>
          <Button
            variant="outline"
            intent="neutral"
            rightIcon={<Github />}
            href={`https://github.com/waterfall-mkt/curta-write-ups/blob/${writeUpUrlPath}`}
            newTab
          >
            Edit on GitHub
          </Button>
        </div>
        <hr className="my-6 w-full rounded-full border-stroke" role="separator" />
        {content}
      </article>
      <div className="flex w-full flex-col md:min-w-[22.5rem] md:max-w-[22.5rem]">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-200">Contributors</div>
          <div className="flex flex-col gap-4 rounded-xl border border-stroke p-4">
            {frontmatter.contributors.map(async (address) => (
              <UserDisplay key={address} address={address} displaySocials>
                {address.toLowerCase() === puzzle.author.address.toLowerCase() ? (
                  <Badge size="sm" variant="secondary" intent="primary">
                    Author
                  </Badge>
                ) : null}
              </UserDisplay>
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

export const revalidate = 0;

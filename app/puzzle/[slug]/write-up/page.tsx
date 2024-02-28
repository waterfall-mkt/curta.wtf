import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import PuzzleWriteUpImage from './(components)/image';
import 'katex/dist/katex.min.css';
import { Github } from 'lucide-react';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeKatex from 'rehype-katex';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import type { Address } from 'viem';

import { fetchPuzzleById, getChainIdAndId, getChainInfo } from '@/lib/utils';

import CustomMDX from '@/components/templates/custom-mdx';
import UserDisplay from '@/components/templates/user-display';
import { Badge, Button } from '@/components/ui';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const description = 'A CTF protocol, where players create and solve EVM puzzles to earn NFTs.';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const ids = getChainIdAndId(params.slug);
  // Return empty object if `slug` is an invalid format.
  if (!ids) return {};

  // Fetch puzzle and response and return empty metadata object if either don't
  // exist.
  const [puzzle, response] = await Promise.all([
    fetchPuzzleById(ids.id, ids.chainId),
    cache(
      async () =>
        await fetch(
          `https://raw.githubusercontent.com/waterfall-mkt/curta-write-ups/main/puzzles/${
            getChainInfo(ids.chainId).network
          }/${ids.id}.mdx`,
        ),
    )(),
  ]);
  if (!puzzle || !response.ok) return {};

  const title = `Puzzle #${puzzle.id} Write-up`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Curta`,
      description,
      siteName: 'curta.wtf',
      url: 'https://curta.wtf',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Curta`,
      description,
      site: '@curta_ctf',
      siteId: '1604186457165406210',
      creator: '@waterfall_mkt',
      creatorId: '1466508083929223176',
    },
  };
}

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
  const mdxSource = await serialize<
    Record<string, unknown>,
    {
      author: Address;
      contributors: Address[];
      adapted_from?: string;
    }
  >(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex, rehypeMdxCodeProps],
    },
  });
  const frontmatter = mdxSource.frontmatter;

  return (
    <div
      id={`content-/puzzle/${normalizedSlug}/write-up`}
      role="tabpanel"
      aria-labelledby={`trigger-/puzzle/${normalizedSlug}/write-up`}
      className="mx-auto flex max-w-[90rem] flex-col px-4 pt-4 lg:flex-row lg:gap-12 lg:px-20 lg:pt-8"
    >
      <article className="prose max-w-none grow dark:prose-invert prose-h1:mb-4 prose-h1:text-3xl prose-h1:font-semibold prose-h1:tracking-tight prose-h1:text-gray-50 prose-h2:mb-2 prose-h2:mt-6 prose-h2:text-xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:text-gray-50 prose-h3:mb-2 prose-h3:mt-5 prose-h3:text-lg prose-h3:font-semibold prose-h3:tracking-tight prose-h3:text-gray-50 prose-h4:mb-2 prose-h4:mt-5 prose-h4:text-base prose-h4:font-semibold prose-h4:tracking-tight prose-h4:text-gray-50 prose-p:before:content-[''] prose-p:after:content-[''] prose-blockquote:font-light prose-strong:font-medium prose-strong:text-gray-50 prose-th:py-[1px] prose-img:my-2 prose-video:my-0 prose-h1:md:text-4xl prose-h2:md:mb-4 prose-h2:md:mt-8 prose-h2:md:text-2xl prose-h3:md:mb-4 prose-h3:md:mt-6 prose-h3:md:text-xl prose-img:md:my-4 lg:w-1/2 [&>*:nth-child(4)]:mt-0">
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
            className="hidden sm:flex"
            variant="outline"
            intent="neutral"
            rightIcon={<Github />}
            href={`https://github.com/waterfall-mkt/curta-write-ups/blob/${writeUpUrlPath}`}
            newTab
          >
            Edit on GitHub
          </Button>
          <Button
            className="sm:hidden"
            variant="outline"
            intent="neutral"
            rightIcon={<Github />}
            href={`https://github.com/waterfall-mkt/curta-write-ups/blob/${writeUpUrlPath}`}
            newTab
          >
            Edit
          </Button>
        </div>
        <hr className="my-6 w-full rounded-full border-stroke" role="separator" />
        <CustomMDX
          {...mdxSource}
          components={{
            Image: PuzzleWriteUpImage,
          }}
        />
      </article>
      <hr className="my-6 w-full rounded-full border-stroke lg:hidden" role="separator" />
      <div className="flex h-fit w-full flex-col lg:sticky lg:top-[9.25rem] lg:min-w-[22.5rem] lg:max-w-[22.5rem]">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-200">Contributors</div>
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-stroke p-4 sm:grid-cols-2 lg:grid-cols-1">
            {frontmatter.contributors.map(async (address) => (
              <UserDisplay key={address} className="col-span-1" address={address} displaySocials>
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

export const revalidate = 43_200;

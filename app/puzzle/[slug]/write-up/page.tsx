import { notFound } from 'next/navigation';
import { cache } from 'react';

import { Github } from 'lucide-react';
import { useMDXComponents as getMDXComponents } from 'mdx-components';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { Address } from 'viem';

import { ethereumClient } from '@/lib/client';
import supabase from '@/lib/services/supabase';
import type { DbUser } from '@/lib/types/api';
import { fetchPuzzleById, getChainIdAndId, getChainInfo, getShortenedAddress } from '@/lib/utils';

import LogoIcon from '@/components/common/logo-icon';
import AddressLink from '@/components/templates/address-link';
import Avatar from '@/components/templates/avatar';
import ENSAvatar from '@/components/templates/ens-avatar';
import UserHoverCard from '@/components/templates/user-hover-card';
import { Badge, ButtonGroup, IconButton } from '@/components/ui';

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
  const { content, frontmatter } = await compileMDX<{
    author: Address;
    contributors: Address[];
    adapted_from?: string;
  }>({
    source,
    components: getMDXComponents({}),
    options: { parseFrontmatter: true },
  });
  console.log(frontmatter);

  return (
    <div
      id={`content-/puzzle/${normalizedSlug}/write-up`}
      role="tabpanel"
      aria-labelledby={`trigger-/puzzle/${normalizedSlug}/write-up`}
      className="mx-auto flex max-w-[90rem] flex-col gap-12 px-4 pt-4 md:flex-row md:px-20 md:pt-8"
    >
      <article className="prose max-w-full grow dark:prose-invert prose-h1:mb-4 prose-h1:text-3xl prose-h1:font-semibold prose-h1:tracking-tight prose-h1:text-gray-50 prose-h2:mb-2 prose-h2:mt-6 prose-h2:text-xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:text-gray-50 prose-h3:mb-2 prose-h3:mt-5 prose-h3:text-lg prose-h3:font-semibold prose-h3:tracking-tight prose-h3:text-gray-50 prose-strong:font-medium prose-strong:text-gray-50 prose-th:py-[1px] prose-img:my-2 prose-video:my-0 md:max-w-none prose-h1:md:text-4xl prose-h2:md:mb-4 prose-h2:md:mt-12 prose-h2:md:text-2xl prose-h3:md:mb-4 prose-h3:md:mt-6 prose-h3:md:text-xl prose-img:md:my-4">
        <h1>Write-up for {puzzle.name ?? `Puzzle #${puzzle.id}`}</h1>
        <hr className="my-6 w-full rounded-full border-stroke" role="separator" />
        {content}
      </article>
      <div className="flex w-full flex-col md:min-w-[22.5rem] md:max-w-[22.5rem]">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-200">Contributors</div>
          <div className="flex flex-col gap-4 rounded-xl border border-stroke p-4">
            {frontmatter.contributors.map(async (address) => {
              const ensName = await cache(
                async () => await ethereumClient.getEnsName({ address }),
              )();
              const { data: user } = await cache(
                async () =>
                  await supabase
                    .from('users')
                    .select('*')
                    .eq('address', address.toLowerCase())
                    .returns<DbUser[]>()
                    .single(),
              )();
              const displayName = user?.displayName ?? ensName ?? getShortenedAddress(address);

              return (
                <div key={address} className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="h-10 w-10 overflow-hidden rounded-full border border-stroke bg-gray-600">
                      {ensName ? (
                        <ENSAvatar name={ensName} size={40} />
                      ) : (
                        <Avatar src="" alt={address} size={40} />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 font-medium leading-5 text-gray-100">
                        {displayName}
                        {address.toLowerCase() === puzzle.author.address.toLowerCase() ? (
                          <Badge size="sm" variant="secondary" intent="primary">
                            Author
                          </Badge>
                        ) : null}
                      </div>
                      <UserHoverCard
                        address={address}
                        trigger={
                          <AddressLink
                            className="w-fit text-sm leading-4"
                            address={address}
                            chainId={1}
                          />
                        }
                      />
                    </div>
                  </div>
                  {user?.twitter || user?.github ? (
                    <ButtonGroup>
                      {user?.twitter ? (
                        <IconButton
                          variant="outline"
                          intent="neutral"
                          href={`https://twitter.com/${user.twitter}`}
                          newTab
                        >
                          <LogoIcon.X />
                        </IconButton>
                      ) : null}
                      {user?.github ? (
                        <IconButton
                          variant="outline"
                          intent="neutral"
                          href={`https://github.com/${user.github}`}
                          newTab
                        >
                          <Github />
                        </IconButton>
                      ) : null}
                    </ButtonGroup>
                  ) : null}
                </div>
              );
            })}
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

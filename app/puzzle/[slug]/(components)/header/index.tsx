import { cache } from 'react';

import type { PuzzleValue } from '../types';
import PuzzleHeaderPageNav from './page-nav';
import { ExternalLink, FileCheck, Github } from 'lucide-react';

import { ethereumClient } from '@/lib/client';
import { fetchPuzzleById, getChainInfo } from '@/lib/utils';

import AddressLink from '@/components/templates/address-link';
import UserAvatar from '@/components/templates/user-avatar';
import UserHoverCard from '@/components/templates/user-hover-card';
import { Button, ButtonGroup, IconButton, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleHeaderProps = {
  puzzle: PuzzleValue;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleHeader: React.FC<PuzzleHeaderProps> = async ({ puzzle }) => {
  const [prevPuzzle, nextPuzzle] = await Promise.all([
    fetchPuzzleById(puzzle.id - 1, puzzle.chainId),
    fetchPuzzleById(puzzle.id + 1, puzzle.chainId),
  ]);

  const links = [
    {
      name: 'Solution',
      href: puzzle.solutionLink,
      icon: <FileCheck />,
      disabled: !puzzle.solutionLink,
    },
    {
      name: 'Source',
      href: `https://github.com/${puzzle.github}`,
      icon: <Github />,
      disabled: !puzzle.github,
    },
    {
      name: 'Contract',
      href: `https://${getChainInfo(puzzle.chainId).blockExplorer}/address/${puzzle.address}`,
      icon: <ExternalLink />,
      disabled: false,
    },
  ];

  const authorEnsName = await cache(
    async () => await ethereumClient.getEnsName({ address: puzzle.authorAddress as `0x${string}` }),
  )();
  const authorEnsAvatar = await cache(async () =>
    authorEnsName ? await ethereumClient.getEnsAvatar({ name: authorEnsName }) : undefined,
  )();

  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-col justify-center gap-3 px-4 sm:flex-row sm:gap-0 lg:px-20">
      <div className="flex items-center gap-4">
        <PuzzleHeaderPageNav prevPuzzle={prevPuzzle} nextPuzzle={nextPuzzle} />
        <div className="flex grow items-center justify-between sm:gap-4">
          {[
            {
              name: `Puzzle #${puzzle.id}`,
              value: puzzle.name ?? `Puzzle ${puzzle.id}`,
            },
            {
              name: 'Author',
              value: (
                <div className="flex grow items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full">
                    <UserAvatar image={authorEnsAvatar} size={20} name={puzzle.author.address} />
                  </div>
                  <UserHoverCard
                    address={puzzle.author.address as `0x${string}`}
                    trigger={
                      <AddressLink
                        className="max-w-[13rem] overflow-hidden text-ellipsis font-medium text-gray-50"
                        address={puzzle.author.address as `0x${string}`}
                        chainId={puzzle.chainId}
                        label={puzzle.author.info?.displayName ?? undefined}
                      />
                    }
                    inPortal
                  />
                </div>
              ),
            },
          ].map((item, index) => (
            <div
              className="flex flex-col items-center gap-1 first:items-start last:items-end sm:items-start sm:last:items-start"
              key={index}
            >
              <div className="text-sm leading-4 text-gray-150">{item.name}</div>
              <div className="-my-1 -mr-1 max-w-[13rem] overflow-hidden text-ellipsis whitespace-nowrap py-1 pr-1 font-medium leading-5 text-gray-50">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ButtonGroup className="ml-auto hidden sm:flex">
        {links.map((item, index) =>
          !item.disabled && item.href !== null ? (
            <Tooltip content={item.name} key={index} inPortal>
              <IconButton href={item.href} variant="outline" intent="neutral" size="lg" newTab>
                {item.icon}
              </IconButton>
            </Tooltip>
          ) : null,
        )}
      </ButtonGroup>
      <ButtonGroup className="sm:hidden">
        {links.map((item, index) =>
          !item.disabled && item.href !== null ? (
            <Button
              className="grow"
              key={index}
              href={item.href}
              variant="outline"
              intent="neutral"
              rightIcon={item.icon}
              newTab
            >
              {item.name}
            </Button>
          ) : null,
        )}
      </ButtonGroup>
    </div>
  );
};

export default PuzzleHeader;

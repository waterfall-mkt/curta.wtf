import type { FC } from 'react';

import PuzzleHeaderPageNav from './page-nav';
import { ExternalLink, FileCheck, Github } from 'lucide-react';

import type { Puzzle } from '@/lib/types/protocol';
import { fetchPuzzleById, getBlockExplorerDomain } from '@/lib/utils';

import AddressLink from '@/components/templates/address-link';
import Avatar from '@/components/templates/avatar';
import ENSAvatar from '@/components/templates/ens-avatar';
import { Button, ButtonGroup, IconButton, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleHeaderProps = {
  puzzle: Puzzle;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleHeader: FC<PuzzleHeaderProps> = async ({ puzzle }) => {
  const [{ data: prevPuzzle }, { data: nextPuzzle }] = await Promise.all([
    fetchPuzzleById(puzzle.id - 1, puzzle.chainId),
    fetchPuzzleById(puzzle.id + 1, puzzle.chainId),
  ]);

  const links = [
    {
      tooltipContent: 'Solution',
      href: puzzle.solution,
      icon: <FileCheck />,
      disabled: !puzzle.solution,
    },
    {
      tooltipContent: 'Source',
      href: `https://github.com/${puzzle.github}`,
      icon: <Github />,
      disabled: !puzzle.github,
    },
    {
      tooltipContent: 'Contract',
      href: `https://${getBlockExplorerDomain(puzzle.chainId)}/address/${puzzle.address}`,
      icon: <ExternalLink />,
      disabled: false,
    },
  ];

  return (
    <div className="flex flex-col justify-center gap-3 md:flex-row md:gap-0">
      <div className="flex items-center gap-4">
        <PuzzleHeaderPageNav prevPuzzle={prevPuzzle} nextPuzzle={nextPuzzle} />
        <div className="flex grow items-center justify-between md:gap-4">
          {[
            {
              name: `Puzzle #${puzzle.id}`,
              value: puzzle.name ?? `Puzzle ${puzzle.id}`,
            },
            {
              name: 'Author',
              value: (
                <div className="flex grow items-center gap-1">
                  <div className="h-4 w-4 rounded-full">
                    {puzzle.author.ensName ? (
                      <ENSAvatar size={16} name={puzzle.author.ensName} />
                    ) : (
                      <Avatar size={16} src="" alt={puzzle.author.address} />
                    )}
                  </div>
                  <AddressLink
                    className="max-w-[13rem] overflow-hidden text-ellipsis font-medium text-gray-50"
                    address={puzzle.author.address}
                    chainId={puzzle.chainId}
                  />
                </div>
              ),
            },
          ].map((item, index) => (
            <div
              className="flex flex-col items-center gap-1 first:items-start last:items-end md:items-start md:last:items-start"
              key={index}
            >
              <div className="text-sm leading-4 text-gray-150">{item.name}</div>
              <div className="max-w-[13rem] overflow-hidden text-ellipsis whitespace-nowrap font-medium leading-5 text-gray-50">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ButtonGroup className="ml-auto hidden md:flex">
        {links.map((item, index) => (
          <Tooltip content={item.tooltipContent} key={index} inPortal>
            <IconButton href={item.href} variant="outline" intent="neutral" size="lg" newTab>
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}
      </ButtonGroup>
      <ButtonGroup className="md:hidden">
        {links.map((item, index) => (
          <Button
            className="grow"
            key={index}
            href={item.href}
            variant="outline"
            intent="neutral"
            rightIcon={item.icon}
            newTab
          >
            {item.tooltipContent}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default PuzzleHeader;

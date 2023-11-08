import type { FC } from 'react';

import PuzzleHeaderPageNav from './page-nav';
import { ExternalLink, FileCheck, Github } from 'lucide-react';

import type { Puzzle } from '@/lib/types/protocol';
import { fetchPuzzleById, getBlockExplorerDomain } from '@/lib/utils';

import AddressLink from '@/components/templates/address-link';
import Avatar from '@/components/templates/avatar';
import ENSAvatar from '@/components/templates/ens-avatar';
import { IconButton, Tooltip } from '@/components/ui';

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
    fetchPuzzleById(puzzle.id - 1, 1), // TODO: incorporate `chainId`
    fetchPuzzleById(puzzle.id + 1, 1), // TODO: incorporate `chainId`
  ]);

  return (
    <div className="flex flex-col justify-center md:flex-row">
      <div className="flex items-center">
        <PuzzleHeaderPageNav prevPuzzle={prevPuzzle} nextPuzzle={nextPuzzle} />
        <div className="ml-4">
          <div className="text-sm font-book text-gray-150">Puzzle #{puzzle.id}</div>
          <div className="max-w-[13rem] overflow-hidden text-ellipsis whitespace-nowrap text-xl font-medium text-gray-50 md:text-2xl">
            {puzzle.name ?? `Puzzle ${puzzle.id}`}
          </div>
        </div>
        <hr
          className="mx-4 hidden h-full w-[1px] border-l border-stroke md:block"
          role="separator"
        />
      </div>
      <div className="flex grow items-end justify-between">
        <div>
          <div className="text-sm font-book text-gray-150">Author</div>
          <div className="flex grow items-center gap-2">
            <div className="h-[1.875rem] w-[1.875rem] rounded-full">
              {puzzle.author.ensName ? (
                <ENSAvatar size={30} name={puzzle.author.ensName} />
              ) : (
                <Avatar size={30} src="" alt={puzzle.author.address} />
              )}
            </div>
            <AddressLink
              className="max-w-[13rem] overflow-hidden text-ellipsis text-xl font-medium text-gray-50 md:text-2xl"
              address={puzzle.author.address}
              chainId={puzzle.chainId}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {puzzle.solution ? (
            <Tooltip content="Solution">
              <IconButton
                href={puzzle.solution}
                variant="outline"
                intent="neutral"
                size="lg"
                newTab
              >
                <FileCheck />
              </IconButton>
            </Tooltip>
          ) : null}
          {puzzle.github ? (
            <Tooltip content="Source">
              <IconButton
                href={`https://github.com/${puzzle.github}`}
                variant="outline"
                intent="neutral"
                size="lg"
                newTab
              >
                <Github />
              </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip content="Contract">
            <IconButton
              href={`https://${getBlockExplorerDomain(puzzle.chainId)}/address/${puzzle.address}`}
              variant="outline"
              intent="neutral"
              size="lg"
              newTab
            >
              <ExternalLink />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default PuzzleHeader;

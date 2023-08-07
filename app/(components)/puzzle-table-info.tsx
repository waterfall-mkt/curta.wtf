'use client';

import type { FC } from 'react';

import clsx from 'clsx';

import type { Author, Phase } from '@/lib/types/protocol';
import { getShortenedAddress } from '@/lib/utils';

import PhasePing from '@/components/templates/phase-tag/ping';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleTableInfoProps = {
  className?: string;
  id: number;
  phase: Phase;
  name: string;
  author: Author;
};

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

const PuzzleTableInfo: FC<PuzzleTableInfoProps> = ({ className, id, phase, name, author }) => {
  return (
    <div className={clsx('relative flex items-center space-x-4', className)}>
      <PhasePing phase={phase} isPinging={true} />
      <div>
        <div className="line-clamp-1 overflow-ellipsis text-left text-sm text-gray-100">
          {name ?? `Puzzle #${id}`}
        </div>
        <a
          className="mt-0.5 line-clamp-1 text-ellipsis text-xs text-gray-200 transition-colors hover:text-gray-100 hover:underline"
          href={`https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${author.address}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`View ${author.address} on ${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}`}
        >
          {author.ensName ?? getShortenedAddress(author.address)}
        </a>
      </div>
    </div>
  );
};

export default PuzzleTableInfo;

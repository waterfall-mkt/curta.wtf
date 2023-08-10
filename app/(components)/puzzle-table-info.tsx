'use client';

import type { FC } from 'react';

import PuzzleTableAddressLink from './puzzle-table-address-link';

import type { Author, Phase } from '@/lib/types/protocol';

import PhasePing from '@/components/templates/phase-tag/ping';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleTableInfoProps = {
  id: number;
  phase: Phase;
  name: string;
  author: Author;
};

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

const PuzzleTableInfo: FC<PuzzleTableInfoProps> = ({ id, phase, name, author }) => {
  return (
    <div className="relative flex items-center space-x-4">
      <PhasePing phase={phase} isPinging />
      <div>
        <div className="line-clamp-1 overflow-ellipsis text-left text-sm text-gray-100">
          {name ?? `Puzzle #${id}`}
        </div>
        <PuzzleTableAddressLink
          className="mt-0.5 text-xs"
          address={author.address}
          ensName={author.ensName}
        />
      </div>
    </div>
  );
};

export default PuzzleTableInfo;
'use client';

import type { FC } from 'react';

import type { Author, Phase } from '@/lib/types/protocol';

import AddressLinkClient from '@/components/templates/address-link-client';
import PhaseTagPing from '@/components/templates/phase-tag/ping';
import UserHoverCard from '@/components/templates/user-hover-card';

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
// Component
// -----------------------------------------------------------------------------

const PuzzleTableInfo: FC<PuzzleTableInfoProps> = ({ id, phase, name, author }) => {
  return (
    <div className="relative flex items-center space-x-4">
      <PhaseTagPing phase={phase} isPinging={phase < 3} />
      <div>
        <div className="line-clamp-1 overflow-ellipsis text-left text-sm text-gray-100">
          {name ?? `Puzzle #${id}`}
        </div>
        <UserHoverCard
          address={author.address}
          trigger={
            <AddressLinkClient
              className="mt-0.5 text-xs"
              address={author.address}
              prefetchedEnsName={author.ensName}
            />
          }
        />
      </div>
    </div>
  );
};

export default PuzzleTableInfo;

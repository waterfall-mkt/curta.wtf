'use client';

import type { UserInfo } from '@prisma/client';

import type { Phase } from '@/lib/types/protocol';

import AddressLinkClient from '@/components/templates/address-link-client';
import PhaseTagPing from '@/components/templates/phase-tag/ping';
import UserHoverCard from '@/components/templates/user-hover-card';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleDataTableInfoProps = {
  id: number;
  phase: Phase;
  name: string;
  user?: UserInfo;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleDataTableInfo: React.FC<PuzzleDataTableInfoProps> = ({ id, phase, name, user }) => {
  return (
    <div className="relative flex items-center space-x-4">
      <PhaseTagPing phase={phase} isPinging={phase < 3} />
      <div>
        <div className="line-clamp-1 overflow-ellipsis text-left text-sm text-gray-100">
          {name ?? `Puzzle #${id}`}
        </div>
        {user ? (
          <UserHoverCard
            address={user.address as `0x${string}`}
            trigger={
              <AddressLinkClient
                className="mt-0.5 text-xs"
                address={user.address as `0x${string}`}
                label={user.displayName ?? undefined}
              />
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default PuzzleDataTableInfo;

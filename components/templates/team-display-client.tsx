'use client';

import type { FC } from 'react';

import type { Team } from '@/lib/types/protocol';

import Avatar from '@/components/templates/avatar';
import ENSAvatarClient from '@/components/templates/ens-avatar-client';
import UserHoverCard from '@/components/templates/user-hover-card';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type TeamDisplayClientProps = {
  team: Team;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const TeamDisplayClient: FC<TeamDisplayClientProps> = ({ team }) => {
  return (
    <div className="flex items-center gap-3.5">
      <div className="overflow-hidden rounded-full">
        <Avatar src={team.avatar ?? ''} alt={`Team #${team.id}`} size={40} />
      </div>
      <div>
        <div className="flex items-center gap-1.5 text-sm text-gray-100">
          <span>{team.name ?? `Team #${team.id}`}</span>
          <div className="flex -space-x-1">
            {team.members.slice(0, 3).map((member, index) => (
              <UserHoverCard
                key={index}
                address={member.address}
                trigger={
                  <div className="z-[1] rounded-full ring-2 ring-gray-700 transition-transform hover:z-[5] hover:scale-110">
                    <ENSAvatarClient nameOrAddress={member.address} size={12} />
                  </div>
                }
              />
            ))}
            {team.members.length > 3 ? (
              <div className="z-[4] flex h-3 w-3 items-center justify-center rounded-full bg-gray-450 text-[6px] ring-2 ring-gray-700">
                {team.members.length - 3}
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-xs text-gray-200">{team.members.length} members</div>
      </div>
    </div>
  );
};

export default TeamDisplayClient;

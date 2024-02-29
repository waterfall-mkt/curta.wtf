'use client';

import type { KeyboardEventHandler } from 'react';

import type { UserInfo } from '@prisma/client';

import { getChainInfo } from '@/lib/utils';

import UserAvatar from '@/components/templates/user-avatar';
import UserHoverCard from '@/components/templates/user-hover-card';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type AuthorFacepileAvatarProps = {
  user: UserInfo;
  index: number;
  ensAvatar?: string;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AuthorFacepileAvatar: React.FC<AuthorFacepileAvatarProps> = ({ user, index, ensAvatar }) => {
  const href = user.twitter
    ? `https://twitter.com/${user.twitter}`
    : `https://${getChainInfo(1).blockExplorer}/address/${user.address}`;

  const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`author-avatar-${index - 1}`)?.focus();
    }
    if (e.key === 'ArrowRight') {
      document.getElementById(`author-avatar-${index + 1}`)?.focus();
    }
  };

  const image = user.image ?? ensAvatar;

  return (
    <UserHoverCard
      address={user.address as `0x${string}`}
      trigger={
        <button
          id={`author-avatar-${index}`}
          className="group rounded-full transition-transform focus-visible:z-[10] focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250"
          onClick={() => window.open(href, '_blank')}
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label={`View ${user.address}'s X or address.`}
        >
          <UserAvatar
            className="relative h-[52px] w-[52px] rounded-full bg-gray-600 outline-none ring-[3px] ring-gray-600 transition-transform hover:z-[10] hover:scale-110 hover:ring-0 group-focus-visible:scale-100 group-focus-visible:ring-0"
            image={image}
            size={52}
            name={user.address}
          />
        </button>
      }
      triggerAsChild
    />
  );
};

export default AuthorFacepileAvatar;

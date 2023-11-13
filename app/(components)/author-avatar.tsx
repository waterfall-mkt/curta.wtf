'use client';

import type { FC, KeyboardEventHandler, ReactNode } from 'react';

import type { Author } from '@/lib/types/protocol';
import { getChainInfo } from '@/lib/utils';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type AuthorAvatarProps = {
  author: Author;
  index: number;
  children: ReactNode;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AuthorAvatar: FC<AuthorAvatarProps> = ({ author, index, children }) => {
  const href = author.twitter
    ? `https://twitter.com/${author.twitter}`
    : `https://${getChainInfo(1).blockExplorer}/address/${author.address}`;

  const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`author-avatar-${index - 1}`)?.focus();
    }
    if (e.key === 'ArrowRight') {
      document.getElementById(`author-avatar-${index + 1}`)?.focus();
    }
  };

  return (
    <button
      id={`author-avatar-${index}`}
      className="group rounded-full transition-transform focus-visible:z-[10] focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250"
      title={href}
      onClick={() => window.open(href, '_blank')}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label={`View author ${author.address}'s Twitter or address.`}
    >
      <div className="relative h-[52px] w-[52px] rounded-full bg-gray-600 outline-none ring-[3px] ring-gray-600 transition-transform hover:z-[10] hover:scale-110 hover:ring-0 group-focus-visible:scale-100 group-focus-visible:ring-0">
        {children}
      </div>
    </button>
  );
};

AuthorAvatar.displayName = 'AuthorAvatar';

export default AuthorAvatar;

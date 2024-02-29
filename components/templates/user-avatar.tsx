'use client';

import BoringAvatar from 'boring-avatars';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Avatar } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type UserAvatarProps = {
  className?: string;
  image?: string | null;
  name?: string | null;
  size?: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const UserAvatar: React.FC<UserAvatarProps> = ({ className, image, name, size = 40 }) => {
  return image ? (
    <Avatar.Root className={className} size={size}>
      <Avatar.Image src={image} />
      <Avatar.Fallback>{name ?? 'User avatar'}</Avatar.Fallback>
    </Avatar.Root>
  ) : (
    <div
      className={twMerge(
        clsx('overflow-hidden rounded-full border border-stroke bg-gray-400', className),
      )}
      style={{ width: size, height: size, minWidth: size }}
    >
      <BoringAvatar size={size} name={name ?? 'User avatar'} variant="beam" />
    </div>
  );
};

export default UserAvatar;

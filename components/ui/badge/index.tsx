import type { FC } from 'react';

import { badgeVariants } from './styles';
import type { BadgeProps } from './types';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const Badge: FC<BadgeProps> = ({
  className,
  size = 'md',
  variant = 'primary',
  intent = 'neutral',
  type = 'text',
  children,
  ...rest
}) => {
  return (
    <span
      className={twMerge(cx(badgeVariants({ size, variant, intent, type }), className))}
      data-size={size}
      data-variant={variant}
      {...rest}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;

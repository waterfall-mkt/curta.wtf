import { badgeVariants } from './styles';
import type { BadgeProps } from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Badge: React.FC<BadgeProps> = ({
  className,
  size = 'md',
  variant = 'primary',
  intent = 'neutral',
  type = 'text',
  ...rest
}) => (
  <span
    className={twMerge(clsx(badgeVariants({ size, variant, intent, type }), className))}
    data-size={size}
    data-variant={variant}
    {...rest}
  />
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Badge.displayName = 'Badge';

export default Badge;

'use client';

import { type ForwardedRef, forwardRef, Fragment } from 'react';

import { popoverArrowStyles, popoverStyles } from './styles';
import type { PopoverProps } from './types';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Popover = forwardRef(
  (
    {
      className,
      sideOffset = 4,
      hasArrow = true,
      trigger,
      triggerProps = { asChild: true },
      open,
      inPortal = false,
      onOpenChange,
      children,
      ...rest
    }: PopoverProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const ContentParent = inPortal ? PopoverPrimitive.Portal : Fragment;

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <PopoverPrimitive.Trigger onClick={(e) => e.stopPropagation()} {...triggerProps}>
          {trigger}
        </PopoverPrimitive.Trigger>
        <ContentParent>
          <PopoverPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={twMerge(clsx(popoverStyles, className))}
            {...rest}
          >
            {children}
            {hasArrow ? (
              <PopoverPrimitive.Arrow className={clsx(popoverArrowStyles)} width={8} height={4} />
            ) : null}
          </PopoverPrimitive.Content>
        </ContentParent>
      </PopoverPrimitive.Root>
    );
  },
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Popover.displayName = 'Popover';

export default Popover;

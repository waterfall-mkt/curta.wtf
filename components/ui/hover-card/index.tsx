'use client';

import { forwardRef, Fragment } from 'react';

import { hoverCardArrowStyles, hoverCardStyles } from './styles';
import type { HoverCardProps } from './types';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const HoverCard = forwardRef(
  (
    {
      className,
      openDelay = 500,
      closeDelay = 300,
      sideOffset = 4,
      hasArrow = false,
      trigger,
      triggerProps = { asChild: true },
      inPortal = false,
      children,
      ...rest
    }: HoverCardProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const ContentParent = inPortal ? HoverCardPrimitive.Portal : Fragment;

    return (
      <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay}>
        <HoverCardPrimitive.Trigger {...triggerProps}>{trigger}</HoverCardPrimitive.Trigger>
        <ContentParent>
          <HoverCardPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={twMerge(clsx(hoverCardStyles, className))}
            {...rest}
          >
            {hasArrow ? (
              <HoverCardPrimitive.Arrow
                className={clsx(hoverCardArrowStyles)}
                width={8}
                height={4}
              />
            ) : null}
            {children}
          </HoverCardPrimitive.Content>
        </ContentParent>
      </HoverCardPrimitive.Root>
    );
  },
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

HoverCard.displayName = HoverCardPrimitive.Content.displayName;

export default HoverCard;

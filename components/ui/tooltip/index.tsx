'use client';

import { type ForwardedRef, forwardRef, Fragment } from 'react';

import { tooltipArrowStyles, tooltipStyles } from './styles';
import type { TooltipProps } from './types';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Tooltip = forwardRef(
  (
    {
      className,
      content,
      sideOffset = 4,
      triggerProps = { asChild: true },
      hasArrow = true,
      noDelay = false,
      inPortal = false,
      children,
      ...rest
    }: TooltipProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const ContentParent = inPortal ? RadixTooltip.Portal : Fragment;

    return (
      <RadixTooltip.Provider delayDuration={noDelay ? 0 : 500}>
        <RadixTooltip.Root>
          <RadixTooltip.Trigger onClick={(e) => e.stopPropagation()} {...triggerProps}>
            {children}
          </RadixTooltip.Trigger>
          <ContentParent>
            <RadixTooltip.Content
              ref={ref}
              className={twMerge(clsx(tooltipStyles, className))}
              sideOffset={sideOffset}
              {...rest}
            >
              {hasArrow ? (
                <RadixTooltip.Arrow className={clsx(tooltipArrowStyles)} width={8} height={4} />
              ) : null}
              {content}
            </RadixTooltip.Content>
          </ContentParent>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    );
  },
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Tooltip.displayName = 'Tooltip';

export default Tooltip;

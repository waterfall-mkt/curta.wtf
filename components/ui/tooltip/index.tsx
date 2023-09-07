'use client';

import { type ForwardedRef, forwardRef } from 'react';

import { tooltipArrowStyles, tooltipStyles } from './styles';
import type { TooltipProps } from './types';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const Tooltip = forwardRef(
  (
    {
      className,
      sideOffset = 4,
      content,
      hasArrow = true,
      noDelay = false,
      children,
      ...rest
    }: TooltipProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <RadixTooltip.Provider delayDuration={noDelay ? 0 : 500}>
        <RadixTooltip.Root>
          <RadixTooltip.Trigger onClick={(e) => e.preventDefault()} asChild>
            {children}
          </RadixTooltip.Trigger>
          <RadixTooltip.Content
            ref={ref}
            className={twMerge(cx(tooltipStyles, className))}
            sideOffset={sideOffset}
            {...rest}
          >
            {hasArrow ? (
              <RadixTooltip.Arrow className={tooltipArrowStyles} width={8} height={4} />
            ) : null}
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;

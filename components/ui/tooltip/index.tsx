'use client';

import { type ForwardedRef, forwardRef } from 'react';

import { tooltipArrowStyles, tooltipStyles } from './styles';
import type { TooltipProps } from './types';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const Tooltip = forwardRef(
  (
    { className, content, triggerAsChild = false, hasArrow = true, children }: TooltipProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <RadixTooltip.Provider delayDuration={250}>
        <RadixTooltip.Root>
          <RadixTooltip.Trigger onClick={(e) => e.preventDefault()} asChild={triggerAsChild}>
            {children}
          </RadixTooltip.Trigger>
          <RadixTooltip.Portal>
            <RadixTooltip.Content className={twMerge(cx(tooltipStyles, className))} ref={ref}>
              {content}
              {hasArrow ? <RadixTooltip.Arrow className={tooltipArrowStyles} /> : null}
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;

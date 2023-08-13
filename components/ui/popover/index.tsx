'use client';

import { type ForwardedRef, forwardRef } from 'react';

import { popoverArrowStyles, popoverStyles } from './styles';
import type { PopoverProps } from './types';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Popover = forwardRef(
  (
    {
      className,
      sideOffset = 4,
      hasArrow = true,
      trigger,
      open,
      onOpenChange,
      children,
      ...rest
    }: PopoverProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={twMerge(clsx(popoverStyles, className))}
        {...rest}
      >
        {hasArrow ? (
          <PopoverPrimitive.Arrow className={popoverArrowStyles} width={8} height={4} />
        ) : null}
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  ),
);

Popover.displayName = 'Popover';

export default Popover;

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export type TooltipProps = Omit<
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  'asChild'
> & {
  content: ReactNode;
  triggerProps?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>;
  hasArrow?: boolean;
  noDelay?: boolean;
  inPortal?: boolean;
};

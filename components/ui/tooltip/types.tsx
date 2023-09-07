import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export type TooltipProps = Omit<
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  'asChild'
> & {
  content: ReactNode;
  hasArrow?: boolean;
  noDelay?: boolean;
};

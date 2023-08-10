import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export type TooltipProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  content: ReactNode;
  hasArrow?: boolean;
  noDelay?: boolean;
};

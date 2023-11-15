import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type HoverCardProps = ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
  trigger: ReactNode;
  openDelay?: number;
  closeDelay?: number;
  hasArrow?: boolean;
};

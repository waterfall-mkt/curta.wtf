import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';

export type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  trigger: ReactNode;
  triggerProps?: ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;
  hasArrow?: boolean;
  open?: boolean;
  inPortal?: boolean;
  onOpenChange?: (open: boolean) => void;
};

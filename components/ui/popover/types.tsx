import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';

export type PopoverProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  trigger: ReactNode;
  hasArrow?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

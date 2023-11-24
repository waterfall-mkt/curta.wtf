import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

export type TabsRootProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

export type TabsTriggerProps =
  | (Omit<ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'asChild'> & {
      asChild?: false;
    } & {
      icon?: ReactNode;
      stat?: number;
    })
  | (Omit<ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'asChild'> & { asChild: true });

// ---------------------------------------–-------------------------------------
// Composition
// ---------------------------------------–-------------------------------------

export type TabsComposition = {
  Content: FC<TabsContentProps>;
  List: FC<TabsListProps>;
  Root: FC<TabsRootProps>;
  Trigger: FC<TabsTriggerProps>;
};

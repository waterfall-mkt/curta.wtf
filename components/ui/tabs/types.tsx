import type { ComponentPropsWithoutRef, FC } from 'react';

import { tabsTriggerVariants } from './styles';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { VariantProps } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

type TabsTriggerVariantProps = VariantProps<typeof tabsTriggerVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

export type TabsRootProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
  TabsTriggerVariantProps;

// ---------------------------------------–-------------------------------------
// Composition
// ---------------------------------------–-------------------------------------

export type TabsComposition = {
  Content: FC<TabsContentProps>;
  List: FC<TabsListProps>;
  Root: FC<TabsRootProps>;
  Trigger: FC<TabsTriggerProps>;
};

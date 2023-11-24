'use client';

import { type FC, type ForwardedRef, forwardRef } from 'react';

import { tabsContentStyles, tabsListStyles, tabsTriggerVariants } from './styles';
import type {
  TabsComposition,
  TabsContentProps,
  TabsListProps,
  TabsRootProps,
  TabsTriggerProps,
} from './types';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const TabsContent = forwardRef(
  ({ className, ...rest }: TabsContentProps, ref: ForwardedRef<HTMLDivElement>) => (
    <TabsPrimitive.Content
      className={twMerge(clsx(tabsContentStyles, className))}
      {...rest}
      ref={ref}
    />
  ),
);

const TabsList = forwardRef(
  ({ className, ...rest }: TabsListProps, ref: ForwardedRef<HTMLDivElement>) => (
    <TabsPrimitive.List className={twMerge(clsx(tabsListStyles, className))} {...rest} ref={ref} />
  ),
);

const TabsRoot: FC<TabsRootProps> = TabsPrimitive.Root;

const TabsTrigger = forwardRef(
  ({ className, asChild, ...rest }: TabsTriggerProps, ref: ForwardedRef<HTMLButtonElement>) => (
    <TabsPrimitive.Trigger
      className={twMerge(clsx(!asChild ? tabsTriggerVariants() : '', className))}
      ref={ref}
      asChild={asChild}
      {...rest}
    />
  ),
);

TabsContent.displayName = TabsPrimitive.Content.displayName;
TabsList.displayName = TabsPrimitive.List.displayName;
TabsRoot.displayName = TabsPrimitive.Root.displayName;
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const Tabs: TabsComposition = {
  Content: TabsContent,
  List: TabsList,
  Root: TabsRoot,
  Trigger: TabsTrigger,
};

export default Tabs;

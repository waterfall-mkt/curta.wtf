'use client';

import Link from 'next/link';
import { type FC, type ForwardedRef, forwardRef } from 'react';

import {
  tabsContentStyles,
  tabsListStyles,
  tabsTriggerIconStyles,
  tabsTriggerStatStyles,
  tabsTriggerStyles,
} from './styles';
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

import { Badge } from '@/components/ui';

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

const TabsTrigger = forwardRef((props: TabsTriggerProps, ref: ForwardedRef<HTMLButtonElement>) => {
  // Return early if `asChild` is used, so features/props native to this
  // component do not get passed down to the `TabsPrimitive.Trigger` component.
  if (props.asChild) return <TabsPrimitive.Trigger {...props} />;

  // Destructure props. `asChild` is false-y here, but we destructure it out
  // because we don't want to pass it in if the trigger has an `href` prop.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, icon, stat, href, newTab, children, asChild, ...rest } = props;

  if (href) {
    return (
      <TabsPrimitive.Trigger
        className={twMerge(clsx(tabsTriggerStyles, className))}
        ref={ref}
        asChild={true}
        {...rest}
      >
        <Link href={href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {icon ? <span className={tabsTriggerIconStyles}>{icon}</span> : null}
          <span>{children}</span>
          {stat !== undefined ? (
            <Badge
              className={clsx(tabsTriggerStatStyles)}
              size="sm"
              variant="secondary"
              intent="neutral"
              type="number"
            >
              {stat}
            </Badge>
          ) : null}
        </Link>
      </TabsPrimitive.Trigger>
    );
  }

  return (
    <TabsPrimitive.Trigger
      className={twMerge(clsx(tabsTriggerStyles, className))}
      ref={ref}
      {...rest}
    >
      {icon ? <span className={tabsTriggerIconStyles}>{icon}</span> : null}
      <span>{children}</span>
      {stat !== undefined ? (
        <Badge
          className={clsx(tabsTriggerStatStyles)}
          size="sm"
          variant="secondary"
          intent="neutral"
          type="number"
        >
          {stat}
        </Badge>
      ) : null}
    </TabsPrimitive.Trigger>
  );
});

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

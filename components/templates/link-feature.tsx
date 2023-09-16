import Link from 'next/link';
import type { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LinkFeatureProps = {
  className?: string;
  icon: ReactNode;
  href: string;
  name: string;
  description?: string;
  children?: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LinkFeature: FC<LinkFeatureProps> = (props) => {
  const description = props.description;

  // Display tooltip if description is too long.
  if (description !== undefined && description.length >= 36) {
    return (
      <Tooltip content={description}>
        <LinkFeatureInternal {...props} />
      </Tooltip>
    );
  }

  return <LinkFeatureInternal {...props} />;
};

const LinkFeatureInternal: FC<LinkFeatureProps> = ({
  className,
  icon,
  href,
  name,
  description,
  children,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          'flex w-full flex-col gap-2 rounded-xl border border-stroke bg-gray-600 px-4 no-underline transition-colors hover:border-gray-250',
          children !== undefined ? 'row-span-3 h-[15.5rem] pb-4' : 'row-span-1 h-[4.5rem]',
          className,
        ),
      )}
      target={href.startsWith('/') ? undefined : '_blank'}
      rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}
    >
      <div className="flex h-[4.5rem] items-center gap-4">
        <div className="relative flex h-10 w-10 items-center justify-center rounded border border-stroke bg-gray-450 p-2 text-gray-200">
          <span className="h-6 w-6">{icon}</span>
          {!href.startsWith('/') ? (
            <div className="absolute -right-2 -top-2 rounded-full border border-stroke bg-gray-450 p-0.5 ring-1 ring-gray-600">
              <ArrowUpRight className="h-3 w-3 text-gray-200" />
            </div>
          ) : null}
        </div>
        <div>
          <div className="line-clamp-1 flex font-medium leading-5 text-gray-100">{name}</div>
          {description ? (
            <div className="mt-1 line-clamp-1 text-sm font-normal leading-4 text-gray-200">
              {description}
            </div>
          ) : null}
        </div>
      </div>
      {children !== undefined ? (
        <div className="relative h-[9.5rem] grow overflow-hidden rounded-md border border-stroke bg-gray-450">
          {children}
        </div>
      ) : null}
    </Link>
  );
};

export default LinkFeature;

import Link from 'next/link';
import type { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LinkFeatureProps = {
  className?: string;
  icon: ReactNode;
  href: string;
  name: string;
  description?: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LinkFeature: FC<LinkFeatureProps> = ({ className, icon, href, name, description }) => {
  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          'flex h-[4.5rem] w-full items-center gap-4 rounded-xl border border-stroke bg-gray-600 px-4 no-underline transition-colors hover:border-gray-250',
          className,
        ),
      )}
      target={href.startsWith('/') ? undefined : '_blank'}
      rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded border border-stroke bg-gray-450 p-2 text-gray-200">
        <span className="h-6 w-6">{icon}</span>
        {!href.startsWith('/') ? (
          <div className="absolute -right-2 -top-2 rounded-full border border-stroke bg-gray-450 p-0.5">
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
    </Link>
  );
};

export default LinkFeature;

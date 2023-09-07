import type { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type ContainerLayoutProps = {
  className?: string;
  children: ReactNode;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const ContainerLayout: FC<ContainerLayoutProps> = ({ className, children }) => (
  <div
    className={twMerge(
      clsx(
        'relative mx-auto flex w-full max-w-[90rem] grow flex-col px-4 pb-6 pt-4 lg:px-20 lg:pb-16 lg:pt-12',
        className,
      ),
    )}
  >
    {children}
  </div>
);

export default ContainerLayout;

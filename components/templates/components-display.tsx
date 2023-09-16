import type { FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const ComponentsDisplay: FC<JSX.IntrinsicElements['div']> = ({ className, children, ...rest }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'grid w-full items-center justify-evenly gap-4 rounded-3xl border border-stroke bg-gray-450 py-12',
          className,
        ),
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ComponentsDisplay;

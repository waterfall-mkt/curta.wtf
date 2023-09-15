import type { FC } from 'react';

import { calloutVariants } from './styles';
import type { CalloutProps } from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Callout: FC<CalloutProps> = ({ className, intent = 'primary', children }) => {
  return <div className={twMerge(clsx(calloutVariants({ intent }), className))}>{children}</div>;
};

export default Callout;

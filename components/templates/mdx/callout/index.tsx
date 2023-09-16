import type { FC } from 'react';

import { calloutIconVariants, calloutVariants } from './styles';
import type { CalloutProps } from './types';
import clsx from 'clsx';
import { AlertCircle, CheckCircle2, Info, Lightbulb, XCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Callout: FC<CalloutProps> = ({ className, intent = 'primary', icon, children }) => {
  const Icon = icon
    ? icon
    : intent === 'primary'
    ? Info
    : intent === 'success'
    ? CheckCircle2
    : intent === 'fail'
    ? XCircle
    : intent === 'warning'
    ? AlertCircle
    : Lightbulb;

  return (
    <div className={twMerge(clsx(calloutVariants({ intent }), className))}>
      <span className="pt-1">
        <Icon className={calloutIconVariants({ intent })} />
      </span>
      {children}
    </div>
  );
};

export default Callout;

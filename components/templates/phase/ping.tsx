import type { FC } from 'react';

import clsx from 'clsx';

import type { Phase } from '@/lib/types/protocol';

/* Props */
type PhasePingProps = {
  className?: string;
  phase: Phase;
  isPinging: boolean;
};

/* Component */
const PhasePing: FC<PhasePingProps> = ({ className, phase, isPinging }) => {
  const PHASE_TO_COLOR = ['bg-tw-green', 'bg-tw-yellow', 'bg-tw-orange', 'bg-tw-red'];

  return (
    <div className="flex h-2 w-2 items-center justify-center">
      <div className={clsx('absolute flex h-3 w-3 items-center justify-center', className)}>
        <div
          className={clsx(
            'absolute inline-flex h-full w-full rounded-full opacity-75',
            PHASE_TO_COLOR[phase],
            isPinging ? 'animate-ping-slow' : 'hidden',
          )}
        ></div>
        <div className={clsx('relative inline-flex h-2 w-2 rounded-full', PHASE_TO_COLOR[phase])} />
      </div>
    </div>
  );
};

PhasePing.displayName = 'PhasePing';

export default PhasePing;

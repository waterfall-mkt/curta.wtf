import type { FC } from 'react';

import PhasePing from './ping';
import clsx from 'clsx';

import type { Phase } from '@/lib/types/protocol';

/* Props */
export type PhaseTagProps = {
  className?: string;
  phase: Phase;
  isPinging?: boolean;
};

/* Component */
const PhaseTag: FC<PhaseTagProps> = ({ className, phase, isPinging = true }) => {
  return (
    <div
      className={clsx(
        'relative flex w-fit items-center space-x-2 rounded-lg bg-white/10 px-3 py-1 backdrop-blur',
        className,
      )}
    >
      <PhasePing phase={phase} isPinging={isPinging} />
      <div className="text-gray-50">Phase {phase}</div>
    </div>
  );
};

PhaseTag.displayName = 'PhaseTag;';

export default PhaseTag;

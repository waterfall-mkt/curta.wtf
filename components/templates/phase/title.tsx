import type { FC } from 'react';

import PhasePing from './ping';
import type { PhaseTagProps } from './tag';
import clsx from 'clsx';

const PhaseTitle: FC<PhaseTagProps> = ({ className, phase, isPinging = true }) => {
  return (
    <div className={clsx('pointer-events-none flex h-8 w-fit items-center space-x-2', className)}>
      <PhasePing phase={phase} isPinging={isPinging} />
      <div className="whitespace-nowrap text-gray-100">Phase {phase}</div>
    </div>
  );
};

PhaseTitle.displayName = 'PhaseTitle';

export default PhaseTitle;

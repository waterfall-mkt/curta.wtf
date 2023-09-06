import type { FC } from 'react';

import type { PhaseTagProps } from '.';
import clsx from 'clsx';

const PhaseTagPing: FC<PhaseTagProps & JSX.IntrinsicElements['div']> = ({
  phase,
  title = `Phase ${phase}`,
  isPinging = true,
  ...rest
}) => {
  const PHASE_TO_COLOR = ['bg-tw-green', 'bg-tw-yellow', 'bg-tw-orange', 'bg-tw-red'];

  return (
    <div className="flex h-2 w-2 items-center justify-center" title={title} {...rest}>
      <div className="absolute flex h-3 w-3 items-center justify-center">
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

PhaseTagPing.displayName = 'PhaseTagPing';

export default PhaseTagPing;

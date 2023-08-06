import type { FC } from 'react';

import PhasePing from './ping';

import { GLOSSARY } from '@/lib/constants/glossary';
import type { Phase } from '@/lib/types/protocol';

import { Tooltip } from '@/components/ui';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

export type PhaseTagProps = {
  phase: Phase;
  isPinging?: boolean;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const PhaseTag: FC<PhaseTagProps> = ({ phase, isPinging = true }) => {
  return (
    <Tooltip content={GLOSSARY[`PHASE_${phase}` satisfies keyof typeof GLOSSARY]}>
      <div className="relative flex w-fit items-center space-x-2 rounded-lg bg-white/10 px-3 py-1 backdrop-blur">
        <PhasePing phase={phase} isPinging={isPinging} />
        <div className="text-gray-50">Phase {phase}</div>
      </div>
    </Tooltip>
  );
};

PhaseTag.displayName = 'PhaseTag';

export default PhaseTag;

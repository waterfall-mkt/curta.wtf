import type { FC } from 'react';

import PhaseTagPing from './ping';

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
      <button className="relative flex w-fit items-center space-x-2 rounded-lg bg-white/10 px-3 py-1 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-250">
        <PhaseTagPing phase={phase} isPinging={isPinging} />
        <div className="text-gray-50">Phase {phase}</div>
      </button>
    </Tooltip>
  );
};

PhaseTag.displayName = 'PhaseTag';

export default PhaseTag;

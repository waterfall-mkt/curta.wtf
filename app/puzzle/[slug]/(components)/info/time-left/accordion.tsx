'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRight } from 'lucide-react';

import type { Phase } from '@/lib/types/protocol';

import PhaseTagPing from '@/components/templates/phase-tag/ping';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoTimeLeftAccordionProps = {
  phase: Phase;
  children: React.ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoTimeLeftAccordion: React.FC<PuzzleInfoTimeLeftAccordionProps> = ({
  phase,
  children,
}) => {
  const text =
    phase === 0
      ? 'Puzzle added'
      : phase === 1
      ? 'First blood'
      : phase === 2
      ? 'Solutions revealed'
      : 'Submissions closed';

  return (
    <Accordion.Root
      className="w-full"
      type="single"
      // Open by default if the puzzle hasn't ended yet.
      defaultValue={phase < 3 ? 'timeline' : undefined}
      collapsible
    >
      <Accordion.Item value="timeline" className="w-full">
        <Accordion.Trigger className="group z-10 flex h-9 w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-600 px-3 text-sm font-medium text-gray-150 transition-colors hover:border-gray-250 hover:text-gray-100 focus:outline-none focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-blue-250 active:bg-gray-450 data-[state='open']:rounded-b-none data-[state='open']:text-gray-100 data-[state='open']:focus-visible:rounded-b-sm">
          <div className="flex items-center space-x-2.5">
            <PhaseTagPing phase={phase} isPinging={phase < 3} />
            <span>{text}</span>
          </div>
          <ChevronRight className="h-4 w-4 transition-transform group-data-[state='open']:rotate-90" />
        </Accordion.Trigger>
        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {children}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default PuzzleInfoTimeLeftAccordion;

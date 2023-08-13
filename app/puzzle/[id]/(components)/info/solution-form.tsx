'use client';

import { type FC, useState } from 'react';

import { Button, Input, Popover } from '@/components/ui';

const PuzzleInfoSolutionForm: FC = () => {
  const [solution, setSolution] = useState<string>('');

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="flex w-full flex-col">
        <Input
          className="w-full rounded-b-none"
          label="Solution (button activates if correct)"
          placeholder="0x"
          inputMode="numeric"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          errorMessage=""
          rightIcon={
            <Button size="sm" variant="tertiary" intent="neutral">
              0.02 ETH
            </Button>
          }
        />
        <div className="w-full rounded-b-md border-x border-b border-stroke">options</div>
      </div>
      <Popover
        trigger={
          <Button className="w-full" size="lg">
            Open popover
          </Button>
        }
        hasArrow
      >
        Popover content
      </Popover>
    </div>
  );
};

export default PuzzleInfoSolutionForm;

'use client';

import { type FC, useState } from 'react';

import { Button, Input, Popover } from '@/components/ui';

const PuzzleInfoSolutionForm: FC = () => {
  const [solution, setSolution] = useState<string>('');

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="flex w-full flex-col">
        <Input
          label="Solution (button activates if correct)"
          placeholder="0x"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          errorMessage=""
          className="w-full rounded-b-none"
        />
      </div>
      <Popover trigger={<Button>Open popover</Button>} hasArrow>
        Popover content
      </Popover>
    </div>
  );
};

export default PuzzleInfoSolutionForm;

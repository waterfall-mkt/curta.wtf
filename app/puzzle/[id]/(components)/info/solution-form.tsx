'use client';

import type { FC } from 'react';

import { useToast } from '@/components/ui';
import { Button } from '@/components/ui';

const PuzzleInfoSolutionForm: FC = () => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col items-center p-4">
      <Button
        onClick={() =>
          toast({
            title: 'Toast',
            description: 'This is a toast',
            intent: 'success',
            duration: 5000,
          })
        }
      >
        Toast
      </Button>
    </div>
  );
};

export default PuzzleInfoSolutionForm;

import { useState } from 'react';

import type { UserInfo } from '@prisma/client';

import type { Phase } from '@/lib/types/protocol';

import AddressLinkClient from '@/components/templates/address-link-client';
import { Button, Input } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoSolutionFormTipFormProps = {
  phase: Phase;
  author: UserInfo;
  onChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoSolutionFormTipForm: React.FC<PuzzleInfoSolutionFormTipFormProps> = ({
  phase,
  author,
  onChange,
  onOpenChange,
}) => {
  const [value, setValue] = useState<string>('0');

  const isValidValue = (value: string) => {
    return Boolean(value) && Number(value) >= (phase > 1 ? 0.02 : 0);
  };

  return (
    <div className="flex flex-col">
      <div className="font-medium text-gray-100">Tip author</div>
      <span className="mt-1 text-sm font-normal text-gray-200">
        Show your support by tipping.{' '}
        <span className="text-gray-100">
          {phase > 1
            ? isValidValue(value)
              ? `${Math.round((Number(value) - 0.01) * 1000) / 1000} ETH`
              : ''
            : '100%'}
        </span>
        {phase > 1 && !isValidValue(value) ? ' W' : ' w'}
        ill be transferred to{' '}
        <AddressLinkClient
          className="rounded-sm font-medium text-gray-100 no-underline hover:underline"
          address={author.address as `0x${string}`}
        />
        .
      </span>

      <form className="mt-3">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          inputMode="decimal"
          type="number"
          min={phase > 1 ? 0.02 : 0}
          step={0.000000000000000001}
          placeholder={phase > 1 ? '0.02 or higher' : '0.01'}
          errorMessage=""
          isCurrency
        />

        <div className="mt-2 flex gap-2">
          <Button
            className="w-full"
            variant="outline"
            intent="neutral"
            type="button"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              if (isValidValue(value)) {
                onChange(value);
                onOpenChange(false);
              }
            }}
            type="submit"
            disabled={!isValidValue(value)}
          >
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PuzzleInfoSolutionFormTipForm;

import { type FC, useState } from 'react';

import type { Phase, User } from '@/lib/types/protocol';
import { getBlockExplorerDomain, getShortenedAddress } from '@/lib/utils';

import { Button, Input } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoSolutionFormTipFormProps = {
  phase: Phase;
  author: User;
  chainId: number;
  onChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoSolutionFormTipForm: FC<PuzzleInfoSolutionFormTipFormProps> = ({
  phase,
  author,
  chainId,
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
        <a
          className="font-medium text-gray-100 no-underline hover:underline"
          href={`https://${getBlockExplorerDomain(chainId)}/address/${author.address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {author.ensName ?? getShortenedAddress(author.address)}
        </a>
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

import { useId, useState } from 'react';

import InfoTooltip from '@/components/templates/info-tooltip';
import { Button, Input, Switch } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoSolutionFormOptionsFormProps = {
  simulateTx: boolean;
  setGasLimit: React.Dispatch<React.SetStateAction<string>>;
  setSimulateTx: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChange: (open: boolean) => void;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoSolutionFormOptionsForm: React.FC<PuzzleInfoSolutionFormOptionsFormProps> = ({
  simulateTx,
  setGasLimit,
  setSimulateTx,
  onOpenChange,
}) => {
  const [value, setValue] = useState<string>('');
  const [localSimulateTx, setLocalSimulateTx] = useState<boolean>(simulateTx);
  const switchId = useId();

  const isValidValue = (value: string) => {
    return (
      Boolean(value) &&
      Number(value) > 21_500 &&
      Number(value) % 1 === 0 &&
      Number(value) <= 500_000
    );
  };

  const submitDisabled = !isValidValue(value) && localSimulateTx === simulateTx;

  return (
    <div className="flex flex-col">
      <div className="font-medium text-gray-100">Set transaction options</div>
      <form className="mt-3 flex flex-col">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          inputMode="numeric"
          type="number"
          min={21_500}
          max={500_000}
          label="Gas limit (min 21,500, max 500,000)"
          placeholder="Enter gas limit"
          errorMessage=""
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-200">
            <label htmlFor={switchId}>Disable simulation</label>
            <InfoTooltip term="DISABLE_SIMULATION" />
          </div>
          <Switch
            id={switchId}
            checked={localSimulateTx}
            onCheckedChange={() => setLocalSimulateTx(!localSimulateTx)}
          />
        </div>
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
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (!submitDisabled) {
                if (isValidValue(value)) setGasLimit(value);
                if (localSimulateTx !== simulateTx) setSimulateTx(localSimulateTx);
                onOpenChange(false);
              }
            }}
            disabled={submitDisabled}
          >
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PuzzleInfoSolutionFormOptionsForm;

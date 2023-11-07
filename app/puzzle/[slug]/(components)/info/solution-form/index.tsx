'use client';

import { type FC, useEffect, useState } from 'react';

import PuzzleInfoSolutionFormOptionsForm from './options-form';
import PuzzleInfoSolutionFormTipForm from './tip-form';
import { Edit, ExternalLink, Fuel, Heart, ToggleRight } from 'lucide-react';
import { parseEther } from 'viem';
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi';

import { CURTA_ABI } from '@/lib/constants/abi';
import type { Puzzle } from '@/lib/types/protocol';
import { formatValueToPrecision, getPuzzlesAddress, getPuzzleTimeLeft } from '@/lib/utils';

import ConnectButton from '@/components/common/connect-button';
import { Button, Input, Popover, useToast } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleInfoSolutionFormProps = {
  puzzle: Puzzle;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleInfoSolutionForm: FC<PuzzleInfoSolutionFormProps> = ({ puzzle }) => {
  const { phase } = getPuzzleTimeLeft(puzzle.firstSolveTimestamp);
  const [solution, setSolution] = useState<string>('');
  const [tip, setTip] = useState<string>(phase > 1 ? '0.02' : '0');
  const [gasLimit, setGasLimit] = useState<string>('0');
  const [simulateTx, setSimulateTx] = useState<boolean>(true);
  const [isTipFormOpen, setIsTipFormOpen] = useState<boolean>(false);
  const [isOptionsFormOpen, setIsOptionsFormOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { toast } = useToast();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  // Set `mounted` to true on page load
  useEffect(() => setMounted(true), []);

  const { config } = usePrepareContractWrite({
    address: getPuzzlesAddress(puzzle.chainId),
    abi: CURTA_ABI,
    functionName: 'solve',
    args: [puzzle.id, solution],
    chainId: puzzle.chainId,
    value: tip ? parseEther(tip) : undefined,
    gas: gasLimit && BigInt(gasLimit) > 0 ? BigInt(gasLimit) : undefined,
  });
  const { data, write } = useContractWrite({
    ...config,
    mode: simulateTx ? 'prepared' : undefined,
    onError: (error) =>
      toast({ intent: 'fail', title: 'Transaction error', description: error?.message }),
    onSuccess: (data) =>
      toast({
        title: 'Transaction sent',
        description: 'Your transaction has been sent.',
        intent: 'primary',
        action: (
          <Button
            size="sm"
            href={`https://etherscan.io/tx/${data.hash}`}
            rightIcon={<ExternalLink />}
            intent="primary"
            newTab
          >
            View
          </Button>
        ),
      }),
  });
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onError(error) {
      toast({
        title: 'Transaction fail',
        description: error.message,
        intent: 'fail',
        action: data ? (
          <Button
            size="sm"
            href={`https://etherscan.io/tx/${data.hash}`}
            rightIcon={<ExternalLink />}
            intent="fail"
            newTab
          >
            View
          </Button>
        ) : undefined,
      });
    },
    onSuccess(data) {
      toast({
        title: 'Flag captured',
        description: 'Flag successfully captured!',
        intent: 'success',
        action: data ? (
          <Button
            size="sm"
            href={`https://etherscan.io/tx/${data.transactionHash}`}
            rightIcon={<ExternalLink />}
            intent="success"
            newTab
          >
            View
          </Button>
        ) : undefined,
      });
    },
  });

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="flex w-full flex-col">
        <Input
          className="w-full rounded-b-none"
          label="Solution (button activates if correct)"
          placeholder="0x"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          errorMessage=""
          rightIcon={
            <Popover
              className="w-[16rem]"
              open={isTipFormOpen}
              onOpenChange={setIsTipFormOpen}
              trigger={
                <Button
                  size="sm"
                  variant="outline"
                  intent="neutral"
                  className="bg-gray-600 active:bg-gray-450"
                  rightIcon={
                    Number(tip) > (phase > 1 ? 0.02 : 0) ? (
                      <Heart className="ease-[cubic-bezier(.34,.99,.71,1.42)] fill-red-400 text-red-400" />
                    ) : (
                      <Heart />
                    )
                  }
                >
                  {phase > 1
                    ? Number(tip) <= 0.02
                      ? '0.02 ETH'
                      : `${Math.round(Number(tip) * 1000) / 1000} ETH`
                    : Number(tip) === 0
                    ? 'Tip author'
                    : `${Math.round(Number(tip) * 1000) / 1000} ETH`}
                </Button>
              }
            >
              <PuzzleInfoSolutionFormTipForm
                phase={phase}
                author={puzzle.author}
                chainId={puzzle.chainId}
                onChange={setTip}
                onOpenChange={setIsTipFormOpen}
              />
            </Popover>
          }
        />
        <div className="flex w-full items-center justify-between rounded-b-md border-x border-b border-gray-300 py-2 pl-4 pr-2">
          <div className="flex items-center gap-2">
            <div>
              <div
                className="text-sm text-gray-100"
                title={gasLimit && gasLimit !== '0' ? gasLimit : undefined}
              >
                {gasLimit && gasLimit !== '0' ? formatValueToPrecision(Number(gasLimit), 3) : 'N/A'}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-200">
                <span className="h-3 w-3">
                  <Fuel className="h-3 w-3" />
                </span>
                <span>Gas limit</span>
              </div>
            </div>
            <hr className="not-prose my-0 h-9 w-[1px] border-l border-stroke" role="separator" />
            <div>
              <div className="text-sm text-gray-100">{simulateTx ? 'True' : 'False'}</div>
              <div className="flex items-center gap-1 text-xs text-gray-200">
                <span className="h-3 w-3">
                  <ToggleRight className="h-3 w-3" />
                </span>
                <span>Simulate tx</span>
              </div>
            </div>
          </div>
          <Popover
            className="w-[16rem]"
            open={isOptionsFormOpen}
            onOpenChange={setIsOptionsFormOpen}
            trigger={
              <Button
                size="sm"
                variant="outline"
                intent="neutral"
                className="bg-gray-600 active:bg-gray-450"
                rightIcon={<Edit />}
              >
                Edit
              </Button>
            }
          >
            <PuzzleInfoSolutionFormOptionsForm
              simulateTx={simulateTx}
              setGasLimit={setGasLimit}
              setSimulateTx={setSimulateTx}
              onOpenChange={setIsOptionsFormOpen}
            />
          </Popover>
        </div>
      </div>
      {!chain || !mounted ? (
        <ConnectButton className="w-full" />
      ) : chain.id !== puzzle.chainId ? (
        <Button
          className="w-full"
          size="lg"
          type="button"
          onClick={() => switchNetwork?.(puzzle.chainId)}
        >
          Switch network
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full"
          size="lg"
          onClick={(e) => {
            e.preventDefault();
            write?.();
          }}
          disabled={solution.length === 0 || !write || isLoading}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default PuzzleInfoSolutionForm;

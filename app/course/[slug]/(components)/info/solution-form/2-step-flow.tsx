'use client';

import { type FC, type ReactNode, useEffect, useState } from 'react';

import clsx from 'clsx';
import { Check, Dot } from 'lucide-react';
import { type Hash, zeroAddress } from 'viem';
import { useAccount, useContractRead } from 'wagmi';

import { getChainInfo, getGolfCommitKey } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseInfoSolutionForm2StepFlowProps = {
  bytecode: Hash;
  chainId: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseInfoSolutionForm2StepFlow: FC<CourseInfoSolutionForm2StepFlowProps> = ({
  bytecode,
  chainId,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { address } = useAccount();

  // Set mounted.
  useEffect(() => setMounted(true), []);

  const { data: getCommitData } = useContractRead({
    address: getChainInfo(chainId).golf,
    abi: [
      {
        inputs: [{ internalType: 'bytes32', name: 'key', type: 'bytes32' }],
        name: 'getCommit',
        outputs: [
          { internalType: 'address', name: 'player', type: 'address' },
          { internalType: 'uint96', name: 'timestamp', type: 'uint96' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [getGolfCommitKey({ address: mounted ? address ?? zeroAddress : zeroAddress, bytecode })],
  });
  const commitTimestamp = getCommitData !== undefined ? Number(getCommitData[1]) : undefined;
  const commitMade = getCommitData !== undefined;
  const waitOver = commitTimestamp !== undefined && 60 + commitTimestamp - Date.now() / 1000 <= 0;

  return (
    <div className="flex w-full items-center justify-center rounded-b-lg border border-stroke p-2">
      <div className="relative flex w-full items-center justify-between rounded-lg bg-gray-450 px-4 py-3">
        <div className="flex flex-col items-center gap-1">
          <Step state={commitMade ? 'completed' : 'pending'} />
          <div className="text-xs text-gray-100">Commit</div>
        </div>
        <div className="absolute left-0 right-0 flex flex-col items-center gap-1">
          <Countdown commitTimestamp={commitTimestamp} />
          <div className={clsx('text-xs', commitMade ? 'text-gray-100' : 'text-gray-200')}>
            Wait
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Step state="none" />
          <div className={clsx('text-xs', waitOver ? 'text-gray-100' : 'text-gray-200')}>
            Reveal
          </div>
        </div>
      </div>
    </div>
  );
};

const Countdown: FC<{ commitTimestamp?: number }> = ({ commitTimestamp }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>();

  useEffect(() => {
    const updateCountdown = () => {
      if (commitTimestamp !== undefined) {
        setSecondsLeft(60 + commitTimestamp - Math.round(Date.now() / 1000));
      }
    };
    updateCountdown();
    const interval = setInterval(() => updateCountdown(), 1000);

    return () => clearInterval(interval);
  }, [commitTimestamp]);

  if (commitTimestamp === undefined) {
    return <Step state="none">60</Step>;
  } else if (secondsLeft === undefined) {
    return <Step state="pending" />;
  } else if (secondsLeft <= 0) {
    return <Step state="completed" />;
  }

  return (
    <Step state="pending" value={1 - secondsLeft / 60}>
      {secondsLeft}
    </Step>
  );
};

const Step: FC<{
  state: 'none' | 'pending' | 'completed';
  value?: number;
  children?: ReactNode;
}> = ({ state, value, children }) => {
  return (
    <div className="relative flex h-6 w-6 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className={clsx(
            'transition-colors',
            state === 'completed' ? 'fill-blue-250' : 'fill-gray-450',
            value === undefined && state !== 'none' ? 'stroke-blue-250' : 'stroke-stroke',
          )}
          cx="12"
          cy="12"
          r="11"
          strokeWidth="2"
        />
        {value ? (
          <circle
            className="stroke-blue-250 transition-[stroke-dasharray]"
            cx="12"
            cy="12"
            r="11"
            strokeWidth="2"
            strokeDasharray={`${22 * Math.PI * value} ${22 * Math.PI}`}
            strokeLinecap="round"
            transform="rotate(180,12,12)"
          />
        ) : null}
      </svg>
      <div
        className={clsx(
          'absolute text-xs transition-colors',
          state === 'none' ? 'text-gray-200' : 'text-gray-100',
        )}
      >
        {state === 'completed' ? (
          <Check className="h-3 w-3 duration-300 animate-in fade-in" />
        ) : children ? (
          children
        ) : state === 'pending' ? (
          <Dot className="h-3 w-3" />
        ) : null}
      </div>
    </div>
  );
};

export default CourseInfoSolutionForm2StepFlow;

'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { Check, Dot } from 'lucide-react';
import { type Hash, zeroAddress } from 'viem';
import { useAccount, useContractRead } from 'wagmi';

import { CURTA_GOLF_ABI } from '@/lib/constants/abi';
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

const CourseInfoSolutionForm2StepFlow: React.FC<CourseInfoSolutionForm2StepFlowProps> = ({
  bytecode,
  chainId,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { address } = useAccount();

  // Set mounted.
  useEffect(() => setMounted(true), []);

  const senderAddress = mounted ? address ?? zeroAddress : zeroAddress;
  const commitKey = getGolfCommitKey({
    address: senderAddress,
    bytecode,
  });
  const { data: getCommitData } = useContractRead({
    address: getChainInfo(chainId).golf,
    chainId,
    abi: CURTA_GOLF_ABI,
    functionName: 'getCommit',
    args: [commitKey],
  });

  // @ts-expect-error `getCommitData` is not `undefined` here; ABI inference is
  // just unable to infer the type `[\`0x${string}\`, bigint]`.
  const commitTimestamp = getCommitData ? Number(getCommitData[1]) : undefined;
  const commitMade = commitTimestamp !== undefined && commitTimestamp > 0;
  const waitOver = commitMade && 60 + commitTimestamp - Date.now() / 1000 <= 0;

  return (
    <div className="relative flex w-full items-center justify-between rounded-lg border border-stroke bg-gray-450 px-4 py-3">
      <svg
        // We do `left-9` here because we have 16px of left-padding on the
        // parent, 12px of space required to start from the center of the
        // circle, and finally about 8px offset because of the label text (16
        // + 12 + 8 = 36).
        className="absolute left-9 top-[23px]"
        xmlns="http://www.w3.org/2000/svg"
        height="2"
        fill="none"
        role="figure"
        style={{ width: 'calc(50% - 36px)' }}
      >
        <line
          className={clsx(
            'transition-[stroke-dasharray,stroke-color',
            commitMade ? 'stroke-blue-250' : 'stroke-stroke',
          )}
          x1="1"
          y1="1"
          x2="999" /* Some arbitrary value greater than the max reasonable value. */
          y2="1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={commitMade ? undefined : '4 4'}
        />
      </svg>
      <svg
        // We can do `left-1/2` here because the center "step" circle is
        // perfectly centered within the circle. See comments for the previous
        // SVG for `top-[23px]`.
        className="absolute left-1/2 top-[23px]"
        xmlns="http://www.w3.org/2000/svg"
        height="2"
        fill="none"
        role="figure"
        style={{ width: 'calc(50% - 36px)' }}
      >
        <line
          className={clsx(
            'transition-[stroke-dasharray,stroke-color',
            waitOver ? 'stroke-blue-250' : 'stroke-stroke',
          )}
          x1="1"
          y1="1"
          x2="999" /* Some arbitrary value greater than the max reasonable value. */
          y2="1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={waitOver ? undefined : '4 4'}
        />
      </svg>
      <div className="flex flex-col items-center gap-1">
        <Step state={commitMade ? 'completed' : 'pending'} />
        <div className="text-xs text-gray-100">Commit</div>
      </div>
      <div className="absolute left-0 right-0 flex flex-col items-center gap-1">
        <Countdown commitTimestamp={commitTimestamp} />
        <div className={clsx('text-xs', commitMade ? 'text-gray-100' : 'text-gray-200')}>Wait</div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Step state={waitOver ? 'pending' : 'none'} />
        <div className={clsx('text-xs', waitOver ? 'text-gray-100' : 'text-gray-200')}>Reveal</div>
      </div>
    </div>
  );
};

const Countdown: React.FC<{ commitTimestamp?: number }> = ({ commitTimestamp }) => {
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

  if (commitTimestamp === undefined || commitTimestamp === 0) {
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

const Step: React.FC<{
  state: 'none' | 'pending' | 'completed';
  value?: number;
  children?: React.ReactNode;
}> = ({ state, value, children }) => {
  return (
    <div className="relative flex h-6 w-6 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        role="figure"
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

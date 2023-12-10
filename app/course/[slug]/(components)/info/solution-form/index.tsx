'use client';

import { type FC, useEffect, useState } from 'react';

import CourseInfoSolutionForm2StepFlow from './2-step-flow';
import CourseInfoSolutionForm2StepSubmitButton from './2-step-submit';
import * as RadioGroup from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import { ArrowDown, CheckCircle, Circle, Crown, ExternalLink } from 'lucide-react';
import { isHex } from 'viem';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi';

import { CURTA_GOLF_ABI } from '@/lib/constants/abi';
import type { GolfCourse } from '@/lib/types/protocol';
import { getChainInfo } from '@/lib/utils';

import ConnectButton from '@/components/common/connect-button';
import { Callout } from '@/components/templates/mdx';
import { Button, Input, Tooltip, useToast } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseInfoSolutionFormProps = {
  course: GolfCourse;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseInfoSolutionForm: FC<CourseInfoSolutionFormProps> = ({ course }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [submission, setSubmission] = useState<string>('');
  const [submissionMethod, setSubmissionMethod] = useState<string>();
  const { toast } = useToast();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();

  // Set `mounted` to true on page load.
  useEffect(() => setMounted(true), []);

  // ---------------------------------------------------------------------------
  // `submitDirectly` simulation and preparation
  // ---------------------------------------------------------------------------

  const {
    config: simulation,
    isLoading: simulationIsLoading,
    isError: simulationIsError,
  } = usePrepareContractWrite({
    address: getChainInfo(course.chainId).golf,
    abi: CURTA_GOLF_ABI,
    functionName: 'submitDirectly',
    // We use the connected address as a dummy value for `recipient`, or if
    // there is no connected address, we use a dummy `address(1)` to prevent the
    // mint from reverting.
    args: [course.id, submission, address ?? '0x0000000000000000000000000000000000000001'],
    chainId: course.chainId,
  });

  // ---------------------------------------------------------------------------
  // `submitDirectly` transaction (only relevant for 1-step method)
  // ---------------------------------------------------------------------------

  const { data: submitDirectlyData, write: submitDirectly } = useContractWrite({
    ...simulation,
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
            href={`https://${getChainInfo(course.chainId).blockExplorer}/tx/${data.hash}`}
            rightIcon={<ExternalLink />}
            intent="primary"
            newTab
          >
            View
          </Button>
        ),
      }),
  });
  const { isLoading: submitDirectlyIsLoading } = useWaitForTransaction({
    hash: submitDirectlyData?.hash,
    onError(error) {
      toast({
        title: 'Transaction fail',
        description: error.message,
        intent: 'fail',
        action: submitDirectlyData ? (
          <Button
            size="sm"
            href={`https://${getChainInfo(course.chainId).blockExplorer}/tx/${
              submitDirectlyData.hash
            }`}
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
        title: 'Submitted directly',
        description: 'Bytecode successfully submitted!',
        intent: 'success',
        action: data ? (
          <Button
            size="sm"
            href={`https://${getChainInfo(course.chainId).blockExplorer}/tx/${
              data.transactionHash
            }`}
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

  const isSubmissionValid = submission.length > 0 && isHex(submission) && !simulationIsError;
  const toBeLeader =
    isSubmissionValid &&
    (course.leaderGas
      ? typeof simulation?.result === 'number' && simulation.result < course.leaderGas
      : true);

  // If the submission is valid, we set the submission method to 1-step by
  // default, and if it's both valid and to be the leading solution, we set the
  // submission method to 2-step by default. Otherwise, we clear the radio
  // selection.
  useEffect(() => {
    if (isSubmissionValid) {
      setSubmissionMethod(toBeLeader ? 'sm1' : 'sm0');
    } else {
      setSubmissionMethod(undefined);
    }
  }, [isSubmissionValid, toBeLeader]);

  return (
    <div className="flex w-full flex-col items-center gap-3 p-4">
      <div className="flex w-full flex-col gap-2">
        <Input
          className="h-10 w-full"
          label="Submission (bytecode)"
          placeholder="0x"
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          pattern="^0x[0-9a-fA-F]*$"
          errorMessage="Bytecode must be a hex-string"
        />
        <div className="flex w-full items-center justify-between text-sm">
          <div className="flex items-center gap-1 pl-[15px]">
            <div className="stroke-stroke leading-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="none"
                role="img"
              >
                <path d="M1 1v5q0 2 2 2h8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-gray-200">Gas Used</div>
          </div>
          {!simulationIsLoading ? (
            <div className="text-gray-100">
              <div className="flex items-center gap-1">
                <Tooltip
                  content={
                    toBeLeader
                      ? 'Beats current leader'
                      : isSubmissionValid
                      ? 'Passes simulation'
                      : 'Fails simulation'
                  }
                >
                  {toBeLeader ? (
                    <Crown className="h-4 w-4 text-gold" />
                  ) : isSubmissionValid ? (
                    <CheckCircle className="h-4 w-4 text-tw-green" />
                  ) : null}
                </Tooltip>
                {simulation?.result ? (simulation.result as number) : '—'}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 animate-pulse rounded-md bg-gray-350" />
              <div className="h-4 w-10 animate-pulse rounded-md bg-gray-350" />
            </div>
          )}
        </div>
        <div className="relative flex h-6 w-full items-center justify-center" role="separator">
          <hr className="w-full border-t border-stroke" />
          <div className="absolute top-0 mx-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-450 text-gray-200 ring-4 ring-gray-600">
            <ArrowDown className="h-3 w-3" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="submission-method" className="text-xs text-gray-200">
              Submission method
            </label>
            <RadioGroup.Root
              id="submission-method"
              className={clsx(
                'flex w-full flex-col -space-y-[1px]',
                !isSubmissionValid ? 'cursor-not-allowed text-gray-200' : 'text-gray-100',
              )}
              value={submissionMethod}
              onValueChange={(value) => setSubmissionMethod(value)}
              disabled={!isSubmissionValid}
            >
              {['1-step', '2-step (prevent frontrunning)'].map((value, i) => (
                <div
                  key={i}
                  className={clsx(
                    'z-[1] flex h-9 items-center gap-1.5 border border-stroke px-3 transition-colors first:rounded-t-lg last:rounded-b-lg hover:z-[2]',
                    isSubmissionValid ? 'hover:border-gray-300' : '',
                  )}
                >
                  <RadioGroup.Item
                    value={`sm${i}`}
                    id={`r-sm${i}`}
                    className={clsx(
                      'flex h-4 w-4 items-center justify-center rounded-full border border-stroke focus:outline-none',
                      isSubmissionValid
                        ? 'transition-colors hover:border-gray-300 focus-visible:ring-1 focus-visible:ring-blue-250'
                        : 'cursor-not-allowed',
                    )}
                    disabled={!isSubmissionValid}
                  >
                    <RadioGroup.Indicator className="flex items-center justify-center">
                      <Circle className="h-2.5 w-2.5 fill-blue-250 text-blue-250" />
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>
                  <label
                    className={clsx(
                      'grow text-sm font-medium',
                      isSubmissionValid ? 'cursor-pointer' : 'cursor-not-allowed',
                    )}
                    htmlFor={`r-sm${i}`}
                  >
                    {value}
                  </label>
                </div>
              ))}
              {submissionMethod === 'sm1' && isHex(submission) ? (
                <CourseInfoSolutionForm2StepFlow bytecode={submission} chainId={course.chainId} />
              ) : null}
            </RadioGroup.Root>
          </div>
          {toBeLeader && submissionMethod === 'sm0' ? (
            <Callout className="my-0" size="sm" intent="warning">
              Your solution may get frontrun.
            </Callout>
          ) : null}
        </div>
      </div>
      {!chain || !mounted ? (
        <ConnectButton className="w-full" />
      ) : chain.id !== course.chainId ? (
        <Button
          className="w-full"
          size="lg"
          type="button"
          onClick={() => switchNetwork?.(course.chainId)}
        >
          Switch network
        </Button>
      ) : submissionMethod === 'sm0' ? (
        /* 1-step submission button */
        <Button
          type="submit"
          className="w-full"
          size="lg"
          onClick={(e) => {
            e.preventDefault();
            submitDirectly?.();
          }}
          disabled={submission.length === 0 || !submitDirectly || submitDirectlyIsLoading}
        >
          Submit
        </Button>
      ) : isHex(submission) && isSubmissionValid ? (
        /* 2-step submission button */
        <CourseInfoSolutionForm2StepSubmitButton bytecode={submission} course={course} />
      ) : (
        <Button className="w-full" size="lg" type="submit" disabled>
          Commit
        </Button>
      )}
    </div>
  );
};

export default CourseInfoSolutionForm;

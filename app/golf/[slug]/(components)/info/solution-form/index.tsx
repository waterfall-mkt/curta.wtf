'use client';

import { useEffect, useState } from 'react';

import type { GolfCourseValue } from '../../types';
import CourseInfoSolutionForm2StepFlow from './2-step-flow';
import CourseInfoSolutionForm2StepSubmitButton from './2-step-submit';
import CourseInfoSolutionFormOpcodesAccordion from './opcodes-accordion';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { isHex } from 'viem';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import ConnectButton from '@/components/common/connect-button';
import { Button, Input } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseInfoSolutionFormProps = {
  course: GolfCourseValue;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseInfoSolutionForm: React.FC<CourseInfoSolutionFormProps> = ({ course }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [submission, setSubmission] = useState<string>('');
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  // Set `mounted` to true on page load.
  useEffect(() => setMounted(true), []);

  const isSubmissionValid = submission.length > 0 && isHex(submission);

  return (
    <div className="flex w-full flex-col items-center gap-3 p-4">
      <CourseInfoSolutionFormOpcodesAccordion
        allowedOpcodes={
          (course.allowedOpcodes as `0x${string}`) ?? '0xffffffffffffffffffffffffffffffff'
        }
      />
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
        {/* <div className="flex w-full items-center justify-between text-sm">
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
                  ) : submission.length > 0 ? (
                    <AlertCircle className="h-4 w-4 text-tw-red" />
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
        </div> */}
        <AnimatePresence>
          {isHex(submission) ? (
            <motion.div
              className="flex w-full flex-col gap-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div
                className="relative flex h-6 w-full items-center justify-center gap-1"
                role="separator"
              >
                <hr className="grow rounded-full border-t border-stroke" />
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-450 text-gray-200">
                  <ArrowDown className="h-3 w-3" />
                </div>
                <hr className="grow rounded-full border-t border-stroke" />
              </div>
              <CourseInfoSolutionForm2StepFlow bytecode={submission} chainId={course.chainId} />
            </motion.div>
          ) : null}
        </AnimatePresence>
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

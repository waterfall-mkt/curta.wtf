import { type FC, useEffect, useState } from 'react';

import { ExternalLink } from 'lucide-react';
import { type Hash, zeroAddress } from 'viem';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { CURTA_GOLF_ABI } from '@/lib/constants/abi';
import type { GolfCourse } from '@/lib/types/protocol';
import { getChainInfo, getGolfCommitKey } from '@/lib/utils';

import { Button, useToast } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseInfoSolutionForm2StepSubmitButtonProps = {
  bytecode: Hash;
  course: GolfCourse;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseInfoSolutionForm2StepSubmitButton: FC<CourseInfoSolutionForm2StepSubmitButtonProps> = ({
  bytecode,
  course,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { address } = useAccount();
  const { toast } = useToast();

  // Set mounted.
  useEffect(() => setMounted(true), []);

  // Fetch commit data.
  const senderAddress = mounted ? address ?? zeroAddress : zeroAddress;
  const commitKey = getGolfCommitKey({
    address: senderAddress,
    bytecode,
  });
  const { data: getCommitData } = useContractRead({
    address: getChainInfo(course.chainId).golf,
    chainId: course.chainId,
    abi: CURTA_GOLF_ABI,
    functionName: 'getCommit',
    args: [commitKey],
  });

  // ---------------------------------------------------------------------------
  // `commit` and preparation
  // ---------------------------------------------------------------------------

  const { config: commitConfig } = usePrepareContractWrite({
    address: getChainInfo(course.chainId).golf,
    abi: CURTA_GOLF_ABI,
    functionName: 'commit',
    args: [commitKey],
    chainId: course.chainId,
  });

  // ---------------------------------------------------------------------------
  // `commit` transaction
  // ---------------------------------------------------------------------------

  const { data: commitData, write: commit } = useContractWrite({
    ...commitConfig,
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
  const { isLoading: commitIsLoading } = useWaitForTransaction({
    hash: commitData?.hash,
    onError(error) {
      toast({
        title: 'Transaction fail',
        description: error.message,
        intent: 'fail',
        action: commitData ? (
          <Button
            size="sm"
            href={`https://${getChainInfo(course.chainId).blockExplorer}/tx/${commitData.hash}`}
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
        title: 'Solution committed',
        description: 'Bytecode successfully committed!',
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

  // ---------------------------------------------------------------------------
  // `submit` and preparation
  // ---------------------------------------------------------------------------

  const { config: submitConfig } = usePrepareContractWrite({
    address: getChainInfo(course.chainId).golf,
    abi: CURTA_GOLF_ABI,
    functionName: 'submit',
    // We always use a salt of 0 on the front-end.
    args: [course.id, bytecode, senderAddress, 0n],
    chainId: course.chainId,
  });

  // ---------------------------------------------------------------------------
  // `submit` transaction
  // ---------------------------------------------------------------------------

  const { data: submitData, write: submit } = useContractWrite({
    ...submitConfig,
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
  const { isLoading: submitIsLoading } = useWaitForTransaction({
    hash: submitData?.hash,
    onError(error) {
      toast({
        title: 'Transaction fail',
        description: error.message,
        intent: 'fail',
        action: submitData ? (
          <Button
            size="sm"
            href={`https://${getChainInfo(course.chainId).blockExplorer}/tx/${submitData.hash}`}
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
        title: 'Solution submitted',
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

  // @ts-expect-error `getCommitData` is not `undefined` here; ABI inference is
  // just unable to infer the type `[\`0x${string}\`, bigint]`.
  if (!getCommitData || Number(getCommitData[1]) === 0) {
    return (
      <Button
        type="submit"
        className="w-full"
        size="lg"
        onClick={(e) => {
          e.preventDefault();
          commit?.();
        }}
        disabled={bytecode.length === 0 || !commit || commitIsLoading}
      >
        Commit
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      className="w-full"
      size="lg"
      onClick={(e) => {
        e.preventDefault();
        submit?.();
      }}
      disabled={bytecode.length === 0 || !submit || submitIsLoading}
    >
      Reveal
    </Button>
  );
};

export default CourseInfoSolutionForm2StepSubmitButton;

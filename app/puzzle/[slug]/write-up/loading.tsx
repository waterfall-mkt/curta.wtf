import { Fragment } from 'react';

import clsx from 'clsx';
import { Github } from 'lucide-react';

import { Button } from '@/components/ui';

export default function LoadingPage() {
  return (
    <div className="mx-auto flex max-w-[90rem] flex-col px-4 pt-4 lg:flex-row lg:gap-12 lg:px-20 lg:pt-8">
      {/* Content */}
      <div className="flex grow flex-col">
        <div className="mb-4 h-9 w-full animate-pulse rounded-lg bg-gray-350 md:h-10 md:w-[24rem]" />
        <div className="flex grow items-center justify-between">
          <div className="flex gap-3.5">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-350" />
            <div className="flex flex-col gap-1">
              <div className="col-span-1 h-5 w-[4.5rem] animate-pulse rounded-md bg-gray-350" />
              <div className="col-span-1 h-4 w-[5.5rem] animate-pulse rounded-md bg-gray-350" />
            </div>
          </div>
          <Button
            className="hidden sm:flex"
            variant="outline"
            intent="neutral"
            rightIcon={<Github />}
            disabled
          >
            Edit on GitHub
          </Button>
          <Button
            className="sm:hidden"
            variant="outline"
            intent="neutral"
            rightIcon={<Github />}
            disabled
          >
            Edit
          </Button>
        </div>
        <hr className="my-6 w-full rounded-full border-stroke" role="separator" />
        {[256, 128, 196, 160].map((width, i) => (
          <Fragment key={i}>
            <div
              className={clsx(
                'mb-2 h-8 max-w-full animate-pulse rounded-lg bg-gray-350 md:mb-4',
                i > 0 ? 'mt-6 md:mt-8' : '',
              )}
              style={{ width }}
            />
            <div className="flex flex-col gap-2">
              <div className="h-5 w-full animate-pulse rounded-md bg-gray-350" />
              <div className="h-5 w-full animate-pulse rounded-md bg-gray-350" />
              <div className="h-5 w-full animate-pulse rounded-md bg-gray-350" />
              <div className="h-5 w-3/4 animate-pulse rounded-md bg-gray-350" />
            </div>
          </Fragment>
        ))}
      </div>
      <hr className="my-6 w-full rounded-full border-stroke lg:hidden" role="separator" />
      {/* Metadata */}
      <div className="flex h-fit w-full flex-col lg:sticky lg:top-[9.25rem] lg:min-w-[22.5rem] lg:max-w-[22.5rem]">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-200">Contributors</div>
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-stroke p-4 sm:grid-cols-2 lg:grid-cols-1">
            {new Array(3).fill(null).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-350" />
                  <div className="flex flex-col gap-1">
                    <div className="col-span-1 h-5 w-[4.5rem] animate-pulse rounded-md bg-gray-350" />
                    <div className="col-span-1 h-4 w-[5.5rem] animate-pulse rounded-md bg-gray-350" />
                  </div>
                </div>
                <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-350" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

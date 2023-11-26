import { ChevronDown, Heart, Settings } from 'lucide-react';

import { getChainInfo } from '@/lib/utils';

import { Button, CodeBlock, IconButton, Input } from '@/components/ui';

export default function LoadingPage() {
  return (
    <div className="mx-auto flex max-w-[90rem] flex-col px-4 lg:px-20">
      {/* Puzzle content */}
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:gap-6">
        {/* Problem display */}
        <CodeBlock
          language="solidity"
          className="min-h-[8.75rem] w-full grow"
          style={{ maxHeight: '38.5rem' }}
          fileName="Puzzle"
          headerLabel={
            <div className="flex items-center gap-1 py-0.5 text-sm">
              <a
                className="-mx-0.5 rounded-sm px-0.5 font-medium text-gray-100 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-250"
                // Default to Curta Puzzles on Ethereum
                href={`https://${getChainInfo(1).blockExplorer}/address/${getChainInfo(1).puzzles}`}
                target="_blank"
                rel="noreferrer"
              >
                Curta
              </a>
              <span>calls</span>
              <code className="rounded-md border border-stroke bg-gray-450 px-1 py-0.5 text-xs font-normal text-gray-100">
                verify()
              </code>
            </div>
          }
          skeletonLines={40}
        >
          {' '}
        </CodeBlock>
        {/* Puzzle info + submit */}
        <div className="flex h-fit w-full flex-col justify-center rounded-[1.25rem] border border-stroke bg-gray-600 md:min-w-[20rem] md:max-w-[20rem]">
          {/* First solver */}
          <div className="flex grow flex-col items-center gap-2 p-4">
            <div className="group relative flex w-full flex-col items-center justify-center rounded-lg bg-gray-350 py-2.5">
              <div className="text-center text-sm font-book text-gray-150">First Blood</div>
              <div className="h-8 w-32 animate-pulse rounded-md bg-gray-200" />
            </div>
            {[
              { name: 'Solve Time', width: 56 },
              { name: 'Total Solves', width: 15 },
            ].map((item, index) => (
              <div key={index} className="flex w-full items-center justify-between text-sm">
                <div className="text-gray-200">{item.name}</div>
                <div
                  className="h-5 animate-pulse rounded-md bg-gray-350"
                  style={{ width: item.width }}
                />
              </div>
            ))}
          </div>
          <hr className="w-full border-t border-stroke" role="separator" />
          {/* Time left */}
          <div className="flex grow flex-col items-center gap-2 p-4">
            <div className="group relative flex w-full flex-col items-center justify-center rounded-lg bg-gray-350 py-2.5">
              <div className="text-center text-sm font-book text-gray-150">Time Left</div>
              <div className="h-8 w-24 animate-pulse rounded-md bg-gray-200" />
            </div>
            {/* Timeline */}
            <div className="flex w-full flex-col rounded-lg border border-gray-300">
              <div className="flex h-9 items-center justify-between px-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-gray-350" />
                  <div className="h-5 w-32 animate-pulse rounded-md bg-gray-350" />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-200" />
              </div>
              <div className="flex w-full gap-2.5 border-t border-gray-300 p-4">
                <div className="flex w-1/2 flex-col items-end gap-7 pt-0.5">
                  <div className="h-4 w-16 animate-pulse rounded-sm bg-gray-350" />
                  <div className="h-4 w-16 animate-pulse rounded-sm bg-gray-350" />
                  <div className="h-4 w-16 animate-pulse rounded-sm bg-gray-350" />
                  <div className="h-4 w-16 animate-pulse rounded-sm bg-gray-350" />
                </div>
                <div className="w-3">
                  <svg
                    width={12}
                    height={168}
                    viewBox="0 0 12 168"
                    role="figure"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      className="animate-pulse fill-gray-350"
                      x={5}
                      y={10}
                      width={2}
                      height={132}
                    />
                    <circle className="animate-pulse fill-gray-350" cx={6} cy={10} r={6} />
                    <circle className="animate-pulse fill-gray-350" cx={6} cy={54} r={6} />
                    <circle className="animate-pulse fill-gray-350" cx={6} cy={98} r={6} />
                    <circle className="animate-pulse fill-gray-350" cx={6} cy={142} r={6} />
                  </svg>
                </div>
                <div className="flex w-full flex-col gap-2">
                  {[144, 72, 'Solutions revealed', 'Submissions closed'].map((value, index) => (
                    <div key={index}>
                      <div className="h-5 text-sm text-gray-100">Phase {index}</div>
                      {typeof value === 'string' ? (
                        <div className="h-4 text-xs text-gray-200">{value}</div>
                      ) : (
                        <div
                          className="h-4 animate-pulse rounded-sm bg-gray-350"
                          style={{ width: value }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full border-t border-stroke" role="separator" />
          {/* Solution submit */}
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="flex w-full flex-col">
              <Input
                className="w-full"
                label="Solution (button activates if correct)"
                placeholder="0x"
                disabled={true}
                rightIcon={
                  <div className="flex -space-x-[1px]">
                    <Button
                      size="sm"
                      variant="outline"
                      intent="neutral"
                      className="rounded-none rounded-l-lg"
                      rightIcon={<Heart />}
                      disabled
                    >
                      {' '}
                      Tip author
                    </Button>
                    <IconButton
                      size="sm"
                      variant="outline"
                      intent="neutral"
                      className="rounded-none rounded-r-lg"
                      disabled
                    >
                      <Settings />
                    </IconButton>
                  </div>
                }
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={true}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { type FC, type UIEvent, useMemo, useState } from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import type { Hash } from 'viem';

import { OPCODES_SHANGHAI } from '@/lib/constants/opcodes';

import { Badge } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseInfoSolutionFormOpcodesAccordionProps = {
  allowedOpcodes: Hash;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseInfoSolutionFormOpcodesAccordion: FC<CourseInfoSolutionFormOpcodesAccordionProps> = ({
  allowedOpcodes,
}) => {
  const [scrollIsAtTop, setScrollIsAtTop] = useState<boolean>(true);
  const [scrollIsAtBottom, setScrollIsAtBottom] = useState<boolean>(false);

  const bannedOpcodesBitmap = ((1n << 256n) - 1n) ^ BigInt(allowedOpcodes);
  const [bannedOpcodes, bannedOpcodeNames, bannedOpcodesCount, numGroups] = useMemo(() => {
    let bannedOpcodesCount = 0;
    const bannedOpcodes: { [key: string]: { value: number; name: string }[] } = {};
    const bannedOpcodeNames: string[] = [];
    for (let i = 0n; i < 256n; i++) {
      if ((bannedOpcodesBitmap & (1n << i)) === 0n) continue;
      const opcodeValue = Number(i);
      const opcode = OPCODES_SHANGHAI[opcodeValue];
      if (opcode) {
        bannedOpcodesCount++;
        bannedOpcodes[opcode.category] ??= [];
        bannedOpcodes[opcode.category].push({ value: opcodeValue, name: opcode.name });
        bannedOpcodeNames.push(opcode.name);
      }
    }

    return [
      bannedOpcodes,
      bannedOpcodeNames,
      bannedOpcodesCount,
      Object.keys(bannedOpcodes).length,
    ];
  }, [bannedOpcodesBitmap]);

  // Function for setting scroll values to conditionally render gradient
  // overflows.
  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    setScrollIsAtTop(scrollTop === 0);
    setScrollIsAtBottom(scrollHeight - scrollTop === clientHeight);
  };

  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor="banned-opcodes" className="text-xs text-gray-200">
        Banned opcodes
      </label>
      <Accordion.Root id="banned-opcodes" className="w-full" type="single" collapsible>
        <Accordion.Item value="banned-opcodes-categories" className="w-full">
          <Accordion.Trigger
            className={clsx(
              'group z-10 flex h-9 w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-600 px-3 text-sm font-medium text-gray-150 transition-colors focus:outline-none focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-blue-250 data-[state="open"]:rounded-b-none data-[state="open"]:text-gray-100 data-[state="open"]:focus-visible:rounded-b-sm data-[state="open"]:focus-visible:-outline-offset-2',
              bannedOpcodesBitmap > 0n
                ? 'cursor-pointer hover:border-gray-250 hover:text-gray-100 active:bg-gray-450'
                : 'cursor-not-allowed',
            )}
            disabled={bannedOpcodesBitmap === 0n}
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <div className="min-w-9 max-w-9">
                <Badge size="sm" variant="secondary" type="number">
                  {bannedOpcodesCount}
                </Badge>
              </div>
              <span className="overflow-hidden truncate text-ellipsis">
                {bannedOpcodesBitmap > 0n ? bannedOpcodeNames.join(', ') : 'None'}
              </span>
            </div>
            <div>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state='open']:rotate-90" />
            </div>
          </Accordion.Trigger>
          <Accordion.Content
            className="relative overflow-hidden rounded-b-lg border-x border-b border-gray-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
            tabIndex={-1}
          >
            <div className="hide-scrollbar max-h-[16rem] overflow-y-scroll" onScroll={onScroll}>
              <Accordion.Root
                className="relative flex w-full flex-col -space-y-[1px]"
                type="multiple"
              >
                {Object.entries(bannedOpcodes).map(([category, opcodes], j) => (
                  <Accordion.Item key={j} value={`x${j}`} className="w-full">
                    <Accordion.Trigger
                      className={clsx(
                        'group sticky top-[-1px] z-10 flex h-9 w-full items-center justify-between border-y border-gray-300 bg-gray-600 pl-7 pr-3 text-sm font-medium text-gray-150 transition-colors hover:text-gray-100 focus:outline-none focus-visible:z-[20] focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-blue-250 active:bg-gray-450 data-[state="open"]:text-gray-100',
                        j === 0 ? 'border-t-0' : '',
                        j === numGroups - 1 ? 'data-[state="closed"]:border-b-0' : '',
                      )}
                    >
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <div className="w-7">
                          <Badge size="sm" variant="secondary" type="number">
                            {opcodes.length}
                          </Badge>
                        </div>
                        <span className="overflow-hidden truncate text-ellipsis">{category}</span>
                      </div>
                      <div>
                        <ChevronRight className="h-4 w-4 transition-transform group-data-[state='open']:rotate-90" />
                      </div>
                    </Accordion.Trigger>
                    <Accordion.Content className="w-full flex-col">
                      {opcodes.map(({ value, name }, k) => (
                        <div key={k} className="pl-16 pr-3">
                          <div
                            className={clsx(
                              'flex items-center justify-between border-t border-stroke py-2',
                              k === 0 ? 'border-t-0' : '',
                            )}
                          >
                            <span className="text-sm text-gray-100">{name}</span>
                            <Badge
                              className="font-mono"
                              size="sm"
                              variant="secondary"
                              type="number"
                            >
                              {`0x${value.toString(16).padStart(2, '0')}`}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
            <div
              className={clsx(
                'pointer-events-none absolute left-0 top-0 z-[10] h-2 w-full bg-gradient-to-b from-gray-600 transition-opacity',
                scrollIsAtTop ? 'opacity-0' : 'opacity-100',
              )}
            />
            <div
              className={clsx(
                'pointer-events-none absolute bottom-0 left-0 z-[10] h-6 w-full bg-gradient-to-t from-gray-600 transition-opacity',
                scrollIsAtBottom ? 'opacity-0' : 'opacity-100',
              )}
            />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};

export default CourseInfoSolutionFormOpcodesAccordion;

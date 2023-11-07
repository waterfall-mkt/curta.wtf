'use client';

import { type FC, useMemo } from 'react';

import type { LeaderboardPuzzlesTableInternalProps } from '.';
import type { ColumnDef } from '@tanstack/react-table';
import { ChevronRight, Crown, ExternalLink } from 'lucide-react';

import type { Solver } from '@/lib/types/protocol';
import { getBlockExplorerDomain, getTimeLeftString } from '@/lib/utils';

import AddressLinkClient from '@/components/templates/address-link-client';
import ENSAvatarClient from '@/components/templates/ens-avatar-client';
import InfoTooltip from '@/components/templates/info-tooltip';
import Stat from '@/components/templates/stat';
import { Button, Table } from '@/components/ui';

const LeaderboardPuzzlesTableMobile: FC<LeaderboardPuzzlesTableInternalProps> = ({
  data,
  highlightValues,
  sorting,
  setSorting,
}) => {
  const columns = useMemo<ColumnDef<Solver>[]>(
    () => [
      {
        accessorKey: 'rank',
        header: () => 'Rank',
        cell: ({ row }) => row.original.rank,
        footer: (props) => props.column.id,
        size: 70,
      },
      {
        accessorKey: 'solver',
        header: () => 'Player',
        cell: ({ row }) => (
          <div className="flex items-center gap-3.5">
            <div className="overflow-hidden rounded-full">
              <ENSAvatarClient
                nameOrAddress={row.original.solverEnsName ?? row.original.solver}
                size={40}
                prefetchedEnsAvatar={row.original.solverEnsAvatar}
              />
            </div>
            <AddressLinkClient
              className="text-gray-100"
              address={row.original.solver}
              prefetchedEnsName={row.original.solverEnsName}
            />
          </div>
        ),
        footer: (props) => props.column.id,
        size: 500,
      },
      {
        accessorKey: 'points',
        header: () => (
          <div className="ml-auto flex items-center gap-1">
            <div>Points</div>
            <InfoTooltip term="POINTS" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="ml-auto flex justify-end text-end">{row.original.points}</div>
        ),
        footer: (props) => props.column.id,
        size: 55,
      },
      {
        accessorKey: 'accordion',
        cell: ({ row }) => <Table.AccordionButton row={row} />,
        header: () => 'Expand',
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  return (
    <Table
      className="md:hidden"
      columns={columns}
      data={data}
      sorting={sorting}
      highlightAccessor="solver"
      highlightValues={highlightValues}
      setSorting={setSorting}
      renderSubComponent={({ row }) => (
        <LeaderboardPuzzlesTableMobileSubComponent data={row.original} />
      )}
      topRounded={false}
      noBorder
    />
  );
};

const LeaderboardPuzzlesTableMobileSubComponent: FC<{ data: Solver }> = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-2 p-3">
        <Stat
          name="Breakdown"
          value={`${data.count.phase0} / ${data.count.phase1} / ${data.count.phase2}`}
          term="BREAKDOWN"
        />
        <Stat name="Speed score" value={data.speedScore} term="SPEED_SCORE" />
        <Stat name="Puzzles solved" value={data.count.total} />
      </div>

      {data.solves.map((solve, index) => {
        return (
          <div key={index} className="grid grid-cols-2 gap-2 border-t border-stroke p-3">
            <Stat
              name="Puzzle"
              value={
                <div className="flex items-start justify-center">
                  <div>{`#${solve.puzzleId}${solve.puzzle ? ' - ' + solve.puzzle.name : ''}`}</div>
                </div>
              }
            />
            <Stat
              name="Time taken"
              value={getTimeLeftString(solve.solveTimestamp - (solve.puzzle?.addedTimestamp ?? 0))}
            />
            <Stat
              name="Puzzle rank"
              value={
                <div className="flex items-center gap-1">
                  <span>
                    {solve.rank}{' '}
                    <span className="text-gray-200">/ {solve.puzzle?.numberSolved ?? 0}</span>
                  </span>
                  {solve.phase === 0 ? <Crown className="h-4 w-4 text-gold" /> : null}
                </div>
              }
              term="PUZZLE_RANK"
            />
            <Stat name="Phase solved" value={solve.phase} />
            <Stat name="Points" value={3 - solve.phase} />
            <div className="col-span-2 flex gap-1">
              <Button
                className="w-full"
                size="sm"
                variant="outline"
                intent="neutral"
                href={`/puzzle/${solve.puzzleId}`}
                rightIcon={<ChevronRight />}
              >
                View puzzle
              </Button>
              <Button
                className="w-full"
                size="sm"
                variant="outline"
                intent="neutral"
                rightIcon={<ExternalLink />}
                href={`https://${getBlockExplorerDomain(solve.chainId)}/tx/${solve.tx}`}
                newTab
              >
                View solution
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardPuzzlesTableMobile;

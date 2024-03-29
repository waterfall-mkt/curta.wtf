'use client';

import { useMemo } from 'react';

import type { LeaderboardPuzzlesDataTableInternalProps } from '.';
import type { ColumnDef } from '@tanstack/react-table';
import { ChevronRight, Crown, ExternalLink } from 'lucide-react';

import { getChainInfo, getTimeLeftString } from '@/lib/utils';
import type { LeaderboardPuzzleSolver } from '@/lib/utils/fetchLeaderboardPuzzles';

import AddressDisplayClient from '@/components/templates/address-display-client';
import InfoTooltip from '@/components/templates/info-tooltip';
import Stat from '@/components/templates/stat';
import TeamDisplayClient from '@/components/templates/team-display-client';
import { Button, Table } from '@/components/ui';

const LeaderboardPuzzlesDataTableMobile: React.FC<LeaderboardPuzzlesDataTableInternalProps> = ({
  data,
  highlightValues,
  sorting,
  setSorting,
}) => {
  const columns = useMemo<ColumnDef<LeaderboardPuzzleSolver>[]>(
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
        cell: ({ row }) =>
          row.original.team === undefined ? (
            <AddressDisplayClient address={row.original.solverAddress as `0x${string}`} />
          ) : (
            <TeamDisplayClient team={row.original.team} />
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
        <LeaderboardPuzzlesDataTableMobileSubComponent data={row.original} />
      )}
      topRounded={false}
      noBorder
    />
  );
};

const LeaderboardPuzzlesDataTableMobileSubComponent: React.FC<{
  data: LeaderboardPuzzleSolver;
}> = ({ data }) => {
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
            <Stat name="Chain" value={getChainInfo(solve.chainId).name} />
            <Stat
              name="Time taken"
              value={
                solve.solveTimestamp
                  ? getTimeLeftString(solve.solveTimestamp - (solve.puzzle?.addedTimestamp ?? 0))
                  : '–'
              }
            />
            <Stat
              name="Puzzle rank"
              value={
                <div className="flex items-center gap-1">
                  <span>
                    {solve.rank}{' '}
                    <span className="text-gray-200">/ {solve.puzzle?._count.solves ?? 0}</span>
                  </span>
                  {solve.phase === 0 ? <Crown className="h-4 w-4 text-gold" /> : null}
                </div>
              }
              term="PUZZLE_RANK"
            />
            <Stat name="Phase solved" value={solve.phase} />
            <Stat name="Points" value={3 - (solve.phase ?? 0)} />
            <div className="col-span-2 flex gap-1">
              <Button
                className="w-full"
                size="sm"
                variant="outline"
                intent="neutral"
                href={`/puzzle/${solve.chainId}:${solve.puzzleId}`}
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
                href={`https://${getChainInfo(solve.chainId).blockExplorer}/tx/${solve.solveTx}`}
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

export default LeaderboardPuzzlesDataTableMobile;

'use client';

import { type FC, useMemo } from 'react';

import type { LeaderboardPuzzlesTableInternalProps } from '.';
import type { ColumnDef } from '@tanstack/react-table';
import { ChevronRight, Crown, ExternalLink } from 'lucide-react';

import type { PuzzleSolver } from '@/lib/types/protocol';
import { getChainInfo, getTimeLeftString } from '@/lib/utils';

import AddressLinkClient from '@/components/templates/address-link-client';
import Avatar from '@/components/templates/avatar';
import ENSAvatarClient from '@/components/templates/ens-avatar-client';
import InfoTooltip from '@/components/templates/info-tooltip';
import Stat from '@/components/templates/stat';
import UserHoverCard from '@/components/templates/user-hover-card';
import { Button, Table } from '@/components/ui';

const LeaderboardPuzzlesTableMobile: FC<LeaderboardPuzzlesTableInternalProps> = ({
  data,
  highlightValues,
  sorting,
  setSorting,
}) => {
  const columns = useMemo<ColumnDef<PuzzleSolver>[]>(
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
              {row.original.team === undefined ? (
                <ENSAvatarClient
                  nameOrAddress={row.original.solverEnsName ?? row.original.solver}
                  size={40}
                  prefetchedEnsAvatar={row.original.solverEnsAvatar}
                />
              ) : (
                <Avatar
                  src={row.original.team.avatar ?? ''}
                  alt={`Team #${row.original.team.id}`}
                  size={40}
                />
              )}
            </div>
            {row.original.team === undefined ? (
              <UserHoverCard
                address={row.original.solver}
                trigger={
                  <AddressLinkClient
                    className="text-gray-100"
                    address={row.original.solver}
                    prefetchedEnsName={row.original.solverEnsName}
                  />
                }
              />
            ) : (
              <div>
                <div className="flex items-center gap-1.5 text-sm text-gray-100">
                  <span>{row.original.team.name ?? `Team #${row.original.team.id}`}</span>
                  <div className="flex -space-x-1">
                    {row.original.team.members.slice(0, 3).map((member, index) => (
                      <UserHoverCard
                        key={index}
                        address={member.address}
                        trigger={
                          <div className="z-[1] rounded-full ring-2 ring-gray-700 transition-transform hover:z-[5] hover:scale-110">
                            <ENSAvatarClient nameOrAddress={member.address} size={12} />
                          </div>
                        }
                      />
                    ))}
                    {row.original.team.members.length > 3 ? (
                      <div className="z-[4] flex h-3 w-3 items-center justify-center rounded-full bg-gray-450 text-[6px] ring-2 ring-gray-700">
                        {row.original.team.members.length - 3}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="text-xs text-gray-200">
                  {row.original.team.members.length} members
                </div>
              </div>
            )}
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

const LeaderboardPuzzlesTableMobileSubComponent: FC<{ data: PuzzleSolver }> = ({ data }) => {
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

export default LeaderboardPuzzlesTableMobile;

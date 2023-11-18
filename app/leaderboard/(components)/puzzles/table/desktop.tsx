'use client';

import { type FC, useMemo } from 'react';

import { getPuzzleRowRoute, type LeaderboardPuzzlesTableInternalProps } from '.';
import type { ColumnDef } from '@tanstack/react-table';
import { Crown, ExternalLink } from 'lucide-react';

import type { PuzzleSolve, PuzzleSolver } from '@/lib/types/protocol';
import { getChainInfo, getTimeLeftString } from '@/lib/utils';

import AddressLinkClient from '@/components/templates/address-link-client';
import ENSAvatarClient from '@/components/templates/ens-avatar-client';
import IdWithChainLogo from '@/components/templates/id-with-chain-logo';
import InfoTooltip from '@/components/templates/info-tooltip';
import PhaseTag from '@/components/templates/phase-tag';
import ProgressBar from '@/components/templates/progress-bar';
import UserHoverCard from '@/components/templates/user-hover-card';
import { IconButton, Table } from '@/components/ui';

const LeaderboardPuzzlesTableDesktop: FC<LeaderboardPuzzlesTableInternalProps> = ({
  data,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<PuzzleSolver>[] = useMemo(
    () => [
      {
        accessorKey: 'rank',
        header: () => 'Rank',
        cell: ({ row }) => row.original.rank,
        footer: (props) => props.column.id,
        size: 55,
      },
      {
        accessorKey: 'solver',
        header: () => 'Player',
        cell: ({ row }) => (
          /* TODO: teams UI */
          <div className="flex items-center gap-3.5">
            <div className="overflow-hidden rounded-full">
              <ENSAvatarClient
                nameOrAddress={row.original.solverEnsName ?? row.original.solver}
                size={40}
                prefetchedEnsAvatar={row.original.solverEnsAvatar}
              />
            </div>
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
          </div>
        ),
        footer: (props) => props.column.id,
        size: 182,
      },
      {
        accessorKey: 'count.phase0',
        header: () => 'Breakdown',
        cell: ({ row }) =>
          `${row.original.count.phase0} / ${row.original.count.phase1} / ${row.original.count.phase2}`,
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        accessorKey: 'speedScore',
        header: () => (
          <div className="flex items-center space-x-1">
            <div>Speed score</div>
            <InfoTooltip term="SPEED_SCORE" />
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-1">
              <span>{row.original.speedScore}</span>
              <ProgressBar
                value={row.original.speedScore}
                total={100}
                aria-label={`${row.original.solver}'s speed score: ${row.original.speedScore}.`}
              />
            </div>
          );
        },
        footer: (props) => props.column.id,
        size: 160,
      },
      {
        accessorKey: 'count.total',
        header: () => 'Puzzles solved',
        cell: ({ row }) => row.original.count.total,
        footer: (props) => props.column.id,
        size: 105,
      },
      {
        accessorKey: 'points',
        header: () => (
          <div className="ml-auto flex items-center gap-1">
            <div>Points</div>
            <InfoTooltip term="POINTS" />
          </div>
        ),
        cell: ({ row }) => <div className="text-right">{row.original.points}</div>,
        footer: (props) => props.column.id,
        size: 65,
      },
      {
        accessorKey: 'accordion',
        cell: ({ row }) => <Table.AccordionButton row={row} />,
        header: () => 'Expand',
        footer: (props) => props.column.id,
        size: 75,
      },
    ],
    [],
  );

  return (
    <Table
      className="hidden md:block"
      columns={columns}
      data={data}
      sorting={sorting}
      setSorting={setSorting}
      renderSubComponent={({ row }) => (
        <LeaderboardPuzzlesTableDesktopSubComponent data={row.original.solves} />
      )}
      topRounded={false}
      noBorder
    />
  );
};

const LeaderboardPuzzlesTableDesktopSubComponent: FC<{ data: PuzzleSolve[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<PuzzleSolve>[]>(
    () => [
      {
        accessorKey: 'puzzle.addedTimestamp',
        header: () => 'ID',
        cell: ({ row }) => (
          <IdWithChainLogo id={row.original.puzzleId} chainId={row.original.chainId} />
        ),
        footer: (props) => props.column.id,
        size: 55,
      },
      {
        accessorKey: 'puzzle.name',
        header: () => 'Puzzle',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col items-start justify-center">
              <div>
                {row.original.puzzle
                  ? row.original.puzzle.name
                  : `Puzzle #${row.original.puzzleId}`}
              </div>
              {row.original.puzzle ? (
                <UserHoverCard
                  address={row.original.puzzle.author.address}
                  trigger={
                    <AddressLinkClient
                      className="mt-0.5 text-xs text-gray-200"
                      address={row.original.puzzle.author.address}
                      prefetchedEnsName={row.original.solverEnsName}
                    />
                  }
                />
              ) : null}
            </div>
          );
        },
        footer: (props) => props.column.id,
        size: 182,
      },
      {
        accessorKey: 'firstSolveTime',
        header: () => 'Time taken',
        cell: ({ row }) => (
          <div title={new Date(1000 * row.original.solveTimestamp).toString()}>
            {getTimeLeftString(
              row.original.solveTimestamp - (row.original.puzzle?.addedTimestamp ?? 0),
            )}
          </div>
        ),
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        accessorKey: 'rank',
        header: () => (
          <div className="flex items-center space-x-1">
            <div>Puzzle rank</div>
            <InfoTooltip term="PUZZLE_RANK" />
          </div>
        ),
        cell: ({ row }) => {
          const rank = row.original.rank;
          const total = row.original.puzzle?.numberSolved ?? 0;

          return (
            <div className="flex w-fit flex-col">
              <div className="mb-0.5 flex">
                <span className="mr-1 text-gray-100">{rank}</span>
                <span className="text-sm text-gray-200">/ {total}</span>
                <div className="grow" />
                {row.original.phase === 0 ? <Crown className="h-4 w-4 text-gold" /> : null}
              </div>
              <ProgressBar
                value={total - rank}
                total={total - 1}
                aria-label={`${row.original.solver} ranked ${row.original.rank}.`}
              />
            </div>
          );
        },
        footer: (props) => props.column.id,
        size: 160,
      },
      {
        accessorKey: 'phase',
        header: () => 'Phase solved',
        cell: ({ row }) => {
          return <PhaseTag phase={row.original.phase} isPinging={row.original.phase < 3} />;
        },
        footer: (props) => props.column.id,
        size: 105,
      },
      {
        accessorKey: 'points',
        header: () => <div className="ml-auto">Points</div>,
        cell: ({ row }) => <div className="text-right">{3 - row.original.phase}</div>,
        footer: (props) => props.column.id,
        size: 65,
      },
      {
        accessorKey: 'solveTx',
        header: () => 'Solution',
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <IconButton
                variant="outline"
                intent="neutral"
                title={`https://${getChainInfo(row.original.chainId).blockExplorer}/tx/${
                  row.original.solveTx
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://${getChainInfo(row.original.chainId).blockExplorer}/tx/${
                      row.original.solveTx
                    }`,
                    '_blank',
                  );
                }}
                aria-label={`View ${row.original.solver}'s solution of puzzle ${row.original.puzzleId} on chain ${row.original.chainId}.`}
              >
                <ExternalLink />
              </IconButton>
            </div>
          );
        },
        footer: (props) => props.column.id,
        size: 75,
      },
    ],
    [],
  );

  return (
    <Table columns={columns} data={data} getRowRoute={getPuzzleRowRoute} isSubTable noBorder />
  );
};

export default LeaderboardPuzzlesTableDesktop;

import { notFound } from 'next/navigation';

import PuzzleHeader from './(components)/header';

import { fetchPuzzleById } from '@/lib/utils';

import { CodeBlock } from '@/components/ui';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  // Return 404 if `id` is not a number.
  if (isNaN(id)) return notFound();

  const { data: puzzle, error } = await fetchPuzzleById(id);

  // Return 404 if `puzzle` is `null` or there was an `error` in fetching the
  // data.
  if (!puzzle || error) return notFound();

  return (
    <div className="flex flex-col">
      <PuzzleHeader puzzle={puzzle} />
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:gap-6">
        <CodeBlock fileName="Puzzle.sol" className="max-h-[41.25rem] grow" language="solidity">
          {puzzle.solidity ?? ''}
        </CodeBlock>
        {/* <div className="h-fit w-full justify-center rounded-[1.25rem] border border-stroke bg-gray-600 md:min-w-[20rem] md:max-w-[20rem]">
          <div className="flex flex-col items-center p-4">
            <a
              className={clsx(
                'relative flex w-full flex-col justify-center rounded-lg py-2.5',
                puzzle.firstSolver
                  ? 'cursor-pointer bg-tw-green'
                  : 'pointer-events-none cursor-default bg-gray-350',
              )}
              href={`https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/tx/${puzzle.solveTx}`}
              target="_blank"
              rel="noreferrer"
            >
              {puzzle.firstSolver ? (
                <ExternalLink className="absolute right-2 top-2 h-3 w-3 text-black/50" />
              ) : null}
              <div
                className={clsx(
                  'text-center text-sm',
                  puzzle.firstSolver ? 'text-black/50' : 'text-gray-150',
                )}
              >
                First Blood
              </div>
              {puzzle.firstSolver ? (
                <AddressLink
                  className="text-center text-2xl font-medium text-gray-50 hover:text-gray-50"
                  address={puzzle.firstSolver}
                />
              ) : (
                <div className="text-center text-2xl font-medium text-gray-50">—</div>
              )}
            </a>

            <div className="mt-2 w-full space-y-2 text-sm">
              <div className="flex justify-between">
                <div className="text-gray-200">Solve Time</div>
                <div className="text-gray-100">
                  {puzzle.solveTime ? getTimeLeftString(puzzle.solveTime) : '-'}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-200">Total Solves</div>
                <div className="text-gray-100">{puzzle.numberSolved}</div>
              </div>
            </div>
          </div>
          <hr className="w-full border-t border-stroke" role="separator" />
          <div className="flex flex-col items-center p-4">
            <a
              className={clsx(
                'relative flex w-full flex-col justify-center rounded-lg py-2.5',
                puzzle.firstSolver
                  ? 'cursor-pointer bg-tw-green'
                  : 'pointer-events-none cursor-default bg-gray-350',
              )}
              href={`https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/tx/${puzzle.solveTx}`}
              target="_blank"
              rel="noreferrer"
            >
              {puzzle.firstSolver ? (
                <ExternalLink className="absolute right-2 top-2 h-3 w-3 text-black/50" />
              ) : null}
              <div
                className={clsx(
                  'text-center text-sm',
                  puzzle.firstSolver ? 'text-black/50' : 'text-gray-150',
                )}
              >
                First Blood
              </div>
              {puzzle.firstSolver ? (
                <AddressLink
                  className="text-center text-2xl font-medium text-gray-50 hover:text-gray-50"
                  address={puzzle.firstSolver}
                />
              ) : (
                <div className="text-center text-2xl font-medium text-gray-50">—</div>
              )}
            </a>

            <div className="mt-2 w-full space-y-2 text-sm">
              <div className="flex justify-between">
                <div className="text-gray-200">Solve Time</div>
                <div className="text-gray-100">{puzzle.solveTime ? 'puzzle.solveTime' : '-'}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-200">Total Solves</div>
                <div className="text-gray-100">{puzzle.numberSolved}</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

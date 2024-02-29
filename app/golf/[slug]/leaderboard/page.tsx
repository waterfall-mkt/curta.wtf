import { notFound } from 'next/navigation';

import CourseLeaderboardDataTable from './(components)/data-table';

import { fetchCourseLeaderboardById, getChainIdAndId } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: { params: { slug: string } }) {
  const ids = getChainIdAndId(params.slug, 8453);

  // Return 404 if `slug` is an invalid format.
  if (!ids) return notFound();

  const { chainId, id } = ids;

  const solves = await fetchCourseLeaderboardById(id, chainId);

  const normalizedSlug = decodeURIComponent(params.slug.toLowerCase());

  return (
    <div
      id={`content-/golf/${normalizedSlug}/leaderboard`}
      className="mx-auto mt-4 flex max-w-[90rem] flex-col gap-4 px-4 md:gap-6 lg:px-20"
      role="tabpanel"
      aria-labelledby={`trigger-/golf/${normalizedSlug}/leaderboard`}
    >
      <CourseLeaderboardDataTable data={solves} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 300;

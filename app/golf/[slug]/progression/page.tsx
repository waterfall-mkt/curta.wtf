import { notFound } from 'next/navigation';

import CourseProgressionTable from './(components)/table';

import { fetchCourseLeadingSolvesById, getChainIdAndId } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: { params: { slug: string } }) {
  const ids = getChainIdAndId(params.slug);

  // Return 404 if `slug` is an invalid format.
  if (!ids) return notFound();

  const { chainId, id } = ids;

  const { data: solves } = await fetchCourseLeadingSolvesById(id, chainId);

  const normalizedSlug = decodeURIComponent(params.slug.toLowerCase());

  // sleep 100 seconds
  await new Promise((resolve) => setTimeout(resolve, 100000));
  return (
    <div
      id={`content-/golf/${normalizedSlug}/progression`}
      className="mx-auto mt-4 flex max-w-[90rem] flex-col gap-4 px-4 md:gap-6 lg:px-20"
      role="tabpanel"
      aria-labelledby={`trigger-/golf/${normalizedSlug}/progression`}
    >
      <CourseProgressionTable data={solves} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 300;

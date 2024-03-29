import { notFound } from 'next/navigation';

import CourseInfo from './(components)/info';
import CourseProblemDisplay from './(components)/problem-display';

import { fetchCourseById, getChainIdAndId } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: { params: { slug: string } }) {
  const ids = getChainIdAndId(params.slug, 8453);

  // Return 404 if `slug` is an invalid format.
  if (!ids) return notFound();

  const { chainId, id } = ids;

  const course = await fetchCourseById(id, chainId);

  // Return 404 if `course` is `null`.
  if (!course) return notFound();

  const languages = ['Bytecode']
    .concat(course.solidity ? ['Solidity'] : [])
    .concat(course.huff ? ['Huff'] : []);

  const normalizedSlug = decodeURIComponent(params.slug.toLowerCase());

  return (
    <div
      id={`content-/golf/${normalizedSlug}`}
      className="mx-auto mt-4 flex max-w-[90rem] flex-col gap-4 px-4 md:flex-row md:gap-6 lg:px-20"
      role="tabpanel"
      aria-labelledby={`trigger-/golf/${normalizedSlug}`}
    >
      <CourseProblemDisplay course={course} languages={languages} />
      <CourseInfo course={course} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 300;

import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import CourseHeader from './(components)/header';
import CourseTabs from './(components)/tabs-nav';

import { fetchCourseById, getChainIdAndId } from '@/lib/utils';

import ContainerLayout from '@/components/layouts/container';

export default async function CourseLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) {
  const ids = getChainIdAndId(params.slug);

  // Return 404 if `slug` is an invalid format.
  if (!ids) return notFound();

  const { chainId, id } = ids;

  const { data: course, error } = await fetchCourseById(id, chainId);

  // Return 404 if `puzzle` is `null` or there was an `error` in fetching the
  // data.
  if (!course || error) return notFound();

  return (
    <ContainerLayout className="max-w-none px-0 pt-4 lg:px-0 lg:pt-6">
      <CourseHeader course={course} />
      <CourseTabs slug={params.slug}>{children}</CourseTabs>
    </ContainerLayout>
  );
}

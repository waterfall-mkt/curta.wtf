import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import CourseHeader from './(components)/header';
import CourseTabs from './(components)/tabs-nav';

import { fetchCourseById, getChainIdAndId } from '@/lib/utils';

import ContainerLayout from '@/components/layouts/container';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const description = 'A king-of-the-hill style competition, where players optimize gas challenges.';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const ids = getChainIdAndId(params.slug, 8453);
  // Return empty object if `slug` is an invalid format.
  if (!ids) return {};

  const { data: course } = await fetchCourseById(ids.id, ids.chainId);
  if (!course) return {};

  const title = `Golf Course #${course.id}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Curta`,
      description,
      siteName: 'curta.wtf',
      url: 'https://curta.wtf',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Curta`,
      description,
      site: '@curta_ctf',
      siteId: '1604186457165406210',
      creator: '@waterfall_mkt',
      creatorId: '1466508083929223176',
    },
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function CourseLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) {
  const ids = getChainIdAndId(params.slug, 8453);

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
      <CourseTabs
        slug={params.slug}
        hasDescription={course.description ? course.description.length > 0 : false}
      >
        {children}
      </CourseTabs>
    </ContainerLayout>
  );
}

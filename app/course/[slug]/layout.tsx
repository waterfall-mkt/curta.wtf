import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { getChainIdAndId } from '@/lib/utils';

import ContainerLayout from '@/components/layouts/container';

export default function CourseLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) {
  const ids = getChainIdAndId(params.slug);

  // Return 404 if `slug` is an invalid format.
  if (!ids) return notFound();

  return (
    <ContainerLayout className="max-w-none px-0 pt-4 lg:px-0 lg:pt-6">{children}</ContainerLayout>
  );
}

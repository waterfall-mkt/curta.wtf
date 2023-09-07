'use client';

import ErrorLayout from '@/components/layouts/error';

export default function ErrorPage({ error }: { error: Error }) {
  console.error(error);

  return <ErrorLayout statusCode={501} />;
}

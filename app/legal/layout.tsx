'use client';

import type { ReactNode } from 'react';

import ContainerLayout from '@/components/layouts/container';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <ContainerLayout>
      <article className="prose mx-auto max-w-[60rem] grow dark:prose-invert">{children}</article>
    </ContainerLayout>
  );
}

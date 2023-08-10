import type { ReactNode } from 'react';

import 'katex/dist/katex.min.css';

import { DOCS_PAGES } from '@/lib/constants/site';

import DocsContainerLayout from '@/components/layouts/docs-container';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsContainerLayout sections={DOCS_PAGES}>{children}</DocsContainerLayout>;
}
import type { ReactNode } from 'react';

import 'katex/dist/katex.min.css';

import { GUIDES_PAGES } from '@/lib/constants/site';

import DocsContainerLayout from '@/components/layouts/docs-container';

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return <DocsContainerLayout sections={GUIDES_PAGES}>{children}</DocsContainerLayout>;
}

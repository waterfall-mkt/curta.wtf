import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import 'katex/dist/katex.min.css';

import { DOCS_PAGES } from '@/lib/constants/site';

import DocsContainerLayout from '@/components/layouts/docs-container';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: {
    template: '%s | Curta Docs',
    default: 'Curta Docs',
  },
  keywords: ['ethereum', 'blockchain', 'ctf', 'on-chain', 'security', 'puzzle', 'game', 'nft'],
  themeColor: '#0D1017',
  colorScheme: 'dark',
  manifest: '/manifest.json',
};

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <DocsContainerLayout sections={DOCS_PAGES}>{children}</DocsContainerLayout>;
}

import type { Metadata } from 'next';
import { Fragment } from 'react';

import { getBaseMetadata } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = getBaseMetadata({
  title: 'Terms of Service',
  description: 'See our terms of our service and how they relate to you.',
});

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

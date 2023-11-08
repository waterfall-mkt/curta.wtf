import type { ReactNode } from 'react';

import ContainerLayout from '@/components/layouts/container';

export default function PuzzleLayout({ children }: { children: ReactNode }) {
  return <ContainerLayout>{children}</ContainerLayout>;
}

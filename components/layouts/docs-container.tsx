import type { FC, ReactNode } from 'react';

import type { Page } from '@/lib/types/site';

import DocsNavBar from '@/components/common/docs-nav-bar';
import DocsPageNav from '@/components/common/docs-page-nav';
import ContainerLayout from '@/components/layouts/container';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DocsContainerLayoutProps = {
  sections: { name: string; pages: Page[] }[];
  children: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DocsContainerLayout: FC<DocsContainerLayoutProps> = ({ sections, children }) => {
  return (
    <ContainerLayout className="flex flex-col space-x-0 px-0 pt-0 md:flex-row md:space-x-16 md:px-20 md:pb-16 md:pt-12">
      <DocsNavBar sections={sections} />
      <article className="prose mx-auto max-w-none grow px-4 dark:prose-invert md:px-0">
        {children}
        <hr className="mb-6 mt-6 w-full rounded-full border-stroke md:mt-12" role="separator" />
        <DocsPageNav sections={sections} />
      </article>
    </ContainerLayout>
  );
};

export default DocsContainerLayout;
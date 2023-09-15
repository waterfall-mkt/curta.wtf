import type { FC, ReactNode } from 'react';

import type { Page } from '@/lib/types/site';

import DocsNavBar from '@/components/common/docs-nav-bar';
import DocsPageNav from '@/components/common/docs-page-nav';
import ContainerLayout from '@/components/layouts/container';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DocsContainerLayoutProps = {
  sections: { name: string; groups: ({ name: string; pages: Page[] } | Page)[] }[];
  children: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DocsContainerLayout: FC<DocsContainerLayoutProps> = ({ sections, children }) => {
  return (
    <ContainerLayout className="flex flex-col space-x-0 px-0 pt-0 lg:flex-row lg:space-x-16 lg:px-20 lg:pb-16 lg:pt-12">
      <DocsNavBar sections={sections} />
      <article className="prose mx-auto max-w-none grow px-4 dark:prose-invert prose-h1:mb-4 prose-h1:text-3xl prose-h1:font-semibold prose-h1:tracking-tight prose-h1:text-gray-50 prose-h2:mb-2 prose-h2:mt-6 prose-h2:text-xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:text-gray-50 prose-h3:mb-2 prose-h3:mt-5 prose-h3:text-lg prose-h3:font-semibold prose-h3:tracking-tight prose-h3:text-gray-50 prose-strong:font-medium prose-strong:text-gray-50 prose-th:py-[1px] prose-img:my-2 prose-h1:md:text-4xl prose-h2:md:mb-4 prose-h2:md:mt-12 prose-h2:md:text-2xl prose-h3:md:mb-4 prose-h3:md:mt-6 prose-h3:md:text-xl prose-img:md:my-4 lg:px-0">
        {children}
        <hr className="mb-6 mt-6 w-full rounded-full border-stroke lg:mt-12" role="separator" />
        <DocsPageNav sections={sections} />
      </article>
    </ContainerLayout>
  );
};

export default DocsContainerLayout;

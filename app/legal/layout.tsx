import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import ContainerLayout from '@/components/layouts/container';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContainerLayout>
      <article
        className={twMerge(
          clsx(
            'prose prose-gray mx-auto w-full flex-grow text-gray-100',
            'prose-h1:mb-4 prose-h1:text-3xl prose-h1:font-semibold prose-h1:tracking-tight prose-h1:text-gray-50',
            'prose-h2:mb-2 prose-h2:mt-6 prose-h2:text-xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:text-gray-50',
            'prose-h3:mb-2 prose-h3:mt-5 prose-h3:text-lg prose-h3:font-semibold prose-h3:tracking-tight prose-h3:text-gray-50',
            'prose-h4:mb-2 prose-h4:mt-5 prose-h4:text-base prose-h4:font-semibold prose-h4:tracking-tight prose-h4:text-gray-50',
            // eslint-disable-next-line quotes
            "prose-p:before:content-[''] prose-p:after:content-['']",
            'prose-a:text-primary-color',
            'prose-strong:font-medium prose-strong:text-gray-50',
            'prose-img:my-2 prose-video:my-0',
            'prose-h1:md:text-4xl prose-h2:md:mb-4 prose-h2:md:mt-8 prose-h2:md:text-2xl prose-h3:md:mb-4 prose-h3:md:mt-6 prose-h3:md:text-xl',
            'prose-img:md:my-4 [&>*:nth-child(4)]:mt-0',
            'prose-li:marker:text-gray-200',
          ),
        )}
      >
        {children}
      </article>
    </ContainerLayout>
  );
}

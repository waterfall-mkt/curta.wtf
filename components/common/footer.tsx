import { type FC, Fragment } from 'react';

import { FOOTER_PAGES, SOCIAL_LINKS } from '@/lib/constants/site';

import { Button, IconButton } from '@/components/ui';

const Footer: FC = () => {
  return (
    <div className="flex flex-col gap-4 border-t border-stroke px-4 py-6 lg:flex-row lg:justify-between lg:gap-0 lg:px-10">
      {/* Navigation */}
      <div>
        <div className="text-center text-lg font-semibold tracking-tighter text-gray-50 lg:text-start">
          Waterfall
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 lg:-ml-4 lg:mt-4 lg:justify-start lg:gap-4 lg:space-x-4">
          {FOOTER_PAGES.map((page) => (
            <Fragment key={page.slug}>
              <Button
                href={page.slug}
                size="lg"
                variant="text"
                intent="neutral"
                newTab={page.slug[0] !== '/'}
                className="hidden lg:flex"
              >
                {page.name}
              </Button>
              <Button
                href={page.slug}
                size="md"
                variant="text"
                intent="neutral"
                newTab={page.slug[0] !== '/'}
                className="lg:hidden"
              >
                {page.name}
              </Button>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Socials */}
      <div className="flex flex-col justify-end">
        <div className="flex justify-center text-sm font-book text-gray-200 lg:justify-end">
          Follow us
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 lg:-mr-2.5 lg:mt-4">
          {SOCIAL_LINKS.map((social) => (
            <Fragment key={social.name}>
              <IconButton
                className="hidden lg:flex"
                href={social.href}
                size="lg"
                variant="text"
                intent="neutral"
                newTab={social.href[0] !== '/'}
              >
                {social.icon}
              </IconButton>
              <IconButton
                className="lg:hidden"
                href={social.href}
                size="md"
                variant="text"
                intent="neutral"
                newTab={social.href[0] !== '/'}
              >
                {social.icon}
              </IconButton>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

Footer.displayName = 'Footer';

export default Footer;

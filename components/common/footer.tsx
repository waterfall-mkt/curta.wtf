import type { FC } from 'react';

import { FOOTER_PAGES, SOCIAL_LINKS } from '@/lib/constants/site';

import { Button, IconButton } from '@/components/ui';

const Footer: FC = () => {
  return (
    <div className="flex flex-col space-y-5 border-t border-stroke px-3 py-6 lg:flex-row lg:justify-between lg:space-y-0">
      {/* Navigation */}
      <div>
        <h1 className="text-center text-lg text-white lg:pl-7 lg:text-start">Waterfall</h1>
        <div className="mt-3 flex items-center justify-center space-x-3 lg:justify-start lg:space-x-4 lg:pl-3">
          {FOOTER_PAGES.map((page) => (
            <Button
              key={page.slug}
              href={page.slug}
              variant="text"
              intent="neutral"
              className="px-2 text-xs lg:px-4 lg:text-lg"
              newTab={page.slug[0] !== '/'}
            >
              {page.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Socials */}
      <div className="flex flex-col justify-end">
        <h1 className="flex justify-center text-sm font-book text-gray-200 lg:justify-end lg:pr-7">
          Follow us
        </h1>
        <div className="mt-2.5 flex items-center justify-center space-x-3 lg:mt-[1.125rem] lg:pr-5">
          {SOCIAL_LINKS.map((social) => (
            <IconButton
              key={social.name}
              href={social.href}
              variant="text"
              intent="neutral"
              newTab={social.href[0] !== '/'}
            >
              {social.icon}
            </IconButton>
          ))}
        </div>
      </div>
    </div>
  );
};

Footer.displayName = 'Footer';

export default Footer;

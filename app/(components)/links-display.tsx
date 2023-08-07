import { type FC, useId } from 'react';

import { getShortenedAddress } from '@/lib/utils';

import PillLinkButton from '@/components/templates/pill-link-button';

const LinksDisplay: FC = () => {
  const id = useId();

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm font-book text-gray-200">
        Links
      </label>
      <div id={id} className="flex flex-row space-x-2 sm:flex-col sm:space-x-0 sm:space-y-1">
        <PillLinkButton
          site="github"
          label="waterfall-mkt/curta"
          href="https://github.com/waterfall-mkt/curta"
        />
        <PillLinkButton
          site="etherscan"
          label={getShortenedAddress(process.env.NEXT_PUBLIC_CURTA_ADDRESS)}
          href={`https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${process.env.NEXT_PUBLIC_CURTA_ADDRESS}`}
        />
      </div>
    </div>
  );
};

export default LinksDisplay;

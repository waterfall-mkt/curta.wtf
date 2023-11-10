import { type FC, useId } from 'react';

import { getBlockExplorerDomain, getPuzzlesAddress, getShortenedAddress } from '@/lib/utils';

import PillLinkButton from '@/components/templates/pill-link-button';

const LinksDisplay: FC = () => {
  const id = useId();

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm font-book text-gray-200">
        Links
      </label>
      <div id={id} className="flex flex-row space-x-2 sm:flex-col sm:space-x-0 sm:space-y-1">
        <PillLinkButton site="github" href="https://github.com/waterfall-mkt/curta">
          waterfall-mkt/curta
        </PillLinkButton>
        <PillLinkButton
          site="etherscan"
          // Always show Curta Puzzles on Ethereum
          href={`https://${getBlockExplorerDomain(1)}/address/${getPuzzlesAddress(1)}`}
        >
          {getShortenedAddress(getPuzzlesAddress(1))}
        </PillLinkButton>
      </div>
    </div>
  );
};

export default LinksDisplay;

import { getChainInfo, getShortenedAddress } from '@/lib/utils';

import PillLinkButton from '@/components/templates/pill-link-button';

const LinksDisplay: React.FC = () => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-book text-gray-200">Links</label>
      <div className="flex flex-row space-x-2 sm:flex-col sm:space-x-0 sm:space-y-1">
        <PillLinkButton site="github" href="https://github.com/waterfall-mkt/curta">
          waterfall-mkt/curta
        </PillLinkButton>
        <PillLinkButton
          site="etherscan"
          // Always show Curta Puzzles on Ethereum
          href={`https://${getChainInfo(1).blockExplorer}/address/${getChainInfo(1).puzzles}`}
        >
          {getShortenedAddress(getChainInfo(1).puzzles)}
        </PillLinkButton>
      </div>
    </div>
  );
};

export default LinksDisplay;

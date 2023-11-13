import type { FC } from 'react';

import { getChainInfo } from '@/lib/utils';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type IdWithChainLogoProps = {
  id: number;
  chainId: number;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const IdWithChainLogo: FC<IdWithChainLogoProps> = ({ id, chainId }) => {
  const Logo = getChainInfo(chainId).logo;

  return (
    <div className="flex items-center space-x-1.5">
      <span className="text-sm text-gray-100">{id}</span>
      <Logo className="h-3.5 w-3.5 text-gray-200" />
    </div>
  );
};

export default IdWithChainLogo;

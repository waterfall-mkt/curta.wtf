import type { FC } from 'react';

import LogoIcon from '@/components/common/logo-icon';

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
  // Default to Ethereum logo
  const Logo = chainId === 8453 ? LogoIcon.Base : LogoIcon.Ethereum;

  return (
    <div className="flex items-center space-x-1.5">
      <span className="text-sm text-gray-100">{id}</span>
      <Logo className="h-3.5 w-3.5 text-gray-200" />
    </div>
  );
};

export default IdWithChainLogo;

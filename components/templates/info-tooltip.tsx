import type { FC, ReactNode } from 'react';

import { HelpCircle } from 'lucide-react';

import { GLOSSARY } from '@/lib/constants/glossary';

import { Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type InfoTooltipProps = {
  term: keyof typeof GLOSSARY;
  children?: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const InfoTooltip: FC<InfoTooltipProps> = ({ term, children }) => {
  return (
    <Tooltip content={GLOSSARY[term]}>
      {children ? <HelpCircle className="h-4 w-4 text-gray-200" /> : null}
    </Tooltip>
  );
};

InfoTooltip.displayName = 'InfoTooltip';

export default InfoTooltip;

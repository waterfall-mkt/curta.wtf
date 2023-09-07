import type { FC } from 'react';

import { HelpCircle } from 'lucide-react';

import { GLOSSARY } from '@/lib/constants/glossary';

import { Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type InfoTooltipProps = {
  term: keyof typeof GLOSSARY;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const InfoTooltip: FC<InfoTooltipProps> = ({ term }) => {
  return (
    <Tooltip content={GLOSSARY[term]}>
      <span>
        <HelpCircle className="h-4 w-4 text-gray-200" />
      </span>
    </Tooltip>
  );
};

InfoTooltip.displayName = 'InfoTooltip';

export default InfoTooltip;

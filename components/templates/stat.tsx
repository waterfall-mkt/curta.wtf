import type { FC, ReactNode } from 'react';

import InfoTooltip from './info-tooltip';

import { GLOSSARY } from '@/lib/constants/glossary';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type StatProps = {
  name: string;
  value: ReactNode;
  term?: keyof typeof GLOSSARY;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Stat: FC<StatProps> = ({ name, value, term }) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center space-x-1.5">
        <div className="flex items-center space-x-1 text-xs text-gray-200">
          <div>{name}</div>
          {term ? <InfoTooltip term={term} /> : null}
        </div>
      </div>
      <div className="text-sm text-gray-100">{value}</div>
    </div>
  );
};

export default Stat;

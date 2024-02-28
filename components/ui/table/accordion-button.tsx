'use client';

import { TableAccordionButtonProps } from './types';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const TableAccordionButton = <T,>({ row }: TableAccordionButtonProps<T>) => {
  const handleClick = (e: React.MouseEvent) => {
    row.toggleExpanded();
    e.stopPropagation();
  };

  return (
    <IconButton
      className="ml-auto"
      variant="outline"
      intent="neutral"
      onClick={(e) => handleClick(e)}
      disabled={!row.getCanExpand()}
      aria-label="Expand row."
    >
      {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
    </IconButton>
  );
};

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

TableAccordionButton.displayName = 'TableAccordionButton';

export default TableAccordionButton;

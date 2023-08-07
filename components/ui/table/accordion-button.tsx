'use client';

import type { MouseEvent } from 'react';

import { TableAccordionButtonProps } from './types';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { IconButton } from '@/components/ui';

const TableAccordionButton = <T,>({ row }: TableAccordionButtonProps<T>) => {
  const handleClick = (e: MouseEvent) => {
    row.toggleExpanded();
    e.stopPropagation();
  };

  return (
    <IconButton
      className="ml-auto"
      size="sm"
      variant="secondary"
      intent="neutral"
      onClick={(e) => handleClick(e)}
      disabled={!row.getCanExpand()}
      aria-label="Expand row."
    >
      {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
    </IconButton>
  );
};

TableAccordionButton.displayName = 'TableAccordionButton';

export default TableAccordionButton;

'use client';

import { forwardRef } from 'react';

import { tableButtonVariants } from './styles';
import type { TableButtonProps } from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const TableButton = forwardRef(
  (
    { className, disabled, onClick, children, ...rest }: TableButtonProps,
    forwardRef: React.ForwardedRef<HTMLButtonElement>,
  ) => (
    <button
      ref={forwardRef}
      className={twMerge(clsx(tableButtonVariants({ disabled }), className))}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick ? onClick(e) : null;
      }}
      {...rest}
    >
      {children}
    </button>
  ),
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

TableButton.displayName = 'TableButton';

export default TableButton;

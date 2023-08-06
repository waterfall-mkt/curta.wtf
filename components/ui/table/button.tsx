'use client';

import { forwardRef, type Ref } from 'react';

import { tableButtonVariants } from './styles';
import type { TableButtonProps } from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const TableButton = forwardRef(
  (
    { className, disabled, onClick, children, ...rest }: TableButtonProps,
    forwardRef: Ref<HTMLButtonElement>,
  ) => {
    return (
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
    );
  },
);

TableButton.displayName = 'TableButton';

export default TableButton;

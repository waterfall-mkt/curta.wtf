import type { ReactNode } from 'react';

import { inputVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

export type InputVariantProps = VariantProps<typeof inputVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type InputProps = Omit<JSX.IntrinsicElements['input'], 'size'> &
  InputVariantProps & {
    label?: string;
    errorMessage?: string;
    numeric?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    currencyType?: string;
  };

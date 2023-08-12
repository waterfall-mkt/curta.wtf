import type { FC, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { inputVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// Types
// ---------------------------------------–-------------------------------------

export type InputType = ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>> &
  InputComposition;

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

export type InputVariantProps = VariantProps<typeof inputVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type InputDatePickerProps = Omit<InputProps, 'type' | 'inputMode'>;

export type InputProps = Omit<JSX.IntrinsicElements['input'], 'size'> &
  InputVariantProps & {
    label?: string;
    errorMessage?: string;
    numeric?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    currencyType?: string;
  };

// ---------------------------------------–-------------------------------------
// Composition
// ---------------------------------------–-------------------------------------

export type InputComposition = {
  DatePicker: FC<InputDatePickerProps>;
};

import type { ReactNode } from 'react';

import { inputIconContainerVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

export type InputIconContainerVariantProps = Required<
  Pick<VariantProps<typeof inputIconContainerVariants>, 'position'>
>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type InputIconContainerProps = InputIconContainerVariantProps & {
  className?: string;
  children: ReactNode;
};

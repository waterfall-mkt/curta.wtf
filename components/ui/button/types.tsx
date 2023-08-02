import { buttonSizeVariants, buttonVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

/* Variant Props */
export type ButtonSizeVariantProps = VariantProps<typeof buttonSizeVariants>;

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

/* Component Props */
export type ButtonProps = JSX.IntrinsicElements['button'] &
  ButtonSizeVariantProps &
  ButtonVariantProps & {
    href?: string;
    newTab?: boolean;
    isIcon?: boolean;
  };

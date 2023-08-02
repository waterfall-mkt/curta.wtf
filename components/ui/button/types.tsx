import { buttonVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

/* Variant Props */
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

/* Component Props */
export type ButtonProps = JSX.IntrinsicElements['button'] &
  ButtonVariantProps & {
    href?: string;
    newTab?: boolean;
  };

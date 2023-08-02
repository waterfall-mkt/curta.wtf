import type { FC } from 'react';

import { cardBodyVariants, cardHeaderVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

/* Variant Props */
export type CardBodyVariantProps = VariantProps<typeof cardBodyVariants>;

export type CardHeaderVariantProps = VariantProps<typeof cardHeaderVariants>;

/* Component Props */
export type CardBodyProps = JSX.IntrinsicElements['div'] & CardBodyVariantProps;

export type CardFooterProps = JSX.IntrinsicElements['div'];

export type CardHeaderProps = JSX.IntrinsicElements['div'] & CardHeaderVariantProps;

export type CardProps = JSX.IntrinsicElements['div'];

/* Composition */
export type CardComposition = {
  Body: FC<CardBodyProps>;
  Footer: FC<CardFooterProps>;
  Header: FC<CardHeaderProps>;
};

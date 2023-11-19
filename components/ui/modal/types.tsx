import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

import { modalContentVariants, modalHeaderVariants } from './styles';
import * as ModalPrimitive from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';

import type { CardBodyProps, CardProps } from '@/components/ui/card/types';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

export type ModalContentVariantProps = VariantProps<typeof modalContentVariants>;

export type ModalHeaderVariantProps = VariantProps<typeof modalHeaderVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type ModalBodyProps = CardBodyProps;

export type ModalCloseProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Close>;

export type ModalContentProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Content> &
  ModalContentVariantProps & {
    cardProps?: Omit<CardProps, 'className'>;
    overlayProps?: ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>;
    portalProps?: ComponentPropsWithoutRef<typeof ModalPrimitive.Portal>;
    description?: string;
  };

export type ModalHeaderProps = ModalHeaderVariantProps & {
  children: ReactNode;
};

export type ModalRootProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Root>;

export type ModalTitleProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Title>;

export type ModalTriggerProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Trigger>;

// ---------------------------------------–-------------------------------------
// Composition
// ---------------------------------------–-------------------------------------

export type ModalComposition = {
  Body: FC<ModalBodyProps>;
  Close: FC<ModalCloseProps>;
  Content: FC<ModalContentProps>;
  Header: FC<ModalHeaderProps>;
  Root: FC<ModalRootProps>;
  Title: FC<ModalTitleProps>;
  Trigger: FC<ModalTriggerProps>;
};

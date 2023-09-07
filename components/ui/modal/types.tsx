import type { FC, ReactNode, RefAttributes } from 'react';

import { modalHeaderVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

import type { ButtonProps } from '@/components/ui/button/types';
import type { CardBodyProps, CardProps } from '@/components/ui/card/types';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

export type ModalHeaderVariantProps = VariantProps<typeof modalHeaderVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type ModalBodyProps = CardBodyProps;

export type ModalHeaderProps = ModalHeaderVariantProps & {
  children: ReactNode;
};

export type ModalCloseProps = ButtonProps;

export type ModalContentProps = CardProps & {
  description?: string;
  // Radix UI props
  portalForceMount?: true | undefined;
  portalContainer?: HTMLElement;
  overlayForceMount?: true | undefined;
  forceMount?: true | undefined;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: Event) => void;
  onInteractOutside?: (event: Event) => void;
};

export type ModalPreviousProps = ButtonProps;

export type ModalProps = {
  children: ReactNode;
  // Radix UI props
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};

export type ModalTitleProps = RefAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

export type ModalTriggerProps = {
  children: ReactNode;
  // Radix UI props
  asChild?: boolean;
};

// ---------------------------------------–-------------------------------------
// Composition
// ---------------------------------------–-------------------------------------

export type ModalComposition = {
  Body: FC<ModalBodyProps>;
  Close: FC<ModalCloseProps>;
  Content: FC<ModalContentProps>;
  Header: FC<ModalHeaderProps>;
  Previous: FC<ModalPreviousProps>;
  Title: FC<ModalTitleProps>;
  Trigger: FC<ModalTriggerProps>;
};

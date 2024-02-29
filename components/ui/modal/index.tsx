'use client';

import { forwardRef } from 'react';

import {
  modalCloseStyles,
  modalContentVariants,
  modalHeaderVariants,
  modalOverlayStyles,
} from './styles';
import type {
  ModalBodyProps,
  ModalCloseProps,
  ModalComposition,
  ModalContentProps,
  ModalHeaderProps,
  ModalRootProps,
  ModalTitleProps,
  ModalTriggerProps,
} from './types';
import * as ModalPrimitive from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Card, IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ModalBody: React.FC<ModalBodyProps> = Card.Body;

const ModalClose = forwardRef(
  (props: ModalCloseProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <ModalPrimitive.Close ref={ref} asChild>
      <IconButton
        variant="secondary"
        intent="neutral"
        size="sm"
        className={clsx(modalCloseStyles)}
        aria-label="Close modal"
        {...props}
      >
        <X />
      </IconButton>
    </ModalPrimitive.Close>
  ),
);

const ModalContent: React.FC<ModalContentProps> = ({
  className,
  breakpoint = 'sm',
  description,
  asChild,
  onClick,
  cardProps,
  overlayProps,
  portalProps,
  children,
  ...rest
}) => (
  <ModalPrimitive.Portal {...portalProps}>
    <ModalPrimitive.Overlay className={clsx(modalOverlayStyles)} {...overlayProps} />
    <ModalPrimitive.Content
      onClick={onClick ? onClick : (e) => e.stopPropagation()}
      asChild={asChild}
      {...rest}
    >
      <Card
        className={twMerge(clsx(modalContentVariants({ breakpoint }), 'mx-auto', className))}
        {...cardProps}
      >
        {children}
        <VisuallyHidden.Root>
          <ModalPrimitive.Description>{description ?? 'Modal content'}</ModalPrimitive.Description>
        </VisuallyHidden.Root>
      </Card>
    </ModalPrimitive.Content>
  </ModalPrimitive.Portal>
);

const ModalHeader: React.FC<ModalHeaderProps> = ({ align = 'center', ...rest }) => (
  <Card.Header className={modalHeaderVariants({ align })} {...rest} />
);

const ModalRoot: React.FC<ModalRootProps> = ModalPrimitive.Root;

const ModalTitle: React.FC<ModalTitleProps> = ModalPrimitive.Title;

const ModalTrigger: React.FC<ModalTriggerProps> = ModalPrimitive.Trigger;

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

ModalBody.displayName = 'ModalBody';
ModalClose.displayName = ModalPrimitive.Close.displayName;
ModalContent.displayName = ModalPrimitive.Content.displayName;
ModalHeader.displayName = 'ModalHeader';
ModalRoot.displayName = ModalPrimitive.Root.displayName;
ModalTitle.displayName = ModalPrimitive.Title.displayName;
ModalTrigger.displayName = ModalPrimitive.Trigger.displayName;

const Modal: ModalComposition = {
  Body: ModalBody,
  Close: ModalClose,
  Content: ModalContent,
  Header: ModalHeader,
  Root: ModalRoot,
  Title: ModalTitle,
  Trigger: ModalTrigger,
};

export default Modal;

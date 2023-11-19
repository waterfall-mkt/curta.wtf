'use client';

import type { FC } from 'react';

import {
  modalCloseStyles,
  modalContentStyles,
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
import { cx } from 'class-variance-authority';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Card, IconButton } from '@/components/ui';

const ModalBody: FC<ModalBodyProps> = Card.Body;

const ModalClose: FC<ModalCloseProps> = (props) => {
  return (
    <ModalPrimitive.Close asChild>
      <IconButton
        variant="secondary"
        intent="neutral"
        size="sm"
        className={modalCloseStyles}
        aria-label="Close modal"
        {...props}
      >
        <X />
      </IconButton>
    </ModalPrimitive.Close>
  );
};

const ModalContent: FC<ModalContentProps> = ({
  className,
  description,
  asChild,
  onClick,
  cardProps,
  overlayProps,
  portalProps,
  children,
  ...rest
}) => {
  return (
    <ModalPrimitive.Portal {...portalProps}>
      <ModalPrimitive.Overlay className={modalOverlayStyles} {...overlayProps} />
      <ModalPrimitive.Content
        onClick={onClick ? onClick : (e) => e.stopPropagation()}
        asChild={asChild}
        {...rest}
      >
        <Card className={twMerge(cx(...modalContentStyles, className))} {...cardProps}>
          {children}
          <VisuallyHidden.Root>
            <ModalPrimitive.Description>
              {description ?? 'Modal content'}
            </ModalPrimitive.Description>
          </VisuallyHidden.Root>
        </Card>
      </ModalPrimitive.Content>
    </ModalPrimitive.Portal>
  );
};

const ModalHeader: FC<ModalHeaderProps> = ({ align = 'center', ...rest }) => {
  return <Card.Header className={modalHeaderVariants({ align })} {...rest} />;
};

const ModalRoot: FC<ModalRootProps> = ModalPrimitive.Root;

const ModalTitle: FC<ModalTitleProps> = ModalPrimitive.Title;

const ModalTrigger: FC<ModalTriggerProps> = ModalPrimitive.Trigger;

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

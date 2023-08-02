import type { FC } from 'react';

import {
  modalCloseStyles,
  modalContentStyles,
  modalHeaderVariants,
  modalOverlayStyles,
  modalPreviousStyles,
} from './styles';
import type {
  ModalBodyProps,
  ModalCloseProps,
  ModalComposition,
  ModalContentProps,
  ModalHeaderProps,
  ModalPreviousProps,
  ModalProps,
  ModalTitleProps,
  ModalTriggerProps,
} from './types';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { cx } from 'class-variance-authority';
import { ArrowLeft, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Button, Card } from '@/components/ui';

const Modal: FC<ModalProps> & ModalComposition = ({ children, ...rest }) => {
  return <Dialog.Root {...rest}>{children}</Dialog.Root>;
};

const ModalBody: FC<ModalBodyProps> = ({ className, children, ...rest }) => {
  return (
    <Card.Body className={className} {...rest}>
      {children}
    </Card.Body>
  );
};

ModalBody.displayName = 'ModalBody';

const ModalClose: FC<ModalCloseProps> = (props) => {
  return (
    <Dialog.Close asChild>
      <div>
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        <Button
          variant="secondary"
          intent="neutral"
          size="sm"
          className={modalCloseStyles}
          aria-label="Close modal"
          isIcon
          {...props}
        >
          <X />
        </Button>
      </div>
    </Dialog.Close>
  );
};

ModalClose.displayName = 'ModalClose';

const ModalContent: FC<ModalContentProps> = ({
  className,
  description,
  portalForceMount,
  portalContainer,
  overlayForceMount,
  forceMount,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onPointerDownOutside,
  onInteractOutside,
  children,
  ...rest
}) => {
  return (
    <Dialog.Portal forceMount={portalForceMount} container={portalContainer}>
      <Dialog.Overlay className={modalOverlayStyles} forceMount={overlayForceMount} />
      <Dialog.Content
        forceMount={forceMount}
        onOpenAutoFocus={onOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        onInteractOutside={onInteractOutside}
        onClick={(e) => e.stopPropagation()}
        asChild
      >
        {/* We don't need to merge Tailwind classes here because `Card` does it. */}
        <div>
          <Card className={twMerge(cx(...modalContentStyles, className))} {...rest}>
            {children}
            <VisuallyHidden.Root>
              <Dialog.Description>{description ?? 'Modal content'}</Dialog.Description>
            </VisuallyHidden.Root>
          </Card>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

ModalContent.displayName = 'ModalContent';

const ModalHeader: FC<ModalHeaderProps> = ({ children, align = 'center' }) => {
  return <Card.Header className={modalHeaderVariants({ align })}>{children}</Card.Header>;
};

ModalHeader.displayName = 'ModalHeader';

const ModalPrevious: FC<ModalPreviousProps> = (props) => {
  return (
    <>
      {/* eslint-disable-next-line */}
      {/* @ts-ignore */}
      <Button
        aria-label="Previous page"
        variant="secondary"
        intent="neutral"
        size="sm"
        className={modalPreviousStyles}
        isIcon
        {...props}
      >
        <ArrowLeft />
      </Button>
    </>
  );
};

ModalPrevious.displayName = 'ModalPrevious';

const ModalTitle: FC<ModalTitleProps> = ({ children, ...rest }) => {
  return <Dialog.Title {...rest}>{children}</Dialog.Title>;
};

ModalTitle.displayName = 'ModalTitle';

const ModalTrigger: FC<ModalTriggerProps> = ({ children, asChild }) => {
  return <Dialog.Trigger asChild={asChild}>{children}</Dialog.Trigger>;
};

ModalTrigger.displayName = 'ModalTrigger';

Modal.Body = ModalBody;
Modal.Close = ModalClose;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Previous = ModalPrevious;
Modal.Title = ModalTitle;
Modal.Trigger = ModalTrigger;

Modal.displayName = 'Modal';

export default Modal;

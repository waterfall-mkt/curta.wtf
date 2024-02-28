'use client';

import { forwardRef } from 'react';

import {
  toastCloseStyles,
  toastDescriptionVariants,
  toastTitleVariants,
  toastVariants,
  toastViewportStyles,
} from './styles';
import type {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastProps,
  ToastTitleProps,
  ToastViewportProps,
} from './types';
import { useToast } from './useToast';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Toast = forwardRef(
  (
    { className, intent = 'neutral', ...rest }: ToastProps,
    ref: React.ForwardedRef<HTMLLIElement>,
  ) => (
    <ToastPrimitives.Root
      ref={ref}
      className={twMerge(clsx(toastVariants({ intent }), className))}
      {...rest}
    />
  ),
);

const ToastAction = forwardRef(
  ({ ...rest }: ToastActionProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <ToastPrimitives.Action ref={ref} asChild {...rest} />
  ),
);

const ToastClose = forwardRef(
  ({ className, intent, ...rest }: ToastCloseProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <ToastPrimitives.Close ref={ref} toast-close="" asChild {...rest}>
      <IconButton
        size="sm"
        variant="secondary"
        className={twMerge(clsx(toastCloseStyles, className))}
        intent={intent}
      >
        <X />
      </IconButton>
    </ToastPrimitives.Close>
  ),
);

const ToastDescription = forwardRef(
  (
    { className, intent = 'neutral', ...rest }: ToastDescriptionProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <ToastPrimitives.Description
      ref={ref}
      className={twMerge(clsx(toastDescriptionVariants({ intent }), className))}
      {...rest}
    />
  ),
);

const Toaster: React.FC = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, intent, ...rest }) {
        return (
          <Toast key={id} intent={intent} {...rest}>
            <div className="flex flex-col space-y-1">
              {title ? <ToastTitle intent={intent}>{title}</ToastTitle> : null}
              {description ? (
                <ToastDescription intent={intent}>{description}</ToastDescription>
              ) : null}
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

const ToastProvider = ToastPrimitives.Provider;

const ToastTitle = forwardRef(
  (
    { className, intent = 'neutral', ...rest }: ToastTitleProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <ToastPrimitives.Title
      ref={ref}
      className={twMerge(clsx(toastTitleVariants({ intent }), className))}
      {...rest}
    />
  ),
);

const ToastViewport = forwardRef(
  ({ className, ...rest }: ToastViewportProps, ref: React.ForwardedRef<HTMLOListElement>) => (
    <ToastPrimitives.Viewport
      ref={ref}
      className={twMerge(clsx(toastViewportStyles, className))}
      {...rest}
    />
  ),
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Toast.displayName = ToastPrimitives.Root.displayName;
ToastAction.displayName = ToastPrimitives.Action.displayName;
ToastClose.displayName = ToastPrimitives.Close.displayName;
ToastDescription.displayName = ToastPrimitives.Description.displayName;
ToastTitle.displayName = ToastPrimitives.Title.displayName;
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  Toaster,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};

export default Toaster;

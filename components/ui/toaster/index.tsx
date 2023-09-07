'use client';

import { type FC, type ForwardedRef, forwardRef } from 'react';

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

const Toast = forwardRef(
  ({ className, intent = 'neutral', ...rest }: ToastProps, ref: ForwardedRef<HTMLLIElement>) => {
    return (
      <ToastPrimitives.Root
        ref={ref}
        className={twMerge(clsx(toastVariants({ intent }), className))}
        {...rest}
      />
    );
  },
);

const ToastAction = forwardRef(
  ({ ...rest }: ToastActionProps, ref: ForwardedRef<HTMLButtonElement>) => (
    <ToastPrimitives.Action ref={ref} asChild {...rest} />
  ),
);

const ToastClose = forwardRef(
  ({ className, intent, ...rest }: ToastCloseProps, ref: ForwardedRef<HTMLButtonElement>) => (
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
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <ToastPrimitives.Description
      ref={ref}
      className={twMerge(clsx(toastDescriptionVariants({ intent }), className))}
      {...rest}
    />
  ),
);

const Toaster: FC = () => {
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

const ToastTitle = forwardRef(
  (
    { className, intent = 'neutral', ...rest }: ToastTitleProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <ToastPrimitives.Title
      ref={ref}
      className={twMerge(clsx(toastTitleVariants({ intent }), className))}
      {...rest}
    />
  ),
);

const ToastViewport = forwardRef(
  ({ className, ...rest }: ToastViewportProps, ref: ForwardedRef<HTMLOListElement>) => (
    <ToastPrimitives.Viewport
      ref={ref}
      className={twMerge(clsx(toastViewportStyles, className))}
      {...rest}
    />
  ),
);

Toast.displayName = ToastPrimitives.Root.displayName;

ToastAction.displayName = ToastPrimitives.Action.displayName;

ToastClose.displayName = ToastPrimitives.Close.displayName;

ToastDescription.displayName = ToastPrimitives.Description.displayName;

ToastTitle.displayName = ToastPrimitives.Title.displayName;

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const ToastProvider = ToastPrimitives.Provider;

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

import { cva } from 'class-variance-authority';

export const toastCloseStyles = [
  'absolute',
  'right-1.5',
  'top-1.5',
  'opacity-0',
  'transition-opacity',
  'group-hover:opacity-100',
];

export const toastDescriptionVariants = cva(['text-sm'], {
  variants: {
    intent: {
      neutral: ['text-gray-200'],
      primary: ['text-blue-300'],
      success: ['text-green-300'],
      fail: ['text-red-300'],
      warning: ['text-yellow-300'],
      orange: ['text-orange-300'],
    },
  },
});

export const toastTitleVariants = cva(['text-base', 'font-medium'], {
  variants: {
    intent: {
      neutral: ['text-gray-100'],
      primary: ['text-blue-100'],
      success: ['text-green-100'],
      fail: ['text-red-100'],
      warning: ['text-yellow-100'],
      orange: ['text-orange-100'],
    },
  },
});

export const toastVariants = cva(
  [
    'border',
    'group',
    'relative',
    'pointer-events-auto',
    'flex',
    'w-full',
    'items-center',
    'justify-between',
    'space-x-4',
    'overflow-hidden',
    'rounded-xl',
    'p-3',
    'transition-all',
    'data-[swipe=cancel]:translate-x-0',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-80',
    'data-[state=closed]:slide-out-to-right-full',
    'data-[swipe=end]:animate-out',
    'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
    'data-[state=open]:slide-in-from-top-full',
    'data-[state=open]:sm:slide-in-from-bottom-full',
    'data-[state=open]:animate-in',
    'data-[swipe=move]:transition-none',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
  ],
  {
    variants: {
      intent: {
        neutral: ['bg-gray-450', 'border-gray-350'],
        primary: ['bg-blue-900', 'border-blue-700'],
        success: ['bg-green-900', 'border-green-700'],
        fail: ['bg-red-900', 'border-red-700'],
        warning: ['bg-yellow-900', 'border-yellow-700'],
        orange: ['bg-orange-900', 'border-orange-700'],
      },
    },
  },
);

export const toastViewportStyles = [
  'fixed',
  'top-0',
  'z-[100]',
  'flex',
  'max-h-screen',
  'w-full',
  'flex-col-reverse',
  'p-4',
  'sm:bottom-0',
  'sm:right-0',
  'sm:top-auto',
  'sm:flex-col',
  'md:max-w-[420px]',
];

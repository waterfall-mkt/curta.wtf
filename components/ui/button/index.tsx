'use client';

import Link from 'next/link';
import { type ForwardedRef, forwardRef } from 'react';

import { buttonSizeVariants, buttonVariants, iconButtonSizeVariants } from './styles';
import type { ButtonProps } from './types';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const Button = forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      intent = 'primary',
      disabled = false,
      href,
      title,
      newTab = false,
      isIcon = false,
      onClick,
      children,
      ...rest
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const fixedDisabledState = disabled && variant !== 'secondary';

    const props = {
      className: twMerge(
        cx(
          isIcon ? iconButtonSizeVariants({ size }) : buttonSizeVariants({ size }),
          buttonVariants({ variant, intent: fixedDisabledState ? undefined : intent, disabled }),
          className,
        ),
      ),
      title: title || href || undefined,
      'data-variant': variant,
      'data-disabled': disabled,
      'aria-disabled': disabled,
      disabled: disabled,
      ref,
      onClick: newTab && href ? () => window.open(href, '_blank') : onClick,
      ...rest,
    };

    if (href && !newTab) {
      return (
        <Link href={href} passHref legacyBehavior>
          <button {...props}>
            <span>{children}</span>
          </button>
        </Link>
      );
    }

    return (
      <button {...props}>
        <span>{children}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;

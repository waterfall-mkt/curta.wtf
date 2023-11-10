'use client';

import Link from 'next/link';
import { type FC, type ForwardedRef, forwardRef } from 'react';

import { buttonGroupStyles, buttonIconVariants, buttonVariants } from './styles';
import type { ButtonGroupProps, ButtonProps } from './types';
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
      leftIcon,
      rightIcon,
      newTab = false,
      title,
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
          buttonVariants({
            size,
            variant,
            intent: fixedDisabledState ? undefined : intent,
            disabled,
          }),
          className,
        ),
      ),
      title: title || href || undefined,
      'data-variant': variant,
      'data-disabled': disabled,
      'aria-disabled': disabled,
      disabled,
      ref,
      onClick: newTab && href ? () => window.open(href, '_blank') : onClick,
      ...rest,
    };

    if (href && !newTab) {
      return (
        <Link href={href} passHref legacyBehavior>
          <button {...props}>
            {leftIcon ? <span className={buttonIconVariants({ size })}>{leftIcon}</span> : null}
            <span>{children}</span>
            {rightIcon ? <span className={buttonIconVariants({ size })}>{rightIcon}</span> : null}
          </button>
        </Link>
      );
    }

    return (
      <button {...props}>
        {leftIcon ? <span className={buttonIconVariants({ size })}>{leftIcon}</span> : null}
        <span>{children}</span>
        {rightIcon ? <span className={buttonIconVariants({ size })}>{rightIcon}</span> : null}
      </button>
    );
  },
);

export const ButtonGroup: FC<ButtonGroupProps> = ({ children, ...rest }) => {
  return (
    <div className={buttonGroupStyles} {...rest}>
      {children}
    </div>
  );
};

Button.displayName = 'Button';
ButtonGroup.displayName = 'ButtonGroup';

export default Button;

'use client';

import Link from 'next/link';
import { type FC, type ForwardedRef, forwardRef } from 'react';

import { buttonGroupStyles, buttonIconVariants, buttonVariants } from './styles';
import type { ButtonGroupProps, ButtonProps } from './types';
import { Slot } from '@radix-ui/react-slot';
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
      'data-variant': variant,
      'data-disabled': disabled,
      'aria-disabled': disabled,
      disabled,
      ref,
      ...rest,
    };

    // Destructure `ref` from `props: JSX.IntrinsicElements['button']`, so the
    // remaining props are type-compatible with `<Link />` for the `<Slot />`
    // component to merge in.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ref: _, ...restWithoutRef } = props;

    if (href) {
      return (
        <Slot ref={ref} {...restWithoutRef}>
          <Link href={href} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {leftIcon ? <span className={buttonIconVariants({ size })}>{leftIcon}</span> : null}
            <span>{children}</span>
            {rightIcon ? <span className={buttonIconVariants({ size })}>{rightIcon}</span> : null}
          </Link>
        </Slot>
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

export const ButtonGroup: FC<ButtonGroupProps> = ({ className, children, ...rest }) => {
  return (
    <div className={twMerge(cx(buttonGroupStyles, className))} {...rest}>
      {children}
    </div>
  );
};

Button.displayName = 'Button';
ButtonGroup.displayName = 'ButtonGroup';

export default Button;

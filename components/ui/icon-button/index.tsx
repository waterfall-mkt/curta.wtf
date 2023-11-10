'use client';

import Link from 'next/link';
import { type ForwardedRef, forwardRef } from 'react';

import { iconButtonIconVariants, iconButtonVariants } from './styles';
import type { IconButtonProps } from './types';
import { Slot } from '@radix-ui/react-slot';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const IconButton = forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      intent = 'primary',
      disabled = false,
      href,
      newTab = false,
      children,
      ...rest
    }: IconButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const fixedDisabledState = disabled && variant !== 'secondary';

    const props = {
      className: twMerge(
        cx(
          iconButtonVariants({
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
      disabled: disabled,
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
            <span className={iconButtonIconVariants({ size })}>{children}</span>
          </Link>
        </Slot>
      );
    }

    return (
      <button {...props}>
        <span className={iconButtonIconVariants({ size })}>{children}</span>
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;

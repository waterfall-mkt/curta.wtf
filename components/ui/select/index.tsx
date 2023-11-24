import { type FC, type ForwardedRef, forwardRef } from 'react';

import { selectContainerStyles, selectIconContainerVariants, selectVariants } from './styles';
import type { SelectComposition, SelectItemProps, SelectProps } from './types';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Select: FC<SelectProps> & SelectComposition = ({
  className,
  size = 'md',
  variant = 'primary',
  intent = 'neutral',
  disabled = false,
  rightIcon,
  selectSize,
  children,
  ...rest
}) => (
  <div className={clsx(selectContainerStyles)}>
    <select
      className={twMerge(
        clsx(
          selectVariants({ size, variant, intent: !disabled ? intent : undefined, disabled }),
          className,
        ),
      )}
      size={selectSize}
      data-variant={variant}
      data-disabled={disabled}
      aria-disabled={disabled}
      disabled={disabled}
      {...rest}
    >
      {children}
    </select>
    <span
      className={selectIconContainerVariants({
        size,
        variant,
        intent: !disabled ? intent : undefined,
        disabled,
      })}
    >
      {rightIcon ? <ChevronDown /> : null}
    </span>
  </div>
);

export const SelectItem = forwardRef(
  ({ ...rest }: SelectItemProps, ref: ForwardedRef<HTMLOptionElement>) => (
    <option {...rest} ref={ref} />
  ),
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Select.displayName = 'Select';
SelectItem.displayName = 'SelectItem';

Select.Item = SelectItem;

export default Select;

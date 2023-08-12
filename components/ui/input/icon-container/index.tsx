import type { FC } from 'react';

import { inputIconContainerVariants } from './styles';
import type { InputIconContainerProps } from './types';
import { cx } from 'class-variance-authority';

const InputIconContainer: FC<InputIconContainerProps> = ({
  className,
  position,
  size,
  children,
}) => {
  return (
    <div className={cx(inputIconContainerVariants({ position, size }), className)}>{children}</div>
  );
};

InputIconContainer.displayName = 'InputIconContainer';

export default InputIconContainer;

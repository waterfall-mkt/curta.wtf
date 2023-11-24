import type { FC } from 'react';

import { inputIconContainerVariants } from './styles';
import type { InputIconContainerProps } from './types';
import clsx from 'clsx';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const InputIconContainer: FC<InputIconContainerProps> = ({ className, position, ...rest }) => (
  <div className={clsx(inputIconContainerVariants({ position }), className)} {...rest} />
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

InputIconContainer.displayName = 'InputIconContainer';

export default InputIconContainer;

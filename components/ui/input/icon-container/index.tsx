import { inputIconContainerVariants } from './styles';
import type { InputIconContainerProps } from './types';
import clsx from 'clsx';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const InputIconContainer: React.FC<InputIconContainerProps> = ({
  className,
  position,
  ...rest
}) => <div className={clsx(inputIconContainerVariants({ position }), className)} {...rest} />;

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

InputIconContainer.displayName = 'InputIconContainer';

export default InputIconContainer;

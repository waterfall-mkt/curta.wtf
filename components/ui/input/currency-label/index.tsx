import { inputCurrencyLabelVariants } from './styles';
import type { InputCurrencyLabelProps } from './types';
import clsx from 'clsx';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const InputCurrencyLabel: React.FC<InputCurrencyLabelProps> = ({
  className,
  size,
  currencyType,
}) => <div className={clsx(inputCurrencyLabelVariants({ size }), className)}>{currencyType}</div>;

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

InputCurrencyLabel.displayName = 'InputCurrencyLabel';

export default InputCurrencyLabel;

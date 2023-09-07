import type { FC } from 'react';

import { inputCurrencyLabelVariants } from './styles';
import type { InputCurrencyLabelProps } from './types';
import { cx } from 'class-variance-authority';

const InputCurrencyLabel: FC<InputCurrencyLabelProps> = ({ className, size, currencyType }) => {
  return <div className={cx(inputCurrencyLabelVariants({ size }), className)}>{currencyType}</div>;
};

InputCurrencyLabel.displayName = 'InputCurrencyLabel';

export default InputCurrencyLabel;

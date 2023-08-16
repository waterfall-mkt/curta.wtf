import { inputCurrencyLabelVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

export type InputCurrencyLabelVariantProps = Required<
  Pick<VariantProps<typeof inputCurrencyLabelVariants>, 'size'>
>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type InputCurrencyLabelProps = InputCurrencyLabelVariantProps & {
  className?: string;
  currencyType?: string;
};

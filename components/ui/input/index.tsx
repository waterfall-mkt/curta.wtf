'use client';

import {
  type FC,
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import InputCurrencyLabel from './currency-label';
import InputIconContainer from './icon-container';
import { inputErrorVariants, inputLabelVariants, inputVariants } from './styles';
import type { InputDatePickerProps, InputProps, InputType } from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      errorMessage = 'Something went wrong.',
      size = 'md',
      onChange,
      inputMode,
      isCurrency = false,
      currencyType = 'ETH',
      leftIcon,
      rightIcon,
      ...rest
    },
    ref,
  ) => {
    const [invalid, setInvalid] = useState<boolean>();
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId();
    const hintId = useId();

    // Expose parent ref to input ref
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      setInvalid(!inputRef.current?.validity.valid ?? false);
    }, [inputRef, setInvalid]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInvalid(!event.target.validity.valid);
      onChange?.(event);
    };

    const numericPattern = '[0-9]*';
    const decimalPattern = '[0-9]+([.][0-9]*)?';
    const pattern =
      inputMode === 'numeric'
        ? numericPattern
        : inputMode === 'decimal'
        ? decimalPattern
        : undefined;

    return (
      <div className="relative flex flex-col space-y-1 transition-colors">
        {/* Label */}
        {label ? (
          <label className={inputLabelVariants({ invalid })} htmlFor={inputId}>
            {label}
          </label>
        ) : null}

        {/* Input */}
        <div className="relative">
          <input
            ref={inputRef}
            className={twMerge(
              clsx(
                inputVariants({ size }),
                leftIcon ? 'pl-8' : 'pl-4',
                rightIcon ? 'pr-8' : 'pr-4',
                className,
              ),
            )}
            type="text"
            id={inputId}
            inputMode={inputMode}
            pattern={pattern}
            aria-label={label}
            aria-describedby={hintId}
            aria-invalid={invalid}
            onChange={handleChange}
            {...rest}
          />
          {leftIcon ? (
            <InputIconContainer position="left" size={size}>
              {leftIcon}
            </InputIconContainer>
          ) : null}
          {rightIcon ? (
            <InputIconContainer position="right" size={size}>
              {rightIcon}
            </InputIconContainer>
          ) : null}
          {isCurrency ? (
            <InputCurrencyLabel
              className="absolute bottom-0 right-1.5 top-0 my-auto"
              size={size}
              currencyType={currencyType}
            />
          ) : null}
        </div>

        {/* Error Hint */}
        <small className={inputErrorVariants({ invalid })} id={hintId}>
          {errorMessage}
        </small>
      </div>
    );
  },
) as InputType;

const InputDatePicker: FC<InputDatePickerProps> = ({
  label,
  errorMessage = 'Must be a date.',
  size = 'md',
  value,
  onChange,
  placeholder,
  min,
  max,
}) => {
  return (
    <div className="relative">
      <Input
        value={value}
        label={label}
        size={size}
        errorMessage={errorMessage}
        placeholder={placeholder}
        readOnly
      />
      <Input
        className="absolute bottom-0 left-0 select-none text-transparent invalid:text-transparent"
        min={min}
        max={max}
        size={size}
        aria-hidden={true}
        type="date"
        onChange={onChange}
        onKeyDown={(e) => e.preventDefault()}
      />
    </div>
  );
};

InputDatePicker.displayName = 'InputDatePicker';

Input.DatePicker = InputDatePicker;

Input.displayName = 'Input';

export default Input;

'use client';

import {
  type ChangeEvent,
  type ForwardedRef,
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import InputCurrencyLabel from './currency-label';
import InputIconContainer from './icon-container';
import { inputErrorStyles, inputLabelVariants, inputVariants } from './styles';
import type { InputProps } from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Input = forwardRef(
  (
    {
      className,
      label,
      errorMessage = 'Something went wrong.',
      size = 'md',
      inputMode,
      isCurrency = false,
      currencyType = 'ETH',
      leftIcon,
      rightIcon,
      onChange,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [invalid, setInvalid] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId();
    const hintId = useId();

    // Expose parent ref to input ref
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      setInvalid(!inputRef.current?.validity.valid ?? false);
    }, [inputRef, setInvalid]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      <div className="relative flex flex-col gap-1 transition-colors">
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
          {leftIcon ? <InputIconContainer position="left">{leftIcon}</InputIconContainer> : null}
          {rightIcon ? <InputIconContainer position="right">{rightIcon}</InputIconContainer> : null}
          {isCurrency ? (
            <InputCurrencyLabel
              className="absolute bottom-0 right-1.5 top-0 my-auto"
              size={size}
              currencyType={currencyType}
            />
          ) : null}
        </div>

        {errorMessage !== '' && invalid ? (
          <small className={clsx(inputErrorStyles)} id={hintId}>
            {errorMessage}
          </small>
        ) : null}
      </div>
    );
  },
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Input.displayName = 'Input';

export default Input;

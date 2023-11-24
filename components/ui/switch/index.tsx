'use client';

import { type ForwardedRef, forwardRef } from 'react';

import { switchStyles, switchThumbStyles } from './styles';
import type { SwitchProps } from './types';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import clsx from 'clsx';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Switch = forwardRef((props: SwitchProps, ref: ForwardedRef<HTMLButtonElement>) => (
  <SwitchPrimitives.Root className={clsx(switchStyles)} ref={ref} {...props}>
    <SwitchPrimitives.Thumb className={clsx(switchThumbStyles)} />
  </SwitchPrimitives.Root>
));

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Switch.displayName = 'Switch';

export default Switch;

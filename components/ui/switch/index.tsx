'use client';

import { type ForwardedRef, forwardRef } from 'react';

import { switchStyles, switchThumbStyles } from './styles';
import type { SwitchProps } from './types';
import * as SwitchPrimitives from '@radix-ui/react-switch';

const Switch = forwardRef((props: SwitchProps, ref: ForwardedRef<HTMLButtonElement>) => (
  <SwitchPrimitives.Root className={switchStyles} ref={ref} {...props}>
    <SwitchPrimitives.Thumb className={switchThumbStyles} />
  </SwitchPrimitives.Root>
));

Switch.displayName = 'Switch';

export default Switch;

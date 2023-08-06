import type { ReactNode } from 'react';

export type TooltipProps = JSX.IntrinsicElements['div'] & {
  content: ReactNode;
  triggerAsChild?: boolean;
  hasArrow?: boolean;
};

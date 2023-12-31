import type { FC, ReactNode } from 'react';

import { codeBlockActionsVariants, codeBlockContainerVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

type CodeBlockActionsVariantProps = VariantProps<typeof codeBlockActionsVariants>;

type CodeBlockVariantProps = VariantProps<typeof codeBlockContainerVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type CodeBlockActionsProps = CodeBlockActionsVariantProps & {
  code: string;
  switcher?: {
    options: string[];
    value: string;
    onChange: (value: string) => void;
  };
};

export type CodeBlockFileNameProps = Pick<
  CodeBlockProps,
  'fileName' | 'headerLabel' | 'containerized'
> & {
  Icon: FC<JSX.IntrinsicElements['svg']> | LucideIcon;
};

export type CodeBlockProps = Omit<JSX.IntrinsicElements['pre'], 'children'> &
  CodeBlockVariantProps & {
    fileName?: string;
    headerLabel?: ReactNode;
    language?:
      | 'javascript'
      | 'js'
      | 'typescript'
      | 'ts'
      | 'jsx'
      | 'tsx'
      | 'solidity'
      | 'sol'
      | 'cpp'
      | 'python'
      | 'py'
      | 'bash'
      | 'sh'
      | 'diff'
      | 'none';
    logo?: FC<JSX.IntrinsicElements['svg']>;
    highlightLines?: number[];
    showLineNumbers?: boolean;
    breakLines?: boolean;
    switcher?: {
      options: string[];
      value: string;
      onChange: (value: string) => void;
    };
    skeletonLines?: number;
    children: string;
  };

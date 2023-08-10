import type { FC, ReactNode } from 'react';

import { codeBlockContainerVariants } from './styles';
import type { VariantProps } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

type CodeBlockVariantProps = VariantProps<typeof codeBlockContainerVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type CodeBlockLanguage =
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
  | 'none';

export type CodeBlockProps = Omit<JSX.IntrinsicElements['pre'], 'children'> &
  CodeBlockVariantProps & {
    fileName?: string;
    headerLabel?: ReactNode;
    language?: CodeBlockLanguage;
    logo?: FC<JSX.IntrinsicElements['svg']>;
    highlightLines?: number[];
    showLineNumbers?: boolean;
    breakLines?: boolean;
    switcher?: {
      options: string[];
      value: string;
      onChange: (value: string) => void;
    };
    children: string;
  };

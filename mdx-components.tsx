import Link from 'next/link';
import { isValidElement } from 'react';

import type { MDXComponents } from 'mdx/types';

import { CodeBlock } from '@/components/ui';
import type { CodeBlockProps } from '@/components/ui/code-block/types';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, children, ...rest }: JSX.IntrinsicElements['a']) => {
      if (href && href.startsWith('/')) {
        return (
          <span className="not-prose">
            <Link
              className="mdx--link group font-medium no-underline hover:underline"
              href={href}
              style={{ color: 'var(--primary-color)' }}
            >
              {children}
            </Link>
          </span>
        );
      }

      return (
        <span className="not-prose">
          <a
            className="mdx--link group font-medium no-underline hover:underline"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--primary-color)' }}
            {...rest}
          >
            {children}
          </a>
        </span>
      );
    },
    code: ({ children }: JSX.IntrinsicElements['code']) => (
      <span className="not-prose">
        <code className="rounded-md border border-stroke bg-gray-450 px-1 py-0.5 font-mono text-sm font-normal before:content-none after:content-none group-[.mdx--link]:text-primary">
          {children}
        </code>
      </span>
    ),
    h1: ({ children }: JSX.IntrinsicElements['h1']) => (
      <h1 className="mb-4 text-3xl font-semibold tracking-tight text-gray-50 md:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }: JSX.IntrinsicElements['h2']) => (
      <h2 className="mb-2 mt-6 text-xl font-semibold tracking-tight text-gray-50 md:mb-4 md:mt-12 md:text-2xl">
        {children}
      </h2>
    ),
    h3: ({ children }: JSX.IntrinsicElements['h3']) => (
      <h3 className="mb-2 mt-5 text-lg font-semibold tracking-tight text-gray-50 md:mb-4 md:mt-6 md:text-xl">
        {children}
      </h3>
    ),
    p: ({ children }: JSX.IntrinsicElements['p']) => (
      <p className="font-light not-italic text-gray-100 before:content-none after:content-none">
        {children}
      </p>
    ),
    pre: ({
      children,
      ...rest
    }: JSX.IntrinsicElements['pre'] & Omit<CodeBlockProps, 'children'>) => {
      const childrenProps = isValidElement(children) ? children.props : undefined;
      const language = childrenProps?.className ? childrenProps.className.substring(9) : undefined;
      const code = typeof childrenProps?.children === 'string' ? childrenProps.children.trim() : '';

      return (
        <CodeBlock language={language} {...rest}>
          {code}
        </CodeBlock>
      );
    },
    strong: ({ children, ...rest }: JSX.IntrinsicElements['strong']) => (
      <strong className="font-medium text-gray-50" {...rest}>
        {children}
      </strong>
    ),
  };
}

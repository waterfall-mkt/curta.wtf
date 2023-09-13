import Link from 'next/link';
import { isValidElement } from 'react';

import { Link as LinkLucide } from 'lucide-react';
import type { MDXComponents } from 'mdx/types';

import { CodeBlock } from '@/components/ui';
import type { CodeBlockProps } from '@/components/ui/code-block/types';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    code: ({ children, ...rest }: JSX.IntrinsicElements['code']) => (
      <span className="not-prose">
        <code
          className="rounded-md border border-stroke bg-gray-450 px-1 py-0.5 font-mono text-sm font-normal before:content-none after:content-none group-[.mdx--link]:text-primary"
          {...rest}
        >
          {children}
        </code>
      </span>
    ),
    h2: ({ children, ...rest }: JSX.IntrinsicElements['h2']) => {
      if (typeof children === 'string') {
        const id = children
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
          .trim();

        return (
          <h2 id={id} {...rest}>
            <a href={`#${id}`} className="group flex w-fit items-center gap-2 no-underline">
              {children}
              <LinkLucide className="hidden h-4 w-4 text-gray-200 animate-in fade-in-50 group-hover:flex md:h-5 md:w-5" />
            </a>
          </h2>
        );
      }

      return <h2 {...rest}>{children}</h2>;
    },
    h3: ({ children, ...rest }: JSX.IntrinsicElements['h3']) => {
      if (typeof children === 'string') {
        const id = children
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
          .trim();

        return (
          <h3 id={id} {...rest}>
            <a href={`#${id}`} className="group flex w-fit items-center gap-2 no-underline">
              {children}
              <LinkLucide className="hidden h-4 w-4 text-gray-200 animate-in fade-in-50 group-hover:flex" />
            </a>
          </h3>
        );
      }

      return <h2 {...rest}>{children}</h2>;
    },
    p: ({ children, ...rest }: JSX.IntrinsicElements['p']) => (
      <p
        className="font-light not-italic text-gray-100 before:content-none after:content-none"
        {...rest}
      >
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
    table: ({ children, ...rest }: JSX.IntrinsicElements['table']) => (
      <div className="hide-scrollbar overflow-x-scroll" {...rest}>
        <table className="my-0">{children}</table>
      </div>
    ),
    ...components,
  };
}

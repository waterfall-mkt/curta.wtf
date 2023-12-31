import Image from 'next/image';
import Link from 'next/link';
import { isValidElement } from 'react';

import type { MDXComponents } from 'mdx/types';

import LogoIcon from '@/components/common/logo-icon';
import ComponentsDisplay from '@/components/templates/components-display';
import CredentialFeature from '@/components/templates/credential-feature';
import LinkFeature from '@/components/templates/link-feature';
import { Callout, Description, H2, H3, H4 } from '@/components/templates/mdx';
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
              className="mdx--link group -mx-0.5 rounded-sm px-0.5 font-medium no-underline hover:underline"
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
            className="mdx--link group -mx-0.5 rounded-sm px-0.5 font-medium no-underline hover:underline"
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
    blockquote: (props: JSX.IntrinsicElements['blockquote']) => (
      <blockquote className="font-light not-italic text-gray-150" {...props} />
    ),
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
    h2: (props: JSX.IntrinsicElements['h2']) => <H2 {...props} />,
    h3: (props: JSX.IntrinsicElements['h3']) => <H3 {...props} />,
    h4: (props: JSX.IntrinsicElements['h4']) => <H4 {...props} />,
    p: ({ children, ...rest }: JSX.IntrinsicElements['p']) => (
      <p className="font-light not-italic before:content-none after:content-none" {...rest}>
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
    Callout,
    ComponentsDisplay,
    CredentialFeature,
    Description,
    Image,
    LinkFeature,
    LogoIcon,
    ...components,
  };
}

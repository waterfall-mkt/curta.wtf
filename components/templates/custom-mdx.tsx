'use client';

import { useMDXComponents as getMDXComponents } from 'mdx-components';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote';

export default function CustomMDX({ components, ...rest }: MDXRemoteProps) {
  return <MDXRemote components={{ ...getMDXComponents({}), ...(components || {}) }} {...rest} />;
}

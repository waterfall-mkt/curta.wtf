'use client';

import Image from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';

import { useMDXComponents as getMDXComponents } from 'mdx-components';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote';

import cloudflareLoader from '@/lib/services/cloudflare-loader';

export default function CustomMDX({ components, ...rest }: MDXRemoteProps) {
  return (
    <MDXRemote
      components={{
        ...getMDXComponents({}),
        ...(components || {}),
        ...{ Image: ImageCloudflareLoader },
      }}
      {...rest}
    />
  );
}

const ImageCloudflareLoader = ({ src, alt, ...rest }: ComponentPropsWithoutRef<typeof Image>) => {
  const normalizedSrc =
    typeof src === 'string'
      ? src.startsWith('/')
        ? `https://raw.githubusercontent.com/waterfall-mkt/curta-write-ups/main${src}`
        : src
      : src;

  return <Image src={normalizedSrc} alt={alt} loader={cloudflareLoader} {...rest} />;
};

'use client';

import Image from 'next/image';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import { forwardRef } from 'react';

import cloudflareLoader from '@/lib/services/cloudflare-loader';

const PuzzleWriteUpImage = forwardRef(
  (
    { src, alt, ...rest }: ComponentPropsWithoutRef<typeof Image>,
    ref: ForwardedRef<HTMLImageElement>,
  ) => {
    const normalizedSrc =
      typeof src === 'string'
        ? src.startsWith('/')
          ? `https://raw.githubusercontent.com/waterfall-mkt/curta-write-ups/main${src}`
          : src
        : src;

    return (
      <Image
        className="mx-auto max-w-full rounded-xl border border-stroke min-[400px]:max-w-[24rem] md:rounded-2xl"
        ref={ref}
        src={normalizedSrc}
        loader={cloudflareLoader}
        alt={alt}
        {...rest}
      />
    );
  },
);

PuzzleWriteUpImage.displayName = 'PuzzleWriteUpImage';

export default PuzzleWriteUpImage;

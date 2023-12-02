import Image from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';

import cloudflareLoader from '@/lib/services/cloudflare-loader';

const PuzzleWriteUpImage = ({ src, alt, ...rest }: ComponentPropsWithoutRef<typeof Image>) => {
  const normalizedSrc =
    typeof src === 'string'
      ? src.startsWith('/')
        ? `https://raw.githubusercontent.com/waterfall-mkt/curta-write-ups/main${src}`
        : src
      : src;

  return <Image src={normalizedSrc} alt={alt} loader={cloudflareLoader} {...rest} />;
};

export default PuzzleWriteUpImage;

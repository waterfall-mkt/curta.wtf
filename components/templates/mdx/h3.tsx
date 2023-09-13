'use client';

import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import { Link } from 'lucide-react';

import { useToast } from '@/components/ui';

const H3: FC<JSX.IntrinsicElements['h3']> = ({ children, ...rest }) => {
  const pathname = usePathname();
  const { toast } = useToast();

  if (typeof children === 'string') {
    const id = children
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim();

    return (
      <h3 id={id} {...rest}>
        <a
          href={`#${id}`}
          className="group flex w-fit items-center gap-2 no-underline"
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://curta.wtf'}${pathname}#${id}`,
            );
            toast({
              intent: 'primary',
              title: 'Copied to clipboard',
              description: 'URL copied to clipboard.',
            });
          }}
        >
          {children}
          <Link className="hidden h-4 w-4 text-gray-200 animate-in fade-in-50 group-hover:flex" />
        </a>
      </h3>
    );
  }

  return <h3 {...rest}>{children}</h3>;
};

export default H3;

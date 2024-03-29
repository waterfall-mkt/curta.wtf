'use client';

import { usePathname } from 'next/navigation';

import { Link } from 'lucide-react';

import { useToast } from '@/components/ui';

const H3: React.FC<JSX.IntrinsicElements['h3']> = ({ children, ...rest }) => {
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
          className="not-prose group -mx-1 flex w-fit items-center gap-2 rounded-md px-1 font-semibold tracking-tight no-underline"
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
          <Link className="hidden h-4 w-4 text-gray-200 animate-in fade-in-50 group-hover:flex group-focus-visible:flex" />
        </a>
      </h3>
    );
  }

  return <h3 {...rest}>{children}</h3>;
};

export default H3;

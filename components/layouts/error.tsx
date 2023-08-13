import type { FC, ReactNode } from 'react';

import { Button } from '@/components/ui';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type ErrorLayoutProps = {
  statusCode?: number;
  children?: ReactNode;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const ErrorLayout: FC<ErrorLayoutProps> = ({ statusCode, children }) => {
  const header = statusCode === 404 ? 'PageNotFound()' : `InternalServerError(${statusCode})`;
  const message = statusCode === 404 ? '0x924C0FAD' : '0x2145B8F0';

  return (
    <div className="h-fill flex grow flex-col items-center justify-center">
      <h1 className="text-display-sm font-medium text-gray-100 lg:text-display-lg">{header}</h1>
      <a
        className="mt-2 text-center font-mono text-sm font-book text-tw-red hover:underline lg:mt-4 lg:text-base"
        href={`https://sig.eth.samczsun.com/api/v1/signatures?all=true&function=${message}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        FAIL. REASON: {message}
      </a>
      <Button
        href="/"
        variant="tertiary"
        intent="neutral"
        size="lg"
        className="mt-6 hidden lg:flex"
      >
        Back to Curta
      </Button>
      <Button href="/" size="md" variant="tertiary" intent="neutral" className="mt-4 lg:hidden">
        Back to Curta
      </Button>
      {children}
    </div>
  );
};

export default ErrorLayout;

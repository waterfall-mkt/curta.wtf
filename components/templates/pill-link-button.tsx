import type { FC } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PillLinkButtonProps = JSX.IntrinsicElements['a'] & {
  site?: 'etherscan' | 'github';
  href: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PillLinkButton: FC<PillLinkButtonProps> = ({ className, site, href, children, ...rest }) => {
  return (
    <a
      href={href}
      className={twMerge(
        clsx(
          'line-clamp-1 flex h-8 w-fit items-center space-x-2 text-ellipsis rounded-full border border-stroke bg-white/5 text-sm text-gray-100 backdrop-blur-xl transition-colors hover:bg-white/10',
          site ? 'pl-1 pr-2.5' : 'px-2.5',
          className,
        ),
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {site ? (
        <span className="flex h-6 w-6 items-center justify-center">
          {site === 'etherscan' ? (
            <PillLinkButtonEtherscanIcon />
          ) : site === 'github' ? (
            <PillLinkButtonGithubIcon />
          ) : null}
        </span>
      ) : null}
      <span>{children}</span>
    </a>
  );
};

const PillLinkButtonEtherscanIcon: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      className={className}
      {...rest}
    >
      <title>Etherscan</title>
      <desc>Etherscan&apos;s logo.</desc>
      <path
        d="M4.988 11.426A1.017 1.017 0 0 1 6.01 10.41l1.694.005a1.019 1.019 0 0 1 1.019 1.019v6.408c.19-.057.435-.117.704-.18a.849.849 0 0 0 .654-.826v-7.95A1.019 1.019 0 0 1 11.1 7.867h1.697a1.019 1.019 0 0 1 1.019 1.02v7.377s.425-.172.839-.347a.85.85 0 0 0 .519-.783V6.34a1.018 1.019 0 0 1 1.018-1.019h1.698a1.019 1.019 0 0 1 1.018 1.019v7.242c1.472-1.066 2.964-2.35 4.147-3.893a1.71 1.71 0 0 0 .26-1.596A11.977 11.98 0 0 0 12.153.002C5.498-.089-.001 5.343 0 12a11.959 11.961 0 0 0 1.593 6.003 1.516 1.517 0 0 0 1.447.75 41.574 41.584 0 0 0 1.196-.125.848.848 0 0 0 .753-.842v-6.36M4.95 21.703A11.994 11.997 0 0 0 24.001 12c0-.277-.012-.55-.03-.822-4.383 6.538-12.475 9.594-19.02 10.525"
        fill="currentColor"
      />
    </svg>
  );
};

const PillLinkButtonGithubIcon: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      className={className}
      {...rest}
    >
      <title>GitHub</title>
      <desc>GitHub&apos;s logo.</desc>
      <path
        d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PillLinkButton;

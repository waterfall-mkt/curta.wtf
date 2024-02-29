import Link from 'next/link';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type LogoProps = {
  className?: string;
  size?: 'md' | 'sm';
  href?: string;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const Logo: React.FC<LogoProps> = ({ className, href = '/', size = 'md' }) => {
  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          '-mr-2 flex items-center rounded-md pr-2 font-semibold tracking-tighter text-gray-50',
          className,
        ),
      )}
    >
      <div>
        <svg
          width={size === 'md' ? 32 : 24}
          height={size === 'md' ? 32 : 24}
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
        >
          <title>Curta</title>
          <desc>Curta logo.</desc>
          <style>
            {
              'rect.a{filter:url(#c)drop-shadow(0 0 32px #007fff);fill:#fff;width:64px}rect.b{filter:drop-shadow(0 0 8px #007fff);rx:24px;fill:#000;width:48px}rect.c{height:208px}rect.d{height:96px}rect.e{height:64px}rect.f{height:192px}rect.g{height:80px}rect.h{height:48px}'
            }
          </style>
          <defs>
            <filter id="c">
              <feGaussianBlur stdDeviation="8" in="SourceGraphic" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="#007FFF" floodOpacity=".95" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite in="shadow" in2="SourceGraphic" />
              <feComposite operator="atop" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>

          <rect className="a c" x="128" y="112" rx="32" />
          <rect className="b f" x="136" y="120" rx="24" />
          <rect className="a e" x="128" y="336" rx="32" />
          <rect className="b h" x="136" y="344" rx="24" />
          <rect className="a d" x="224" y="112" rx="32" />
          <rect className="b g" x="232" y="120" rx="24" />
          <rect className="a e" x="224" y="224" rx="32" />
          <rect className="b h" x="232" y="232" rx="24" />
          <rect className="a d" x="224" y="304" rx="32" />
          <rect className="b g" x="232" y="312" rx="24" />
          <rect className="a c" x="320" y="192" rx="32" />
          <rect className="b f" x="328" y="200" rx="24" />
          <rect className="a e" x="320" y="112" rx="32" />
          <rect className="b h" x="328" y="120" rx="24" />
        </svg>
      </div>
      <span className={clsx('ml-1', size === 'md' ? 'text-lg' : 'text-sm')}>Curta</span>
    </Link>
  );
};

Logo.displayName = 'Logo';

export default Logo;

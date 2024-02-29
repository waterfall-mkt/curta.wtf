import Link from 'next/link';

import type { PageSlug } from '@/lib/types/site';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CredentialFeatureProps = {
  href: PageSlug;
  name: string;
  description: string;
  children: React.ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CredentialFeature: React.FC<CredentialFeatureProps> = ({
  href,
  name,
  description,
  children,
}) => {
  return (
    <Link
      className="group overflow-hidden rounded-xl border border-stroke bg-gray-600 no-underline transition-colors hover:border-gray-250"
      href={href}
    >
      <div className="flex items-center justify-center border-b border-stroke bg-gray-700 p-4 transition-colors">
        {children}
      </div>
      <div className="p-4">
        <div className="font-medium text-gray-100">{name}</div>
        <div className="text-sm font-normal text-gray-200">{description}</div>
      </div>
    </Link>
  );
};

export default CredentialFeature;

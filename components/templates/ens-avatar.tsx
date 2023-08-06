import { publicClient } from '@/lib/client';

import Avatar from '@/components/templates/avatar';

/* Props */
type ENSAvatarProps = {
  className?: string;
  name: string;
  size?: number;
};

/* Component */
export default async function ENSAvatar({ className, name, size = 40 }: ENSAvatarProps) {
  const data = await publicClient.getEnsAvatar({ name });

  return (
    <Avatar className={className} src={data ?? ''} alt={`ENS avatar for ${name}`} size={size} />
  );
}

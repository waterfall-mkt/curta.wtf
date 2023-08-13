import { cache, type FC, useId } from 'react';

import AuthorAvatar from './author-avatar';
import AuthorsModal from './authors-modal';
import clsx from 'clsx';
import { Github, Twitter } from 'lucide-react';

import { publicClient } from '@/lib/client';
import type { Author } from '@/lib/types/protocol';
import { getShortenedAddress } from '@/lib/utils';

import AddressLink from '@/components/templates/address-link';
import Avatar from '@/components/templates/avatar';
import ENSAvatar from '@/components/templates/ens-avatar';
import { IconButton } from '@/components/ui';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type AuthorsDisplayProps = {
  data: Author[];
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const AuthorsDisplay: FC<AuthorsDisplayProps> = ({ data }) => {
  const id = useId();

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm font-book text-gray-200">
        Puzzles By
      </label>
      <div
        id={id}
        className="flex w-fit items-center -space-x-4 rounded-full border border-stroke bg-gray-600 p-1"
      >
        {data.slice(0, 7).map(async (author, index) => {
          const ensName = await cache(
            async () => await publicClient.getEnsName({ address: author.address }),
          )();

          return (
            <AuthorAvatar key={index} author={author} index={index}>
              {ensName ? (
                <ENSAvatar name={ensName} size={52} />
              ) : (
                <Avatar src={author.avatar ?? ''} alt={author.address} size={52} />
              )}
            </AuthorAvatar>
          );
        })}
        {data.length > 7 ? (
          <AuthorsModal data={data}>
            {data.map(async (author, index) => {
              const ensName = await cache(
                async () => await publicClient.getEnsName({ address: author.address }),
              )();
              const displayName = author.name ?? ensName ?? getShortenedAddress(author.address);

              return (
                <div
                  key={author.address}
                  className={clsx(
                    'flex items-center justify-between py-3',
                    index > 0 ? 'border-t border-stroke' : '',
                  )}
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-stroke bg-gray-600">
                    {ensName ? (
                      <ENSAvatar name={ensName} size={40} />
                    ) : (
                      <Avatar src={author.avatar ?? ''} alt={author.address} size={40} />
                    )}
                  </div>
                  <div className="ml-3.5 grow">
                    <div className="text-gray-100">{displayName}</div>
                    <AddressLink className="w-fit text-sm" address={author.address} />
                  </div>
                  <div className="flex items-center gap-2">
                    {author.twitter ? (
                      <IconButton
                        variant="outline"
                        intent="neutral"
                        href={`https://twitter.com/${author.twitter}`}
                        newTab
                      >
                        <Twitter />
                      </IconButton>
                    ) : null}
                    {author.github ? (
                      <IconButton
                        variant="outline"
                        intent="neutral"
                        href={`https://github.com/${author.github}`}
                        newTab
                      >
                        <Github />
                      </IconButton>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </AuthorsModal>
        ) : null}
      </div>
    </div>
  );
};

export default AuthorsDisplay;

import { cache } from 'react';

import AuthorFacepileAvatar from './avatar';
import AuthorFacepileModal from './modal';
import type { UserInfo } from '@prisma/client';
import { Github } from 'lucide-react';

import { ethereumClient } from '@/lib/client';
import { getShortenedAddress } from '@/lib/utils';

import LogoIcon from '@/components/common/logo-icon';
import AddressLink from '@/components/templates/address-link';
import UserAvatar from '@/components/templates/user-avatar';
import UserHoverCard from '@/components/templates/user-hover-card';
import { ButtonGroup, IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type AuthorFacepileProps = {
  data: UserInfo[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const AuthorFacepile: React.FC<AuthorFacepileProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-book text-gray-200">Puzzles By</div>
      <div className="flex w-fit items-center -space-x-4 rounded-full border border-stroke bg-gray-600 p-1">
        {data.length > 0 ? (
          data.slice(0, 7).map(async (author, index) => {
            const ensName = await cache(
              async () =>
                await ethereumClient.getEnsName({ address: author.address as `0x${string}` }),
            )();
            const ensAvatar = await cache(async () =>
              ensName ? await ethereumClient.getEnsAvatar({ name: ensName }) : undefined,
            )();

            return (
              <AuthorFacepileAvatar
                key={index}
                user={author}
                index={index}
                ensAvatar={ensAvatar ?? undefined}
              />
            );
          })
        ) : (
          <div className="flex h-[52px] flex-col items-center justify-center px-7">
            <div className="text-sm font-medium leading-[1.125rem] text-gray-100">No authors</div>
            <div className="text-xs leading-4 text-gray-200">No authors were found.</div>
          </div>
        )}
        {data.length > 7 ? (
          <AuthorFacepileModal length={data.length}>
            {data.map(async (author, index) => {
              const ensName = await cache(
                async () =>
                  await ethereumClient.getEnsName({ address: author.address as `0x${string}` }),
              )();
              const ensAvatar = await cache(async () =>
                ensName ? await ethereumClient.getEnsAvatar({ name: ensName }) : undefined,
              )();
              const displayName =
                author.displayName ??
                ensName ??
                getShortenedAddress(author.address as `0x${string}`);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between border-t border-stroke py-3 first:border-0"
                >
                  <div className="flex items-center gap-3.5">
                    <UserAvatar size={40} image={ensAvatar} name={displayName} />
                    <div className="flex flex-col">
                      <div className="text-gray-100">{displayName}</div>
                      <UserHoverCard
                        address={author.address as `0x${string}`}
                        trigger={
                          <AddressLink
                            className="w-fit text-sm"
                            address={author.address as `0x${string}`}
                            chainId={1}
                          />
                        }
                        inPortal
                      />
                    </div>
                  </div>
                  <ButtonGroup>
                    {author.twitter ? (
                      <IconButton
                        variant="outline"
                        intent="neutral"
                        href={`https://twitter.com/${author.twitter}`}
                        newTab
                      >
                        <LogoIcon.X />
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
                  </ButtonGroup>
                </div>
              );
            })}
          </AuthorFacepileModal>
        ) : null}
      </div>
    </div>
  );
};

export default AuthorFacepile;

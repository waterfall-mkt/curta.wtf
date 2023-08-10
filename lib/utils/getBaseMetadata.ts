import type { Metadata } from 'next';

const getBaseMetadata = ({
  title,
  description = 'Curta is a CTF protocol, where players create and solve EVM puzzles to earn NFTs.',
  titleTemplate = '%s | Curta',
}: {
  title: string;
  description?: string;
  titleTemplate?: string;
}): Metadata => {
  return {
    title,
    openGraph: {
      title: titleTemplate.replace('%s', title),
      description,
      siteName: 'curta.wtf',
      url: 'https://curta.wtf',
      locale: 'en_US',
    },
    twitter: {
      title: titleTemplate.replace('%s', title),
      description,
      site: '@curta_ctf',
      siteId: '1604186457165406210',
      creator: '@waterfall_mkt',
      creatorId: '1466508083929223176',
    },
  };
};

export default getBaseMetadata;

import type { Metadata } from 'next';

const getBaseMetadata = (
  title: string,
  description: string,
  titleTemplate: string = '%s | Curta',
): Metadata => {
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

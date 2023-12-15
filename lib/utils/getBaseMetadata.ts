import type { Metadata } from 'next';

const getBaseMetadata = ({
  title,
  description = 'Curta is a talent discovery competition platform and community of protocol engineers.',
  titleTemplate = '%s | Curta',
  image,
}: {
  title: string;
  description?: string;
  titleTemplate?: string;
  image?: string;
}): Metadata => {
  const images = image ? [{ url: image, width: 1200, height: 630 }] : undefined;

  return {
    title,
    description,
    openGraph: {
      title: titleTemplate.replace('%s', title),
      description,
      siteName: 'curta.wtf',
      url: 'https://curta.wtf',
      locale: 'en_US',
      images,
    },
    twitter: {
      title: titleTemplate.replace('%s', title),
      description,
      site: '@curta_ctf',
      siteId: '1604186457165406210',
      creator: '@waterfall_mkt',
      creatorId: '1466508083929223176',
      card: image ? 'summary_large_image' : undefined,
      images,
    },
  };
};

export default getBaseMetadata;

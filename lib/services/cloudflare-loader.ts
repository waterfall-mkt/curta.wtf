const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = [`width=${width}`];
  if (quality) params.push(`quality=${quality}`);

  return `https://curta.wtf/cdn-cgi/image/${params.join(',')}/${normalizeSrc(src)}`;
}

export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;
  const params = [`width=${width}`];
  if (quality) params.push(`quality=${quality}`);

  return `https://curta.wtf/cdn-cgi/image/${params.join(',')}/${normalizedSrc}`;
}

/**
 * A helper function to parse a chain ID and ID from a slug in the form
 * `${chainId}:${id}` or `${id}`.
 * @dev Returns `null` if the slug is invalid.
 * @param slug The slug to parse either in the form `${chainId}:${id}` or
 * `${id}`.
 * @returns An object containing the chain ID `chainId` and `id` in the form
 * `{ chainId: number, id: number }` or `null` if the slug is invalid.
 */
const getChainIdAndId = (slug: string): { chainId: number; id: number } | null => {
  const [x, y] = slug.split(':');
  const [numX, numY] = [Number(x), Number(y)];

  // `slug` is in the form `${id}`
  if (!isNaN(numX) && isNaN(numY)) return { chainId: 1, id: numX };
  // `slug` is in the form `${chainId}:${id}`
  if (!isNaN(numX) && !isNaN(numY)) return { chainId: numX, id: numY };

  // Slug is invalid.
  return null;
};

export default getChainIdAndId;

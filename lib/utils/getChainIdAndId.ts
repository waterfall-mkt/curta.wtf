/**
 * A helper function to parse a chain ID and ID from a slug in the form
 * `${chainId}:${id}`, `${chainName}:${id}`, or `${id}`.
 * @dev Returns `null` if the slug is invalid.
 * @param slug The slug to parse either in the form `${chainId}:${id}`,
 * `${chainName}:${id}`, or `${id}`.
 * @param defaultChainId The default chain ID to use if the slug is in the form
 * `${id}`.
 * @returns An object containing the chain ID `chainId` and `id` in the form
 * `{ chainId: number, id: number }` or `null` if the slug is invalid.
 */
const getChainIdAndId = (
  slug: string,
  defaultChainId: 1 | 8453 | 11155111 | 84531 | 84532 = 1,
): { chainId: number; id: number } | null => {
  // Note: if any chain's name is a substring of another chain's name, replace
  // the longer chain's name first.
  const [x, y] = decodeURIComponent(
    slug
      .toLowerCase()
      .replace('base-sepolia', '84532')
      .replace('base-goerli', '84531')
      .replace('sepolia', '11155111')
      .replace('eth', '1')
      .replace('base', '8453'),
  ).split(':');
  const [numX, numY] = [Number(x), Number(y)];

  // `slug` is in the form `${id}`
  if (!isNaN(numX) && isNaN(numY)) return { chainId: defaultChainId, id: numX };
  // `slug` is in the form `${chainId}:${id}`
  if (!isNaN(numX) && !isNaN(numY)) return { chainId: numX, id: numY };

  // Slug is invalid.
  return null;
};

export default getChainIdAndId;

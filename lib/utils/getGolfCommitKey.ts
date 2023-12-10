import { type Address, encodeAbiParameters, type Hash, keccak256 } from 'viem';

/**
 * Returns the key for a commit to some Golf course, which is equivalent to the
 * following:
 * ```sol
 * keccak256(abi.encode(msg.sender, _bytecode, _salt));
 * ```
 * @param address The address of the sender.
 * @param bytecode The bytecode of the solution.
 * @param salt The salt of the commit.
 * @returns The key for the commit.
 */
const getGolfCommitKey = ({
  address,
  bytecode,
  salt = 0n,
}: {
  address: Address;
  bytecode: Hash;
  salt?: bigint;
}): Hash => {
  return keccak256(
    encodeAbiParameters(
      [{ type: 'address' }, { type: 'bytes' }, { type: 'uint256' }],
      [address, bytecode, salt],
    ),
  );
};

export default getGolfCommitKey;

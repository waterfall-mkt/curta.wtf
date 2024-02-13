// -----------------------------------------------------------------------------
// Chains
// -----------------------------------------------------------------------------

const chains = [
  // Mainnets
  { id: 1, name: 'Ethereum', isTestnet: false },
  { id: 8453, name: 'Base', isTestnet: false },
  // Testnets
  { id: 11155111, name: 'Sepolia', isTestnet: true },
  { id: 84531, name: 'Base Goerli', isTestnet: true },
];

module.exports = { chains };

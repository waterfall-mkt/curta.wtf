declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /* Site config */
      PRELAUNCH: boolean;
      NEXT_PUBLIC_BLOCK_EXPLORER: string;
      NEXT_PUBLIC_CHAIN_ID: 1 | 5 | 17;
      /* Chain config */
      NEXT_PUBLIC_CURTA_ADDRESS: `0x${string}`;
      NEXT_PUBLIC_AUTHORSHIP_TOKEN_ADDRESS: `0x${string}`;
      /* Supabase */
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_SUPABASE_SCHEMA: `${'mainnet' | 'goerli' | 'constellation'}_${'test' | 'prod'}`;
      /* Services */
      NEXT_PUBLIC_ALCHEMY_ID: string;
    }
  }
}

export {};

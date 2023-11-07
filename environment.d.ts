declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Site config
      NEXT_PUBLIC_BASE_URL: string;
      CURTA_SITE_API_KEY: string;
      // Chain config
      NEXT_PUBLIC_CURTA_ADDRESS: `0x${string}`;
      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      // Services
      NEXT_PUBLIC_ALCHEMY_ID: string;
      NEXT_PUBLIC_WALLETCONNECT_ID: string;
    }
  }
}

export {};

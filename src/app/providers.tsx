'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LazorkitProvider } from "@lazorkit/wallet";

interface Account {
  publicKey?: any;
  address?: string;
  [key: string]: any;
}

interface AccountContextType {
  account: Account | null;
  setAccount: (account: Account | null) => void;
}

const AccountContext = createContext<AccountContextType | null>(null);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error('useAccount must be used within AccountProvider');
  return context;
};

function AccountProviderInner({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LazorkitProvider
      rpcUrl="https://api.devnet.solana.com" // Solana RPC endpoint
      portalUrl={process.env.NEXT_PUBLIC_LAZORKIT_PORTAL_URL || "https://portal.lazor.sh"} // passkey portal
      paymasterConfig={{
        paymasterUrl: process.env.NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL || "https://kora.devnet.lazorkit.com",
      }} // gasless transactions
    >
      <AccountProviderInner>
        {children}
      </AccountProviderInner>
    </LazorkitProvider>
  );
}

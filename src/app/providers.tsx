"use client";

import React, { createContext, useContext, useState } from 'react';
import { LazorkitProvider, useWallet as useLazorkitWallet } from "@lazorkit/wallet";

interface WalletContextType {
  account: any;
  setAccount: (account: any) => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWalletContext must be used within WalletProvider');
  return context;
};

function WalletProviderInner({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<any>(null);

  return (
    <WalletContext.Provider value={{ account, setAccount }}>
      {children}
    </WalletContext.Provider>
  );
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazorkitProvider
      rpcUrl="https://api.devnet.solana.com"
      portalUrl={process.env.LAZORKIT_PORTAL_URL || "https://portal.lazorkit.com"}
      paymasterConfig={{ paymasterUrl: process.env.LAZORKIT_PAYMASTER_URL || "https://paymaster.lazorkit.com" }}
    >
      <WalletProviderInner>
        {children}
      </WalletProviderInner>
    </LazorkitProvider>
  );
}

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LazorkitProvider, useWallet as useLazorkitWallet } from "@lazorkit/wallet";
import { PublicKey } from '@solana/web3.js';

// ----------------------------
// Types
// ----------------------------
interface WalletAccount {
  publicKey?: PublicKey | string; // Make optional since Lazorkit WalletInfo might not have it
  balance?: number;
  // Allow any additional properties from Lazorkit WalletInfo
  [key: string]: any;
}

interface WalletContextType {
  account: WalletAccount | null;
  setAccount: (account: WalletAccount) => void;
  lazorkitWallet: ReturnType<typeof useLazorkitWallet>;
}

// ----------------------------
// Context
// ----------------------------
const WalletContext = createContext<WalletContextType | null>(null);

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWalletContext must be used within WalletProvider');
  return context;
};

// ----------------------------
// Inner Provider for app state
// ----------------------------
function WalletProviderInner({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<WalletAccount | null>(null);
  const lazorkitWallet = useLazorkitWallet(); // gives connect(), sendTransaction(), isConnected, etc.

  return (
    <WalletContext.Provider value={{ account, setAccount, lazorkitWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

// ----------------------------
// Main Providers
// ----------------------------
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LazorkitProvider
      rpcUrl="https://api.devnet.solana.com" // Solana RPC endpoint
      portalUrl={process.env.NEXT_PUBLIC_LAZORKIT_PORTAL_URL || "https://portal.lazor.sh"} // passkey portal
      paymasterConfig={{
        paymasterUrl: process.env.NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL || "https://kora.devnet.lazorkit.com",
      }} // gasless transactions
    >
      <WalletProviderInner>
        {children}
      </WalletProviderInner>
    </LazorkitProvider>
  );
}

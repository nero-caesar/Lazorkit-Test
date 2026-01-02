"use client";

import { LazorkitProvider } from "../../lib/lazorkit";

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
      {children}
    </LazorkitProvider>
  );
}

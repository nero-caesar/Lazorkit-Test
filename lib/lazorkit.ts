// lib/lazorkit.ts - Lazorkit SDK utilities and helpers
// This file contains reusable logic for working with Lazorkit wallets

import { PublicKey } from '@solana/web3.js';

// Lazorkit configuration constants
export const LAZORKIT_CONFIG = {
  rpcUrl: 'https://api.devnet.solana.com', // Solana Devnet for testing
  portalUrl: process.env.LAZORKIT_PORTAL_URL || 'https://portal.lazorkit.com',
  paymasterUrl: process.env.LAZORKIT_PAYMASTER_URL || 'https://paymaster.lazorkit.com',
};

// Utility function to shorten wallet addresses for display
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

// Validate a Solana address
export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

// Format SOL amount for display
export function formatSolAmount(lamports: number): string {
  const sol = lamports / 1_000_000_000; // Convert lamports to SOL
  return sol.toFixed(4) + ' SOL';
}

// Debug helper for Lazorkit operations
export function debugLazorkit(message: string, data?: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Lazorkit Debug] ${message}`, data);
  }
}

// Common transaction options for gasless transactions
export const GASLESS_TX_OPTIONS = {
  feeToken: 'USDC', // Pay fees in USDC instead of SOL
  clusterSimulation: 'devnet' as const, // Use devnet for testing
};

// Test recipient address (Solana program)
export const TEST_RECIPIENT = '11111111111111111111111111111112';
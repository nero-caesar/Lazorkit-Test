"use client";

import React from 'react';
import './wallet.css';
import { useWallet } from '@lazorkit/wallet';
import { useAccount } from '../../app/providers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

function Wallet() {
  const [loading, setLoading] = React.useState(false);
  const wallet = useWallet();
  const { account } = useAccount();
  const router = useRouter();

  const handleSend = async () => {
    // HARD GUARD — prevents the crash
    if (!wallet.isConnected || !account) {
      toast.error('Wallet not connected');
      return;
    }

    try {
      setLoading(true);

      const fromPubkey = account.publicKey 
        ? (typeof account.publicKey === 'string' ? new PublicKey(account.publicKey) : account.publicKey)
        : account.address ? new PublicKey(account.address) : null;

      if (!fromPubkey) {
        toast.error('Invalid wallet address');
        return;
      }

      const instructions = [
        SystemProgram.transfer({
          fromPubkey,
          toPubkey: new PublicKey(
            'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
          ),
          lamports: 0.001 * LAMPORTS_PER_SOL,
        }),
      ];

      const signature = await wallet.signAndSendTransaction({
        instructions,
        transactionOptions: {
          feeToken: 'USDC',
        },
      });

      toast.success(`Transaction sent! Signature: ${signature}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section2">
      <div className="wallet-con">
        <h1>Dashboard</h1>

        <div className="wallet-status">
          <p>
            <strong>Connection Status:</strong>{' '}
            {wallet.isConnected ? 'Connected' : 'Not Connected'}
          </p>

          {account && (
            <p>
              <strong>Wallet Address:</strong>{' '}
              {account.publicKey 
                ? (typeof account.publicKey === 'string' ? account.publicKey : account.publicKey.toString())
                : account.address || 'Not available'}
            </p>
          )}
        </div>

        <h2>Send Gasless Transaction</h2>
        <p>Test gasless transaction: Send 0.001 SOL</p>

        <button
          className="wallet-btn"
          onClick={handleSend}
          disabled={loading || !wallet.isConnected}
        >
          {loading ? 'Sending...' : 'Send Test Transaction'}
        </button>

        <button
          className="wallet-btn secondary"
          onClick={() => router.push('/transaction')}
        >
          Go to Full Transaction Page
        </button>

        <p className="wallet-text">Fees are sponsored by your smart wallet</p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        theme="dark"
      />
    </section>
  );
}

export default Wallet;

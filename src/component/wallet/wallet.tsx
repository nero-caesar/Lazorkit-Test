"use client";

import React from 'react'
import './wallet.css';
import { useWallet } from '@lazorkit/wallet';
import { useWalletContext } from '../../app/providers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

function Wallet() {
  const [loading, setLoading] = React.useState(false);
  const wallet = useWallet();
  const { account } = useWalletContext();

  // This page is accessible only after connecting with Lazorkit
  // It demonstrates gasless transactions using passkey-authenticated wallets

  const handleSend = async () => {
    if (!wallet.isConnected || !account) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setLoading(true);
      // Create a simple SOL transfer transaction
      // In production, this would be a USDC transfer, but using SOL for demo
      const instructions = [
        SystemProgram.transfer({
          fromPubkey: account.publicKey, // Use the connected wallet's public key
          toPubkey: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC mint address as example recipient
          lamports: 0.001 * LAMPORTS_PER_SOL, // Small test amount
        }),
      ];

      // Lazorkit handles signing with passkeys and sends gaslessly via paymaster
      // No need for user to hold SOL for gas fees
      const signature = await wallet.signAndSendTransaction({
        instructions,
        transactionOptions: { feeToken: 'USDC' }, // Pay gas in USDC
      });

      toast.success(`Gasless transaction sent! Signature: ${signature}`);
      // Reset any form state if needed
    } catch (error) {
      toast.error('Failed to send transaction: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='section2'>
        <div className='wallet-con'>
            <h1>Dashboard</h1>
            
            {/* Display wallet connection status and address */}
            <div className='wallet-status'>
              <p><strong>Connection Status:</strong> {wallet.isConnected ? 'Connected' : 'Not Connected'}</p>
              {account && (
                <p><strong>Wallet Address:</strong> {account.publicKey.toString()}</p>
              )}
            </div>
            
            <h2>Send Gasless Transaction</h2>
            <p>Test gasless transaction: Send 0.001 SOL to a demo address</p>
            <button className='wallet-btn' onClick={handleSend} disabled={loading || !wallet.isConnected}>
              {loading ? 'Sending...' : 'Send Test Transaction'}
            </button>
            <p className='wallet-text'>Fees are sponsored by your smart wallet</p>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
    </section>
  )
}

export default Wallet

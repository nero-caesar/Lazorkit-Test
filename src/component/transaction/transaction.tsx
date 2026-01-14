"use client";

import React from 'react'
import './transaction.css';
import { useWallet } from '@lazorkit/wallet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useRouter } from 'next/navigation';
import { isValidSolanaAddress, debugLazorkit, GASLESS_TX_OPTIONS, TEST_RECIPIENT } from '../../../lib/lazorkit';

function Transaction() {
  const [recipient, setRecipient] = React.useState('');
  const [amount, setAmount] = React.useState('0.001');
  const [loading, setLoading] = React.useState(false);
  const wallet = useWallet();
  const router = useRouter();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict guards: check both isConnected AND publicKey
    if (!wallet.isConnected || !wallet.publicKey) {
      toast.error('Please connect your wallet first');
      router.push('/');
      return;
    }
    
    if (!recipient || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isValidSolanaAddress(recipient)) {
      toast.error('Please enter a valid Solana address');
      return;
    }

    try {
      setLoading(true);
      debugLazorkit('Starting transaction', { recipient, amount });

      // Use wallet.publicKey directly
      const fromPubkey = wallet.publicKey;

      const instructions = [
        SystemProgram.transfer({
          fromPubkey,
          toPubkey: new PublicKey(recipient),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        }),
      ];

      debugLazorkit('Sending transaction with instructions:', instructions);

      const signature = await wallet.signAndSendTransaction({
        instructions,
        transactionOptions: GASLESS_TX_OPTIONS,
      });

      debugLazorkit('Transaction successful:', signature);
      toast.success(`Gasless transaction sent! Signature: ${signature}`);

      setRecipient('');
      setAmount('0.001');
    } catch (error) {
      debugLazorkit('Transaction failed:', error);
      toast.error('Failed to send transaction: ' + error);
    } finally {
      setLoading(false);
    }
  };

  if (!wallet.isConnected) {
    return <div>Please connect your wallet first...</div>;
  }

  return (
    <section className='section3'>
        <div className='transaction-con'>
            <h1>Send Gasless Transaction</h1>

            <div className='wallet-info'>
              <p><strong>Your Wallet:</strong> {wallet.publicKey ? wallet.publicKey.toString() : 'Not available'}</p>
              <p>Connected via Lazorkit passkeys</p>
            </div>

            <form className='transaction-form' onSubmit={handleSend}>
                <div>
                    <label>Recipient Address</label>
                    <input
                      type="text"
                      placeholder={`Enter Solana address (e.g., ${TEST_RECIPIENT})`}
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      required
                    />
                </div>
                <div>
                    <label>Amount (SOL)</label>
                    <input
                      type="number"
                      step="0.001"
                      min="0.001"
                      placeholder='Amount in SOL'
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                </div>
                <button className='transaction-btn' type="submit" disabled={loading || !wallet.publicKey}>
                  {loading ? 'Sending...' : 'Send Gasless Transaction'}
                </button>
            </form>

            <div className='transaction-info'>
              <h3>How Gasless Works:</h3>
              <ul>
                <li>🔐 Biometric confirmation required</li>
                <li>💰 Fees paid in USDC (not SOL)</li>
                <li>⚡ No waiting for SOL balance</li>
                <li>🔒 Hardware-bound security</li>
              </ul>
            </div>
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

export default Transaction
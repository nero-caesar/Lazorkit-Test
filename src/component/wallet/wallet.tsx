"use client";

import React from 'react'
import './wallet.css';
import { useWallet } from '../../../lib/lazorkit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

function Wallet() {
  const [recipient, setRecipient] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { signAndSendTransaction, isConnected } = useWallet();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    if (!recipient || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      // For demo, using SOL transfer instead of USDC
      const instructions = [
        SystemProgram.transfer({
          fromPubkey: new PublicKey('11111111111111111111111111111112'), // Mock from
          toPubkey: new PublicKey(recipient),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        }),
      ];

      const signature = await signAndSendTransaction({
        instructions,
        transactionOptions: { feeToken: 'USDC' },
      });

      toast.success(`Transaction sent! Signature: ${signature}`);
      setRecipient('');
      setAmount('');
    } catch (error) {
      toast.error('Failed to send transaction: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='section2'>
        <div className='wallet-con'>
            <h1>Send Gasless USDC Transaction</h1>
            <form className='wallet-form' onSubmit={handleSend}>
                <div>
                    <label>Recipient Address</label>
                    <input
                      type="text"
                      placeholder='Enter recipient address'
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                </div>
                <div>
                    <label>Amount (USDC)</label>
                    <input
                      type="number"
                      placeholder='Enter amount in USDC'
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button className='wallet-btn' type="submit" disabled={loading || !isConnected}>
                  {loading ? 'Sending...' : 'Send USDC'}
                </button>
            </form>
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

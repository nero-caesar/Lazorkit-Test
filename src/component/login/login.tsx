"use client";

import React from 'react'
import { IoFingerPrint } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { GiPadlock } from "react-icons/gi";
import './login.css';
import Image from 'next/image';
import img from '../../../public/lazorkit-logo.png';
import { useWallet } from '../../../lib/lazorkit';

function Login() {
  const { connect, isConnected } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
      alert('Connected successfully!');
    } catch (error) {
      alert('Failed to connect: ' + error);
    }
  };

  return (
    <section className='section1'>
      <div className='login-con'>
       <div className='login-logo'>
        <Image 
          src={img} 
          alt="Lazorkit Logo"
          width={70}
        />
        <h1>Lazorkit</h1>
       </div>
        <div className='login-text'>
          <h1>Secure. Gasless. One-Tap Access.</h1>
          <p>Sign in to Web3 apps with a passkey - no passwords, no gas fees, no need for a crypto wallet.</p>
        </div>
        <div className='login-icons'>
          <IoFingerPrint size={55} color='rgb(91, 46, 255)'/>
          <GoShieldCheck size={55} color='rgb(91, 46, 255)'/>
          <GiPadlock size={55} color='rgb(91, 46, 255)'/>
        </div>
        <button className='login-btn' onClick={handleConnect} disabled={isConnected}>
          {isConnected ? 'Connected' : 'Continue with Passkey'}
        </button>
        <a href="">Learn how passkeys work</a>
      </div>
    </section>
  )
}

export default Login

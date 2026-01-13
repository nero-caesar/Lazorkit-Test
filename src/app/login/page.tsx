"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '../../component/login/login';
import { useWallet } from '@lazorkit/wallet';

export default function LoginPage() {
  const { isConnected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard');
    }
  }, [isConnected, router]);

  return <Login />;
}
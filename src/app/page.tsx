"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Lazorkit Demo</h1>
      <Link href="/login">Get Started</Link>
    </main>
  );
}

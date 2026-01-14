"use client";

import React, { useEffect } from "react";
import { IoFingerPrint } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { GiPadlock } from "react-icons/gi";
import "./login.css";
import Image from "next/image";
import img from "../../../public/lazorkit-logo.png";
import { useWallet } from "@lazorkit/wallet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function Login() {
  const [loading, setLoading] = React.useState(false);
  const wallet = useWallet();
  const router = useRouter();

  // React to wallet connection state changes
  useEffect(() => {
    if (wallet.isConnected && wallet.publicKey) {
      router.push('/dashboard');
    }
  }, [wallet.isConnected, wallet.publicKey, router]);

  const handleConnect = async () => {
    try {
      setLoading(true);
      console.log("Starting Lazorkit connection...");
      
      // Call connect() - do NOT store the result
      // Lazorkit will update wallet state asynchronously
      await wallet.connect();
      
      console.log("Connect initiated. Wallet state will update.");
      toast.success("Initiating connection...");
    } catch (error) {
      console.error("Lazorkit connection failed:", error);
      toast.error("Failed to connect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section1">
      <div className="login-con">
        <div className="login-logo">
          <Image src={img} alt="Lazorkit Logo" width={70} />
          <h1>Lazorkit</h1>
        </div>

        <div className="login-text">
          <h1>Secure. Gasless. One-Tap Access.</h1>
          <p>
            Sign in to Web3 apps with a passkey — no passwords, no gas fees,
            no need for a crypto wallet.
          </p>
        </div>

        <div className="login-icons">
          <IoFingerPrint size={55} color="rgb(91, 46, 255)" />
          <GoShieldCheck size={55} color="rgb(91, 46, 255)" />
          <GiPadlock size={55} color="rgb(91, 46, 255)" />
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />

        <button
          className={`login-btn ${wallet.isConnected ? "connected" : ""}`}
          onClick={handleConnect}
          disabled={wallet.isConnected || loading}
        >
          {loading
            ? "Connecting..."
            : wallet.isConnected
            ? "Connected"
            : "Continue with Passkey"}
        </button>

        {wallet.isConnected && wallet.publicKey && (
          <div className="wallet-info">
            <p>
              <strong>Wallet Address:</strong>{" "}
              {wallet.publicKey.toString()}
            </p>
            <p>
              Lazorkit wallet created using passkeys — no seed phrases needed!
            </p>
          </div>
        )}

        <a
          href="https://docs.lazorkit.com/passkeys"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn how passkeys work
        </a>
      </div>
    </section>
  );
}

export default Login;

"use client";

import React from "react";
import { IoFingerPrint } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { GiPadlock } from "react-icons/gi";
import "./login.css";
import Image from "next/image";
import img from "../../../public/lazorkit-logo.png";
import { useWallet } from "@lazorkit/wallet";
import { useWalletContext } from "../../app/providers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/navigation";

function Login() {
  const [loading, setLoading] = React.useState(false);
  const { connect, isConnected } = useWallet();
  const { account, setAccount } = useWalletContext();
  const router = useRouter();


  const handleConnect = async () => {
    try {
      setLoading(true);
      console.log("Starting Lazorkit connection...");

      const walletAccount = await connect(); 

      console.log("Connection successful:", walletAccount);

      const walletAny = walletAccount as any;

      const adaptedAccount = {
        ...walletAny,
        publicKey:
          walletAny.publicKey instanceof PublicKey
            ? walletAny.publicKey
            : walletAny.publicKey
            ? new PublicKey(walletAny.publicKey)
            : walletAny.address
            ? new PublicKey(walletAny.address)
            : null,
      };

      setAccount(adaptedAccount);
      toast.success("Connected successfully!");
    } catch (error) {
      console.error("Lazorkit connection failed:", error);
      toast.error("Failed to connect");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isConnected && account) {
      router.push("/dashboard");
    }
  }, [isConnected, account, router]);

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
          className={`login-btn ${isConnected ? "connected" : ""}`}
          onClick={handleConnect}
          disabled={isConnected || loading}
        >
          {loading
            ? "Connecting..."
            : isConnected
            ? "Connected"
            : "Continue with Passkey"}
        </button>

        {isConnected && account && (
          <div className="wallet-info">
            <p>
              <strong>Wallet Address:</strong>{" "}
              {account.publicKey
                ? account.publicKey.toString()
                : "Wallet connected"}
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

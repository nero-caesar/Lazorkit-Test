# Lazorkit Demo App

A Next.js demo showcasing **passkey-based authentication** and **gasless Solana transactions** using the Lazorkit SDK.

## What is Lazorkit?

Lazorkit replaces traditional crypto wallets and passwords with **passkeys** (biometrics like FaceID, TouchID, or Windows Hello). It creates secure smart wallets on Solana that work completely **gasless** - you never need to hold SOL for transaction fees!

### Key Features
- 🔐 **Passkey Login**: No passwords, no seed phrases
- 💰 **Gasless Transactions**: Pay fees in USDC, not SOL
- ⚡ **Smart Wallets**: Hardware-bound security
- 🔄 **Seamless UX**: Biometric confirmation for transactions

## Why Passkeys Matter

Traditional crypto requires:
- Remembering complex seed phrases
- Managing private keys
- Holding native tokens for gas fees

Lazorkit eliminates all this with:
- Biometric authentication you already use
- Gasless transactions sponsored by USDC
- Secure smart accounts on Solana

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd lazorkit-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup** (Optional)
   Create a `.env.local` file:
   ```env
   LAZORKIT_PORTAL_URL=https://portal.lazorkit.com
   LAZORKIT_PAYMASTER_URL=https://paymaster.lazorkit.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

### Step 1: Passkey Login
1. Click "Continue with Passkey"
2. Your browser will prompt for biometric authentication (FaceID, TouchID, etc.)
3. Lazorkit creates a secure smart wallet for you
4. You'll be redirected to the dashboard

### Step 2: View Your Wallet
- See your wallet address (shortened for display)
- Connection status shows "Connected"
- Your wallet is now ready for gasless transactions!

### Step 3: Send Gasless Transactions
1. Click "Go to Full Transaction Page"
2. Enter a recipient Solana address (try `11111111111111111111111111111112` for testing)
3. Enter amount in SOL (minimum 0.001)
4. Click "Send Gasless Transaction"
5. Confirm with your biometrics
6. Transaction completes instantly - no gas fees!

## How Gasless Works

Normally, Solana transactions require SOL for gas fees. Lazorkit changes this:

1. **Biometric Confirmation**: Your passkey signs the transaction
2. **Smart Wallet**: Transaction is sent from your Lazorkit smart account
3. **Paymaster Sponsorship**: Fees are paid in USDC instead of SOL
4. **Instant Completion**: No waiting for confirmations or gas

## Verifying Transactions

After sending a transaction, you'll see a signature like:
`5xK...3dE`

To verify on Solana Explorer:
1. Go to [https://explorer.solana.com](https://explorer.solana.com)
2. Change network to "Devnet" (top right)
3. Paste the signature in the search box
4. View transaction details and confirm success

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Login page (/)
│   ├── dashboard/page.tsx    # Wallet dashboard (/dashboard)
│   ├── transaction/page.tsx  # Transaction page (/transaction)
│   └── providers.tsx         # Lazorkit provider setup
├── component/
│   ├── login/                # Login component
│   ├── wallet/               # Wallet dashboard component
│   └── transaction/          # Transaction component
└── lib/
    └── lazorkit.ts           # SDK utilities and helpers
```

## Troubleshooting

### Portal Not Opening
If the Lazorkit portal doesn't appear:
- Check browser console for errors
- Ensure you're on `localhost:3000` (HTTPS required for passkeys)
- Try a different browser (Chrome recommended)

### Transaction Failures
- Verify recipient address is valid Solana address
- Check network connection
- Ensure paymaster URL is accessible

### Passkey Issues
- Make sure your device supports passkeys (FaceID, TouchID, Windows Hello)
- Try clearing browser data
- Check if passkeys are enabled in browser settings

## Learn More

- [Lazorkit Documentation](https://docs.lazorkit.com)
- [Solana Documentation](https://docs.solana.com)
- [WebAuthn/Passkeys](https://webauthn.io)

## Contributing

This is a demo project for the Lazorkit bounty. Feel free to:
- Report issues
- Suggest improvements
- Submit pull requests

Built with ❤️ for the crypto community

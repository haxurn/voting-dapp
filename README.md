# USA Votes! 🇺🇸

A decentralized voting application built on Ethereum blockchain for the 2024 Presidential Election. Features a modern, responsive UI with dark/light themes, real-time results, and party logos.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.24-orange.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)

## ✨ Features

- 🗳️ **Decentralized Voting** - Blockchain-based voting system
- 🎨 **Modern UI** - Neo-brutalism design with cartoon aesthetics
- 🌓 **Dark/Light Theme** - Toggle between themes with persistence
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- 🎭 **Party Logos** - Official Wikipedia images for each party
- 📊 **Live Results** - Real-time vote counts and percentages
- 🔒 **Secure** - One vote per address, immutable on blockchain
- 🎬 **Framer Motion** - Smooth animations throughout
- 🔔 **Custom Toasts** - Beautiful notification system
- 📖 **Interactive Guide** - Built-in setup walkthrough

## 🏛️ Political Parties

- **Democrat** 🔵 - Blue Donkey
- **Republican** 🔴 - Red Elephant
- **Libertarian** 🟡 - Porcupine
- **Green Party** 🟢 - Sunflower
- **Independent** ⚪ - Generic Icon

## 🛠️ Tech Stack

### Smart Contracts
- **Solidity** 0.8.24
- **Hardhat** - Development environment
- **Ethers.js** - Blockchain interaction
- **Chai** - Testing framework

### Frontend
- **React** 18 + **TypeScript**
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Ethers.js** 6.15 - Web3 integration
- **MetaMask** - Wallet connection

## 📋 Prerequisites

- **Node.js** v18 or higher
- **pnpm** (or npm/yarn)
- **MetaMask** browser extension

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
pnpm install

# Install smart contract dependencies
cd smart_contracts
pnpm install
cd ..
```

### 2. Start Local Blockchain

Open a terminal and run:

```bash
cd smart_contracts
npx hardhat node
```

**Keep this terminal running!** This starts a local Ethereum blockchain on `http://127.0.0.1:8545`

### 3. Deploy Smart Contract

Open a **new terminal** and run:

```bash
cd smart_contracts
npx hardhat run scripts/deploy.ts --network localhost
```

**Copy the deployed contract address!** It should look like:
```
Voting contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 4. Initialize Election

```bash
cd smart_contracts
npx hardhat run scripts/initialize.ts --network localhost
```

You should see:
```
Election initialized successfully! 🇺🇸
Poll count: 1
```

### 5. Configure MetaMask

#### Add Hardhat Network
1. Open MetaMask
2. Click network dropdown → **Add Network** → **Add a network manually**
3. Enter:
   - **Network Name**: `Hardhat Localhost`
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`
4. Click **Save**

#### Import Test Account
1. MetaMask → **Import Account** → **Private Key**
2. Paste this private key:
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
3. You now have **10,000 ETH** for testing! 🎉

### 6. Start Frontend

In the **third terminal**:

```bash
pnpm run dev
```

Open your browser to: **http://localhost:5173**

### 7. Connect & Vote!

1. Click **"Connect Wallet"**
2. Approve in MetaMask
3. Switch to **"Public Dashboard"**
4. Choose your party and click **VOTE**
5. Confirm in MetaMask
6. Watch results update in real-time! 🎉

## 📁 Project Structure

```
web3/
├── src/                          # Frontend source
│   ├── components/
│   │   ├── AdminDashboard.tsx    # Election management
│   │   ├── PublicDashboard.tsx   # Voting interface
│   │   ├── PollList.tsx          # Display polls & results
│   │   ├── WalletConnect.tsx     # MetaMask integration
│   │   ├── ThemeToggle.tsx       # Dark/Light mode
│   │   ├── SetupGuide.tsx        # Interactive tutorial
│   │   ├── Toast.tsx             # Notifications
│   │   └── AnimatedBackground.tsx # Framer Motion bg
│   ├── hooks/
│   │   └── useToast.ts           # Toast hook
│   ├── abi/
│   │   └── Voting.json           # Contract ABI
│   ├── App.tsx                   # Main app
│   ├── App.css                   # Styles
│   └── index.css                 # Global styles
├── smart_contracts/
│   ├── contracts/
│   │   └── Voting.sol            # Smart contract
│   ├── scripts/
│   │   ├── deploy.ts             # Deployment script
│   │   ├── initialize.ts         # Initialize election
│   │   └── check_state.ts        # Verify state
│   ├── test/
│   │   └── Voting.test.ts        # Contract tests
│   └── hardhat.config.ts         # Hardhat config
└── README.md
```

## 🧪 Testing

Run smart contract tests:

```bash
cd smart_contracts
npx hardhat test
```

Expected output:
```
  Voting
    Deployment
      ✔ Should start with 0 polls
    Polls
      ✔ Should create a poll
      ✔ Should allow voting
      ✔ Should prevent double voting

  4 passing (661ms)
```

## 🔧 Troubleshooting

### MetaMask "Internal JSON-RPC Error"

**Problem**: MetaMask nonce out of sync after restarting Hardhat.

**Solution**:
1. MetaMask → Settings → Advanced
2. Click **"Clear activity tab data"**
3. Refresh browser

### "Invalid block tag" Errors

**Problem**: MetaMask references old blockchain state.

**Solution**: Same as above - clear MetaMask activity data.

### Contract Address Mismatch

**Problem**: Frontend uses old contract address.

**Solution**:
1. Check deployed address from `deploy.ts` output
2. Update `CONTRACT_ADDRESS` in `src/App.tsx` (line 14)

### Election Already Initialized

**Problem**: Trying to initialize twice.

**Solution**: Just refresh browser and go to Public Dashboard!

## 📜 Smart Contract Functions

### `createPoll(question, options)`
- Creates a new election poll
- **Parameters**: 
  - `question` (string): Poll question
  - `options` (string[]): Array of party names
- **Emits**: `PollCreated` event

### `vote(pollId, optionIndex)`
- Cast a vote for a party
- **Parameters**:
  - `pollId` (uint): Poll ID (0 for first poll)
  - `optionIndex` (uint): Index of party (0-4)
- **Restrictions**: One vote per address
- **Emits**: `Voted` event

### `getPoll(pollId)`
- Get poll data
- **Returns**: Poll struct with question, options, vote counts

### `pollCount()`
- Get total number of polls
- **Returns**: uint256

## 🎨 Customization

### Change Parties

Edit `smart_contracts/scripts/initialize.ts`:

```typescript
const tx = await voting.createPoll(
  "Your question here?",
  ["Party 1", "Party 2", "Party 3"]
);
```

### Update Party Logos

Edit `src/components/PollList.tsx`:

```typescript
const PARTY_IMAGES: { [key: string]: string } = {
  "Party Name": "https://your-image-url.com/logo.png",
  // ...
};
```

### Change Theme Colors

Edit `src/index.css`:

```css
:root {
  --c-yellow: #FFD93D;
  --c-red: #FF6B6B;
  --c-green: #6BCB77;
  --c-blue: #4D96FF;
}
```

## 🔐 Security Notes

⚠️ **This is a DEMO application for local development only!**

- Never use the provided private key on real networks
- Never share your real MetaMask recovery phrase
- Test accounts have no real value
- Smart contract is not audited
- Not suitable for production use

## 📝 License

MIT License - feel free to use this project for learning and development!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📧 Support

If you encounter issues:
1. Check the Troubleshooting section
2. Verify all prerequisites are installed
3. Ensure Hardhat node is running
4. Clear MetaMask activity data

## 🎯 Roadmap

- [ ] Deploy to testnet (Sepolia/Goerli)
- [ ] Add voter verification
- [ ] Implement time-based voting periods
- [ ] Add results visualization charts
- [ ] Multi-language support
- [ ] Mobile app version

---

**Built with ❤️ for decentralized democracy** 🇺🇸

**Enjoy voting!** 🗳️

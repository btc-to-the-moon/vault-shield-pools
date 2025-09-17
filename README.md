# Vault Shield Pools - Secure Investment Platform

A cutting-edge investment platform that provides secure, encrypted investment pools for real-world assets. Built with advanced privacy technologies and modern Web3 integration.

## 🚀 Features

- **Encrypted Investment Pools**: Secure investment opportunities with privacy protection
- **Multi-Wallet Support**: Connect with popular Web3 wallets including MetaMask, Rainbow, and more
- **Smart Contract Integration**: Decentralized investment management with blockchain transparency
- **Privacy-First Design**: Advanced encryption for sensitive financial data
- **Real-Time Analytics**: Comprehensive investment tracking and performance metrics
- **Secure Withdrawal System**: Encrypted withdrawal requests and processing

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **Blockchain**: Ethereum (Sepolia testnet)
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Smart Contracts**: Solidity with advanced privacy features
- **Build Tool**: Vite for fast development and optimized builds

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ and npm
- Git
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Basic understanding of blockchain concepts

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/btc-to-the-moon/vault-shield-pools.git
cd vault-shield-pools
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the application.

## 📁 Project Structure

```
vault-shield-pools/
├── contracts/                 # Smart contracts
│   └── VaultShieldPools.sol  # Main contract
├── src/
│   ├── components/           # React components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and configurations
│   ├── pages/               # Page components
│   └── types/               # TypeScript definitions
├── public/                  # Static assets
└── scripts/                 # Deployment scripts
```

## 🔧 Smart Contract Deployment

### Prerequisites

- Hardhat installed globally
- Sepolia ETH for gas fees
- Private key for deployment

### Deploy to Sepolia

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. Set up environment variables:
```bash
export PRIVATE_KEY=your_private_key_here
export RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

3. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## 🔐 Security Features

- **Encrypted Data Storage**: All sensitive information is encrypted before storage
- **Access Control**: Role-based permissions for different user types
- **Audit Trail**: Complete transaction history with blockchain verification
- **Privacy Protection**: Advanced encryption for financial data
- **Secure Withdrawals**: Multi-step verification for withdrawal requests

## 🎯 Key Components

### Investment Pools
- Create and manage encrypted investment pools
- Set investment parameters and duration
- Track encrypted investor participation

### Wallet Integration
- Seamless connection to multiple wallet providers
- Secure transaction signing and verification
- Real-time balance and transaction monitoring

### Performance Analytics
- Encrypted performance reporting
- Real-time investment tracking
- Comprehensive analytics dashboard

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Manual Deployment

```bash
npm run build
npm run preview
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Open an issue on GitHub
- Check the documentation
- Contact the development team

## 🗺 Roadmap

- [ ] Mainnet deployment
- [ ] Additional wallet providers
- [ ] Mobile application
- [ ] Advanced analytics
- [ ] Cross-chain compatibility
- [ ] Enhanced privacy features

## ⚠️ Disclaimer

This is a demonstration project. Please ensure you understand the risks before investing real funds. Always conduct thorough research and consider consulting with financial advisors.

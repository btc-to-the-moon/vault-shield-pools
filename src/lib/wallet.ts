import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Vault Shield Pools',
  projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID',
  chains: [sepolia],
  ssr: false,
});

export const chainId = '11155111';
export const rpcUrl = 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { VaultShieldPoolsABI } from '@/lib/contract';

const CONTRACT_ADDRESS = '0x...'; // Replace with deployed contract address

export const useVaultShieldPools = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const createPool = async (
    name: string,
    description: string,
    assetType: string,
    totalValue: number,
    minimumInvestment: number,
    duration: number
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VaultShieldPoolsABI,
        functionName: 'createPool',
        args: [name, description, assetType, totalValue, minimumInvestment, duration],
      });
    } catch (err) {
      console.error('Error creating pool:', err);
    }
  };

  const investInPool = async (poolId: number, amount: number) => {
    try {
      // Note: This function does not include direct ETH transfer
      // It only records the investment intention
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VaultShieldPoolsABI,
        functionName: 'investInPool',
        args: [poolId, amount],
      });
    } catch (err) {
      console.error('Error investing in pool:', err);
    }
  };

  const requestWithdrawal = async (poolId: number, amount: number) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VaultShieldPoolsABI,
        functionName: 'requestWithdrawal',
        args: [poolId, amount],
      });
    } catch (err) {
      console.error('Error requesting withdrawal:', err);
    }
  };

  const submitPerformanceReport = async (
    poolId: number,
    totalReturns: number,
    activeInvestors: number,
    totalValue: number,
    reportHash: string
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: VaultShieldPoolsABI,
        functionName: 'submitPerformanceReport',
        args: [poolId, totalReturns, activeInvestors, totalValue, reportHash],
      });
    } catch (err) {
      console.error('Error submitting performance report:', err);
    }
  };

  return {
    createPool,
    investInPool,
    requestWithdrawal,
    submitPerformanceReport,
  };
};

export const usePoolInfo = (poolId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: VaultShieldPoolsABI,
    functionName: 'getPoolInfo',
    args: [BigInt(poolId)],
  });

  return {
    poolInfo: data,
    isLoading,
    error,
  };
};
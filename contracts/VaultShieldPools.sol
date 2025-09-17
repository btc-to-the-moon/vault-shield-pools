// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract VaultShieldPools is SepoliaConfig {
    using FHE for *;
    
    struct InvestmentPool {
        euint32 poolId;
        euint32 totalValue;
        euint32 availableShares;
        euint32 minimumInvestment;
        euint32 investorCount;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        string assetType;
        address manager;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct Investment {
        euint32 investmentId;
        euint32 amount;
        euint32 shares;
        address investor;
        uint256 timestamp;
    }
    
    struct Withdrawal {
        euint32 withdrawalId;
        euint32 amount;
        euint32 shares;
        address investor;
        bool isProcessed;
        uint256 timestamp;
    }
    
    struct PerformanceReport {
        euint32 reportId;
        euint32 totalReturns;
        euint32 activeInvestors;
        euint32 totalValue;
        bool isVerified;
        string reportHash;
        address reporter;
        uint256 timestamp;
    }
    
    mapping(uint256 => InvestmentPool) public pools;
    mapping(uint256 => Investment) public investments;
    mapping(uint256 => Withdrawal) public withdrawals;
    mapping(uint256 => PerformanceReport) public performanceReports;
    mapping(address => euint32) public investorReputation;
    mapping(address => euint32) public managerReputation;
    
    uint256 public poolCounter;
    uint256 public investmentCounter;
    uint256 public withdrawalCounter;
    uint256 public reportCounter;
    
    address public owner;
    address public verifier;
    
    event PoolCreated(uint256 indexed poolId, address indexed manager, string name);
    event InvestmentMade(uint256 indexed investmentId, uint256 indexed poolId, address indexed investor, uint32 amount);
    event WithdrawalRequested(uint256 indexed withdrawalId, uint256 indexed poolId, address indexed investor, uint32 amount);
    event PerformanceReported(uint256 indexed reportId, uint256 indexed poolId, address indexed reporter);
    event PoolVerified(uint256 indexed poolId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createPool(
        string memory _name,
        string memory _description,
        string memory _assetType,
        uint256 _totalValue,
        uint256 _minimumInvestment,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Pool name cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(_totalValue > 0, "Total value must be positive");
        require(_minimumInvestment > 0, "Minimum investment must be positive");
        
        uint256 poolId = poolCounter++;
        
        pools[poolId] = InvestmentPool({
            poolId: FHE.asEuint32(0),
            totalValue: FHE.asEuint32(0),
            availableShares: FHE.asEuint32(0),
            minimumInvestment: FHE.asEuint32(0),
            investorCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            assetType: _assetType,
            manager: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit PoolCreated(poolId, msg.sender, _name);
        return poolId;
    }
    
    function investInPool(
        uint256 poolId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(pools[poolId].manager != address(0), "Pool does not exist");
        require(pools[poolId].isActive, "Pool is not active");
        require(block.timestamp <= pools[poolId].endTime, "Pool has ended");
        
        uint256 investmentId = investmentCounter++;
        
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        investments[investmentId] = Investment({
            investmentId: FHE.asEuint32(0),
            amount: internalAmount,
            shares: internalAmount,
            investor: msg.sender,
            timestamp: block.timestamp
        });
        
        pools[poolId].availableShares = FHE.sub(pools[poolId].availableShares, internalAmount);
        pools[poolId].investorCount = FHE.add(pools[poolId].investorCount, FHE.asEuint32(1));
        
        emit InvestmentMade(investmentId, poolId, msg.sender, 0);
        return investmentId;
    }
    
    function requestWithdrawal(
        uint256 poolId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(pools[poolId].manager != address(0), "Pool does not exist");
        require(pools[poolId].isActive, "Pool must be active");
        
        uint256 withdrawalId = withdrawalCounter++;
        
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        withdrawals[withdrawalId] = Withdrawal({
            withdrawalId: FHE.asEuint32(0),
            amount: internalAmount,
            shares: internalAmount,
            investor: msg.sender,
            isProcessed: false,
            timestamp: block.timestamp
        });
        
        emit WithdrawalRequested(withdrawalId, poolId, msg.sender, 0);
        return withdrawalId;
    }
    
    function submitPerformanceReport(
        uint256 poolId,
        euint32 totalReturns,
        euint32 activeInvestors,
        euint32 totalValue,
        string memory reportHash
    ) public returns (uint256) {
        require(pools[poolId].manager == msg.sender, "Only manager can submit report");
        require(pools[poolId].isActive, "Pool must be active");
        
        uint256 reportId = reportCounter++;
        
        performanceReports[reportId] = PerformanceReport({
            reportId: FHE.asEuint32(0),
            totalReturns: totalReturns,
            activeInvestors: activeInvestors,
            totalValue: totalValue,
            isVerified: false,
            reportHash: reportHash,
            reporter: msg.sender,
            timestamp: block.timestamp
        });
        
        emit PerformanceReported(reportId, poolId, msg.sender);
        return reportId;
    }
    
    function verifyPool(uint256 poolId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify pools");
        require(pools[poolId].manager != address(0), "Pool does not exist");
        
        pools[poolId].isVerified = isVerified;
        emit PoolVerified(poolId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (investments[investmentCounter - 1].investor == user) {
            investorReputation[user] = reputation;
        } else {
            managerReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0);
    }
    
    function getPoolInfo(uint256 poolId) public view returns (
        string memory name,
        string memory description,
        string memory assetType,
        uint8 totalValue,
        uint8 availableShares,
        uint8 minimumInvestment,
        uint8 investorCount,
        bool isActive,
        bool isVerified,
        address manager,
        uint256 startTime,
        uint256 endTime
    ) {
        InvestmentPool storage pool = pools[poolId];
        return (
            pool.name,
            pool.description,
            pool.assetType,
            0,
            0,
            0,
            0,
            pool.isActive,
            pool.isVerified,
            pool.manager,
            pool.startTime,
            pool.endTime
        );
    }
    
    function getInvestmentInfo(uint256 investmentId) public view returns (
        uint8 amount,
        uint8 shares,
        address investor,
        uint256 timestamp
    ) {
        Investment storage investment = investments[investmentId];
        return (
            0,
            0,
            investment.investor,
            investment.timestamp
        );
    }
    
    function getWithdrawalInfo(uint256 withdrawalId) public view returns (
        uint8 amount,
        uint8 shares,
        address investor,
        bool isProcessed,
        uint256 timestamp
    ) {
        Withdrawal storage withdrawal = withdrawals[withdrawalId];
        return (
            0,
            0,
            withdrawal.investor,
            withdrawal.isProcessed,
            withdrawal.timestamp
        );
    }
    
    function getPerformanceReportInfo(uint256 reportId) public view returns (
        uint8 totalReturns,
        uint8 activeInvestors,
        uint8 totalValue,
        bool isVerified,
        string memory reportHash,
        address reporter,
        uint256 timestamp
    ) {
        PerformanceReport storage report = performanceReports[reportId];
        return (
            0,
            0,
            0,
            report.isVerified,
            report.reportHash,
            report.reporter,
            report.timestamp
        );
    }
    
    function getInvestorReputation(address investor) public view returns (uint8) {
        return 0;
    }
    
    function getManagerReputation(address manager) public view returns (uint8) {
        return 0;
    }
    
    function processWithdrawal(uint256 withdrawalId) public {
        require(withdrawals[withdrawalId].investor == msg.sender, "Only investor can process withdrawal");
        require(!withdrawals[withdrawalId].isProcessed, "Withdrawal already processed");
        
        withdrawals[withdrawalId].isProcessed = true;
    }
    
    function closePool(uint256 poolId) public {
        require(pools[poolId].manager == msg.sender, "Only manager can close pool");
        require(pools[poolId].isActive, "Pool must be active");
        require(block.timestamp > pools[poolId].endTime, "Pool must be ended");
        
        pools[poolId].isActive = false;
    }
}
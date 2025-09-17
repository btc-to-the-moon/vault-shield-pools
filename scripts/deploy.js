const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const VaultShieldPools = await ethers.getContractFactory("VaultShieldPools");
  
  // Deploy the contract with a verifier address
  const verifierAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual verifier address
  
  const vaultShieldPools = await VaultShieldPools.deploy(verifierAddress);
  
  await vaultShieldPools.waitForDeployment();
  
  const contractAddress = await vaultShieldPools.getAddress();
  
  console.log("VaultShieldPools deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
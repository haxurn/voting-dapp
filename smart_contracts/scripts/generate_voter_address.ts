import { ethers } from "hardhat";

async function main() {
    // Generate a new random wallet
    const wallet = ethers.Wallet.createRandom();

    console.log("\n=== New Voter Address Generated ===\n");
    console.log("Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    console.log("\n⚠️  WARNING: This is a test account. Never use this on mainnet!");
    console.log("\nTo use this address:");
    console.log("1. Import the private key into MetaMask");
    console.log("2. Make sure you're connected to Hardhat Localhost network");
    console.log("3. You can now vote with this address");
    console.log("\nNote: This address has 0 ETH. To fund it, you need to:");
    console.log("- Use one of the Hardhat default accounts to send ETH to this address");
    console.log("- Or import one of the pre-funded Hardhat accounts instead");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

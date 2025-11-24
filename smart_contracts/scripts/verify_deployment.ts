import { ethers } from "hardhat";

async function main() {
    const address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    const code = await ethers.provider.getCode(address);
    console.log(`Code at ${address}: ${code.slice(0, 50)}...`);
    if (code === "0x") {
        console.log("ERROR: No contract found at this address!");
    } else {
        console.log("SUCCESS: Contract found!");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

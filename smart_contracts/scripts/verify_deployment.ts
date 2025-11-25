import { ethers } from "hardhat";

async function main() {
    const address = "0xBb287576B6e1e82Ef7403FbA13A8e9c624d5EEf7";
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

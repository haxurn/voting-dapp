import { ethers } from "hardhat";

async function main() {
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const voting = await ethers.getContractAt("Voting", address);

    try {
        const count = await voting.pollCount();
        console.log(`Poll Count: ${count}`);

        if (count > 0n) {
            const poll = await voting.getPoll(0);
            console.log(`Poll 0 Question: ${poll.question}`);
        }
    } catch (e) {
        console.error("Error fetching state:", e);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

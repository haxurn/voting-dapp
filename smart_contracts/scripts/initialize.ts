import { ethers } from "hardhat";

async function main() {
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const voting = await ethers.getContractAt("Voting", address);

    console.log("Initializing 2024 Presidential Election...");

    const tx = await voting.createPoll(
        "Which party do you support for the 2024 Presidential Election?",
        ["Democrat", "Republican", "Libertarian", "Green Party", "Independent"]
    );

    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Election initialized successfully! 🇺🇸");

    const count = await voting.pollCount();
    console.log("Poll count:", count.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

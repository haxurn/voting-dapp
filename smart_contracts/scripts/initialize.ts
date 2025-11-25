import { ethers } from "hardhat";

async function main() {
    const address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    const voting = await ethers.getContractAt("Voting", address);

    console.log("Initializing 2026 Presidential Election...");

    const tx = await voting.createPoll(
        "Which party do you support for the 2026 Presidential Election?",
        ["Prosperity Party", "Ezema", "NAMA", "OFC", "Independent"]
    );

    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Election initialized successfully! 🇪🇹");

    const count = await voting.pollCount();
    console.log("Poll count:", count.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

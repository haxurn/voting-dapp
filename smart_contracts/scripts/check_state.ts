import { ethers } from "hardhat";

async function main() {
    const address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    const voting = await ethers.getContractAt("Voting", address);

    try {
        const count = await voting.pollCount();
        console.log(`\n=== Poll Count: ${count} ===\n`);

        if (count > 0n) {
            for (let i = 0; i < Number(count); i++) {
                const poll = await voting.getPoll(i);
                console.log(`Poll ${i}:`);
                console.log(`Question: ${poll.question}`);
                console.log(`Options:`);
                poll.options.forEach((option: string, index: number) => {
                    console.log(`  ${index + 1}. ${option} - ${poll.voteCounts[index]} votes`);
                });
                console.log("");
            }
        }
    } catch (e) {
        console.error("Error fetching state:", e);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

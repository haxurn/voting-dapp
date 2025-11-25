import { ethers } from "hardhat";

async function main() {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    await voting.waitForDeployment();

    console.log(`Voting contract deployed to ${voting.target}`);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

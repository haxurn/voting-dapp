import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting", function () {
    async function deployVotingFixture() {
        const [owner, otherAccount] = await ethers.getSigners();
        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy();
        return { voting, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should start with 0 polls", async function () {
            const { voting } = await loadFixture(deployVotingFixture);
            expect(await voting.pollCount()).to.equal(0);
        });
    });

    describe("Polls", function () {
        it("Should create a poll", async function () {
            const { voting } = await loadFixture(deployVotingFixture);
            await voting.createPoll("Test Question", ["Opt1", "Opt2"]);
            expect(await voting.pollCount()).to.equal(1);
        });

        it("Should allow voting", async function () {
            const { voting, otherAccount } = await loadFixture(deployVotingFixture);
            await voting.createPoll("Test Question", ["Opt1", "Opt2"]);

            await (voting.connect(otherAccount) as any).vote(0, 0);

            const poll = await voting.getPoll(0);
            expect(poll.voteCounts[0]).to.equal(1);
        });

        it("Should prevent double voting", async function () {
            const { voting, otherAccount } = await loadFixture(deployVotingFixture);
            await voting.createPoll("Test Question", ["Opt1", "Opt2"]);

            await (voting.connect(otherAccount) as any).vote(0, 0);
            await expect((voting.connect(otherAccount) as any).vote(0, 0)).to.be.revertedWith("Already voted");
        });
    });
});

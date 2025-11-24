import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

interface Poll {
    id: number;
    question: string;
    options: string[];
    voteCounts: number[];
}

interface PollListProps {
    contract: ethers.Contract | null;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

// Image mapping for US parties
const PARTY_IMAGES: { [key: string]: string } = {
    "Democrat": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/240px-DemocraticLogo.svg.png",
    "Republican": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/240px-Republicanlogo.svg.png",
    "Libertarian": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Libertarian_Party_Porcupine.svg/240px-Libertarian_Party_Porcupine.svg.png",
    "Green Party": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Green_Party_of_the_United_States_logo.svg/240px-Green_Party_of_the_United_States_logo.svg.png",
    "Independent": "https://cdn-icons-png.flaticon.com/512/9408/9408175.png"
};

export default function PollList({ contract, addToast }: PollListProps) {
    const [polls, setPolls] = useState<Poll[]>([]);

    useEffect(() => {
        if (contract) {
            fetchPolls();

            const onPollCreated = () => fetchPolls();
            const onVoted = () => fetchPolls();

            contract.on('PollCreated', onPollCreated);
            contract.on('Voted', onVoted);

            return () => {
                contract.off('PollCreated', onPollCreated);
                contract.off('Voted', onVoted);
            };
        }
    }, [contract]);

    const fetchPolls = async () => {
        if (!contract) return;
        try {
            const count = await contract.pollCount();
            const loadedPolls = [];
            for (let i = 0; i < count; i++) {
                const pollData = await contract.getPoll(i);
                loadedPolls.push({
                    id: Number(pollData.id),
                    question: pollData.question,
                    options: pollData.options,
                    voteCounts: pollData.voteCounts.map((c: bigint) => Number(c)),
                });
            }
            setPolls(loadedPolls);
        } catch (error: any) {
            // Silently handle the case where contract is deployed but empty
            if (error.code === 'CALL_EXCEPTION' || error.code === 'BAD_DATA') {
                setPolls([]);
            } else {
                console.error("Error fetching polls:", error);
            }
        }
    };

    const vote = async (pollId: number, optionIndex: number) => {
        if (!contract) return;
        try {
            const tx = await contract.vote(pollId, optionIndex);
            await tx.wait();
            addToast('Vote Cast Successfully! 🎉', 'success');
        } catch (error: any) {
            console.error(error);
            addToast(`Error voting: ${error.reason || error.message}`, 'error');
        }
    };

    const calculatePercentage = (votes: number, total: number) => {
        if (total === 0) return 0;
        return Math.round((votes / total) * 100);
    };

    if (polls.length === 0) {
        return (
            <div className="poll-list">
                <h2 className="section-title">No Active Elections</h2>
                <p>Waiting for admin to start the election...</p>
            </div>
        );
    }

    return (
        <div className="poll-list">
            <h2 className="section-title">Live Results</h2>
            {polls.map((poll) => {
                const totalVotes = poll.voteCounts.reduce((a, b) => a + b, 0);

                return (
                    <div key={poll.id} className="poll-card">
                        <h3 className="poll-question">{poll.question}</h3>
                        <div className="options">
                            {poll.options.map((option, index) => {
                                const votes = poll.voteCounts[index];
                                const percentage = calculatePercentage(votes, totalVotes);
                                const imageUrl = PARTY_IMAGES[option] || "https://cdn-icons-png.flaticon.com/512/1665/1665731.png";

                                return (
                                    <div key={index} className="option-item">
                                        <img src={imageUrl} alt={option} className="party-logo" onError={(e) => (e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/1665/1665731.png")} />
                                        <div className="option-header">
                                            {option}
                                        </div>
                                        <div className="vote-count">
                                            {votes} Votes
                                        </div>
                                        <div className="progress-bar-bg">
                                            <div
                                                className="progress-bar-fill"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <button className="vote-btn" onClick={() => vote(poll.id, index)}>
                                            VOTE
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

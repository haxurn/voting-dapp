import { ethers } from 'ethers';

interface AdminDashboardProps {
    contract: ethers.Contract | null;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function AdminDashboard({ contract, addToast }: AdminDashboardProps) {
    const initializeElection = async () => {
        if (!contract) {
            addToast("Please connect your wallet first!", "error");
            return;
        }

        try {
            // Try to check poll count, handle empty contract gracefully
            let count = 0n;
            try {
                count = await contract.pollCount();
            } catch (e: any) {
                // If contract is empty or has issues, count will remain 0
                if (e.code !== 'CALL_EXCEPTION' && e.code !== 'BAD_DATA') {
                    throw e; // Re-throw if it's a different error
                }
            }

            if (Number(count) === 0) {
                addToast("Initializing election... Please confirm in MetaMask", "info");
                const tx = await contract.createPoll(
                    "Which party do you support for the 2026 Presidential Election?",
                    ["Prosperity Party", "Ezema", "NAMA", "OFC", "Independent"]
                );
                await tx.wait();
                addToast("Election Initialized! 🇪🇹", "success");
                setTimeout(() => window.location.reload(), 1000);
            } else {
                addToast("Election already active!", "info");
            }
        } catch (error: any) {
            console.error(error);
            if (error.code === 'ACTION_REJECTED') {
                addToast("Transaction rejected by user", "error");
            } else {
                addToast(`Error: ${error.reason || error.message || 'Unknown error'}`, "error");
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <h2 className="section-title">Admin Dashboard</h2>
            <div className="admin-controls">
                <p>Manage the election process here.</p>
                <button onClick={initializeElection} className="action-btn">
                    Initialize 2026 Ethiopian Presidential Election
                </button>
            </div>
        </div>
    );
}

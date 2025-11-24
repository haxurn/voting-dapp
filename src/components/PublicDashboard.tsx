import { ethers } from 'ethers';
import PollList from './PollList';

interface PublicDashboardProps {
    contract: ethers.Contract | null;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function PublicDashboard({ contract, addToast }: PublicDashboardProps) {
    return (
        <div className="public-dashboard">
            <PollList contract={contract} addToast={addToast} />
        </div>
    );
}

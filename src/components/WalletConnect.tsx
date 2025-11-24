import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

interface WalletConnectProps {
    setSigner: (signer: ethers.Signer | null) => void;
    setAddress: (address: string) => void;
}

export default function WalletConnect({ setSigner, setAddress }: WalletConnectProps) {
    const [currentAccount, setCurrentAccount] = useState<string>('');

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window as any;
        if (!ethereum) return;

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            const account = accounts[0];
            setCurrentAccount(account);
            setAddress(account);
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            setSigner(signer);
        }
    };

    const connectWallet = async () => {
        const { ethereum } = window as any;
        if (!ethereum) {
            alert('Get MetaMask!');
            return;
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setCurrentAccount(account);
        setAddress(account);
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);
    };

    return (
        <div className="wallet-connect">
            {!currentAccount ? (
                <button onClick={connectWallet} className="connect-btn">
                    Connect Wallet
                </button>
            ) : (
                <div className="wallet-info">
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                </div>
            )}
        </div>
    );
}

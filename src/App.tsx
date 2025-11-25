import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import VotingABI from './abi/Voting.json';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import AnimatedBackground from './components/AnimatedBackground';
import PublicDashboard from './components/PublicDashboard';
import SetupGuide from './components/SetupGuide';
import ThemeToggle from './components/ThemeToggle';
import { ToastContainer } from './components/Toast';
import WalletConnect from './components/WalletConnect';
import { useToast } from './hooks/useToast';

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

function App() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [showGuide, setShowGuide] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    if (signer) {
      const votingContract = new ethers.Contract(CONTRACT_ADDRESS, VotingABI.abi, signer);
      setContract(votingContract);
      checkNetwork();
    }
  }, [signer]);

  const checkNetwork = async () => {
    const { ethereum } = window as any;
    if (!ethereum) return;

    const chainId = await ethereum.request({ method: 'eth_chainId' });
    // 0x7a69 is 31337 (Hardhat Localhost)
    if (chainId !== '0x7a69') {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x7a69' }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x7a69',
                  chainName: 'Hardhat Localhost',
                  rpcUrls: ['http://127.0.0.1:8545'],
                  nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
      }
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <header>
          <div className="logo-text">Vote 2025</div>
          <div className="wallet-connect">
            <ThemeToggle />
            <WalletConnect setSigner={setSigner} setAddress={() => { }} />
          </div>
        </header>

        <div className="hero">
          <h1>Ethiopia Votes!</h1>
          <p>Your Voice, Your Future. 🇪🇹</p>
          <button
            onClick={() => setShowGuide(true)}
            className="help-btn"
            style={{
              marginTop: '1rem',
              background: 'var(--c-yellow)',
              color: 'var(--c-black)',
            }}
          >
            📖 Setup Guide
          </button>
        </div>

        <main>
          {signer ? (
            <>
              <div className="dashboard-toggle">
                <button
                  className={`toggle-btn ${view === 'public' ? 'active' : ''}`}
                  onClick={() => setView('public')}
                >
                  Public Dashboard
                </button>
                <button
                  className={`toggle-btn ${view === 'admin' ? 'active' : ''}`}
                  onClick={() => setView('admin')}
                >
                  Admin Dashboard
                </button>
              </div>

              {view === 'public' ? (
                <PublicDashboard contract={contract} addToast={addToast} />
              ) : (
                <AdminDashboard contract={contract} addToast={addToast} />
              )}
            </>
          ) : (
            <div className="connect-msg">
              <p>Connect Wallet to Vote!</p>
            </div>
          )}
        </main>
      </div>
      <SetupGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

export default App;

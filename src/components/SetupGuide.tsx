import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface SetupGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SetupGuide({ isOpen, onClose }: SetupGuideProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Welcome to Ethiopia Votes! 🇪🇹",
            content: "This is a decentralized voting application built on Ethereum blockchain. Let's get you set up!",
            icon: "👋"
        },
        {
            title: "Step 1: Install MetaMask",
            content: "MetaMask is a crypto wallet that lets you interact with blockchain apps. Install it from metamask.io if you haven't already.",
            icon: "🦊"
        },
        {
            title: "Step 2: Add Hardhat Network",
            content: "Click MetaMask → Networks → Add Network Manually:\n• Network Name: Hardhat Localhost\n• RPC URL: http://127.0.0.1:8545\n• Chain ID: 31337\n• Currency: ETH",
            icon: "🌐"
        },
        {
            title: "Step 3: Import Test Account",
            content: "MetaMask → Import Account → Private Key:\n0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80\n\nYou'll get 10,000 ETH for testing! 🎉",
            icon: "🔑"
        },
        {
            title: "Step 4: Connect Wallet",
            content: "Click the 'Connect Wallet' button in the top-right corner and approve the connection in MetaMask.",
            icon: "🔗"
        },
        {
            title: "Step 5: Initialize Election (Admin)",
            content: "Switch to 'Admin Dashboard' and click 'Initialize 2026 Presidential Election'. Confirm the transaction in MetaMask.",
            icon: "⚙️"
        },
        {
            title: "Step 6: Vote!",
            content: "Switch to 'Public Dashboard', choose your party, and click VOTE. Confirm in MetaMask. Watch the results update in real-time!",
            icon: "🗳️"
        },
        {
            title: "You're All Set! 🎉",
            content: "You can now participate in decentralized voting. Remember: This is a demo on a local blockchain. Never use these keys on real networks!",
            icon: "✅"
        }
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.7)',
                            zIndex: 9998,
                        }}
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'var(--c-white)',
                            border: 'var(--border-thick)',
                            borderRadius: '20px',
                            boxShadow: '8px 8px 0px var(--text-primary)',
                            padding: '2rem',
                            maxWidth: '600px',
                            width: '90%',
                            maxHeight: '80vh',
                            overflow: 'auto',
                            zIndex: 9999,
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                padding: '0.5rem',
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                                {steps[currentStep].icon}
                            </div>
                            <h2 style={{
                                fontSize: '1.8rem',
                                marginBottom: '1rem',
                                color: 'var(--text-primary)'
                            }}>
                                {steps[currentStep].title}
                            </h2>
                            <p style={{
                                fontSize: '1.1rem',
                                lineHeight: '1.6',
                                whiteSpace: 'pre-line',
                                color: 'var(--text-secondary)'
                            }}>
                                {steps[currentStep].content}
                            </p>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginBottom: '2rem'
                        }}>
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: index === currentStep ? 'var(--c-blue)' : '#ddd',
                                        transition: 'all 0.3s',
                                    }}
                                />
                            ))}
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                style={{
                                    flex: 1,
                                    opacity: currentStep === 0 ? 0.5 : 1,
                                    cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                                }}
                            >
                                ← Previous
                            </button>
                            {currentStep === steps.length - 1 ? (
                                <button
                                    onClick={onClose}
                                    style={{
                                        flex: 1,
                                        background: 'var(--c-green)',
                                    }}
                                >
                                    Get Started! 🚀
                                </button>
                            ) : (
                                <button
                                    onClick={nextStep}
                                    style={{
                                        flex: 1,
                                        background: 'var(--c-blue)',
                                        color: 'white',
                                    }}
                                >
                                    Next →
                                </button>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

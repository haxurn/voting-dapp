import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const colors = {
        success: { bg: '#6BCB77', border: '#078930' },
        error: { bg: '#FF6B6B', border: '#DA121A' },
        info: { bg: '#4D96FF', border: '#0F47AF' },
    };

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            style={{
                position: 'fixed',
                top: '2rem',
                right: '2rem',
                zIndex: 9999,
                background: colors[type].bg,
                color: '#000',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                border: `3px solid ${colors[type].border}`,
                boxShadow: '4px 4px 0px #000',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                fontWeight: 'bold',
                fontSize: '1rem',
                maxWidth: '400px',
            }}
        >
            <span style={{ fontSize: '1.5rem' }}>{icons[type]}</span>
            <span>{message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    padding: '0',
                    marginLeft: 'auto',
                }}
            >
                ✕
            </button>
        </motion.div>
    );
}

export function ToastContainer({ toasts, removeToast }: {
    toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
    removeToast: (id: string) => void;
}) {
    return (
        <AnimatePresence>
            {toasts.map((toast, index) => (
                <div key={toast.id} style={{ position: 'fixed', top: `${2 + index * 5}rem`, right: '2rem', zIndex: 9999 }}>
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                </div>
            ))}
        </AnimatePresence>
    );
}

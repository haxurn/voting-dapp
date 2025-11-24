import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            style={{
                padding: '0.6rem 1rem',
                fontSize: '1.2rem',
                background: theme === 'dark' ? '#FFD93D' : '#1a1a1a',
                color: theme === 'dark' ? '#000' : '#fff'
            }}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
    const shapes = [
        { color: '#078930', x: '10%', y: '20%', size: 100, delay: 0 },
        { color: '#FCDD09', x: '80%', y: '15%', size: 120, delay: 0.2 },
        { color: '#DA121A', x: '20%', y: '70%', size: 90, delay: 0.4 },
        { color: '#4D96FF', x: '75%', y: '65%', size: 110, delay: 0.6 },
        { color: '#FF6B6B', x: '50%', y: '45%', size: 80, delay: 0.8 },
    ];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            overflow: 'hidden'
        }}>
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: shape.x,
                        top: shape.y,
                        width: shape.size,
                        height: shape.size,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${shape.color}40, ${shape.color}10)`,
                        filter: 'blur(40px)',
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: shape.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}

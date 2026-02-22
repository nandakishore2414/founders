import React, { useEffect, useState } from 'react';

const Confetti = ({ active, onComplete }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (!active) {
            setParticles([]);
            return;
        }

        // Create confetti particles
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -10,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            size: Math.random() * 10 + 5,
            speedX: (Math.random() - 0.5) * 4,
            speedY: Math.random() * 3 + 2,
            rotationSpeed: (Math.random() - 0.5) * 10,
        }));

        setParticles(newParticles);

        // Cleanup after animation
        const timer = setTimeout(() => {
            setParticles([]);
            if (onComplete) onComplete();
        }, 3000);

        return () => clearTimeout(timer);
    }, [active, onComplete]);

    if (!active || particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-sm"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        transform: `rotate(${particle.rotation}deg)`,
                        animation: `confettiFall ${2 + Math.random()}s ease-out forwards`,
                        animationDelay: `${Math.random() * 0.5}s`,
                    }}
                />
            ))}
            <style>{`
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(${Math.random() * 720}deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default Confetti;

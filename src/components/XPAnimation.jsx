import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const XPAnimation = ({ xp, onComplete }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) {
                setTimeout(onComplete, 500);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [xp, onComplete]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[70]">
            <div className="relative">
                {/* Main XP Text */}
                <div className="text-center animate-bounce">
                    <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse">
                        +{xp}
                    </div>
                    <div className="text-4xl font-bold text-yellow-500 mt-2 flex items-center justify-center gap-2">
                        <Sparkles className="w-8 h-8 animate-spin" />
                        XP EARNED!
                        <Sparkles className="w-8 h-8 animate-spin" />
                    </div>
                </div>

                {/* Floating Sparkles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                    </div>
                ))}

                <style>{`
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                        }
                        50% {
                            transform: translateY(-30px) rotate(180deg);
                            opacity: 0.5;
                        }
                    }
                    .animate-float {
                        animation: float 3s ease-in-out infinite;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default XPAnimation;

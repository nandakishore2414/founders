import React, { useState } from 'react';
import { Sparkles, X, Trophy, Rocket, Star, PartyPopper } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import Confetti from './Confetti';

const LevelUpModal = () => {
    const { showLevelUp, currentLevel, closeLevelUpModal } = useGamification();
    const [isVisible, setIsVisible] = useState(showLevelUp);
    const [showConfetti, setShowConfetti] = useState(showLevelUp);

    const randomMessage = "You're on fire! 🔥";

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            closeLevelUpModal();
        }, 300);
    };

    if (!showLevelUp) return null;

    return (
        <>
            <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
            <div 
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleClose}
            >
                {/* Animated Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-md animate-pulse" />
            
            {/* Modal */}
            <div 
                className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 ${
                    isVisible ? 'scale-100' : 'scale-95'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="text-center relative">
                    {/* Animated Icon with Rotation */}
                    <div className="relative mx-auto mb-6">
                        <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse relative overflow-hidden">
                            {/* Rotating ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-spin" style={{ animationDuration: '3s' }} />
                            <Trophy className="w-16 h-16 text-white relative z-10 animate-bounce" />
                        </div>
                        {/* Floating sparkles */}
                        <div className="absolute -top-4 -right-4 animate-bounce">
                            <Sparkles className="w-10 h-10 text-yellow-400 animate-spin" style={{ animationDuration: '2s' }} />
                        </div>
                        <div className="absolute -bottom-4 -left-4 animate-bounce" style={{ animationDelay: '0.3s' }}>
                            <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                        </div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 animate-bounce" style={{ animationDelay: '0.6s' }}>
                            <PartyPopper className="w-6 h-6 text-pink-400" />
                        </div>
                    </div>

                    {/* Level Badge with glow */}
                    <div className="mb-4">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-bold text-lg shadow-lg animate-pulse relative">
                            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl animate-ping" />
                            <Rocket className="w-5 h-5 relative z-10 animate-bounce" />
                            <span className="relative z-10">Level {currentLevel}</span>
                        </div>
                    </div>

                    {/* Title with gradient */}
                    <h2 className="text-5xl font-black mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                        LEVEL UP!
                    </h2>

                    {/* Message */}
                    <p className="text-lg text-gray-600 mb-6">
                        {randomMessage}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mb-6">
                        You've reached Level {currentLevel}! Keep completing tasks to unlock more levels and rewards.
                    </p>

                    {/* Action Button */}
                    <button
                        onClick={handleClose}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                        Continue Building
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default LevelUpModal;

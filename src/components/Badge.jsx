import React from 'react';
import { Trophy, Star, Flame, Zap, Crown, Award } from 'lucide-react';

const Badge = ({ type, size = 'md' }) => {
    const badgeConfig = {
        'first-task': {
            icon: Zap,
            color: 'from-yellow-400 to-orange-500',
            label: 'First Task',
            emoji: '⚡'
        },
        'level-2': {
            icon: Star,
            color: 'from-blue-400 to-blue-600',
            label: 'Level 2',
            emoji: '⭐'
        },
        'level-3': {
            icon: Trophy,
            color: 'from-purple-400 to-purple-600',
            label: 'Level 3',
            emoji: '🏆'
        },
        'level-5': {
            icon: Crown,
            color: 'from-yellow-400 via-orange-500 to-red-500',
            label: 'Level 5',
            emoji: '👑'
        },
        'streak-7': {
            icon: Flame,
            color: 'from-orange-400 to-red-500',
            label: '7 Day Streak',
            emoji: '🔥'
        },
        'all-tasks': {
            icon: Award,
            color: 'from-green-400 to-emerald-600',
            label: 'All Tasks',
            emoji: '🎖️'
        }
    };

    const config = badgeConfig[type] || badgeConfig['first-task'];
    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-12 h-12 text-base',
        lg: 'w-16 h-16 text-xl'
    };
    const sizeClass = sizeClasses[size] || sizeClasses.md;

    return (
        <div className={`relative ${sizeClass}`}>
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg animate-pulse`}>
                <span className="text-white font-bold">{config.emoji}</span>
            </div>
            {size !== 'sm' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-gray-900 text-white text-[10px] rounded-full font-semibold">
                    {config.label}
                </div>
            )}
        </div>
    );
};

export default Badge;

import React from 'react';
import { Trophy, Target, Sparkles, Flame, Zap, Star } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import LevelUpModal from './LevelUpModal';

const GamificationDashboard = () => {
    const gamification = useGamification();
    const totalXP = gamification?.totalXP ?? 0;
    const currentLevel = gamification?.currentLevel ?? 1;
    const nextLevelXP = gamification?.nextLevelXP ?? 200;
    const xpProgress = gamification?.xpProgress ?? { current: 0, required: 200, percentage: 0 };
    const loginStreak = gamification?.loginStreak ?? 0;

    return (
        <div className="max-w-6xl mx-auto py-6">
            <LevelUpModal />
            <div className="mb-6 relative">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3">
                        <div className="relative">
                            <Trophy className="w-10 h-10 text-yellow-500 animate-bounce" />
                            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '2s' }} />
                        </div>
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Gamification Hub
                        </span>
                    </h1>
                    {/* Achievement Badges Preview */}
                    <div className="flex items-center gap-2">
                        {/* {completedCount >= 1 && <Badge type="first-task" size="sm" />}
                        {currentLevel >= 2 && <Badge type="level-2" size="sm" />}
                        {currentLevel >= 3 && <Badge type="level-3" size="sm" />}
                        {loginStreak >= 7 && <Badge type="streak-7" size="sm" />} */}
                    </div>
                </div>
                <p className="text-gray-600 text-lg">Complete tasks, earn XP, and level up your founder journey 🚀</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Level Card - Enhanced */}
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-2xl relative overflow-hidden transform hover:scale-105 transition-all duration-300">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium opacity-90">Current Level</span>
                            <Trophy className="w-6 h-6 animate-pulse" />
                        </div>
                        <div className="text-5xl font-black mb-1 drop-shadow-lg">{Number(currentLevel) || 1}</div>
                        <div className="text-sm opacity-75 flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Keep building to level up!
                        </div>
                    </div>
                </div>

                {/* XP Card - Enhanced */}
                <div className="bg-white rounded-xl border-2 border-yellow-200 p-6 shadow-lg relative overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-100 rounded-full -mr-10 -mt-10 opacity-50" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">Total XP</span>
                            <Sparkles className="w-6 h-6 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                        </div>
                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-1">
                            {(Number(totalXP) || 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 font-semibold">
                            {nextLevelXP - totalXP > 0 ? (
                                <span className="flex items-center gap-1">
                                    <Target className="w-3 h-3" />
                                    {nextLevelXP - totalXP} XP to next level
                                </span>
                            ) : (
                                <span className="text-green-600">🎉 Max level reached!</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Streak Card - Enhanced */}
                <div className="bg-white rounded-xl border-2 border-orange-200 p-6 shadow-lg relative overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-50" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">Login Streak</span>
                            <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
                        </div>
                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-1">
                            {Number(loginStreak) || 0}
                        </div>
                        <div className="text-sm text-gray-600 font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            days in a row
                        </div>
                    </div>
                </div>
            </div>

            {/* XP Progress Bar - Enhanced */}
            <div className="bg-white rounded-xl border-2 border-blue-100 p-6 mb-6 shadow-xl relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-50" />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Target className="w-6 h-6 text-blue-600 animate-pulse" />
                            <span className="font-bold text-gray-900 text-lg">Progress to Level {currentLevel + 1}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                            {xpProgress?.current ?? 0} / {xpProgress?.required ?? 200} XP
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                            style={{ width: `${Number(xpProgress?.percentage) || 0}%` }}
                        >
                            {/* Multiple shimmer effects */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-shimmer" style={{ animationDelay: '0.5s' }} />
                            {/* Glowing edge */}
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-sm" />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-600">
                            {/* {completedCount} of {totalTasks} tasks completed */}
                            Tasks coming soon!
                        </span>
                        <span className="text-xs font-bold text-blue-600">
                            {Math.round(Number(xpProgress?.percentage) || 0)}% Complete
                        </span>
                    </div>
                </div>
            </div>

            {/* Tasks Section - Simplified */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 text-center">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tasks Coming Soon!</h3>
                    <p className="text-gray-600">The task system is being prepared. Check back soon!</p>
                </div>
            </div>
        </div>
    );
};

export default GamificationDashboard;

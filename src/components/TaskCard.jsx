import React, { useState } from 'react';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import XPAnimation from './XPAnimation';

const TaskCard = ({ task, onComplete }) => {
    const { completeTask, isTaskCompleted } = useGamification();
    const [showXPAnimation, setShowXPAnimation] = useState(false);
    const completed = isTaskCompleted(task.id);

    const handleComplete = () => {
        if (completed) return;
        
        const success = completeTask(task.id, task.xp);
        if (success) {
            setShowXPAnimation(true);
            if (onComplete) onComplete(task);
        }
    };

    const categoryColors = {
        beginner: 'bg-blue-50 text-blue-700 border-blue-200',
        growth: 'bg-green-50 text-green-700 border-green-200',
        social: 'bg-purple-50 text-purple-700 border-purple-200'
    };

    return (
        <>
            {showXPAnimation && (
                <XPAnimation 
                    xp={task.xp} 
                    onComplete={() => setShowXPAnimation(false)} 
                />
            )}
            <div className={`relative bg-white rounded-xl border transition-all duration-300 ${
                completed 
                    ? 'border-gray-200 opacity-75' 
                    : 'border-gray-100 hover:border-blue-300 hover:shadow-xl hover:scale-[1.02]'
            } ${showXPAnimation ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}`}>
            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                            completed ? 'bg-gray-100' : 'bg-blue-50'
                        }`}>
                            {task.icon || '📋'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-semibold text-gray-900 ${
                                    completed ? 'line-through text-gray-500' : ''
                                }`}>
                                    {task.title}
                                </h3>
                                {completed && (
                                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                                )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {task.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Category & XP */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                            categoryColors[task.category] || categoryColors.beginner
                        }`}>
                            {task.category}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* XP Reward */}
                        <div className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-bold text-gray-900">
                                +{task.xp} XP
                            </span>
                        </div>

                        {/* Complete Button */}
                        <button
                            onClick={handleComplete}
                            disabled={completed}
                            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all relative overflow-hidden ${
                                completed
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:scale-105 active:scale-95'
                            }`}
                        >
                            {!completed && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                            )}
                            <span className="relative z-10 flex items-center gap-1.5">
                                {completed ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        Completed
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        Complete
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
};

export default TaskCard;

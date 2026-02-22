import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { calculateLevel, getNextLevelXP, getXPProgress } from '../utils/xpUtils';

const GamificationContext = createContext();

const STORAGE_KEY = 'founderPlatform_gamification';

/**
 * Get initial state from localStorage or defaults
 */
const getInitialState = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                totalXP: Number(parsed.totalXP) || 0,
                completedTasks: Array.isArray(parsed.completedTasks) ? parsed.completedTasks : [],
                lastLoginDate: parsed.lastLoginDate || null,
                loginStreak: Number(parsed.loginStreak) || 0
            };
        }
    } catch (error) {
        console.error('Error loading gamification data:', error);
    }
    
    return {
        totalXP: 0,
        completedTasks: [],
        lastLoginDate: null,
        loginStreak: 0
    };
};

export const GamificationProvider = ({ children }) => {
    const [state, setState] = useState(getInitialState);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [previousLevel, setPreviousLevel] = useState(1);

    // Calculate current level based on XP
    const currentLevel = calculateLevel(state.totalXP);
    const nextLevelXP = getNextLevelXP(currentLevel);
    const xpProgress = getXPProgress(state.totalXP, currentLevel);

    // Check for level up on mount and when XP changes
    useEffect(() => {
        if (currentLevel > previousLevel && previousLevel > 0) {
            setShowLevelUp(true);
        }
        setPreviousLevel(currentLevel);
    }, [currentLevel, previousLevel]);

    // Persist to localStorage whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                totalXP: state.totalXP,
                completedTasks: state.completedTasks,
                lastLoginDate: state.lastLoginDate,
                loginStreak: state.loginStreak
            }));
        } catch (error) {
            console.error('Error saving gamification data:', error);
        }
    }, [state]);

    // Track daily login streak (run once on mount, no deps to avoid loops)
    useEffect(() => {
        setState(prev => {
            const today = new Date().toDateString();
            const lastLogin = prev.lastLoginDate ? new Date(prev.lastLoginDate).toDateString() : null;
            if (lastLogin === today) return prev; // already logged today
            
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();
            const newStreak = lastLogin === yesterdayStr ? (prev.loginStreak + 1) : (lastLogin ? 1 : 1);
            return {
                ...prev,
                lastLoginDate: new Date().toISOString(),
                loginStreak: newStreak
            };
        });
    }, []);

    /**
     * Complete a task and earn XP
     * @param {string} taskId - Task ID to complete
     * @param {number} xpReward - XP reward for completing the task
     * @returns {boolean} Success status
     */
    const completeTask = useCallback((taskId, xpReward) => {
        // Check if task already completed
        if (state.completedTasks.includes(taskId)) {
            return false;
        }

        const oldLevel = currentLevel;
        
        setState(prev => ({
            ...prev,
            totalXP: prev.totalXP + xpReward,
            completedTasks: [...prev.completedTasks, taskId]
        }));

        return true;
    }, [state.completedTasks, currentLevel]);

    /**
     * Reset all progress (for testing)
     */
    const resetProgress = useCallback(() => {
        if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
            setState({
                totalXP: 0,
                completedTasks: [],
                lastLoginDate: null,
                loginStreak: 0
            });
            setPreviousLevel(1);
            setShowLevelUp(false);
        }
    }, []);

    /**
     * Close level up modal
     */
    const closeLevelUpModal = useCallback(() => {
        setShowLevelUp(false);
    }, []);

    /**
     * Check if a task is completed
     * @param {string} taskId - Task ID
     * @returns {boolean} Whether task is completed
     */
    const isTaskCompleted = useCallback((taskId) => {
        return state.completedTasks.includes(taskId);
    }, [state.completedTasks]);

    const value = {
        // State
        totalXP: state.totalXP,
        currentLevel,
        nextLevelXP,
        xpProgress,
        completedTasks: state.completedTasks,
        loginStreak: state.loginStreak,
        showLevelUp,
        
        // Actions
        completeTask,
        resetProgress,
        closeLevelUpModal,
        isTaskCompleted
    };

    return (
        <GamificationContext.Provider value={value}>
            {children}
        </GamificationContext.Provider>
    );
};

export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (!context) {
        throw new Error('useGamification must be used within GamificationProvider');
    }
    return context;
};

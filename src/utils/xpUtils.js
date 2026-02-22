/**
 * XP & Level Utility Functions
 * 
 * Level thresholds:
 * Level 1 → 0 XP
 * Level 2 → 200 XP
 * Level 3 → 500 XP
 * Level 4 → 900 XP
 * Level 5 → 1500 XP
 * 
 * Formula: Level N requires XP = 100 * (N-1) * N
 * This creates exponential growth
 */

const LEVEL_THRESHOLDS = [
    0,      // Level 1
    200,    // Level 2
    500,    // Level 3
    900,    // Level 4
    1500,   // Level 5
];

/**
 * Calculate the current level based on total XP
 * @param {number} totalXP - Total experience points
 * @returns {number} Current level
 */
export const calculateLevel = (totalXP) => {
    if (totalXP < 0) return 1;
    
    // Find the highest level threshold the user has reached
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (totalXP >= LEVEL_THRESHOLDS[i]) {
            return i + 1;
        }
    }
    
    return 1;
};

/**
 * Get the XP required for a specific level
 * @param {number} level - Target level
 * @returns {number} XP required for that level
 */
export const getLevelXP = (level) => {
    if (level <= 1) return 0;
    if (level > LEVEL_THRESHOLDS.length) {
        // For levels beyond our thresholds, calculate dynamically
        return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (level - LEVEL_THRESHOLDS.length) * 600;
    }
    return LEVEL_THRESHOLDS[level - 1];
};

/**
 * Get the XP required for the next level
 * @param {number} currentLevel - Current level
 * @returns {number} XP required for next level
 */
export const getNextLevelXP = (currentLevel) => {
    return getLevelXP(currentLevel + 1);
};

/**
 * Get XP progress for current level
 * @param {number} totalXP - Total experience points
 * @param {number} currentLevel - Current level
 * @returns {object} { current, required, percentage }
 */
export const getXPProgress = (totalXP, currentLevel) => {
    const safeXP = Number(totalXP) || 0;
    const safeLevel = Number(currentLevel) || 1;
    const currentLevelXP = getLevelXP(safeLevel);
    const nextLevelXP = getNextLevelXP(safeLevel);
    const current = Math.max(0, safeXP - currentLevelXP);
    const required = Math.max(1, nextLevelXP - currentLevelXP);
    const percentage = required > 0 ? Math.min(100, Math.max(0, (current / required) * 100)) : 100;
    
    return { current, required, percentage };
};

/**
 * Get maximum level supported
 * @returns {number} Maximum level
 */
export const getMaxLevel = () => {
    return LEVEL_THRESHOLDS.length;
};

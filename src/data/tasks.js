/**
 * Static Task Data
 * Tasks that users can complete to earn XP
 */

export const TASKS = [
    {
        id: "comment_ideas",
        title: "Comment on 3 startup ideas",
        description: "Engage with the community by sharing feedback on startup ideas.",
        xp: 50,
        category: "beginner",
        icon: "💬"
    },
    {
        id: "post_problem",
        title: "Share one real-world problem",
        description: "Post a daily problem you face that could be solved.",
        xp: 80,
        category: "growth",
        icon: "💡"
    },
    {
        id: "join_discussion",
        title: "Join a discussion thread",
        description: "Participate in an active idea debate or conversation.",
        xp: 40,
        category: "social",
        icon: "👥"
    },
    {
        id: "create_project",
        title: "Create your first project",
        description: "Share your startup idea or project with the community.",
        xp: 100,
        category: "beginner",
        icon: "🚀"
    },
    {
        id: "offer_help",
        title: "Offer help to someone",
        description: "Help another founder by answering their question or offering assistance.",
        xp: 60,
        category: "social",
        icon: "🤝"
    },
    {
        id: "complete_profile",
        title: "Complete your profile",
        description: "Add your bio, skills, and startup information to your profile.",
        xp: 30,
        category: "beginner",
        icon: "👤"
    },
    {
        id: "post_build_update",
        title: "Share a build update",
        description: "Post about your progress, milestones, or what you shipped.",
        xp: 70,
        category: "growth",
        icon: "📈"
    },
    {
        id: "connect_founders",
        title: "Connect with 5 founders",
        description: "Build your network by connecting with other founders.",
        xp: 90,
        category: "social",
        icon: "🔗"
    },
    {
        id: "post_freelance",
        title: "Post a job or service",
        description: "Share a freelancing opportunity or offer your services.",
        xp: 55,
        category: "growth",
        icon: "💼"
    },
    {
        id: "daily_login",
        title: "Daily login streak",
        description: "Visit the platform for 3 consecutive days.",
        xp: 45,
        category: "beginner",
        icon: "🔥"
    }
];

/**
 * Get tasks by category
 * @param {string} category - Task category
 * @returns {Array} Filtered tasks
 */
export const getTasksByCategory = (category) => {
    if (!category || category === 'all') return TASKS;
    return TASKS.filter(task => task.category === category);
};

/**
 * Get task by ID
 * @param {string} taskId - Task ID
 * @returns {Object|null} Task object or null
 */
export const getTaskById = (taskId) => {
    return TASKS.find(task => task.id === taskId) || null;
};

/**
 * Get all categories
 * @returns {Array} Unique categories
 */
export const getCategories = () => {
    return [...new Set(TASKS.map(task => task.category))];
};

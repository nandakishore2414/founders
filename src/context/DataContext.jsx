import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const DataContext = createContext();

// Initial mock founders data
const INITIAL_FOUNDERS = [
    {
        id: 'founder-1',
        name: "Alex Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        startupName: "DevFlow",
        positioning: "Automating code reviews for enterprise teams. Reducing cycle time by 40%.",
        industry: ["SaaS", "DevTools"],
        stage: "Revenue",
        location: "San Francisco",
        metric: "$12k MRR",
        openTo: ["Partnerships", "Integration"],
        streak: 12,
        reputation: 742,
        teamSize: 6,
        featured: true,
        bio: "Building developer tools that matter. Prev: Engineering at Stripe.",
        tagline: "Making code reviews effortless",
        website: "devflow.io",
        badges: ["Verified Founder", "Top Builder"],
        mrr: "$12k",
        users: "2.1K",
        joinedDate: "Jan 2024"
    },
    {
        id: 'founder-2',
        name: "Sarah Miller",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        startupName: "HealthBridge",
        positioning: "Connecting patients with specialized remote care. Telehealth 2.0.",
        industry: ["HealthTech", "B2C"],
        stage: "MVP",
        location: "London",
        metric: "500 Users",
        openTo: ["Co-marketing", "Feedback"],
        streak: 5,
        reputation: 436,
        teamSize: 3,
        featured: false,
        bio: "Healthcare entrepreneur focused on accessibility.",
        tagline: "Telehealth reimagined",
        website: "healthbridge.com",
        badges: ["Verified Founder"],
        mrr: "$0",
        users: "500",
        joinedDate: "Mar 2024"
    },
    {
        id: 'founder-3',
        name: "James Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
        startupName: "EcoLogistics",
        positioning: "Sustainable supply chain management for e-commerce brands.",
        industry: ["Logistics", "B2B"],
        stage: "Idea",
        location: "Berlin",
        metric: "Pre-Revenue",
        openTo: ["Hiring", "Co-founder"],
        streak: 0,
        reputation: 215,
        teamSize: 2,
        featured: false,
        bio: "Sustainability advocate building the future of logistics.",
        tagline: "Green logistics for modern brands",
        website: "ecologistics.io",
        badges: ["Verified Founder"],
        mrr: "$0",
        users: "0",
        joinedDate: "May 2024"
    },
    {
        id: 'founder-4',
        name: "Elena Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        startupName: "FinPulse",
        positioning: "Real-time financial forecasting for startups using AI.",
        industry: ["FinTech", "AI"],
        stage: "Scaling",
        location: "New York",
        metric: "$85k MRR",
        openTo: ["Partnerships", "Invest"],
        streak: 45,
        reputation: 912,
        teamSize: 14,
        featured: true,
        bio: "FinTech veteran. Building AI-powered financial tools.",
        tagline: "AI-driven financial intelligence",
        website: "finpulse.ai",
        badges: ["Verified Founder", "Top Creator", "YC W24"],
        mrr: "$85k",
        users: "8.5K",
        joinedDate: "Dec 2023"
    },
    {
        id: 'founder-5',
        name: "Raj Patel",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
        startupName: "EduVerse",
        positioning: "Gamified upskilling platform for Gen-Z professionals entering the workforce.",
        industry: ["EdTech", "B2C"],
        stage: "Revenue",
        location: "Bangalore",
        metric: "$8k MRR",
        openTo: ["Integration", "Content Partners"],
        streak: 22,
        reputation: 651,
        teamSize: 5,
        featured: false,
        bio: "EdTech entrepreneur passionate about accessible education.",
        tagline: "Learning made engaging",
        website: "eduverse.com",
        badges: ["Verified Founder"],
        mrr: "$8k",
        users: "1.2K",
        joinedDate: "Feb 2024"
    },
    {
        id: 'founder-6',
        name: "Maya Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
        startupName: "Stackly",
        positioning: "No-code internal tool builder for ops-heavy startups. Ship in hours, not weeks.",
        industry: ["SaaS", "No-Code"],
        stage: "MVP",
        location: "Austin",
        metric: "120 Beta Users",
        openTo: ["Beta Testers", "Feedback"],
        streak: 8,
        reputation: 389,
        teamSize: 2,
        featured: false,
        bio: "No-code enthusiast building tools for builders.",
        tagline: "Build faster, ship smarter",
        website: "stackly.io",
        badges: ["Verified Founder"],
        mrr: "$0",
        users: "120",
        joinedDate: "Apr 2024"
    },
];

export const DataProvider = ({ children, currentUserId }) => {
    const [founders, setFounders] = useState(INITIAL_FOUNDERS);
    const [posts, setPosts] = useState([]);
    const [buildUpdates, setBuildUpdates] = useState([]);
    const [connections, setConnections] = useState([]); // { fromId, toId, type, message, status, timestamp }
    const [projects, setProjects] = useState([]); // { id, creatorId, title, description, industry, stage, lookingFor, tags, timestamp, likes, comments, views }
    const [communityPosts, setCommunityPosts] = useState([]); // { id, authorId, type: 'ask' | 'offer', title, description, category, tags, timestamp, responses, helpful }
    const [freelancingListings, setFreelancingListings] = useState([]); // { id, creatorId, type: 'job' | 'service', title, description, category, budget, skills, timestamp, applications, status }

    // Get current user's founder profile
    const currentFounder = useMemo(() => {
        return founders.find(f => f.id === currentUserId) || null;
    }, [founders, currentUserId]);

    // Update founder profile
    const updateFounderProfile = useCallback((founderId, updates) => {
        setFounders(prev => prev.map(f => 
            f.id === founderId ? { ...f, ...updates } : f
        ));
    }, []);

    // Add a new founder (for registration)
    const addFounder = useCallback((founderData) => {
        const newFounder = {
            id: `founder-${Date.now()}`,
            ...founderData,
            streak: 0,
            reputation: 0,
            featured: false,
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };
        setFounders(prev => [...prev, newFounder]);
        return newFounder.id;
    }, []);

    // Add a post
    const addPost = useCallback((postData) => {
        const newPost = {
            id: `post-${Date.now()}`,
            ...postData,
            timestamp: Date.now(),
            engagement: { insightful: 0, saves: 0, comments: 0 }
        };
        setPosts(prev => [newPost, ...prev]);
        return newPost.id;
    }, []);

    // Add a build update
    const addBuildUpdate = useCallback((updateData) => {
        const newUpdate = {
            id: `update-${Date.now()}`,
            ...updateData,
            timestamp: Date.now(),
            insightCount: 0,
            saveCount: 0,
            commentCount: 0,
            time: "just now"
        };
        setBuildUpdates(prev => [newUpdate, ...prev]);
        
        // Update founder's build streak if it's their own update
        if (updateData.founderId === currentUserId) {
            setFounders(prev => prev.map(f => {
                if (f.id === currentUserId) {
                    const newStreak = (f.streak || 0) + 1;
                    return { ...f, streak: newStreak };
                }
                return f;
            }));
        }
        
        return newUpdate.id;
    }, [currentUserId]);

    // Send connection request
    const sendConnectionRequest = useCallback((fromId, toId, type, message) => {
        const newConnection = {
            id: `conn-${Date.now()}`,
            fromId,
            toId,
            type,
            message,
            status: 'pending',
            timestamp: Date.now()
        };
        setConnections(prev => [...prev, newConnection]);
        return newConnection.id;
    }, []);

    // Get posts by founder
    const getPostsByFounder = useCallback((founderId) => {
        return posts.filter(p => p.founderId === founderId);
    }, [posts]);

    // Get build updates by founder
    const getBuildUpdatesByFounder = useCallback((founderId) => {
        return buildUpdates.filter(u => u.founderId === founderId);
    }, [buildUpdates]);

    // Get all posts and build updates combined (for feed)
    const getFeedItems = useCallback(() => {
        const allPosts = posts.map(p => ({ ...p, itemType: 'post' }));
        const allUpdates = buildUpdates.map(u => ({ ...u, itemType: 'buildUpdate' }));
        return [...allPosts, ...allUpdates].sort((a, b) => b.timestamp - a.timestamp);
    }, [posts, buildUpdates]);

    // Search founders
    const searchFounders = useCallback((query, filters = {}) => {
        let results = founders;
        
        // Text search
        if (query) {
            const lowerQuery = query.toLowerCase();
            results = results.filter(f => 
                f.name.toLowerCase().includes(lowerQuery) ||
                f.startupName.toLowerCase().includes(lowerQuery) ||
                f.positioning.toLowerCase().includes(lowerQuery) ||
                f.industry.some(i => i.toLowerCase().includes(lowerQuery))
            );
        }
        
        // Industry filter
        if (filters.industries && filters.industries.length > 0) {
            results = results.filter(f => 
                f.industry.some(i => filters.industries.includes(i))
            );
        }
        
        // Stage filter
        if (filters.stages && filters.stages.length > 0) {
            results = results.filter(f => filters.stages.includes(f.stage));
        }
        
        // Quick filter (All, SaaS, AI/ML, etc.)
        if (filters.quickFilter && filters.quickFilter !== 'All') {
            if (filters.quickFilter === 'SaaS') {
                results = results.filter(f => f.industry.includes('SaaS'));
            } else if (filters.quickFilter === 'AI/ML') {
                results = results.filter(f => f.industry.some(i => i.includes('AI') || i.includes('ML')));
            } else if (filters.quickFilter === 'FinTech') {
                results = results.filter(f => f.industry.includes('FinTech'));
            } else if (filters.quickFilter === 'HealthTech') {
                results = results.filter(f => f.industry.includes('HealthTech'));
            } else if (filters.quickFilter === 'Scaling') {
                results = results.filter(f => f.stage === 'Scaling');
            } else if (filters.quickFilter === 'Hiring') {
                results = results.filter(f => f.openTo && f.openTo.includes('Hiring'));
            } else if (filters.quickFilter === 'Open to Invest') {
                results = results.filter(f => f.openTo && f.openTo.includes('Invest'));
            }
        }
        
        return results;
    }, [founders]);

    // Add a project/idea
    const addProject = useCallback((projectData) => {
        const newProject = {
            id: `project-${Date.now()}`,
            ...projectData,
            timestamp: Date.now(),
            likes: 0,
            comments: [],
            views: 0,
            status: 'active'
        };
        setProjects(prev => [newProject, ...prev]);
        return newProject.id;
    }, []);

    // Add a community help post
    const addCommunityPost = useCallback((postData) => {
        const newPost = {
            id: `community-${Date.now()}`,
            ...postData,
            timestamp: Date.now(),
            responses: [],
            helpful: 0
        };
        setCommunityPosts(prev => [newPost, ...prev]);
        return newPost.id;
    }, []);

    // Add a freelancing listing (job or service)
    const addFreelancingListing = useCallback((listingData) => {
        const newListing = {
            id: `freelance-${Date.now()}`,
            ...listingData,
            timestamp: Date.now(),
            applications: [],
            status: 'open'
        };
        setFreelancingListings(prev => [newListing, ...prev]);
        return newListing.id;
    }, []);

    // Get projects by creator
    const getProjectsByCreator = useCallback((creatorId) => {
        return projects.filter(p => p.creatorId === creatorId);
    }, [projects]);

    // Get community posts by author
    const getCommunityPostsByAuthor = useCallback((authorId) => {
        return communityPosts.filter(p => p.authorId === authorId);
    }, [communityPosts]);

    // Get freelancing listings by creator
    const getFreelancingListingsByCreator = useCallback((creatorId) => {
        return freelancingListings.filter(l => l.creatorId === creatorId);
    }, [freelancingListings]);

    const value = {
        founders,
        posts,
        buildUpdates,
        connections,
        projects,
        communityPosts,
        freelancingListings,
        currentFounder,
        updateFounderProfile,
        addFounder,
        addPost,
        addBuildUpdate,
        sendConnectionRequest,
        getPostsByFounder,
        getBuildUpdatesByFounder,
        getFeedItems,
        searchFounders,
        addProject,
        addCommunityPost,
        addFreelancingListing,
        getProjectsByCreator,
        getCommunityPostsByAuthor,
        getFreelancingListingsByCreator
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};

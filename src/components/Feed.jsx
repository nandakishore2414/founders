import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Repeat, Send, Image, Calendar, Newspaper, MoreHorizontal, X, Globe, Plus, Filter } from 'lucide-react';
import PostCard from './PostCard';

const UPDATES = [
    { name: "TechCrunch", image: "https://ui-avatars.com/api/?name=Tech+Crunch&background=0D8ABC&color=fff" },
    { name: "Elon", image: "https://ui-avatars.com/api/?name=Elon+Musk&background=random" },
    { name: "Bill Gates", image: "https://ui-avatars.com/api/?name=Bill+Gates&background=random" },
    { name: "OpenAI", image: "https://ui-avatars.com/api/?name=Open+AI&background=10a37f&color=fff" },
    { name: "React", image: "https://ui-avatars.com/api/?name=React&background=61dafb&color=000" },
    { name: "Google", image: "https://ui-avatars.com/api/?name=Google&background=4285F4&color=fff" },
];

const Feed = () => {
    const [filter, setFilter] = useState('All');

    const POSTS = [
        {
            type: 'Video',
            founderName: "Sarah Jones",
            founderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            startupName: "AI Video Gen",
            time: "2h ago",
            content: {
                title: "Introducing Scene Stitcher 2.0",
                summary: "We've completely rewritten our rendering engine. It's 4x faster and handles 4k exports.",
                duration: "1:45",
                thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                cta: "Try Beta"
            },
            engagement: { insightful: 34, saves: 12, comments: 8 }
        },
        {
            type: 'Case Study',
            founderName: "David Chen",
            founderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
            startupName: "GrowthHacker Tool",
            time: "5h ago",
            content: {
                title: "How we fixed our onboarding drop-off",
                problem: "60% of users dropped off at the email verification step.",
                action: "We implemented magic link login and deferred password creation.",
                result: "Activation rate jumped from 40% to 75% in one week."
            },
            engagement: { insightful: 89, saves: 45, comments: 23 }
        },
        {
            type: 'Hiring',
            founderName: "Emily White",
            founderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
            startupName: "FinTech Flow",
            time: "1d ago",
            content: {
                role: "Senior Backend Engineer",
                location: "Remote (US/EU)",
                salary: "$140k - $180k + 0.5%",
                skills: ["Node.js", "PostgreSQL", "AWS"]
            },
            engagement: { insightful: 12, saves: 5, comments: 4 }
        },
        {
            type: 'Poll',
            founderName: "Mark Zuckerberg",
            founderAvatar: "https://ui-avatars.com/api/?name=Mark+Zuckerberg&background=random",
            startupName: "Meta",
            time: "3m ago",
            content: {
                question: "What's the most critical metric for Series A?",
                options: [
                    { text: "ARR Growth", percent: 45 },
                    { text: "Retention", percent: 35 },
                    { text: "LTV/CAC", percent: 20 }
                ],
                totalVotes: 1240,
                timeLeft: "2 days"
            },
            engagement: { insightful: 56, saves: 2, comments: 145 }
        }
    ];

    const filteredPosts = filter === 'All' ? POSTS : POSTS.filter(post => post.type === filter);

    return (
        <div className="space-y-4 pb-10">
            {/* Updates (Stories) Section */}
            <div className="bg-white border border-gray-300 rounded-lg p-4">
                <h2 className="text-sm font-bold text-gray-900 mb-3 px-1">Updates</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {/* Add Story */}
                    <div className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer group">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Your Story"
                                className="w-14 h-14 rounded-full border-2 border-white p-0.5 object-cover"
                            />
                            <div className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-0.5 border-2 border-white">
                                <Plus className="w-3 h-3" />
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-gray-900 mt-1">You</span>
                    </div>

                    {/* Stories */}
                    {UPDATES.map((update, index) => (
                        <div key={index} className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer group">
                            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 to-purple-500">
                                <img
                                    src={update.image}
                                    alt={update.name}
                                    className="w-full h-full rounded-full border-2 border-white object-cover"
                                />
                            </div>
                            <span className="text-xs text-gray-600 group-hover:text-gray-900 truncate w-16 text-center">{update.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between px-1">
                <div className="flex gap-2 text-sm overflow-x-auto scrollbar-hide">
                    {['All', 'Video', 'Case Study', 'Hiring', 'Poll'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap ${filter === f
                                    ? 'bg-black text-white'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <Filter className="w-4 h-4" />
                </button>
            </div>

            {/* Posts */}
            <div className="space-y-4">
                {filteredPosts.map((post, index) => (
                    <PostCard key={index} {...post} />
                ))}
            </div>
        </div>
    );
};



const Post = ({ name, description, time, content, image, likes, comments }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            {/* Post Header */}
            <div className="p-3">
                <div className="flex gap-3 relative">
                    <img
                        src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                        alt={name}
                        className="w-12 h-12 rounded-full cursor-pointer"
                    />
                    {/* Close/More Options (Top Right) */}
                    <div className="absolute top-0 right-0 flex gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div>
                        <div className="flex items-center gap-1 group cursor-pointer">
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 group-hover:underline">{name}</h3>
                            <span className="text-gray-500 text-xs">• 1st</span>

                        </div>
                        <p className="text-xs text-gray-500">{description}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{time}</span>
                            <Globe className="w-3 h-3" />
                        </div>
                    </div>
                </div>
                <div className="mt-2 text-sm text-gray-900">
                    {content}
                </div>
            </div>

            {/* Post Media */}
            {image && (
                <div className="w-full">
                    <img src={image} alt="Post content" className="w-full object-cover max-h-[500px]" />
                </div>
            )}

            {/* Social Counts */}
            <div className="px-3 py-2 flex items-center justify-between text-xs text-gray-500 border-b border-gray-100">
                <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                        <div className="bg-blue-500 rounded-full p-0.5">
                            <ThumbsUp className="w-2 h-2 text-white fill-current" />
                        </div>
                        {/* <div className="bg-red-500 rounded-full p-0.5">
                             <Heart className="w-2 h-2 text-white fill-current" />
                         </div> */}
                    </div>
                    <span className="hover:text-blue-600 hover:underline cursor-pointer">{likes}</span>
                </div>
                <div className="hover:text-blue-600 hover:underline cursor-pointer">
                    {comments} comments
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-3 py-1 flex justify-between items-center">
                <PostAction
                    icon={ThumbsUp}
                    label="Like"
                    active={isLiked}
                    onClick={() => setIsLiked(!isLiked)}
                />
                <PostAction icon={MessageSquare} label="Comment" />

                <PostAction icon={Send} label="Send" />
            </div>
        </div>
    );
};

const PostAction = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-3 hover:bg-gray-100 rounded-md transition-colors flex-1 justify-center ${active ? 'text-blue-600' : 'text-gray-600'}`}
    >
        <Icon className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
        <span className="text-sm font-semibold">{label}</span>
    </button>
);

export default Feed;

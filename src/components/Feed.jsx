import React, { useState, useMemo } from 'react';
import { ThumbsUp, MessageSquare, Repeat, Send, Image, Calendar, Newspaper, MoreHorizontal, X, Globe, Plus, Filter, Compass } from 'lucide-react';
import PostCard from './PostCard';
import BuildUpdateCard from './BuildUpdateCard';
import { useData } from '../context/DataContext';
const TOPICS = [
    { label: 'AI & ML', color: 'bg-blue-500' },
    { label: 'SaaS', color: 'bg-blue-500' },
    { label: 'Fundraising', color: 'bg-emerald-500' },
    { label: 'Web3', color: 'bg-orange-500' },
    { label: 'Growth', color: 'bg-rose-500' },
    { label: 'Product', color: 'bg-amber-500' },
    { label: 'Hiring', color: 'bg-cyan-500' },
];

const ExploreTopicsButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <button
                onClick={() => setOpen(o => !o)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${open ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:border-blue-400'
                    } hover:scale-105`}
            >
                <Compass className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-45 text-white' : 'text-blue-500'}`} />
                <span>Explore Topics</span>
            </button>

            {TOPICS.map((topic, i) => (
                <button
                    key={topic.label}
                    style={{ transitionDelay: open ? `${i * 40}ms` : `${(TOPICS.length - 1 - i) * 25}ms` }}
                    className={`${topic.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap transition-all duration-300 hover:scale-110 ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none w-0 px-0 overflow-hidden'
                        }`}
                >
                    {topic.label}
                </button>
            ))}
        </div>
    );
};

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
    const { getFeedItems, founders } = useData();

    // Get feed items (posts + build updates) and format them
    const feedItems = useMemo(() => {
        const items = getFeedItems();
        return items.map(item => {
            if (item.itemType === 'buildUpdate') {
                // Format build update for display
                const founder = founders.find(f => f.id === item.founderId);
                return {
                    ...item,
                    founderName: founder?.name || item.founderName || 'Founder',
                    founderAvatar: founder?.avatar || item.founderAvatar || '',
                    startupName: founder?.startupName || item.startupName || 'Startup',
                    time: item.time || 'just now'
                };
            } else {
                // Format post for display
                const founder = founders.find(f => f.id === item.founderId);
                return {
                    ...item,
                    founderName: founder?.name || item.founderName || 'Founder',
                    founderAvatar: founder?.avatar || item.founderAvatar || '',
                    startupName: founder?.startupName || item.startupName || 'Startup',
                    time: item.time || 'just now',
                    engagement: item.engagement || { insightful: 0, saves: 0, comments: 0 }
                };
            }
        });
    }, [getFeedItems, founders]);

    const filteredItems = useMemo(() => {
        if (filter === 'All') return feedItems;
        if (filter === 'Build Update') {
            return feedItems.filter(item => item.itemType === 'buildUpdate');
        }
        return feedItems.filter(item => item.itemType === 'post' && item.type === filter);
    }, [feedItems, filter]);

    return (
        <div className="space-y-4 pb-10">
            {/* Updates (Stories) Section */}
            <div className="bg-white border border-blue-100 rounded-2xl p-4">
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
                            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-blue-400 to-blue-600">
                                <img
                                    src={update.image}
                                    alt={update.name}
                                    className="w-full h-full rounded-full border-2 border-white object-cover"
                                />
                            </div>
                            <span className="text-xs text-gray-600 group-hover:text-blue-600 truncate w-16 text-center">{update.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Updates panel — light blue card */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
                <ExploreTopicsButton />
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between px-1">
                <div className="flex gap-2 text-sm overflow-x-auto scrollbar-hide">
                    {['All', 'Build Update', 'Video', 'Case Study', 'Hiring', 'Poll'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-full font-semibold transition-colors whitespace-nowrap text-xs ${filter === f
                                ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                                : 'bg-white border border-blue-100 text-blue-700 hover:bg-blue-50'
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

            {/* Posts & Build Updates */}
            <div className="space-y-4">
                {filteredItems.length === 0 ? (
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
                        <p className="text-blue-500 font-medium">No posts yet. Be the first to share!</p>
                    </div>
                ) : (
                    filteredItems.map((item, index) => {
                        if (item.itemType === 'buildUpdate') {
                            return (
                                <BuildUpdateCard
                                    key={item.id || index}
                                    {...item}
                                />
                            );
                        } else {
                            return (
                                <PostCard key={item.id || index} {...item} />
                            );
                        }
                    })
                )}
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

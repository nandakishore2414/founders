import React, { useState } from 'react';
import { Grid, ChevronRight, Briefcase, Lightbulb, Rocket, BarChart3, Heart, User, PlusSquare, Settings, ChevronDown, ChevronUp } from 'lucide-react';

const TOPICS = [
    { icon: Briefcase, label: "Business", count: 245, color: "text-sky-600", bg: "bg-sky-50" },
    { icon: Lightbulb, label: "Innovation", count: 189, color: "text-amber-500", bg: "bg-amber-50" },
    { icon: Rocket, label: "Startups", count: 312, color: "text-purple-500", bg: "bg-purple-50" },
    { icon: BarChart3, label: "Marketing", count: 156, color: "text-pink-500", bg: "bg-pink-50" },
    { icon: Heart, label: "Social Impact", count: 98, color: "text-rose-500", bg: "bg-rose-50" },
];

const RightSidebar = () => {
    const [showAll, setShowAll] = useState(false);

    return (
        <div className="space-y-5">
            {/* Quick Actions / Profile */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-3 group hover:shadow-lg transition-all duration-300 sticky top-20 z-10">
                <h4 className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Your Profile</h4>
                <QuickAction icon={User} label="My Profile" colorClass="text-blue-500 group-hover:bg-blue-50" />
                <QuickAction icon={PlusSquare} label="Create Post" colorClass="text-green-500 group-hover:bg-green-50" />
                <QuickAction icon={Settings} label="Settings" colorClass="text-gray-500 group-hover:bg-gray-100" />
            </div>

            {/* Category Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-violet-50/80 to-purple-50/50">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-white rounded-lg shadow-sm text-violet-600">
                            <Grid className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 tracking-tight">Explore Topics</h3>
                    </div>
                </div>
                <div className="py-3 px-2">
                    {TOPICS.slice(0, showAll ? TOPICS.length : 3).map((topic, index) => (
                        <CategoryItem
                            key={index}
                            icon={topic.icon}
                            label={topic.label}
                            count={topic.count}
                            color={topic.color}
                            bg={topic.bg}
                        />
                    ))}
                </div>
                <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/30">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="w-full py-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 group-button rounded-md hover:bg-white hover:shadow-sm"
                    >
                        {showAll ? 'Show less' : 'View more topics'}
                        {showAll ?
                            <ChevronUp className="w-3 h-3 group-button-hover:-translate-y-0.5 transition-transform" /> :
                            <ChevronDown className="w-3 h-3 group-button-hover:translate-y-0.5 transition-transform" />
                        }
                    </button>
                </div>
            </div>

            <div className="text-center px-4">
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[11px] text-gray-400 font-medium">
                    <a href="#" className="hover:text-blue-600 transition-colors">About</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Accessibility</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Ad Choices</a>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <span className="font-bold text-gray-600 text-xs">FounderPlatform</span>
                    <span className="text-[10px] text-gray-400">© 2026</span>
                </div>
            </div>
        </div>
    );
};

const CategoryItem = ({ icon: Icon, label, count, color, bg }) => (
    <a href="#" className="flex items-center gap-3 px-3 py-2 mb-1 rounded-xl hover:bg-gray-50/80 transition-all cursor-pointer group border border-transparent hover:border-gray-100">
        <div className={`w-9 h-9 rounded-lg ${bg} border border-transparent group-hover:border-black/5 flex items-center justify-center transition-all shadow-sm`}>
            <Icon className={`w-4 h-4 ${color}`} strokeWidth={2} />
        </div>
        <span className="text-sm text-gray-600 group-hover:text-gray-900 font-semibold flex-1 transition-colors">{label}</span>
        <span className="text-[10px] font-medium text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-100 shadow-sm group-hover:border-gray-200">{count}</span>
    </a>
);

const QuickAction = ({ icon: Icon, label, colorClass }) => (
    <a
        href="#"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group text-gray-600 hover:text-gray-900"
    >
        <div className={`p-1.5 rounded-lg transition-colors ${colorClass.replace('text-', 'bg-').replace('500', '50').replace('group-hover:', '')}`}>
            <Icon className={`w-4 h-4 transition-transform duration-200 ${colorClass.split(' ')[0]}`} strokeWidth={2} />
        </div>
        <span className="text-sm font-semibold">
            {label}
        </span>
    </a>
);

export default RightSidebar;

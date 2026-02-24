import React from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart3, Flame, Grid3X3, Users, Star, MapPin, Globe, Calendar,
    Edit3, Share2, Shield, Zap, Award, TrendingUp, ExternalLink, Rocket,
    Hash, Eye, MessageSquare, Heart, BookOpen, Code, Briefcase, Trophy
} from 'lucide-react';

// ─── Mock Data ──────────────────────────────────────────────
const PROFILE_NAV = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'timeline', icon: Flame, label: 'Build Timeline', founderOnly: true },
    { id: 'posts', icon: Grid3X3, label: 'Posts' },
    { id: 'team', icon: Users, label: 'Team', founderOnly: true },
];

const MOCK_USER = {
    bio: 'MERN Stack Developer · Startup Enthusiast · Creating tools that connect ambitious founders worldwide. Prev: Full-stack at early-stage startups.',
    location: 'Bengaluru, India',
    website: 'founderplatform.io',
    joinedDate: 'Jan 2025',
    reputation: 858,
    streak: 14,
    email: 'nanda@founderplatform.io',
};

const SKILLS = [
    { name: 'React', level: 92 },
    { name: 'Node.js', level: 88 },
    { name: 'MongoDB', level: 85 },
    { name: 'TypeScript', level: 78 },
    { name: 'AWS', level: 65 },
];

const INTERESTS = [
    'B2B SaaS', 'Developer Tools', 'AI/ML', 'Open Source', 'Growth Hacking', 'Product Design'
];

const RECENT_ACTIVITY = [
    { type: 'post', text: 'Shared a build update', time: '2h ago', icon: Rocket, color: 'text-blue-500' },
    { type: 'comment', text: 'Commented on Product Hunt launch', time: '5h ago', icon: MessageSquare, color: 'text-green-500' },
    { type: 'like', text: 'Liked "Scaling SaaS to $10K MRR"', time: '1d ago', icon: Heart, color: 'text-red-400' },
    { type: 'connection', text: 'Connected with Priya Sharma', time: '2d ago', icon: Users, color: 'text-blue-500' },
];

const PROFILE_STATS = {
    profileViews: 1243,
    profileViewsTrend: '+18%',
    postsPublished: 47,
    totalLikes: 3842,
    totalComments: 612,
    followers: 318,
    following: 156,
};

const READING_LIST = [
    { title: 'The Cold Start Problem', author: 'Andrew Chen', progress: 72 },
    { title: 'Zero to One', author: 'Peter Thiel', progress: 100 },
    { title: 'The Lean Startup', author: 'Eric Ries', progress: 45 },
];

// ─── Component ──────────────────────────────────────────────
const ProfileLeftSidebar = ({ user, activeMode, activeTab, onTabChange }) => {
    const isFounderMode = activeMode === 'founder';

    const filteredNav = PROFILE_NAV.filter(
        item => !item.founderOnly || isFounderMode
    );

    const safeUser = { ...MOCK_USER, ...user };

    return (
        <div className="py-4 sticky top-20 flex flex-col gap-4 items-stretch pr-2 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">

            {/* About Card */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">About</h3>
                </div>
                <div className="p-4 space-y-3">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        {safeUser.bio}
                    </p>
                    <div className="space-y-2 text-[11px] text-gray-500">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span>{safeUser.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-3 h-3 text-blue-500" />
                            <a href="#" className="text-blue-600 hover:underline">{safeUser.website}</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span>Joined {safeUser.joinedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-3 h-3 text-gray-400" />
                            <span>CEO & Founder</span>
                        </div>
                    </div>

                    {/* Followers / Following */}
                    <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                        <div>
                            <span className="text-sm font-bold text-gray-900">{PROFILE_STATS.followers}</span>
                            <span className="text-[10px] text-gray-400 ml-1">Followers</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold text-gray-900">{PROFILE_STATS.following}</span>
                            <span className="text-[10px] text-gray-400 ml-1">Following</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Navigation */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Sections</h3>
                </div>
                <div className="p-2 space-y-0.5">
                    {filteredNav.map(item => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange?.(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group text-left ${isActive
                                    ? 'bg-blue-50 border border-blue-100'
                                    : 'hover:bg-blue-50/60'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive
                                    ? 'bg-blue-100 border border-blue-200'
                                    : 'bg-blue-50 border border-blue-100 group-hover:bg-blue-100'
                                    }`}>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-blue-600'}`} />
                                </div>
                                <span className={`text-sm font-semibold ${isActive ? 'text-blue-700' : 'text-gray-700 group-hover:text-blue-700'
                                    }`}>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Stats at a Glance */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Stats</h3>
                </div>
                <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-amber-50 rounded-md border border-amber-100">
                                <Star className="w-3.5 h-3.5 text-amber-500" />
                            </div>
                            <span className="text-xs font-medium text-gray-600">Reputation</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-gray-900">{safeUser.reputation}</span>
                            <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded">Top 5%</span>
                        </div>
                    </div>

                    {isFounderMode && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-orange-50 rounded-md border border-orange-100">
                                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Build Streak</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{safeUser.streak}d</span>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 rounded-md border border-blue-100">
                                <Eye className="w-3.5 h-3.5 text-blue-500" />
                            </div>
                            <span className="text-xs font-medium text-gray-600">Profile Views</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-gray-900">{PROFILE_STATS.profileViews.toLocaleString()}</span>
                            <span className="text-[10px] text-green-600 font-semibold">{PROFILE_STATS.profileViewsTrend}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 rounded-md border border-blue-100">
                                <Users className="w-3.5 h-3.5 text-blue-500" />
                            </div>
                            <span className="text-xs font-medium text-gray-600">Collaborations</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">12</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 rounded-md border border-blue-100">
                                <Grid3X3 className="w-3.5 h-3.5 text-blue-500" />
                            </div>
                            <span className="text-xs font-medium text-gray-600">Posts</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{PROFILE_STATS.postsPublished}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-red-50 rounded-md border border-red-100">
                                <Heart className="w-3.5 h-3.5 text-red-400" />
                            </div>
                            <span className="text-xs font-medium text-gray-600">Total Likes</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{PROFILE_STATS.totalLikes.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 rounded-md border border-blue-100">
                                <Award className="w-3.5 h-3.5 text-blue-500" />
                            </div>
                            <span className="text-xs font-medium text-gray-600">Badges</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">3</span>
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Code className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Skills</h3>
                </div>
                <div className="p-4 space-y-3">
                    {SKILLS.map((skill, i) => (
                        <div key={i}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-semibold text-gray-700">{skill.name}</span>
                                <span className="text-[10px] font-bold text-gray-400">{skill.level}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interests */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Hash className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Interests</h3>
                </div>
                <div className="p-4 flex flex-wrap gap-1.5">
                    {INTERESTS.map((interest, i) => (
                        <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer">
                            {interest}
                        </span>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Rocket className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Recent Activity</h3>
                </div>
                <div className="p-3 space-y-1">
                    {RECENT_ACTIVITY.map((activity, i) => {
                        const ActivityIcon = activity.icon;
                        return (
                            <div key={i} className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-blue-50/40 transition-colors cursor-pointer">
                                <ActivityIcon className={`w-3.5 h-3.5 mt-0.5 ${activity.color}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] text-gray-700 leading-snug">{activity.text}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Reading List */}
            {isFounderMode && (
                <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Reading List</h3>
                    </div>
                    <div className="p-3 space-y-2.5">
                        {READING_LIST.map((book, i) => (
                            <div key={i} className="px-2 py-1.5 cursor-pointer hover:bg-blue-50/40 rounded-lg transition-colors">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs font-semibold text-gray-800 truncate">{book.title}</p>
                                    <span className="text-[10px] font-bold text-gray-400 ml-2">{book.progress}%</span>
                                </div>
                                <p className="text-[10px] text-gray-400">{book.author}</p>
                                <div className="w-full h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${book.progress === 100 ? 'bg-green-400' : 'bg-blue-400'}`}
                                        style={{ width: `${book.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden p-3 space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm">
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Profile
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-semibold rounded-lg transition-all hover:bg-gray-50">
                    <Share2 className="w-3.5 h-3.5" />
                    Share Profile
                </button>
            </div>

            <footer className="px-4 py-2 text-xs text-gray-400 text-center">
                <p className="opacity-60 hover:opacity-100 transition-opacity cursor-default">© 2026 FounderPlatform</p>
            </footer>
        </div>
    );
};

export default ProfileLeftSidebar;

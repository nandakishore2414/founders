import React, { useState, useMemo } from 'react';
import {
    MapPin, Link as LinkIcon, Briefcase, Grid3X3, Bookmark, Flame,
    Heart, MessageSquare, Settings, Users, Award, Globe,
    TrendingUp, Zap, MoreHorizontal, Share2, UserPlus, Edit3,
    Camera, ExternalLink, Star, Eye, DollarSign, Clock, Target,
    Rocket, CheckCircle2, ArrowUpRight, Code, Play, Calendar,
    Shield, BarChart3, Sparkles, Building2
} from 'lucide-react';
import BuildUpdateCard from './BuildUpdateCard';
import { useData } from '../context/DataContext';

// ─── Founder Profile Mock Data ──────────────────────────────
// In a real app, this would come from the `user` prop or an API
const DUMMY_FOUNDER = {
    tagline: 'Building the future of founder networking',
    bio: 'MERN Stack Developer · Startup Enthusiast · Creating tools that connect ambitious founders worldwide. Prev: Full-stack at early-stage startups.',
    location: 'India',
    website: 'founderplatform.io',
    joinedDate: 'Jan 2025',
    badges: ['Verified Founder', 'Top Creator', 'YC W26'],
};

const STARTUP = {
    name: 'FounderPlatform',
    logo: null, // Will use gradient initials
    tagline: 'The operating system for modern startup founders',
    stage: 'Growth',
    industry: 'B2B SaaS',
    category: 'Productivity',
    fundingRaised: '$250K',
    fundingRound: 'Pre-Seed',
    mrr: '$4.2K',
    mrrGrowth: '+18%',
    users: '2.5K',
    usersGrowth: '+24%',
    teamSize: 5,
    hiring: true,
    openRoles: ['Frontend Engineer', 'Growth Lead'],
};

const TRACTION_METRICS = [
    { label: 'Active Users', value: '2.5K', trend: '+24%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', borderColor: 'border-blue-100' },
    { label: 'MRR', value: '$4.2K', trend: '+18%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', borderColor: 'border-green-100' },
    { label: 'MoM Growth', value: '24%', trend: 'High', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', borderColor: 'border-blue-100' },
    { label: 'Reputation', value: '858', trend: 'Top 5%', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', borderColor: 'border-amber-100' },
];

const REPUTATION = {
    score: 858,
    percentile: 'Top 5%',
    responseRate: '98%',
    responseSpeed: 'Fast',
    collaborations: 12,
    buildStreak: 14,
};

const BUILD_TIMELINE = [
    {
        type: "Feature Shipped",
        headline: "Launched Intelligent Search v1",
        whatWeDid: "Implemented vector embeddings for all user content enabling semantic search across posts and profiles.",
        outcome: "Search CTR improved by 23% in the first 24 hours.",
        time: "2h ago",
        insightCount: 12,
        saveCount: 4,
        commentCount: 8
    },
    {
        type: "Milestone",
        headline: "Crossed 500 Daily Active Users!",
        whatWeDid: "Focusing on organic distribution through Twitter and LinkedIn seems to be paying off.",
        lesson: "Consistency in distribution > Viral hits.",
        time: "2d ago",
        insightCount: 45,
        saveCount: 12,
        commentCount: 23,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
];


const PITCH_HIGHLIGHTS = [
    { id: 1, title: 'Problem', emoji: '🎯', content: 'Founders juggle 50 browser tabs across fragmented tools', color: 'from-red-400 to-orange-500' },
    { id: 2, title: 'Solution', emoji: '💡', content: 'A unified platform where founders build, share, and connect', color: 'from-blue-400 to-blue-500' },
    { id: 3, title: 'Traction', emoji: '📈', content: '2.5K users, $4.2K MRR, 24% MoM growth', color: 'from-green-400 to-teal-500' },
    { id: 4, title: 'Vision', emoji: '🚀', content: 'The LinkedIn for founders — but better', color: 'from-blue-500 to-blue-600' },
];

const TEAM_MEMBERS = [
    { name: 'Nandakishore', role: 'CEO & Founder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nandakishore' },
    { name: 'Priya Sharma', role: 'CTO', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
    { name: 'Rahul M.', role: 'Product Design', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
    { name: 'Anya K.', role: 'Full-Stack Dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anya' },
    { name: 'Dev P.', role: 'Growth', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev' },
];

const POSTS = [
    { id: 1, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop', likes: 142, comments: 23 },
    { id: 2, image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop', likes: 89, comments: 15 },
    { id: 3, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop', likes: 234, comments: 41 },
    { id: 4, image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop', likes: 67, comments: 8 },
    { id: 5, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop', likes: 198, comments: 32 },
    { id: 6, image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop', likes: 156, comments: 19 },
];

// ─── Main Component ─────────────────────────────────────────
const ProfilePage = ({ user, activeMode, switchMode, hasRole }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const { currentFounder, getBuildUpdatesByFounder, getPostsByFounder } = useData();

    // Use currentFounder data if available, otherwise fallback to user prop
    const safeUser = useMemo(() => {
        if (currentFounder) {
            return {
                name: currentFounder.name,
                username: currentFounder.name?.toLowerCase().replace(/\s+/g, '') || '',
                avatar: currentFounder.avatar,
                bio: currentFounder.bio || '',
                tagline: currentFounder.tagline || '',
                location: currentFounder.location || '',
                website: currentFounder.website || '',
                joinedDate: currentFounder.joinedDate || '',
                badges: currentFounder.badges || [],
                streak: currentFounder.streak || 0,
                reputation: currentFounder.reputation || 0
            };
        }
        return {
            name: user?.name || DUMMY_FOUNDER.name,
            username: user?.name?.toLowerCase().replace(/\s+/g, '') || DUMMY_FOUNDER.username,
            avatar: user?.avatar || DUMMY_FOUNDER.avatar,
            ...DUMMY_FOUNDER,
            streak: REPUTATION.buildStreak,
            reputation: REPUTATION.score
        };
    }, [currentFounder, user]);

    const reputationData = useMemo(() => {
        if (currentFounder) {
            return {
                ...REPUTATION,
                score: currentFounder.reputation || 0,
                buildStreak: currentFounder.streak || 0,
                // Keep other static stats for now or mock them
            };
        }
        return REPUTATION;
    }, [currentFounder]);

    const startupData = useMemo(() => {
        if (currentFounder) {
            return {
                name: currentFounder.startupName || 'Startup',
                tagline: currentFounder.positioning || '',
                stage: currentFounder.stage || '',
                industry: currentFounder.industry?.[0] || '',
                fundingRound: 'Pre-Seed', // Would come from founder data
                fundingRaised: currentFounder.metric || '',
                hiring: currentFounder.openTo?.includes('Hiring') || false,
                openRoles: ['Frontend Engineer', 'Growth Lead'], // Would come from founder data
                teamSize: currentFounder.teamSize || 0
            };
        }
        return STARTUP;
    }, [currentFounder]);

    const buildUpdates = useMemo(() => {
        const founderId = currentFounder?.id || 'founder-1';
        return getBuildUpdatesByFounder(founderId);
    }, [currentFounder, getBuildUpdatesByFounder]);

    const userPosts = useMemo(() => {
        const founderId = currentFounder?.id || 'founder-1';
        return getPostsByFounder(founderId);
    }, [currentFounder, getPostsByFounder]);

    // Traction metrics from founder data when available
    const tractionMetrics = useMemo(() => {
        if (currentFounder) {
            return [
                { label: 'Active Users', value: currentFounder.users || '—', trend: '—', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', borderColor: 'border-blue-100' },
                { label: 'MRR', value: currentFounder.mrr || '—', trend: '—', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', borderColor: 'border-green-100' },
                { label: 'Build Streak', value: `${currentFounder.streak || 0}d`, trend: 'Active', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', borderColor: 'border-blue-100' },
                { label: 'Reputation', value: String(currentFounder.reputation || 0), trend: '—', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', borderColor: 'border-amber-100' },
            ];
        }
        return TRACTION_METRICS;
    }, [currentFounder]);

    const isOwnProfile = true; // For now assuming we are viewing our own profile
    const isFounderMode = activeMode === 'founder';

    return (
        <div className="max-w-4xl mx-auto pb-12 profile-page-enter">

            {/* ── Cover Banner ── */}
            <div className="relative h-44 md:h-52 rounded-b-3xl overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${isFounderMode ? 'from-slate-900 via-blue-900 to-blue-800' : 'from-slate-900 via-emerald-900 to-teal-900'} transition-colors duration-500`}></div>
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
                }}></div>
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundSize: '30px 30px',
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)'
                }}></div>

                {isOwnProfile && (
                    <button className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full hover:bg-white/20 transition-all border border-white/10 opacity-0 group-hover:opacity-100">
                        <Camera className="w-3.5 h-3.5" />
                        Edit Cover
                    </button>
                )}
            </div>

            {/* ── Profile Header ── */}
            <div className="px-4 md:px-6 -mt-14 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
                    {/* Avatar */}
                    <div className="relative self-center md:self-auto">
                        <div className={`w-28 h-28 rounded-2xl p-[3px] bg-gradient-to-br ${isFounderMode ? 'from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/20' : 'from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-500/20'} shadow-xl avatar-ring-glow transition-all duration-500`}>
                            <div className="w-full h-full rounded-[13px] bg-white p-[2px]">
                                <img src={safeUser.avatar} alt={safeUser.name} className="w-full h-full rounded-xl object-cover bg-gray-100" />
                            </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-[3px] border-white rounded-lg shadow-sm"></div>
                    </div>

                    {/* Name & Badges */}
                    <div className="flex-1 text-center md:text-left pb-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{safeUser.name}</h1>
                            <div className="flex items-center gap-1.5 justify-center md:justify-start flex-wrap">
                                {safeUser.badges.map((badge, i) => (
                                    <span key={i} className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${i === 0 ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                        i === 1 ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            'bg-orange-50 text-orange-600 border-orange-100'
                                        }`}>
                                        {badge}
                                    </span>
                                ))}
                                {activeMode === 'investor' && (
                                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md border bg-blue-50 text-blue-600 border-blue-100">
                                        Investor
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">@{safeUser.username} · {safeUser.tagline}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-center md:self-end pb-2">
                        {isOwnProfile ? (
                            <div className="flex items-center gap-2">
                                {/* Role Switcher for Own Profile */}
                                {hasRole && hasRole('founder') && hasRole('investor') && (
                                    <div className="flex bg-gray-100 rounded-lg p-1 mr-2">
                                        <button
                                            onClick={() => switchMode('founder')}
                                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeMode === 'founder' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                        >
                                            Founder
                                        </button>
                                        <button
                                            onClick={() => switchMode('investor')}
                                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeMode === 'investor' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                        >
                                            Investor
                                        </button>
                                    </div>
                                )}

                                <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg">
                                    <Edit3 className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                    <Settings className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">
                                    <UserPlus className="w-4 h-4" /> Connect
                                </button>
                                <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                    <MessageSquare className="w-4 h-4 text-gray-600" />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Bio & Meta ── */}
                <div className="mt-4 max-w-2xl">
                    <p className="text-sm text-gray-700 leading-relaxed">{safeUser.bio}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{safeUser.location}</span>
                        <span className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer"><Globe className="w-3.5 h-3.5" />{safeUser.website}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Joined {safeUser.joinedDate}</span>
                        {isFounderMode && (
                            <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-500" />{reputationData.buildStreak} day build streak</span>
                        )}
                    </div>
                </div>

                {/* ── Startup Card (Specific to Founder Mode) ── */}
                {isFounderMode && (
                    <div className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-blue-200 shrink-0">
                                    {startupData.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h2 className="text-lg font-bold text-gray-900">{startupData.name}</h2>
                                        <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-100 flex items-center gap-1">
                                            <TrendingUp className="w-2.5 h-2.5" />{startupData.stage}
                                        </span>
                                        {startupData.industry && (
                                            <span className="px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] font-semibold rounded-full border border-gray-100">{startupData.industry}</span>
                                        )}
                                    </div>
                                    {startupData.tagline && (
                                        <>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5 mb-0.5">What we do</p>
                                            <p className="text-sm text-gray-700 leading-relaxed">{startupData.tagline}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                                    {startupData.fundingRound} · {startupData.fundingRaised}
                                </span>
                                {startupData.hiring && (
                                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />Hiring
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Traction Metrics (Founder Mode) ── */}
                {isFounderMode && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {tractionMetrics.map((metric, i) => (
                            <div key={i} className={`${metric.bg} border ${metric.borderColor} rounded-xl p-3.5 hover:shadow-sm transition-all cursor-pointer group profile-grid-item`} style={{ animationDelay: `${i * 80}ms` }}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <metric.icon className={`w-4 h-4 ${metric.color}`} />
                                    {metric.trend && metric.trend !== '—' && (
                                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md">{metric.trend}</span>
                                    )}
                                </div>
                                <div className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{metric.value}</div>
                                <div className="text-[11px] font-medium text-gray-500">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Investor Stats (Investor Mode) ── */}
                {!isFounderMode && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5">
                            <div className="flex items-center justify-between mb-1.5">
                                <Building2 className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="text-xl font-bold text-gray-900">12</div>
                            <div className="text-[11px] font-medium text-gray-500">Portfolio Co.</div>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5">
                            <div className="flex items-center justify-between mb-1.5">
                                <DollarSign className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="text-xl font-bold text-gray-900">$2.5M</div>
                            <div className="text-[11px] font-medium text-gray-500">Capital Deployed</div>
                        </div>
                    </div>
                )}


                {/* ── Reputation Bar ── */}
                <div className="mt-4 bg-white rounded-xl border border-gray-100 p-3.5 flex items-center justify-between overflow-x-auto scrollbar-hide gap-4">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col min-w-max">
                            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Reputation</span>
                            <div className="flex items-center gap-1 font-bold text-gray-900">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                                {reputationData.score}
                                <span className="text-[10px] text-gray-400 font-normal ml-0.5">{reputationData.percentile}</span>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-gray-100"></div>
                        <div className="flex flex-col min-w-max">
                            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Response Rate</span>
                            <div className="font-bold text-gray-900">{reputationData.responseRate} <span className="text-[10px] text-green-500 font-normal">{reputationData.responseSpeed}</span></div>
                        </div>
                        <div className="w-px h-8 bg-gray-100"></div>
                        <div className="flex flex-col min-w-max">
                            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Collaborations</span>
                            <div className="font-bold text-gray-900">{reputationData.collaborations} <span className="text-[10px] text-gray-400 font-normal">Active</span></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span className="text-[10px] font-bold text-blue-600 whitespace-nowrap">Verified Founder</span>
                    </div>
                </div>

                {/* ── Pitch Highlights (Story-style) ── */}
                {isFounderMode && (
                    <div className="flex items-center gap-4 mt-5 overflow-x-auto scrollbar-hide pb-1">
                        {PITCH_HIGHLIGHTS.map((item) => (
                            <div key={item.id} className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0">
                                <div className={`w-[68px] h-[68px] rounded-full bg-gradient-to-br ${item.color} p-[2px] group-hover:scale-105 transition-transform shadow-sm`}>
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
                                        {item.emoji}
                                    </div>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">{item.title}</span>
                            </div>
                        ))}
                        {isOwnProfile && (
                            <div className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0">
                                <div className="w-[68px] h-[68px] rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-blue-400 transition-colors">
                                    <span className="text-xl text-gray-400 group-hover:text-blue-500">+</span>
                                </div>
                                <span className="text-[11px] font-medium text-gray-400">Add</span>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tab Navigation ── */}
                <div className="flex items-center border-b border-gray-200 mt-6 -mx-4 md:-mx-6 px-4 md:px-6 overflow-x-auto scrollbar-hide">
                    <TabButton icon={BarChart3} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    {isFounderMode && (
                        <TabButton icon={Flame} label="Build Timeline" active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} />
                    )}
                    <TabButton icon={Grid3X3} label="Posts" active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} />
                    {isFounderMode && (
                        <TabButton icon={Users} label="Team" active={activeTab === 'team'} onClick={() => setActiveTab('team')} />
                    )}
                </div>

                {/* ── Tab Content ── */}
                <div className="mt-5">
                    {activeTab === 'overview' && <OverviewTab isFounderMode={isFounderMode} buildUpdates={buildUpdates} startupData={startupData} reputation={reputationData} />}
                    {activeTab === 'timeline' && isFounderMode && <BuildTimelineTab user={safeUser} buildUpdates={buildUpdates} startupData={startupData} currentFounder={currentFounder} />}
                    {activeTab === 'posts' && <PostsGrid posts={userPosts.length > 0 ? userPosts : POSTS} />}
                    {activeTab === 'team' && isFounderMode && <TeamTab startupData={startupData} />}
                </div>
            </div>
        </div>
    );
};

// ─── Tabs ────────────────────────────────────────────────────

const TabButton = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${active ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);

// ─── Overview Tab ────────────────────────────────────────────
const OverviewTab = ({ isFounderMode, buildUpdates, startupData, reputation }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: About & Vision */}
        <div className="md:col-span-2 space-y-4">

            {/* Founder's Vision (Founder Only) */}
            {isFounderMode && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        Founder's Vision
                    </h3>
                    <blockquote className="text-gray-600 text-sm italic pl-4 border-l-2 border-blue-200 leading-relaxed">
                        "We built FounderPlatform because the fragmentation of startup tools was killing our own productivity. Founders need a unified cockpit, not 50 browser tabs."
                    </blockquote>

                    <div className="mt-5 pt-4 border-t border-gray-50">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-gray-700">Revenue Trajectory</span>
                            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">On Track</span>
                        </div>
                        <div className="h-20 w-full bg-gray-50 rounded-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-blue-50 to-transparent"></div>
                            <svg className="w-full h-full text-blue-500 opacity-20" viewBox="0 0 100 24" preserveAspectRatio="none">
                                <path d="M0,24 Q25,5 50,15 T100,0 V24 H0 Z" fill="currentColor" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[11px] text-gray-400 font-medium">Q3 - Q4 Performance</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Investor Thesis (Investor Only) */}
            {!isFounderMode && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        Investment Thesis
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                        Focused on early-stage B2B SaaS and productivity tools that leverage AI to solve real operational inefficiencies. I look for founders with deep domain expertise and a "builder" mindset.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">Pre-Seed</span>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">SaaS</span>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">AI/ML</span>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">Global First</span>
                    </div>
                </div>
            )}

            {/* Recent Build Updates (compact) - Show only if founder */}
            {isFounderMode && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-orange-500" />
                            Recent Builds
                        </h3>
                        <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full border border-orange-100">
                            <Flame className="w-3 h-3" />
                            <span className="text-[10px] font-bold">{reputation.buildStreak || 0} Day Streak</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {buildUpdates.slice(0, 3).map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group profile-grid-item" style={{ animationDelay: `${i * 80}ms` }}>
                                <span className="text-xl mt-0.5">🚀</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{item.headline}</h4>
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5 truncate">{item.outcome}</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 mt-1" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Right: Quick Actions & Info */}
        <div className="space-y-4">
            {/* Quick Connect */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quick Actions</h3>
                <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-100 flex items-center justify-center gap-2 text-sm">
                    <ExternalLink className="w-4 h-4" /> Visit Website
                </button>
                <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2 text-sm">
                    <Play className="w-4 h-4" /> Watch Pitch
                </button>
                <button className="w-full py-2.5 px-4 border-2 border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4" /> Message
                </button>
            </div>

            {/* Hiring */}
            {isFounderMode && startupData.hiring && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-5">
                    <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                        <Briefcase className="w-3.5 h-3.5" />
                        We're Hiring!
                    </h3>
                    <div className="space-y-2">
                        {startupData.openRoles.map((role, i) => (
                            <div key={i} className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-emerald-100/50">
                                <span className="text-sm font-medium text-gray-800">{role}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Team Snapshot */}
            {isFounderMode && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> Team · {startupData.teamSize}
                    </h3>
                    <div className="flex -space-x-2">
                        {TEAM_MEMBERS.map((member, i) => (
                            <img key={i} src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full border-2 border-white bg-gray-100 hover:z-10 hover:scale-110 transition-transform cursor-pointer" title={member.name} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

// ─── Build Timeline Tab ─────────────────────────────────────
const BuildTimelineTab = ({ user, buildUpdates, startupData, currentFounder }) => (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-base font-bold text-gray-900">Build Timeline</h2>
                <p className="text-xs text-gray-500">Public progress since {user?.joinedDate || DUMMY_FOUNDER.joinedDate}</p>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-100">
                <span className="text-base">🔥</span>
                <span className="text-xs font-bold">{user.streak || REPUTATION.buildStreak} Day Streak</span>
            </div>
        </div>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {buildUpdates.map((update, index) => {
                const founder = currentFounder || user;
                return (
                    <div key={update.id || index} className="relative">
                        <BuildUpdateCard
                            {...update}
                            founderName={founder?.name || update.founderName}
                            founderAvatar={founder?.avatar || update.founderAvatar}
                            startupName={startupData.name}
                        />
                    </div>
                );
            })}
        </div>
    </div>
);

// ─── Posts Grid Tab ──────────────────────────────────────────
const PostsGrid = ({ posts }) => (
    <div className="grid grid-cols-3 gap-1.5 md:gap-3">
        {posts.map((post, index) => (
            <div
                key={post.id}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group profile-grid-item"
                style={{ animationDelay: `${index * 50}ms` }}
            >
                <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-4 text-white font-bold text-sm">
                        <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 fill-current" />{post.likes || post.engagement?.insightful || 0}</span>
                        <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4 fill-current" />{post.comments || post.engagement?.comments || 0}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// ─── Team Tab ────────────────────────────────────────────────
const TeamTab = ({ startupData }) => (
    <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-5">
            <div>
                <h2 className="text-base font-bold text-gray-900">Meet the Team</h2>
                <p className="text-xs text-gray-500">{startupData.teamSize} people building {startupData.name}</p>
            </div>
            {startupData.hiring && (
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> {startupData.openRoles.length} Open Roles
                </span>
            )}
        </div>

        <div className="space-y-3">
            {TEAM_MEMBERS.map((member, i) => (
                <div key={i} className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer group profile-grid-item" style={{ animationDelay: `${i * 80}ms` }}>
                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-100 group-hover:scale-105 transition-transform" />
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{member.name}</h4>
                        <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    <button className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        View
                    </button>
                </div>
            ))}
        </div>

        {/* Hiring CTA */}
        {startupData.hiring && (
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-100 p-6 text-center">
                <h3 className="text-base font-bold text-gray-900 mb-1">Join our mission</h3>
                <p className="text-sm text-gray-500 mb-4">We're looking for passionate people to build the future of founder networking.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {startupData.openRoles.map((role, i) => (
                        <button key={i} className="px-4 py-2 bg-white text-sm font-semibold text-blue-600 rounded-xl border border-blue-100 hover:shadow-md transition-all flex items-center gap-1.5">
                            {role} <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    ))}
                </div>
            </div>
        )}
    </div>
);

export default ProfilePage;

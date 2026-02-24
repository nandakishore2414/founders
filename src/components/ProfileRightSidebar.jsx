import React from 'react';
import {
    Building2, TrendingUp, Sparkles, Briefcase, ArrowUpRight,
    Award, Users, Star, UserPlus, DollarSign, Rocket, Target,
    Calendar, Clock, Globe, BarChart3, Zap, CheckCircle2,
    MessageSquare, ExternalLink, Github, Twitter
} from 'lucide-react';

// ─── Mock Data ──────────────────────────────────────────────
const SIMILAR_FOUNDERS = [
    { name: 'Priya Sharma', role: 'CTO @ TechFlow', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', mutualConnections: 8, industry: 'B2B SaaS' },
    { name: 'Rahul M.', role: 'Founder @ DevKit', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', mutualConnections: 5, industry: 'Dev Tools' },
    { name: 'Anya K.', role: 'Co-founder @ GrowthOS', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anya', mutualConnections: 12, industry: 'Growth' },
    { name: 'Dev P.', role: 'CEO @ LaunchKit', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev', mutualConnections: 3, industry: 'Productivity' },
];

const ACHIEVEMENTS = [
    { icon: '🏆', label: 'Top Creator', description: 'Top 1% content engagement', earned: 'Dec 2025' },
    { icon: '🔥', label: '14-Day Streak', description: 'Consistent builder', earned: 'Feb 2026' },
    { icon: '🚀', label: 'YC W26', description: 'Y Combinator batch', earned: 'Jan 2026' },
    { icon: '💡', label: 'First 1K Users', description: 'Product milestone', earned: 'Nov 2025' },
    { icon: '⭐', label: 'Community Star', description: '100+ helpful answers', earned: 'Oct 2025' },
    { icon: '🎯', label: 'Vision Setter', description: 'Completed all pitch sections', earned: 'Sep 2025' },
];

const STARTUP_MOCK = {
    name: 'FounderPlatform',
    tagline: 'The operating system for modern startup founders',
    stage: 'Growth',
    industry: 'B2B SaaS',
    category: 'Productivity',
    fundingRound: 'Pre-Seed',
    fundingRaised: '$250K',
    mrr: '$4.2K',
    mrrGrowth: '+18%',
    users: '2.5K',
    usersGrowth: '+24%',
    hiring: true,
    openRoles: ['Frontend Engineer', 'Growth Lead', 'Backend Engineer'],
    teamSize: 5,
    founded: 'Jun 2024',
    website: 'founderplatform.io',
};

const TRACTION_HIGHLIGHTS = [
    { label: 'MRR', value: '$4.2K', trend: '+18%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
    { label: 'Users', value: '2.5K', trend: '+24%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'NPS Score', value: '72', trend: 'Great', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
];

const UPCOMING_EVENTS = [
    { title: 'Founder AMA: Fundraising 101', date: 'Feb 28', time: '5:00 PM', type: 'AMA' },
    { title: 'SaaS Growth Workshop', date: 'Mar 02', time: '10:30 AM', type: 'Workshop' },
    { title: 'Demo Day Prep Session', date: 'Mar 08', time: '2:00 PM', type: 'Session' },
];

const MUTUAL_CONNECTIONS = [
    { name: 'Sarah L.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { name: 'Mike T.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    { name: 'Ravi K.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi' },
    { name: 'Lisa M.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
    { name: 'Alex W.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
];

const SOCIAL_LINKS = [
    { name: 'Website', url: 'founderplatform.io', icon: Globe },
    { name: 'GitHub', url: 'github.com/nandakishore', icon: ExternalLink },
    { name: 'Twitter', url: '@nandakishore_fp', icon: ExternalLink },
];

// ─── Component ──────────────────────────────────────────────
const ProfileRightSidebar = ({ activeMode, startupData }) => {
    const isFounderMode = activeMode === 'founder';

    const startup = startupData || STARTUP_MOCK;

    return (
        <div className="py-4 sticky top-20 flex flex-col gap-4 items-stretch pl-2 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">

            {/* Startup Card */}
            {isFounderMode && (
                <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Startup</h3>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                {startup.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-gray-900 truncate">{startup.name}</h4>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-100 flex items-center gap-0.5">
                                        <TrendingUp className="w-2.5 h-2.5" />{startup.stage}
                                    </span>
                                    <span className="text-[10px] font-medium text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{startup.industry}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{startup.tagline}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                                {startup.fundingRound} · {startup.fundingRaised}
                            </span>
                            <span className="text-[10px] font-medium text-gray-500">
                                <Users className="w-3 h-3 inline mr-0.5" />{startup.teamSize} team
                            </span>
                            <span className="text-[10px] font-medium text-gray-400">
                                <Calendar className="w-3 h-3 inline mr-0.5" />Est. {startup.founded || 'Jun 2024'}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Traction Highlights (Founder only) */}
            {isFounderMode && (
                <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Traction</h3>
                    </div>
                    <div className="p-3 space-y-2">
                        {TRACTION_HIGHLIGHTS.map((metric, i) => {
                            const MetricIcon = metric.icon;
                            return (
                                <div key={i} className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${metric.bg} border ${metric.border}`}>
                                    <div className="flex items-center gap-2">
                                        <MetricIcon className={`w-3.5 h-3.5 ${metric.color}`} />
                                        <span className="text-xs font-medium text-gray-700">{metric.label}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-bold text-gray-900">{metric.value}</span>
                                        <span className="text-[10px] font-bold text-green-600">{metric.trend}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Achievements */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-blue-50">
                    <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-600" />
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Achievements</h3>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">{ACHIEVEMENTS.length}</span>
                </div>
                <div className="p-3 space-y-1">
                    {ACHIEVEMENTS.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50/50 transition-colors group cursor-pointer">
                            <span className="text-lg">{achievement.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{achievement.label}</p>
                                <p className="text-[10px] text-gray-400">{achievement.description}</p>
                            </div>
                            <span className="text-[9px] text-gray-300 font-medium whitespace-nowrap">{achievement.earned}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mutual Connections */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Mutual Connections</h3>
                </div>
                <div className="p-4">
                    <div className="flex -space-x-2 mb-2">
                        {MUTUAL_CONNECTIONS.map((conn, i) => (
                            <img
                                key={i}
                                src={conn.avatar}
                                alt={conn.name}
                                title={conn.name}
                                className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 hover:z-10 hover:scale-110 transition-transform cursor-pointer"
                            />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600 cursor-pointer hover:scale-110 transition-transform">
                            +23
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400">
                        <span className="font-semibold text-gray-600">{MUTUAL_CONNECTIONS.length + 23}</span> mutual connections including <span className="font-medium text-gray-600">{MUTUAL_CONNECTIONS[0].name}</span> and <span className="font-medium text-gray-600">{MUTUAL_CONNECTIONS[1].name}</span>
                    </p>
                </div>
            </div>

            {/* Similar Founders */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Users className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Similar Founders</h3>
                </div>
                <div className="p-3 space-y-1">
                    {SIMILAR_FOUNDERS.map((founder, i) => (
                        <div key={i} className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer group">
                            <img
                                src={founder.avatar}
                                alt={founder.name}
                                className="w-9 h-9 rounded-full border border-gray-100 bg-gray-50 group-hover:scale-105 transition-transform"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-gray-800 truncate group-hover:text-blue-700 transition-colors">{founder.name}</p>
                                <p className="text-[10px] text-gray-400 truncate">{founder.role}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-blue-500 font-medium">{founder.mutualConnections} mutual</span>
                                    <span className="text-[9px] text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded">{founder.industry}</span>
                                </div>
                            </div>
                            <button className="p-1.5 rounded-md hover:bg-blue-100 transition-colors" title="Connect">
                                <UserPlus className="w-3.5 h-3.5 text-blue-600" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="px-4 py-2.5 bg-blue-50/50 border-t border-blue-50">
                    <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors w-full text-center py-0.5">
                        View all suggestions
                    </button>
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Upcoming Events</h3>
                </div>
                <div className="p-3 space-y-2">
                    {UPCOMING_EVENTS.map((event, i) => (
                        <div key={i} className="px-3 py-2.5 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer group">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs font-bold text-gray-800 group-hover:text-blue-700 transition-colors truncate">{event.title}</h4>
                                <span className="text-[9px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 ml-2 whitespace-nowrap">{event.type}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-[10px] text-gray-400">{event.date} · {event.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-4 py-2.5 bg-blue-50/50 border-t border-blue-50">
                    <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors w-full text-center py-0.5">
                        Explore all events
                    </button>
                </div>
            </div>

            {/* Hiring Banner */}
            {isFounderMode && startup.hiring && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-emerald-100/50">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-tight">We're Hiring!</h3>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded-full ml-auto">{startup.openRoles.length} roles</span>
                    </div>
                    <div className="p-3 space-y-2">
                        {startup.openRoles.map((role, i) => (
                            <div key={i} className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-emerald-100/50 hover:shadow-sm transition-all cursor-pointer group">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-3 h-3 text-emerald-600" />
                                    <span className="text-xs font-semibold text-gray-800 group-hover:text-emerald-700">{role}</span>
                                </div>
                                <ArrowUpRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Social Links */}
            <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight">Links</h3>
                </div>
                <div className="p-3 space-y-1">
                    {SOCIAL_LINKS.map((link, i) => {
                        const LinkIcon = link.icon;
                        return (
                            <a key={i} href="#" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-blue-50/50 transition-colors group">
                                <LinkIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{link.name}</p>
                                    <p className="text-[10px] text-gray-400 truncate">{link.url}</p>
                                </div>
                                <ArrowUpRight className="w-3 h-3 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-400 px-1">
                <a href="#" className="hover:text-blue-600 transition-colors">About</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Help</a>
                <span>· FounderPlatform © 2026</span>
            </div>
        </div>
    );
};

export default ProfileRightSidebar;

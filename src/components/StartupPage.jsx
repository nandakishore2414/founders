import React, { useState, useMemo } from 'react';
import {
    Search, SlidersHorizontal, Globe, Sparkles, TrendingUp,
    X, Building2, Crown, Rocket, ArrowUpRight, MapPin,
    DollarSign, Users, Flame, Star, BarChart3, Briefcase,
    ExternalLink, ChevronDown, LayoutGrid, Zap, Eye
} from 'lucide-react';
import { useData } from '../context/DataContext';

const STAGE_COLORS = {
    'Idea': { bg: 'bg-blue-50/50', text: 'text-blue-500', border: 'border-blue-200', dot: 'bg-blue-300' },
    'MVP': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', dot: 'bg-blue-500' },
    'Revenue': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-600' },
    'Scaling': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', dot: 'bg-blue-500' },
    'Growth': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', dot: 'bg-blue-400' },
};

const QUICK_FILTERS = [
    { label: 'All', icon: LayoutGrid },
    { label: 'SaaS', icon: null },
    { label: 'AI/ML', icon: null },
    { label: 'FinTech', icon: null },
    { label: 'HealthTech', icon: null },
    { label: 'Scaling', icon: TrendingUp },
    { label: 'Hiring', icon: Briefcase },
];

const STAGE_FILTERS = ['All', 'Idea', 'MVP', 'Revenue', 'Scaling'];

const StartupPage = ({ user, onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [stageFilter, setStageFilter] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);
    const { founders, searchFounders, currentFounder } = useData();

    // Search and filter startups (built from founders data)
    const filteredStartups = useMemo(() => {
        let results = searchFounders(searchQuery, {
            quickFilter: activeFilter,
        });

        // Stage filter
        if (stageFilter !== 'All') {
            results = results.filter(f => f.stage === stageFilter);
        }

        // Sort
        if (sortBy === 'featured') {
            results = [...results].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        } else if (sortBy === 'reputation') {
            results = [...results].sort((a, b) => (b.reputation || 0) - (a.reputation || 0));
        } else if (sortBy === 'streak') {
            results = [...results].sort((a, b) => (b.streak || 0) - (a.streak || 0));
        } else if (sortBy === 'team') {
            results = [...results].sort((a, b) => (b.teamSize || 0) - (a.teamSize || 0));
        }

        return results;
    }, [searchFounders, searchQuery, activeFilter, stageFilter, sortBy]);

    const featuredStartups = filteredStartups.filter(f => f.featured);
    const otherStartups = filteredStartups.filter(f => !f.featured);

    // Aggregate stats
    const totalUsers = founders.reduce((sum, f) => {
        const num = parseInt(String(f.users || '0').replace(/[^\d]/g, ''), 10);
        return sum + (isNaN(num) ? 0 : num);
    }, 0);

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4 md:px-0">

            {/* ── Light Blue Hero (matching FounderDiscovery) ── */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border border-blue-200 p-6 md:p-8 mb-6 mt-4">
                {/* Decorative orbs */}
                <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-blue-200/40 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-blue-300/30 blur-2xl pointer-events-none"></div>
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundSize: '24px 24px',
                    backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)'
                }}></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-blue-950 tracking-tight">Explore Startups</h1>
                        </div>
                        <p className="text-blue-600/80 text-sm max-w-md font-medium leading-relaxed">
                            Discover startups building the future. Filter by stage, industry, or traction to find your next partner, investment, or inspiration.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-5 shrink-0">
                        <StatBubble value={String(founders.length)} label="Startups" />
                        <div className="w-px h-10 bg-blue-200"></div>
                        <StatBubble value={totalUsers.toLocaleString()} label="Total Users" />
                        <div className="w-px h-10 bg-blue-200"></div>
                        <StatBubble value={String(founders.filter(f => f.stage === 'Revenue' || f.stage === 'Scaling').length)} label="Revenue+" />
                    </div>
                </div>
            </div>

            {/* ── Search & Filters (matching FounderDiscovery) ── */}
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm shadow-blue-50 p-4 mb-5 sticky top-16 z-20">
                <div className="flex gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by startup name, industry, or what they do..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm transition-all bg-blue-50/50 focus:bg-white placeholder-blue-300"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-500">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-4 py-2.5 border rounded-xl flex items-center gap-2 text-sm font-semibold transition-all ${showFilters
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200/50'
                            : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                            }`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                {/* Quick Filter Pills */}
                <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
                    {QUICK_FILTERS.map((filter, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveFilter(filter.label)}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeFilter === filter.label
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100'
                                }`}
                        >
                            {filter.icon && <filter.icon className="w-3 h-3" />}
                            {filter.label}
                        </button>
                    ))}
                    <div className="w-px h-5 bg-blue-200 mx-1"></div>
                    {/* Stage filters */}
                    {STAGE_FILTERS.map((stage, i) => (
                        <button
                            key={`stage-${i}`}
                            onClick={() => setStageFilter(stage)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${stageFilter === stage
                                ? 'bg-blue-700 text-white shadow-sm'
                                : 'bg-white text-blue-500 hover:bg-blue-50 border border-blue-200'
                                }`}
                        >
                            {stage !== 'All' && <span className={`w-1.5 h-1.5 rounded-full ${STAGE_COLORS[stage]?.dot || 'bg-blue-400'}`}></span>}
                            {stage}
                        </button>
                    ))}
                </div>

                {/* Expanded Filter Panel */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-blue-100 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-200">
                        <div>
                            <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2.5">Industry</label>
                            <div className="space-y-2">
                                {['SaaS', 'FinTech', 'HealthTech', 'AI/ML', 'Consumer', 'DevTools'].map(ind => (
                                    <label key={ind} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                        <input type="checkbox" className="rounded border-blue-200 text-blue-600 focus:ring-blue-500" /> {ind}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2.5">Stage</label>
                            <div className="space-y-2">
                                {['Idea', 'MVP', 'Revenue', 'Scaling'].map(s => (
                                    <label key={s} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                        <input type="checkbox" className="rounded border-blue-200 text-blue-600 focus:ring-blue-500" /> {s}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2.5">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl border border-blue-200 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-blue-50/50"
                            >
                                <option value="featured">Featured</option>
                                <option value="reputation">Top Rated</option>
                                <option value="streak">Most Active</option>
                                <option value="team">Largest Team</option>
                            </select>
                            <div className="mt-4">
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Featured Startups ── */}
            {featuredStartups.length > 0 && (
                <div className="mb-8">
                    <SectionHeader icon={Crown} iconColor="text-blue-500" title="Featured Startups" badge="Top Builders" badgeColor="bg-blue-50 text-blue-600 border-blue-100" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {featuredStartups.map((startup, i) => (
                            <StartupCard key={`featured-${i}`} startup={startup} variant="featured" onNavigate={onNavigate} />
                        ))}
                    </div>
                </div>
            )}

            {/* ── All Startups Grid ── */}
            <div className="mb-6">
                <SectionHeader
                    icon={Globe}
                    iconColor="text-blue-500"
                    title="All Startups"
                    badge={`${filteredStartups.length} results`}
                    badgeColor="bg-blue-50 text-blue-600 border-blue-100"
                />

                {otherStartups.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {otherStartups.map((startup, i) => (
                            <StartupCard key={i} startup={startup} onNavigate={onNavigate} />
                        ))}
                    </div>
                ) : filteredStartups.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-blue-100">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Building2 className="w-8 h-8 text-blue-300" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 mb-1">No startups found</h3>
                        <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

// ─── Helpers ─────────────────────────────────────────────────
const StatBubble = ({ value, label }) => (
    <div className="text-center">
        <div className="text-xl font-bold text-blue-900">{value}</div>
        <div className="text-[10px] text-blue-500 font-semibold uppercase tracking-wider">{label}</div>
    </div>
);

const SectionHeader = ({ icon: Icon, iconColor, title, badge, badgeColor }) => (
    <div className="flex items-center gap-2 mb-4 px-1">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{title}</h2>
        {badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>{badge}</span>
        )}
    </div>
);

// ─── Startup Card Component ──────────────────────────────────
const StartupCard = ({ startup, variant = 'default', onNavigate }) => {
    const stageStyle = STAGE_COLORS[startup.stage] || STAGE_COLORS['Idea'];
    const isFeatured = variant === 'featured';
    const initials = (startup.startupName || 'ST').slice(0, 2).toUpperCase();

    // Generate gradient based on name
    const gradients = [
        'from-blue-600 to-blue-700',
        'from-blue-500 to-indigo-600',
        'from-blue-600 to-cyan-600',
        'from-sky-500 to-blue-600',
        'from-indigo-500 to-blue-600',
        'from-blue-500 to-sky-600',
    ];
    const gradientIdx = (startup.startupName?.charCodeAt(0) || 0) % gradients.length;
    const gradient = gradients[gradientIdx];

    return (
        <div className={`bg-white rounded-2xl border overflow-hidden hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 group cursor-pointer ${isFeatured ? 'border-blue-200 ring-1 ring-blue-50' : 'border-blue-100'}`}>

            {/* Cover / Header */}
            <div className={`relative h-20 bg-gradient-to-br ${gradient} overflow-hidden`}>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundSize: '20px 20px',
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)'
                }}></div>
                {isFeatured && (
                    <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-blue-600 text-[9px] font-bold rounded-full flex items-center gap-1 border border-blue-200">
                            <Crown className="w-2.5 h-2.5" /> Featured
                        </span>
                    </div>
                )}
                {startup.openTo?.includes('Hiring') && (
                    <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 bg-blue-500/90 backdrop-blur-sm text-white text-[9px] font-bold rounded-full flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" /> Hiring
                        </span>
                    </div>
                )}
            </div>

            {/* Logo + Content */}
            <div className="px-4 pb-4 -mt-6 relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white font-bold text-base flex items-center justify-center border-3 border-white shadow-md mb-3`}>
                    {initials}
                </div>

                <div className="flex items-start justify-between mb-1">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {startup.startupName}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className={`px-2 py-0.5 ${stageStyle.bg} ${stageStyle.text} text-[10px] font-bold rounded-full border ${stageStyle.border} flex items-center gap-1`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${stageStyle.dot}`}></span>
                                {startup.stage}
                            </span>
                            {startup.industry?.slice(0, 2).map((ind, i) => (
                                <span key={i} className="px-2 py-0.5 bg-blue-50/50 text-blue-500 text-[10px] font-medium rounded-full border border-blue-100">{ind}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-2">{startup.positioning}</p>

                {/* Metrics Row */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-blue-50">
                    {startup.metric && (
                        <MetricPill icon={DollarSign} value={startup.metric} color="text-blue-600" />
                    )}
                    <MetricPill icon={Users} value={`${startup.teamSize || 0}`} color="text-blue-600" />
                    {startup.streak > 0 && (
                        <MetricPill icon={Flame} value={`${startup.streak}d`} color="text-blue-500" />
                    )}
                    <MetricPill icon={Star} value={`${startup.reputation || 0}`} color="text-blue-500" />
                </div>

                {/* Founder + Action */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-50">
                    <div className="flex items-center gap-2">
                        <img src={startup.avatar} alt={startup.name} className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100" />
                        <div>
                            <p className="text-[11px] font-semibold text-gray-700">{startup.name}</p>
                            <p className="text-[9px] text-gray-400">Founder</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {startup.location && (
                            <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                                <MapPin className="w-3 h-3" />{startup.location}
                            </span>
                        )}
                        <ArrowUpRight className="w-4 h-4 text-blue-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                </div>

                {/* Open To tags */}
                {startup.openTo && startup.openTo.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {startup.openTo.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-semibold rounded-md border border-blue-100">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Tiny Metric Pill ────────────────────────────────────────
const MetricPill = ({ icon: Icon, value, color }) => (
    <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-600">
        <Icon className={`w-3 h-3 ${color}`} />
        {value}
    </span>
);

export default StartupPage;

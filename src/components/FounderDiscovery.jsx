import React, { useState, useMemo } from 'react';
import {
    Search, SlidersHorizontal, Users, Globe, Sparkles,
    TrendingUp, X, Filter, Compass,
    Crown, Target, Rocket, ChevronDown, LayoutGrid, Zap,
    ArrowUpRight, MapPin, Flame, Star, UserCheck, UserPlus
} from 'lucide-react';
import FounderCard from './FounderCard';
import ConnectionModal from './ConnectionModal';
import MastermindGroups from './MastermindGroups';
import { useData } from '../context/DataContext';

const SUGGESTED_FOUNDERS = [
    { name: "Priya K.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", startup: "NeuralAPI", mutual: 4 },
    { name: "Tom R.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom", startup: "CloudPilot", mutual: 7 },
    { name: "Lisa W.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa", startup: "DataForge", mutual: 3 },
];

const QUICK_FILTERS = [
    { label: 'All', icon: LayoutGrid },
    { label: 'SaaS', icon: null },
    { label: 'AI/ML', icon: null },
    { label: 'FinTech', icon: null },
    { label: 'HealthTech', icon: null },
    { label: 'Scaling', icon: TrendingUp },
    { label: 'Hiring', icon: null },
    { label: 'Open to Invest', icon: null },
];

const FounderDiscovery = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState('founders');
    const [selectedFounder, setSelectedFounder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [advancedFilters, setAdvancedFilters] = useState({
        industries: [],
        stages: [],
        signals: []
    });

    const { founders, searchFounders, currentFounder } = useData();

    const handleConnect = (founder) => {
        setSelectedFounder(founder);
        setIsModalOpen(true);
    };

    const filteredFounders = useMemo(() => {
        return searchFounders(searchQuery, {
            quickFilter: activeFilter,
            industries: advancedFilters.industries,
            stages: advancedFilters.stages
        });
    }, [searchFounders, searchQuery, activeFilter, advancedFilters]);

    const featuredFounders = filteredFounders.filter(f => f.featured);
    const regularFounders = filteredFounders.filter(f => !f.featured);

    const TABS = [
        { id: 'founders', label: 'Discovery', icon: Compass },
        { id: 'mastermind', label: 'Mastermind Groups', icon: Users },
        { id: 'suggested', label: 'Suggested', icon: Sparkles },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4 md:px-0">

            {/* ── Light Blue Hero ── */}
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
                                <Compass className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-blue-950 tracking-tight">Founder Network</h1>
                        </div>
                        <p className="text-blue-600/80 text-sm max-w-md font-medium leading-relaxed">
                            Connect with high-signal builders. No fluff, no noise — just founders who ship.
                        </p>

                        {/* Tab Pills — moved into hero */}
                        <div className="flex items-center gap-1.5 mt-5 flex-wrap">
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-300/50'
                                        : 'bg-white/70 text-blue-700 hover:bg-white border border-blue-200'
                                        }`}
                                >
                                    <tab.icon className="w-3.5 h-3.5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-5 shrink-0">
                        <StatBubble value="2.4K" label="Founders" />
                        <div className="w-px h-10 bg-blue-200"></div>
                        <StatBubble value="186" label="This Week" />
                        <div className="w-px h-10 bg-blue-200"></div>
                        <StatBubble value="94%" label="Accept Rate" />
                    </div>
                </div>
            </div>

            {/* ── Discovery Tab ── */}
            {activeTab === 'founders' && (
                <>
                    {/* Search & Filter Bar */}
                    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm shadow-blue-50 p-4 mb-5 sticky top-16 z-20">
                        <div className="flex gap-3">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name, startup, industry, or problem..."
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
                        </div>

                        {/* Expanded Filter Panel */}
                        {showFilters && (
                            <div className="mt-4 pt-4 border-t border-blue-100 grid grid-cols-1 md:grid-cols-4 gap-6 animate-in slide-in-from-top-2 duration-200">
                                <div>
                                    <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2.5">Industry</label>
                                    <div className="space-y-2">
                                        {['SaaS', 'FinTech', 'HealthTech', 'AI/ML', 'Consumer', 'DevTools'].map(ind => (
                                            <label key={ind} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={advancedFilters.industries.includes(ind)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setAdvancedFilters(prev => ({ ...prev, industries: [...prev.industries, ind] }));
                                                        } else {
                                                            setAdvancedFilters(prev => ({ ...prev, industries: prev.industries.filter(i => i !== ind) }));
                                                        }
                                                    }}
                                                    className="rounded border-blue-200 text-blue-600 focus:ring-blue-500"
                                                /> {ind}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2.5">Stage</label>
                                    <div className="space-y-2">
                                        {['Idea', 'MVP', 'Revenue', 'Scaling'].map(s => (
                                            <label key={s} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={advancedFilters.stages.includes(s)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setAdvancedFilters(prev => ({ ...prev, stages: [...prev.stages, s] }));
                                                        } else {
                                                            setAdvancedFilters(prev => ({ ...prev, stages: prev.stages.filter(st => st !== s) }));
                                                        }
                                                    }}
                                                    className="rounded border-blue-200 text-blue-600 focus:ring-blue-500"
                                                /> {s}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2.5">Signals</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                            <input type="checkbox" className="rounded border-blue-200 text-blue-600 focus:ring-blue-500" /> Hiring Now
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                            <input type="checkbox" className="rounded border-blue-200 text-blue-600 focus:ring-blue-500" /> Open to Partners
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                            <input type="checkbox" className="rounded border-blue-200 text-blue-600 focus:ring-blue-500" /> Open to Invest
                                        </label>
                                        <div className="pt-2">
                                            <span className="text-[10px] text-blue-400 block mb-1.5">Min Build Streak</span>
                                            <input type="range" className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2.5">Location</label>
                                    <select className="w-full px-3 py-2.5 rounded-xl border border-blue-200 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-blue-50/50">
                                        <option>🌍 Global</option>
                                        <option>🇺🇸 North America</option>
                                        <option>🇪🇺 Europe</option>
                                        <option>🌏 Asia</option>
                                        <option>🏠 Remote Only</option>
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

                    {/* Featured Founders */}
                    {featuredFounders.length > 0 && (
                        <div className="mb-6">
                            <SectionHeader icon={Crown} iconColor="text-amber-500" title="Featured Founders" badge="Top Builders" badgeColor="bg-amber-50 text-amber-600 border-amber-100" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {featuredFounders.map((founder, index) => (
                                    <FounderCard
                                        key={`featured-${index}`}
                                        {...founder}
                                        onConnect={() => handleConnect(founder)}
                                        onCollaborate={() => handleConnect(founder)}
                                        variant="featured"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Founders Grid */}
                    <div className="mb-6">
                        <SectionHeader
                            icon={Globe}
                            iconColor="text-blue-500"
                            title="All Founders"
                            badge={`${filteredFounders.length} results`}
                            badgeColor="bg-blue-50 text-blue-600 border-blue-100"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {regularFounders.map((founder, index) => (
                                <FounderCard
                                    key={index}
                                    {...founder}
                                    onConnect={() => handleConnect(founder)}
                                    onCollaborate={() => handleConnect(founder)}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'mastermind' && <MastermindGroups />}

            {activeTab === 'suggested' && (
                <SuggestedTab founders={SUGGESTED_FOUNDERS} onConnect={handleConnect} allFounders={filteredFounders} currentFounder={currentFounder} />
            )}

            <ConnectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                founderName={selectedFounder?.name}
                startupName={selectedFounder?.startupName}
                founderId={selectedFounder?.id}
                currentUserId={currentFounder?.id}
            />
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

// ─── Suggested Tab ────────────────────────────────────────────
const SuggestedTab = ({ founders, onConnect, allFounders, currentFounder }) => {
    const industryFounders = useMemo(() => {
        if (!currentFounder || !currentFounder.industry || currentFounder.industry.length === 0) {
            return allFounders.filter(f => f.industry.includes('SaaS')).slice(0, 6);
        }
        return allFounders.filter(f =>
            f.id !== currentFounder.id &&
            f.industry.some(ind => currentFounder.industry.includes(ind))
        ).slice(0, 6);
    }, [allFounders, currentFounder]);

    return (
        <div className="space-y-8">
            {/* People You May Know */}
            <div>
                <SectionHeader icon={Sparkles} iconColor="text-blue-500" title="People You May Know" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {founders.map((f, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-blue-100 p-5 text-center hover:shadow-lg hover:shadow-blue-100 transition-all group profile-grid-item" style={{ animationDelay: `${i * 80}ms` }}>
                            <div className="relative inline-block mb-3">
                                <img src={f.avatar} alt={f.name} className="w-16 h-16 rounded-full border-2 border-blue-100 group-hover:border-blue-300 transition-colors" />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                    <UserCheck className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-gray-900">{f.name}</h3>
                            <p className="text-xs text-gray-500 mb-1">{f.startup}</p>
                            <p className="text-[10px] text-blue-500 font-semibold mb-4">{f.mutual} mutual connections</p>
                            <button
                                onClick={() => {
                                    const actualFounder = allFounders.find(found => found.name === f.name);
                                    if (actualFounder) onConnect(actualFounder);
                                }}
                                className="w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 flex items-center justify-center gap-1.5"
                            >
                                <UserPlus className="w-3.5 h-3.5" /> Connect
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* In Your Industry */}
            <div>
                <SectionHeader
                    icon={Target}
                    iconColor="text-blue-600"
                    title="In Your Industry"
                    badge={currentFounder?.industry?.[0] || 'SaaS'}
                    badgeColor="bg-blue-50 text-blue-600 border-blue-100"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industryFounders.length > 0 ? (
                        industryFounders.map((founder, index) => (
                            <FounderCard
                                key={founder.id || index}
                                {...founder}
                                onConnect={() => onConnect(founder)}
                                onCollaborate={() => onConnect(founder)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 bg-blue-50/50 rounded-2xl border border-blue-100 text-blue-400">
                            No founders found in your industry yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FounderDiscovery;

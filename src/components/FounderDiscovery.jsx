import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X, Users, Globe } from 'lucide-react';
import FounderCard from './FounderCard';
import ConnectionModal from './ConnectionModal';

const FounderDiscovery = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState('founders'); // 'founders' or 'mastermind'
    const [selectedFounder, setSelectedFounder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConnect = (founder) => {
        setSelectedFounder(founder);
        setIsModalOpen(true);
    };

    const FOUNDERS = [
        {
            name: "Alex Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            startupName: "DevFlow",
            positioning: "Automating code reviews for enterprise teams. Reducing cycle time by 40%.",
            industry: ["SaaS", "DevTools"],
            stage: "Revenue",
            location: "San Francisco",
            metric: "$12k MRR",
            openTo: ["Partnerships", "Integration"],
            streak: 12
        },
        {
            name: "Sarah Miller",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            startupName: "HealthBridge",
            positioning: "Connecting patients with specialized remote care. Telehealth 2.0.",
            industry: ["HealthTech", "B2C"],
            stage: "MVP",
            location: "London",
            metric: "500 Users",
            openTo: ["Co-marketing", "Feedback"],
            streak: 5
        },
        {
            name: "James Wilson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
            startupName: "EcoLogistics",
            positioning: "Sustainable supply chain management for e-commerce brands.",
            industry: ["Logistics", "B2B"],
            stage: "Idea",
            location: "Berlin",
            metric: "Pre-Revenue",
            openTo: ["Hiring", "Co-founder"],
            streak: 0
        },
        {
            name: "Elena Rodriguez",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
            startupName: "FinPulse",
            positioning: "Real-time financial forecasting for startups using AI.",
            industry: ["FinTech", "AI"],
            stage: "Scaling",
            location: "New York",
            metric: "$85k MRR",
            openTo: ["Partnerships", "Invest"],
            streak: 45
        },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4 md:px-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pt-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Founder Network</h1>
                    <p className="text-gray-500 text-sm">Connect with high-signal builders. No fluff.</p>
                </div>

                {/* Tabs */}
                <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                    <button
                        onClick={() => setActiveTab('founders')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'founders' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Discovery
                    </button>
                    <button
                        onClick={() => setActiveTab('mastermind')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'mastermind' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Mastermind Groups
                    </button>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8 sticky top-16 z-20">
                <div className="flex gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, startup, or problem..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-sm"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-4 py-2.5 border rounded-xl flex items-center gap-2 text-sm font-semibold transition-colors ${showFilters ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                        <SlidersHorizontal className="w-4 h-4" /> Filters
                    </button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-6 animate-in slide-in-from-top-2 duration-200">
                        {/* Industry */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Industry</label>
                            <div className="space-y-2">
                                {['SaaS', 'FinTech', 'HealthTech', 'AI', 'Consumer', 'DevTools'].map(i => (
                                    <label key={i} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-gray-900" /> {i}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Stage */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Stage</label>
                            <div className="space-y-2">
                                {['Idea', 'MVP', 'Revenue', 'Scaling'].map(s => (
                                    <label key={s} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-gray-900" /> {s}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Metrics */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Filters</label>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-gray-900" /> Hiring Now
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-gray-900" /> Open to Partners
                                </label>
                                <div className="pt-2">
                                    <span className="text-xs text-gray-500 block mb-1">Min Streak</span>
                                    <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Location</label>
                            <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-gray-900 focus:ring-0">
                                <option>Global</option>
                                <option>North America</option>
                                <option>Europe</option>
                                <option>Asia</option>
                                <option>Remote Only</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Grid */}
            {activeTab === 'founders' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FOUNDERS.map((founder, index) => (
                        <FounderCard
                            key={index}
                            {...founder}
                            onConnect={() => handleConnect(founder)}
                            onCollaborate={() => handleConnect(founder)}
                        />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Placeholder for Mastermind Groups */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-gray-900">SaaS Scaling &lt; $10k</h3>
                        <p className="text-sm text-gray-500 mb-4">Weekly accountability for early-stage SaaS founders.</p>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-purple-500 hover:text-purple-600 transition-colors">
                            Request to Join
                        </button>
                    </div>
                    {/* More groups... */}
                </div>
            )}

            <ConnectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                founderName={selectedFounder?.name}
                startupName={selectedFounder?.startupName}
            />
        </div>
    );
};

export default FounderDiscovery;

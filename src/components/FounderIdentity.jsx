import React, { useState } from 'react';
import { MapPin, TrendingUp, Users, DollarSign, Briefcase, ExternalLink, Mail, ArrowRight, Star, Layout, Clock } from 'lucide-react';
import BuildUpdateCard from './BuildUpdateCard';

const FounderIdentity = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const UPDATES = [
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

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 text-center md:text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 bg-gradient-to-l from-blue-50 to-transparent w-48 h-full opacity-50 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-200 shrink-0">
                        FP
                    </div>

                    <div className="flex-1 space-y-3">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">FounderPlatform</h1>
                            <p className="text-lg text-gray-500 font-medium"> The operating system for modern startup founders.</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm">
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-semibold border border-green-100 flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" /> Growth Stage
                            </span>
                            <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full border border-gray-100">B2B SaaS</span>
                            <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full border border-gray-100">Productivity</span>
                            <span className="px-3 py-1 text-gray-400 flex items-center gap-1 ml-1">
                                <MapPin className="w-3.5 h-3.5" /> San Francisco, CA
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reputation Signals */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 flex items-center justify-between text-sm overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Reputation</span>
                        <div className="flex items-center gap-1.5 font-bold text-gray-900">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>858</span>
                            <span className="text-xs text-gray-400 font-normal">Top 5%</span>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-gray-100"></div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Response Rate</span>
                        <div className="font-bold text-gray-900">98% <span className="text-xs text-green-500 font-normal">Fast</span></div>
                    </div>
                    <div className="w-px h-8 bg-gray-100"></div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Collaborations</span>
                        <div className="font-bold text-gray-900">12 <span className="text-xs text-gray-400 font-normal">Active</span></div>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">Verified Founder</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100">Y-Combinator</span>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-3 text-sm font-semibold transition-colors relative ${activeTab === 'overview' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <div className="flex items-center gap-2">
                        <Layout className="w-4 h-4" /> Overview
                    </div>
                    {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('timeline')}
                    className={`pb-3 text-sm font-semibold transition-colors relative ${activeTab === 'timeline' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Build Timeline
                    </div>
                    {activeTab === 'timeline' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-full"></div>}
                </button>
            </div>

            {activeTab === 'overview' ? (
                <>
                    {/* Traction Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <StatCard label="Active Users" value="12.5k" trend="+18%" icon={Users} color="text-blue-600" bg="bg-blue-50" />
                        <StatCard label="MRR" value="$42k" trend="+8%" icon={DollarSign} color="text-green-600" bg="bg-green-50" />
                        <StatCard label="MoM Growth" value="24%" trend="High" icon={TrendingUp} color="text-purple-600" bg="bg-purple-50" />
                        <StatCard label="Team Size" value="8" trend="Hiring" icon={Briefcase} color="text-orange-600" bg="bg-orange-50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Founder Section */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    Driving Vision
                                </h2>

                                <div className="flex items-start gap-5">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
                                        alt="Founder"
                                        className="w-16 h-16 rounded-full border-2 border-white shadow-md bg-gray-50"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Alex Chen</h3>
                                        <p className="text-sm text-gray-500 font-medium mb-3">Ex-Stripe PM • 2x Founder</p>

                                        <blockquote className="relative text-gray-600 text-sm italic pl-4 border-l-2 border-indigo-200 leading-relaxed">
                                            "We built FounderPlatform because the fragmentation of startup tools was killing our own productivity. Founders need a unified cockpit, not 50 browser tabs."
                                        </blockquote>
                                    </div>
                                </div>

                                {/* Optional Growth Placeholder */}
                                <div className="mt-8 pt-6 border-t border-gray-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-semibold text-gray-700">Revenue Trajectory</span>
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">On Track</span>
                                    </div>
                                    <div className="h-24 w-full bg-gray-50 rounded-lg border border-gray-100 dashed-border flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-indigo-50 to-transparent"></div>
                                        <svg className="w-full h-full text-indigo-500 opacity-20" viewBox="0 0 100 24" preserveAspectRatio="none">
                                            <path d="M0,24 Q25,5 50,15 T100,0 V24 H0 Z" fill="currentColor" />
                                        </svg>
                                        <span className="text-xs text-gray-400 font-medium relative z-10">Q3 - Q4 Performance</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Actions */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3 sticky top-24">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Connect</h3>

                                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-100 flex items-center justify-center gap-2 group">
                                    Visit Website <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>

                                <button className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all shadow-md shadow-gray-200 flex items-center justify-center gap-2">
                                    Request Demo
                                </button>

                                <button className="w-full py-3 px-4 border-2 border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                                    Join Waitlist
                                </button>

                                <button className="w-full py-2 px-4 text-gray-400 hover:text-indigo-600 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 mt-2">
                                    <Star className="w-4 h-4" /> Investor Interest
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                /* Timeline Tab */
                <div className="max-w-3xl">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Build Timeline</h2>
                            <p className="text-sm text-gray-500">Tracking public progress since Jan 2026</p>
                        </div>
                        <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-100">
                            <span className="text-lg">🔥</span>
                            <span className="text-sm font-bold">12 Day Streak</span>
                        </div>
                    </div>

                    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                        {UPDATES.map((update, index) => (
                            <div key={index} className="relative">
                                <BuildUpdateCard
                                    {...update}
                                    founderName="Alex Chen"
                                    founderAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
                                    startupName="FounderPlatform"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

const StatCard = ({ label, value, trend, icon: Icon, color, bg }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-3 hover:shadow-md transition-shadow">
        <div className={`p-2 rounded-lg ${bg} ${color}`}>
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{value}</div>
            <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
                {label} <span className="text-green-600 bg-green-50 px-1 rounded ml-1">{trend}</span>
            </div>
        </div>
    </div>
);

export default FounderIdentity;

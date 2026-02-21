import React from 'react';
import { TrendingUp, Users, ArrowUpRight, Filter, Lock } from 'lucide-react';

const InvestorDashboard = ({ hasRole }) => {
    if (!hasRole('investor')) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h2>
                <p className="text-gray-500 max-w-md">
                    This dashboard is exclusive to verified investors. Please contact support if you believe this is an error.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Investor Dashboard</h1>
                    <p className="text-gray-500 text-sm">Track trending startups and deal flow.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
                        Export Report
                    </button>
                </div>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard
                    title="Trending Startups"
                    count="12"
                    trend="+4 this week"
                    icon={TrendingUp}
                    color="bg-blue-50 text-blue-600"
                />
                <SummaryCard
                    title="Fastest Growing"
                    count="5"
                    trend="+12% MRR"
                    icon={ArrowUpRight}
                    color="bg-green-50 text-green-600"
                />
                <SummaryCard
                    title="New Matches"
                    count="8"
                    trend="High compatability"
                    icon={Users}
                    color="bg-blue-50 text-blue-600"
                />
            </div>

            {/* Filters (MVP Static) */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 overflow-x-auto">
                <select className="bg-gray-50 border-none rounded-lg text-sm p-2.5 focus:ring-2 focus:ring-blue-100 outline-none">
                    <option>All Industries</option>
                    <option>SaaS</option>
                    <option>Fintech</option>
                    <option>AI/ML</option>
                </select>
                <select className="bg-gray-50 border-none rounded-lg text-sm p-2.5 focus:ring-2 focus:ring-blue-100 outline-none">
                    <option>Any Stage</option>
                    <option>Pre-Seed</option>
                    <option>Seed</option>
                    <option>Series A</option>
                </select>
                <input
                    type="text"
                    placeholder="Min MRR ($)"
                    className="bg-gray-50 border-none rounded-lg text-sm p-2.5 focus:ring-2 focus:ring-blue-100 outline-none w-32"
                />
            </div>

            {/* Placeholder Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No startups match your criteria</h3>
                <p className="text-gray-500 text-sm mt-1">Try adjusting your filters to see more results.</p>
            </div>

        </div>
    );
};

const SummaryCard = ({ title, count, trend, icon: Icon, color }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md cursor-pointer">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-xl ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{trend}</span>
        </div>
        <div className="space-y-1">
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{count}</p>
        </div>
    </div>
);

export default InvestorDashboard;
